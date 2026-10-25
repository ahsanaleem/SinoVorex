import type { ServiceContent } from "./services";

/**
 * Pages for the "doing business in China" services. Visa and company rules change, so these pages describe the
 * process and point to official sources; specific requirements are confirmed for each client.
 */
export const BUSINESS_CONTENT: Record<string, ServiceContent> = {
  "china-company-registration": {
    h1: "Register a Company in China (WFOE)",
    seoTitle: "Register a Company in China: WFOE Setup | SinoVorex",
    description: "Set up a company in China: WFOE registration, business scope, address, business licence, tax registration and bank account, explained step by step.",
    serviceType: "Company registration",
    glance: [
      "Most foreign businesses register a WFOE, a company you own 100%.",
      "There's no legal minimum capital, but what you commit must be paid in within five years.",
      "Registration and the bank account usually take around two to three months in total.",
      "You need a commercial address in China. A home address can't be used.",
    ],
    updated: "2026-10-25",
    body: [
      { h2: "Do you need a company in China?" },
      { p: "Not sure which structure you need? Our guide to [WFOE vs representative office](/guides/wfoe-vs-representative-office) compares the options." },
      { p: "Plenty of buyers never need one. If you only buy from Chinese factories and ship the goods home, you can do that from your own country, with a sourcing agent or on your own." },
      { p: "A company in China starts to make sense when you want to do things that need a local legal entity:" },
      { ul: [
        "Sign contracts, issue invoices (fapiao) and get paid in Chinese yuan.",
        "Hire staff in China on proper employment contracts.",
        "Run your own quality control or buying office close to your suppliers.",
        "Sell products or services to customers inside China.",
        "Rent an office or warehouse in your own name.",
      ] },

      { h2: "Which structure is right for you" },
      { table: { head: ["Structure", "What it is", "Can it trade and invoice?", "Good for"], rows: [
        ["WFOE (wholly foreign-owned enterprise)", "A limited liability company in China that you own 100%", "Yes", "Most foreign businesses: trading, services, sourcing offices"],
        ["Joint venture", "A company you own together with a Chinese partner", "Yes", "Industries where foreign ownership is restricted, or where a partner brings licences or customers"],
        ["Representative office", "A liaison office of your overseas company", "No, it can't sign sales contracts or invoice", "Market research and liaison only"],
      ] } },
      { p: "For most of our clients the answer is a WFOE. Some industries limit foreign ownership, and these are listed in China's Negative List for foreign investment, so checking your planned activity against that list is the first step." },

      { h2: "How registering a WFOE works" },
      { ol: [
        "Agree the plan. We go through what the company will do, which city it will be in, who the legal representative and directors will be, and how much capital you'll commit.",
        "Check the business scope. This is the list of activities written into your business licence. It has to cover everything you plan to do, and it has to be allowed for foreign investors.",
        "Choose a name and an address. The company needs a Chinese name and a commercial registered address. A home address can't be used.",
        "Prepare the documents. These include the articles of association and identity documents for the shareholders and directors. Documents from abroad usually need to be notarised and legalised or apostilled first.",
        "Register with the market regulator. Once approved, the company receives its business licence.",
        "Finish the set-up. That means carving the company seals, registering for tax, opening a corporate bank account and a capital account, setting up social insurance if you hire staff, and filing the foreign investment information report.",
      ] },

      { h2: "Registered capital" },
      { p: "There's no legal minimum registered capital for most WFOEs. But under the Company Law in force since July 2024, the capital you subscribe has to be paid in within five years of the company being set up." },
      { p: "So the number should be realistic. It needs to be enough to cover your costs until the company earns money, without committing to more than you're ready to put in. In practice, the authorities and banks also look at whether the capital fits the business you describe." },

      { h2: "How long it takes" },
      { table: { caption: "Typical timings. They vary by city, by industry, and by how quickly documents arrive from abroad.", head: ["Stage", "Typical time"], rows: [
        ["Planning, business scope and address", "1 to 3 weeks"],
        ["Notarising and legalising documents abroad", "2 to 4 weeks, depending on your country"],
        ["Registration and business licence", "2 to 4 weeks"],
        ["Seals, tax registration and bank account", "4 to 8 weeks"],
      ] } },
      { p: "Put together, most companies are fully up and running in around two to three months." },

      { h2: "After registration: staying compliant" },
      { ul: [
        "Monthly or quarterly tax filings, even when the company has no income.",
        "Bookkeeping to Chinese accounting standards.",
        "A yearly audit and annual reports to the authorities.",
        "Keeping the registered address, business scope and company details up to date.",
      ] },
      { p: "Missing these can lead to fines, a poor credit record for the company, or problems with the bank. We can introduce you to accountants who look after this for you." },

      { h2: "Why set up in Suzhou" },
      { p: "We're based in Suzhou, a short train ride from Shanghai, in one of China's busiest manufacturing regions. Suzhou has a large international business community, industrial parks with experience of foreign companies, and easy access to the ports of Shanghai and Ningbo. We can also help you register in another city if that suits your business better." },
    ],
    faqs: [
      { q: "Can a foreigner own 100% of a company in China?", a: "Yes, through a WFOE, in most industries. Some industries limit or ban foreign ownership, and these are set out in the Negative List for foreign investment." },
      { q: "Do I need to live in China to have a company there?", a: "No. The legal representative and directors don't have to live in China, although some tasks, like opening the bank account, can need a visit or extra checks." },
      { q: "How much does it cost to set up a WFOE?", a: "It depends on the city, the business scope and how much help you need with accounting afterwards. We confirm the cost in writing before we start." },
      { q: "Can my China company buy from factories for my business abroad?", a: "Yes, if the business scope covers it. Many clients use a WFOE as a sourcing and quality-control office, and our [product sourcing](/services/product-sourcing) team can work alongside it." },
    ],
  },

  "china-visa-help": {
    h1: "China Business & Tourist Visa Help",
    seoTitle: "China Business Visa (M) & Tourist Visa Help | SinoVorex",
    description: "Help with China visas: whether you can enter visa-free, business (M) and tourist (L) visas, invitation letters, documents, and planning your trip.",
    serviceType: "Visa assistance",
    glance: [
      "Citizens of many countries can now visit China for up to 30 days without a visa.",
      "Business trips usually need an M visa, with an invitation letter from a Chinese company.",
      "Tourist trips use an L visa, with your travel plans and hotel bookings.",
      "The rules change often, so we check them for your nationality before you book.",
    ],
    updated: "2026-10-25",
    body: [
      { h2: "First: do you need a visa at all?" },
      { p: "China has opened up a lot for visitors. Before you start an application, it's worth checking whether you need one." },
      { ul: [
        "Visa-free entry. Ordinary passport holders from around 50 countries, including most of Europe, the UK, Canada, Australia, New Zealand, Japan and South Korea, can currently visit China for up to 30 days without a visa, for business, tourism, visiting family or transit. This policy currently runs until 31 December 2026.",
        "Mutual visa-exemption agreements. Countries such as Singapore, Malaysia and Thailand have their own agreements with China, with their own rules on length of stay.",
        "240-hour visa-free transit. Travellers from 57 countries, including the United States, can stay up to 10 days without a visa if they're travelling on to a third country, entering and leaving through one of 65 approved ports.",
      ] },
      { p: "These rules change often, and they don't cover work, study or journalism. Check the latest list from China's National Immigration Administration or your nearest Chinese embassy, or ask us to check for your nationality." },

      { h2: "Which visa you need" },
      { table: { head: ["Visa", "For", "Main extra documents"], rows: [
        ["M visa (business)", "Meetings, factory visits, trade fairs, buying trips", "An invitation letter from a Chinese company or trade fair"],
        ["L visa (tourist)", "Holidays and visiting places", "Return flights and hotel bookings, or a travel itinerary"],
        ["Z visa (work)", "Working for an employer in China", "A work permit notice issued in China first"],
      ] } },
      { p: "If your trip mixes business and sightseeing, the M visa is usually the right choice. You can't work in China on an M or L visa, and you can't work while visiting visa-free either." },

      { h2: "The business visa invitation letter" },
      { p: "Most M visa applications need an invitation letter from a company or organisation in China. It normally includes:" },
      { ul: [
        "Your full name, date of birth, nationality and passport number.",
        "The purpose of the visit, for example factory visits or a trade fair.",
        "Your planned arrival and departure dates, and the places you'll visit.",
        "Who pays for the trip.",
        "The inviting company's name, address, contact person and official seal or signature.",
      ] },
      { p: "If we're arranging your visits to suppliers, we can provide this letter for you. For the Canton Fair, registered overseas buyers can also get an invitation from the fair itself." },

      { h2: "What a typical application includes" },
      { ul: [
        "A passport with at least six months left and at least one blank visa page.",
        "The completed online application form and a recent photo.",
        "The invitation letter (M visa), or flight and hotel bookings (L visa).",
        "Sometimes proof of employment or company registration, and bank statements.",
        "If you apply outside your home country, proof that you live there legally.",
      ] },
      { p: "Applications are made through the Chinese embassy, consulate, or [Chinese Visa Application Service Center](https://www.visaforchina.cn) that covers where you live. Requirements differ a little between them, so always check the list for your centre." },

      { h2: "How we help" },
      { ol: [
        "We check whether you can travel visa-free, based on your passport and your trip.",
        "If you need a visa, we tell you which type, and what your application should include.",
        "For business trips we arrange, we prepare the invitation letter.",
        "We look over your documents before you submit them, so nothing obvious is missing.",
        "We help you plan the trip itself: flights, hotels, and getting between cities.",
      ] },
      { p: "We don't issue visas. That decision is always made by the Chinese embassy or consulate. What we do is help you apply correctly the first time." },

      { h2: "Planning your trip around the visa" },
      { p: "Allow time. Embassies usually take a few working days to process an application, and more in busy seasons. Apply well before trade fairs, when everyone is applying at once. If you're coming for the [Canton Fair or factory visits](/services/china-business-trips), we can plan the visa and the trip together." },
    ],
    faqs: [
      { q: "Can I visit factories on visa-free entry?", a: "Yes. If your nationality qualifies, visa-free entry covers business visits such as meetings and factory visits for up to 30 days. It doesn't cover work." },
      { q: "Can you get my visa approved?", a: "No one can promise that. The embassy or consulate decides. We help you choose the right visa and send a complete, correct application." },
      { q: "I'm from the United States. Do I need a visa?", a: "US citizens aren't currently on the 30-day visa-free list, so most trips need a visa. If you're travelling on to a third country, the 240-hour visa-free transit may work instead." },
      { q: "How long is an M visa valid for?", a: "It depends on what the embassy grants. Single-entry, multiple-entry and longer-validity visas are all possible, depending on your nationality and history of visits." },
    ],
  },

  "china-business-trips": {
    h1: "Business Trips to China & Canton Fair Tours",
    seoTitle: "Business Trips to China & Canton Fair Tours | SinoVorex",
    description: "Plan a business trip to China: Canton Fair visits, factory tours, Yiwu market and trade fairs, with a bilingual guide, booked meetings and help with travel.",
    serviceType: "Business travel planning",
    glance: [
      "We plan the trip around the factories, fairs and markets you want to see.",
      "Meetings are booked before you fly, and a bilingual guide comes with you.",
      "The Canton Fair runs twice a year in Guangzhou, each time in three phases.",
      "We help with hotels, trains and visas, so you can focus on the suppliers.",
    ],
    updated: "2026-10-25",
    body: [
      { h2: "Why visit China in person" },
      { p: "Seeing a factory, handling the products and meeting the owner tells you things that no video call can. A well-planned trip can shortlist suppliers, settle samples and build relationships in a week." },
      { p: "A badly planned trip, though, means long journeys between half-empty showrooms. Planning is what makes the difference." },

      { h2: "What we arrange" },
      { ul: [
        "An itinerary built around your products, with factories grouped by area to save travel time.",
        "Meetings booked in advance, so the right people are there when you arrive.",
        "A bilingual guide who comes to every visit, translates, and asks the questions you might not know to ask.",
        "Help with hotels, high-speed trains, domestic flights and transfers.",
        "Notes and photos from every visit, so you can compare suppliers afterwards.",
        "Follow-up after you leave: samples, quotes and orders, through our [sourcing service](/services/product-sourcing).",
      ] },

      { h2: "The Canton Fair" },
      { p: "The [China Import and Export Fair](https://www.cantonfair.org.cn/en-US), better known as the Canton Fair, is the biggest trade fair in China. It's held twice a year at the fair complex in Pazhou, Guangzhou, and each session is split into three phases of about five days, each covering different product groups." },
      { table: { caption: "The usual pattern. Exact dates and product groups are published by the fair for each session.", head: ["Phase", "Usual timing", "Main product groups"], rows: [
        ["Phase 1", "Mid April / mid October", "Electronics, home appliances, machinery, vehicles, hardware, new energy"],
        ["Phase 2", "Late April / late October", "Housewares, kitchenware, gifts, decorations, furniture, building materials"],
        ["Phase 3", "Early May / early November", "Textiles, garments, shoes, toys, bags, office supplies, health and food"],
      ] } },
      { p: "Our [Canton Fair guide for buyers](/guides/canton-fair-guide) covers registration, planning your days and what to ask exhibitors." },
      { p: "Most buyers only need one phase, so pick the one that matches your products. Overseas buyers register with the fair online for a buyer badge, and the fair can issue an invitation letter for your visa." },

      { h2: "How we help at the Canton Fair" },
      { ol: [
        "Choosing the right phase and planning which halls and booths to visit.",
        "Help registering for your buyer badge, and booking a hotel near the fair early.",
        "A bilingual guide at the fair, to talk to exhibitors, ask for prices and MOQs, and note everything down.",
        "Factory visits after the fair, to check that the suppliers you met really make what they showed.",
        "Following up on quotes and samples once you're home.",
      ] },
      { p: "A stand at a fair doesn't prove a supplier is a factory. Plenty of exhibitors are traders. A visit to the production site is the best way to be sure, and our [factory audit checklist](/guides/factory-audit-checklist) shows what to look at." },

      { h2: "Other trips we plan" },
      { table: { head: ["Trip", "Good for"], rows: [
        ["Factory tours around Suzhou, Shanghai and Zhejiang", "Textiles, packaging, home goods, electronics, machinery"],
        ["Yiwu International Trade City", "Small goods, gifts, accessories and mixed orders"],
        ["Other trade fairs in Shanghai, Shenzhen and Guangzhou", "Industry-specific shows"],
        ["A single supplier visit", "Meeting a factory before a big order, or checking production"],
      ] } },

      { h2: "Before you travel" },
      { ul: [
        "Check whether you need a visa. Many nationalities can now visit for up to 30 days visa-free, and our [visa help page](/services/china-visa-help) explains the options.",
        "Set up a way to pay. Most payments in China are made with mobile apps such as Alipay and WeChat Pay, which can now link to many foreign cards.",
        "Plan for internet access, as some foreign apps and websites don't work in China without a roaming plan or other arrangements.",
        "Bring business cards, and samples or photos of what you want to buy.",
      ] },
    ],
    faqs: [
      { q: "When is the next Canton Fair?", a: "The fair runs every spring (mid April to early May) and autumn (mid October to early November). Check the official Canton Fair website for the exact dates of each session." },
      { q: "Do I need a guide at the Canton Fair?", a: "You can visit on your own, but many exhibitors speak limited English, and a guide helps you get real prices, MOQs and details, and saves time." },
      { q: "Can you arrange factory visits after the fair?", a: "Yes. Most of our clients combine the fair with a few factory visits, so they can see production for themselves." },
      { q: "Can you help with my visa for the trip?", a: "Yes. We check whether you need one, and for trips we arrange we can provide the invitation letter. See our [visa help page](/services/china-visa-help)." },
    ],
  },
};
