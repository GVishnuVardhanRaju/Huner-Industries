import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { imageFallbackHandler, getFirearmImage } from "@/utils/firearmImage";
import { motion } from "framer-motion";
import { Search, ArrowRight, Crosshair, Globe2, BookOpen, Factory } from "lucide-react";
import { firearms, categories } from "@/data/firearms";
import { manufacturers } from "@/data/manufacturers";
import { FirearmCard } from "@/components/FirearmCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Huner Industries — Global Firearms Encyclopedia" },
      { name: "description", content: "Premium educational archive of firearms from around the world: specs, history, timeline, manufacturers and licensed dealer information." },
    ],
  }),
  component: Home,
});

function Home() {
  const [heroVideoSrc, setHeroVideoSrc] = useState(() =>
    typeof window !== "undefined" && window.innerWidth <= 640 ? "/heromobile.mp4" : "/hero.mp4"
  );
  const featured = firearms.slice(0, 6);
  const ofTheDay = firearms[new Date().getDate() % firearms.length];

  useEffect(() => {
    const updateVideoSrc = () => {
      setHeroVideoSrc(window.innerWidth <= 640 ? "/heromobile.mp4" : "/hero.mp4");
    };

    updateVideoSrc();
    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[90vh] sm:min-h-screen">
        {/* Background video — local file is preferred, remote sample fallback is provided. */}
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover pointer-events-none"
          style={{ objectPosition: "center center" }}
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.svg"
          key={heroVideoSrc}
        >
          <source src={heroVideoSrc} type="video/mp4" />
          <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          <source src="https://storage.googleapis.com/media-session/elephants-dream/the-wires.webm" type="video/webm" />
        </video>
        {/* Fallback gradient sits behind the video so the hero still looks good before a video is added */}
        <div
          className="absolute inset-0 -z-20 pointer-events-none"
          style={{ background: "var(--gradient-hero)" }}
        />
        {/* Dark overlay to keep text readable on top of any video */}
        <div className="absolute inset-0 -z-10 bg-background/30" />
        <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-28 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Global Firearms Archive · Est. 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 font-display text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight leading-none text-white drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]"
          >
            Huner <span className="text-gradient-brass">Industries</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 mx-auto max-w-3xl text-base sm:text-xl md:text-2xl text-white/90 font-medium leading-relaxed"
          >
            Global Firearms Encyclopedia & Licensed Dealer Information.
            <br />
            A premium educational archive of historical and modern firearms from around the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex justify-center"
          >
            <Link
              to="/encyclopedia"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-brass transition hover:brightness-110"
            >
              Explore Firearms
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { v: "2,000+", l: "Firearms" },
              { v: "9", l: "Categories" },
              { v: "50+", l: "Countries" },
              { v: "200+", l: "Manufacturers" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass rounded-xl px-4 py-5"
              >
                <div className="font-display text-3xl md:text-4xl text-brass">{s.v}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FIREARM OF THE DAY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 -mt-12 relative z-10">
        <Link to="/firearm/$id" params={{ id: ofTheDay.id }} className="block group">
          <div className="glass rounded-2xl overflow-hidden grid md:grid-cols-2 shadow-elegant hover:shadow-brass transition-shadow">
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden relative">
              <img src={getFirearmImage(ofTheDay)} alt={ofTheDay.name} onError={imageFallbackHandler(ofTheDay)} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-card/80 to-transparent" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brass">Firearm of the Day</span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl uppercase">{ofTheDay.name}</h2>
              <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{ofTheDay.history}</p>
              <div className="mt-6 grid grid-cols-3 gap-4 text-xs">
                <div><div className="text-brass">Caliber</div><div>{ofTheDay.caliber}</div></div>
                <div><div className="text-brass">Year</div><div>{ofTheDay.year}</div></div>
                <div><div className="text-brass">Origin</div><div>{ofTheDay.country}</div></div>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-wider text-brass group-hover:gap-3 transition-all">
                View entry <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <SectionHeading kicker="Browse" title="Categories" icon={<BookOpen className="h-4 w-4" />} />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
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
                className="group block glass rounded-xl p-6 hover:border-primary/60 hover:bg-card transition-all"
              >
                <Crosshair className="h-6 w-6 text-brass mb-3 group-hover:rotate-90 transition-transform duration-500" />
                <div className="font-display text-lg uppercase tracking-wider">{cat}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {firearms.filter((f) => f.category === cat).length} entries
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <SectionHeading kicker="Curated" title="Featured Firearms" icon={<Crosshair className="h-4 w-4" />} />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((f, i) => (
            <FirearmCard key={f.id} firearm={f} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/encyclopedia" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm uppercase tracking-wider text-primary-foreground hover:bg-primary/90">
            Open Encyclopedia <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* TIMELINE PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <SectionHeading kicker="History" title="Evolution Timeline" icon={<Globe2 className="h-4 w-4" />} />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-3">
          {["Pre-WWI", "WWI", "WWII", "Cold War", "Modern"].map((era, i) => (
            <Link
              key={era}
              to="/timeline"
              className="glass rounded-xl p-5 text-center hover:border-primary/60 transition-all"
            >
              <div className="font-display text-2xl text-brass">{["1800s", "1914-18", "1939-45", "1947-91", "1992+"][i]}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">{era}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* MANUFACTURERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <SectionHeading kicker="Industry" title="Featured Manufacturers" icon={<Factory className="h-4 w-4" />} />
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {manufacturers.slice(0, 8).map((m) => (
            <Link
              key={m.id}
              to="/manufacturers"
              className="glass rounded-xl p-5 hover:border-primary/60 transition-all"
            >
              <div className="font-display text-lg uppercase">{m.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.country} · est. {m.founded}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ kicker, title, icon }: { kicker: string; title: string; icon?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-brass">
        {icon} {kicker}
      </span>
      <h2 className="mt-3 font-display text-4xl md:text-5xl uppercase">{title}</h2>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </div>
  );
}
