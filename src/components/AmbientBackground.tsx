"use client";

import React, { useEffect, useRef, useState } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  depth: number;
  star: boolean;
};

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollVelocityRef = useRef(0); // positive = down, negative = up
  const mouseGlowRef = useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Cursor glow — driven directly through the DOM so moving the mouse never
  // triggers a React re-render.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const glow = mouseGlowRef.current;
    if (!glow) return;

    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      nextX = e.clientX;
      nextY = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${nextX - 170}px, ${nextY - 170}px, 0)`;
        frame = 0;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const current = window.scrollY;
      scrollVelocityRef.current = (current - lastScrollY) * 0.08;
      lastScrollY = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    let frame = 0;
    const updateScrollShift = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const shift = Math.min(window.scrollY * 0.045, 140);
        container.style.setProperty("--scroll-shift", `${shift}px`);
        container.style.setProperty("--scroll-shift-neg", `${shift * -0.45}px`);
        container.style.setProperty("--scroll-shift-small", `${shift * 0.3}px`);
        container.style.setProperty("--scroll-shift-tiny-neg", `${shift * -0.2}px`);
      });
    };

    updateScrollShift();
    window.addEventListener("scroll", updateScrollShift, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollShift);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      // Draw in CSS pixels; the backing store is scaled for crispness.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Pre-rendered sprites: far cheaper than per-particle shadowBlur.
    const makeDotSprite = () => {
      const size = 64;
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = size;
      const sctx = sprite.getContext("2d");
      if (!sctx) return sprite;
      const g = sctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, "rgba(255, 251, 238, 1)");
      g.addColorStop(0.28, "rgba(255, 222, 132, 0.9)");
      g.addColorStop(0.62, "rgba(255, 196, 72, 0.35)");
      g.addColorStop(1, "rgba(255, 180, 40, 0)");
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, size, size);
      return sprite;
    };

    const makeStarSprite = () => {
      const size = 72;
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = size;
      const sctx = sprite.getContext("2d");
      if (!sctx) return sprite;
      const c = size / 2;
      const outer = c - 4;
      const inner = outer * 0.32;
      sctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const radius = i % 2 === 0 ? outer : inner;
        const angle = (Math.PI / 4) * i - Math.PI / 2;
        const x = c + Math.cos(angle) * radius;
        const y = c + Math.sin(angle) * radius;
        if (i === 0) sctx.moveTo(x, y);
        else sctx.lineTo(x, y);
      }
      sctx.closePath();
      const g = sctx.createRadialGradient(c, c, 0, c, c, outer);
      g.addColorStop(0, "rgba(255, 253, 242, 1)");
      g.addColorStop(0.4, "rgba(255, 220, 122, 0.95)");
      g.addColorStop(1, "rgba(255, 190, 60, 0)");
      sctx.fillStyle = g;
      sctx.fill();
      return sprite;
    };

    const dotSprite = makeDotSprite();
    const starSprite = makeStarSprite();

    const isSmallScreen = width < 768;
    const dustCount = isSmallScreen ? 14 : 34;
    const starCount = isSmallScreen ? 3 : 6;

    const particles: Particle[] = [];

    for (let i = 0; i < dustCount; i++) {
      const depth = Math.random() * 0.75 + 0.25;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: (Math.random() * 10 + 5) * depth,
        speedY: -(Math.random() * 0.32 + 0.08) * depth,
        speedX: (Math.random() - 0.5) * 0.18 * depth,
        baseOpacity: Math.random() * 0.5 + 0.25,
        twinkleSpeed: Math.random() * 0.0022 + 0.0007,
        twinklePhase: Math.random() * Math.PI * 2,
        depth,
        star: false,
      });
    }

    for (let i = 0; i < starCount; i++) {
      const depth = Math.random() * 0.6 + 0.4;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 3.5,
        speedY: -(Math.random() * 0.22 + 0.06) * depth,
        speedX: (Math.random() - 0.5) * 0.12,
        baseOpacity: Math.random() * 0.35 + 0.3,
        twinkleSpeed: Math.random() * 0.003 + 0.0012,
        twinklePhase: Math.random() * Math.PI * 2,
        depth,
        star: true,
      });
    }

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 3);
      lastTime = now;

      // Scroll influence decays smoothly instead of accumulating.
      const v = scrollVelocityRef.current;
      const influenceY = v * 0.6;
      const influenceX = v * 0.25;
      scrollVelocityRef.current = v * 0.92;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += (p.speedY + influenceY * p.depth) * dt;
        p.x += (p.speedX + influenceX * p.depth) * dt;

        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        const twinkle = 0.55 + 0.45 * Math.sin(now * p.twinkleSpeed + p.twinklePhase);
        const alpha = Math.max(0, Math.min(1, p.baseOpacity * twinkle));
        if (alpha < 0.02) continue;

        const sprite = p.star ? starSprite : dotSprite;
        const diameter = p.size * (p.star ? 2.6 : 2);

        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite, p.x - diameter / 2, p.y - diameter / 2, diameter, diameter);
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        "--scroll-shift": "0px",
        "--scroll-shift-neg": "0px",
        "--scroll-shift-small": "0px",
        "--scroll-shift-tiny-neg": "0px",
      } as React.CSSProperties}
      aria-hidden="true"
    >
      {/* Deep Navy Ambient Background */}
      <div className="absolute inset-0 bg-[#040E20]" />

      {/* Warm golden wash over the countdown / hero area */}
      <div className="absolute left-1/2 top-[-240px] h-[900px] w-[1300px] max-w-[170vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,196,92,0.16)_0%,rgba(255,170,50,0.06)_45%,transparent_72%)]" />
      <div className="animate-aura absolute left-1/2 top-[80px] h-[460px] w-[760px] max-w-[130vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,214,126,0.13),transparent_76%)]" />

      {/* Golden halo that sits behind the hero headline */}
      <div
        className="animate-aura-slow absolute left-1/2 top-[34%] h-[620px] w-[1050px] max-w-[150vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,198,94,0.15)_0%,rgba(255,172,52,0.05)_55%,transparent_78%)] will-change-transform"
        style={{ transform: "translate3d(-50%, var(--scroll-shift-neg), 0)" }}
      />

      {/* Large blurred gold and navy ambient light orbs */}
      <div
        className="absolute -top-[20%] left-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-b from-gold-500/10 via-navy-700/20 to-transparent blur-[120px] opacity-70 will-change-transform"
        style={{ transform: "translate3d(-50%, var(--scroll-shift), 0)" }}
      />
      <div
        className="absolute top-[35%] -left-[15%] h-[700px] w-[700px] rounded-full bg-gold-600/5 blur-[150px] will-change-transform"
        style={{ transform: "translate3d(0, var(--scroll-shift-neg), 0)" }}
      />
      <div
        className="absolute top-[65%] -right-[15%] h-[800px] w-[800px] rounded-full bg-navy-600/15 blur-[150px] will-change-transform"
        style={{ transform: "translate3d(0, var(--scroll-shift-small), 0)" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[500px] w-[600px] rounded-full bg-gold-500/5 blur-[130px] will-change-transform"
        style={{ transform: "translate3d(0, var(--scroll-shift-tiny-neg), 0)" }}
      />

      {/* Canvas for floating gold micro-particles and tiny sparkles */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full opacity-70"
        />
      )}

      {/* Soft gold light that follows the cursor (desktop only) */}
      {!prefersReducedMotion && (
        <div
          ref={mouseGlowRef}
          className="hidden md:block absolute left-0 top-0 h-[340px] w-[340px] rounded-full bg-[radial-gradient(closest-side,rgba(255,213,118,0.14),rgba(255,190,60,0.05)_55%,transparent_78%)] pointer-events-none"
          style={{ transform: "translate3d(-1000px, -1000px, 0)" }}
        />
      )}

      {/* Subtle luxury grid mesh pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(rgba(217, 169, 40, 0.8) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
