import type { Block, QA } from "./types";
import { BUSINESS_CONTENT } from "./services-business";

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
  glance: string[];      // "At a glance" box: 4 short facts for readers who skim
  updated: string;       // ISO date of last content change
  body: Block[];
  faqs: QA[];
};

const SOURCING_CONTENT: Record<string, ServiceContent> = {
  "product-sourcing": {
    h1: "Product Sourcing: Find the Right Manufacturer in China",
    seoTitle: "Find Manufacturers in China: Product Sourcing | Sino Vorex",
    description: "We find manufacturers in China for your product, compare quotes, MOQs and lead times against one specification, and send you a shortlist of factories.",
    serviceType: "Product sourcing",
    glance: [
      "Good for buyers who don't have a supplier yet, or who have quotes they can't compare.",
      "You get a shortlist of factories with prices, MOQs, lead times and our honest notes.",
      "A first shortlist usually takes one to two weeks for standard products.",
      "It's covered by our commission on the order, and we confirm the rate in writing first.",
    ],
    processStep: "02",
    updated: "2026-10-23",
    body: [
      { h2: "Who product sourcing is for" },
      { p: "You know what you want to buy, but not which factory should make it. That's where we come in. Our clients are importers, brands, Amazon sellers, wholesalers and procurement teams." },
      { p: "It helps most when you don't have a supplier in China yet, when your current one has become too expensive or unreliable, or when you have a pile of marketplace quotes and can't tell which ones come from real manufacturers." },
      { p: "New to working with an agent? Our [guide to China sourcing agents](/guides/china-sourcing-agent) explains what they do, what they cost and how to choose one." },
      { p: "Already have a factory you trust? Then you probably just need us to check it, or check the goods. Have a look at our [factory audit](/services/factory-vetting) and [pre-shipment inspection](/services/quality-inspection) services instead." },

      { h2: "How we search for suppliers" },
      { ol: [
        "We start by agreeing your specification with you. That means the material, size, finish, colours, packaging, any certificates your market needs, your target price, quantity and deadline. Getting this written down properly is what makes the quotes comparable later.",
        "Then we search. We go well past the first page of Alibaba and look at the industrial areas that specialise in your product, Chinese platforms like 1688, trade fair exhibitor lists, and factories we already know.",
        "We check each candidate's business registration and ask whether they actually make the product themselves. Traders pretending to be factories get dropped, unless a trader really is the better choice for your quantity.",
        "We ask for quotes in Chinese, all against the same specification. You see the unit price, MOQ, any tooling or mould costs, sample cost, lead time and payment terms side by side.",
        "Finally we send you the best options with our notes on each one and a recommendation. You decide which suppliers go on to the [sample stage](/services/samples-consolidation).",
      ] },

      { h2: "Factory or trading company?" },
      { p: "A lot of suppliers on international marketplaces are trading companies. That isn't always a bad thing. A good trader can combine several products for you, or take an order that's too small for a factory. But you should know who you're dealing with, because it changes the price, who controls quality, and who's responsible when something goes wrong." },
      { p: "We look at a few things. Does the business licence cover manufacturing? Is the address in an industrial zone or an office tower? Can they show us the production line on a video call? And is their product range narrow and deep, which is typical of a factory, or wide and shallow, which usually means a trader?" },

      { h2: "What your supplier shortlist contains" },
      { table: { head: ["Item", "Why it matters"], rows: [
        ["Company name in Chinese and English", "So you can look the supplier up on the national business registry yourself"],
        ["Factory or trading company", "Tells you who actually makes the goods"],
        ["Unit price at your quantity", "Every supplier quoted on the same specification, so the prices really compare"],
        ["MOQ", "The smallest order each supplier will take"],
        ["Tooling, mould or set-up costs", "One-off costs that often get left out of the headline price"],
        ["Sample cost and timing", "What it costs, and how long it takes, to see the product first"],
        ["Production lead time", "How long from paying the deposit to the goods being ready"],
        ["Payment terms", "The deposit and balance each supplier asks for"],
        ["Our notes", "How they communicate, any risks, and anything that made us cautious"],
      ] } },

      { h2: "Common sourcing mistakes we help you avoid" },
      { ul: [
        "A quote that looks cheap because the supplier assumed a cheaper material, a thinner gauge or a smaller size.",
        "Tooling, packaging or labelling costs that only show up after you've paid the deposit.",
        "A supplier who wins your order and then quietly passes it to a factory you've never seen.",
        "MOQs or prices that change once the supplier knows you're serious.",
        "Details agreed in a chat message that never made it into the purchase order.",
      ] },
      { p: "Most of these go away when every quote is based on one written specification and the awkward questions get asked in Chinese before any money changes hands. Our [guide to sourcing agent costs and red flags](/guides/china-sourcing-agent-cost) goes into the warning signs in more detail." },

      { h2: "Timing and how sourcing is charged" },
      { p: "For standard products, a first shortlist usually takes one to two weeks. Custom or technical items take longer, especially if drawings need reviewing. We'll give you an expected timeline once we've agreed your brief." },
      { p: "Sourcing is normally covered by our commission on the order value. The rate depends on the product and the order size, and we confirm it in writing in your quote before we start any work." },

      { h2: "Example" },
      { note: "A café group wanted 3,000 double-walled ceramic mugs, 350 ml, with a printed logo. We briefed eight possible suppliers and found that three of them were traders. The other five factories quoted against the same specification, covering the glaze, capacity, print method and an export carton that passes a drop test. The buyer got a shortlist of three with unit prices, the print plate cost, sample timing and our recommendation, and ordered samples from two of them.", label: "Illustrative example" },
    ],
    faqs: [
      { q: "Do you only work with factories?", a: "Mostly, yes. Sometimes a trading company is the better choice, for example a small mixed order that no single factory will accept. When that happens we'll tell you and explain the trade-off." },
      { q: "Will I know the names of the suppliers?", a: "Yes. Every supplier on the shortlist is named, so you can check their registration yourself. You choose who to go ahead with." },
      { q: "Can I visit the factories?", a: "Of course. We can set up the visits and come along to translate. If you can't travel, we can do a [factory audit](/services/factory-vetting) for you." },
      { q: "What if you can't find a suitable supplier?", a: "We'll tell you straight, and explain what would need to change, whether that's the quantity, the price or the specification, to make the product work." },
    ],
  },

  "factory-vetting": {
    h1: "Factory Audit & Supplier Verification in China",
    seoTitle: "Factory Audit & Supplier Verification in China | Sino Vorex",
    description: "Factory audits in China before you pay a deposit: business licence checks, on-site visits, capacity and quality controls, with a photo report.",
    serviceType: "Factory audit",
    glance: [
      "Good for checking out a new supplier before you pay a deposit.",
      "We look at their registration, production lines, capacity, quality control and track record.",
      "You get a photo report that clearly says go, no-go, or go with conditions.",
      "Desk checks take a few days. A site visit is usually one day.",
    ],
    processStep: "02",
    updated: "2026-10-20",
    body: [
      { h2: "Why audit a factory before you order" },
      { p: "A nice website, a good sample and a friendly sales rep don't tell you much about whether a supplier can make 5,000 units to the same standard. An audit checks that the company really exists as described, that it actually makes your product, and that it has the capacity and controls to deliver." },
      { p: "The timing matters. We do it before you pay a deposit, because that's when you have the most leverage." },

      { h2: "Types of supplier check" },
      { table: { head: ["Check", "What it covers", "When to use it"], rows: [
        ["Desk verification", "Business registration, legal representative, registered capital, business scope and address, plus any public records of disputes or abnormal operation", "For every new supplier, before you order samples"],
        ["On-site factory audit", "A visit to the production site to see the lines, machinery, workforce, warehouse, quality control points and showroom", "Before a first order or a large order"],
        ["Capability check", "Whether the factory has made similar products, can meet your specification and tolerances, and which steps it sends out to other companies", "For custom or technical products"],
      ] } },

      { h2: "What we check on site" },
      { ul: [
        "The paperwork. The name on the business licence should match the quotes, the contract and the bank account you'll pay into. The licence should cover your product, and the address on it should be the site we're standing in.",
        "Production. We check the machinery for your product is on site and running, roughly how many people work there and in what shifts, and which steps are done in-house versus sent out, such as plating, printing or packaging.",
        "Capacity. How much they can make in a month, how busy they already are, and whether your order and deadline realistically fit.",
        "Quality control. How they check incoming materials, what they check on the line, whether there's a final inspection, what test equipment they have and how they record defects.",
        "Track record. Similar products they've made for other buyers, which markets they export to, and whether their certificates can be confirmed with the body that issued them.",
      ] },
      { p: "The full list we work through is in our [factory audit checklist](/guides/factory-audit-checklist)." },

      { h2: "What the factory audit report contains" },
      { ul: [
        "A summary that says go, no-go or go with conditions, and why.",
        "The company details we verified on the business registry.",
        "Photos of the entrance, production lines, machinery, warehouse and QC area.",
        "Our view on capacity and a realistic lead time for your order.",
        "Any risks we found, and what to ask the supplier to fix or put in the contract.",
        "What we'd recommend doing next.",
      ] },

      { h2: "Red flags that usually mean no" },
      { ul: [
        "The supplier won't let us visit, or wants to meet at an office or showroom away from production.",
        "The name on the business licence is different from the name on the bank account.",
        "There's no machinery for your product on site. You'll often hear \"our partner factory makes that part\".",
        "You're pushed to pay the deposit into a personal account.",
        "The issuing body can't confirm their certificates.",
      ] },

      { h2: "Timing and how audits are charged" },
      { p: "Desk verification takes a few working days. An on-site audit normally means one day at the factory, and we can usually get there within about a week, depending on where it is. We quote on-site work per visit, including travel to the factory's city, and confirm the price in writing before we go." },

      { h2: "Example" },
      { note: "A buyer had a sample they liked from a marketplace supplier. Our desk check showed a trading company registered in an office building. When we visited, the \"factory\" turned out to be a showroom, and production was split between two subcontractors in another city. The buyer used our report to go straight to the real manufacturer, after we audited them too.", label: "Illustrative example" },
    ],
    faqs: [
      { q: "Is a factory audit the same as a quality inspection?", a: "No. An audit checks the supplier before you order. A [quality inspection](/services/quality-inspection) checks the goods themselves, during or after production." },
      { q: "Do you carry out social compliance audits such as amfori BSCI or SMETA?", a: "Those have to be done by accredited audit firms. Ours is a practical check for buyers, not a certification. If your customer needs a formal audit, we can help you arrange one with an accredited firm." },
      { q: "Can you audit a supplier I found myself?", a: "Yes. Send us the company name and address and we'll start with a desk check." },
      { q: "Will the factory know you're coming?", a: "Usually, yes, because we need to get onto the production floor. We agree the date with you, and give the factory short notice where we can." },
    ],
  },

  "quality-inspection": {
    h1: "Pre-shipment Inspection & Quality Control in China",
    seoTitle: "Pre-shipment Inspection & QC in China (AQL) | Sino Vorex",
    description: "Quality inspection in China before you pay the balance: pre-production, during-production and pre-shipment checks with AQL sampling and photo reports.",
    serviceType: "Quality inspection",
    glance: [
      "Good for checking your goods before you pay the factory the balance.",
      "We check a random sample to AQL (ISO 2859-1), against your approved sample.",
      "You get a pass or fail report with photos, video and the defect counts.",
      "Book it about a week before the goods are ready. It's usually one day on site.",
    ],
    processStep: "05",
    updated: "2026-10-20",
    body: [
      { h2: "Types of quality inspection" },
      { table: { head: ["Inspection", "When", "What it catches"], rows: [
        ["Pre-production inspection (PPI)", "Before production starts", "Wrong raw materials, parts or colours, and specifications the factory hasn't understood"],
        ["During-production inspection (DUPRO)", "Usually once 20 to 60% of the order is made", "Repeating defects, caught early while the line can still be corrected"],
        ["Pre-shipment inspection (PSI)", "Once at least 80% of the goods are finished and packed", "Quantity, workmanship, function, measurements, packaging and labels, before you pay the balance"],
        ["Container loading check", "While the container is being loaded", "The right cartons and quantities going in, and the condition of the cartons and the container"],
      ] } },
      { p: "For most first orders, a pre-shipment inspection is the minimum we'd suggest. It's worth adding a during-production check for big orders, new suppliers, or products where a defect would be expensive to fix once everything's packed." },

      { h2: "How AQL sampling is used" },
      { p: "Checking every single unit is rarely practical, so we check a random sample picked using ISO 2859-1, which is the same as ANSI/ASQ Z1.4. We normally use General Inspection Level II. Defects are sorted into critical, major and minor, and each type has its own Acceptance Quality Limit, or AQL." },
      { p: "Most consumer goods use critical 0, major 2.5 and minor 4.0, but you can choose your own. As an example, a lot of 3,000 units means we check 125 of them. At AQL 2.5 the lot passes with up to 7 major defects and fails at 8. Our [AQL guide](/guides/pre-shipment-inspection-aql) has the full table." },

      { h2: "What we check on a pre-shipment inspection" },
      { ul: [
        "The quantity that's finished and packed, compared with your order.",
        "Workmanship and appearance. Scratches, stains, loose threads, glue marks and colour differences, all compared with your approved sample.",
        "Measurements and weight, against your specification.",
        "Function and safety checks that suit the product, such as assembly, operation, seam strength or a simple drop test.",
        "Packaging and labels, including carton marks, barcodes, inserts, manuals, and Amazon FBA labels if you need them.",
        "The cartons themselves. Their size and weight, plus a drop test.",
      ] },

      { h2: "What the inspection report contains" },
      { ul: [
        "A clear pass, fail or pending result against your AQL, with the number of defects of each type.",
        "Photos of every defect we found, plus the product, packaging and shipping marks.",
        "Video of the function tests where that's relevant.",
        "The measurements we took, next to your specification.",
        "Notes on what the factory has agreed to fix and how we'll check it again.",
      ] },
      { p: "You get the report before you pay the balance. So you can approve the shipment, ask for rework, or ask us to inspect again." },

      { h2: "When goods fail inspection" },
      { p: "A failed inspection doesn't mean the order is lost. It's the moment the factory can still fix the problem. Usually they sort through the goods, rework or replace the faulty units, and we come back to re-inspect." },
      { p: "It's worth writing two things into your purchase contract. First, that the factory pays for any re-inspection if the goods fail. Second, that the balance is only due after an inspection has passed." },

      { h2: "Timing and how inspections are charged" },
      { p: "Book your pre-shipment inspection about a week before the goods are due to be ready. One inspection is normally one inspector-day on site for one product. Large orders, or orders with several styles, can need more. We quote each inspection including travel to the factory and confirm the price in writing before the visit." },

      { h2: "Example" },
      { note: "An order of 3,000 printed tote bags means a sample of 125 bags. Our inspector found 9 bags with the logo printed out of line. That's over the limit of 7 for AQL 2.5, so the lot failed. The factory reprinted the affected bags, the re-inspection passed, and the buyer paid the balance with the report in hand.", label: "Illustrative example" },
    ],
    faqs: [
      { q: "Can I choose my own AQL levels?", a: "Yes. Tell us what you'd like to use, or we'll suggest levels based on the product and your market." },
      { q: "Can you test products to safety standards such as CE, UKCA or CPSIA?", a: "That testing has to be done by an accredited laboratory. We can collect the samples for the lab and then check that what ships matches what was tested." },
      { q: "Do you inspect goods from suppliers you didn't find?", a: "Yes, any supplier in China. Just send us the factory address, your specification and your approved sample." },
      { q: "Can you check goods at a warehouse instead of the factory?", a: "Yes, if the goods are already at a warehouse or consolidation point. The checks are the same, but rework is harder to arrange once the goods have left the factory." },
    ],
  },

  "order-follow-up": {
    h1: "Production Follow-up & Order Management in China",
    seoTitle: "Production Follow-up & Order Management in China | Sino Vorex",
    description: "Bilingual production follow-up in China: we confirm specs, artwork and packaging with your factory, track the schedule and report progress with photos.",
    serviceType: "Production follow-up",
    glance: [
      "Good for keeping an order on schedule between your deposit and shipment.",
      "We confirm the details with the factory in Chinese, track each stage and flag delays early.",
      "You get updates in English, with photos, at every milestone.",
      "Plan around Chinese New Year. Most factories close for two to four weeks.",
    ],
    processStep: "04",
    updated: "2026-10-23",
    body: [
      { h2: "Why orders go off track" },
      { p: "Most production problems aren't dramatic. Someone changes a detail over chat and it never gets written down. A colour is \"close enough\". A bigger customer gets priority on the line. Materials turn up late, or a public holiday stops the factory for two weeks." },
      { p: "Each of these is easy to sort out early and expensive to find once the goods are packed. Following up on production simply means having someone close to the factory, who speaks Chinese, keeping your order on track between the deposit and shipment." },

      { h2: "What we do before, during and after production" },
      { h3: "Before production starts" },
      { ul: [
        "Go through the purchase order and specification sheet with the factory in Chinese.",
        "Approve the pre-production sample, often called the golden sample, that production has to match.",
        "Confirm the artwork, packaging, labels and carton marks.",
        "Agree a schedule with dates for materials, the start of production and the finish.",
      ] },
      { h3: "During production" },
      { ul: [
        "Stay in regular touch with the factory and check progress against the schedule.",
        "Visit at key stages when it's needed, or set up a [during-production inspection](/services/quality-inspection).",
        "Flag delays early and give you options, like splitting the shipment, sending part of it by air, or agreeing a new date.",
      ] },
      { h3: "Before shipment" },
      { ul: [
        "Confirm the finish date and book the pre-shipment inspection.",
        "Agree the pick-up date with the [freight forwarder](/services/shipping-coordination).",
        "Check the export paperwork matches the goods and quantities.",
      ] },

      { h2: "A typical production timeline" },
      { table: { caption: "An illustration for a standard product with a 30 to 45 day lead time.", head: ["Milestone", "Typical timing", "What we confirm"], rows: [
        ["Deposit paid", "Day 0", "The production slot is booked and materials are ordered"],
        ["Materials arrive", "Weeks 1 to 2", "Materials and colours match the approved sample"],
        ["Production starts", "Weeks 2 to 3", "The first units off the line match the golden sample"],
        ["Mid-production", "Weeks 3 to 5", "Progress against the schedule, plus a during-production check if you booked one"],
        ["Goods finished and packed", "Weeks 4 to 7", "Quantity and packaging, then the pre-shipment inspection"],
        ["Balance and shipment", "After inspection", "The report is approved and freight is booked"],
      ] } },

      { h2: "Chinese holidays that affect lead times" },
      { table: { head: ["Holiday", "When", "Effect on production"], rows: [
        ["Chinese New Year (Spring Festival)", "Late January to February", "Most factories close for two to four weeks, and things slow down before and after while workers travel home"],
        ["Qingming Festival", "Early April", "One to three days off"],
        ["Labour Day", "1 to 5 May", "Several days off, and logistics get busy"],
        ["Dragon Boat Festival", "May or June", "About three days off"],
        ["Mid-Autumn Festival and National Day (Golden Week)", "Late September to 7 October", "About a week off, with busy ports and couriers"],
      ] } },
      { p: "If your order needs to ship in the weeks around Chinese New Year, try to place it at least two to three months ahead." },

      { h2: "Updates you'll get from us" },
      { ul: [
        "Updates in English at each milestone, with photos from the factory.",
        "A written log of every issue we raised with the factory and how it was resolved.",
        "Early warning of any delay, with options rather than just a new date.",
      ] },

      { h2: "How follow-up is charged" },
      { p: "If we found the supplier for you, follow-up is part of our commission on the order. If you found the supplier yourself, we quote follow-up per order. Either way, we confirm the fee in writing before we start." },
    ],
    faqs: [
      { q: "Can you follow up an order with my existing supplier?", a: "Yes. With your agreement, we introduce ourselves to the factory as your representative and work from your purchase order and specification." },
      { q: "How often will I get updates?", a: "At each milestone, and any time something changes. We'll agree how often with you at the start. Weekly is common." },
      { q: "What happens if the factory misses the deadline?", a: "We'll tell you as soon as a delay looks likely, explain why, and set out your options. Late delivery terms in your purchase contract give you leverage, so we'd always suggest including them." },
    ],
  },

  "shipping-coordination": {
    h1: "Shipping from China: Sea, Air & Rail Freight",
    seoTitle: "Shipping & Freight from China: Sea, Air, Rail | Sino Vorex",
    description: "Freight from China by sea (FCL/LCL), air and rail with partner forwarders: FOB, CIF and DDP options, export documents and tracking to your door.",
    serviceType: "Freight coordination",
    glance: [
      "We ship by sea (full or shared container), air or rail through partner forwarders.",
      "Sea freight usually takes about 15 to 45 days, and air about 3 to 10.",
      "We can quote on FOB, CIF or DDP terms.",
      "You get compared quotes, the booking, shipping documents and tracking.",
    ],
    processStep: "06",
    updated: "2026-10-23",
    body: [
      { h2: "How we arrange freight" },
      { p: "To be clear up front, we're not a freight forwarder. The goods are moved by partner forwarders, and we sit between them, the factory and you. We compare quotes, book the pick-up from the factory, check the export paperwork and send you tracking until the goods arrive." },
      { p: "The upshot is that you have one contact from the factory floor to your port or door. Our guide to [freight forwarders and sourcing agents](/guides/freight-forwarder-vs-sourcing-agent) explains who does what." },

      { h2: "Sea, air or rail: which to choose" },
      { table: { head: ["Mode", "Typical transit", "Best for", "Priced by"], rows: [
        ["Sea freight (FCL or LCL)", "About 15 to 45 days port to port", "Large or heavy orders, at the lowest cost per unit", "The container (FCL) or the volume in cubic metres (LCL)"],
        ["Air freight", "About 3 to 10 days", "Samples, urgent restocks, and light or valuable goods", "Chargeable weight, which is the higher of actual and volumetric weight"],
        ["Rail freight", "About 15 to 25 days to Europe", "Europe and Central Asia, faster than sea and cheaper than air", "The container or the volume"],
      ] } },

      { h2: "Typical sea transit times from China" },
      { table: { caption: "Typical sailing times from Shanghai or Ningbo, port to port. Door to door adds customs clearance and trucking. Schedules change, so we confirm current times in your quote.", head: ["Destination", "Typical transit"], rows: [
        ["Japan and South Korea", "2 to 5 days"],
        ["Southeast Asia (for example Singapore)", "5 to 10 days"],
        ["Australia (for example Sydney)", "14 to 22 days"],
        ["US West Coast (Los Angeles and Long Beach)", "14 to 20 days"],
        ["Middle East (for example Jebel Ali, Dubai)", "15 to 25 days"],
        ["Northern Europe (Rotterdam, Hamburg, Felixstowe)", "30 to 45 days, or longer when ships go round the Cape of Good Hope"],
        ["US East Coast (New York)", "30 to 40 days"],
        ["South America (for example Santos)", "35 to 45 days"],
      ] } },

      { h2: "FCL or LCL?" },
      { p: "With LCL, which stands for less than container load, your cartons share a container with other people's goods and you pay for the space you use. With FCL, a full container load, you pay for the whole container." },
      { p: "As a rough rule, LCL makes sense below about 13 to 15 cubic metres. Above that, a 20-foot container often works out cheaper, and your goods get handled less on the way." },
      { table: { head: ["Container", "Nominal volume", "What you can realistically load"], rows: [
        ["20-foot", "About 33 cubic metres", "About 25 to 28 cubic metres"],
        ["40-foot", "About 67 cubic metres", "About 55 to 58 cubic metres"],
        ["40-foot high cube", "About 76 cubic metres", "About 65 to 68 cubic metres"],
      ] } },

      { h2: "Incoterms: who pays for what" },
      { table: { head: ["Incoterm", "The factory arranges", "You arrange"], rows: [
        ["EXW (Ex Works)", "Having the goods ready at the factory", "Everything from the factory door onwards, including export clearance"],
        ["FOB (Free On Board)", "Getting the goods onto the ship at the Chinese port, plus export clearance", "Sea freight, insurance, import clearance, duties and delivery"],
        ["CIF (Cost, Insurance and Freight)", "Freight and insurance to your destination port", "Import clearance, duties and delivery from the port"],
        ["DDP (Delivered Duty Paid)", "Delivery to your address with import duties paid", "Unloading at your address"],
      ] } },
      { p: "We quote on FOB, CIF or DDP. DDP is arranged through partner forwarders where it's available for your country and product." },

      { h2: "Export documents" },
      { ul: [
        "A commercial invoice and packing list that match the goods and quantities exactly.",
        "A bill of lading for sea freight, or an air waybill for air, issued by the carrier or forwarder.",
        "The export customs declaration, filed in China by the factory or its export agent.",
        "A certificate of origin, if your country gives lower duty rates on Chinese goods or your buyer asks for one.",
      ] },
      { p: "On the import side, duties, taxes and product rules in your country are your responsibility, or your customs broker's, unless you ship on DDP terms." },

      { h2: "Shipping to Amazon FBA warehouses" },
      { p: "Our partner forwarders can deliver to Amazon fulfilment centres in many markets. If your goods are going to FBA, let us know when you ask for a quote. That way the factory adds the FBA product and carton labels and packs to Amazon's carton rules, and we check all of it in the [pre-shipment inspection](/services/quality-inspection)." },

      { h2: "Shipping guides by destination" },
      { p: "Customs, duties and paperwork are different in every market. Our guides cover the details for the most common destinations." },
      { ul: [
        "[Shipping from China to the USA](/guides/shipping-from-china-to-usa), including the ISF, customs bonds and duties.",
        "[Shipping from China to the UK](/guides/shipping-from-china-to-uk), including EORI numbers and import VAT.",
        "[Shipping from China to Europe](/guides/shipping-from-china-to-europe), including rail freight, EORI and TARIC.",
        "The Gulf and Africa: [UAE](/markets/uae), [Saudi Arabia](/markets/saudi-arabia), [Pakistan](/markets/pakistan), [Nigeria](/markets/nigeria) and [Kenya](/markets/kenya), including each country's product approvals.",
      ] },

      { h2: "Documents and tracking you'll get" },
      { p: "A freight quote comparing the options, the booking confirmation, copies of the shipping documents, and tracking details until your goods arrive." },
    ],
    faqs: [
      { q: "Are you a freight forwarder?", a: "No. We arrange and coordinate freight with partner forwarders. They carry the goods and issue the transport documents." },
      { q: "Can you ship goods from suppliers you didn't source?", a: "Yes. We can arrange pick-up from any factory in China, either on its own or [combined](/services/samples-consolidation) with goods from other suppliers." },
      { q: "Who handles import customs?", a: "On DDP terms, the forwarder's agent in your country clears customs and pays the duties, which are included in the price. On FOB or CIF terms, your own customs broker handles import clearance." },
      { q: "Is cargo insurance included?", a: "On CIF terms it's included as far as the destination port. For other terms we can add cargo insurance through the forwarder, and we'd recommend it for most shipments." },
    ],
  },

  "samples-consolidation": {
    h1: "Sample Collection & Shipment Consolidation in China",
    seoTitle: "Sample Collection & Consolidation in China | Sino Vorex",
    description: "We collect samples from several Chinese factories, check them and send them together, and combine orders from multiple suppliers into one shipment.",
    serviceType: "Sample collection and shipment consolidation",
    glance: [
      "Good for comparing samples from several suppliers, or buying from more than one factory.",
      "We collect, check and photograph the samples, then send them to you in one parcel.",
      "Goods from several suppliers can be combined into a single shipment.",
      "Standard samples reach us in about a week, and courier takes three to seven days.",
    ],
    processStep: "03",
    updated: "2026-10-20",
    body: [
      { h2: "Why collect samples through one address" },
      { p: "When you're comparing three or four suppliers, each one sends its own sample with its own courier, its own costs and its own customs paperwork." },
      { p: "Having them all delivered to us in China first means you pay for one international parcel instead of several. It also means each sample gets checked before it travels, and you get photos of them side by side, which makes comparing much easier." },

      { h2: "How sample collection works" },
      { ol: [
        "You pick the suppliers from your [sourcing shortlist](/services/product-sourcing), or send us ones you found yourself.",
        "We order the samples in Chinese against your specification and confirm the cost and timing with each supplier.",
        "The samples are delivered to us. We check each one against your specification, measure it, and photograph it next to the others.",
        "We send you the photos and our notes, then forward all the samples together by express courier.",
        "You approve one of them. That becomes the reference sample, sometimes called the golden sample, that production and the [inspection](/services/quality-inspection) are judged against.",
      ] },

      { h2: "What we check on samples before forwarding" },
      { ul: [
        "Material, size, weight and colour, against your specification.",
        "Workmanship, such as the finishing, stitching, joins, printing and edges.",
        "Whether it works, where that can be tested by hand.",
        "Packaging and labels, if the supplier has sent retail packaging.",
        "Anything that's different from what the supplier quoted, so it can be fixed before you order.",
      ] },

      { h2: "Who pays for samples" },
      { p: "Factories usually charge for samples, and for any special tooling or print set-up a custom sample needs. Some will refund the sample cost when you place your first order. Courier costs from China are extra. We quote all of this up front, before any sample is ordered." },

      { h2: "Shipment consolidation: several suppliers, one shipment" },
      { p: "Say your order comes from more than one factory, perhaps mugs from one supplier, cutlery from another and packaging from a third. Each supplier delivers to a consolidation warehouse, where the goods are checked in, counted and shipped together." },
      { table: { head: ["", "Separate shipments", "One combined shipment"], rows: [
        ["Freight", "Several part-container or courier shipments, each with its own minimum charge", "One shipment, often a full container instead of several part-loads"],
        ["Customs entries", "One for each shipment", "One entry and one set of documents"],
        ["Arrival", "Goods turn up on different dates", "Everything arrives together"],
        ["Checks", "Each supplier ships unchecked unless you book inspections", "Goods are counted and checked as they arrive at the warehouse"],
      ] } },
      { p: "Consolidation does need a bit of care. Each supplier's goods still need their own [quality inspection](/services/quality-inspection) before leaving the factory, and the combined packing list has to be accurate for customs." },

      { h2: "Timing" },
      { p: "Standard samples usually reach us within a few days to a week. Custom samples can take one to three weeks, depending on the tooling. From there, express courier to most countries takes about three to seven days." },
    ],
    faqs: [
      { q: "Can you send me samples from suppliers I found myself?", a: "Yes. Tell us the suppliers and which samples you need, and we'll collect, check and forward them in the same way." },
      { q: "How many suppliers can be combined into one shipment?", a: "There's no fixed limit. What matters is that every supplier can deliver to the warehouse by the cut-off date, and that the total volume suits the way you're shipping." },
      { q: "Do you keep a copy of the approved sample?", a: "Where we can, we ask the factory for a second copy of the approved sample and keep it for the inspection, so the goods can be compared against it directly." },
    ],
  },
};

/** Long-form copy for every service page: sourcing services plus the "doing business in China" services. */
export const SERVICE_CONTENT: Record<string, ServiceContent> = { ...SOURCING_CONTENT, ...BUSINESS_CONTENT };
