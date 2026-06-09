import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, X, Clock, ChevronDown } from "lucide-react";
import { firearms, categories } from "@/data/firearms";
import { getFirearmImage, imageFallbackHandler } from "@/utils/firearmImage";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Timeline — Huner Industries" },
      { name: "description", content: "Interactive timeline of firearm evolution from early muskets through WW1, WW2, the Cold War, and the modern era." },
    ],
  }),
  component: Timeline,
});

const ERA_INFO: Record<string, { range: string; description: string }> = {
  "Pre-WWI": { range: "1800s – 1914", description: "Early muskets, lever-action rifles, and the first self-loading designs." },
  "WWI": { range: "1914 – 1918", description: "Bolt-action rifles dominate; the machine gun reshapes the battlefield." },
  "WWII": { range: "1939 – 1945", description: "Semi-automatic service rifles, the first true assault rifles, and mass production." },
  "Cold War": { range: "1947 – 1991", description: "Iconic platforms emerge — AK, M16, Glock, MP5, FAL — defining modern small arms." },
  "Modern": { range: "1992 – Today", description: "Modular weapon systems, polymer materials, and global standardization." },
};

const ERAS = ["Pre-WWI", "WWI", "WWII", "Cold War", "Modern"] as const;

const INITIAL_VISIBLE = 8;

function slug(era: string) {
  return "era-" + era.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function Timeline() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return [...firearms]
      .sort((a, b) => a.year - b.year)
      .filter((f) => {
        if (activeCategory !== "All" && f.category !== activeCategory) return false;
        if (!q) return true;
        return (
          f.name.toLowerCase().includes(q) ||
          f.manufacturer.toLowerCase().includes(q) ||
          f.country.toLowerCase().includes(q) ||
          String(f.year).includes(q)
        );
      });
  }, [q, activeCategory]);

  const grouped = useMemo(() => {
    return ERAS.map((era) => ({
      era,
      items: filtered.filter((f) => f.era === era),
    })).filter((g) => g.items.length > 0);
  }, [filtered]);

  const totalResults = filtered.length;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <header className="mb-8 text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brass">Evolution</span>
        <h1 className="mt-2 font-display text-4xl md:text-5xl uppercase">Timeline</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
          From early muskets to modular modern platforms — search, filter, and jump through firearm history.
        </p>
      </header>

      {/* Sticky controls */}
      <div className="sticky top-16 z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, maker, year…"
            className="w-full rounded-lg bg-secondary/60 border border-border/60 pl-9 pr-9 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 -mb-1 scrollbar-none">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs uppercase tracking-wider border transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Era jump index */}
      {grouped.length > 0 && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {grouped.map((g) => (
            <a
              key={g.era}
              href={`#${slug(g.era)}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary/50 border border-border/50 px-3 py-1.5 text-xs hover:border-brass/60 transition-colors"
            >
              <Clock className="h-3 w-3 text-brass" />
              <span className="tracking-wider">{g.era}</span>
              <span className="text-muted-foreground">{g.items.length}</span>
            </a>
          ))}
        </div>
      )}

      <p className="mt-4 text-center text-xs text-muted-foreground">
        {totalResults} {totalResults === 1 ? "entry" : "entries"} across {grouped.length} {grouped.length === 1 ? "era" : "eras"}
      </p>

      {/* Results */}
      {grouped.length === 0 ? (
        <div className="mt-16 text-center">
          <Clock className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-4 text-sm text-muted-foreground">No firearms match your search.</p>
          <button
            onClick={() => {
              setQuery("");
              setActiveCategory("All");
            }}
            className="mt-3 text-xs uppercase tracking-wider text-brass hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-8">
          {grouped.map((g) => {
            const info = ERA_INFO[g.era];
            const isOpen = expanded[g.era] || !!q;
            const visible = isOpen ? g.items : g.items.slice(0, INITIAL_VISIBLE);
            const hidden = g.items.length - visible.length;
            return (
              <section key={g.era} id={slug(g.era)} className="mb-14 scroll-mt-44">
                <div className="glass rounded-xl p-6 mb-6">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-brass">{info.range}</div>
                  <h2 className="font-display text-3xl uppercase mt-1">{g.era}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{info.description}</p>
                  <p className="mt-2 text-xs text-brass">{g.items.length} entries</p>
                </div>

                <div className="relative pl-8 border-l-2 border-border space-y-3">
                  {visible.map((f, i) => (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: Math.min(i * 0.03, 0.3) }}
                      className="relative"
                    >
                      <span className="absolute -left-[37px] top-6 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                      <Link
                        to="/firearm/$id"
                        params={{ id: f.id }}
                        className="group flex items-center gap-3 glass rounded-xl p-3 hover:border-primary/60 hover:-translate-y-0.5 transition-all"
                      >
                        <img
                          src={getFirearmImage(f)}
                          alt={f.name}
                          onError={imageFallbackHandler(f)}
                          loading="lazy"
                          className="h-14 w-20 rounded object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-display text-base uppercase tracking-wider truncate group-hover:text-brass transition-colors">
                            {f.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground truncate">
                            {f.manufacturer} · {f.country}
                          </div>
                          <div className="text-[11px] text-muted-foreground truncate">{f.category}</div>
                        </div>
                        <span className="font-display text-xl text-brass shrink-0">{f.year}</span>
                      </Link>
                    </motion.div>
                  ))}

                  {hidden > 0 && (
                    <button
                      onClick={() => setExpanded((p) => ({ ...p, [g.era]: true }))}
                      className="ml-1 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-brass hover:underline"
                    >
                      <ChevronDown className="h-4 w-4" />
                      Show {hidden} more
                    </button>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
