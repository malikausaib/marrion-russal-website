/**
 * Master Data Bundle for Marrion Russal Remedies Pvt. Ltd.
 * Bundled inside assets/js for 100% reliable browser module resolution.
 */

export const COMPANY_INFO = {
  officialName: "Marrion Russal Remedies Pvt. Ltd.",
  brandName: "MARRION RUSSAL REMEDIES",
  motto: "Serving Life. Spreading Wellness.",
  yearEstablished: 2017,
  email: "marrionrussal@gmail.com",
  purchaseEmail: "marrionrussal@gmail.com",
  whatsappNumber: "919149412102",
  whatsappDisplayNumber: "+91 9149412102",
  address: {
    line1: "MARRION RUSSAL REMEDIES",
    street: "SIANA ROAD, AURANGABAD",
    districtState: "DIST: BULLANDSHAHAR, UP",
    pinCode: "431001",
    formatted: "MARRION RUSSAL REMEDIES\nSIANA ROAD, AURANGABAD\nDIST: BULLANDSHAHAR, UP\n431001",
    inline: "Siana Road, Aurangabad, Dist: Bullandshahar, UP 431001"
  },
  logoPath: "assets/images/logo.jpg"
};

export const COMPANY_PURCHASE_SETTINGS = {
  purchaseEmail: "marrionrussal@gmail.com",
  whatsappNumber: "919149412102",
  whatsappDisplayNumber: "+91 9149412102"
};

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
    ]
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
    ]
  },
  {
    id: "dental",
    name: "DENTAL DIVISION",
    code: "DT-03",
    summary: "Specialized pharmaceutical formulations developed specifically for advanced oral health, mucosal hygiene, and dental care therapies.",
    therapeuticAreas: []
  },
  {
    id: "dermatology",
    name: "DERMATOLOGY DIVISION",
    code: "DM-04",
    summary: "Targeted dermatological remedies focused on skin health, barrier restoration, anti-fungal hygiene, and topical therapeutic care.",
    therapeuticAreas: []
  }
];

export const PRODUCT_FAMILIES = [
  "ALL",
  "GASORIL",
  "NASRIL",
  "SUCRACELL",
  "DEVAC",
  "ACETOS",
  "CLEAR 32",
  "LC",
  "SOFTEX",
  "SHADEX",
  "KETOTOS",
  "PERMETOS"
];

export const PRODUCTS = [
  {
    id: "gasoril-capsule",
    name: "GASORIL CAPSULE",
    family: "GASORIL",
    formulation: "Capsule",
    division: "GENERAL DIVISION 1",
    status: "current",
    image: "products/gasoril-capsule.webp",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "gasoril-mps-syrup",
    name: "GASORIL MPS SYRUP",
    family: "GASORIL",
    formulation: "Syrup",
    division: "GENERAL DIVISION 1",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "gasoril-dsr-capsule",
    name: "GASORIL DSR CAPSULE",
    family: "GASORIL",
    formulation: "Capsule",
    division: "GENERAL DIVISION 1",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "gasoril-psc-tablet",
    name: "GASORIL PSC TABLET",
    family: "GASORIL",
    formulation: "Tablet",
    division: "GENERAL DIVISION 1",
    status: "current",
    image: "products/gasoril-psc.webp",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "gasoril-p-drops-suspension",
    name: "GASORIL P DROPS SUSPENSION",
    family: "GASORIL",
    formulation: "Drops / Suspension",
    division: "GENERAL DIVISION 1",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "gasoril-kid-drops",
    name: "GASORIL KID DROPS",
    family: "GASORIL",
    formulation: "Pediatric Drops",
    division: "GENERAL DIVISION 1",
    status: "current",
    image: "products/gasoril-kid.webp",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "gasoril-raft-syrup",
    name: "GASORIL RAFT SYRUP",
    family: "GASORIL",
    formulation: "Syrup",
    division: "GENERAL DIVISION 1",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "nasril-s",
    aliasId: "nasril-s-spray-drop",
    legacyName: "NASRIL S SPRAY/DROP",
    name: "NASRIL-S",
    productType: "Nasal Spray",
    formulation: "Nasal Spray",
    family: "NASRIL",
    division: "GENERAL DIVISION 1",
    status: "current",
    image: "assets/images/nasril-s.jpg",
    composition: "Sodium Chloride Nasal Solution",
    description: "Information to be added",
    indications: "Information to be added",
    dosage: "As directed by the physician.",
    packaging: "Information to be added",
    price: null
  },
  {
    id: "nasril-xp-spray-drop",
    name: "NASRIL XP SPRAY/DROP",
    family: "NASRIL",
    formulation: "Nasal Spray / Drop",
    division: "GENERAL DIVISION 1",
    status: "current",
    image: "products/nasril-xp.webp",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "nasril-x-spray-drop",
    name: "NASRIL X SPRAY/DROP",
    family: "NASRIL",
    formulation: "Nasal Spray / Drop",
    division: "GENERAL DIVISION 1",
    status: "current",
    image: "products/nasril-x.webp",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "nasril-f-spray",
    name: "NASRIL F SPRAY",
    family: "NASRIL",
    formulation: "Nasal Spray",
    division: "GENERAL DIVISION 1",
    status: "current",
    image: "products/nasril-f.webp",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "nasril-ax-syrup",
    name: "NASRIL AX SYRUP",
    family: "NASRIL",
    formulation: "Syrup",
    division: "GENERAL DIVISION 1",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "nasril-dx-syrup",
    name: "NASRIL DX SYRUP",
    family: "NASRIL",
    formulation: "Syrup",
    division: "GENERAL DIVISION 1",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "nasril-cold-tablet",
    name: "NASRIL COLD TABLET",
    family: "NASRIL",
    formulation: "Tablet",
    division: "GENERAL DIVISION 1",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "sucracell-o-suspension",
    name: "SUCRACELL O SUSPENSION",
    family: "SUCRACELL",
    formulation: "Oral Suspension",
    division: "GENERAL DIVISION 2ND",
    status: "current",
    image: "products/sucracell-o.webp",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "sucracell-plain-suspension",
    name: "SUCRACELL PLAIN SUSPENSION",
    family: "SUCRACELL",
    formulation: "Oral Suspension",
    division: "GENERAL DIVISION 2ND",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "devac-syrup",
    name: "DEVAC SYRUP",
    family: "DEVAC",
    formulation: "Syrup",
    division: "GENERAL DIVISION 2ND",
    status: "current",
    image: "products/devac-syrup.webp",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "devac-kid-syrup",
    name: "DEVAC KID SYRUP",
    family: "DEVAC",
    formulation: "Pediatric Syrup",
    division: "GENERAL DIVISION 2ND",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "acetos-gold-tablet",
    name: "ACETOS GOLD TABLET",
    family: "ACETOS",
    formulation: "Tablet",
    division: "GENERAL DIVISION 2ND",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "acetos-spas-tablet",
    name: "ACETOS SPAS TABLET",
    family: "ACETOS",
    formulation: "Tablet",
    division: "GENERAL DIVISION 2ND",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "clear-32-mouth-wash",
    name: "CLEAR 32 MOUTH WASH",
    family: "CLEAR 32",
    formulation: "Oral Rinse / Mouth Wash",
    division: "DENTAL DIVISION",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "lc-gel-ointment",
    name: "LC GEL OINTMENT",
    family: "LC",
    formulation: "Gel / Ointment",
    division: "DENTAL DIVISION",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "softex-moisturiser",
    name: "SOFTEX MOISTURISER",
    family: "SOFTEX",
    formulation: "Topical Moisturiser",
    division: "DERMATOLOGY DIVISION",
    status: "current",
    image: "products/softex-moisturiser.webp",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "softex-max-moisturiser",
    name: "SOFTEX MAX MOISTURISER",
    family: "SOFTEX",
    formulation: "Advanced Moisturiser",
    division: "DERMATOLOGY DIVISION",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "softex-moisturising-soap",
    name: "SOFTEX MOISTURISING SOAP",
    family: "SOFTEX",
    formulation: "Cleansing Bar / Soap",
    division: "DERMATOLOGY DIVISION",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "shadex-sunscreen",
    name: "SHADEX SUNSCREEN",
    family: "SHADEX",
    formulation: "Photoprotective Sunscreen",
    division: "DERMATOLOGY DIVISION",
    status: "current",
    image: "products/shadex-sunscreen.webp",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "ketotos-soap",
    name: "KETOTOS SOAP",
    family: "KETOTOS",
    formulation: "Antifungal Medicated Soap",
    division: "DERMATOLOGY DIVISION",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "ketotos-shampoo",
    name: "KETOTOS SHAMPOO",
    family: "KETOTOS",
    formulation: "Therapeutic Scalp Shampoo",
    division: "DERMATOLOGY DIVISION",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "permetos-ct-lotion",
    name: "PERMETOS CT LOTION",
    family: "PERMETOS",
    formulation: "Therapeutic Medicated Lotion",
    division: "DERMATOLOGY DIVISION",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  },
  {
    id: "permetos-soap",
    name: "PERMETOS SOAP",
    family: "PERMETOS",
    formulation: "Medicated Hygiene Soap",
    division: "DERMATOLOGY DIVISION",
    status: "current",
    description: "[Information to be added]",
    composition: "[Information to be added]",
    indications: "[Information to be added]",
    dosage: "[Information to be added]",
    packaging: "[Information to be added]"
  }
];

export const DIRECTORS = [
  {
    id: "mohd-amin",
    name: "MOHD AMIN",
    role: "Director",
    company: "Marrion Russal Remedies Pvt. Ltd.",
    designationNotice: "Official Board of Directors",
    initials: "MA"
  },
  {
    id: "ajaz-ahmad",
    name: "AJAZ AHMAD",
    role: "Director",
    company: "Marrion Russal Remedies Pvt. Ltd.",
    designationNotice: "Official Board of Directors",
    initials: "AA"
  }
];

export const REACH_DATA = {
  title: "OUR REACH",
  headline: "Expanding Healthcare Horizons with Dedicated Field Presence",
  notice: "Information about our operating areas and field presence will be available here."
};

export const REPRESENTATIVES_DATA = {
  title: "MEDICAL REPRESENTATIVES",
  subtitle: "Field Force & Medical Liaisons",
  notice: "Our medical representative directory will be updated here."
};
