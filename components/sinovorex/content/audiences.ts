import type { Article } from "./types";

/** /sourcing-for/[slug]: who we help. Commercial pages; the educational detail lives in /guides. */
export const AUDIENCES: (Article & { label: string })[] = [
  {
    slug: "amazon-sellers",
    label: "Amazon & e-commerce sellers",
    title: "China Sourcing Agent for Amazon FBA Sellers | Sino Vorex",
    h1: "China sourcing for Amazon and e-commerce sellers",
    description: "Sourcing, inspection and FBA-ready shipping from China for Amazon and e-commerce sellers: verified factories, FBA labels and cartons checked before shipment.",
    summary: "For Amazon and e-commerce sellers we find and verify factories, check samples, inspect goods against your listing and Amazon's packaging requirements before you pay the balance, and coordinate freight to your warehouse or fulfilment centre.",
    published: "2026-10-20",
    updated: "2026-10-20",
    body: [
      { h2: "What goes wrong for Amazon sellers" },
      { p: "On Amazon, a quality problem does not stay with one customer. It turns into returns, negative reviews and, in some cases, a suppressed listing. Many of the problems start in China: a product that does not match the listing photos, a barcode label on the wrong side of the carton, cartons over Amazon's weight or size limits, or a missing suffocation warning on a poly bag. They are cheap to fix at the factory and expensive to fix in a fulfilment centre." },

      { h2: "How we help" },
      { ul: [
        "**Find and verify suppliers:** factories that make your product, checked against the business registry before you pay. See [product sourcing](/services/product-sourcing).",
        "**Samples you can photograph:** samples from several suppliers collected, checked and sent to you together, so you can compare them and shoot listing images early. See [samples and consolidation](/services/samples-consolidation).",
        "**Inspection against your listing:** we check the goods against your specification and the approved sample, and check FBA product labels, carton labels and carton size and weight. See [pre-shipment inspection](/services/quality-inspection).",
        "**Freight to your warehouse or Amazon:** sea, air or rail with partner forwarders, including delivery to Amazon fulfilment centres where available. See [shipping from China](/services/shipping-coordination).",
      ] },

      { h2: "FBA checks we add to a pre-shipment inspection" },
      { ul: [
        "FNSKU product labels present, scannable and on the right unit.",
        "Carton labels (shipment ID) placed as instructed, not over a seam.",
        "Carton dimensions and weight within the limits for your marketplace.",
        "Poly bags carry the required suffocation warning where applicable.",
        "Sets and bundles packed and marked as sold together.",
        "Product, packaging and inserts match your listing photos and description.",
      ] },
      { p: "Amazon's requirements change and differ by marketplace. Send us the current requirements for your shipment and we inspect against them." },

      { h2: "Compliance is your responsibility, so plan for it" },
      { p: "Many categories need test reports or certificates before Amazon will let you sell, for example children's products, electrical goods and items that touch food. Testing is done by accredited laboratories. We can collect samples for the lab from the factory and check that production matches the tested sample." },

      { h2: "Getting started" },
      { p: "Send us the product, your target quantity and price, the marketplace you sell on and, if you have one, a link to a similar listing. We reply within 24 hours with the information we need for a quote. Read our [pre-shipment inspection and AQL guide](/guides/pre-shipment-inspection-aql) to see what an inspection checks." },
    ],
    faqs: [
      { q: "Can you ship directly to an Amazon fulfilment centre?", a: "Partner forwarders can deliver to Amazon fulfilment centres in many markets. Tell us the destination and shipment details at the quote stage." },
      { q: "Can you apply FBA labels in China?", a: "The factory normally applies them as part of packing. We send the factory your labels and check them during the pre-shipment inspection." },
      { q: "Do you work with small first orders?", a: "Yes, where the product allows it. See our [guide to low-MOQ sourcing](/guides/sourcing-from-china-small-business)." },
    ],
    related: ["/services/quality-inspection", "/guides/pre-shipment-inspection-aql", "/guides/sourcing-from-china-small-business"],
  },

  {
    slug: "small-businesses",
    label: "Small businesses",
    title: "China Sourcing Agent for Small Businesses | Sino Vorex",
    h1: "China sourcing for small businesses",
    description: "Sourcing from China for small businesses: honest advice on MOQs, verified factories, samples, inspection before you pay, and freight for small orders.",
    summary: "For small businesses we tell you upfront whether your quantity is realistic, look for factories that accept smaller first orders, verify suppliers before you pay, and inspect goods before the balance, so a first order from China does not put the business at risk.",
    published: "2026-10-20",
    updated: "2026-10-20",
    body: [
      { h2: "Buying from China without a procurement team" },
      { p: "Large importers have staff in China, buying agents and quality teams. A small business usually has one person doing everything, and one bad order can wipe out a year's margin. You need the same checks a large importer makes, at a scale that suits your order." },

      { h2: "What we do for small businesses" },
      { ol: [
        "**An honest first answer.** We tell you whether your quantity and target price are realistic for the product before you spend money on samples.",
        "**Factories that accept smaller orders.** We look for suppliers whose MOQ fits, and suggest changes (stock colours, simpler customisation) that bring the MOQ down. See our [low-MOQ guide](/guides/sourcing-from-china-small-business).",
        "**Verified suppliers.** Every supplier on your shortlist is checked against the business registry. Our [factory audit checklist](/guides/factory-audit-checklist) shows what we look for.",
        "**Samples first.** We collect and check samples so you approve the product before the order.",
        "**Inspection before the balance.** Goods are [inspected](/services/quality-inspection) before you pay the rest, with photos of what we found.",
        "**Freight that suits small volumes.** LCL sea freight or air, and [consolidation](/services/samples-consolidation) when you buy from several suppliers.",
      ] },

      { h2: "Know your landed cost before you order" },
      { p: "The unit price on a quote is not what the product costs you. Add samples, any tooling, inspection, freight, insurance, import duties and taxes, and the agent's fee. On a small order these fixed costs weigh more per unit. We help you work out the landed cost so you can check the margin before you commit. Our [guide to sourcing agent costs](/guides/china-sourcing-agent-cost) includes a worked example." },

      { h2: "Products small businesses often source with us" },
      { ul: [
        "Packaging: printed boxes, bags, labels and stickers.",
        "Textiles: uniforms, workwear, tote bags and home textiles.",
        "Home and kitchen goods: cookware, storage and kitchen tools.",
        "Hospitality supplies for independent cafés, restaurants and hotels. See [hotel and café procurement](/sourcing-for/hotels-restaurants).",
      ] },

      { h2: "Getting started" },
      { p: "[Send us your product details](/quote): what you want, roughly how many, your target price and where it is going. We reply within 24 hours." },
    ],
    faqs: [
      { q: "Is there a minimum order size to work with you?", a: "There is no fixed minimum, but each factory sets its own MOQ. We tell you early if a quantity is too small to be practical for the product." },
      { q: "How much will it cost?", a: "We charge a commission on the order value, confirmed in writing in your quote before any work starts. Our [cost guide](/guides/china-sourcing-agent-cost) explains how agents usually charge." },
    ],
    related: ["/guides/sourcing-from-china-small-business", "/guides/china-sourcing-agent-cost", "/services/product-sourcing"],
  },

  {
    slug: "hotels-restaurants",
    label: "Hotels, restaurants & cafés",
    title: "Hotel & Restaurant Supplies Sourcing from China | Sino Vorex",
    h1: "Hotel, restaurant and café supplies from China",
    description: "Sourcing hotel, restaurant and café supplies from China: tableware, glassware, linens and guest amenities, with compliance checks and one consolidated shipment.",
    summary: "For hotels, restaurants and cafés we source tableware, glassware, linens, guest amenities and café equipment from specialist factories across China, check food-contact and fire-safety documents, inspect each supplier's goods, and consolidate everything into one shipment.",
    published: "2026-10-20",
    updated: "2026-10-20",
    body: [
      { h2: "Many products, many factories, one project" },
      { p: "Fitting out or restocking a hotel, restaurant or café means buying dozens of different items: plates and cups, glassware, cutlery, bed linen and towels, guest amenities, uniforms, and café equipment. In China, each of these is made in a different specialist cluster, often in a different province. Buying them yourself means managing many suppliers, many samples and many shipments." },

      { h2: "How we handle a procurement list" },
      { ol: [
        "**Send us your item list.** A spreadsheet works best: item, specification or reference photo, quantity, and any brand or logo requirements. You can attach it to the [quote form](/quote).",
        "**Sourcing by category.** We find specialist factories for each group of items and send a shortlist per category.",
        "**Samples together.** Samples from all suppliers are collected, checked and sent to you in one parcel.",
        "**Production follow-up** across suppliers, so every item is ready for the same shipping date.",
        "**Inspection per supplier** before each balance is paid.",
        "**One consolidated shipment** to your property or warehouse. See [consolidation](/services/samples-consolidation).",
      ] },

      { h2: "Compliance for hospitality products" },
      { p: "Hospitality buyers carry legal responsibility for what guests eat from and sleep in. Requirements depend on your country; these are the documents to ask for:" },
      { table: { head: ["Product group", "What to check"], rows: [
        ["Tableware, glassware, cutlery, food containers", "Food-contact test reports for your market (for example EU Regulation 1935/2004 and lead/cadmium migration tests for ceramics, or US FDA requirements)"],
        ["Bed linen, curtains, upholstery", "Fire-retardancy test reports to the standard your local fire regulations require"],
        ["Towels and textiles", "Fibre composition, weight (GSM) and colour-fastness"],
        ["Guest amenities (toiletries)", "Ingredient lists and the cosmetic registration or safety assessment required in your market"],
        ["Electrical café equipment", "Electrical safety certification for your market, and the correct plug and voltage"],
      ] } },
      { p: "Testing is done by accredited laboratories. We ask suppliers for their existing reports, check that they cover the exact product, and can collect samples for new tests where needed." },

      { h2: "Branded items" },
      { p: "Logo-printed tableware, embroidered linens and branded amenities are common requests. Customisation affects MOQs and lead times, so we quote branded and unbranded options side by side where both are possible." },

      { h2: "Getting started" },
      { p: "Send us your item list, quantities and delivery address through the [quote form](/quote), or by email or WhatsApp. We reply within 24 hours with questions and next steps." },
    ],
    faqs: [
      { q: "Can I send a full procurement list?", a: "Yes. Attach a spreadsheet (Excel or CSV) or PDF to the quote form, or email it to us." },
      { q: "Can you deliver everything at the same time?", a: "That is the aim of consolidation. Goods from each supplier are delivered to a warehouse in China and shipped together." },
      { q: "Do you supply furniture and fixtures?", a: "Tell us what you need. We focus on the categories above, and say honestly if a request is outside what we can do well." },
    ],
    related: ["/services/samples-consolidation", "/services/product-sourcing", "/sourcing-for/small-businesses"],
  },
];

export const AUDIENCE_BY_SLUG = Object.fromEntries(AUDIENCES.map((a) => [a.slug, a]));
