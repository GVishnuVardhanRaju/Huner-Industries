// Firearm image resolution.
// Per-firearm AI-generated photos (src/assets/firearms/models/<id>.jpg) when available,
// otherwise the AI-generated category hero. No external/Wikimedia images.

import aiAssaultRifle from "@/assets/firearms/assault-rifle.jpg";
import aiBattleRifle from "@/assets/firearms/battle-rifle.jpg";
import aiPistol from "@/assets/firearms/pistol.jpg";
import aiRevolver from "@/assets/firearms/revolver.jpg";
import aiSmg from "@/assets/firearms/smg.jpg";
import aiShotgun from "@/assets/firearms/shotgun.jpg";
import aiSniper from "@/assets/firearms/sniper-rifle.jpg";
import aiMachineGun from "@/assets/firearms/machine-gun.jpg";
import aiHistorical from "@/assets/firearms/historical.jpg";

const aiCategoryHero: Record<string, string> = {
  "Assault Rifle": aiAssaultRifle,
  "Battle Rifle": aiBattleRifle,
  "Pistol": aiPistol,
  "Revolver": aiRevolver,
  "SMG": aiSmg,
  "Shotgun": aiShotgun,
  "Sniper Rifle": aiSniper,
  "Machine Gun": aiMachineGun,
  "Historical": aiHistorical,
};

// Eagerly resolve every per-firearm AI image into a URL map keyed by firearm id.
// Vite bundles only files that exist, so this grows automatically as images are added.
const modelModules = import.meta.glob("@/assets/firearms/models/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const modelById: Record<string, string> = {};
for (const [path, url] of Object.entries(modelModules)) {
  const id = path.split("/").pop()!.replace(/\.jpg$/, "");
  modelById[id] = url;
}

type FirearmLike = { category: string; name: string; id?: string; image?: string };

function heroFor(firearm: FirearmLike): string {
  return aiCategoryHero[firearm.category] ?? aiHistorical;
}

function modelFor(firearm: FirearmLike): string | undefined {
  return firearm.id ? modelById[firearm.id] : undefined;
}

/** Ordered list: per-firearm AI photo first (if any), then the category hero fallback. */
export function getFirearmImages(firearm: FirearmLike): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const url of [modelFor(firearm), heroFor(firearm)]) {
    if (url && !seen.has(url)) {
      seen.add(url);
      out.push(url);
    }
  }
  return out;
}

/** Single best image (SSR, og:image, etc) — per-firearm AI photo if present, else hero. */
export function getFirearmImage(firearm: FirearmLike): string {
  return modelFor(firearm) ?? heroFor(firearm);
}

/** onError handler — swaps in the category hero if a photo fails to load. */
export function imageFallbackHandler(firearm: FirearmLike) {
  const fallback = heroFor(firearm);
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.src !== fallback) img.src = fallback;
  };
}
