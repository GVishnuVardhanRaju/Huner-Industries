import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, MapPin, Calendar, Crosshair, Weight, Ruler, Target } from "lucide-react";
import { firearms } from "@/data/firearms";
import { getFirearmImage } from "@/utils/firearmImage";
import { FirearmImage3D } from "@/components/FirearmImage3D";

export const Route = createFileRoute("/firearm/$id")({
  loader: ({ params }) => {
    const firearm = firearms.find((f) => f.id === params.id);
    if (!firearm) throw notFound();
    return { firearm };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.firearm.name} — Huner Industries` },
          { name: "description", content: `${loaderData.firearm.name} — ${loaderData.firearm.category} from ${loaderData.firearm.country}. Specifications, history, and variants.` },
          { property: "og:image", content: getFirearmImage(loaderData.firearm) },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl uppercase">Firearm not found</h1>
      <Link to="/encyclopedia" className="mt-4 inline-block text-brass">Back to encyclopedia</Link>
    </div>
  ),
  component: FirearmDetail,
});

function FirearmDetail() {
  const { firearm: f } = Route.useLoaderData();

  const stats = [
    { icon: Crosshair, label: "Caliber", value: f.caliber },
    { icon: Weight, label: "Weight", value: `${f.weightKg} kg` },
    { icon: Ruler, label: "Barrel", value: `${f.barrelLengthMm} mm` },
    { icon: Target, label: "Effective Range", value: `${f.effectiveRangeM} m` },
    { icon: Calendar, label: "Introduced", value: String(f.year) },
    { icon: MapPin, label: "Origin", value: f.country },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Link to="/encyclopedia" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-brass">
        <ArrowLeft className="h-3 w-3" /> Encyclopedia
      </Link>

      {/* Hero */}
      <div className="mt-6 grid lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="glass rounded-2xl overflow-hidden aspect-[5/4]">
          <FirearmImage3D firearm={f} intervalMs={5000} alt={f.name} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-brass">{f.category}</span>
          <h1 className="mt-2 font-display text-5xl md:text-6xl uppercase leading-none">{f.name}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {f.manufacturer} · {f.country} · {f.era}
          </p>
          <p className="mt-6 text-sm leading-relaxed">{f.history}</p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-2">
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-xs text-accent-foreground">Available via licensed offline dealers only</span>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <section className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-xl p-4">
            <s.icon className="h-4 w-4 text-brass" />
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-2">{s.label}</div>
            <div className="font-display text-base mt-0.5">{s.value}</div>
          </div>
        ))}
      </section>

      {/* Detailed specs */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <section className="glass rounded-xl p-6">
          <h2 className="font-display text-xl uppercase tracking-wider text-brass">Specifications</h2>
          <dl className="mt-4 divide-y divide-border text-sm">
            <Row k="Feed System" v={f.feedSystem} />
            <Row k="Mechanism" v={f.mechanism} />
            <Row k="Capacity" v={`${f.capacity} rounds`} />
            <Row k="Manufacturer" v={f.manufacturer} />
            <Row k="Estimated market value" v={f.marketValueUSD} />
          </dl>
        </section>

        <section className="glass rounded-xl p-6">
          <h2 className="font-display text-xl uppercase tracking-wider text-brass">Variants</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {f.variants.map((v: string) => (
              <span key={v} className="rounded-md border border-border bg-secondary/50 px-3 py-1 text-xs">{v}</span>
            ))}
          </div>
          <h2 className="mt-8 font-display text-xl uppercase tracking-wider text-brass">Used by</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {f.usedBy.map((u: string) => (
              <span key={u} className="rounded-md border border-border bg-secondary/50 px-3 py-1 text-xs">{u}</span>
            ))}
          </div>
        </section>
      </div>

      {/* Disclaimer */}
      <div className="mt-10 glass rounded-xl p-6 border-destructive/30">
        <h3 className="font-display uppercase tracking-wider text-sm text-destructive">Safety & legal disclaimer</h3>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
          The information on this page is provided for educational and historical purposes only.
          Huner Industries does not sell firearms or ammunition, does not facilitate purchases,
          and does not provide guidance on modification or illegal acquisition. Always comply with
          the firearms laws of your country and consult licensed dealers and authorities.
        </p>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 py-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}
