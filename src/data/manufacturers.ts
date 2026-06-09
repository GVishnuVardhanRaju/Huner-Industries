export type Manufacturer = {
  id: string;
  name: string;
  country: string;
  founded: number;
  headquarters: string;
  description: string;
  notable: string[];
  logo?: string;
};

export const manufacturers: Manufacturer[] = [
  {
    id: "glock",
    name: "Glock",
    country: "Austria",
    founded: 1963,
    headquarters: "Deutsch-Wagram, Austria",
    description:
      "Glock GmbH revolutionized the handgun market with its polymer-framed, striker-fired pistols. The brand became synonymous with reliability and is standard issue for law enforcement worldwide.",
    notable: ["Glock 17", "Glock 19", "Glock 26", "Glock 34"],
  },
  {
    id: "heckler-koch",
    name: "Heckler & Koch",
    country: "Germany",
    founded: 1949,
    headquarters: "Oberndorf am Neckar, Germany",
    description:
      "Founded by former Mauser engineers, H&K is renowned for engineering excellence and produces firearms used by military and special forces around the world.",
    notable: ["MP5", "G3", "G36", "USP", "HK416"],
  },
  {
    id: "colt",
    name: "Colt's Manufacturing",
    country: "USA",
    founded: 1855,
    headquarters: "West Hartford, Connecticut",
    description:
      "One of the oldest American firearms manufacturers, Colt has been pivotal in handgun and rifle history, including the iconic Single Action Army and the M16 family.",
    notable: ["M1911", "M16", "M4 Carbine", "Single Action Army"],
  },
  {
    id: "sig-sauer",
    name: "SIG Sauer",
    country: "Germany / USA",
    founded: 1853,
    headquarters: "Eckernförde, Germany / Newington, USA",
    description:
      "Known for precision engineering and military-grade reliability, SIG Sauer pistols and rifles are adopted by elite military and police units globally.",
    notable: ["P226", "P320", "MCX", "MPX"],
  },
  {
    id: "beretta",
    name: "Beretta",
    country: "Italy",
    founded: 1526,
    headquarters: "Gardone Val Trompia, Italy",
    description:
      "The world's oldest active firearms manufacturer, Beretta has produced military, civilian, and sporting firearms for nearly five centuries.",
    notable: ["92FS / M9", "ARX-160", "1301 Tactical"],
  },
  {
    id: "fn-herstal",
    name: "FN Herstal",
    country: "Belgium",
    founded: 1889,
    headquarters: "Herstal, Belgium",
    description:
      "Fabrique Nationale d'Herstal designs many of the world's most influential service firearms, including the FAL, P90, and SCAR.",
    notable: ["FN FAL", "P90", "SCAR", "MINIMI / M249"],
  },
  {
    id: "kalashnikov",
    name: "Kalashnikov Concern",
    country: "Russia",
    founded: 1807,
    headquarters: "Izhevsk, Russia",
    description:
      "Russia's primary small arms producer, responsible for the AK family of rifles — among the most produced firearms in history.",
    notable: ["AK-47", "AKM", "AK-74", "AK-12", "PKM"],
  },
  {
    id: "smith-wesson",
    name: "Smith & Wesson",
    country: "USA",
    founded: 1852,
    headquarters: "Springfield, Massachusetts, USA",
    description:
      "One of America's oldest and most recognizable handgun manufacturers, known for revolvers and modern semi-automatic pistols.",
    notable: ["Model 10", "Model 29", "M&P"],
  },
  {
    id: "remington",
    name: "Remington Arms",
    country: "USA",
    founded: 1816,
    headquarters: "Madison, North Carolina, USA",
    description:
      "Historic American manufacturer of rifles and shotguns, influential in sporting and military small arms development.",
    notable: ["Remington 700", "Model 870"],
  },
  {
    id: "ruger",
    name: "Sturm, Ruger & Co.",
    country: "USA",
    founded: 1949,
    headquarters: "Southport, Connecticut, USA",
    description:
      "Ruger produces a wide range of affordable, durable firearms for civilian, law enforcement, and military markets.",
    notable: ["American Rifle", "GP100", "10/22"],
  },
  {
    id: "winchester",
    name: "Winchester Repeating Arms",
    country: "USA",
    founded: 1866,
    headquarters: "New Haven, Connecticut, USA",
    description:
      "Synonymous with lever-action rifles and American frontier history, Winchester shaped sporting and military small arms.",
    notable: ["Model 1873", "Model 1894"],
  },
  {
    id: "walther",
    name: "Carl Walther GmbH",
    country: "Germany",
    founded: 1886,
    headquarters: "Ulm, Germany",
    description:
      "German arms maker famous for pistols used in competitive shooting and military contracts, with a long history of innovation.",
    notable: ["P38", "PPK", "P99"],
  },
  {
    id: "cz",
    name: "Česká Zbrojovka (CZ)",
    country: "Czech Republic",
    founded: 1936,
    headquarters: "Uherský Brod, Czech Republic",
    description:
      "Czech manufacturer producing reliable pistols and rifles with strong export presence in law enforcement and civilian markets.",
    notable: ["CZ 75", "BREN 2"],
  },
  {
    id: "mauser",
    name: "Mauser",
    country: "Germany",
    founded: 1871,
    headquarters: "Oberndorf am Neckar, Germany",
    description:
      "Historic German arms manufacturer renowned for bolt-action rifle designs that influenced military small arms worldwide.",
    notable: ["Gewehr 98", "Mauser M98"],
  },
  {
    id: "iwi",
    name: "IWI (Israel Weapon Industries)",
    country: "Israel",
    founded: 1933,
    headquarters: "Ramat HaSharon, Israel",
    description:
      "Israeli arms company behind modern service rifles and personal defense weapons widely used by armed forces worldwide.",
    notable: ["Tavor TAR-21", "Galil ACE", "Uzi"],
  },
  {
    id: "browning",
    name: "Browning Arms Company",
    country: "Belgium",
    founded: 1897,
    headquarters: "Liège, Belgium",
    description:
      "Founded by John Browning, the company produced many influential firearm designs and continues as a major sporting brand.",
    notable: ["Browning Auto-5", "Hi-Power (licensed)", "BAR"],
  },
  {
    id: "springfield-armory",
    name: "Springfield Armory",
    country: "USA",
    founded: 1777,
    headquarters: "Geneseo, Illinois, USA",
    description:
      "Historic U.S. armory and modern commercial manufacturer known for classic military and modern sport firearms.",
    notable: ["M1 Garand (historic)", "XD series"],
  },
  {
    id: "steyr",
    name: "Steyr Arms",
    country: "Austria",
    founded: 1864,
    headquarters: "Steyr, Austria",
    description:
      "Austrian firm producing precision rifles and military small arms with a long industrial heritage.",
    notable: ["Steyr AUG", "Mannlicher series"],
  },
  {
    id: "aweil",
    name: "Advanced Weapons and Equipment India Ltd.",
    country: "India",
    founded: 2021,
    headquarters: "Kolkata, India",
    description:
      "One of the corporatised successors to India's Ordnance Factory Board, focused on producing small arms, ammunition, and related equipment for domestic and export markets.",
    notable: ["INSAS (legacy production)", "Service rifles", "Small arms"],
  },
];
