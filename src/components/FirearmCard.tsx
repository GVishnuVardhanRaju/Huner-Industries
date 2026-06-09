import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Calendar, Crosshair } from "lucide-react";
import type { Firearm } from "@/data/firearms";
import { FirearmImage3D } from "@/components/FirearmImage3D";

export function FirearmCard({ firearm, index = 0 }: { firearm: Firearm; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
    >
      <Link
        to="/firearm/$id"
        params={{ id: firearm.id }}
        className="group block glass rounded-xl overflow-hidden hover:border-primary/60 transition-all hover:-translate-y-1 hover:shadow-brass"
      >
        <div className="relative aspect-[5/3] overflow-hidden bg-gradient-to-br from-secondary to-card">
          <FirearmImage3D
            firearm={firearm}
            intervalMs={5000 + (index % 5) * 600}
            className="opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] bg-primary/90 text-primary-foreground px-2 py-1 rounded">
            {firearm.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-display text-lg uppercase tracking-wider group-hover:text-brass transition-colors">
            {firearm.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{firearm.manufacturer}</p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-brass" />{firearm.country}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-brass" />{firearm.year}</span>
            <span className="flex items-center gap-1"><Crosshair className="h-3 w-3 text-brass" />{firearm.caliber.split(" ")[0]}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
