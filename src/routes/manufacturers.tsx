import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Factory, MapPin } from "lucide-react";
import { manufacturers } from "@/data/manufacturers";
import { firearms } from "@/data/firearms";
import ManufacturerCard from "@/components/ManufacturerCard";

export const Route = createFileRoute("/manufacturers")({
  head: () => ({
    meta: [
      { title: "Manufacturers — Huner Industries" },
      { name: "description", content: "Profiles of major firearm manufacturers: Glock, Heckler & Koch, Colt, SIG Sauer, Beretta, FN Herstal, and more." },
    ],
  }),
  component: Manufacturers,
});

function Manufacturers() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <header className="mb-10">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brass">Industry</span>
        <h1 className="mt-2 font-display text-4xl md:text-5xl uppercase">Manufacturers</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Profiles of the most influential firearms manufacturers in history.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {manufacturers.map((m, i) => {
          const items = firearms.filter((f) => f.manufacturer.includes(m.name.split(" ")[0]));
          return (
            <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <ManufacturerCard m={m} sampleCount={Math.min(items.length, 6)} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
