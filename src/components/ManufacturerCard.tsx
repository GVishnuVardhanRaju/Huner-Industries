"use client";

import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Factory, MapPin } from "lucide-react";
import flagFor from "@/lib/flags";
import { Manufacturer } from "@/data/manufacturers";

type Props = {
  m: Manufacturer;
  sampleCount?: number;
};

export default function ManufacturerCard({ m, sampleCount = 6 }: Props) {
  const logoSrc = m.logo ?? null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <article className="group cursor-pointer glass rounded-lg p-4 hover:shadow-lg transition-shadow flex items-start gap-4">
          <div className="shrink-0">
            <div className="relative h-14 w-14 rounded-md overflow-hidden bg-secondary/40 grid place-items-center">
              {logoSrc ? (
                // Use next/image if available; fallback to img
                <img src={logoSrc} alt={`${m.name} logo`} className="h-12 w-12 object-contain" />
              ) : (
                <div className="text-xl font-semibold text-muted-foreground">{m.name.split(" ").map((s) => s[0]).slice(0,2).join("")}</div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <h3 className="font-display text-sm uppercase tracking-wider truncate">{m.name}</h3>
              <img src={flagFor(m.country)} alt={`${m.country} flag`} className="h-4 w-6 object-cover rounded" />
            </div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
              <MapPin className="h-3 w-3 text-brass" />
              <span className="truncate">{m.headquarters}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{m.description}</p>

            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-md border border-border px-2 py-1 bg-secondary/50">Founded {m.founded}</span>
              <span className="rounded-md border border-border px-2 py-1 bg-secondary/50">{m.notable.length} notable</span>
              <span className="rounded-md border border-border px-2 py-1 bg-secondary/50">{sampleCount} in archive</span>
            </div>
          </div>
        </article>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{m.name}</DialogTitle>
          <DialogDescription>
            <div className="text-sm text-muted-foreground">{m.headquarters} · Founded {m.founded}</div>
          </DialogDescription>
        </DialogHeader>
        <div>
          <p className="text-sm text-muted-foreground mt-2">{m.description}</p>

          <div className="mt-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-brass mb-2">Notable models</div>
            <div className="flex flex-wrap gap-2">
              {m.notable.map((n) => (
                <span key={n} className="rounded-md border border-border bg-secondary/50 px-3 py-1 text-xs">{n}</span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
