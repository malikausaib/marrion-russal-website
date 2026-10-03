/**
 * Divisions & Therapeutic Areas Data
 * Strictly based on official provided company divisions
 */

export const DIVISIONS = [
  {
    id: "general-1",
    name: "GENERAL DIVISION 1",
    code: "GD-01",
    summary: "Dedicated to comprehensive clinical care across primary gastroenterology, pediatric medicine, general healthcare, and ear, nose, and throat disciplines.",
    therapeuticAreas: [
      { name: "GASTROENTEROLOGY", tag: "GI" },
      { name: "PEDIATRICS", tag: "PED" },
      { name: "GENERAL MEDICINE", tag: "GM" },
      { name: "ENT", tag: "ENT" }
    ],
    accentColor: "var(--navy-primary)"
  },
  {
    id: "general-2",
    name: "GENERAL DIVISION 2ND",
    code: "GD-02",
    summary: "Extending therapeutics in gastroenterology, pediatrics, general medicine, and otorhinolaryngology across specialized clinical portfolios.",
    therapeuticAreas: [
      { name: "GASTROENTEROLOGY", tag: "GI" },
      { name: "PEDIATRICS", tag: "PED" },
      { name: "GENERAL MEDICINE", tag: "GM" },
      { name: "ENT", tag: "ENT" }
    ],
    accentColor: "var(--wine-primary)"
  },
  {
    id: "dental",
    name: "DENTAL DIVISION",
    code: "DT-03",
    summary: "Specialized pharmaceutical formulations developed specifically for advanced oral health, mucosal hygiene, and dental care therapies.",
    therapeuticAreas: [],
    accentColor: "var(--cyan-accent)"
  },
  {
    id: "dermatology",
    name: "DERMATOLOGY DIVISION",
    code: "DM-04",
    summary: "Targeted dermatological remedies focused on skin health, barrier restoration, anti-fungal hygiene, and topical therapeutic care.",
    therapeuticAreas: [],
    accentColor: "var(--bronze-accent)"
  }
];
