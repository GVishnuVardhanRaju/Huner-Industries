import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import faviconIcon from "../../favicon/favicon.svg?url";

const links = [
  { to: "/", label: "Home" },
  { to: "/encyclopedia", label: "Encyclopedia" },
  { to: "/categories", label: "Categories" },
  { to: "/timeline", label: "Timeline" },
  { to: "/manufacturers", label: "Manufacturers" },
  { to: "/countries", label: "Countries" },
  { to: "/compare", label: "Compare" },
  { to: "/viewer", label: "3D Viewer" },
  { to: "/legal", label: "Legal" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled ? "glass shadow-elegant" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3 group min-w-0">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-black shadow-brass">
            <img src={faviconIcon} alt="Huner Industries logo" className="h-8 w-8 object-contain" />
          </span>
          <div className="leading-none min-w-0">
            <div className="font-display text-lg tracking-[0.18em] uppercase">
              Huner <span className="text-brass">Industries</span>
            </div>
          </div>
        </Link>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/70 text-foreground transition hover:bg-card"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden glass border-t border-border"
          >
            <div className="flex flex-col p-4 gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "text-primary bg-secondary" }}
                  activeOptions={{ exact: l.to === "/" }}
                  className="px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
