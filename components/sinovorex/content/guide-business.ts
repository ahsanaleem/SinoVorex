import type { Article } from "./types";

/** Guides supporting the "doing business in China" services. */
export const BUSINESS_GUIDES: Article[] = [
  {
    slug: "canton-fair-guide",
    title: "Canton Fair Guide for Buyers: Dates, Registration & Tips",
    h1: "Canton Fair guide for buyers",
    description: "A buyer's guide to the Canton Fair: when it runs, the three phases, free badge registration, visa invitation letters and how to judge exhibitors.",
    summary: "The Canton Fair (China Import and Export Fair) is held twice a year in Guangzhou, in spring and autumn, each time in three phases of about five days with different products in each. Overseas buyers get a free buyer badge by pre-registering online, and can get an invitation letter for their visa at the same time.",
    takeaways: [
      "The fair runs every spring (mid April to early May) and autumn (mid October to early November) in Guangzhou.",
      "Each session has three phases with different products, so most buyers only need one.",
      "Pre-register online for a free buyer badge; the system can also issue a visa invitation letter.",
      "A booth doesn't prove someone is a factory, so plan factory visits after the fair.",
    ],
    published: "2026-10-25",
    updated: "2026-10-25",
    body: [
      { h2: "What the Canton Fair is" },
      { p: "The [China Import and Export Fair](https://www.cantonfair.org.cn/en-US), usually called the Canton Fair, is China's largest trade fair. It's held at the fair complex in Pazhou, Guangzhou, and brings together tens of thousands of Chinese exporters across almost every product category." },
      { p: "For buyers, it's the quickest way to see a lot of suppliers in one place, compare products side by side and meet the people behind them." },

      { h2: "When it runs" },
      { p: "There are two sessions a year, each split into three phases of about five days, with a few days between phases while the halls are changed over." },
      { table: { caption: "The usual pattern. The fair publishes the exact dates for each session on its official website.", head: ["Session", "Phase 1", "Phase 2", "Phase 3"], rows: [
        ["Spring", "Mid April", "Late April", "Early May"],
        ["Autumn", "Mid October", "Late October", "Early November"],
      ] } },
      { p: "Each phase is open from about 9:30 in the morning to 6 in the evening. Hotels near the fair fill up and get expensive, so book as early as you can." },

      { h2: "Which phase to visit" },
      { table: { head: ["Phase", "Main product groups"], rows: [
        ["Phase 1", "Electronics, home appliances, lighting, machinery, vehicles and parts, hardware, tools, new energy"],
        ["Phase 2", "Housewares, kitchenware, ceramics, gifts, decorations, garden products, furniture, building materials"],
        ["Phase 3", "Textiles, garments, shoes, bags, toys, office supplies, health and personal care, food"],
      ] } },
      { p: "Check the official category list for the session you plan to visit, because product groups sometimes move between phases." },

      { h2: "How to register as a buyer" },
      { ol: [
        "Pre-register online through the fair's buyer service system or app, before the session starts.",
        "Enter your passport details and company details, and upload a photo and a scan of your passport.",
        "Request an invitation letter during registration if you need a visa. The system issues it once your registration is accepted.",
        "Collect your badge at one of the badge offices, or at the fair, with your original passport.",
      ] },
      { p: "Pre-registering online gets you the badge free of charge. Buyers who register on site may pay a fee." },

      { h2: "Visa and travel" },
      { p: "Many nationalities can now visit China for up to 30 days without a visa. If you do need one, a business (M) visa is the usual choice, and the fair's invitation letter supports your application. Our [China visa help page](/services/china-visa-help) explains the options." },
      { p: "Guangzhou has a large international airport and is well connected by high-speed rail, including to Hong Kong and Shenzhen. The fair complex is reached by metro from the city centre." },

      { h2: "How to plan your days at the fair" },
      { ul: [
        "Make a list of the products you want, with target prices and quantities, before you arrive.",
        "Use the fair's online exhibitor search to shortlist halls and booths in advance.",
        "Plan one or two halls per half-day. The complex is huge and walking it all is exhausting.",
        "Bring plenty of business cards, and photos or samples of what you're looking for.",
        "Take a photo of each booth, its products and the supplier's card, so you can match them up later.",
      ] },

      { h2: "Questions to ask exhibitors" },
      { ul: [
        "Are you the manufacturer, or a trading company? Where is the factory?",
        "What's the MOQ for this product, and is there a lower MOQ for a first order?",
        "What's the price at my quantity, and on which Incoterm (usually FOB)?",
        "What's the lead time for samples, and for production?",
        "Which markets do you export to, and which certificates do you have for my market?",
      ] },
      { p: "Note the answers straight away. After a few dozen booths, they start to blur together." },

      { h2: "Telling factories from traders" },
      { p: "Plenty of exhibitors are trading companies. That's not always a problem, but you should know who you're dealing with. A narrow product range, technical answers about production and a willingness to show you the factory are good signs. A huge mixed range, vague answers and reluctance to share the factory address are signs of a trader." },
      { p: "The only way to be sure is to visit. Our [factory audit checklist](/guides/factory-audit-checklist) covers what to look at, and many buyers book a few factory visits for the days after their phase." },

      { h2: "After the fair" },
      { ol: [
        "Sort your notes and cards the same evening, while you still remember each booth.",
        "Send follow-up emails within a week, with your specification, so every supplier quotes on the same basis.",
        "Compare quotes properly, including MOQ, tooling and lead times, not just the unit price.",
        "Order samples from the best two or three, and check out each supplier before you pay a deposit.",
      ] },
      { p: "If you'd like help on the ground, we plan [Canton Fair trips](/services/china-business-trips) with a bilingual guide, factory visits after the fair, and follow-up on samples and quotes." },
    ],
    faqs: [
      { q: "Is the Canton Fair free for buyers?", a: "Yes, for overseas buyers who pre-register online for their first badge. Registering on site can mean paying a fee." },
      { q: "Which Canton Fair phase is best for me?", a: "The one that covers your products. Phase 1 is mostly electronics and machinery, phase 2 home goods and gifts, and phase 3 textiles, toys and consumer goods." },
      { q: "Can I buy small quantities at the Canton Fair?", a: "Some exhibitors take small trial orders, but most are looking for regular export orders. Ask about MOQs at the booth, and look for suppliers who offer a lower MOQ for a first order." },
      { q: "Do I need an interpreter?", a: "Many exhibitors speak some English, but detailed questions about materials, prices and production are much easier with someone who speaks Chinese." },
    ],
    related: ["/services/china-business-trips", "/services/china-visa-help", "/guides/factory-audit-checklist"],
  },

  {
    slug: "wfoe-vs-representative-office",
    title: "WFOE vs Representative Office in China: Which Do You Need?",
    h1: "WFOE vs representative office: which China entity do you need?",
    description: "WFOE, representative office or joint venture? What each can and can't do in China, how they're taxed, and when you don't need a China entity at all.",
    summary: "A WFOE is a company in China that you own 100%. It can sign contracts, invoice customers and hire staff. A representative office is only a liaison office: it can't sell, invoice or employ staff directly. Most foreign businesses that want to trade or operate in China choose a WFOE.",
    takeaways: [
      "A WFOE can trade, invoice in yuan and hire staff. A representative office can't.",
      "A representative office suits market research and liaison, and is taxed on its spending.",
      "A joint venture is mainly for industries where foreign ownership is restricted.",
      "If you only buy from China and ship home, you may not need a China entity at all.",
    ],
    published: "2026-10-25",
    updated: "2026-10-25",
    body: [
      { h2: "The short answer" },
      { table: { head: ["", "WFOE", "Representative office", "Joint venture"], rows: [
        ["What it is", "A limited liability company you own 100%", "A liaison office of your overseas company", "A company owned with a Chinese partner"],
        ["Sign sales contracts and invoice (fapiao)", "Yes", "No", "Yes"],
        ["Hire staff directly", "Yes", "No, only through an employment agency", "Yes"],
        ["Liability", "Limited to the company", "Your parent company is responsible", "Limited to the company"],
        ["How it's taxed", "On its profits", "Usually on a share of its spending", "On its profits"],
        ["Best for", "Trading, services, sourcing and QC offices", "Research, liaison, supporting the parent", "Restricted industries, or a partner with licences or customers"],
      ] } },

      { h2: "What a WFOE is" },
      { p: "\"WFOE\" stands for wholly foreign-owned enterprise. Since the Foreign Investment Law took full effect, foreign-owned companies follow the same Company Law as Chinese ones, but WFOE is still the name everyone uses." },
      { p: "In practice, a WFOE is an ordinary Chinese limited liability company that happens to be owned by you or your overseas company. It has a business licence, a defined business scope, its own bank accounts, and can do everything its scope allows: buy, sell, invoice, hire and rent premises." },

      { h2: "What a representative office can and can't do" },
      { p: "A representative office is an extension of your overseas company, not a separate company. It's useful for being present in China without trading there." },
      { ul: [
        "It can do market research, liaise with suppliers and customers, and support your parent company's business.",
        "It can't sign sales contracts, issue invoices or earn revenue in China.",
        "It can't employ local staff directly. They're hired through an approved employment agency.",
        "It's usually taxed on a share of its spending, even though it doesn't earn anything.",
        "Your parent company is responsible for its obligations.",
      ] },
      { p: "Representative offices are quicker to set up than a company, but many businesses outgrow them and later register a WFOE." },

      { h2: "When a joint venture makes sense" },
      { p: "Some industries limit or ban foreign ownership. They're listed in China's Negative List for foreign investment. In those areas, a joint venture with a Chinese partner may be the only route. A joint venture can also make sense if a partner brings licences, land or customers you can't easily get yourself. The trade-off is shared control, so the agreement between partners matters a great deal." },

      { h2: "Do you need a China entity at all?" },
      { p: "Often you don't. If you buy from Chinese factories and ship the goods to your own country, you can do that from home. A sourcing agent can look after suppliers, quality and shipping for you without you needing a company in China." },
      { p: "A China entity is worth it when you want to sell inside China, hire your own team there, invoice in yuan, or run your own buying and quality-control office." },

      { h2: "How to decide" },
      { table: { head: ["If you want to", "Choose"], rows: [
        ["Buy from China and ship home", "No entity needed. Use a sourcing agent, or buy direct"],
        ["Research the market or liaise with suppliers, without selling", "Representative office"],
        ["Sell in China, invoice, or hire your own staff", "WFOE"],
        ["Run your own sourcing or QC office", "WFOE"],
        ["Operate in a restricted industry", "Joint venture, if allowed"],
      ] } },

      { h2: "Setting up" },
      { p: "Registering a WFOE involves choosing the business scope, a registered commercial address, preparing documents, registration with the market regulator, then tax registration and a bank account. Most are fully set up in around two to three months. Our [company registration service](/services/china-company-registration) explains each step and can handle it for you." },
    ],
    faqs: [
      { q: "Can a representative office invoice customers?", a: "No. A representative office can't sign sales contracts or issue invoices. It's only for liaison and support activities." },
      { q: "Is a WFOE expensive to run?", a: "It needs bookkeeping, monthly or quarterly tax filings, a yearly audit and annual reports, even when it has no income. Budget for an accountant from the start." },
      { q: "Can I convert a representative office into a WFOE?", a: "Not directly. You set up a new WFOE and then close the representative office, which has its own deregistration process." },
    ],
    related: ["/services/china-company-registration", "/guides/china-sourcing-agent", "/services/product-sourcing"],
  },
];
