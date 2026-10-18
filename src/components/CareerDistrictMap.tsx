"use client";

import React, { useEffect, useMemo, useState } from "react";

type Position = [number, number];

type GeoJSONGeometry =
  | { type: "Polygon"; coordinates: Position[][][] }
  | { type: "MultiPolygon"; coordinates: Position[][][][] };

type GeoJSONFeature = {
  type: "Feature";
  properties?: Record<string, unknown>;
  geometry: GeoJSONGeometry;
};

type GeoJSONCollection = {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
};

function collectGeometryPositions(geometry: GeoJSONGeometry): Position[] {
  const result: Position[] = [];
  const visit = (value: unknown): void => {
    if (Array.isArray(value) && value.length >= 2 && typeof value[0] === "number" && typeof value[1] === "number" && Number.isFinite(value[0]) && Number.isFinite(value[1])) {
      result.push([value[0], value[1]]);
      return;
    }
    if (Array.isArray(value)) {
      for (const child of value) visit(child);
    }
  };
  if (geometry.type === "Polygon" || geometry.type === "MultiPolygon") visit(geometry.coordinates);
  return result;
}

function ringToPath(ring: Position[], project: (point: Position) => Position): string {
  const validPoints = ring.filter((point): point is Position =>
    Array.isArray(point) && point.length >= 2 && typeof point[0] === "number" && typeof point[1] === "number" && Number.isFinite(point[0]) && Number.isFinite(point[1])
  );
  if (validPoints.length === 0) return "";
  return validPoints.map((point, index) => {
    const lon = point[0]; const lat = point[1];
    const [x, y] = project([lon, lat]);
    return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ") + " Z";
}

export default function CareerDistrictMap({ state, onSelect }: { state: string; onSelect?: (d: string) => void }) {
  const [features, setFeatures] = useState<GeoJSONFeature[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const file = state === "Andhra Pradesh" ? "/data/maps/andhra-pradesh-districts.geojson" : "/data/maps/telangana-districts.geojson";
        const res = await fetch(file);
        if (!res.ok) throw new Error("load fail");
        const data = (await res.json()) as GeoJSONCollection;
        if (!cancelled) setFeatures(data.features ?? []);
      } catch { if (!cancelled) setFeatures([]); }
      finally { if (!cancelled) setLoading(false); }
    }
    if (state === "Andhra Pradesh" || state === "Telangana") load();
    else { setFeatures([]); setLoading(false); }
    return () => { cancelled = true; };
  }, [state]);

  const project = useMemo(() => {
    let minL = Infinity, maxL = -Infinity, minA = Infinity, maxA = -Infinity;
    for (const f of features) {
      const pts = collectGeometryPositions(f.geometry);
      for (const p of pts) {
        const l = p[0]; const a = p[1];
        if (!Number.isFinite(l) || !Number.isFinite(a)) continue;
        if (l < minL) minL = l; if (l > maxL) maxL = l;
        if (a < minA) minA = a; if (a > maxA) maxA = a;
      }
    }
    if (!Number.isFinite(minL) || !Number.isFinite(maxL)) { minL = 79; maxL = 80; }
    if (!Number.isFinite(minA) || !Number.isFinite(maxA)) { minA = 13; maxA = 14; }
    const VIEW_WIDTH = 700;
    const VIEW_HEIGHT = 420;
    const PADDING = 30;
    const geoWidth = Math.max(maxL - minL, 0.01);
    const geoHeight = Math.max(maxA - minA, 0.01);
    const availableW = VIEW_WIDTH - PADDING * 2;
    const availableH = VIEW_HEIGHT - PADDING * 2;
    const scale = Math.min(availableW / geoWidth, availableH / geoHeight);
    const renderedW = geoWidth * scale;
    const renderedH = geoHeight * scale;
    const offsetX = (VIEW_WIDTH - renderedW) / 2;
    const offsetY = (VIEW_HEIGHT - renderedH) / 2;
    const projectPoint = (point: Position): Position => {
      if (!Array.isArray(point) || point.length < 2 || !Number.isFinite(point[0]) || !Number.isFinite(point[1])) return [0, 0];
      const lon = point[0]; const lat = point[1];
      return [
        offsetX + (lon - minL) * scale,
        offsetY + (maxA - lat) * scale,
      ];
    };
    return projectPoint;
  }, [features]);

  if (loading) return <div className="w-full h-[320px] rounded-2xl bg-navy-900 border border-gold-500/20 flex items-center justify-center text-sm text-slate-400">Loading districts...</div>;
  if (!features.length) return <div className="w-full h-[320px] rounded-2xl bg-navy-900 border border-gold-500/20 flex items-center justify-center text-sm text-slate-400">No district data.</div>;

  const getName = (f: GeoJSONFeature) => {
    const p = f.properties || {};
    if (state === "Andhra Pradesh") return String(p.district ?? p.DISTRICT ?? p.name ?? "District");
    return String(p.Dist_Name ?? p.district ?? p.name ?? "District");
  };

  return (
    <div className="w-full h-[320px] sm:h-[380px] rounded-2xl bg-navy-900 border border-gold-500/20 overflow-hidden relative" aria-label={`${state} districts`}>
      <svg viewBox="0 0 700 420" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <rect width="700" height="420" fill="#0A1022" />
        {features.map((f, i) => {
          const g = f.geometry;
          const name = getName(f);
          if (g.type === "Polygon") {
            const d = (g.coordinates as any[])
              .map((ring: any[]) => ringToPath(ring as Position[], project))
              .join(" ");
            return (
              <path key={i} d={d} fill={selected === name ? "rgba(200,169,110,0.25)" : hovered === name ? "rgba(200,169,110,0.15)" : "rgba(40,50,70,0.7)"} stroke={selected === name ? "#C8A96E" : hovered === name ? "#D4B57C" : "#334155"} strokeWidth={selected === name ? 2.5 : 1} fillRule="evenodd" className="cursor-pointer transition-all" onMouseEnter={() => setHovered(name)} onMouseLeave={() => setHovered(null)} onClick={() => { setSelected(name); onSelect?.(name); }} role="button" aria-label={name} />
            );
          }
          if (g.type === "MultiPolygon") {
            const d = (g.coordinates as any[])
              .map((polygon: any[]) => polygon.map((ring: any[]) => ringToPath(ring as Position[], project)).join(" "))
              .join(" ");
            return (
              <path key={i} d={d} fill={selected === name ? "rgba(200,169,110,0.25)" : hovered === name ? "rgba(200,169,110,0.15)" : "rgba(40,50,70,0.7)"} stroke={selected === name ? "#C8A96E" : hovered === name ? "#D4B57C" : "#334155"} strokeWidth={selected === name ? 2.5 : 1} fillRule="evenodd" className="cursor-pointer transition-all" onMouseEnter={() => setHovered(name)} onMouseLeave={() => setHovered(null)} onClick={() => { setSelected(name); onSelect?.(name); }} role="button" aria-label={name} />
            );
          }
          return null;
        })}
      </svg>
      {hovered && <div className="absolute top-3 left-3 bg-navy-950/90 border border-gold-500/30 rounded-lg px-3 py-2 text-xs text-gold-200 pointer-events-none">{hovered}</div>}
      {selected && <div className="absolute top-3 right-3 bg-gold-500/20 border border-gold-500/40 rounded-lg px-3 py-2 text-xs text-gold-200 pointer-events-none">Selected: {selected}</div>}
    </div>
  );
}
