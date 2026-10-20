import type { Block, QA } from "./types";

/**
 * Long-form copy for /services/[slug]. Short card copy (title, desc, includes, youReceive) stays in data.ts.
 * Timings and price bases describe how we normally work; anything binding is confirmed in each written quote.
 */
export type ServiceContent = {
  h1: string;
  seoTitle: string;
  description: string;   // meta description
  serviceType: string;   // schema.org Service.serviceType
  processStep?: string;  // PROCESS.step this service maps to
  updated: string;       // ISO date of last content change
  body: Block[];
  faqs: QA[];
};

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  "product-sourcing": {
    h1: "Product Sourcing Agent in China",
    seoTitle: "China Sourcing Agent: Find & Compare Factories | Sino Vorex",
    description: "We find manufacturers in China for your product, compare quotes, MOQs and lead times against one specification, and send you a shortlist of factories.",
    serviceType: "Product sourcing",
    processStep: "02",
    updated: "2026-10-20",
    body: [
      { h2: "Who product sourcing is for" },
      { p: "Importers, brands, Amazon and e-commerce sellers, wholesalers and procurement teams who know what they want to buy, but not which factory should make it. It is most useful when you have no supplier in China yet, when your current supplier has become too expensive or unreliable, or when you have a pile of marketplace quotes and cannot tell which of them come from real manufacturers." },
      { p: "If you already have a factory you trust and only need someone to check it or its goods, our [factory audit](/services/factory-vetting) or [pre-shipment inspection](/services/quality-inspection) services are a better fit." },

      { h2: "How we search for suppliers" },
      { ol: [
        "**Brief.** We confirm your specification: material, dimensions, finish, colours, packaging, the certifications your market requires, target price, quantity and deadline. A clear written brief is the biggest single factor in getting quotes you can compare.",
        "**Search.** We look beyond the first page of Alibaba: the industrial clusters that specialise in your product, Chinese-language platforms such as 1688, trade-fair exhibitor lists, and factories we already know.",
        "**Screen.** We check each candidate's business registration and scope, ask whether they make the product in-house, and drop trading companies posing as factories, unless a trader is genuinely the better option for your quantity.",
        "**Quote.** We request quotes in Chinese against the same specification, so the prices are comparable: unit price, MOQ, tooling or mould costs, sample cost, lead time and payment terms.",
        "**Shortlist.** We send you a comparison of the best options with our notes on each and a recommendation. You choose which suppliers to take to the [sample stage](/services/samples-consolidation).",
      ] },

      { h2: "Factory or trading company?" },
      { p: "Many suppliers on international marketplaces are trading companies. That is not automatically bad: a good trader can combine several products or handle quantities that factories turn down. But you should know which one you are dealing with, because it affects the price, who controls quality and who is responsible when something goes wrong." },
      { p: "Signs we look for: whether the business-licence scope includes manufacturing, whether the address is in an industrial zone or an office tower, whether the supplier can show the production line on a video call, and whether the product range is narrow and deep (typical of a factory) or wide and shallow (typical of a trader)." },

      { h2: "What your supplier shortlist contains" },
      { table: { head: ["Item", "Why it matters"], rows: [
        ["Company name in Chinese and English", "Lets you check the supplier on the national business registry yourself"],
        ["Factory or trading company", "Tells you who actually makes the goods"],
        ["Unit price at your quantity", "Quoted against one shared specification, so prices are comparable"],
        ["MOQ", "The smallest order each supplier will accept"],
        ["Tooling, mould or set-up costs", "One-off costs that are often missing from the headline price"],
        ["Sample cost and timing", "What it costs, and how long it takes, to see the product first"],
        ["Production lead time", "Time from deposit to goods ready"],
        ["Payment terms", "The deposit and balance each supplier asks for"],
        ["Our notes", "Communication, risks, and anything that made us cautious"],
      ] } },

      { h2: "Common sourcing mistakes we help you avoid" },
      { ul: [
        "Quotes that look cheap because the supplier assumed a cheaper material, a thinner gauge or a smaller size.",
        "Tooling, packaging or labelling costs that only appear after you have paid a deposit.",
        "A supplier who wins the order and then subcontracts it to a factory you have never seen.",
        "MOQs or prices that change once the supplier knows you are serious.",
        "Specifications agreed by chat message that nobody wrote into the purchase order.",
      ] },
      { p: "Comparing quotes against one written specification, and asking these questions in Chinese before any deposit is paid, avoids most of them. Our [guide to sourcing agent costs and red flags](/guides/china-sourcing-agent-cost) covers the warning signs in more detail." },

      { h2: "Timing and how sourcing is charged" },
      { p: "A first shortlist usually takes one to two weeks for standard products, and longer for custom or technical items that need drawings reviewed. We give you an expected timeline when we confirm your brief." },
      { p: "Sourcing is normally charged as part of our commission on the order value. The rate depends on the product and order size and is confirmed in writing in your quote before any work starts." },

      { h2: "Example" },
      { note: "A café group needs 3,000 double-wall ceramic mugs (350 ml) with a printed logo. We brief eight possible suppliers, find that three are traders, and request quotes from five factories against one specification covering glaze, capacity, print method and an export carton that passes a drop test. The buyer receives a shortlist of three, with unit prices, a print-plate cost, sample timing and our recommendation, and orders samples from two.", label: "Illustrative example" },
    ],
    faqs: [
      { q: "Do you only work with factories?", a: "Mostly. Where a trading company is the better choice, for example a small mixed order that no single factory will accept, we tell you so and explain the trade-off." },
      { q: "Will I know the names of the suppliers?", a: "Yes. The shortlist includes each company's name so you can check its registration yourself, and you choose which suppliers to go ahead with." },
      { q: "Can I visit the factories?", a: "Yes. We can arrange visits and come with you to translate. If you cannot travel, we can carry out a [factory audit](/services/factory-vetting) on your behalf." },
      { q: "What if you cannot find a suitable supplier?", a: "We tell you honestly, along with what would need to change (quantity, price or specification) for the product to be viable." },
    ],
  },

  "factory-vetting": {
    h1: "Factory Audit & Supplier Verification in China",
    seoTitle: "Factory Audit & Supplier Verification in China | Sino Vorex",
    description: "Factory audits in China before you pay a deposit: business licence checks, on-site visits, capacity and quality controls, with a photo report.",
    serviceType: "Factory audit",
    processStep: "02",
    updated: "2026-10-20",
    body: [
      { h2: "Why audit a factory before you order" },
      { p: "A website, a good sample and a friendly salesperson tell you little about whether a supplier can make 5,000 units to the same standard. A factory audit checks that the company exists as described, that it really makes your product, and that it has the capacity and controls to deliver. It does this **before you pay a deposit**, which is when you have the most leverage." },

      { h2: "Types of supplier check" },
      { table: { head: ["Check", "What it covers", "When to use it"], rows: [
        ["Desk verification", "Business registration, legal representative, registered capital, business scope and address, plus public records of disputes or abnormal operation", "Every new supplier, before you order samples"],
        ["On-site factory audit", "A visit to the production site: lines, machinery, workforce, warehouse, quality-control points and showroom", "Before a first order or a large order"],
        ["Capability check", "Whether the factory has made similar products, can meet your specifications and tolerances, and which processes it outsources", "Custom or technical products"],
      ] } },

      { h2: "What we check on site" },
      { ul: [
        "**Company and legal:** the business licence matches the name on quotes, contracts and the bank account you will pay; the business scope covers your product; the address on the licence is the site we visit.",
        "**Production:** machinery for your product is on site and running; approximate workforce and shifts; which steps are done in-house and which are outsourced (for example plating, printing or packaging).",
        "**Capacity:** monthly output, current workload, and whether your order and deadline fit.",
        "**Quality control:** incoming material checks, in-line checks, final inspection, test equipment, and how defects are recorded.",
        "**Track record:** similar products made for other buyers, export markets served, and whether claimed certificates can be verified with the body that issued them.",
      ] },
      { p: "The full list we work through is in our [factory audit checklist](/guides/factory-audit-checklist)." },

      { h2: "What the factory audit report contains" },
      { ul: [
        "A summary with a clear **go / no-go / conditional** view and the reasons for it.",
        "Verified company details from the business registry.",
        "Photos of the entrance, production lines, machinery, warehouse and QC area.",
        "An assessment of capacity and realistic lead time for your order.",
        "Risks we found, and what to ask the supplier to fix or put in the contract.",
        "Our recommendation on next steps.",
      ] },

      { h2: "Red flags that usually mean no" },
      { ul: [
        "The supplier refuses a visit, or moves it to an office or showroom away from production.",
        "The name on the business licence differs from the name on the bank account for payment.",
        "The machinery for your product is not on site (\"our partner factory makes that part\").",
        "Pressure to pay the deposit into a personal account.",
        "Certificates that the issuing body cannot confirm.",
      ] },

      { h2: "Timing and how audits are charged" },
      { p: "Desk verification takes a few working days. An on-site audit is normally one day at the factory and can usually be scheduled within about a week, depending on the factory's location. On-site work is quoted per visit, including travel to the factory's city, and confirmed in writing before we go." },

      { h2: "Example" },
      { note: "A buyer has a sample they like from a marketplace supplier. Desk verification shows a trading company registered in an office building. On the visit, the \"factory\" turns out to be a showroom, and production is split between two subcontractors in another city. The buyer uses the report to contract directly with the actual manufacturer, after a second audit there.", label: "Illustrative example" },
    ],
    faqs: [
      { q: "Is a factory audit the same as a quality inspection?", a: "No. A factory audit checks the supplier before you order. A [quality inspection](/services/quality-inspection) checks the goods themselves, during or after production." },
      { q: "Do you carry out social-compliance audits such as amfori BSCI or SMETA?", a: "Those audits must be done by accredited audit firms. Our factory audit is a practical buyer's check, not a certification. If your customer requires a formal audit, we can help you arrange one with an accredited firm." },
      { q: "Can you audit a supplier I found myself?", a: "Yes. Send us the company name and address, and we start with desk verification." },
      { q: "Will the factory know you are coming?", a: "Usually yes, because we need access to the production floor. We agree the date with you, and with the factory at short notice where that is possible." },
    ],
  },

  "quality-inspection": {
    h1: "Pre-shipment Inspection & Quality Control in China",
    seoTitle: "Pre-shipment Inspection & QC in China (AQL) | Sino Vorex",
    description: "Quality inspection in China before you pay the balance: pre-production, during-production and pre-shipment checks with AQL sampling and photo reports.",
    serviceType: "Quality inspection",
    processStep: "05",
    updated: "2026-10-20",
    body: [
      { h2: "Types of quality inspection" },
      { table: { head: ["Inspection", "When", "What it catches"], rows: [
        ["Pre-production inspection (PPI)", "Before production starts", "Wrong raw materials, components or colours, and unclear specifications"],
        ["During-production inspection (DUPRO)", "Typically when 20–60% of the order is made", "Recurring defects early, while they can still be corrected on the line"],
        ["Pre-shipment inspection (PSI)", "When at least 80% of the goods are finished and packed", "Quantity, workmanship, function, measurements, packaging and labels, before you pay the balance"],
        ["Container loading check", "While the container is loaded", "The right cartons and quantity loaded, carton condition, container condition"],
      ] } },
      { p: "For most first orders, a pre-shipment inspection is the minimum. Add a during-production inspection for large orders, new suppliers or products where a defect would be expensive to fix after packing." },

      { h2: "How AQL sampling is used" },
      { p: "Checking every unit is rarely practical, so we inspect a random sample chosen under **ISO 2859-1** (equivalent to ANSI/ASQ Z1.4), usually at General Inspection Level II. Defects are classed as critical, major or minor, and each class has its own Acceptance Quality Limit (AQL). A common setting for consumer goods is critical 0, major 2.5 and minor 4.0, but you can set your own." },
      { p: "Example: for a lot of 3,000 units, the standard sample is 125 units. At AQL 2.5 the lot passes with up to 7 major defects and fails at 8. Our [AQL guide](/guides/pre-shipment-inspection-aql) has the full sample-size table." },

      { h2: "What we check on a pre-shipment inspection" },
      { ul: [
        "**Quantity:** finished and packed quantity against your order.",
        "**Workmanship and appearance:** scratches, stains, loose threads, glue marks, and colour differences against your approved sample.",
        "**Measurements and weight** against your specification.",
        "**Function and safety checks** suited to the product, such as assembly, operation, seam strength or a simple drop test.",
        "**Packaging and labelling:** carton marks, barcodes, labels, inserts, manuals, and Amazon FBA labels where you need them.",
        "**Cartons:** dimensions, gross weight, and a carton drop test.",
      ] },

      { h2: "What the inspection report contains" },
      { ul: [
        "A pass, fail or pending result against your AQL, with the defect counts by class.",
        "Photos of every defect found, and of the product, packaging and shipping marks.",
        "Video of function tests where relevant.",
        "Measurements recorded against your specification.",
        "Notes on what the factory has agreed to fix, and how that will be re-checked.",
      ] },
      { p: "You receive the report **before you pay the balance**, so you can approve shipment, ask for rework, or request a re-inspection." },

      { h2: "When goods fail inspection" },
      { p: "A failed inspection is not the end of the order. It is the point where the factory can still fix the problem. Typically the factory sorts the goods and reworks or replaces the defective units, and we re-inspect. It is worth writing into your purchase contract that the factory pays for a re-inspection if goods fail, and that the balance is due only after a passed inspection." },

      { h2: "Timing and how inspections are charged" },
      { p: "Book a pre-shipment inspection about a week before the goods are due to be ready. A single inspection is normally one inspector-day on site for one product; large orders or several styles can need more. Inspections are quoted per inspection, including travel to the factory, and confirmed in writing before the visit." },

      { h2: "Example" },
      { note: "3,000 printed tote bags. The lot of 3,000 means a sample of 125 bags. The inspector finds 9 major defects (misaligned logo prints), above the limit of 7 for AQL 2.5, so the lot fails. The factory reprints the affected bags, a re-inspection passes, and the buyer pays the balance with the report in hand.", label: "Illustrative example" },
    ],
    faqs: [
      { q: "Can I choose my own AQL levels?", a: "Yes. Tell us the levels you want, or we suggest levels based on the product and your market." },
      { q: "Can you test products to safety standards such as CE, UKCA or CPSIA?", a: "Certification testing must be done by an accredited laboratory. We can collect samples for the lab and check that the goods shipped match the samples that were tested." },
      { q: "Do you inspect goods from suppliers you did not find?", a: "Yes. Inspections work with any supplier in China. Send us the factory address, your specification and the approved sample." },
      { q: "Can you check goods at the warehouse instead of the factory?", a: "Yes, if the goods are already at a warehouse or consolidation point. The checks are the same, but any rework is harder to arrange once goods have left the factory." },
    ],
  },

  "order-follow-up": {
    h1: "Production Follow-up & Order Management in China",
    seoTitle: "Production Follow-up & Order Management in China | Sino Vorex",
    description: "Bilingual production follow-up in China: we confirm specs, artwork and packaging with your factory, track the schedule and report progress with photos.",
    serviceType: "Production follow-up",
    processStep: "04",
    updated: "2026-10-20",
    body: [
      { h2: "Why orders go off track" },
      { p: "Most production problems are not dramatic. A specification is changed by chat message and never written down. A colour is \"close enough\". A larger customer takes priority on the line. Materials arrive late, or a public holiday stops the factory for two weeks. Each of these is easy to fix early and expensive to discover when the goods are packed." },
      { p: "Production follow-up means someone who speaks Chinese, and is close to the factory, keeps the order on track between your deposit and shipment." },

      { h2: "What we do before, during and after production" },
      { h3: "Before production starts" },
      { ul: [
        "Confirm the purchase order and specification sheet with the factory in Chinese.",
        "Approve the pre-production sample (the \"golden sample\") that production must match.",
        "Confirm artwork, packaging, labels and carton marks.",
        "Agree a schedule with dates for materials, production start and finish.",
      ] },
      { h3: "During production" },
      { ul: [
        "Stay in regular contact with the factory and check progress against the schedule.",
        "Visit at key stages where needed, or arrange a [during-production inspection](/services/quality-inspection).",
        "Raise delays early, with options: split shipments, air freight for part of the order, or a revised date.",
      ] },
      { h3: "Before shipment" },
      { ul: [
        "Confirm the finish date and book the pre-shipment inspection.",
        "Coordinate the pick-up date with the [freight forwarder](/services/shipping-coordination).",
        "Check that the export paperwork matches the goods and quantities.",
      ] },

      { h2: "A typical production timeline" },
      { table: { caption: "Illustrative, for a standard product with a 30–45 day lead time", head: ["Milestone", "Typical timing", "What we confirm"], rows: [
        ["Deposit paid", "Day 0", "Production slot booked, materials ordered"],
        ["Materials arrive", "Weeks 1–2", "Materials and colours match the approved sample"],
        ["Production starts", "Weeks 2–3", "First units off the line match the golden sample"],
        ["Mid-production", "Weeks 3–5", "Progress against the schedule; during-production check if booked"],
        ["Goods finished and packed", "Weeks 4–7", "Quantity and packaging; pre-shipment inspection"],
        ["Balance and shipment", "After inspection", "Report approved, freight booked"],
      ] } },

      { h2: "Chinese holidays that affect lead times" },
      { table: { head: ["Holiday", "When", "Effect on production"], rows: [
        ["Chinese New Year (Spring Festival)", "Late January to February", "Most factories close for two to four weeks; output slows before and after while workers travel"],
        ["Qingming Festival", "Early April", "One to three days off"],
        ["Labour Day", "1–5 May", "Several days off; logistics busy"],
        ["Dragon Boat Festival", "May or June", "About three days off"],
        ["Mid-Autumn Festival and National Day (Golden Week)", "Late September to 7 October", "About a week off; ports and couriers congested"],
      ] } },
      { p: "If your order needs to ship in the weeks around Chinese New Year, plan to place it at least two to three months ahead." },

      { h2: "What you receive" },
      { ul: [
        "Updates in English at each milestone, with photos from the factory.",
        "A written log of issues raised with the factory and how each was resolved.",
        "Early warning of any delay, with options rather than just a new date.",
      ] },

      { h2: "How follow-up is charged" },
      { p: "When we sourced the supplier, follow-up is part of our commission on the order. For an order with a supplier you found yourself, follow-up is quoted per order. Either way, the fee is confirmed in writing before work starts." },
    ],
    faqs: [
      { q: "Can you follow up an order with my existing supplier?", a: "Yes. We introduce ourselves to the factory as your representative, with your agreement, and work from your purchase order and specification." },
      { q: "How often will I get updates?", a: "At each milestone and whenever something changes. We agree the frequency with you at the start; weekly is common." },
      { q: "What happens if the factory misses the deadline?", a: "We tell you as soon as a delay looks likely, explain why, and set out the options. Late-delivery terms in your purchase contract give you leverage, so we recommend including them." },
    ],
  },

  "shipping-coordination": {
    h1: "Shipping from China: Sea, Air & Rail Freight",
    seoTitle: "Shipping from China: Sea, Air & Rail Freight | Sino Vorex",
    description: "Freight from China by sea (FCL/LCL), air and rail with partner forwarders: FOB, CIF and DDP options, export documents and tracking to your door.",
    serviceType: "Freight coordination",
    processStep: "06",
    updated: "2026-10-20",
    body: [
      { h2: "How we arrange freight" },
      { p: "We are not a freight forwarder. We work with partner forwarders who move the goods, and we coordinate between them, the factory and you: we compare quotes, book pick-up from the factory, check the export paperwork, and share tracking until the goods arrive. That means one point of contact from the factory floor to your port or door. See [freight forwarder vs sourcing agent](/guides/freight-forwarder-vs-sourcing-agent) for who does what." },

      { h2: "Sea, air or rail: which to choose" },
      { table: { head: ["Mode", "Typical transit", "Best for", "Priced by"], rows: [
        ["Sea freight (FCL / LCL)", "About 15–45 days port to port", "Large or heavy orders; lowest cost per unit", "Container (FCL) or volume in CBM (LCL)"],
        ["Air freight", "About 3–10 days", "Samples, urgent restocks, light or high-value goods", "Chargeable weight (the greater of actual and volumetric weight)"],
        ["Rail freight", "About 15–25 days to Europe", "China–Europe and Central Asia: faster than sea, cheaper than air", "Container or volume"],
      ] } },

      { h2: "Typical sea transit times from China" },
      { table: { caption: "Typical port-to-port sailing ranges from Shanghai or Ningbo. Door-to-door adds customs clearance and trucking; schedules change, so we confirm current times in your quote.", head: ["Destination", "Typical transit"], rows: [
        ["Japan and South Korea", "2–5 days"],
        ["Southeast Asia (e.g. Singapore)", "5–10 days"],
        ["Australia (e.g. Sydney)", "14–22 days"],
        ["US West Coast (Los Angeles / Long Beach)", "14–20 days"],
        ["Middle East (e.g. Jebel Ali, Dubai)", "15–25 days"],
        ["Northern Europe (Rotterdam, Hamburg, Felixstowe)", "30–45 days; longer when vessels route via the Cape of Good Hope"],
        ["US East Coast (New York)", "30–40 days"],
        ["South America (e.g. Santos)", "35–45 days"],
      ] } },

      { h2: "FCL or LCL?" },
      { p: "With **LCL** (less than container load) your cartons share a container with other shippers' goods and you pay for the volume you use. With **FCL** (full container load) you pay for the whole container. As a rule of thumb, LCL usually makes sense below about 13–15 cubic metres; above that, a 20-foot container is often cheaper and your goods are handled less." },
      { table: { head: ["Container", "Nominal volume", "Practical loading volume"], rows: [
        ["20-foot", "About 33 CBM", "About 25–28 CBM"],
        ["40-foot", "About 67 CBM", "About 55–58 CBM"],
        ["40-foot high cube", "About 76 CBM", "About 65–68 CBM"],
      ] } },

      { h2: "Incoterms: who pays for what" },
      { table: { head: ["Incoterm", "Seller (factory) arranges", "You arrange"], rows: [
        ["EXW (Ex Works)", "Goods ready at the factory", "Everything from the factory door, including export clearance"],
        ["FOB (Free On Board)", "Delivery onto the ship at the Chinese port, export clearance", "Sea freight, insurance, import clearance, duties and delivery"],
        ["CIF (Cost, Insurance & Freight)", "Freight and insurance to your destination port", "Import clearance, duties and delivery from the port"],
        ["DDP (Delivered Duty Paid)", "Delivery to your address with import duties paid", "Unloading at your address"],
      ] } },
      { p: "We quote on FOB, CIF or DDP. DDP is arranged with partner forwarders where it is available for your country and product." },

      { h2: "Export documents" },
      { ul: [
        "**Commercial invoice** and **packing list** that match the goods and quantities exactly.",
        "**Bill of lading** (sea) or **air waybill** (air), issued by the carrier or forwarder.",
        "**Export customs declaration**, filed in China by the factory or its export agent.",
        "**Certificate of origin** where your country gives preferential duty rates for Chinese goods, or where your buyer asks for one.",
      ] },
      { p: "On the import side, you (or your customs broker) are responsible for duties, taxes and product compliance in your country, unless you ship on DDP terms." },

      { h2: "Shipping to Amazon FBA warehouses" },
      { p: "Partner forwarders can deliver to Amazon fulfilment centres in many markets. If your goods are going to FBA, tell us at the quote stage, so the factory applies FBA product and carton labels and packs to Amazon's carton requirements before the [pre-shipment inspection](/services/quality-inspection)." },

      { h2: "What you receive" },
      { p: "A freight quote with the options compared, booking confirmation, copies of the shipping documents, and tracking details until arrival." },
    ],
    faqs: [
      { q: "Are you a freight forwarder?", a: "No. We arrange and coordinate freight with partner forwarders, who carry the goods and issue the transport documents." },
      { q: "Can you ship goods from suppliers you did not source?", a: "Yes. We can arrange pick-up from any factory in China, on its own or [consolidated](/services/samples-consolidation) with goods from other suppliers." },
      { q: "Who handles import customs?", a: "Under DDP, the forwarder's agent in your country clears customs and pays the duties, which are included in the price. Under FOB or CIF, your own customs broker handles import clearance." },
      { q: "Is cargo insurance included?", a: "Under CIF it is included to the destination port. For other terms we can add cargo insurance through the forwarder; we recommend it for most shipments." },
    ],
  },

  "samples-consolidation": {
    h1: "Sample Collection & Shipment Consolidation in China",
    seoTitle: "Sample Collection & Consolidation in China | Sino Vorex",
    description: "We collect samples from several Chinese factories, check them and send them together, and combine orders from multiple suppliers into one shipment.",
    serviceType: "Sample collection and shipment consolidation",
    processStep: "03",
    updated: "2026-10-20",
    body: [
      { h2: "Why collect samples through one address" },
      { p: "When you compare three or four suppliers, each one sends its own sample by its own courier, with its own costs and customs paperwork. Collecting the samples at one address in China first means one international parcel instead of several, a chance to check each sample before it travels, and side-by-side photos that make the comparison easier." },

      { h2: "How sample collection works" },
      { ol: [
        "You choose the suppliers from your [sourcing shortlist](/services/product-sourcing), or send us suppliers you found yourself.",
        "We order the samples in Chinese against your specification and confirm the cost and timing with each supplier.",
        "Samples are delivered to us. We check each one against the specification, measure it, and photograph it next to the others.",
        "We send you the photos and our notes, and then forward all the samples together by express courier.",
        "You approve one sample. It becomes the reference (the \"golden sample\") that production and the [inspection](/services/quality-inspection) are measured against.",
      ] },

      { h2: "What we check on samples before forwarding" },
      { ul: [
        "Material, dimensions, weight and colour against your specification.",
        "Workmanship: finishing, stitching, joins, printing and edges.",
        "Function, where it can be tested by hand.",
        "Packaging and labelling, if the supplier has supplied retail packaging.",
        "Anything that differs from what the supplier quoted, so it can be fixed before the order.",
      ] },

      { h2: "Who pays for samples" },
      { p: "Factories usually charge for samples, and for any special tooling or print set-up a custom sample needs. Some refund the sample cost against your first order. Courier costs from China are extra. We quote all of these upfront, before any sample is ordered." },

      { h2: "Shipment consolidation: several suppliers, one shipment" },
      { p: "If your order comes from more than one factory, for example mugs from one supplier, cutlery from another and packaging from a third, each supplier delivers to a consolidation warehouse. The goods are checked in, counted, and shipped together." },
      { table: { head: ["", "Separate shipments", "One consolidated shipment"], rows: [
        ["Freight", "Several LCL or courier shipments, each with minimum charges", "One shipment; often a full container instead of several part-loads"],
        ["Customs entries", "One per shipment", "One entry, one set of documents"],
        ["Arrival", "Goods arrive on different dates", "Everything arrives together"],
        ["Checks", "Each supplier ships unchecked unless you book inspections", "Goods are counted and checked as they arrive at the warehouse"],
      ] } },
      { p: "Consolidation needs some care: each supplier's goods still need their own [quality inspection](/services/quality-inspection) before they leave the factory, and the combined packing list must be accurate for customs." },

      { h2: "Timing" },
      { p: "Standard samples usually reach us within a few days to a week. Custom samples can take one to three weeks, depending on tooling. Express courier from China to most countries then takes about three to seven days." },
    ],
    faqs: [
      { q: "Can you send me samples from suppliers I found myself?", a: "Yes. Tell us the suppliers and the samples you need; we collect, check and forward them in the same way." },
      { q: "How many suppliers can be consolidated into one shipment?", a: "There is no fixed limit. What matters is that every supplier can deliver to the warehouse by the cut-off date, and that the combined volume suits the shipping mode." },
      { q: "Do you keep a copy of the approved sample?", a: "Where possible, we ask the factory for a duplicate of the approved sample and keep it for the inspection, so the goods can be compared against it directly." },
    ],
  },
};
