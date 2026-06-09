import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Globe2, ShieldCheck, Crosshair } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Huner Industries" },
      { name: "description", content: "Huner Industries is a fictional informational firearms archive dedicated to historical and educational documentation of small arms worldwide." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      <header className="text-center mb-12">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brass">Who we are</span>
        <h1 className="mt-2 font-display text-4xl md:text-6xl uppercase">About Huner Industries</h1>
      </header>

      <div className="glass rounded-2xl p-8 md:p-12">
        <p className="text-base leading-relaxed text-muted-foreground">
          <span className="text-brass font-medium">Huner Industries</span> is a fictional informational
          organization dedicated to documenting the global history, design, and evolution of firearms.
          We operate strictly as an educational and historical archive — providing detailed entries
          for thousands of small arms across categories, eras, manufacturers, and countries.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          The archive serves historians, researchers, journalists, hobbyists, and anyone seeking accurate
          reference data. We do not sell firearms, ammunition, or accessories. We do not facilitate
          purchases. We do not provide guidance on modification or illegal acquisition.
        </p>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {[
          { icon: BookOpen, t: "Educational", d: "Detailed specs, history, and context for every entry." },
          { icon: Globe2, t: "Global", d: "Coverage spanning 50+ countries and 200+ manufacturers." },
          { icon: Crosshair, t: "Accurate", d: "Cross-referenced data with citations where available." },
          { icon: ShieldCheck, t: "Responsible", d: "No sales, no modification guides, no illegal content." },
        ].map((v) => (
          <div key={v.t} className="glass rounded-xl p-5">
            <v.icon className="h-6 w-6 text-brass mb-3" />
            <div className="font-display uppercase tracking-wider">{v.t}</div>
            <p className="text-sm text-muted-foreground mt-1">{v.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/encyclopedia" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm uppercase tracking-wider text-primary-foreground hover:bg-primary/90">
          Explore the Encyclopedia
        </Link>
      </div>
    </div>
  );
}
