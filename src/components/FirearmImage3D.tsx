import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getFirearmImages } from "@/utils/firearmImage";

type FirearmLike = { category: string; name: string; id?: string };

interface Props {
  firearm: FirearmLike;
  className?: string;
  /** ms between rotations. 0 disables rotation (shows the best image only). */
  intervalMs?: number;
  /** Pause rotation while the mouse is over the image. */
  pauseOnHover?: boolean;
  alt?: string;
}

/**
 * Rotates through every available Wikimedia image for a firearm with a 3D Y-axis flip.
 * Skips images that fail to load. If only one image is available (or all fail), the
 * SVG fallback is shown statically — guaranteeing something is always visible.
 *
 * Fallback order: keyword Wikimedia photos → category default photos → generated SVG.
 */
export function FirearmImage3D({
  firearm,
  className = "",
  intervalMs = 4500,
  pauseOnHover = true,
  alt,
}: Props) {
  const allImages = useMemo(() => getFirearmImages(firearm), [firearm]);
  const [broken, setBroken] = useState<Set<string>>(() => new Set());
  const images = useMemo(() => {
    const ok = allImages.filter((u) => !broken.has(u));
    return ok.length > 0 ? ok : [allImages[allImages.length - 1]]; // SVG is always last
  }, [allImages, broken]);

  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const indexRef = useRef(0);
  indexRef.current = index % images.length;

  useEffect(() => {
    if (intervalMs <= 0 || images.length < 2) return;
    if (pauseOnHover && hovered) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, images.length, hovered, pauseOnHover]);

  const safeIndex = images.length > 0 ? index % images.length : 0;
  const currentSrc = images[safeIndex];

  return (
    <div
      className={`relative h-full w-full ${className}`}
      style={{ perspective: 1200 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={currentSrc}
          src={currentSrc}
          alt={alt ?? firearm.name}
          loading="lazy"
          initial={{ opacity: 0, rotateY: 90, scale: 0.92 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: -90, scale: 0.92 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => {
            setBroken((prev) => {
              if (prev.has(currentSrc)) return prev;
              const next = new Set(prev);
              next.add(currentSrc);
              return next;
            });
          }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <div className="pointer-events-none absolute bottom-2 right-2 flex gap-1">
          {images.map((u, i) => (
            <span
              key={u}
              className={`h-1 rounded-full transition-all ${
                i === safeIndex ? "w-4 bg-brass" : "w-1.5 bg-muted/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FirearmImage3D;
