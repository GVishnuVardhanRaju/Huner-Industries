import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { imageFallbackHandler, getFirearmImage } from "@/utils/firearmImage";
import { motion } from "framer-motion";
import { Globe2, Search, X, ChevronRight } from "lucide-react";
import { firearms, countries, categories } from "@/data/firearms";
import { flagFor } from "@/lib/flags";

export const Route = createFileRoute("/countries")({
  head: () => ({
    meta: [
      { title: "By Country — Huner Industries" },
      { name: "description", content: "Firearms archive organized by country of origin: USA, Russia, Germany, India, Israel, China, UK, and more." },
    ],
  }),
  component: Countries,
});

function slug(c: string) {
  return "country-" + c.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function Countries() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const q = query.trim().toLowerCase();

  // Filtered firearms by search + category
  const filtered = useMemo(() => {
    return firearms.filter((f) => {
      if (activeCategory !== "All" && f.category !== activeCategory) return false;
      if (!q) return true;
      return (
        f.name.toLowerCase().includes(q) ||
        f.manufacturer.toLowerCase().includes(q) ||
        f.country.toLowerCase().includes(q) ||
        f.caliber.toLowerCase().includes(q)
      );
    });
  }, [q, activeCategory]);

  // Group by country, only countries that have matches
  const grouped = useMemo(() => {
    return countries
      .map((c) => ({ country: c, items: filtered.filter((f) => f.country === c) }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  const totalResults = filtered.length;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <header className="mb-8">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brass">Archive</span>
        <h1 className="mt-2 font-display text-4xl md:text-5xl uppercase">By Country</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Firearms grouped by their country of origin. Search, filter by category, or jump to a country.
        </p>
      </header>

      {/* Sticky controls */}
      <div className="sticky top-16 z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, maker, caliber…"
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

      {/* Country jump index */}
      {grouped.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {grouped.map((g) => (
            <a
              key={g.country}
              href={`#${slug(g.country)}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary/50 border border-border/50 px-3 py-1.5 text-xs hover:border-brass/60 transition-colors"
            >
              <img src={flagFor(g.country)} alt={`${g.country} flag`} className="h-5 w-8 object-cover rounded" />
              <span className="tracking-wider">{g.country}</span>
              <span className="text-muted-foreground">{g.items.length}</span>
            </a>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        {totalResults} {totalResults === 1 ? "entry" : "entries"} across {grouped.length} {grouped.length === 1 ? "country" : "countries"}
      </p>

      {/* Results */}
      {grouped.length === 0 ? (
        <div className="mt-16 text-center">
          <Globe2 className="mx-auto h-10 w-10 text-muted-foreground/50" />
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
        <div className="mt-6 space-y-10">
          {grouped.map((g, i) => (
            <motion.section
              key={g.country}
              id={slug(g.country)}
              className="scroll-mt-44"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img src={flagFor(g.country)} alt={`${g.country} flag`} className="h-10 w-16 object-cover rounded" />
                <h2 className="font-display text-2xl uppercase tracking-wider">{g.country}</h2>
                <span className="text-xs text-muted-foreground">· {g.items.length} entries</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {g.items.map((f) => (
                  <Link
                    key={f.id}
                    to="/firearm/$id"
                    params={{ id: f.id }}
                    className="group glass rounded-lg p-3 flex items-center gap-3 hover:border-primary/60 hover:-translate-y-0.5 transition-all"
                  >
                    <img
                      src={getFirearmImage(f)}
                      alt={f.name}
                      onError={imageFallbackHandler(f)}
                      className="h-14 w-20 rounded object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-display uppercase text-sm tracking-wider truncate group-hover:text-brass transition-colors">
                        {f.name}
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate">{f.manufacturer}</div>
                      <div className="text-[11px] text-muted-foreground truncate">{f.category} · {f.year}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-brass transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      )}
    </div>
  );
}
