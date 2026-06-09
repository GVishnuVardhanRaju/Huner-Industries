import { lazy, Suspense, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { RotateCcw, Layers, Crosshair, Zap } from "lucide-react";

const FirearmScene = lazy(() => import("@/components/FirearmScene.client"));

type ModelKey = "rifle" | "pistol" | "sniper";

export const Route = createFileRoute("/viewer")({
  head: () => ({
    meta: [
      { title: "3D Firearm Viewer — Huner Industries" },
      {
        name: "description",
        content:
          "Interactive 3D viewer for exploring firearm anatomy. Rotate, zoom, and inspect components in real-time.",
      },
    ],
  }),
  component: ViewerPage,
});

function ViewerPage() {
  const [model, setModel] = useState<ModelKey>("rifle");
  const [autoRotate, setAutoRotate] = useState(true);
  const [exploded, setExploded] = useState(false);

  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brass">Interactive</span>
        <h1 className="mt-2 font-display text-4xl md:text-5xl uppercase">3D Firearm Viewer</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Real-time WebGL inspection of stylized firearm anatomy. Drag to rotate, scroll to zoom, right-click to pan.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        <div className="grid lg:grid-cols-[1fr_280px] gap-4">
          <div className="relative glass rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[640px]">
            <ClientOnly fallback={<CanvasFallback />}>
              <Suspense fallback={<CanvasFallback />}>
                <FirearmScene model={model} autoRotate={autoRotate} exploded={exploded} />
              </Suspense>
            </ClientOnly>

            <div className="absolute top-3 left-3 flex gap-2 text-[10px] uppercase tracking-[0.2em] pointer-events-none">
              <span className="bg-card/80 backdrop-blur px-2 py-1 rounded text-brass border border-border">
                WebGL · Real-time
              </span>
              <span className="bg-card/80 backdrop-blur px-2 py-1 rounded text-muted-foreground border border-border">
                {model}
              </span>
            </div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-2xl p-5 space-y-6"
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-brass mb-3">Model</div>
              <div className="space-y-2">
                {([
                  { id: "rifle", label: "Assault Rifle", icon: Crosshair },
                  { id: "pistol", label: "Pistol", icon: Zap },
                  { id: "sniper", label: "Sniper Rifle", icon: Crosshair },
                ] as const).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setModel(m.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm uppercase tracking-wider border transition-all ${
                      model === m.id
                        ? "border-primary bg-primary/10 text-brass"
                        : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <m.icon className="h-4 w-4" />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-brass mb-3">Controls</div>
              <div className="space-y-2">
                <Toggle active={autoRotate} onClick={() => setAutoRotate((v) => !v)} icon={<RotateCcw className="h-4 w-4" />} label="Auto Rotate" />
                <Toggle active={exploded} onClick={() => setExploded((v) => !v)} icon={<Layers className="h-4 w-4" />} label="Exploded View" />
              </div>
            </div>

            <div className="border-t border-border pt-4 space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between"><span>Drag</span><span className="text-foreground">Rotate</span></div>
              <div className="flex justify-between"><span>Scroll</span><span className="text-foreground">Zoom</span></div>
              <div className="flex justify-between"><span>Right-click</span><span className="text-foreground">Pan</span></div>
            </div>

            <div className="rounded-md border border-border bg-secondary/40 p-3 text-[11px] text-muted-foreground leading-relaxed">
              Stylized models for educational visualization only. Not technical schematics.
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm uppercase tracking-wider border transition-all ${
        active
          ? "border-primary bg-primary/10 text-brass"
          : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
      }`}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span className={`h-2 w-2 rounded-full ${active ? "bg-brass shadow-[0_0_8px_var(--color-brass)]" : "bg-muted"}`} />
    </button>
  );
}

function CanvasFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
      Initializing renderer…
    </div>
  );
}
