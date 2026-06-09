import { createFileRoute } from "@tanstack/react-router";
import { Scale, ShieldCheck, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal Information — Huner Industries" },
      { name: "description", content: "Educational overview of firearm ownership laws, licensing requirements, and civilian legality across selected countries." },
    ],
  }),
  component: Legal,
});

const countriesInfo = [
  { c: "United States", ownership: "Permitted with state-specific restrictions.", license: "Background check via NICS. Some states require permits.", notes: "Concealed carry rules vary widely by state." },
  { c: "United Kingdom", ownership: "Highly restricted. Handguns largely prohibited.", license: "Firearms or Shotgun Certificate issued by police.", notes: "Strict storage, transport, and use regulations." },
  { c: "Germany", ownership: "Permitted with WBK license.", license: "Demonstrated need, proficiency exam, secure storage.", notes: "Strong emphasis on sport, hunting, and collecting." },
  { c: "India", ownership: "Restricted. Arms Act, 1959.", license: "Justified need, character verification, renewals required.", notes: "Many calibers prohibited for civilians." },
  { c: "Russia", ownership: "Permitted with license; civilian use limited.", license: "Medical and training requirements; staged license tiers.", notes: "Smoothbore first, rifled after years of ownership." },
  { c: "Israel", ownership: "Permitted with stringent criteria.", license: "Demonstrated need (e.g. security work, residence area).", notes: "Strict ammunition quotas and renewals." },
  { c: "Switzerland", ownership: "Permitted with acquisition permit.", license: "Cantonal permits; certain items prohibited.", notes: "Long-standing militia tradition." },
  { c: "Canada", ownership: "Permitted with licensing for non-restricted, restricted, and prohibited firearms.", license: "Possession and Acquisition Licence required; safe storage laws enforced.", notes: "Magazine limits and transportation rules apply." },
  { c: "Australia", ownership: "Highly restricted after 1996 reforms.", license: "Genuine reason and safety training required; self-defense generally not accepted.", notes: "Semi-automatic rifles and shotguns are tightly controlled." },
  { c: "France", ownership: "Permitted for sport and hunting with category-specific approval.", license: "Medical exam, storage proof, and membership in shooting club required.", notes: "Regular renewals and background checks are mandatory." },
  { c: "Japan", ownership: "Extremely restricted.", license: "Police-issued firearm and ammunition licence after exam and inspection.", notes: "Civilian ownership mostly limited to shotguns and air rifles." },
  { c: "Brazil", ownership: "Permitted with strict licensing and background checks.", license: "Police-issued permits for collection, sport shooting, or home defense.", notes: "Recent regulatory changes have tightened civilian access." },
  { c: "South Korea", ownership: "Permitted under strict controls for hunting and sport.", license: "Background checks, storage inspections, and renewal every 3 years.", notes: "Most firearms remain restricted to certified users." },
];

function Legal() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <header className="mb-10 text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brass">Reference</span>
        <h1 className="mt-2 font-display text-4xl md:text-5xl uppercase">Legal Information</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
          A high-level educational overview of firearm laws by country. Always consult local authorities for authoritative guidance.
        </p>
      </header>

      <div className="glass rounded-xl p-6 mb-8 border-destructive/30 flex gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          This page is informational only. Huner Industries is not a legal authority and does not provide legal advice.
          Firearm law changes frequently — verify everything with official sources in your jurisdiction.
        </p>
      </div>

      <div className="space-y-4">
        {countriesInfo.map((c) => (
          <article key={c.c} className="glass rounded-xl p-6">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-brass" />
              <h2 className="font-display text-xl uppercase tracking-wider">{c.c}</h2>
            </div>
            <dl className="mt-4 grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-brass mb-1">Ownership</dt>
                <dd className="text-muted-foreground">{c.ownership}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-brass mb-1">Licensing</dt>
                <dd className="text-muted-foreground">{c.license}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-brass mb-1">Notes</dt>
                <dd className="text-muted-foreground">{c.notes}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="mt-10 glass rounded-xl p-6 flex gap-3">
        <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Huner Industries does not sell firearms or ammunition, does not process online purchases, and does not provide
          guidance on weapon modification or illegal acquisition. Information is offered for historical, educational,
          and reference purposes.
        </p>
      </div>
    </div>
  );
}
