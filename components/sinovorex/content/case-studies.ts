import type { Block } from "./types";

/**
 * Case studies: real orders only, anonymised if the client prefers. The /case-studies pages, sitemap entries and
 * footer link appear automatically once this list has at least one entry, and stay hidden while it's empty.
 *
 * Template (copy, fill in with a real order, and add to CASE_STUDIES):
 *
 * {
 *   slug: "ceramic-mugs-cafe-chain-uk",
 *   title: "Sourcing Ceramic Mugs for a UK Café Chain | Sino Vorex",
 *   h1: "Sourcing 3,000 branded ceramic mugs for a UK café chain",
 *   description: "How we found a ceramics factory, fixed a glaze problem at inspection and delivered 3,000 branded mugs to the UK on time.",
 *   client: "A café chain with 12 sites",          // anonymised is fine
 *   country: "United Kingdom",
 *   product: "Double-walled ceramic mugs with printed logo",
 *   services: ["product-sourcing", "quality-inspection", "shipping-coordination"],
 *   published: "2026-11-01",
 *   updated: "2026-11-01",
 *   summary: "One or two sentences: what the client needed and what the outcome was.",
 *   results: [{ label: "Units delivered", value: "3,000" }, { label: "Defect rate at final inspection", value: "0.8%" }, { label: "Saving vs previous supplier", value: "18%" }],
 *   problem: [{ p: "What the client needed, and what had gone wrong before." }],
 *   factory: [{ p: "How we found and checked the factory." }],
 *   inspection: [{ p: "What the inspection found, and how it was fixed." }],
 *   result: [{ p: "What was delivered, when, and what it meant for the client." }],
 *   quote: { text: "A short quote from the client, with permission.", who: "Operations manager, UK café chain" },
 * },
 */
export type CaseStudy = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  client: string;
  country: string;
  product: string;
  services: string[];          // service slugs used on the order
  published: string;
  updated: string;
  summary: string;
  results: { label: string; value: string }[];
  problem: Block[];
  factory: Block[];
  inspection: Block[];
  result: Block[];
  quote?: { text: string; who: string };
};

export const CASE_STUDIES: CaseStudy[] = [];

export const CASE_STUDY_BY_SLUG = Object.fromEntries(CASE_STUDIES.map((c) => [c.slug, c]));
