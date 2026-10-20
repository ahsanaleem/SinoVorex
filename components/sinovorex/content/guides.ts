import type { Article } from "./types";

/** /guides/[slug]. Educational content; each guide links to the matching service pages. */
export const GUIDES: Article[] = [
  {
    slug: "china-sourcing-agent-cost",
    title: "How Much Does a China Sourcing Agent Cost? Fees & Red Flags",
    h1: "How much does a China sourcing agent cost?",
    description: "How China sourcing agents charge: commission, flat fees and per-day inspection rates, what a $10,000 order costs in fees, and the red flags to watch for.",
    summary: "Most China sourcing agents charge a commission of roughly 5–10% of the order value, a flat fee per project, or a monthly retainer. Factory audits and inspections are usually priced per person-day on site. The total cost matters less than what is included and whether the agent is paid only by you.",
    published: "2026-10-20",
    updated: "2026-10-20",
    body: [
      { h2: "What a sourcing agent does for the fee" },
      { p: "A sourcing agent works on your side in China. Depending on the agreement, that can include finding and comparing suppliers, negotiating in Chinese, collecting samples, checking factories, following production, inspecting goods and arranging freight. Agents differ far more in what they include than in the headline rate, so compare the scope first and the price second." },

      { h2: "The four common pricing models" },
      { table: { head: ["Model", "How it works", "Typical range in the market", "Suits"], rows: [
        ["Commission on order value", "A percentage of the product cost (usually the FOB value), covering sourcing and order management", "Commonly advertised at about 5–10%; higher for small orders, lower for large repeat orders", "Ongoing orders where the agent manages the whole process"],
        ["Flat project fee", "A fixed fee for a defined job, such as finding and shortlisting suppliers for one product", "Varies widely with complexity", "One-off sourcing, or buyers who place orders themselves"],
        ["Per person-day", "A day rate for on-site work: factory audits and quality inspections", "Third-party inspection firms commonly advertise around US$200–350 per person-day, plus travel in some cases", "Audits and inspections, with or without a sourcing agent"],
        ["Monthly retainer", "A fixed monthly fee for a set amount of work", "Varies with workload", "Buyers with many SKUs and frequent orders"],
      ] } },
      { p: "Many agents combine models: a commission for sourcing and follow-up, plus day rates for inspections. Ask for every fee in writing before work starts." },

      { h2: "Worked example: a US$10,000 order" },
      { p: "Suppose you order US$10,000 of goods (FOB value) with one pre-shipment inspection." },
      { table: { caption: "Illustrative figures using common market ranges, not a quote", head: ["Cost", "Low", "High"], rows: [
        ["Agent commission at 5–10%", "US$500", "US$1,000"],
        ["One pre-shipment inspection (1 person-day)", "US$200", "US$350"],
        ["Total agent and inspection cost", "US$700", "US$1,350"],
        ["As a share of the order value", "7%", "13.5%"],
      ] } },
      { p: "Freight, import duties, samples and bank charges come on top, whichever agent you use. On small orders, fixed costs such as an inspection day make up a larger share, which is why some agents set a minimum fee." },

      { h2: "What to check is included" },
      { ul: [
        "Is the commission calculated on the product value only, or on product plus freight?",
        "Are factory audits and inspections included, or charged per day?",
        "Who pays for travel to the factory?",
        "Are samples, courier and sample-checking included?",
        "Is there a minimum fee per order?",
        "Does the agent handle freight, or only hand over to your forwarder?",
      ] },

      { h2: "Hidden costs and red flags" },
      { p: "The biggest risk with an agent is not the fee you see, but income you do not see. Watch for:" },
      { ul: [
        "**Very low or \"free\" sourcing.** If you are not paying the agent, someone else is. Usually it is the factory, through a markup or kickback built into the unit price.",
        "**The agent will not name the factory** or let you see the supplier's business licence. You cannot verify who makes your goods.",
        "**All payments go through the agent's account**, with no invoice from the factory. This makes hidden markups easy.",
        "**Inspections done by the same people who chose the factory**, with no photos or defect counts. An inspection report should show evidence, not just \"passed\".",
        "**No written agreement** setting out the scope, the fee and who owns the supplier relationship.",
      ] },
      { p: "Ask a prospective agent directly: how are you paid, by whom, and will you put that in writing?" },

      { h2: "Is an agent worth it?" },
      { p: "An agent is usually worth it when you cannot visit China, when your order includes custom or quality-critical products, or when you need to manage several suppliers. It is less necessary for simple repeat orders from a supplier you already trust, where a [pre-shipment inspection](/services/quality-inspection) alone may be enough." },

      { h2: "How Sino Vorex charges" },
      { p: "We charge a commission on the order value. The rate depends on the product and order size and is confirmed in writing in your quote before any work starts, together with anything charged separately, such as on-site work or samples. Our shortlists name every supplier, so you can verify them yourself. [Request a quote](/quote) to get the exact figures for your product." },
    ],
    faqs: [
      { q: "What is a normal sourcing agent commission?", a: "Commissions of about 5–10% of the order value are commonly advertised. Small orders often carry a higher percentage or a minimum fee." },
      { q: "Is it cheaper to buy directly from Alibaba?", a: "The unit price can be the same, but you take on the risk of supplier fraud, quality problems and miscommunication yourself. Many buyers start direct and add an [inspection](/services/quality-inspection) before paying the balance." },
      { q: "Should a sourcing agent tell me who the factory is?", a: "Yes. Knowing the factory lets you check its registration and protects you if the relationship with the agent ends." },
    ],
    related: ["/services/product-sourcing", "/guides/freight-forwarder-vs-sourcing-agent", "/guides/sourcing-from-china-small-business"],
  },

  {
    slug: "sourcing-from-china-small-business",
    title: "Sourcing from China for Small Businesses: Low MOQ Guide",
    h1: "Sourcing from China as a small business: low MOQs and first orders",
    description: "How small businesses can source from China with low MOQs: how MOQs are set, how to negotiate a smaller first order, and how to keep a small order safe.",
    summary: "Small businesses can source from China by choosing products that use standard materials, accepting stock designs or simple customisation for a first order, negotiating a trial order above the factory's real break-even point, and paying for a pre-shipment inspection before the balance.",
    published: "2026-10-20",
    updated: "2026-10-20",
    body: [
      { h2: "Why factories set MOQs" },
      { p: "A minimum order quantity (MOQ) is rarely arbitrary. It usually reflects the factory's real costs: the minimum amount of raw material it can buy (a roll of fabric, a batch of a custom colour), the time needed to set up a machine or a print run, and the fact that small orders take as much admin as large ones. Once you understand which of these drives the MOQ, you know what to negotiate." },

      { h2: "Ways to get a lower MOQ" },
      { ul: [
        "**Use stock materials and colours.** Custom colours and materials are the most common reason for a high MOQ. Standard options can often be ordered in much smaller quantities.",
        "**Customise lightly at first.** A logo print, label or packaging sleeve on a standard product is far cheaper to set up than a new mould.",
        "**Ask what drives the MOQ.** If it is the material, ask whether you can share a material batch with another order, or pay a small surcharge instead.",
        "**Offer a trial order with a clear next step.** Factories accept smaller first orders more readily when they see a realistic reorder plan.",
        "**Combine variants.** An MOQ often applies per product, not per colour. Ask whether one MOQ can be split across colours or sizes.",
        "**Consider a trading company.** For very small mixed orders, a good trader that combines production from several factories can be the practical choice.",
      ] },

      { h2: "Typical MOQ ranges by product type" },
      { table: { caption: "Rough indications only; MOQs vary by factory, material and customisation", head: ["Product type", "Stock / light customisation", "Fully custom"], rows: [
        ["Printed packaging (boxes, bags)", "Hundreds to low thousands", "Thousands"],
        ["Textiles and apparel", "Hundreds per style", "Hundreds to thousands per colour"],
        ["Ceramics and tableware", "Hundreds to low thousands", "Thousands, plus moulds"],
        ["Plastic injection-moulded products", "Hundreds (existing mould)", "Thousands, plus a new mould"],
        ["Electronics", "Hundreds (existing model)", "Thousands, plus certification"],
      ] } },

      { h2: "Keeping a small order safe" },
      { p: "Small orders carry the same risks as large ones, and a problem hurts a small business more. Four habits protect you:" },
      { ol: [
        "**Verify the supplier** before you pay anything: check the business licence and that the bank account name matches the company. Our [factory audit checklist](/guides/factory-audit-checklist) lists what to look for.",
        "**Approve a sample** and keep it as the reference for production.",
        "**Write the specification down** in the purchase order: materials, measurements, colours, packaging and labels.",
        "**Inspect before you pay the balance.** A [pre-shipment inspection](/guides/pre-shipment-inspection-aql) is the cheapest insurance you can buy.",
      ] },

      { h2: "Budgeting for a first order" },
      { p: "Unit price is only part of the cost. For a first order, also budget for: samples and courier; any tooling or print set-up; the inspection; freight and insurance; import duties, VAT or sales tax in your country; and your agent's fee, if you use one. On a small order, these fixed costs can add a large percentage to the landed cost per unit, so calculate the landed cost before you commit. Our [guide to sourcing agent costs](/guides/china-sourcing-agent-cost) shows a worked example." },

      { h2: "Shipping small orders" },
      { p: "Small orders usually travel by **LCL sea freight** (sharing a container) or **air freight**. Air is faster and, for light goods under a few hundred kilograms, sometimes not much more expensive. If you buy from several suppliers, [consolidating](/services/samples-consolidation) them into one shipment saves on minimum charges and customs entries." },

      { h2: "How we work with small businesses" },
      { p: "We tell you honestly whether your quantity is realistic for the product, look for factories that accept smaller first orders where possible, and include the MOQ in every quote. See [China sourcing for small businesses](/sourcing-for/small-businesses) for how we work with smaller buyers." },
    ],
    faqs: [
      { q: "Can I order 100 units from a Chinese factory?", a: "For some stock products, yes. For custom products, 100 units is usually below what a factory will accept, unless you pay a premium or use a trading company." },
      { q: "Are Alibaba MOQs negotiable?", a: "Often. Ask what drives the MOQ and offer a realistic trial order. Listed MOQs are sometimes set high to filter out casual enquiries." },
      { q: "Is it worth inspecting a small order?", a: "Usually yes. An inspection costs a fixed amount, but discovering a defect after the goods arrive costs the whole order." },
    ],
    related: ["/sourcing-for/small-businesses", "/services/product-sourcing", "/guides/china-sourcing-agent-cost"],
  },

  {
    slug: "factory-audit-checklist",
    title: "Factory Audit Checklist for China Suppliers (2026)",
    h1: "Factory audit checklist for China suppliers",
    description: "A practical factory audit checklist for China suppliers: licence checks, production, capacity, quality control, track record and red flags.",
    summary: "A factory audit in China checks five things: that the company is legally registered as described, that it makes your product on site, that it has the capacity for your order, that it controls quality, and that its track record and certificates can be verified. Use the checklist below before paying a deposit.",
    published: "2026-10-20",
    updated: "2026-10-20",
    body: [
      { h2: "Before the visit: desk verification" },
      { p: "Start with checks you can do remotely. In China, every company has an 18-character Unified Social Credit Code (统一社会信用代码) on its business licence. You can look the company up on the National Enterprise Credit Information Publicity System ([gsxt.gov.cn](https://www.gsxt.gov.cn)) or a commercial database." },
      { ul: [
        "The company name on the licence matches the name on quotes, contracts and invoices.",
        "The **business scope** (经营范围) includes manufacturing of your product, not only trading.",
        "The registered address is an industrial site, and matches where the factory says it is.",
        "Date of establishment and registered capital are consistent with what the supplier claims.",
        "No records of serious legal disputes, administrative penalties or abnormal operation (经营异常).",
        "The bank account for payment is in the **company's** name, not a person's or another company's.",
      ] },

      { h2: "On site: company and premises" },
      { ul: [
        "The factory gate and signage show the same company name as the licence.",
        "The original business licence is displayed or can be shown.",
        "The site is a working factory, not only a showroom or an office.",
        "Ownership or lease of the premises, if the order is large or long-term.",
      ] },

      { h2: "On site: production" },
      { ul: [
        "Machinery for your product is on site, in working order and in use.",
        "Approximate number of production workers and the shift pattern.",
        "Which processes are done in-house and which are outsourced (e.g. plating, printing, embroidery, packaging).",
        "Products similar to yours on the line or in the warehouse.",
        "Working conditions, cleanliness and basic safety (fire exits, extinguishers, protective equipment).",
      ] },

      { h2: "Capacity and lead time" },
      { ul: [
        "Monthly capacity for your product type, and how much of it is already booked.",
        "Realistic lead time for your quantity, including material purchasing.",
        "Plans for peak seasons and the Chinese New Year shutdown.",
        "Raw-material suppliers and how long materials take to arrive.",
      ] },

      { h2: "Quality control" },
      { ul: [
        "**Incoming quality control (IQC):** are materials and components checked on arrival?",
        "**In-process quality control (IPQC):** are there check points on the production line?",
        "**Final quality control (FQC/OQC):** is there a final inspection before packing?",
        "Test equipment relevant to your product, and whether it is calibrated.",
        "Records of defects and rework, and how problems are traced to their cause.",
        "A sample room with approved samples kept for reference.",
      ] },

      { h2: "Track record and certificates" },
      { ul: [
        "Export markets the factory already ships to, and the types of buyer it serves.",
        "Management-system certificates (e.g. ISO 9001): check the certificate number with the certification body.",
        "Product certificates or test reports: check they cover your product and model, are current, and come from an accredited laboratory.",
        "References from other buyers, where the factory is willing to share them.",
      ] },

      { h2: "Red flags: when to stop" },
      { table: { head: ["Red flag", "Why it matters"], rows: [
        ["The visit is refused, or moved to an office or showroom", "You cannot confirm who makes the goods"],
        ["Licence name differs from the bank account name", "A common sign of fraud or a hidden intermediary"],
        ["No machinery for your product on site", "Production will be subcontracted to a factory you have not seen"],
        ["Pressure to pay into a personal account", "Leaves you with no recourse if something goes wrong"],
        ["Certificates the issuing body cannot confirm", "Forged or borrowed certificates are common"],
        ["Capacity far below your order size", "Expect delays or hidden subcontracting"],
      ] } },

      { h2: "Scoring the audit" },
      { p: "A simple approach works for most buyers: mark each section as acceptable, acceptable with conditions, or unacceptable. Any unacceptable item in the legal or production sections is a no-go. Conditions, such as \"must stop outsourcing the printing\" or \"must add a final inspection\", should be written into your purchase contract." },

      { h2: "Factory audit vs quality inspection" },
      { p: "An audit checks the supplier before you order; an inspection checks the goods. You usually need both: an audit for each new supplier, and a [pre-shipment inspection](/guides/pre-shipment-inspection-aql) for each order. If you cannot visit yourself, we carry out [factory audits](/services/factory-vetting) on site and send a photo report." },
    ],
    faqs: [
      { q: "How long does a factory audit take?", a: "Desk verification takes a few working days. An on-site audit is usually one day at the factory, longer for large or complex sites." },
      { q: "How do I check a Chinese company's business licence?", a: "Search the company's Chinese name or Unified Social Credit Code on the National Enterprise Credit Information Publicity System (gsxt.gov.cn), and compare the name, scope and address with what the supplier told you." },
      { q: "Is a factory audit the same as a BSCI or SMETA audit?", a: "No. Those are formal social-compliance audits carried out by accredited firms. A buyer's factory audit is a practical check of the supplier's legitimacy and capability." },
    ],
    related: ["/services/factory-vetting", "/guides/pre-shipment-inspection-aql", "/guides/china-sourcing-agent-cost"],
  },

  {
    slug: "pre-shipment-inspection-aql",
    title: "Pre-shipment Inspection & AQL Explained (with AQL Table)",
    h1: "Pre-shipment inspection and AQL explained",
    description: "What a pre-shipment inspection checks, how AQL sampling works under ISO 2859-1, an AQL table for common lot sizes, and what to do when goods fail.",
    summary: "A pre-shipment inspection checks a random sample of finished, packed goods before you pay the balance. The sample size and pass/fail limits come from ISO 2859-1 (AQL). For example, a lot of 3,000 units at General Inspection Level II means inspecting 125 units; at AQL 2.5 the lot passes with up to 7 major defects.",
    published: "2026-10-20",
    updated: "2026-10-20",
    body: [
      { h2: "What a pre-shipment inspection is" },
      { p: "A pre-shipment inspection (PSI) is a check of the finished goods at the factory, carried out when at least 80% of the order is produced and packed. It is the last point at which the factory can still fix problems cheaply, and the last point at which you have leverage, because the balance is usually not yet paid." },

      { h2: "The four inspection types" },
      { table: { head: ["Inspection", "When", "Purpose"], rows: [
        ["Pre-production (PPI)", "Before production", "Check materials and components; confirm the specification is understood"],
        ["During production (DUPRO)", "About 20–60% produced", "Catch recurring defects while the line can still be corrected"],
        ["Pre-shipment (PSI)", "80–100% produced and packed", "Check quantity, quality and packaging before the balance is paid"],
        ["Container loading check", "During loading", "Confirm the right goods and quantity are loaded, in good condition"],
      ] } },

      { h2: "What AQL means" },
      { p: "AQL stands for **Acceptance Quality Limit**. Under ISO 2859-1 (equivalent to ANSI/ASQ Z1.4), an inspector checks a random sample whose size depends on the lot size and the inspection level. The AQL sets how many defective units the sample may contain before the lot fails." },
      { p: "Defects are classed in three groups, each with its own AQL:" },
      { ul: [
        "**Critical:** unsafe, or breaks the law in your market (e.g. a sharp edge on a child's product). Usually zero tolerance.",
        "**Major:** likely to cause a return or complaint (e.g. a product that does not work, a visible stain). AQL 2.5 is common.",
        "**Minor:** a small departure from the specification that most customers would accept (e.g. a short loose thread). AQL 4.0 is common.",
      ] },
      { p: "General Inspection Level II is the usual default. Level I uses smaller samples; Level III larger ones." },

      { h2: "AQL table: sample sizes and limits" },
      { table: { caption: "ISO 2859-1, General Inspection Level II, single sampling, normal inspection. Accept = maximum defects to pass; reject = defects at which the lot fails.", head: ["Lot size (units)", "Sample size", "Major, AQL 2.5 (accept / reject)", "Minor, AQL 4.0 (accept / reject)"], rows: [
        ["151–280", "32", "2 / 3", "3 / 4"],
        ["281–500", "50", "3 / 4", "5 / 6"],
        ["501–1,200", "80", "5 / 6", "7 / 8"],
        ["1,201–3,200", "125", "7 / 8", "10 / 11"],
        ["3,201–10,000", "200", "10 / 11", "14 / 15"],
        ["10,001–35,000", "315", "14 / 15", "21 / 22"],
      ] } },
      { p: "Example: a lot of 5,000 units falls in the 3,201–10,000 band, so the inspector checks 200 units. The lot passes for major defects with 10 or fewer, and fails at 11. Any critical defect normally fails the lot." },

      { h2: "What a pre-shipment inspection checks" },
      { ol: [
        "**Quantity:** finished and packed units against the order.",
        "**Workmanship:** visual defects, compared with the approved sample.",
        "**Specification:** measurements, weight, materials and colour.",
        "**Function and safety:** tests suited to the product, such as operation, assembly or seam strength.",
        "**Packaging and labelling:** retail packaging, barcodes, labels, inserts and carton marks.",
        "**Cartons:** dimensions, weight and a drop test.",
      ] },

      { h2: "Reading the inspection report" },
      { p: "A useful report gives a clear result (pass, fail or pending), the defect counts by class against the AQL limits, photos of every defect, measurements, and test results. A report that simply says \"passed\", with no photos or numbers, gives you little to act on." },

      { h2: "When goods fail" },
      { p: "Do not ship and do not pay the balance. Ask the factory to sort the goods, rework or replace the defective units, and then re-inspect. To make this straightforward, put three terms into your purchase contract before production starts:" },
      { ul: [
        "The balance is due only after a passed inspection.",
        "The factory pays for any re-inspection after a failed one.",
        "The approved sample is the reference for quality.",
      ] },

      { h2: "Getting an inspection in China" },
      { p: "Book the inspection about a week before the goods are ready, and send the inspector your specification and a photo of the approved sample. We carry out [pre-shipment inspections](/services/quality-inspection) with photo and video reports for any supplier in China." },
    ],
    faqs: [
      { q: "Which AQL should I use?", a: "For most consumer goods: critical 0, major 2.5 and minor 4.0. Use a stricter level, such as major 1.0 or 1.5, for high-value or safety-sensitive products." },
      { q: "Does passing AQL mean there are no defects?", a: "No. AQL sampling accepts a small, defined risk of defects in the whole lot. A pass means the defect rate in the sample was within the limit you set." },
      { q: "Can an inspection replace lab testing?", a: "No. Certification tests such as CE, UKCA or CPSIA are carried out by accredited laboratories. An inspection checks that production matches the specification and the tested sample." },
    ],
    related: ["/services/quality-inspection", "/guides/factory-audit-checklist", "/sourcing-for/amazon-sellers"],
  },

  {
    slug: "freight-forwarder-vs-sourcing-agent",
    title: "Freight Forwarder vs Sourcing Agent: Who Does What?",
    h1: "Freight forwarder vs sourcing agent: who does what?",
    description: "The difference between a freight forwarder and a China sourcing agent, which one you need, and how they work together from the factory to your door.",
    summary: "A sourcing agent works on the buying side: finding suppliers, checking factories and goods, and managing production. A freight forwarder works on the shipping side: booking transport, preparing transport documents and arranging customs clearance. Most importers need both, and the handover between them happens at the factory or the port.",
    published: "2026-10-20",
    updated: "2026-10-20",
    body: [
      { h2: "The short answer" },
      { table: { head: ["", "Sourcing agent", "Freight forwarder"], rows: [
        ["Main job", "Buying the right goods from the right factory", "Moving goods from A to B"],
        ["Typical tasks", "Supplier search, quotes, samples, factory audits, production follow-up, inspection", "Booking sea, air or rail freight, transport documents, customs clearance, insurance, delivery"],
        ["Works with", "Factories and you", "Carriers, ports, customs and you"],
        ["Usually paid by", "Commission, project fee or day rate", "Freight charges and service fees"],
        ["Responsible for product quality?", "Helps control it, through checks and inspection", "No"],
      ] } },

      { h2: "What a sourcing agent does" },
      { p: "A sourcing agent represents you in China before the goods are ready: finding manufacturers, comparing quotes, negotiating, collecting samples, auditing factories, following production and inspecting goods. Their value is in getting the right product at the right price, and catching problems before you pay. See [how sourcing agents charge](/guides/china-sourcing-agent-cost)." },

      { h2: "What a freight forwarder does" },
      { p: "A freight forwarder takes over once the goods are packed. It books space with shipping lines, airlines or rail operators, issues or arranges the bill of lading or air waybill, handles export and import customs (directly or through partner brokers), and arranges delivery. Forwarders do not check whether the goods inside the cartons are right." },

      { h2: "Where the handover happens" },
      { p: "The handover point depends on the Incoterm in your purchase contract:" },
      { ul: [
        "**EXW:** the forwarder collects from the factory and handles export clearance.",
        "**FOB:** the factory delivers to the ship at the Chinese port; your forwarder takes over from there.",
        "**CIF:** the factory's forwarder carries the goods to your port; your broker clears import customs.",
        "**DDP:** a forwarder delivers to your address with duties paid.",
      ] },
      { p: "The gap between the two roles, from \"goods finished\" to \"goods on the ship\", is where things go wrong: unchecked goods, missed pick-ups, packing lists that do not match the cartons. Someone has to own it." },

      { h2: "Which one do you need?" },
      { table: { head: ["Your situation", "What you need"], rows: [
        ["You have a trusted supplier and only need goods moved", "A freight forwarder"],
        ["You need a supplier, or are unsure about yours", "A sourcing agent, then a forwarder"],
        ["You buy from several suppliers", "A sourcing agent to consolidate, and a forwarder"],
        ["You cannot visit China and the goods are quality-critical", "A sourcing agent for audits and inspection, and a forwarder"],
      ] } },

      { h2: "Can one company do both?" },
      { p: "Some sourcing agents are also licensed forwarders, and some forwarders offer basic inspection. More often, a sourcing agent coordinates with partner forwarders, so you have one point of contact without the agent carrying the goods itself. That is how we work: we [arrange freight with partner forwarders](/services/shipping-coordination), after the goods have passed [inspection](/services/quality-inspection)." },

      { h2: "Questions to ask either one" },
      { ul: [
        "Exactly what is included in the price, and what is charged separately?",
        "Who is responsible if goods are damaged, delayed or held at customs?",
        "Is cargo insurance included, and on what value?",
        "Who will be my day-to-day contact, and in which language?",
      ] },
    ],
    faqs: [
      { q: "Is Sino Vorex a freight forwarder?", a: "No. We are a sourcing and export partner. We arrange freight with partner forwarders, who carry the goods and issue the transport documents." },
      { q: "Can my own forwarder collect goods you sourced?", a: "Yes. We coordinate the pick-up date and paperwork with your forwarder." },
      { q: "Who clears customs in my country?", a: "Your customs broker or your forwarder's agent, unless you ship DDP, where the forwarder handles import clearance and duties." },
    ],
    related: ["/services/shipping-coordination", "/guides/china-sourcing-agent-cost", "/services/product-sourcing"],
  },
];

export const GUIDE_BY_SLUG = Object.fromEntries(GUIDES.map((g) => [g.slug, g]));
