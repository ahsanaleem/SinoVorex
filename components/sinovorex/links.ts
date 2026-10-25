/** Site-wide link lists for menus and footers (pages outside the homepage). */
export const FOOTER_RESOURCES: [string, string][] = [
  ["All services", "/services"],
  ["Guides", "/guides"],
  ["About us", "/about"],
  ["Who we help", "/sourcing-for"],
  ["Amazon sellers", "/sourcing-for/amazon-sellers"],
  ["Small businesses", "/sourcing-for/small-businesses"],
  ["Hotels & restaurants", "/sourcing-for/hotels-restaurants"],
  ["Request a quote", "/quote"],
];

/** Main menu on service, guide, legal and other subpages. */
export const SUBPAGE_NAV: [string, string][] = [
  ["Services", "/services"],
  ["Guides", "/guides"],
  ["Free tools", "/tools"],
  ["About", "/about"],
  ["FAQ", "/#faq"],
];

/** Guides linked from every footer and the homepage FAQ (short labels; full titles live in content/guides). */
export const FOOTER_GUIDES: [string, string][] = [
  ["China sourcing agents explained", "/guides/china-sourcing-agent"],
  ["What a sourcing agent costs", "/guides/china-sourcing-agent-cost"],
  ["Low MOQ for small businesses", "/guides/sourcing-from-china-small-business"],
  ["Factory audit checklist", "/guides/factory-audit-checklist"],
  ["Pre-shipment inspection & AQL", "/guides/pre-shipment-inspection-aql"],
  ["Freight forwarder vs sourcing agent", "/guides/freight-forwarder-vs-sourcing-agent"],
  ["Shipping from China to the USA", "/guides/shipping-from-china-to-usa"],
  ["Shipping from China to the UK", "/guides/shipping-from-china-to-uk"],
  ["Shipping from China to Europe", "/guides/shipping-from-china-to-europe"],
];

/** Footer link columns (shared by every page). Labels are kept short so they fit on one line. */
export const FOOTER_COLUMNS: { title: string; links: [string, string][]; more?: [string, string] }[] = [
  {
    title: "Services",
    links: [
      ["Product sourcing", "/services/product-sourcing"],
      ["Factory audits", "/services/factory-vetting"],
      ["Quality inspection", "/services/quality-inspection"],
      ["Order follow-up", "/services/order-follow-up"],
      ["Samples & consolidation", "/services/samples-consolidation"],
      ["Sea, air & rail freight", "/services/shipping-coordination"],
    ],
    more: ["All services", "/services"],
  },
  {
    title: "Business in China",
    links: [
      ["Company registration", "/services/china-company-registration"],
      ["Visa help", "/services/china-visa-help"],
      ["Business trips", "/services/china-business-trips"],
      ["Canton Fair guide", "/guides/canton-fair-guide"],
      ["WFOE vs rep office", "/guides/wfoe-vs-representative-office"],
    ],
  },
  {
    title: "Guides",
    links: [
      ["Sourcing agents explained", "/guides/china-sourcing-agent"],
      ["Sourcing agent costs", "/guides/china-sourcing-agent-cost"],
      ["Factory audit checklist", "/guides/factory-audit-checklist"],
      ["Inspection & AQL", "/guides/pre-shipment-inspection-aql"],
      ["Yiwu market guide", "/guides/yiwu-market-guide"],
      ["Fabric markets", "/guides/guangzhou-fabric-market"],
    ],
    more: ["All guides", "/guides"],
  },
  {
    title: "Markets",
    links: [
      ["UAE", "/markets/uae"],
      ["Saudi Arabia", "/markets/saudi-arabia"],
      ["Pakistan", "/markets/pakistan"],
      ["Nigeria", "/markets/nigeria"],
      ["Kenya", "/markets/kenya"],
      ["USA, UK & Europe", "/guides/shipping-from-china-to-usa"],
    ],
    more: ["All markets", "/markets"],
  },
  {
    title: "Free tools",
    links: [
      ["Landed cost calculator", "/tools/landed-cost-calculator"],
      ["CBM calculator", "/tools/cbm-calculator"],
      ["Incoterms explained", "/tools/incoterms"],
      ["AQL calculator", "/tools/aql-calculator"],
    ],
    more: ["All tools", "/tools"],
  },
];

/** Company links shown in the footer's bottom bar. */
export const FOOTER_COMPANY: [string, string][] = [
  ["About us", "/about"],
  ["Who we help", "/sourcing-for"],
  ["FAQ", "/#faq"],
  ["Request a quote", "/quote"],
];
