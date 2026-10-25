import type { Article } from "./types";

/** /sourcing-for/[slug]: who we help. Commercial pages; the educational detail lives in /guides. */
export const AUDIENCES: (Article & { label: string })[] = [
  {
    slug: "amazon-sellers",
    takeaways: [
      "We find factories and check them out before you pay anything.",
      "Our inspections check your FBA labels, carton sizes and weights, not just the product.",
      "We ship to your warehouse, or straight to Amazon fulfilment centres where that's available.",
      "Compliance testing is done by accredited labs, and we can collect the samples for you.",
    ],
    label: "Amazon & e-commerce sellers",
    title: "Amazon FBA Sourcing & Inspection in China | SinoVorex",
    h1: "China sourcing for Amazon and e-commerce sellers",
    description: "Sourcing, inspection and FBA-ready shipping from China for Amazon and e-commerce sellers: verified factories, FBA labels and cartons checked before shipment.",
    summary: "If you sell on Amazon or your own online store, we find and check factories, look over samples, and inspect the goods against your listing and Amazon's packaging rules before you pay the balance. Then we arrange freight to your warehouse or fulfilment centre.",
    published: "2026-10-20",
    updated: "2026-10-23",
    body: [
      { h2: "What goes wrong for Amazon sellers" },
      { p: "On Amazon, a quality problem doesn't stay with one unhappy customer. It turns into returns, bad reviews and sometimes a listing that gets suppressed." },
      { p: "A lot of these problems start in China. The product doesn't match the listing photos. The barcode label is on the wrong side of the carton. Cartons are over Amazon's weight or size limits, or a poly bag is missing its suffocation warning. All of these are cheap to fix at the factory and expensive to fix at a fulfilment centre." },

      { h2: "What we do for Amazon sellers" },
      { ul: [
        "We find factories that actually make your product, and check them against the business registry before you pay. More on our [product sourcing](/services/product-sourcing) page.",
        "We collect samples from several suppliers, check them and send them to you together, so you can compare them and get your listing photos done early. See [samples and consolidation](/services/samples-consolidation).",
        "We inspect the goods against your specification and the approved sample, and check the FBA product labels, carton labels and carton sizes and weights. See [pre-shipment inspection](/services/quality-inspection).",
        "We arrange sea, air or rail freight with partner forwarders, including delivery to Amazon fulfilment centres where that's available. See [shipping from China](/services/shipping-coordination).",
      ] },

      { h2: "FBA checks we add to a pre-shipment inspection" },
      { ul: [
        "FNSKU product labels are there, scan properly and are on the right unit.",
        "Carton labels with the shipment ID are where they should be, not over a seam.",
        "Carton sizes and weights are within the limits for your marketplace.",
        "Poly bags carry the suffocation warning where it's needed.",
        "Sets and bundles are packed and marked as sold together.",
        "The product, packaging and inserts match your listing photos and description.",
      ] },
      { p: "Amazon's rules change, and they're different for each marketplace. Send us the current requirements for your shipment and we'll inspect against those." },

      { h2: "FBA prep the factory can do" },
      { p: "Most Amazon prep is cheaper to do at the factory than at a prep centre in your country. Things we commonly ask factories to do, and then check during inspection:" },
      { ul: [
        "Print and apply FNSKU labels to each unit, covering any manufacturer barcode that would confuse the scanners.",
        "Bag items in poly bags with the right suffocation warning, where the product needs it.",
        "Bundle sets together and mark them \"Sold as set, do not separate\".",
        "Pack cartons to Amazon's size and weight limits, with the same number of units in every carton.",
        "Apply the carton labels for your shipment on the side of each box, not over a seam.",
      ] },
      { p: "Send us your Amazon requirements for the shipment, and we'll pass them to the factory in Chinese and check them before the goods leave." },

      { h2: "Example: landed cost to an Amazon warehouse" },
      { p: "To know your margin, work out the landed cost per unit, which is everything it costs to get one unit into the fulfilment centre. Here's how it adds up for an imaginary order." },
      { table: { caption: "Illustrative figures for 1,000 units shipped by sea on DDP terms. Your freight and duty will differ, so this isn't a quote.", head: ["Cost", "Total", "Per unit"], rows: [
        ["Product, FOB China", "US$4,000", "US$4.00"],
        ["Sourcing agent commission (8%)", "US$320", "US$0.32"],
        ["Pre-shipment inspection (1 day)", "US$270", "US$0.27"],
        ["Sea freight, DDP to the fulfilment centre, incl. duty", "US$1,400", "US$1.40"],
        ["Landed cost", "US$5,990", "US$5.99"],
      ] } },
      { p: "With DDP, the forwarder's price includes the duty and customs clearance, so there are fewer surprises. Without DDP you'd pay the freight, the customs broker and the duty separately. Our guides to [shipping from China to the USA](/guides/shipping-from-china-to-usa), [the UK](/guides/shipping-from-china-to-uk) and [Europe](/guides/shipping-from-china-to-europe) explain the customs side." },

      { h2: "Compliance is your responsibility, so plan for it" },
      { p: "Many categories need test reports or certificates before Amazon will let you sell. Children's products, electrical goods and anything that touches food are common examples." },
      { p: "Testing is done by accredited labs. We can collect samples for the lab from the factory, and check that what's produced matches the sample that was tested." },

      { h2: "Getting started" },
      { p: "Prefer to see suppliers yourself? We also plan [factory visits and Canton Fair trips](/services/china-business-trips)." },
      { p: "Send us the product, your target quantity and price, which marketplace you sell on and, if you have one, a link to a similar listing. We'll get back to you within 24 hours with what we need for a quote. Our [guide to pre-shipment inspection and AQL](/guides/pre-shipment-inspection-aql) shows what an inspection covers." },
    ],
    faqs: [
      { q: "Can you ship straight to an Amazon fulfilment centre?", a: "Our partner forwarders can deliver to Amazon fulfilment centres in many markets. Just tell us the destination and shipment details when you ask for a quote." },
      { q: "Can you put FBA labels on in China?", a: "The factory normally puts them on while packing. We send the factory your labels and check them during the pre-shipment inspection." },
      { q: "Do you work with small first orders?", a: "Yes, where the product allows it. Our [guide to low MOQ sourcing](/guides/sourcing-from-china-small-business) explains how." },
    ],
    related: ["/services/quality-inspection", "/guides/pre-shipment-inspection-aql", "/guides/sourcing-from-china-small-business"],
  },

  {
    slug: "small-businesses",
    takeaways: [
      "We'll tell you honestly whether your quantity and price are realistic.",
      "Where we can, we find factories that accept smaller first orders.",
      "Every supplier gets checked, and your goods are inspected before you pay the balance.",
      "We ship in a way that suits small orders, by shared container, air, or combined with other goods.",
    ],
    label: "Small businesses",
    title: "Small Business Sourcing from China: Low MOQ | SinoVorex",
    h1: "China sourcing for small businesses",
    description: "Sourcing from China for small businesses: honest advice on MOQs, verified factories, samples, inspection before you pay, and freight for small orders.",
    summary: "For small businesses, we tell you up front whether your quantity is realistic, look for factories that take smaller first orders, check suppliers before you pay, and inspect the goods before the balance. That way a first order from China doesn't put your business at risk.",
    published: "2026-10-20",
    updated: "2026-10-23",
    body: [
      { h2: "Buying from China without a procurement team" },
      { p: "Big importers have staff in China, buying agents and quality teams. A small business usually has one person doing all of it, and one bad order can wipe out a year's profit." },
      { p: "You need the same checks a big importer makes, just scaled to the size of your order." },

      { h2: "What we do for small businesses" },
      { ol: [
        "We give you an honest answer first. Before you spend anything on samples, we'll tell you whether your quantity and target price make sense for the product.",
        "We look for factories whose MOQ fits, and suggest changes like stock colours or simpler customisation that bring the MOQ down. Our [low MOQ guide](/guides/sourcing-from-china-small-business) has more on this.",
        "Every supplier on your shortlist is checked against the business registry. Our [factory audit checklist](/guides/factory-audit-checklist) shows what we look for.",
        "We collect and check samples so you can approve the product before you order.",
        "Your goods are [inspected](/services/quality-inspection) before you pay the rest, with photos of what we found.",
        "We pick freight that suits small volumes, like shared containers or air, and [combine shipments](/services/samples-consolidation) if you buy from more than one supplier.",
      ] },

      { h2: "Know your landed cost before you order" },
      { p: "The price on the quote isn't what the product ends up costing you. You also need to add samples, any tooling, the inspection, freight, insurance, import duties and taxes, and the agent's fee." },
      { p: "On a small order, those fixed costs add more to each unit. We'll help you work out the landed cost so you can check your margin before you commit. Our [guide to sourcing agent costs](/guides/china-sourcing-agent-cost) has a worked example." },

      { h2: "Products small businesses often source with us" },
      { ul: [
        "Packaging, such as printed boxes, bags, labels and stickers.",
        "Textiles, such as uniforms, workwear, tote bags and home textiles.",
        "Home and kitchen goods, such as cookware, storage and kitchen tools.",
        "Supplies for independent cafés, restaurants and hotels. See our page on [hotel and café supplies](/sourcing-for/hotels-restaurants).",
      ] },

      { h2: "Getting started" },
      { p: "[Send us your product details](/quote). Tell us what you want, roughly how many, your target price and where it's going, and we'll reply within 24 hours." },
    ],
    faqs: [
      { q: "Is there a minimum order size to work with you?", a: "We don't have one, but each factory sets its own MOQ. If a quantity is too small to be practical for the product, we'll tell you early." },
      { q: "How much will it cost?", a: "We charge a commission on the order value and confirm it in writing in your quote before we start. Our [cost guide](/guides/china-sourcing-agent-cost) explains how agents usually charge." },
    ],
    related: ["/guides/sourcing-from-china-small-business", "/guides/china-sourcing-agent-cost", "/services/product-sourcing"],
  },

  {
    slug: "hotels-restaurants",
    takeaways: [
      "Send us one item list, in Excel or CSV, and we'll source each category for you.",
      "Samples from all the suppliers arrive together in one parcel.",
      "We check the food-contact and fire-safety documents.",
      "Everything is delivered together in one combined shipment.",
    ],
    label: "Hotels, restaurants & cafés",
    title: "Hotel & Restaurant Supplies Sourcing from China | SinoVorex",
    h1: "Hotel, restaurant and café supplies from China",
    description: "Hotel, restaurant and café supplies from China: tableware, glassware, linens and amenities, with compliance checks and one combined shipment.",
    summary: "For hotels, restaurants and cafés, we source tableware, glassware, linens, guest amenities and café equipment from specialist factories across China. We check the food-contact and fire-safety documents, inspect each supplier's goods, and bring everything together into one shipment.",
    published: "2026-10-20",
    updated: "2026-10-23",
    body: [
      { h2: "Many products, many factories, one project" },
      { p: "Fitting out or restocking a hotel, restaurant or café means buying dozens of different things. Plates and cups, glassware, cutlery, bed linen and towels, guest amenities, uniforms and café equipment." },
      { p: "In China, each of these is made in a different specialist area, often in a different province. Buying them yourself means juggling lots of suppliers, lots of samples and lots of shipments." },

      { h2: "How we handle a procurement list" },
      { ol: [
        "You send us your item list. A spreadsheet works best, with the item, a specification or reference photo, the quantity, and any branding or logo you need. You can attach it to the [quote form](/quote).",
        "We find specialist factories for each group of items and send you a shortlist for each category.",
        "Samples from every supplier are collected, checked and sent to you in one parcel.",
        "We follow production across all the suppliers, so everything is ready for the same shipping date.",
        "Each supplier's goods are inspected before you pay their balance.",
        "Everything ships to your property or warehouse in [one combined shipment](/services/samples-consolidation).",
      ] },

      { h2: "Compliance for hospitality products" },
      { p: "Hotels and restaurants are legally responsible for what their guests eat from and sleep in. The rules depend on your country, but these are the documents to ask for." },
      { table: { head: ["Product group", "What to check"], rows: [
        ["Tableware, glassware, cutlery, food containers", "Food-contact test reports for your market, for example EU Regulation 1935/2004 and lead and cadmium tests for ceramics, or US FDA requirements"],
        ["Bed linen, curtains, upholstery", "Fire-retardancy test reports to the standard your local fire rules require"],
        ["Towels and textiles", "Fibre content, weight (GSM) and colour-fastness"],
        ["Guest amenities (toiletries)", "Ingredient lists and the cosmetic registration or safety assessment your market requires"],
        ["Electrical café equipment", "Electrical safety certification for your market, and the right plug and voltage"],
      ] } },
      { p: "Testing is done by accredited labs. We ask suppliers for the reports they already have, check they cover the exact product, and can collect samples for new tests if needed." },

      { h2: "Branded items" },
      { p: "Logo-printed tableware, embroidered linens and branded amenities are popular requests. Adding branding affects MOQs and lead times, so where both are possible we quote branded and unbranded options side by side." },

      { h2: "Getting started" },
      { p: "Send us your item list, quantities and delivery address through the [quote form](/quote), or by email or WhatsApp. We'll reply within 24 hours with any questions and the next steps." },
    ],
    faqs: [
      { q: "Can I send a full procurement list?", a: "Yes. Attach a spreadsheet (Excel or CSV) or a PDF to the quote form, or email it to us." },
      { q: "Can everything be delivered at the same time?", a: "That's exactly what combining shipments is for. Each supplier delivers to a warehouse in China and everything ships together." },
      { q: "Do you supply furniture and fixtures?", a: "Tell us what you need. We focus on the categories above, and we'll be honest if a request is outside what we do well." },
    ],
    related: ["/services/samples-consolidation", "/services/product-sourcing", "/sourcing-for/small-businesses"],
  },
];

export const AUDIENCE_BY_SLUG = Object.fromEntries(AUDIENCES.map((a) => [a.slug, a]));
