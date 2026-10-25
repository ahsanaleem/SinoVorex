import type { Article } from "./types";

/**
 * /markets/[slug]: sourcing and shipping from China for buyers in one country. Each page is written for that market
 * (ports, certification scheme, duties), not a template. Rates and rules change, so pages link to official sources.
 */
export const MARKETS: (Article & { label: string; country: string })[] = [
  {
    slug: "uae",
    label: "UAE",
    country: "United Arab Emirates",
    title: "China Sourcing Agent for UAE Buyers: Sourcing & Shipping to Dubai",
    h1: "China sourcing agent for UAE buyers",
    description: "Sourcing from China for buyers in the UAE: finding factories, inspection, shipping to Jebel Ali and Abu Dhabi, the 5% customs duty, VAT and product approvals.",
    summary: "We help UAE importers, traders and retailers buy from Chinese factories: finding suppliers, checking them, inspecting goods and shipping them to Jebel Ali or Khalifa Port. Sea freight from China to Dubai usually takes about 15 to 25 days. Most goods pay 5% customs duty plus 5% VAT, and goods kept in a free zone can defer duty until they enter the mainland.",
    takeaways: [
      "Sea freight from China to Jebel Ali usually takes about 15 to 25 days, port to port.",
      "Most goods pay 5% customs duty on the CIF value, plus 5% VAT.",
      "Goods held in a free zone such as JAFZA don't pay duty until they enter the UAE mainland.",
      "Regulated products, such as electrical goods and toys, need UAE conformity approval.",
    ],
    published: "2026-10-25",
    updated: "2026-10-25",
    body: [
      { h2: "Who we work with in the UAE" },
      { p: "The UAE is one of China's biggest trading partners in the region, and Dubai is a re-export hub for the Gulf, Africa and South Asia. Our UAE clients include general traders, e-commerce sellers, retailers, contractors fitting out hotels and offices, and companies re-exporting to neighbouring markets." },
      { p: "Many already buy from China. What they want is fewer surprises: suppliers checked before the deposit, goods inspected before the balance, and shipping that arrives on time." },

      { h2: "Shipping from China to the UAE" },
      { table: { caption: "Typical port-to-port times from Shanghai, Ningbo or Shenzhen. Add a few days for customs clearance and delivery.", head: ["Route", "Typical transit"], rows: [
        ["Sea freight to Jebel Ali (Dubai)", "About 15 to 25 days"],
        ["Sea freight to Khalifa Port (Abu Dhabi)", "About 16 to 26 days"],
        ["Air freight to Dubai or Abu Dhabi", "About 3 to 6 days"],
      ] } },
      { p: "For mixed orders from several Chinese suppliers, it usually pays to [consolidate](/services/samples-consolidation) everything into one container. Our [CBM calculator](/tools/cbm-calculator) shows whether a 20-foot or 40-foot container fits your order." },

      { h2: "Customs duty and VAT" },
      { p: "The UAE applies the GCC common customs tariff. For most goods that means 5% customs duty on the CIF value (the cost of the goods, insurance and freight). Some goods, such as tobacco and alcohol, carry much higher rates, and a few are exempt." },
      { p: "VAT at 5% is then charged on the CIF value plus duty. VAT-registered businesses can usually reclaim it. You can estimate the total with our [landed cost calculator](/tools/landed-cost-calculator)." },
      { p: "To import commercially, your company must be registered with customs. In Dubai, that means a customs client code from [Dubai Customs](https://www.dubaicustoms.gov.ae)." },

      { h2: "Free zones" },
      { p: "Goods shipped into a free zone, such as the Jebel Ali Free Zone, don't pay customs duty while they stay there. Duty is paid only when they move into the UAE mainland. Goods re-exported from the free zone to another country usually don't pay UAE duty at all. If you re-export from Dubai, it's worth asking your customs broker which set-up suits you." },

      { h2: "Product approvals" },
      { p: "Regulated products need to show they meet UAE standards before they can be sold. These include electrical and electronic goods, toys, some building materials and products that touch food. The usual route is a certificate of conformity under the Emirates Conformity Assessment Scheme (ECAS), based on test reports from an accredited laboratory." },
      { p: "Ask your supplier for existing test reports early. We check the goods against them in the [pre-shipment inspection](/services/quality-inspection), so what ships matches what was tested." },

      { h2: "Documents for importing into the UAE" },
      { ul: [
        "Commercial invoice and packing list, matching the goods exactly.",
        "Bill of lading or air waybill.",
        "Certificate of origin. Many UAE importers ask for one attested by the Chinese chamber of commerce.",
        "Conformity certificates for regulated products.",
      ] },

      { h2: "How we help UAE buyers" },
      { ol: [
        "We find factories that make your product and check them against China's business registry.",
        "We collect samples, check them and send them to Dubai together.",
        "We follow production in Chinese and inspect the goods before you pay the balance.",
        "We arrange freight to Jebel Ali, Khalifa Port or your free zone with partner forwarders.",
      ] },
      { p: "If you'd like to visit suppliers yourself, we also plan [business trips to China and the Canton Fair](/services/china-business-trips), which is a popular trip for buyers from the Gulf." },
    ],
    faqs: [
      { q: "How long does shipping from China to Dubai take?", a: "By sea, usually about 15 to 25 days to Jebel Ali, port to port. By air, about 3 to 6 days." },
      { q: "What is the import duty from China to the UAE?", a: "For most goods it's 5% of the CIF value, plus 5% VAT. Some goods carry higher rates, so check your product's tariff code with your broker." },
      { q: "Can you ship to a free zone?", a: "Yes. Partner forwarders can deliver to free zones such as JAFZA, where duty is deferred until goods enter the mainland." },
    ],
    related: ["/tools/landed-cost-calculator", "/services/shipping-coordination", "/markets/saudi-arabia"],
  },

  {
    slug: "saudi-arabia",
    label: "Saudi Arabia",
    country: "Saudi Arabia",
    title: "Shipping from China to Saudi Arabia: Sourcing, SABER & Customs",
    h1: "Sourcing and shipping from China to Saudi Arabia",
    description: "Buying from China for Saudi Arabia: finding factories, inspection, shipping to Jeddah and Dammam, SABER certificates, customs duty and 15% VAT explained.",
    summary: "We help Saudi importers buy from Chinese factories and ship to Jeddah, Dammam or Riyadh. Sea freight from China usually takes about 18 to 30 days. Every shipment needs a shipment certificate through the SABER platform, and regulated products also need a product certificate. Import VAT is 15%, on top of customs duty.",
    takeaways: [
      "Sea freight from China to Jeddah or Dammam usually takes about 18 to 30 days.",
      "Every shipment needs a SABER shipment certificate; regulated products also need a product certificate.",
      "Import VAT is 15%, charged on top of customs duty.",
      "Start SABER early, because a missing certificate holds the goods at the port.",
    ],
    published: "2026-10-25",
    updated: "2026-10-25",
    body: [
      { h2: "Who we work with in Saudi Arabia" },
      { p: "Saudi Arabia is one of the largest import markets in the Middle East, and demand from construction, hospitality and retail keeps growing. Our Saudi clients include retailers, wholesalers, contractors, hotel and restaurant groups, and e-commerce sellers." },
      { p: "Most of the problems Saudi buyers bring us are about compliance. Goods arrive without the right certificates and sit at the port. Planning the SABER steps from the start avoids that." },

      { h2: "Shipping from China to Saudi Arabia" },
      { table: { caption: "Typical port-to-port times from Shanghai, Ningbo or Shenzhen. Clearance and delivery inland add time.", head: ["Route", "Typical transit"], rows: [
        ["Sea freight to Jeddah Islamic Port (Red Sea)", "About 18 to 28 days"],
        ["Sea freight to King Abdulaziz Port, Dammam (Gulf)", "About 18 to 30 days"],
        ["Air freight to Riyadh, Jeddah or Dammam", "About 3 to 6 days"],
      ] } },
      { p: "Choose the port closest to where the goods are going. Jeddah suits the west of the country and Dammam the Eastern Province and Riyadh." },

      { h2: "SABER: product and shipment certificates" },
      { p: "[SABER](https://saber.sa) is Saudi Arabia's online platform for product conformity. It works in two steps." },
      { ol: [
        "Product certificate. Regulated products need a product certificate of conformity, issued through SABER by an approved certification body, usually based on test reports. It's linked to the product and valid for a set period.",
        "Shipment certificate. Every shipment, regulated or not, needs a shipment certificate through SABER before customs clearance. It covers that one consignment.",
      ] },
      { p: "For products that aren't regulated, the importer usually self-declares them on SABER before requesting the shipment certificate. The rules have changed several times, so check the current requirements for your product's tariff code with a certification body or your customs broker." },
      { p: "Food, cosmetics and medical products are regulated separately by the Saudi Food and Drug Authority (SFDA), which has its own registration process." },

      { h2: "Customs duty and VAT" },
      { p: "Saudi Arabia applies the GCC common customs tariff, so many goods pay 5% customs duty. Saudi Arabia has raised the rate on a number of products, though, and some pay considerably more. Check the rate for your product's tariff code with [ZATCA](https://zatca.gov.sa), the customs and tax authority." },
      { p: "Import VAT is 15%, charged on the customs value plus duty. Our [landed cost calculator](/tools/landed-cost-calculator) helps you add it all up." },

      { h2: "Documents for importing into Saudi Arabia" },
      { ul: [
        "Commercial invoice and packing list.",
        "Bill of lading or air waybill.",
        "Certificate of origin, often required to be attested.",
        "SABER shipment certificate, plus product certificates for regulated goods.",
        "SFDA approvals for food, cosmetics or medical products.",
      ] },

      { h2: "How we help Saudi buyers" },
      { ol: [
        "We find factories and check them before you pay a deposit.",
        "We ask suppliers for the test reports your SABER product certificate will need, and collect samples for testing where needed.",
        "We follow production and inspect the goods against the tested sample.",
        "We arrange freight to Jeddah or Dammam with partner forwarders, timed with your SABER certificates.",
      ] },
    ],
    faqs: [
      { q: "Does every shipment to Saudi Arabia need a SABER certificate?", a: "Yes. Every shipment needs a SABER shipment certificate for customs clearance, and regulated products also need a product certificate." },
      { q: "How long does shipping from China to Saudi Arabia take?", a: "By sea, usually about 18 to 30 days to Jeddah or Dammam, port to port. By air, about 3 to 6 days." },
      { q: "What VAT do I pay on goods from China?", a: "Import VAT in Saudi Arabia is 15%, charged on the customs value plus duty." },
    ],
    related: ["/markets/uae", "/tools/landed-cost-calculator", "/services/quality-inspection"],
  },

  {
    slug: "pakistan",
    label: "Pakistan",
    country: "Pakistan",
    title: "Import from China to Pakistan: Sourcing & Shipping to Karachi",
    h1: "Importing from China to Pakistan",
    description: "Importing from China to Pakistan: finding factories, inspection, shipping to Karachi and Port Qasim, WeBOC clearance, duties and the China-Pakistan FTA.",
    summary: "We help Pakistani importers and traders buy from Chinese factories and ship to Karachi or Port Qasim. Sea freight usually takes about 15 to 25 days. Customs clearance runs through the WeBOC system, and many goods qualify for lower duty under the China-Pakistan Free Trade Agreement with a proper certificate of origin.",
    takeaways: [
      "Sea freight from China to Karachi usually takes about 15 to 25 days.",
      "Clearance runs through WeBOC, and you need a registered importer (NTN) and a bank import form.",
      "Many goods pay lower duty under the China-Pakistan FTA, with a valid certificate of origin.",
      "The consignee name on the bill of lading must match your registered name exactly.",
    ],
    published: "2026-10-25",
    updated: "2026-10-25",
    body: [
      { h2: "Who we work with in Pakistan" },
      { p: "China is Pakistan's largest source of imports. Our Pakistani clients include traders in Karachi and Lahore, retailers and e-commerce sellers, manufacturers buying machinery and parts, and companies supplying construction and hospitality projects." },
      { p: "Pakistani buyers often find suppliers themselves at fairs or online. Where we help most is checking those suppliers, inspecting the goods before payment, and getting the paperwork right for a smooth clearance." },

      { h2: "Shipping from China to Pakistan" },
      { table: { caption: "Typical times from major Chinese ports. Allow extra time for clearance and inland transport.", head: ["Route", "Typical transit"], rows: [
        ["Sea freight to Karachi Port", "About 15 to 25 days"],
        ["Sea freight to Port Qasim", "About 15 to 25 days"],
        ["Air freight to Karachi, Lahore or Islamabad", "About 4 to 8 days"],
      ] } },
      { p: "Karachi handles most of Pakistan's imports, and Port Qasim, about 35 km east, handles much of the rest." },

      { h2: "Customs clearance through WeBOC" },
      { p: "Pakistan Customs processes imports through WeBOC, its online clearance system. To import commercially you'll typically need:" },
      { ul: [
        "A National Tax Number (NTN) and registration as an importer.",
        "An electronic import form through your bank before the goods ship.",
        "A goods declaration filed in WeBOC, usually by a licensed customs agent.",
        "Commercial invoice, packing list and bill of lading.",
      ] },
      { p: "Check that the consignee name on the bill of lading matches your registered company name exactly. A mismatch is a common reason for goods being held." },

      { h2: "Duties and the China-Pakistan Free Trade Agreement" },
      { p: "Imports can attract several charges: customs duty, regulatory duty, additional customs duty, sales tax and advance income tax. Together they can add a large share to the landed cost, so work it out before you order. Our [landed cost calculator](/tools/landed-cost-calculator) helps." },
      { p: "Under the China-Pakistan Free Trade Agreement, many products qualify for reduced or zero customs duty, provided they meet the rules of origin and come with a valid certificate of origin issued in China. Ask us for it when we arrange the order. Rates and the list of goods change, so confirm the current tariff for your product with the [Federal Board of Revenue](https://www.fbr.gov.pk) or your customs agent." },

      { h2: "Product standards" },
      { p: "Some products must meet Pakistan Standards and Quality Control Authority (PSQCA) requirements, especially electrical goods, food products and some consumer goods. Ask your customs agent which apply to your product, and we'll ask the supplier for the relevant test reports." },

      { h2: "How we help Pakistani buyers" },
      { ol: [
        "We find and check suppliers, including ones you've already met.",
        "We collect and check samples before you order.",
        "We inspect the goods before you pay the balance, so you're not paying for faulty stock.",
        "We arrange freight to Karachi or Port Qasim, and make sure the documents and certificate of origin are correct.",
      ] },
    ],
    faqs: [
      { q: "How long does shipping from China to Karachi take?", a: "By sea, usually about 15 to 25 days port to port. By air, about 4 to 8 days." },
      { q: "Can I get lower duty on goods from China?", a: "Many goods qualify for lower duty under the China-Pakistan Free Trade Agreement, if they meet the rules of origin and come with a valid certificate of origin." },
      { q: "Do I need an NTN to import from China?", a: "For commercial imports, yes. You'll also need an electronic import form through your bank and a customs agent to file the goods declaration." },
    ],
    related: ["/tools/landed-cost-calculator", "/guides/china-sourcing-agent-cost", "/services/quality-inspection"],
  },

  {
    slug: "nigeria",
    label: "Nigeria",
    country: "Nigeria",
    title: "Import from China to Nigeria: SONCAP, Sourcing & Shipping",
    h1: "Importing from China to Nigeria",
    description: "Importing from China to Nigeria: finding factories, inspection, SONCAP certificates, Form M, shipping to Lagos ports and what to check before you pay.",
    summary: "We help Nigerian importers and traders buy from Chinese factories and ship to Lagos. Sea freight usually takes about 30 to 45 days. Before goods ship, the importer opens a Form M through their bank, and regulated products need a SONCAP product certificate, followed by a SONCAP certificate for each shipment.",
    takeaways: [
      "Sea freight from China to Lagos usually takes about 30 to 45 days.",
      "Open a Form M through your bank before the goods ship.",
      "Regulated products need a SONCAP product certificate, then a SONCAP certificate for each shipment.",
      "Food, drugs and cosmetics also need NAFDAC registration.",
    ],
    published: "2026-10-25",
    updated: "2026-10-25",
    body: [
      { h2: "Who we work with in Nigeria" },
      { p: "Nigeria is one of China's largest trading partners in Africa. Our Nigerian clients include traders supplying markets in Lagos, Onitsha and Kano, retailers, distributors, and businesses buying machinery and building materials." },
      { p: "The biggest risks Nigerian buyers tell us about are suppliers who take a deposit and disappear, goods that don't match the samples, and shipments held because the paperwork is wrong. Checking the supplier, inspecting the goods and getting the certificates right deals with all three." },

      { h2: "Shipping from China to Nigeria" },
      { table: { caption: "Typical times from major Chinese ports. Port congestion in Lagos can add time.", head: ["Route", "Typical transit"], rows: [
        ["Sea freight to Lagos (Apapa, Tin Can Island or Lekki Deep Sea Port)", "About 30 to 45 days"],
        ["Sea freight to Onne / Port Harcourt", "About 35 to 50 days"],
        ["Air freight to Lagos or Abuja", "About 5 to 10 days"],
      ] } },

      { h2: "Form M" },
      { p: "Before goods ship, the importer must open a Form M, the electronic import declaration, through an authorised bank on the Nigeria single window platform. The bank needs the pro forma invoice and, for regulated products, the SONCAP product certificate. Make sure the Form M is approved before the supplier ships." },

      { h2: "SONCAP certification" },
      { p: "SONCAP is the Standards Organisation of Nigeria's conformity programme for regulated products. It works in two stages." },
      { ol: [
        "Product certificate. The exporter gets a product certificate from a SON-accredited certification body, usually based on test reports and, in some cases, a factory audit. You need it to open the Form M.",
        "SONCAP certificate. For each shipment, the goods are inspected and a certificate is issued, which you need for customs clearance in Nigeria.",
      ] },
      { p: "Which route applies depends on your product and how often you ship it. Check the current rules with the [Standards Organisation of Nigeria](https://son.gov.ng) or an accredited certification body." },
      { p: "Food, drugs, cosmetics and medical devices are regulated by NAFDAC, which has its own registration and approval process." },

      { h2: "Duties and charges" },
      { p: "Nigeria applies the ECOWAS common external tariff, with duty bands that depend on the product, plus VAT and other levies. Rates for some products are much higher than others, so check your product's tariff code with the [Nigeria Customs Service](https://customs.gov.ng) or a licensed customs agent before you order. Our [landed cost calculator](/tools/landed-cost-calculator) helps you see the full cost." },

      { h2: "How we help Nigerian buyers" },
      { ol: [
        "We check suppliers before you pay anything, including their business licence and bank account name.",
        "We help you get the test reports and documents needed for the SONCAP product certificate.",
        "We inspect the goods before the balance is paid, with photos and video.",
        "We arrange freight to Lagos with partner forwarders and check the documents match the Form M.",
      ] },
      { p: "Our guide to [what sourcing agents cost and the red flags to watch for](/guides/china-sourcing-agent-cost) explains how to avoid the most common scams." },
    ],
    faqs: [
      { q: "How long does shipping from China to Lagos take?", a: "By sea, usually about 30 to 45 days port to port, sometimes longer with port congestion. By air, about 5 to 10 days." },
      { q: "Do I need SONCAP for every product?", a: "SONCAP applies to regulated products. Some goods are exempt, and food, drugs and cosmetics go through NAFDAC instead. Check your product's requirements before ordering." },
      { q: "When should I open the Form M?", a: "Before the goods ship. Your bank processes it, and for regulated products you'll need the SONCAP product certificate first." },
    ],
    related: ["/guides/china-sourcing-agent-cost", "/services/factory-vetting", "/tools/landed-cost-calculator"],
  },

  {
    slug: "kenya",
    label: "Kenya",
    country: "Kenya",
    title: "Import from China to Kenya: KEBS PVoC, Sourcing & Shipping",
    h1: "Importing from China to Kenya",
    description: "Importing from China to Kenya: finding factories, inspection, KEBS PVoC certificates of conformity, shipping to Mombasa, duties and the documents you need.",
    summary: "We help Kenyan importers buy from Chinese factories and ship to Mombasa. Sea freight usually takes about 20 to 30 days. Most regulated goods need a certificate of conformity under KEBS's pre-export verification (PVoC) programme before they leave China. Goods arriving without one are inspected at the port, at extra cost.",
    takeaways: [
      "Sea freight from China to Mombasa usually takes about 20 to 30 days.",
      "Most regulated goods need a KEBS PVoC certificate of conformity before shipping.",
      "Goods arriving without the certificate are inspected at the port and pay an extra fee.",
      "Kenya applies the East African Community tariff, plus VAT and import levies.",
    ],
    published: "2026-10-25",
    updated: "2026-10-25",
    body: [
      { h2: "Who we work with in Kenya" },
      { p: "Kenya is the main gateway to East Africa, and Mombasa serves Uganda, Rwanda and South Sudan as well as Kenya. Our Kenyan clients include importers and distributors in Nairobi and Mombasa, retailers, hotels and restaurants, and businesses buying equipment and building materials." },

      { h2: "Shipping from China to Kenya" },
      { table: { caption: "Typical times from major Chinese ports. Inland transport to Nairobi adds time, by road or the standard gauge railway.", head: ["Route", "Typical transit"], rows: [
        ["Sea freight to Mombasa", "About 20 to 30 days"],
        ["Air freight to Nairobi (Jomo Kenyatta International)", "About 4 to 8 days"],
      ] } },

      { h2: "KEBS PVoC: certificate of conformity" },
      { p: "The Kenya Bureau of Standards (KEBS) runs the Pre-Export Verification of Conformity programme (PVoC). For regulated goods, the products are checked, and tested where needed, in China before shipping, by a company appointed by KEBS. If they comply, it issues a certificate of conformity (CoC), which you need to clear the goods in Kenya." },
      { p: "Goods that arrive without a valid certificate are inspected at the destination instead, which costs more and takes longer. KEBS renewed its PVoC contracts in 2026, so check the current arrangements and fees for goods from China with [KEBS](https://www.kebs.org) before you ship." },
      { p: "There are different routes depending on how often you ship and the supplier's quality record, from inspecting every consignment to registering or licensing products. We'll ask the supplier for test reports early, so the inspection goes smoothly." },

      { h2: "Duties, VAT and levies" },
      { p: "Kenya applies the East African Community common external tariff, with duty bands that depend on the product. VAT and import levies are added on top. Check your product's tariff code and current rates with the Kenya Revenue Authority or your clearing agent, and use our [landed cost calculator](/tools/landed-cost-calculator) to see the full cost." },
      { p: "Import declarations are lodged through Kenya's trade single window, [KenTrade](https://www.kentrade.go.ke), usually by a licensed clearing agent." },

      { h2: "Documents for importing into Kenya" },
      { ul: [
        "Commercial invoice and packing list.",
        "Bill of lading or air waybill.",
        "Certificate of conformity (PVoC) for regulated goods.",
        "Import declaration through KenTrade.",
        "Any product-specific permits, for example for food or pharmaceuticals.",
      ] },

      { h2: "How we help Kenyan buyers" },
      { ol: [
        "We find and check suppliers before you pay a deposit.",
        "We collect test reports and samples, so the PVoC inspection goes smoothly.",
        "We inspect the goods ourselves before the balance is paid.",
        "We arrange freight to Mombasa with partner forwarders and check the documents.",
      ] },
    ],
    faqs: [
      { q: "How long does shipping from China to Mombasa take?", a: "By sea, usually about 20 to 30 days port to port. By air to Nairobi, about 4 to 8 days." },
      { q: "What happens if goods arrive without a PVoC certificate?", a: "They're inspected at the port of arrival instead, which costs extra and delays clearance. It's much better to get the certificate before shipping." },
      { q: "Can you ship to Uganda or Rwanda through Mombasa?", a: "Yes. Partner forwarders can arrange transit through Mombasa to neighbouring countries." },
    ],
    related: ["/tools/landed-cost-calculator", "/services/quality-inspection", "/markets/nigeria"],
  },
];

export const MARKET_BY_SLUG = Object.fromEntries(MARKETS.map((m) => [m.slug, m]));
