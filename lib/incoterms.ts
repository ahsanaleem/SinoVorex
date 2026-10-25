/**
 * Incoterms 2020 (ICC): who pays for each step of a shipment from a factory in China, and where risk passes.
 * Simplified for buyers; the ICC rules and the sales contract are what count.
 */

export const STEPS = [
  "Export packing",
  "Loading at the factory",
  "Transport to the port or terminal in China",
  "Export customs clearance",
  "Loading onto the ship and origin port charges",
  "Main freight (sea, air or rail)",
  "Cargo insurance",
  "Unloading and charges at the destination port",
  "Transport to your address",
  "Unloading at your address",
  "Import customs clearance",
  "Import duties and taxes",
] as const;

export type Party = "S" | "B";

export type Incoterm = {
  code: string;
  name: string;
  modes: "Any transport" | "Sea and inland waterway";
  /** Who pays for each step in STEPS (S = seller / factory, B = buyer / you). */
  pays: Party[];
  /** Risk passes to the buyer after this step index. */
  riskAfter: number;
  /** Where risk passes, in plain words. */
  riskAt: string;
  summary: string;
  note?: string;
};

const p = (s: string) => s.split("") as Party[];

export const INCOTERMS: Incoterm[] = [
  { code: "EXW", name: "Ex Works", modes: "Any transport", pays: p("SBBBBBBBBBBB"), riskAfter: 0, riskAt: "At the factory, when the goods are ready for collection",
    summary: "The factory makes the goods available at its premises. You arrange and pay for everything from there, including loading and export clearance.",
    note: "Hard to use from China, because export clearance has to be filed by a Chinese exporter. FCA is usually the better choice." },
  { code: "FCA", name: "Free Carrier", modes: "Any transport", pays: p("SSSSBBBBBBBB"), riskAfter: 3, riskAt: "When the goods are handed to your carrier in China",
    summary: "The factory clears the goods for export and hands them to your carrier at an agreed place in China. Risk passes to you there." },
  { code: "FAS", name: "Free Alongside Ship", modes: "Sea and inland waterway", pays: p("SSSSBBBBBBBB"), riskAfter: 3, riskAt: "When the goods are alongside the ship at the Chinese port",
    summary: "The factory clears the goods for export and delivers them alongside your ship at the Chinese port. You pay for loading and everything after.",
    note: "Rarely used for container shipments." },
  { code: "FOB", name: "Free On Board", modes: "Sea and inland waterway", pays: p("SSSSSBBBBBBB"), riskAfter: 4, riskAt: "When the goods are on board the ship in China",
    summary: "The factory clears the goods for export and loads them onto your ship at the Chinese port. You pay the sea freight and everything after. The most common term for buying from China." },
  { code: "CFR", name: "Cost and Freight", modes: "Sea and inland waterway", pays: p("SSSSSSBBBBBB"), riskAfter: 4, riskAt: "When the goods are on board the ship in China",
    summary: "The factory pays the sea freight to your port, but risk passes to you once the goods are on board in China. Insurance is up to you." },
  { code: "CIF", name: "Cost, Insurance and Freight", modes: "Sea and inland waterway", pays: p("SSSSSSSBBBBB"), riskAfter: 4, riskAt: "When the goods are on board the ship in China",
    summary: "Like CFR, but the factory also buys cargo insurance to your port. Risk still passes to you once the goods are on board in China.",
    note: "The seller only has to buy minimum cover (Institute Cargo Clauses C). Ask for more if you need it." },
  { code: "CPT", name: "Carriage Paid To", modes: "Any transport", pays: p("SSSSSSBBBBBB"), riskAfter: 3, riskAt: "When the goods are handed to the first carrier in China",
    summary: "The factory pays transport to an agreed place in your country, but risk passes to you when the goods are handed to the first carrier in China." },
  { code: "CIP", name: "Carriage and Insurance Paid To", modes: "Any transport", pays: p("SSSSSSSBBBBB"), riskAfter: 3, riskAt: "When the goods are handed to the first carrier in China",
    summary: "Like CPT, but the factory also buys cargo insurance. Risk passes to you when the goods are handed to the first carrier.",
    note: "Under Incoterms 2020 the seller must buy broad cover (Institute Cargo Clauses A)." },
  { code: "DAP", name: "Delivered at Place", modes: "Any transport", pays: p("SSSSSSSSSBBB"), riskAfter: 8, riskAt: "At your address, before unloading",
    summary: "The factory delivers to your address, ready for unloading. You unload, clear import customs and pay duties and taxes." },
  { code: "DPU", name: "Delivered at Place Unloaded", modes: "Any transport", pays: p("SSSSSSSSSSBB"), riskAfter: 9, riskAt: "At your address, after unloading",
    summary: "Like DAP, but the factory also unloads the goods at your address. You clear import customs and pay duties and taxes." },
  { code: "DDP", name: "Delivered Duty Paid", modes: "Any transport", pays: p("SSSSSSSSSBSS"), riskAfter: 8, riskAt: "At your address, before unloading",
    summary: "The factory delivers to your address with import customs cleared and duties and taxes paid. You only unload.",
    note: "From China this is usually arranged through a forwarder, who acts as importer in your country." },
];

export const INCOTERM_BY_CODE = Object.fromEntries(INCOTERMS.map((t) => [t.code, t]));
