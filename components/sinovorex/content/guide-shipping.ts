import type { Article } from "./types";

/**
 * "Shipping from China to …" guides. Duty rates change often, so these explain the process and link to
 * official tariff tools instead of quoting rates.
 */
export const SHIPPING_GUIDES: Article[] = [
  {
    slug: "shipping-from-china-to-usa",
    title: "Shipping from China to the USA: Times, Customs & Costs",
    h1: "Shipping from China to the USA",
    description: "How to ship goods from China to the USA: sea and air transit times by port, ISF and customs entry, duties, Amazon FBA delivery and a checklist.",
    summary: "Sea freight from China to the US West Coast usually takes about 14 to 20 days port to port, and 30 to 40 days to the East Coast. Air takes about 3 to 8 days. For ocean shipments you need an Importer Security Filing before the goods are loaded, and commercial shipments over US$2,500 need a formal customs entry and a customs bond.",
    takeaways: [
      "Sea to Los Angeles or Long Beach takes about 14 to 20 days; to New York about 30 to 40.",
      "Ocean shipments need an Importer Security Filing (ISF) at least 24 hours before loading in China.",
      "Shipments over US$2,500 need a formal entry and a customs bond, usually through a customs broker.",
      "Duty rates on Chinese goods have changed a lot since 2018, so check your product's current rate first.",
    ],
    published: "2026-10-23",
    updated: "2026-10-23",
    body: [
      { h2: "Sea, air or express: which to use" },
      { table: { head: ["Mode", "Typical time", "Good for"], rows: [
        ["Sea freight, full container (FCL)", "14 to 40 days port to port", "Orders of roughly 15 cubic metres or more"],
        ["Sea freight, shared container (LCL)", "Add about a week for consolidation", "Smaller orders that still need sea prices"],
        ["Air freight", "3 to 8 days", "Urgent or light, valuable goods"],
        ["Express courier (DHL, FedEx, UPS)", "3 to 5 days door to door", "Samples and very small shipments"],
      ] } },

      { h2: "Typical sea transit times to US ports" },
      { table: { caption: "Port-to-port sailing times from Shanghai, Ningbo or Shenzhen. Allow extra days for customs clearance and trucking, and expect delays in peak season (August to October).", head: ["US port", "Typical transit"], rows: [
        ["Los Angeles / Long Beach", "14 to 20 days"],
        ["Oakland", "16 to 22 days"],
        ["Seattle / Tacoma", "13 to 18 days"],
        ["Houston", "28 to 35 days"],
        ["Savannah", "30 to 38 days"],
        ["New York / New Jersey", "30 to 40 days"],
      ] } },
      { p: "If your customers are on the East Coast, it can still make sense to land on the West Coast and send the goods across by rail or truck, as this is often faster. Your forwarder can compare both." },

      { h2: "Before the goods leave China: the ISF" },
      { p: "For sea freight, US Customs and Border Protection requires an Importer Security Filing, often called ISF or \"10+2\". It has to be filed at least 24 hours before the container is loaded onto the ship in China. Your forwarder or customs broker files it, but they need details from you and the supplier, so get the commercial invoice and packing list sorted early. Late or missing filings can lead to fines." },

      { h2: "US customs clearance" },
      { p: "Commercial shipments valued over US$2,500 need a formal entry, which in practice means using a licensed customs broker and having a customs bond. A bond can be bought for a single shipment, or as a yearly continuous bond if you import regularly." },
      { p: "Since 2025, low-value shipments from China no longer qualify for the old US$800 duty-free \"de minimis\" treatment, so even small parcels can now owe duty. If you're importing for resale, plan on paying duty on everything." },
      { p: "Documents you'll need:" },
      { ul: [
        "Commercial invoice with the correct value, description and country of origin.",
        "Packing list that matches the cartons exactly.",
        "Bill of lading (sea) or air waybill (air).",
        "Any certificates or test reports your product needs, for example for children's products or electrical goods.",
      ] },

      { h2: "Duties and tariffs" },
      { p: "The duty you pay depends on your product's tariff code (the HTS code) and its country of origin. Many Chinese goods carry extra tariffs on top of the normal rate, and these have changed several times in recent years. Look up your product in the official [Harmonized Tariff Schedule](https://hts.usitc.gov/) and ask your customs broker to confirm the current total before you place the order, so the duty doesn't wipe out your margin." },

      { h2: "Shipping to Amazon FBA in the US" },
      { p: "Many forwarders deliver straight to Amazon fulfilment centres. To avoid problems at check-in:" },
      { ul: [
        "Create the shipment in Seller Central before the goods leave China, so you have the right shipment ID and carton labels.",
        "Have the factory apply FNSKU product labels and carton labels, and check them in the [pre-shipment inspection](/services/quality-inspection).",
        "Stay within Amazon's carton size and weight limits for your category.",
        "Amazon is not the importer of record, so you need your own customs broker, or a forwarder offering DDP delivery.",
      ] },

      { h2: "Shipping checklist" },
      { ol: [
        "Confirm the HTS code and the current duty rate for your product.",
        "Decide on sea, air or courier, and on the Incoterm (FOB, CIF or DDP).",
        "Book a customs broker and arrange a customs bond if you don't use DDP.",
        "Send the forwarder the details for the ISF at least a few days before loading.",
        "Inspect the goods before they leave the factory.",
        "Check the commercial invoice and packing list match the cartons.",
        "Track the shipment and have the duty payment ready when it arrives.",
      ] },
      { p: "We coordinate [freight from China](/services/shipping-coordination) with partner forwarders, including DDP delivery to US addresses and Amazon warehouses where available." },
    ],
    faqs: [
      { q: "How long does shipping from China to the USA take?", a: "By sea, about 14 to 20 days to the West Coast and 30 to 40 days to the East Coast, port to port. By air, about 3 to 8 days. Add time for customs and delivery." },
      { q: "Do I need a customs broker?", a: "For commercial shipments over US$2,500, you'll almost always need one, plus a customs bond. On DDP terms, the forwarder's broker handles this for you." },
      { q: "Is there still a duty-free limit for goods from China?", a: "Not in the way there used to be. The US$800 de minimis exemption no longer applies to goods from China, so budget for duty on every shipment." },
    ],
    related: ["/services/shipping-coordination", "/sourcing-for/amazon-sellers", "/guides/shipping-from-china-to-uk", "/guides/shipping-from-china-to-europe", "/guides/freight-forwarder-vs-sourcing-agent"],
    sources: [
      { name: "Harmonized Tariff Schedule of the United States (USITC)", url: "https://hts.usitc.gov/" },
      { name: "U.S. Customs and Border Protection: Importer Security Filing (10+2)", url: "https://www.cbp.gov/border-security/ports-entry/cargo-security/importer-security-filing-102" },
      { name: "U.S. Customs and Border Protection: Basic import and export", url: "https://www.cbp.gov/trade/basic-import-export" },
      { name: "USTR: Section 301 tariff actions on China", url: "https://ustr.gov/issue-areas/enforcement/section-301-investigations/tariff-actions" },
    ],
  },

  {
    slug: "shipping-from-china-to-uk",
    title: "Shipping from China to the UK: Times, Customs & VAT",
    h1: "Shipping from China to the UK",
    description: "How to ship goods from China to the UK: sea, rail and air transit times, EORI numbers, import VAT and duty, customs clearance, Amazon FBA and a checklist.",
    summary: "Sea freight from China to UK ports such as Felixstowe and Southampton usually takes about 30 to 45 days, and longer when ships go around Africa. Rail to Europe plus a truck to the UK takes about 18 to 25 days, and air about 3 to 7 days. You need a GB EORI number to import, and you'll pay import VAT and any customs duty when the goods arrive.",
    takeaways: [
      "Sea to Felixstowe or Southampton usually takes about 30 to 45 days, port to port.",
      "You need an EORI number starting with GB before you can import.",
      "You'll pay import VAT (20% on most goods) plus any customs duty for your product.",
      "Look up your commodity code on the UK Trade Tariff to find your duty rate.",
    ],
    published: "2026-10-23",
    updated: "2026-10-23",
    body: [
      { h2: "Sea, rail or air: which to use" },
      { table: { head: ["Mode", "Typical time", "Good for"], rows: [
        ["Sea freight (FCL or LCL)", "30 to 45 days port to port", "Most commercial orders"],
        ["Rail to Europe, then truck to the UK", "18 to 25 days", "Goods that need to arrive faster than sea, at a lower cost than air"],
        ["Air freight", "3 to 7 days", "Urgent or light, valuable goods"],
        ["Express courier", "3 to 5 days door to door", "Samples and very small shipments"],
      ] } },

      { h2: "Typical sea transit times to UK ports" },
      { table: { caption: "Port-to-port sailing times from Shanghai or Ningbo. When ships avoid the Red Sea and go around the Cape of Good Hope, add one to two weeks.", head: ["UK port", "Typical transit"], rows: [
        ["Felixstowe", "30 to 45 days"],
        ["Southampton", "30 to 45 days"],
        ["London Gateway", "30 to 45 days"],
      ] } },

      { h2: "Before you import: get an EORI number" },
      { p: "To move goods into Great Britain you need an EORI number starting with GB. It's free and you apply on GOV.UK. Your customs broker or forwarder will ask for it, so sort it out before your first shipment, not when the goods are already at the port." },

      { h2: "Import VAT and customs duty" },
      { p: "When goods arrive in the UK you normally pay two things." },
      { ul: [
        "Import VAT, which is 20% for most goods, worked out on the value of the goods plus shipping, insurance and duty. If you're VAT-registered you can usually reclaim it, and postponed VAT accounting lets you account for it on your VAT return instead of paying at the border.",
        "Customs duty, which depends on your product's commodity code. Some goods have no duty at all.",
      ] },
      { p: "Look up your commodity code and duty rate on the [UK Trade Tariff](https://www.gov.uk/trade-tariff). Getting the code right matters, because the wrong one can mean paying too much, or a penalty later." },

      { h2: "Customs clearance and documents" },
      { p: "Most importers use a customs broker or their forwarder to make the import declaration. They'll need:" },
      { ul: [
        "Your EORI number.",
        "The commercial invoice with value, description and country of origin.",
        "A packing list that matches the cartons.",
        "The bill of lading or air waybill.",
        "Any certificates your product needs, such as UKCA or CE conformity for electrical goods and toys.",
      ] },

      { h2: "Product safety rules" },
      { p: "As the importer, you're responsible for making sure the goods are safe and legal to sell in the UK. That can mean UKCA or CE marking, test reports for children's products, food-contact rules for kitchenware, and correct labelling. Ask your supplier for existing test reports early, and have the goods checked against them in the [pre-shipment inspection](/services/quality-inspection)." },

      { h2: "Shipping to Amazon FBA in the UK" },
      { ul: [
        "Create the shipment in Seller Central before the goods leave China.",
        "Have the factory apply FNSKU and carton labels, and check them during inspection.",
        "Make sure you, or your forwarder on DDP terms, are set up to act as the importer, because Amazon won't do it.",
      ] },

      { h2: "Shipping checklist" },
      { ol: [
        "Get a GB EORI number.",
        "Find the commodity code and duty rate on the UK Trade Tariff.",
        "Check which safety marks and test reports your product needs.",
        "Choose sea, rail or air, and an Incoterm (FOB, CIF or DDP).",
        "Inspect the goods before they leave the factory.",
        "Have your broker ready to clear customs, and budget for VAT and duty.",
      ] },
      { p: "We arrange [freight from China](/services/shipping-coordination) with partner forwarders, including DDP delivery to UK addresses where available." },
    ],
    faqs: [
      { q: "How long does sea freight from China to the UK take?", a: "Usually about 30 to 45 days port to port, plus a few days for customs and delivery. Allow longer when ships are routed around Africa." },
      { q: "Do I pay VAT on goods from China?", a: "Yes, import VAT is charged on most goods, usually at 20%. VAT-registered businesses can normally reclaim it." },
      { q: "What is an EORI number?", a: "A free registration number you need to import goods into Great Britain. You apply for one on GOV.UK." },
    ],
    related: ["/services/shipping-coordination", "/guides/shipping-from-china-to-europe", "/sourcing-for/amazon-sellers", "/guides/freight-forwarder-vs-sourcing-agent"],
    sources: [
      { name: "UK Trade Tariff (HMRC)", url: "https://www.trade-tariff.service.gov.uk/" },
      { name: "GOV.UK: Get an EORI number", url: "https://www.gov.uk/eori" },
      { name: "GOV.UK: VAT on imports, acquisitions and purchases from abroad", url: "https://www.gov.uk/guidance/vat-imports-acquisitions-and-purchases-from-abroad" },
      { name: "GOV.UK: Product safety for manufacturers", url: "https://www.gov.uk/guidance/product-safety-for-manufacturers" },
    ],
  },

  {
    slug: "shipping-from-china-to-europe",
    title: "Shipping from China to Europe: Sea, Rail, Customs & VAT",
    h1: "Shipping from China to Europe (EU)",
    description: "How to ship goods from China to the EU: sea and rail transit times to Rotterdam, Hamburg and more, EORI numbers, import VAT and duty, and a checklist.",
    summary: "Sea freight from China to northern European ports such as Rotterdam, Hamburg and Antwerp usually takes about 30 to 45 days. Rail from China to Germany or Poland takes about 16 to 25 days, and air about 3 to 7 days. To import into the EU you need an EU EORI number, and you pay import VAT at your country's rate plus any customs duty.",
    takeaways: [
      "Sea to Rotterdam, Hamburg or Antwerp usually takes about 30 to 45 days.",
      "Rail to Duisburg, Hamburg or Łódź is a faster option at about 16 to 25 days.",
      "You need an EU EORI number, issued by the customs office in your country.",
      "Check the duty rate for your product in the EU's TARIC database before you order.",
    ],
    published: "2026-10-23",
    updated: "2026-10-23",
    body: [
      { h2: "Sea, rail or air: which to use" },
      { table: { head: ["Mode", "Typical time", "Good for"], rows: [
        ["Sea freight (FCL or LCL)", "30 to 45 days to northern Europe", "Most commercial orders, lowest cost per unit"],
        ["Rail freight", "16 to 25 days to Germany or Poland", "Faster than sea and cheaper than air"],
        ["Air freight", "3 to 7 days", "Urgent or light, valuable goods"],
        ["Express courier", "3 to 5 days door to door", "Samples and very small shipments"],
      ] } },

      { h2: "Typical transit times to European hubs" },
      { table: { caption: "Typical times from China. Sea routes take one to two weeks longer when ships avoid the Red Sea.", head: ["Destination", "Mode", "Typical transit"], rows: [
        ["Rotterdam, Netherlands", "Sea", "30 to 45 days"],
        ["Hamburg, Germany", "Sea", "30 to 45 days"],
        ["Antwerp, Belgium", "Sea", "30 to 45 days"],
        ["Genoa, Italy / Piraeus, Greece", "Sea", "25 to 35 days"],
        ["Duisburg or Hamburg, Germany", "Rail", "16 to 22 days"],
        ["Łódź or Małaszewicze, Poland", "Rail", "16 to 20 days"],
      ] } },

      { h2: "Before you import: get an EORI number" },
      { p: "Anyone importing into the EU needs an EORI number. You get it from the customs authority in the EU country where you're based, and it's valid across the whole EU. Your forwarder or customs broker will need it to clear your goods." },

      { h2: "Import VAT and customs duty" },
      { ul: [
        "Import VAT is charged at the rate of the country where the goods are imported. Standard rates vary by country, roughly between 17% and 27%. VAT-registered businesses can normally reclaim it.",
        "Customs duty depends on your product's tariff code. Some goods are duty free, others carry duty, and some face extra anti-dumping duties when they come from China.",
      ] },
      { p: "Look up the duty for your product in the EU's [TARIC database](https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp), or the [Access2Markets](https://trade.ec.europa.eu/access-to-markets/en/home) tool, and confirm it with your broker." },

      { h2: "Product rules and the CE mark" },
      { p: "As the importer, you're responsible for making sure products sold in the EU are safe and properly marked. Many products need CE marking, a declaration of conformity and test reports, for example toys, electrical goods and machinery. Kitchenware that touches food needs food-contact test reports. Ask your supplier for existing reports early, and check the goods against them in the [pre-shipment inspection](/services/quality-inspection)." },

      { h2: "Shipping to Amazon FBA in Europe" },
      { ul: [
        "Create the shipment in Seller Central before the goods leave China.",
        "Apply FNSKU and carton labels at the factory, and check them during inspection.",
        "Decide which country you import into, since VAT registration and EORI are linked to it.",
        "Use DDP delivery, or arrange your own importer of record, because Amazon won't act as the importer.",
      ] },

      { h2: "Shipping checklist" },
      { ol: [
        "Get an EORI number in the country you'll import into.",
        "Find your product's tariff code and duty rate in TARIC.",
        "Check CE marking and any other product rules.",
        "Choose sea, rail or air, and an Incoterm (FOB, CIF or DDP).",
        "Inspect the goods before they leave the factory.",
        "Have your broker ready to clear customs, and budget for VAT and duty.",
      ] },
      { p: "We arrange [sea, rail and air freight](/services/shipping-coordination) from China with partner forwarders, including DDP delivery in Europe where available." },
    ],
    faqs: [
      { q: "Is rail from China to Europe cheaper than air?", a: "Yes, usually much cheaper, and roughly twice as fast as sea. It works best for goods going to central or northern Europe." },
      { q: "Do I need an EORI number to import into the EU?", a: "Yes. You get one from the customs authority in the EU country where you're based, and it works across the whole EU." },
      { q: "How much VAT will I pay on goods from China?", a: "Import VAT is charged at your country's rate, which for standard goods is roughly 17% to 27% depending on the country. VAT-registered businesses can usually reclaim it." },
    ],
    related: ["/services/shipping-coordination", "/guides/shipping-from-china-to-uk", "/sourcing-for/amazon-sellers", "/guides/freight-forwarder-vs-sourcing-agent"],
    sources: [
      { name: "EU TARIC database (European Commission)", url: "https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp?Lang=en" },
      { name: "European Commission: EORI number", url: "https://taxation-customs.ec.europa.eu/customs-4/customs-procedures-import-and-export-0/customs-procedures/economic-operators-registration-and-identification-number-eori_en" },
      { name: "European Commission: CE marking", url: "https://single-market-economy.ec.europa.eu/single-market/ce-marking_en" },
      { name: "Regulation (EU) 2023/988 on general product safety (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2023/988/oj" },
    ],
  },

  {
    slug: "shipping-from-china-to-australia",
    title: "Shipping from China to Australia: Times, GST & Biosecurity",
    h1: "Shipping from China to Australia",
    description: "How to ship goods from China to Australia: sea and air transit times, ChAFTA duty savings, 10% GST, import declarations, biosecurity and the asbestos ban.",
    summary: "Sea freight from China to Sydney, Melbourne or Brisbane usually takes about 12 to 22 days for a full container, and longer for shared (LCL) cargo. Under the China-Australia Free Trade Agreement most goods made in China pay no customs duty, as long as you have a valid certificate of origin. Imports pay 10% GST, timber packaging must meet biosecurity rules, and goods containing asbestos are banned.",
    takeaways: [
      "Sea freight to Sydney, Melbourne or Brisbane usually takes about 12 to 22 days port to port for a full container.",
      "Most Chinese-made goods pay 0% duty under ChAFTA, but only with a valid certificate of origin.",
      "GST of 10% is charged on the customs value plus duty and freight.",
      "Wooden pallets and crates must be ISPM 15 treated, and goods containing asbestos are banned.",
    ],
    published: "2026-11-08",
    updated: "2026-11-08",
    body: [
      { h2: "Sea or air: which to use" },
      { table: { head: ["Mode", "Typical time", "Good for"], rows: [
        ["Sea freight, full container (FCL)", "12 to 22 days port to port", "Most commercial orders"],
        ["Sea freight, shared container (LCL)", "21 to 31 days port to port", "Smaller orders, from about 1 to 15 cubic metres"],
        ["Air freight", "3 to 5 days airport to airport", "Urgent or light, valuable goods"],
        ["Express courier", "4 to 7 days door to door", "Samples and very small shipments"],
      ] } },
      { p: "Australia is much closer to China than Europe or North America, so sea freight is often the best choice even for fairly urgent orders. Direct services to Sydney and Melbourne are faster than those that tranship in Southeast Asia. Our [CBM calculator](/tools/cbm-calculator) shows whether your order fits a shared container, a 20-foot or a 40-foot container." },

      { h2: "Main Australian ports" },
      { table: { caption: "Port-to-port times for a full container from Shanghai, Ningbo or Shenzhen.", head: ["Port", "Serves", "Typical transit"], rows: [
        ["Sydney (Port Botany)", "New South Wales", "12 to 22 days"],
        ["Melbourne", "Victoria, and much of the south-east", "12 to 22 days"],
        ["Brisbane", "Queensland", "12 to 22 days"],
        ["Fremantle", "Western Australia", "12 to 22 days"],
      ] } },

      { h2: "Customs duty and ChAFTA" },
      { p: "Australia's general customs duty is 0% or 5% for most goods. Under the [China-Australia Free Trade Agreement](https://www.dfat.gov.au/trade/agreements/in-force/chafta/china-australia-fta) (ChAFTA), most goods made in China now enter duty free." },
      { p: "To claim the free rate, you need a valid ChAFTA certificate of origin for the shipment, issued in China and matching the invoice. Ask your supplier to arrange it before the goods ship. Without it, your broker has to declare the general rate, and the duty can't easily be claimed back later." },
      { p: "Check your product's tariff classification and rate on the [Australian Border Force](https://www.abf.gov.au/importing-exporting-and-manufacturing/importing) tariff tools, or ask your customs broker." },

      { h2: "GST and import declarations" },
      { p: "GST of 10% is charged on most imports. For goods worth more than AUD 1,000, it's worked out on the customs value plus any duty, plus the cost of international transport and insurance to Australia." },
      { p: "Goods worth more than AUD 1,000 also need a full import declaration, usually lodged by a licensed customs broker, and you pay GST, duty and processing charges before they're released. Businesses registered for GST can usually claim the import GST back, and regular importers can apply for the deferred GST scheme, which moves it to the next Business Activity Statement instead of paying at the border." },

      { h2: "Biosecurity rules" },
      { p: "Australia has some of the strictest biosecurity rules in the world, enforced by the Department of Agriculture, Fisheries and Forestry. Use its [BICON database](https://bicon.agriculture.gov.au/) to check whether your product needs a permit or treatment." },
      { ul: [
        "Wooden pallets, crates and dunnage must be treated and marked under [ISPM 15](https://www.agriculture.gov.au/biosecurity-trade/import/goods/timber-packaging/ispm-15), and free of bark.",
        "Containers and goods must be clean, with no soil, seeds, insects or plant material.",
        "Products made from wood, bamboo, straw, wool or other natural materials may need treatment or inspection.",
        "Packaging declarations are part of the paperwork for sea cargo, so ask the shipper to prepare them.",
      ] },
      { p: "Cargo that fails biosecurity checks can be fumigated, held, re-exported or destroyed at your cost. Using plastic pallets or ISPM 15 treated wood avoids the most common problem." },

      { h2: "The asbestos ban" },
      { p: "Importing goods that contain asbestos is prohibited in Australia, and the [Australian Border Force](https://www.abf.gov.au/importing-exporting-and-manufacturing/prohibited-goods/categories/asbestos) treats it seriously. It has been found in building materials, cement sheets, gaskets, brake parts, some toys and craft products, even when the supplier said the goods were asbestos free." },
      { p: "For any high-risk product, ask for testing by a laboratory that Australia recognises before shipping. A supplier's declaration alone may not be enough." },

      { h2: "Product safety and electrical goods" },
      { p: "As the importer, you're responsible for making sure goods meet Australian standards and consumer law. Some products have mandatory safety standards, including toys for young children, cots and prams, and many household items. Electrical goods must meet Australian safety requirements, usually shown by the RCM mark, and be built for 230 V and the Australian Type I plug." },
      { p: "Ask the supplier for existing test reports early. We check that the goods match them in our [pre-shipment inspection](/services/quality-inspection)." },

      { h2: "Shipping to Amazon in Australia" },
      { ul: [
        "Create the inbound shipment in Seller Central before the goods leave China.",
        "Have the factory apply FNSKU and carton labels, and check them during inspection.",
        "Arrange an importer of record, either yourself or a forwarder on DDP terms, because Amazon won't act as the importer.",
      ] },
      { p: "See our page on [sourcing for Amazon sellers](/sourcing-for/amazon-sellers) for the FBA checks we add to an inspection." },

      { h2: "Shipping checklist" },
      { ol: [
        "Check your product in BICON and against Australian safety standards.",
        "Find the tariff classification and confirm it qualifies for the ChAFTA rate.",
        "Ask the supplier for a ChAFTA certificate of origin and any test reports.",
        "Make sure wooden packaging is ISPM 15 treated, or use plastic pallets.",
        "Choose sea or air, and an Incoterm (FOB, CIF or DDP).",
        "Inspect the goods before they leave the factory.",
        "Have a customs broker ready, and budget for GST and port charges.",
      ] },
      { p: "We arrange [freight from China](/services/shipping-coordination) with partner forwarders to all main Australian ports. Our [landed cost calculator](/tools/landed-cost-calculator) shows what each unit costs once freight, duty and GST are added." },
    ],
    faqs: [
      { q: "How long does shipping from China to Australia take?", a: "By sea, usually about 12 to 22 days port to port for a full container, and about 3 to 4 weeks for shared (LCL) cargo. By air, about 3 to 5 days." },
      { q: "Do I pay import duty on goods from China?", a: "Most goods made in China are duty free under ChAFTA, as long as you have a valid certificate of origin. GST of 10% still applies." },
      { q: "Do I need a customs broker in Australia?", a: "For goods worth more than AUD 1,000, a full import declaration is needed, and most businesses use a licensed customs broker to lodge it." },
    ],
    related: ["/services/shipping-coordination", "/guides/shipping-from-china-to-usa", "/sourcing-for/amazon-sellers", "/tools/landed-cost-calculator"],
    sources: [
      { name: "Australian Border Force: Importing", url: "https://www.abf.gov.au/importing-exporting-and-manufacturing/importing" },
      { name: "Australian Border Force: Asbestos", url: "https://www.abf.gov.au/importing-exporting-and-manufacturing/prohibited-goods/categories/asbestos" },
      { name: "DFAT: China-Australia Free Trade Agreement", url: "https://www.dfat.gov.au/trade/agreements/in-force/chafta/china-australia-fta" },
      { name: "Department of Agriculture, Fisheries and Forestry: ISPM 15", url: "https://www.agriculture.gov.au/biosecurity-trade/import/goods/timber-packaging/ispm-15" },
      { name: "BICON: Australian biosecurity import conditions", url: "https://bicon.agriculture.gov.au/" },
    ],
  },
];
