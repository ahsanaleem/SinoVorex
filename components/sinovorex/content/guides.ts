import type { Article } from "./types";
import { PILLAR_GUIDE } from "./guide-pillar";
import { SHIPPING_GUIDES } from "./guide-shipping";

/** /guides/[slug]. Educational content; each guide links to the matching service pages. */
const CORE_GUIDES: Article[] = [
  {
    slug: "china-sourcing-agent-cost",
    takeaways: [
      "Most agents charge a commission of about 5 to 10% of the order value.",
      "Inspections and audits are usually charged per person per day, often around US$200 to 350.",
      "On a US$10,000 order you can expect roughly US$700 to 1,350 in agent and inspection fees.",
      "Be wary of \"free\" sourcing. It usually means the factory is paying the agent.",
    ],
    title: "How Much Does a China Sourcing Agent Cost? Fees & Red Flags",
    h1: "How much does a China sourcing agent cost?",
    description: "How China sourcing agents charge: commission, flat fees and per-day inspection rates, what a $10,000 order costs in fees, and the red flags to watch for.",
    summary: "Most China sourcing agents charge a commission of roughly 5 to 10% of the order value, a flat fee per project, or a monthly retainer. Factory audits and inspections are usually priced per person per day on site. The headline rate matters less than what it includes, and whether you're the only one paying the agent.",
    published: "2026-10-20",
    updated: "2026-10-23",
    body: [
      { h2: "What a sourcing agent does for the fee" },
      { p: "A sourcing agent works for you in China. Depending on what you agree, that can cover finding and comparing suppliers, negotiating in Chinese, collecting samples, checking factories, following production, inspecting the goods and arranging freight." },
      { p: "Agents vary much more in what they include than in what they charge. So compare what's included first, and the price second." },

      { h2: "The four common pricing models" },
      { table: { head: ["Model", "How it works", "Typical range in the market", "Suits"], rows: [
        ["Commission on order value", "A percentage of the product cost, usually the FOB value, covering sourcing and order management", "Commonly advertised at about 5 to 10%. Higher for small orders, lower for large repeat ones", "Ongoing orders where the agent manages everything"],
        ["Flat project fee", "A fixed fee for a set job, such as finding and shortlisting suppliers for one product", "Varies a lot with how complex the product is", "One-off sourcing, or buyers who place their own orders"],
        ["Day rate", "A daily rate for work on site, such as factory audits and quality inspections", "Inspection companies often advertise about US$200 to 350 per person per day, sometimes plus travel", "Audits and inspections, with or without a sourcing agent"],
        ["Monthly retainer", "A fixed monthly fee for a set amount of work", "Depends on the workload", "Buyers with lots of products and frequent orders"],
      ] } },
      { p: "Those ranges line up with what the market publishes. Epic Sourcing's 2026 UK pricing guide, for example, puts most reputable agents at 5 to 10%, within a wider market range of 5 to 15%. On the inspection side, V-Trust advertises an all-inclusive rate of US$268 per man-day, travel included." },
      { p: "Plenty of agents mix these, for example a commission for sourcing and follow-up plus a day rate for inspections. Whatever the model, ask for every fee in writing before any work starts." },

      { h2: "How commission changes with order size" },
      { p: "Percentages usually fall as orders get bigger, because the agent's work doesn't grow at the same rate as the order value. The bands below are from Epic Sourcing's 2026 guide." },
      { table: { caption: "Published by Epic Sourcing (June 2026), based on ex-factory order value.", head: ["Order value", "Typical commission"], rows: [
        ["Under £10,000", "8 to 12%"],
        ["Most orders", "5 to 10%"],
        ["£50,000 and above", "3 to 6%"],
      ] } },
      { p: "If an agent quotes far below these figures, find out what they're leaving out, or how else they're being paid." },

      { h2: "Worked example: a US$10,000 order" },
      { p: "Let's say you order US$10,000 worth of goods, valued FOB, with one pre-shipment inspection." },
      { table: { caption: "Illustrative figures based on common market ranges. This isn't a quote.", head: ["Cost", "Low", "High"], rows: [
        ["Agent commission at 5 to 10%", "US$500", "US$1,000"],
        ["One pre-shipment inspection (one person, one day)", "US$200", "US$350"],
        ["Total for the agent and inspection", "US$700", "US$1,350"],
        ["As a share of the order value", "7%", "13.5%"],
      ] } },
      { p: "Freight, import duties, samples and bank charges come on top, whichever agent you use. On small orders, fixed costs like an inspection day make up a bigger share, which is why some agents have a minimum fee." },

      { h2: "Comparing two agents' quotes" },
      { p: "A lower percentage doesn't always mean a cheaper agent. Here's a simple comparison on the same US$10,000 order." },
      { table: { caption: "Illustrative example, not a quote.", head: ["", "Agent A", "Agent B"], rows: [
        ["Commission", "6%, so US$600", "9%, so US$900"],
        ["Pre-shipment inspection", "Charged extra, US$300", "Included"],
        ["Factory audit before ordering", "Charged extra, US$300", "Included"],
        ["Sample checking and forwarding", "Charged extra, US$100", "Included"],
        ["Total", "US$1,300", "US$900"],
      ] } },
      { p: "Agent A looks cheaper on the headline rate but costs more once you add what you actually need. Always compare the total for the same scope of work." },

      { h2: "What to check is included" },
      { ul: [
        "Is the commission worked out on the product value alone, or on product plus freight?",
        "Are factory audits and inspections included, or charged by the day?",
        "Who pays for travel to the factory?",
        "Are samples, courier costs and checking the samples included?",
        "Is there a minimum fee per order?",
        "Does the agent arrange freight, or hand over to your own forwarder?",
      ] },

      { h2: "Hidden costs and red flags" },
      { p: "The biggest risk with an agent usually isn't the fee you can see. It's the money you can't see. Here's what to watch for." },
      { ul: [
        "Very cheap or \"free\" sourcing. If you're not paying the agent, someone else is, and it's usually the factory, through a markup or kickback hidden in the unit price.",
        "An agent who won't tell you the factory's name or show you its business licence. Then you have no way of checking who's making your goods.",
        "All payments going through the agent's account with no invoice from the factory. That makes hidden markups easy.",
        "Inspections done by the same people who picked the factory, with no photos or defect counts. A proper report shows evidence, not just the word \"passed\".",
        "No written agreement covering the work, the fee, and who owns the relationship with the supplier.",
      ] },
      { p: "It's worth asking any agent straight out how they're paid, who pays them, and whether they'll put that in writing." },

      { h2: "Costs that aren't the agent's fee" },
      { p: "Whichever agent you choose, these costs are part of buying from China, and it helps to budget for them from the start." },
      { ul: [
        "Samples and the courier to send them, usually tens to a few hundred dollars per supplier.",
        "Tooling, moulds or print set-up for custom products.",
        "Freight and cargo insurance, which depend heavily on the season and route.",
        "Import duty and VAT or sales tax in your country.",
        "Bank charges for international transfers, typically a small fixed fee per payment.",
        "Testing and certification, if your product needs it for your market.",
      ] },
      { p: "Our [guide to China sourcing agents](/guides/china-sourcing-agent) explains what you get for these fees, and how to choose an agent." },

      { h2: "Is an agent worth it?" },
      { p: "An agent usually pays for itself if you can't visit China, if your order includes custom or quality-critical products, or if you're dealing with several suppliers at once." },
      { p: "You may not need one for simple repeat orders from a supplier you already trust. In that case a [pre-shipment inspection](/services/quality-inspection) on its own may be enough." },

      { h2: "How Sino Vorex charges" },
      { p: "We charge a commission on the order value. The rate depends on the product and the order size, and we confirm it in writing in your quote before we start. Anything charged separately, like on-site work or samples, is in the quote too. Our shortlists name every supplier, so you can check them yourself. [Ask us for a quote](/quote) to get exact figures for your product." },
    ],
    faqs: [
      { q: "What's a normal sourcing agent commission?", a: "About 5 to 10% of the order value is what you'll commonly see advertised. Small orders often come with a higher percentage or a minimum fee." },
      { q: "Is it cheaper to buy straight from Alibaba?", a: "The unit price can be the same, but you take on the risk of fraud, quality problems and misunderstandings yourself. A lot of buyers start by buying direct and adding an [inspection](/services/quality-inspection) before they pay the balance." },
      { q: "Should a sourcing agent tell me who the factory is?", a: "Yes. Knowing the factory lets you check its registration, and protects you if you stop working with the agent." },
    ],
    related: ["/services/product-sourcing", "/guides/freight-forwarder-vs-sourcing-agent", "/guides/sourcing-from-china-small-business"],
  },

  {
    slug: "sourcing-from-china-small-business",
    takeaways: [
      "MOQs come from real costs, mainly materials, machine set-up and admin.",
      "Using stock materials and keeping customisation light is the easiest way to a lower MOQ.",
      "Always check out the supplier, and get the goods inspected before you pay the balance.",
      "Work out your landed cost, including freight, duties and fees, before you order.",
    ],
    title: "Sourcing from China for Small Businesses: Low MOQ Guide",
    h1: "Sourcing from China as a small business: low MOQs and first orders",
    description: "How small businesses can source from China with low MOQs: how MOQs are set, how to negotiate a smaller first order, and how to keep a small order safe.",
    summary: "Small businesses can buy from China by picking products made from standard materials, sticking to stock designs or simple customisation for the first order, negotiating a trial order the factory can still make money on, and paying for an inspection before the balance.",
    published: "2026-10-20",
    updated: "2026-10-23",
    body: [
      { h2: "Why factories set MOQs" },
      { p: "A minimum order quantity, or MOQ, is rarely just a number the factory made up. It usually reflects real costs. There's the smallest amount of raw material they can buy, like a roll of fabric or a batch of a custom colour. There's the time it takes to set up a machine or a print run. And a small order needs as much admin as a big one." },
      { p: "Once you know which of these is behind the MOQ, you know what to negotiate on." },

      { h2: "Ways to get a lower MOQ" },
      { ul: [
        "Stick to stock materials and colours. Custom colours and materials are the most common reason for a high MOQ, and standard options can often be ordered in much smaller amounts.",
        "Keep customisation light to begin with. Putting your logo, label or a packaging sleeve on a standard product costs far less to set up than a new mould.",
        "Ask what's driving the MOQ. If it's the material, ask whether you can share a batch with another order, or pay a small extra charge instead.",
        "Offer a trial order and show where it could lead. Factories are much more open to a small first order when they can see a realistic plan for reorders.",
        "Spread it across variants. The MOQ often applies to the product, not to each colour, so ask whether you can split it across colours or sizes.",
        "Think about a trading company. For very small mixed orders, a good trader who combines goods from several factories can be the practical choice.",
      ] },

      { h2: "Typical MOQ ranges by product type" },
      { table: { caption: "Rough guide only. MOQs vary with the factory, the material and how much you customise.", head: ["Product type", "Stock or light customisation", "Fully custom"], rows: [
        ["Printed packaging (boxes, bags)", "Hundreds to low thousands", "Thousands"],
        ["Textiles and clothing", "Hundreds per style", "Hundreds to thousands per colour"],
        ["Ceramics and tableware", "Hundreds to low thousands", "Thousands, plus moulds"],
        ["Plastic injection-moulded products", "Hundreds, using an existing mould", "Thousands, plus a new mould"],
        ["Electronics", "Hundreds, for an existing model", "Thousands, plus certification"],
      ] } },

      { h2: "Keeping a small order safe" },
      { p: "A small order carries the same risks as a big one, and when something goes wrong it hurts a small business more. Four habits will protect you." },
      { ol: [
        "Check the supplier before you pay anything. Look at their business licence and make sure the bank account name matches the company. Our [factory audit checklist](/guides/factory-audit-checklist) lists what to look for.",
        "Approve a sample and keep it as the reference for production.",
        "Write the specification into the purchase order, including materials, measurements, colours, packaging and labels.",
        "Get the goods inspected before you pay the balance. A [pre-shipment inspection](/guides/pre-shipment-inspection-aql) is about the cheapest insurance you can buy.",
      ] },

      { h2: "Budgeting for a first order" },
      { p: "The unit price is only part of what you'll spend. For a first order, also allow for samples and courier, any tooling or print set-up, the inspection, freight and insurance, import duties and VAT or sales tax, and your agent's fee if you use one." },
      { p: "On a small order these fixed costs can add a lot to the cost of each unit, so work out the landed cost before you commit. Our [guide to sourcing agent costs](/guides/china-sourcing-agent-cost) walks through an example." },

      { h2: "Shipping small orders" },
      { p: "Small orders usually travel by LCL sea freight, sharing a container with other goods, or by air. Air is quicker, and for light goods under a few hundred kilos it's sometimes not much more expensive. If you're buying from several suppliers, [combining them into one shipment](/services/samples-consolidation) saves on minimum charges and customs paperwork." },

      { h2: "How we work with small businesses" },
      { p: "We'll tell you honestly whether your quantity makes sense for the product, look for factories that take smaller first orders where we can, and include the MOQ in every quote. Our page on [China sourcing for small businesses](/sourcing-for/small-businesses) explains how we work with smaller buyers." },
    ],
    faqs: [
      { q: "Can I order 100 units from a Chinese factory?", a: "For some stock products, yes. For custom products, 100 units is usually below what a factory will take on, unless you pay extra or go through a trading company." },
      { q: "Are Alibaba MOQs negotiable?", a: "Often they are. Ask what's behind the MOQ and offer a realistic trial order. Some listed MOQs are set high just to put off casual enquiries." },
      { q: "Is it worth inspecting a small order?", a: "Usually, yes. An inspection is a fixed cost, but finding a fault after the goods arrive can cost you the whole order." },
    ],
    related: ["/sourcing-for/small-businesses", "/services/product-sourcing", "/services/samples-consolidation", "/guides/china-sourcing-agent-cost"],
  },

  {
    slug: "factory-audit-checklist",
    takeaways: [
      "Start with checks you can do from your desk: the licence, business scope, address and bank account name.",
      "On site, make sure the machinery for your product is actually there and running.",
      "Look at capacity and quality control, and make sure the certificates are genuine.",
      "Walk away if the visit is refused or you're asked to pay into a personal account.",
    ],
    title: "Factory Audit Checklist for China Suppliers (2026)",
    h1: "Factory audit checklist for China suppliers",
    description: "A practical factory audit checklist for China suppliers: licence checks, production, capacity, quality control, track record and red flags.",
    summary: "A factory audit in China checks five things. Is the company legally registered as described? Does it make your product on site? Does it have room for your order? Does it control quality? And can its track record and certificates be confirmed? Go through the checklist below before you pay a deposit.",
    published: "2026-10-20",
    updated: "2026-10-20",
    body: [
      { h2: "Before the visit: desk verification" },
      { p: "Start with the checks you can do from your desk. Every company in China has an 18-character Unified Social Credit Code (统一社会信用代码) on its business licence. You can look the company up on the National Enterprise Credit Information Publicity System at [gsxt.gov.cn](https://www.gsxt.gov.cn), or on a commercial database." },
      { ul: [
        "The company name on the licence matches the name on the quotes, contract and invoices.",
        "The business scope (经营范围) covers making your product, not just trading it.",
        "The registered address is an industrial site and matches where the factory says it is.",
        "The date it was set up and its registered capital fit with what the supplier has told you.",
        "There are no records of serious legal disputes, penalties or abnormal operation (经营异常).",
        "The bank account you'll pay into is in the company's name, not a person's or another company's.",
      ] },

      { h2: "On site: company and premises" },
      { ul: [
        "The gate and signs show the same company name as the licence.",
        "The original business licence is on display, or they can show it to you.",
        "It's a working factory, not just a showroom or an office.",
        "For big or long-term orders, who owns or leases the premises.",
      ] },

      { h2: "On site: production" },
      { ul: [
        "The machinery for your product is there, working and in use.",
        "Roughly how many production workers there are, and what shifts they work.",
        "Which steps they do themselves and which they send out, such as plating, printing, embroidery or packaging.",
        "Products like yours on the line or in the warehouse.",
        "Working conditions, cleanliness and basic safety, like fire exits, extinguishers and protective equipment.",
      ] },

      { h2: "Capacity and lead time" },
      { ul: [
        "How much of your type of product they can make in a month, and how much of that is already booked.",
        "A realistic lead time for your quantity, including the time to buy materials.",
        "How they handle busy seasons and the Chinese New Year shutdown.",
        "Where their raw materials come from and how long they take to arrive.",
      ] },

      { h2: "Quality control" },
      { ul: [
        "Incoming quality control (IQC). Do they check materials and parts when they arrive?",
        "In-process quality control (IPQC). Are there checkpoints on the production line?",
        "Final quality control (FQC or OQC). Is there a last inspection before packing?",
        "The test equipment you'd expect for your product, and whether it's calibrated.",
        "Records of defects and rework, and how they trace a problem back to its cause.",
        "A sample room where approved samples are kept for reference.",
      ] },

      { h2: "Track record and certificates" },
      { ul: [
        "Which markets the factory already exports to, and what kind of buyers it works with.",
        "Management certificates, such as ISO 9001. Check the certificate number with the body that issued it.",
        "Product certificates or test reports. Make sure they cover your product and model, are still valid, and come from an accredited lab.",
        "References from other buyers, if the factory is willing to share them.",
      ] },

      { h2: "Red flags: when to stop" },
      { table: { head: ["Red flag", "Why it matters"], rows: [
        ["The visit is refused, or moved to an office or showroom", "You can't confirm who's making the goods"],
        ["The licence name is different from the bank account name", "A common sign of fraud or a hidden middleman"],
        ["There's no machinery for your product on site", "Your order will be passed to a factory you haven't seen"],
        ["You're pushed to pay into a personal account", "You'd have no comeback if something goes wrong"],
        ["The issuing body can't confirm the certificates", "Fake or borrowed certificates are common"],
        ["Capacity is far below your order size", "Expect delays, or work being quietly passed on"],
      ] } },

      { h2: "Scoring the audit" },
      { p: "A simple approach works for most buyers. Mark each section as fine, fine with conditions, or not acceptable. Anything not acceptable in the legal or production sections means don't go ahead." },
      { p: "Conditions like \"must stop sending the printing out\" or \"must add a final inspection\" should go into your purchase contract." },

      { h2: "Factory audit vs quality inspection" },
      { p: "An audit checks the supplier before you order. An inspection checks the goods. You usually need both, an audit for each new supplier and a [pre-shipment inspection](/guides/pre-shipment-inspection-aql) for each order. If you can't visit yourself, we can do the [factory audit](/services/factory-vetting) on site and send you a photo report." },
    ],
    faqs: [
      { q: "How long does a factory audit take?", a: "Desk checks take a few working days. An on-site audit is usually one day at the factory, or longer for big or complicated sites." },
      { q: "How do I check a Chinese company's business licence?", a: "Search for the company's Chinese name or its Unified Social Credit Code on gsxt.gov.cn, the National Enterprise Credit Information Publicity System. Then compare the name, business scope and address with what the supplier told you." },
      { q: "Is a factory audit the same as a BSCI or SMETA audit?", a: "No. Those are formal social compliance audits done by accredited firms. A buyer's factory audit is a practical check that the supplier is genuine and capable." },
    ],
    related: ["/services/factory-vetting", "/guides/pre-shipment-inspection-aql", "/guides/china-sourcing-agent-cost"],
  },

  {
    slug: "pre-shipment-inspection-aql",
    takeaways: [
      "A pre-shipment inspection happens once at least 80% of the goods are packed.",
      "How many units get checked depends on the order size. For 3,000 units, it's 125.",
      "Common limits are 0 for critical defects, 2.5 for major and 4.0 for minor.",
      "If the goods fail, don't pay the balance. The factory fixes them and they're inspected again.",
    ],
    title: "Pre-shipment Inspection & AQL Explained (with AQL Table)",
    h1: "Pre-shipment inspection and AQL explained",
    description: "What a pre-shipment inspection checks, how AQL sampling works under ISO 2859-1, an AQL table for common lot sizes, and what to do when goods fail.",
    summary: "A pre-shipment inspection checks a random sample of your finished, packed goods before you pay the balance. How many get checked, and how many faults are allowed, comes from a standard called ISO 2859-1, also known as AQL. For an order of 3,000 units, an inspector checks 125, and at AQL 2.5 the order passes with up to 7 major defects.",
    published: "2026-10-20",
    updated: "2026-10-23",
    body: [
      { h2: "What a pre-shipment inspection is" },
      { p: "A pre-shipment inspection, or PSI, is a check of the finished goods at the factory once at least 80% of the order has been made and packed." },
      { p: "It's your last chance to have problems fixed cheaply, and your last real bit of leverage, because you usually haven't paid the balance yet." },

      { h2: "The four inspection types" },
      { table: { head: ["Inspection", "When", "Purpose"], rows: [
        ["Pre-production (PPI)", "Before production", "Check the materials and parts, and make sure the specification is understood"],
        ["During production (DUPRO)", "When about 20 to 60% is made", "Catch repeating faults while the line can still be corrected"],
        ["Pre-shipment (PSI)", "When 80 to 100% is made and packed", "Check the quantity, quality and packaging before the balance is paid"],
        ["Container loading check", "While loading", "Make sure the right goods go in, in the right numbers and in good condition"],
      ] } },

      { h2: "What AQL means" },
      { p: "AQL stands for Acceptance Quality Limit. The sampling plans come from [ISO 2859-1](https://www.iso.org/standard/85464.html), published by the International Organization for Standardization (the current edition is from 2026). Under ISO 2859-1, which is the same as ANSI/ASQ Z1.4, an inspector checks a random sample. The size of that sample depends on how big the order is and which inspection level you use. The AQL then sets how many faulty units the sample can have before the whole order fails." },
      { p: "Faults are put into three groups, and each group has its own AQL." },
      { ul: [
        "Critical faults make the product unsafe or illegal in your market, like a sharp edge on a child's toy. These usually aren't allowed at all.",
        "Major faults would probably lead to a return or a complaint, like a product that doesn't work or an obvious stain. AQL 2.5 is common.",
        "Minor faults are small differences from the specification that most customers would accept, like a short loose thread. AQL 4.0 is common.",
      ] },
      { p: "General Inspection Level II is the usual default. Level I uses smaller samples and Level III uses bigger ones." },

      { h2: "AQL table: sample sizes and limits" },
      { table: { caption: "ISO 2859-1, General Inspection Level II, single sampling, normal inspection. Accept is the most faults allowed to pass. Reject is the number at which the order fails.", head: ["Order size (units)", "Units checked", "Major faults, AQL 2.5 (accept / reject)", "Minor faults, AQL 4.0 (accept / reject)"], rows: [
        ["151 to 280", "32", "2 / 3", "3 / 4"],
        ["281 to 500", "50", "3 / 4", "5 / 6"],
        ["501 to 1,200", "80", "5 / 6", "7 / 8"],
        ["1,201 to 3,200", "125", "7 / 8", "10 / 11"],
        ["3,201 to 10,000", "200", "10 / 11", "14 / 15"],
        ["10,001 to 35,000", "315", "14 / 15", "21 / 22"],
      ] } },
      { p: "So for an order of 5,000 units, which falls between 3,201 and 10,000, the inspector checks 200. The order passes for major faults with 10 or fewer and fails at 11. Any critical fault normally fails the order." },

      { h2: "What a pre-shipment inspection checks" },
      { ol: [
        "The quantity of finished, packed units, compared with the order.",
        "Workmanship. Visible faults, compared with the approved sample.",
        "The specification. Measurements, weight, materials and colour.",
        "Function and safety, with tests that suit the product, such as how it works, how it assembles or how strong the seams are.",
        "Packaging and labels, including retail packaging, barcodes, inserts and carton marks.",
        "The cartons, including their size, weight and a drop test.",
      ] },

      { h2: "Reading the inspection report" },
      { p: "A useful report gives you a clear result of pass, fail or pending. It shows the number of faults in each group against the AQL limits, photos of every fault, the measurements and the test results." },
      { p: "A report that just says \"passed\", with no photos or numbers, doesn't give you much to go on." },

      { h2: "When goods fail" },
      { p: "Don't let the goods ship, and don't pay the balance. Ask the factory to sort through the goods, fix or replace the faulty ones, and then have them inspected again. To make this simple, agree three things in your purchase contract before production starts." },
      { ul: [
        "The balance is only due after an inspection has passed.",
        "The factory pays for any re-inspection after a failed one.",
        "The approved sample is the standard the goods are judged against.",
      ] },

      { h2: "Getting an inspection in China" },
      { p: "Book the inspection about a week before the goods will be ready, and send the inspector your specification and a photo of the approved sample. We carry out [pre-shipment inspections](/services/quality-inspection) with photo and video reports for any supplier in China." },
    ],
    faqs: [
      { q: "Which AQL should I use?", a: "For most consumer goods, 0 for critical faults, 2.5 for major and 4.0 for minor. For valuable or safety-sensitive products, use a stricter major level such as 1.0 or 1.5." },
      { q: "Does passing AQL mean there are no faults?", a: "No. AQL sampling accepts a small, known risk of faults in the whole order. A pass means the number of faults in the sample was within the limit you set." },
      { q: "Can an inspection replace lab testing?", a: "No. Certification tests such as CE, UKCA or CPSIA are done by accredited labs. An inspection checks that production matches the specification and the sample that was tested." },
    ],
    related: ["/services/quality-inspection", "/services/order-follow-up", "/guides/factory-audit-checklist", "/sourcing-for/amazon-sellers"],
  },

  {
    slug: "freight-forwarder-vs-sourcing-agent",
    takeaways: [
      "A sourcing agent helps you buy the right goods. A freight forwarder moves them.",
      "Where one hands over to the other depends on your Incoterm, such as EXW, FOB, CIF or DDP.",
      "Most importers need both.",
      "Things tend to go wrong between \"goods finished\" and \"goods on the ship\", so make sure someone owns that gap.",
    ],
    title: "Freight Forwarder vs Sourcing Agent: Who Does What?",
    h1: "Freight forwarder vs sourcing agent: who does what?",
    description: "The difference between a freight forwarder and a China sourcing agent, which one you need, and how they work together from the factory to your door.",
    summary: "A sourcing agent works on the buying side, finding suppliers, checking factories and goods, and managing production. A freight forwarder works on the shipping side, booking transport, preparing the transport documents and arranging customs clearance. Most importers need both, and the handover happens at the factory or the port.",
    published: "2026-10-20",
    updated: "2026-10-23",
    body: [
      { h2: "The short answer" },
      { table: { head: ["", "Sourcing agent", "Freight forwarder"], rows: [
        ["Main job", "Buying the right goods from the right factory", "Getting the goods from A to B"],
        ["Typical tasks", "Finding suppliers, quotes, samples, factory audits, following production, inspection", "Booking sea, air or rail freight, transport documents, customs clearance, insurance and delivery"],
        ["Works with", "Factories and you", "Carriers, ports, customs and you"],
        ["Usually paid by", "Commission, a project fee or a day rate", "Freight charges and service fees"],
        ["Responsible for product quality?", "Helps control it, through checks and inspections", "No"],
      ] } },

      { h2: "What a sourcing agent does" },
      { p: "A sourcing agent looks after you in China before the goods are ready. They find manufacturers, compare quotes, negotiate, collect samples, audit factories, follow production and inspect the goods." },
      { p: "What they're really worth is getting you the right product at the right price, and catching problems before you pay. Our guide to [what sourcing agents cost](/guides/china-sourcing-agent-cost) covers how they charge." },

      { h2: "What a freight forwarder does" },
      { p: "A freight forwarder takes over once the goods are packed. They book space with shipping lines, airlines or rail operators, and issue or arrange the bill of lading or air waybill. They handle export and import customs, either themselves or through partner brokers, and arrange delivery." },
      { p: "What they don't do is check whether the goods inside the cartons are right." },

      { h2: "Where the handover happens" },
      { p: "Where one hands over to the other depends on the Incoterm in your purchase contract. Incoterms are the standard trade terms published by the [International Chamber of Commerce](https://iccwbo.org/business-solutions/incoterms-rules/); the current version is Incoterms 2020." },
      { ul: [
        "With EXW, the forwarder collects from the factory and handles export clearance.",
        "With FOB, the factory delivers to the ship at the Chinese port, and your forwarder takes over from there.",
        "With CIF, the factory's forwarder carries the goods to your port, and your broker clears import customs.",
        "With DDP, a forwarder delivers to your address with the duties already paid.",
      ] },
      { p: "Things tend to go wrong in the gap between the goods being finished and the goods being on the ship. Goods go out unchecked, pick-ups get missed, and packing lists don't match the cartons. Someone needs to own that gap." },

      { h2: "Which one do you need?" },
      { table: { head: ["Your situation", "What you need"], rows: [
        ["You have a supplier you trust and just need the goods moved", "A freight forwarder"],
        ["You need a supplier, or you're not sure about the one you have", "A sourcing agent, then a forwarder"],
        ["You buy from several suppliers", "A sourcing agent to combine the orders, and a forwarder"],
        ["You can't visit China and quality really matters", "A sourcing agent for audits and inspections, and a forwarder"],
      ] } },

      { h2: "Can one company do both?" },
      { p: "Some sourcing agents are also licensed forwarders, and some forwarders offer basic inspections. More often, a sourcing agent works with partner forwarders, so you have one person to talk to without the agent carrying the goods itself." },
      { p: "That's how we work. We [arrange freight with partner forwarders](/services/shipping-coordination) once the goods have passed [inspection](/services/quality-inspection)." },

      { h2: "Questions to ask either one" },
      { ul: [
        "What exactly is included in the price, and what costs extra?",
        "Who's responsible if goods are damaged, delayed or held at customs?",
        "Is cargo insurance included, and for what value?",
        "Who will I deal with day to day, and in what language?",
      ] },
    ],
    faqs: [
      { q: "Is Sino Vorex a freight forwarder?", a: "No. We're a sourcing and export partner. We arrange freight with partner forwarders, who carry the goods and issue the transport documents." },
      { q: "Can my own forwarder collect goods you sourced?", a: "Yes. We'll agree the pick-up date and paperwork with your forwarder." },
      { q: "Who clears customs in my country?", a: "Your customs broker, or your forwarder's agent. If you ship DDP, the forwarder handles import clearance and pays the duties." },
    ],
    related: ["/services/shipping-coordination", "/guides/china-sourcing-agent-cost", "/services/product-sourcing"],
  },
];

/** Pillar guide first, then the practical guides, then the shipping guides. */
export const GUIDES: Article[] = [PILLAR_GUIDE, ...CORE_GUIDES, ...SHIPPING_GUIDES];

export const GUIDE_BY_SLUG = Object.fromEntries(GUIDES.map((g) => [g.slug, g]));
