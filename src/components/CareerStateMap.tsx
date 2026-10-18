"use client";

import React, { useEffect, useMemo, useState } from "react";

type Position = [number, number];

type GeoJSONGeometry =
  | {
      type: "Polygon";
      coordinates: Position[][][];
    }
  | {
      type: "MultiPolygon";
      coordinates: Position[][][][];
    };

type GeoJSONFeature = {
  type: "Feature";
  properties?: Record<string, unknown>;
  geometry: GeoJSONGeometry;
};

type GeoJSONCollection = {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
};

type StateFeature = {
  state: "Andhra Pradesh" | "Telangana";
  feature: GeoJSONFeature;
  name: string;
};

type CareerStateMapProps = {
  onSelect?: (state: string) => void;
};

const VIEW_WIDTH = 700;
const VIEW_HEIGHT = 420;
const PADDING = 35;

function collectRingPoints(rings: any[]): Position[] {
  return rings.flat(1) as Position[];
}

function getRings(geometry: GeoJSONGeometry): Position[][] {
  if (geometry.type === "Polygon") {
    // Polygon: coordinates = ring[][][] -> flat(1) gives ring[][]
    return (geometry.coordinates as any[]).map((ring: any[]) => ring as Position[]);
  }
  // MultiPolygon: coordinates = polygon[][][][] -> flat(1) gives polygon[][][]
  // We need all rings as Position[][] for path building; collect all points separately
  return (geometry.coordinates as any[]).flat(1).map((polyRings: any[]) => polyRings.flat(1) as Position[]);
}

function collectCoordinates(geometry: GeoJSONGeometry): Position[] {
  if (geometry.type === "Polygon") {
    return (geometry.coordinates as any[]).flat(1) as Position[];
  }
  if (geometry.type === "MultiPolygon") {
    return (geometry.coordinates as any[]).flat(3) as Position[];
  }
  return [];
}

function getGeometryBounds(features: GeoJSONFeature[]) {
  const rawPoints = features.flatMap((feature) =>
    collectCoordinates(feature.geometry)
  );

  const allPoints = rawPoints.filter(
    (p): p is [number, number] =>
      Array.isArray(p) &&
      p.length >= 2 &&
      typeof p[0] === "number" && Number.isFinite(p[0]) &&
      typeof p[1] === "number" && Number.isFinite(p[1])
  );

  if (!allPoints.length) {
    return {
      minLon: 0,
      maxLon: 1,
      minLat: 0,
      maxLat: 1,
    };
  }

  let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
  for (const [lon, lat] of allPoints) {
    if (!Number.isFinite(lon) || !Number.isFinite(lat)) continue;
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  if (!Number.isFinite(minLon) || !Number.isFinite(maxLon) || !Number.isFinite(minLat) || !Number.isFinite(maxLat)) {
    return { minLon: 0, maxLon: 1, minLat: 0, maxLat: 1 };
  }
  return { minLon, maxLon, minLat, maxLat };
}

function createProjector(features: GeoJSONFeature[]) {
  const bounds = getGeometryBounds(features);

  const meanLat = (bounds.minLat + bounds.maxLat) / 2;
  const longitudeCorrection = Math.cos((meanLat * Math.PI) / 180);

  const lonSpan =
    Math.max(bounds.maxLon - bounds.minLon, 0.01) *
    longitudeCorrection;

  const latSpan = Math.max(bounds.maxLat - bounds.minLat, 0.01);

  const usableWidth = VIEW_WIDTH - PADDING * 2;
  const usableHeight = VIEW_HEIGHT - PADDING * 2;

  const scale = Math.min(
    usableWidth / lonSpan,
    usableHeight / latSpan
  );

  const renderedWidth = lonSpan * scale;
  const renderedHeight = latSpan * scale;

  const offsetX = (VIEW_WIDTH - renderedWidth) / 2;
  const offsetY = (VIEW_HEIGHT - renderedHeight) / 2;

  const projectPoint = (point: any): Position => {
    if (!Array.isArray(point) || point.length < 2 || !Number.isFinite(point[0]) || !Number.isFinite(point[1])) return [0, 0];
    const lon = point[0];
    const lat = point[1];
    return [
      offsetX + (lon - bounds.minLon) * longitudeCorrection * scale,
      offsetY + (bounds.maxLat - lat) * scale,
    ];
  };
  return projectPoint;
}

function ringToPath(
  ring: Position[],
  project: (point: Position) => Position
) {
  if (!Array.isArray(ring) || !ring.length) return "";
  const validRing = ring.filter(
    (p): p is Position =>
      Array.isArray(p) && p.length >= 2 && Number.isFinite(p[0]) && Number.isFinite(p[1])
  );
  if (!validRing.length) return "";
  const points = validRing.map((p) => project([p[0], p[1]]));

  return (
    points
      .map(([x, y], index) =>
        `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`
      )
      .join(" ") + " Z"
  );
}

function geometryToPath(
  geometry: GeoJSONGeometry,
  project: (point: Position) => Position
) {
  if (geometry.type === "Polygon") {
    return (geometry.coordinates as any[])
      .map((ring: any) => ringToPath(ring, project))
      .join(" ");
  }

  const rings = (geometry.coordinates as any[]).flat(2) as Position[];
  return rings.map((pt) => `${pt[0].toFixed(2)} ${pt[1].toFixed(2)}`).join(" L ");
}

function getStateName(feature: GeoJSONFeature, fallback: string) {
  const properties = feature.properties ?? {};

  return (
    String(
      properties.district ??
        properties.Dist_Name ??
        properties.name ??
        fallback
    )
  );
}

export default function CareerStateMap({
  onSelect,
}: CareerStateMapProps) {
  const [features, setFeatures] = useState<StateFeature[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadMaps() {
      try {
        setLoading(true);
        setError(false);

        const [apResponse, tgResponse] = await Promise.all([
          fetch("/data/maps/andhra-pradesh-districts.geojson"),
          fetch("/data/maps/telangana-districts.geojson"),
        ]);

        if (!apResponse.ok || !tgResponse.ok) {
          throw new Error("Unable to load state map data.");
        }

        const [ap, tg] = (await Promise.all([
          apResponse.json(),
          tgResponse.json(),
        ])) as [GeoJSONCollection, GeoJSONCollection];

        if (cancelled) return;

        const combined: StateFeature[] = [
          ...ap.features.map((feature, index) => ({
            state: "Andhra Pradesh" as const,
            feature,
            name: getStateName(feature, `AP District ${index + 1}`),
          })),
          ...tg.features.map((feature, index) => ({
            state: "Telangana" as const,
            feature,
            name: getStateName(feature, `Telangana District ${index + 1}`),
          })),
        ];

        setFeatures(combined);
      } catch (err) {
        console.error("Failed to load career state maps:", err);

        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMaps();

    return () => {
      cancelled = true;
    };
  }, []);

  const allGeoFeatures = useMemo(
    () => features.map((item) => item.feature),
    [features]
  );

  const project = useMemo(
    () => createProjector(allGeoFeatures),
    [allGeoFeatures]
  );

  const stateLabels = useMemo(() => {
    const result: Record<
      string,
      { x: number; y: number }
    > = {};

    for (const state of ["Andhra Pradesh", "Telangana"] as const) {
      const stateFeatures = features
        .filter((item) => item.state === state)
        .map((item) => item.feature);

      const points = stateFeatures.flatMap((feature) =>
        collectCoordinates(feature.geometry)
      );

      if (!points.length) continue;

      const projected = points.map(project);
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const [x, y] of projected) {
        if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
      result[state] = {
        x: (Number.isFinite(minX) && Number.isFinite(maxX)) ? (minX + maxX) / 2 : 350,
        y: (Number.isFinite(minY) && Number.isFinite(maxY)) ? (minY + maxY) / 2 : 210,
      };
    }

    return result;
  }, [features, project]);

  const handleSelect = (state: string) => {
    setSelected(state);
    onSelect?.(state);
  };

  if (loading) {
    return (
      <div className="w-full h-[320px] sm:h-[380px] rounded-2xl bg-navy-900 border border-gold-500/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-3 rounded-full border-2 border-gold-400/30 border-t-gold-400 animate-spin" />
          <p className="text-sm text-slate-400">
            Loading geographic map...
          </p>
        </div>
      </div>
    );
  }

  if (error || !features.length) {
    return (
      <div className="w-full h-[320px] sm:h-[380px] rounded-2xl bg-navy-900 border border-gold-500/20 flex items-center justify-center p-6 text-center">
        <p className="text-sm text-slate-400">
          Unable to load the geographic map. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full h-[320px] sm:h-[380px] rounded-2xl bg-navy-900 border border-gold-500/20 overflow-hidden relative"
      aria-label="Interactive Andhra Pradesh and Telangana state selection map"
    >
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect
          width={VIEW_WIDTH}
          height={VIEW_HEIGHT}
          fill="#0A1022"
        />

        {features.map((item, index) => {
          const isHovered = hovered === item.state;
          const isSelected = selected === item.state;

          return (
            <path
              key={`${item.state}-${item.name}-${index}`}
              d={geometryToPath(item.feature.geometry, project)}
              fill={
                isSelected
                  ? "rgba(212,181,124,0.42)"
                  : isHovered
                    ? "rgba(200,169,110,0.28)"
                    : "rgba(51,65,85,0.72)"
              }
              stroke={
                isSelected
                  ? "#D4B57C"
                  : isHovered
                    ? "#C8A96E"
                    : "#475569"
              }
              strokeWidth={isSelected ? 2.2 : 1.2}
              fillRule="evenodd"
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHovered(item.state)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleSelect(item.state)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();
                  handleSelect(item.state);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Select ${item.state}`}
            />
          );
        })}

        {Object.entries(stateLabels).map(
          ([state, position]) => (
            <text
              key={state}
              x={position.x}
              y={position.y}
              textAnchor="middle"
              fill="#F8FAFC"
              fontSize="16"
              fontWeight="700"
              pointerEvents="none"
              style={{
                textShadow:
                  "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              {state}
            </text>
          )
        )}
      </svg>

      {hovered && (
        <div className="absolute top-3 left-3 bg-navy-950/95 border border-gold-500/30 rounded-lg px-3 py-2 text-xs text-gold-200 shadow-lg pointer-events-none">
          {hovered}
        </div>
      )}

      {selected && (
        <div className="absolute top-3 right-3 bg-gold-500/15 border border-gold-500/40 rounded-lg px-3 py-2 text-xs text-gold-200 shadow-lg pointer-events-none">
          Selected: {selected}
        </div>
      )}

      <p className="absolute bottom-2 right-3 text-[10px] text-slate-500">
        Hover to highlight · Click a state to continue
      </p>
    </div>
  );
}