import {
  Search, Factory, ClipboardCheck, ListChecks, Ship, Package, MessageSquareText,
  MapPin, Workflow, UserRound, Languages, UtensilsCrossed, Box, Shirt, CookingPot, Building2, Stamp, PlaneTakeoff, type LucideIcon,
} from "lucide-react";

/* ── Company & contact details (must match the business licence) ── */
export const COMPANY = {
  /** Exactly as on the business licence. "Sino Vorex" is the brand; there is no official English legal name. */
  legalNameZh: "苏州智贸通贸易咨询服务有限公司",
  /** Unofficial English rendering of the legal name, shown as a gloss only. */
  legalNameEnGloss: "Suzhou Zhimaotong Trade Consulting Service Co., Ltd.",
  brand: "Sino Vorex",
  email: "business@sinovorex.com",
  phoneDisplay: "+86 137 7050 4359",
  phoneHref: "tel:+8613770504359",
  whatsappHref: "https://wa.me/8613770504359",
  wechatId: "13770504359",
  /** Registered address, exactly as on the licence, plus an English rendering. */
  addressZh: "苏州市姑苏区山塘街504号G239",
  address: "G239, No. 504 Shantang Street, Gusu District, Suzhou, Jiangsu, China",
  /** 统一社会信用代码 (18 characters). Shown in the footer, About and schema `taxID` once filled in. FILL THIS IN. */
  licenceNo: "",
  /** ICP 备案号. Only needed if the site is hosted on a mainland-China server. */
  icp: "",
  /** Year the company was established (from the business licence), e.g. "2024". Shown on /about once filled in. */
  foundedYear: "",
  /** Official profile URLs (LinkedIn company page, Google Business Profile, Made-in-China, Global Sources…). Feeds schema `sameAs` and the About page. */
  sameAs: [] as string[],
};

/** Named team members for /about. Real people only; leave empty until you have names and (ideally) photos in public/team/. */
export const TEAM: { name: string; role: string; bio: string; photo?: string; linkedin?: string }[] = [];

/** Date each standalone page's content last changed (ISO). Used for sitemap lastmod and visible "Updated" dates. */
export const PAGE_UPDATED = {
  home: "2026-10-25",
  services: "2026-10-25",
  guides: "2026-10-25",
  about: "2026-10-20",
  quote: "2026-10-23",
  sourcingFor: "2026-10-23",
  markets: "2026-10-25",
  tools: "2026-10-25",
  privacy: "2026-10-16",
  terms: "2026-10-16",
};

export const NAV_LINKS = [
  { label: "How it works", id: "how-it-works" },
  { label: "Services", id: "services" },
  { label: "Products", id: "products" },
  { label: "Shipping", id: "shipping" },
  { label: "About", id: "about" },
  { label: "FAQ", id: "faq" },
];

export type Service = {
  slug: string; num: string; title: string; detail: string[]; desc: string; icon: LucideIcon;
  includes: string[]; youReceive: string;
};

export const SERVICES: Service[] = [
  { slug: "product-sourcing", num: "01", title: "Product Sourcing", detail: ["Supplier search", "Quotes", "Samples"], icon: Search,
    desc: "Tell us what you need. We find suitable manufacturers across China and compare quotes for your product, budget and volume.",
    includes: ["Searching for manufacturers that make your product, not just traders", "Collecting and comparing quotes, MOQs and lead times", "Asking the right technical questions in Chinese", "Shortlisting the best options with our notes"],
    youReceive: "A shortlist of suitable factories with prices, MOQs, lead times and our recommendation." },
  { slug: "factory-vetting", num: "02", title: "Factory Vetting", detail: ["Factory visits", "Background checks"], icon: Factory,
    desc: "Before you commit, we visit the factory and check how much it can make, what it has made before, and whether it can really deliver what it promises.",
    includes: ["Checking the company's registration details", "On-site visits to see the production lines", "Reviewing capacity, equipment and past orders", "Flagging risks before you pay a deposit"],
    youReceive: "A factory report with photos and a clear answer on whether to go ahead." },
  { slug: "quality-inspection", num: "03", title: "Quality Inspection", detail: ["Pre-shipment", "Photo reports"], icon: ClipboardCheck,
    desc: "Goods are checked against your specifications before they leave the factory, with a photo report so problems are caught early.",
    includes: ["Checks against your approved sample and specifications", "Counting quantities and checking packaging and labels", "Photo and video evidence of what was found", "Agreeing fixes with the factory before shipment"],
    youReceive: "An inspection report with photos and video, sent before you pay the balance." },
  { slug: "order-follow-up", num: "04", title: "Order Follow-up", detail: ["Production tracking", "Bilingual"], icon: ListChecks,
    desc: "We keep in touch with the factory through production, in Chinese and English, and keep you updated on progress and timelines.",
    includes: ["Confirming specs, artwork and packaging with the factory", "Tracking production against the agreed schedule", "Raising delays early and finding solutions", "Regular updates in English"],
    youReceive: "Progress updates with photos at key stages of production." },
  { slug: "shipping-coordination", num: "05", title: "Shipping Coordination", detail: ["Sea", "Air", "Rail"], icon: Ship,
    desc: "We arrange sea, air or rail freight with partner forwarders and keep the paperwork moving, from the factory door to your port.",
    includes: ["Comparing freight options and quotes from partner forwarders", "Booking pickup from the factory", "Coordinating export paperwork with the forwarder", "Sharing tracking details until arrival"],
    youReceive: "A freight quote, booking confirmation and shipping documents for your shipment." },
  { slug: "samples-consolidation", num: "06", title: "Samples & Consolidation", detail: ["Sample handling", "Multi-supplier"], icon: Package,
    desc: "We collect samples for your approval and combine goods from several suppliers into one shipment to save on freight.",
    includes: ["Ordering and collecting samples from several factories", "Checking and photographing samples before forwarding", "Receiving goods from multiple suppliers", "Combining them into one shipment"],
    youReceive: "Samples sent to you together, and one consolidated shipment instead of several." },
];

/** Services for doing business in China, beyond sourcing. Same page template as SERVICES, shown as their own group. */
export const BUSINESS_SERVICES: Service[] = [
  { slug: "china-company-registration", num: "07", title: "Company Registration", detail: ["WFOE", "Business licence", "Bank account"], icon: Building2,
    desc: "We help you set up your own company in China, usually a WFOE, from choosing the structure and address to the business licence, tax registration and bank account.",
    includes: ["Advice on the right structure for what you plan to do", "Checking your business scope against the rules for foreign investors", "Preparing and filing the registration documents in Chinese", "Tax registration, company seals and opening a bank account"],
    youReceive: "A registered company with its business licence, seals, tax registration and a corporate bank account." },
  { slug: "china-visa-help", num: "08", title: "Business & Tourist Visa Help", detail: ["M visa", "L visa", "Invitation letters"], icon: Stamp,
    desc: "We help you work out whether you need a visa for China, which one, and what to send with it, including the invitation letter for a business visa.",
    includes: ["Checking whether you can enter visa-free or need a visa", "Explaining the right visa type for your trip", "An invitation letter for business visits we arrange", "Checking your documents before you apply"],
    youReceive: "A clear answer on what you need, and a complete, checked set of documents for your application." },
  { slug: "china-business-trips", num: "09", title: "Business Trips & Canton Fair", detail: ["Factory visits", "Canton Fair", "Interpreter"], icon: PlaneTakeoff,
    desc: "We plan and run business trips to China: factory visits, the Canton Fair and other trade fairs, markets such as Yiwu, with a bilingual guide alongside you.",
    includes: ["Planning an itinerary around the factories and fairs you want to see", "Booking factory visits and meetings in advance", "A bilingual guide and interpreter for your visits", "Help with hotels, trains and getting around"],
    youReceive: "A planned trip with meetings booked, someone beside you who speaks Chinese, and notes from every visit." },
];

/** Every service with its own page (sourcing services first). */
export const ALL_SERVICES: Service[] = [...SERVICES, ...BUSINESS_SERVICES];

/* How it works: replaces the old numeric stats strip; describes the service, makes no claims. */
export const PROCESS: { step: string; title: string; desc: string; we: string; you: string; icon: LucideIcon; href: string }[] = [
  { step: "01", title: "Inquiry",    icon: MessageSquareText, href: "/quote",                          desc: "Send us your product, quantity, target price and destination.",      we: "Reply within 24 hours",        you: "Send product details" },
  { step: "02", title: "Sourcing",   icon: Search,            href: "/services/product-sourcing",      desc: "We shortlist suitable factories across China and compare quotes.",   we: "Shortlist & compare factories", you: "Choose a factory" },
  { step: "03", title: "Samples",    icon: Package,           href: "/services/samples-consolidation", desc: "Samples are collected and checked, then sent for your approval.",    we: "Collect & check samples",       you: "Approve the sample" },
  { step: "04", title: "Production", icon: Factory,           href: "/services/order-follow-up",       desc: "We follow production with the factory and keep you updated.",       we: "Track production",              you: "Pay the deposit" },
  { step: "05", title: "Inspection", icon: ClipboardCheck,    href: "/services/quality-inspection",    desc: "Goods are inspected against your specs before the balance is paid.", we: "Inspect & send photo report",   you: "Review, then pay balance" },
  { step: "06", title: "Shipping",   icon: Ship,              href: "/services/shipping-coordination", desc: "Freight is booked by sea, air or rail to your destination.",        we: "Book freight & share tracking", you: "Receive your goods" },
];

/** `photo`: representative AI-generated images (public/products). Replace with photos of real products when available; remove `photo` to fall back to the icon. */
export const PRODUCTS: { title: string; desc: string; items: string[]; icon: LucideIcon; photo?: string }[] = [
  { title: "Hotel & Café Supplies", photo: "/products/hotel-cafe.jpg", icon: UtensilsCrossed, desc: "For hotels, restaurants and cafés.",    items: ["Tableware & glassware", "Linens & towels", "Guest amenities", "Café equipment"] },
  { title: "Packaging", photo: "/products/packaging.jpg",             icon: Box,             desc: "Branded and plain packaging at scale.", items: ["Boxes & cartons", "Paper & poly bags", "Labels & stickers", "Printed packaging"] },
  { title: "Textiles & Apparel", photo: "/products/textiles.jpg",    icon: Shirt,           desc: "Fabrics, garments and home textiles.",  items: ["Fabrics", "Uniforms & workwear", "Garments", "Home textiles"] },
  { title: "Home & Kitchen Goods", photo: "/products/home-kitchen.jpg",  icon: CookingPot,      desc: "Everyday household products.",          items: ["Cookware", "Storage & organisers", "Kitchen tools", "Small household items"] },
];

export const QC_POINTS = [
  { title: "Factory audits",         desc: "Before you order, we visit the factory and check registration, production lines, capacity and past work." },
  { title: "Pre-shipment inspection", desc: "Before the goods leave, we check the quantity, workmanship, function, packaging and labels against your approved sample." },
  { title: "Photo & video reports",  desc: "You receive photos and video of what we found, so you can approve or ask for fixes before paying the balance." },
];

export const SHIPPING_MODES = [
  { mode: "Sea freight",  time: "About 15 to 45 days", desc: "The best value for large or heavy orders, in a full container (FCL) or a shared one (LCL)." },
  { mode: "Air freight",  time: "About 3 to 10 days",  desc: "For samples and urgent or valuable goods. Faster, and priced by weight." },
  { mode: "Rail freight", time: "About 15 to 25 days to Europe", desc: "Rail to Europe and Central Asia is faster than sea and cheaper than air." },
];

export const INCOTERMS = [
  { term: "FOB", name: "Free On Board",                desc: "The factory delivers goods onto the ship at the Chinese port. You arrange and pay for the sea freight and everything after." },
  { term: "CIF", name: "Cost, Insurance & Freight",     desc: "Freight and insurance to your destination port are included in the price. You handle import clearance and delivery from the port." },
  { term: "DDP", name: "Delivered Duty Paid",           desc: "Delivered to your address with import duties paid. Arranged with partner forwarders where available for your country." },
];

export const FEES = {
  summary: "We charge a commission on the order value. The rate depends on the product and order size and is confirmed in writing in your quote before any work starts.",
  /** Your published commission range, e.g. "5 to 8% of the order value". Shown in the fees section once filled in. FILL THIS IN. */
  commissionRange: "",
  /** Your published on-site rate, e.g. "US$250 per inspector-day". Shown once filled in. */
  inspectionRate: "",
  payments: ["T/T (bank transfer)", "Terms agreed per order"],
  deposit: "Factories usually ask for a deposit before production and the balance before shipment. We tell you the exact terms for each factory in your quote, and recommend paying the balance only after inspection.",
};

export const FAQ = [
  { q: "What is the minimum order quantity (MOQ)?", a: "Each factory sets its own, and it depends on the product. Stock products can start at a few hundred units, while custom products often need a thousand or more. We include the MOQ in every quote, and look for factories that accept smaller first orders where we can." },
  { q: "Can I get samples before ordering?", a: "Yes. We collect samples from shortlisted factories, check them, and send them to you for approval. Sample and courier costs are quoted upfront." },
  { q: "How do payments work?", a: "Payment terms are agreed per order and confirmed in writing. Factories usually ask for a deposit before production and the balance before shipment. We recommend paying the balance only after the inspection report." },
  { q: "How long does an order take?", a: "A first order usually takes two to four months from first contact to delivery. That's about one to two weeks to find suppliers, one to three weeks for samples, three to six weeks of production, then shipping, which takes about 3 to 10 days by air or 15 to 45 days by sea. Your quote includes a timeline for your product." },
  { q: "Who pays for shipping?", a: "It depends on the Incoterm you choose. With FOB you pay for the freight from China. With CIF and DDP it's included in the price. We'll help you compare the options." },
  { q: "What happens if goods are faulty?", a: "Our pre-shipment inspection is designed to catch problems before goods leave the factory, when the factory can still fix them. If an issue is found, we share photos and agree fixes with the factory before shipment." },
  { q: "Which countries do you ship to?", a: "We ship worldwide with partner forwarders, including to the USA, the UK, the EU, the Middle East, Australia and Southeast Asia. Tell us your destination port or address and we'll confirm the options and costs." },
];

export const WHY_US: { title: string; desc: string; icon: LucideIcon }[] = [
  { title: "On the Ground in China", desc: "A team based in China, close to the factories, able to visit in person", icon: MapPin },
  { title: "One Point of Contact",  desc: "One team handles your order from the first quote to delivery",          icon: UserRound },
  { title: "Clear Process",         desc: "Sourcing, checks, inspection and shipping in one clear sequence",         icon: Workflow },
  { title: "Bilingual Team",        desc: "Chinese and English communication with factories and buyers",             icon: Languages },
];

export const EXPERTISE = ["Supplier Sourcing", "Factory Visits", "Quality Control", "Sample Handling", "Freight Coordination", "Bilingual Support"];

/* ── World map (public/world-dots.svg, viewBox 0 0 147 70) ─── */
export const MAP_W = 147, MAP_H = 70;

/* Routes start from Shanghai, China's main export port (same dot as the Yangtze Delta on this grid). */
export const HQ = { label: "China", lat: 31.23, lng: 121.47, pin: [123, 28.58] as [number, number] };

export const CITY_DATA = [
  { label: "Seoul",     region: "Asia-Pacific", country: "South Korea",   lat: 37.57,  lng: 126.98,  tz: "Asia/Seoul",          pin: [126, 25.11] },
  { label: "Tokyo",     region: "Asia-Pacific", country: "Japan",           lat: 35.68,  lng: 139.69,  tz: "Asia/Tokyo",          pin: [130.5, 25.98] },
  { label: "Singapore", region: "Asia-Pacific", country: "Singapore",         lat: 1.35,   lng: 103.82,  tz: "Asia/Singapore",      pin: [116.5, 41.57] },
  { label: "Sydney",    region: "Oceania",      country: "Australia",     lat: -33.87, lng: 151.21,  tz: "Australia/Sydney",    pin: [135.5, 57.16] },
  { label: "Dubai",     region: "Middle East",  country: "United Arab Emirates",             lat: 25.20,  lng: 55.27,   tz: "Asia/Dubai",          pin: [96.5, 31.18] },
  { label: "Frankfurt", region: "Europe",       country: "Germany",           lat: 50.11,  lng: 8.68,    tz: "Europe/Berlin",       pin: [77, 18.19] },
  { label: "London",    region: "Europe",       country: "United Kingdom",        lat: 51.51,  lng: -0.13,   tz: "Europe/London",       pin: [73.5, 17.32] },
  { label: "New York",  region: "Americas",     country: "United States",             lat: 40.71,  lng: -74.01,  tz: "America/New_York",    pin: [43, 23.38] },
  { label: "São Paulo", region: "Americas",     country: "Brazil", lat: -23.55, lng: -46.63,  tz: "America/Sao_Paulo",   pin: [54.5, 51.96] },
] as const;

export const REGIONS = ["All", "Asia-Pacific", "Europe", "Americas", "Middle East", "Oceania"] as const;

/** Great-circle distance from Shanghai port, in km. */
export function distanceFromHQ(lat: number, lng: number) {
  const r = (d: number) => (d * Math.PI) / 180;
  const dLat = r(lat - HQ.lat), dLng = r(lng - HQ.lng);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(r(HQ.lat)) * Math.cos(r(lat)) * Math.sin(dLng / 2) ** 2;
  return Math.round((6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))) / 10) * 10;
}

/** Curved route from Suzhou to a pin, bowed upward. */
export function routePath([x2, y2]: readonly [number, number] | readonly number[]) {
  const [x1, y1] = HQ.pin;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const cx = (x1 + x2) / 2, cy = Math.max(2, Math.min(y1, y2) - dist * 0.32);
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}
