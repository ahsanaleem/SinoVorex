import type { Block, QA } from "./types";
import { INCOTERMS } from "@/lib/incoterms";

export type Tool = {
  slug: string;
  name: string;          // short name for cards and menus
  title: string;
  h1: string;
  description: string;
  summary: string;
  updated: string;
  body: Block[];
  faqs: QA[];
  related: string[];
};

const who = (c: string) => (c === "S" ? "Factory" : "You");

export const TOOLS: Tool[] = [
  {
    slug: "landed-cost-calculator",
    name: "Landed cost calculator",
    title: "Landed Cost Calculator: Importing from China (Free Tool)",
    h1: "Landed cost calculator for importing from China",
    description: "Free landed cost calculator: add product cost, agent fee, inspection, freight, insurance, import duty and VAT to see the real cost per unit from China.",
    summary: "The landed cost is everything it costs to get one unit from the factory in China to your door: the product, fees, freight, insurance, import duty, VAT and local delivery. Enter your figures below to see the total and the cost per unit.",
    updated: "2026-10-25",
    body: [
      { h2: "How landed cost is worked out" },
      { ol: [
        "Goods value: unit price × quantity, usually quoted FOB China.",
        "Add the costs of buying: your sourcing agent's fee, samples and inspection.",
        "Add freight and cargo insurance. Goods + freight + insurance is the CIF value.",
        "Add import duty. Most countries charge it on the CIF value; the USA charges it on the goods value.",
        "Add import VAT or sales tax, usually charged on the CIF value plus duty.",
        "Add customs broker fees and delivery from the port to your warehouse.",
        "Divide the total by the number of units for the landed cost per unit.",
      ] },
      { h2: "Duty and VAT by destination" },
      { table: { caption: "Typical settings used by the calculator. Duty depends on your product's tariff code, so always check it.", head: ["Destination", "Duty charged on", "VAT / sales tax"], rows: [
        ["United States", "Goods value", "None (plus customs fees and any extra tariffs on Chinese goods)"],
        ["United Kingdom", "CIF value", "20% on most goods"],
        ["European Union", "CIF value", "About 17% to 27%, by country"],
        ["United Arab Emirates", "CIF value, mostly 5%", "5%"],
        ["Saudi Arabia", "CIF value, often 5%", "15%"],
        ["Pakistan", "CIF value, plus other duties", "Sales tax, commonly 18%"],
        ["Nigeria", "CIF value, by tariff band", "7.5%, plus levies"],
        ["Kenya", "CIF value, by tariff band", "16%, plus levies"],
      ] } },
      { h2: "Why landed cost matters" },
      { p: "A product that's US$4 at the factory can easily cost US$6 or more by the time it reaches your shelf. On small orders, fixed costs such as inspection, broker fees and minimum freight charges add even more per unit. Working out the landed cost before you order tells you whether the margin is really there." },
      { p: "For more on agent fees, see our guide to [what a China sourcing agent costs](/guides/china-sourcing-agent-cost). For duties in specific markets, see our guides to shipping to the [USA](/guides/shipping-from-china-to-usa), [UK](/guides/shipping-from-china-to-uk) and [Europe](/guides/shipping-from-china-to-europe)." },
    ],
    faqs: [
      { q: "What is included in landed cost?", a: "The product price, buying costs such as agent fees and inspection, freight, insurance, import duty, VAT or sales tax, customs broker fees and delivery to your door." },
      { q: "Is import duty charged on freight?", a: "In most countries, yes: duty is charged on the CIF value, which includes freight and insurance. The USA is an exception and charges duty on the value of the goods." },
      { q: "How do I find my duty rate?", a: "Find your product's tariff (HS) code and look it up in your country's official tariff, or ask your customs broker. Rates can differ a lot between similar products." },
    ],
    related: ["/tools/cbm-calculator", "/guides/china-sourcing-agent-cost", "/tools/incoterms"],
  },

  {
    slug: "cbm-calculator",
    name: "CBM & container calculator",
    title: "CBM Calculator & Container Load Calculator (Free Tool)",
    h1: "CBM and container load calculator",
    description: "Free CBM calculator: shipment volume in cubic metres, air chargeable weight, LCL charges and whether your cartons fit a 20ft or 40ft container.",
    summary: "CBM (cubic metres) is how sea freight measures volume. Enter your carton sizes, weights and quantities to see the total CBM, the weight, the air freight chargeable weight and which container your shipment fits.",
    updated: "2026-10-25",
    body: [
      { h2: "How to calculate CBM" },
      { p: "Multiply the carton's length × width × height in metres, then multiply by the number of cartons. In centimetres: length × width × height ÷ 1,000,000 = CBM per carton." },
      { note: "A carton of 60 × 40 × 40 cm is 0.6 × 0.4 × 0.4 = 0.096 CBM. One hundred of them is 9.6 CBM.", label: "Example" },
      { h2: "Container sizes" },
      { table: { caption: "Practical loading volumes are below the nominal volume because cartons never fill every gap. Weight limits also depend on road rules in each country.", head: ["Container", "Nominal volume", "Practical loading volume", "Typical maximum cargo weight"], rows: [
        ["20-foot", "About 33 CBM", "About 25 to 28 CBM", "About 25,000 kg"],
        ["40-foot", "About 67 CBM", "About 55 to 58 CBM", "About 26,500 kg"],
        ["40-foot high cube", "About 76 CBM", "About 65 to 68 CBM", "About 26,500 kg"],
      ] } },
      { h2: "LCL, FCL or air?" },
      { ul: [
        "LCL (shared container) is charged per W/M, the greater of the volume in CBM or the weight in tonnes. It's usually cheapest below about 13 to 15 CBM.",
        "FCL (full container) is charged per container. Above about 15 CBM, a 20-foot container is often cheaper than LCL.",
        "Air freight is charged on the chargeable weight, the greater of the actual weight and the volumetric weight (length × width × height in cm ÷ 6,000 per carton).",
      ] },
      { p: "Our [shipping page](/services/shipping-coordination) explains transit times and how we arrange freight, and the [landed cost calculator](/tools/landed-cost-calculator) turns your freight quote into a cost per unit." },
    ],
    faqs: [
      { q: "How many CBM fit in a 20-foot container?", a: "Nominally about 33 CBM, but in practice most cargo loads about 25 to 28 CBM, because cartons don't fill every gap." },
      { q: "What is the air freight volumetric weight?", a: "For most airlines, length × width × height in centimetres ÷ 6,000 per carton. You pay on whichever is greater, the actual or the volumetric weight." },
      { q: "When is LCL cheaper than a full container?", a: "Usually below about 13 to 15 CBM. Above that, a 20-foot container is often cheaper and your goods are handled less." },
    ],
    related: ["/services/shipping-coordination", "/tools/landed-cost-calculator", "/services/samples-consolidation"],
  },

  {
    slug: "incoterms",
    name: "Incoterms explainer",
    title: "Incoterms 2020 Explained: Who Pays What (Interactive Chart)",
    h1: "Incoterms 2020 explained: who pays for what",
    description: "Interactive Incoterms 2020 chart for buying from China: EXW, FCA, FOB, CFR, CIF, DAP, DDP and more, who pays for each step and where risk passes.",
    summary: "Incoterms are the standard trade terms, published by the International Chamber of Commerce, that say who pays for each part of a shipment and where the risk passes from seller to buyer. Choose a term below to see what the factory pays for and what you pay for, step by step.",
    updated: "2026-10-25",
    body: [
      { h2: "All 11 Incoterms at a glance" },
      { table: {
        caption: "Simplified for buying from a factory in China. The ICC rules and your contract are what count.",
        head: ["Incoterm", "Main freight paid by", "Insurance bought by", "Import duties paid by", "Risk passes to you"],
        rows: INCOTERMS.map((t) => [
          `${t.code} (${t.name})`,
          who(t.pays[5]),
          t.code === "CIF" || t.code === "CIP" ? "Factory" : t.pays[6] === "S" ? "Factory (own risk)" : "You, if you want it",
          who(t.pays[11]),
          t.riskAt,
        ]),
      } },
      { h2: "Which Incoterm should you use from China?" },
      { ul: [
        "FOB is the most common term for sea freight from China. The factory delivers onto the ship, and you choose the forwarder and control the freight cost.",
        "FCA does the same job for air freight, rail and containers handed over at a terminal, and is often the better choice in place of EXW.",
        "CIF and CFR are convenient, but the factory chooses the freight and you take the risk once the goods are on board. Check what's included at your end.",
        "DDP means delivered with duties paid. It's simplest for small buyers and Amazon sellers, and is usually arranged through a forwarder.",
        "EXW sounds cheapest but is hard to use from China, because export clearance must be done by a Chinese exporter.",
      ] },
      { h2: "Common mistakes" },
      { ul: [
        "Writing just \"FOB\" without naming the port. Always write the term, the place and the version, for example \"FOB Shanghai, Incoterms 2020\".",
        "Assuming CIF covers costs at your port. Destination port charges are usually paid by you.",
        "Relying on the seller's minimum insurance under CIF. Ask for broader cover if the goods are valuable.",
        "Using sea-only terms (FAS, FOB, CFR, CIF) for air freight. Use FCA, CPT or CIP instead.",
      ] },
      { p: "See how Incoterms fit into the bigger picture in our guide to [freight forwarders and sourcing agents](/guides/freight-forwarder-vs-sourcing-agent), and the official rules from the [International Chamber of Commerce](https://iccwbo.org/business-solutions/incoterms-rules/)." },
    ],
    faqs: [
      { q: "What is the difference between FOB and CIF?", a: "Under FOB, you pay the sea freight and insurance. Under CIF, the factory pays freight and minimum insurance to your port. In both, risk passes to you once the goods are on board in China." },
      { q: "Which Incoterm is best for a first order from China?", a: "FOB is the most common, because it lets you choose your forwarder. If you want the simplest option, DDP delivers to your door with duties paid." },
      { q: "Are Incoterms 2020 still current?", a: "Yes. Incoterms 2020 are the current version published by the ICC. Always state the version in your contract." },
    ],
    related: ["/guides/freight-forwarder-vs-sourcing-agent", "/services/shipping-coordination", "/tools/landed-cost-calculator"],
  },

  {
    slug: "aql-calculator",
    name: "AQL sample size calculator",
    title: "AQL Calculator: Sample Size & Accept/Reject (ISO 2859-1)",
    h1: "AQL sample size calculator",
    description: "Free AQL calculator based on ISO 2859-1: enter your lot size and AQL to get the sample size and accept/reject numbers for critical, major and minor defects.",
    summary: "Enter the number of units in your order and the AQL for each type of defect. The calculator uses the ISO 2859-1 (ANSI/ASQ Z1.4) single sampling tables for normal inspection to give the sample size and the number of defects at which the order passes or fails.",
    updated: "2026-10-25",
    body: [
      { h2: "How AQL sampling works" },
      { ol: [
        "Find the sample size code letter from the lot size and the inspection level. General Inspection Level II is the usual default.",
        "Use the code letter and the AQL to find the sampling plan: how many units to inspect, the accept number and the reject number.",
        "Inspect the sample. If the defects found are at or below the accept number, the lot passes. At the reject number, it fails.",
      ] },
      { p: "Some combinations point to a different code letter in the table (shown as arrows in the standard). The calculator follows those arrows for you, which is why the sample size can change when you change the AQL." },
      { h2: "Which AQL to choose" },
      { table: { head: ["Defect type", "What it means", "Common AQL"], rows: [
        ["Critical", "Unsafe, or breaks the law in your market", "Not allowed (0)"],
        ["Major", "Likely to cause a return or complaint", "2.5 (1.0 or 1.5 for high-value goods)"],
        ["Minor", "Small difference most customers would accept", "4.0"],
      ] } },
      { h2: "Inspection levels" },
      { ul: [
        "Level II is the normal level and the default for most pre-shipment inspections.",
        "Level I uses smaller samples, for low-risk goods or a supplier with a good record.",
        "Level III uses larger samples, for high-risk goods or a supplier you don't trust yet.",
        "Special levels S1 to S4 use very small samples, for tests that are slow, expensive or destroy the product.",
      ] },
      { p: "Our guide to [pre-shipment inspection and AQL](/guides/pre-shipment-inspection-aql) explains defect classes and what to do when goods fail, and our [quality inspection service](/services/quality-inspection) carries out AQL inspections at factories across China." },
    ],
    faqs: [
      { q: "What sample size do I need for 3,000 units?", a: "At General Inspection Level II, a lot of 3,000 units uses code letter K, a sample of 125 units. At AQL 2.5 the lot passes with up to 7 major defects and fails at 8." },
      { q: "What does AQL 2.5 mean?", a: "It's the acceptance quality limit used to choose the sampling plan. In practice it sets how many major defects the sample can contain before the order fails." },
      { q: "Is this calculator based on ISO 2859-1?", a: "Yes. It uses the ISO 2859-1 (equivalent to ANSI/ASQ Z1.4) tables for single sampling and normal inspection, at all general and special inspection levels." },
    ],
    related: ["/guides/pre-shipment-inspection-aql", "/services/quality-inspection", "/guides/factory-audit-checklist"],
  },
];

export const TOOL_BY_SLUG = Object.fromEntries(TOOLS.map((t) => [t.slug, t]));
