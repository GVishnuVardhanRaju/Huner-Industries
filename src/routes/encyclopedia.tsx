import { createFileRoute } from "@tanstack/react-router";
import { imageFallbackHandler, getFirearmImage } from "@/utils/firearmImage";
import { useMemo, useState } from "react";
import { Search, LayoutGrid, List, X } from "lucide-react";
import { firearms, categories, countries, eras, manufacturersList } from "@/data/firearms";
import { FirearmCard } from "@/components/FirearmCard";
import { FeaturedFirearms } from "@/components/FeaturedFirearms";
type EncyclopediaSearch = { category?: string; country?: string; era?: string };

export const Route = createFileRoute("/encyclopedia")({
  validateSearch: (search: Record<string, unknown>): EncyclopediaSearch => ({
    category: typeof search.category === "string" ? search.category : "",
    country: typeof search.country === "string" ? search.country : "",
    era: typeof search.era === "string" ? search.era : "",
  }),
  head: () => ({
    meta: [
      { title: "Encyclopedia — Huner Industries" },
      { name: "description", content: "Browse and filter the global firearms archive by category, country, manufacturer, year and caliber." },
    ],
  }),
  component: Encyclopedia,
});

function Encyclopedia() {
  const initial = Route.useSearch();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState(initial.category);
  const [country, setCountry] = useState(initial.country);
  const [manufacturer, setManufacturer] = useState("");
  const [era, setEra] = useState(initial.era);
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    return firearms.filter((f) => {
      if (q && !`${f.name} ${f.manufacturer} ${f.caliber}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (category && f.category !== category) return false;
      if (country && f.country !== country) return false;
      if (manufacturer && f.manufacturer !== manufacturer) return false;
      if (era && f.era !== era) return false;
      return true;
    });
  }, [q, category, country, manufacturer, era]);

  const reset = () => { setQ(""); setCategory(""); setCountry(""); setManufacturer(""); setEra(""); };
  const activeFilters = [category, country, manufacturer, era].filter(Boolean).length + (q ? 1 : 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <header className="mb-8">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brass">Archive</span>
        <h1 className="mt-2 font-display text-4xl md:text-5xl uppercase">Encyclopedia</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Searchable database of firearms — filter by category, country, manufacturer, and era.
        </p>
      </header>

      <FeaturedFirearms category={category || undefined} />

      {/* Search bar */}
      <div className="flex items-center gap-2 glass rounded-xl px-4 py-3">
        <Search className="h-4 w-4 text-brass" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, manufacturer or caliber..."
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
        />
        <div className="hidden sm:flex items-center gap-1 border-l border-border pl-2 ml-1">
          <button onClick={() => setView("grid")} className={`p-2 rounded ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}><LayoutGrid className="h-4 w-4" /></button>
          <button onClick={() => setView("list")} className={`p-2 rounded ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}><List className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="glass rounded-xl p-5 h-fit lg:sticky lg:top-24">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display uppercase tracking-wider text-sm">Filters</h3>
            {activeFilters > 0 && (
              <button onClick={reset} className="text-[10px] uppercase tracking-wider text-brass flex items-center gap-1">
                <X className="h-3 w-3" /> Clear
              </button>
            )}
          </div>
          <FilterSelect label="Category" value={category} onChange={setCategory} options={[...categories]} />
          <FilterSelect label="Country" value={country} onChange={setCountry} options={countries} />
          <FilterSelect label="Manufacturer" value={manufacturer} onChange={setManufacturer} options={manufacturersList} />
          <FilterSelect label="Era" value={era} onChange={setEra} options={[...eras]} />
        </aside>

        {/* Results */}
        <div>
          <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">
            {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
          </p>
          {view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((f, i) => <FirearmCard key={f.id} firearm={f} index={i} />)}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {filtered.map((f) => (
                <a key={f.id} href={`/firearm/${f.id}`} className="glass rounded-lg p-4 flex items-center gap-4 hover:border-primary/60 transition-colors">
                  <img src={getFirearmImage(f)} alt={f.name} onError={imageFallbackHandler(f)} className="h-16 w-24 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <div className="font-display uppercase tracking-wider truncate">{f.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{f.manufacturer} · {f.country} · {f.year}</div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-brass">{f.category}</span>
                </a>
              ))}
            </div>
          )}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground text-sm">No firearms match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="mb-4">
      <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-input border border-border px-3 py-2 text-sm outline-none focus:border-primary"
      >
        <option value="">All</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
