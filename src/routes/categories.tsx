import { createFileRoute, Link } from "@tanstack/react-router";
import { imageFallbackHandler, getFirearmImage } from "@/utils/firearmImage";
import { motion } from "framer-motion";
import { firearms, categories } from "@/data/firearms";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Huner Industries" },
      { name: "description", content: "Browse firearms by category: pistols, revolvers, assault rifles, SMGs, shotguns, sniper rifles, machine guns, and historical firearms." },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <header className="mb-10">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brass">Browse</span>
        <h1 className="mt-2 font-display text-4xl md:text-5xl uppercase">Categories</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          The archive is organized into nine principal categories spanning the full evolution of firearms.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat, i) => {
          const items = firearms.filter((f) => f.category === cat);
          const sample = items[0];
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to="/encyclopedia"
                search={{ category: cat }}
                className="group block glass rounded-xl overflow-hidden hover:border-primary/60 hover:-translate-y-1 transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-secondary to-card relative">
                  {sample && (
                    <img src={getFirearmImage(sample)} alt={cat} onError={imageFallbackHandler(sample)} className="h-full w-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <div className="font-display text-2xl uppercase tracking-wider">{cat}</div>
                    <div className="text-xs text-brass mt-1">{items.length} entries</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
