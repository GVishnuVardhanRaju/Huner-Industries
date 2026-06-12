import { Link } from "@tanstack/react-router";
import { Shield, BookOpen, Globe } from "lucide-react";
import faviconIcon from "../../favicon/favicon.svg?url";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-md bg-black">
              <img src={faviconIcon} alt="Huner Industries logo" className="h-7 w-7 object-contain" />
            </span>
            <span className="font-display tracking-widest uppercase">
              Huner <span className="text-brass">Industries</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            A global firearms encyclopedia and licensed offline dealer information platform.
            Educational and historical use only.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-brass mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/encyclopedia" className="hover:text-foreground">Encyclopedia</Link></li>
            <li><Link to="/categories" className="hover:text-foreground">Categories</Link></li>
            <li><Link to="/timeline" className="hover:text-foreground">Timeline</Link></li>
            <li><Link to="/manufacturers" className="hover:text-foreground">Manufacturers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-brass mb-3">Reference</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/countries" className="hover:text-foreground">By Country</Link></li>
            <li><Link to="/compare" className="hover:text-foreground">Compare</Link></li>
            <li><Link to="/legal" className="hover:text-foreground">Legal Info</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-brass mb-3">Notice</h4>
          <ul className="space-y-3 text-xs text-muted-foreground">
            <li className="flex gap-2"><Shield className="h-4 w-4 text-accent shrink-0 mt-0.5" /> No online sales. Informational only.</li>
            <li className="flex gap-2"><BookOpen className="h-4 w-4 text-accent shrink-0 mt-0.5" /> Historical & educational archive.</li>
            <li className="flex gap-2"><Globe className="h-4 w-4 text-accent shrink-0 mt-0.5" /> Comply with local laws & licensing.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 text-xs text-muted-foreground">
          <p className="mb-4 max-w-5xl mx-auto text-center md:text-left">
            <strong>Educational Use Only</strong> — Huner Industries is a historical and educational reference archive documenting firearms, manufacturers, and their historical development. No firearms, ammunition, parts, accessories, or related services are sold, advertised, brokered, transferred, or facilitated through this platform. Users are responsible for complying with all applicable laws and regulations in their jurisdiction.
          </p>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground text-center md:text-left">
            <p>© {new Date().getFullYear()} Huner Industries — A fictional informational archive.</p>
            <p className="uppercase tracking-[0.2em]">Educational use only</p>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-5 pt-3 text-xs text-muted-foreground text-center">
            Designed & Built By G VISHNU VARDHAN RAJU
          </div>
        </div>
      </div>
    </footer>
  );
}
