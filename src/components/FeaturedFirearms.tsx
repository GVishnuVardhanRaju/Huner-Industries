import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { firearms, categories } from "@/data/firearms";
import { featuredByCategory } from "@/data/featured";
import { FirearmImage3D } from "@/components/FirearmImage3D";

const byId = new Map(firearms.map((f) => [f.id, f]));

export function FeaturedFirearms({ category }: { category?: string }) {
  const tabs = useMemo(() => [...categories] as string[], []);
  const [active, setActive] = useState<string>(category && tabs.includes(category) ? category : tabs[0]);
  const current = category && tabs.includes(category) ? category : active;

  const items = useMemo(() => {
    const ids = featuredByCategory[current] ?? [];
    return ids.map((id) => byId.get(id)).filter(Boolean) as typeof firearms;
  }, [current]);

  if (items.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Star className="h-4 w-4 text-brass" />
        <h2 className="font-display uppercase tracking-wider text-sm">Top 10 — {current}</h2>
      </div>

      {/* Category tabs — only when no category filter is applied */}
      {!category && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border transition-colors ${
                current === t
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 snap-x">
        {items.map((f, i) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4) }}
            className="snap-start shrink-0 w-[220px]"
          >
            <Link
              to="/firearm/$id"
              params={{ id: f.id }}
              className="group block glass rounded-xl overflow-hidden hover:border-primary/60 transition-all hover:-translate-y-1 hover:shadow-brass"
            >
              <div className="relative aspect-[5/3] overflow-hidden bg-gradient-to-br from-secondary to-card">
                <FirearmImage3D
                  firearm={f}
                  intervalMs={0}
                  className="opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <span className="absolute top-2 left-2 flex items-center gap-1 text-[10px] font-display bg-brass/90 text-background px-2 py-0.5 rounded">
                  #{i + 1}
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-display text-sm uppercase tracking-wider truncate group-hover:text-brass transition-colors">
                  {f.name}
                </h3>
                <p className="text-[11px] text-muted-foreground truncate">{f.manufacturer} · {f.year}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedFirearms;
