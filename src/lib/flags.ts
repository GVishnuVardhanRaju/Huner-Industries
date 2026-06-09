const RAW_COUNTRY_FLAGS: Record<string, string> = {
  USA: "us",
  "United States": "us",
  "United States of America": "us",
  US: "us",
  "U.S.": "us",
  "U.S.A.": "us",
  Russia: "ru",
  "Soviet Union": "ru",
  Germany: "de",
  India: "in",
  Israel: "il",
  China: "cn",
  UK: "gb",
  "United Kingdom": "gb",
  France: "fr",
  Italy: "it",
  Austria: "at",
  Belgium: "be",
  Switzerland: "ch",
  "Czech Republic": "cz",
  Czechoslovakia: "cz",
  Japan: "jp",
  Spain: "es",
  Sweden: "se",
  Finland: "fi",
  Poland: "pl",
  Brazil: "br",
  "South Korea": "kr",
  Croatia: "hr",
  Turkey: "tr",
  Canada: "ca",
  Norway: "no",
  Hungary: "hu",
  Serbia: "rs",
  "South Africa": "za",
};

const COUNTRY_FLAGS: Record<string, string> = Object.fromEntries(
  Object.entries(RAW_COUNTRY_FLAGS).map(([k, v]) => [k.toLowerCase().trim(), v]),
) as Record<string, string>;

export const flagFor = (c?: string) => {
  if (!c) return `https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/xx.svg`;

  const key = c.toLowerCase().trim();
  if (COUNTRY_FLAGS[key]) return `https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/${COUNTRY_FLAGS[key]}.svg`;

  const parts = key.split(/\s*[\/,&|]\s*|\s+and\s+/i).map((p) => p.trim()).filter(Boolean);
  for (const part of parts) {
    if (COUNTRY_FLAGS[part]) return `https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/${COUNTRY_FLAGS[part]}.svg`;
  }

  const tokens = key.split(/\s+/).filter(Boolean);
  for (const t of tokens) {
    if (COUNTRY_FLAGS[t]) return `https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/${COUNTRY_FLAGS[t]}.svg`;
  }

  return `https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/xx.svg`;
};

export default flagFor;
