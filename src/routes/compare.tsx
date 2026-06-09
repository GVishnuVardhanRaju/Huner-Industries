import { createFileRoute } from "@tanstack/react-router";
import { imageFallbackHandler, getFirearmImage } from "@/utils/firearmImage";
import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { firearms, type Firearm } from "@/data/firearms";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Firearms — Huner Industries" },
      { name: "description", content: "Side-by-side comparison of firearm specifications: weight, caliber, range, capacity, country, and mechanism." },
    ],
  }),
  component: Compare,
});

function Compare() {
  const [aId, setAId] = useState(firearms[0].id);
  const [bId, setBId] = useState(firearms[1].id);
  const a = firearms.find((f) => f.id === aId)!;
  const b = firearms.find((f) => f.id === bId)!;

  const rows: { label: string; get: (f: Firearm) => string | number }[] = [
    { label: "Category", get: (f) => f.category },
    { label: "Manufacturer", get: (f) => f.manufacturer },
    { label: "Country", get: (f) => f.country },
    { label: "Year", get: (f) => f.year },
    { label: "Caliber", get: (f) => f.caliber },
    { label: "Weight (kg)", get: (f) => f.weightKg },
    { label: "Barrel (mm)", get: (f) => f.barrelLengthMm },
    { label: "Effective range (m)", get: (f) => f.effectiveRangeM },
    { label: "Capacity", get: (f) => f.capacity },
    { label: "Mechanism", get: (f) => f.mechanism },
    { label: "Feed system", get: (f) => f.feedSystem },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <header className="mb-10 text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brass">Tool</span>
        <h1 className="mt-2 font-display text-4xl md:text-5xl uppercase">Compare Firearms</h1>
        <p className="mt-2 text-sm text-muted-foreground">Select two firearms to see them side by side.</p>
      </header>

      <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Picker value={aId} onChange={setAId} firearm={a} />
        <ArrowLeftRight className="h-8 w-8 text-brass mx-auto hidden md:block" />
        <Picker value={bId} onChange={setBId} firearm={b} />
      </div>

      <div className="mt-10 glass rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr_1fr] divide-x divide-border text-sm">
          <div className="bg-secondary/50 px-4 py-3 font-display uppercase text-xs tracking-wider text-brass">Spec</div>
          <div className="bg-secondary/50 px-4 py-3 font-display uppercase text-xs tracking-wider text-brass">{a.name}</div>
          <div className="bg-secondary/50 px-4 py-3 font-display uppercase text-xs tracking-wider text-brass">{b.name}</div>
          {rows.map((r) => {
            const va = r.get(a), vb = r.get(b);
            const isNum = typeof va === "number" && typeof vb === "number";
            const aWin = isNum && (va as number) > (vb as number);
            const bWin = isNum && (vb as number) > (va as number);
            return (
              <Row3 key={r.label} label={r.label} a={va} b={vb} aWin={aWin} bWin={bWin} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Picker({ value, onChange, firearm }: { value: string; onChange: (v: string) => void; firearm: Firearm }) {
  return (
    <div className="glass rounded-xl p-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-input border border-border px-3 py-2 text-sm outline-none focus:border-primary mb-3"
      >
        {firearms.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
      </select>
      <div className="aspect-[5/3] rounded-lg overflow-hidden">
        <img src={getFirearmImage(firearm)} alt={firearm.name} onError={imageFallbackHandler(firearm)} className="h-full w-full object-cover" />
      </div>
      <div className="mt-3 text-center font-display uppercase tracking-wider">{firearm.name}</div>
    </div>
  );
}

function Row3({ label, a, b, aWin, bWin }: { label: string; a: string | number; b: string | number; aWin?: boolean; bWin?: boolean }) {
  return (
    <>
      <div className="border-t border-border px-4 py-3 text-muted-foreground">{label}</div>
      <div className={`border-t border-border px-4 py-3 ${aWin ? "text-brass font-medium" : ""}`}>{a}</div>
      <div className={`border-t border-border px-4 py-3 ${bWin ? "text-brass font-medium" : ""}`}>{b}</div>
    </>
  );
}
