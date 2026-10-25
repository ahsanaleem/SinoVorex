import type { Metadata } from "next";
import { COMPANY, PAGE_UPDATED, TEAM } from "@/components/sinovorex/data";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";
import { Blocks } from "@/components/sinovorex/Blocks";
import { PageHeader, RelatedLinks } from "@/components/sinovorex/PageParts";
import type { Block } from "@/components/sinovorex/content/types";
import { JsonLd, ORG_ID, WEBSITE_ID, abs, breadcrumbLd, graph, pageMeta } from "@/lib/seo";

const TITLE = "About SinoVorex: China Sourcing Agent in Suzhou";
const DESCRIPTION = "Who we are: a trade consulting company in Suzhou, China, helping buyers worldwide source, check and ship products. Company details and how to verify us.";

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/about" });

const BODY: Block[] = [
  { h2: "What we do" },
  { p: "We work for buyers outside China who want to buy from Chinese factories without the nasty surprises." },
  { p: "We find the right manufacturers and check them out before you pay a deposit. We follow production in Chinese, inspect the goods before you pay the balance, and arrange freight with partner forwarders. You can see everything on our [services page](/services)." },

  { h2: "Where we are" },
  { p: "Our registered office is in Gusu District, Suzhou, in Jiangsu province. Suzhou is about 100 km west of Shanghai, in the Yangtze River Delta. It's one of China's biggest manufacturing regions, and the ports of Shanghai and Ningbo are close by." },
  { p: "Being here means we can go and see factories in person instead of judging them from a website." },

  { h2: "How we work" },
  { ul: [
    "We put our fees, timelines and what's included in writing before we start any work.",
    "Our shortlists name every supplier, so you can check them yourself.",
    "We suggest paying the factory's balance only once you have an inspection report with photos.",
    "If a product, quantity or price isn't realistic, we tell you early.",
    "Our team is based in China, close to the factories, so we can visit in person.",
    "One team looks after your order from the first quote to delivery.",
    "We speak Chinese with the factories and English with you.",
  ] },

  { h2: "What we are not" },
  { ul: [
    "We're not a manufacturer. We work with independent factories all over China.",
    "We're not a freight forwarder. We [arrange freight](/services/shipping-coordination) with partner forwarders, and they carry the goods.",
    "We're not a testing lab or certification body. Certification tests are done by accredited labs, though we can collect the samples for them.",
  ] },

  { h2: "How to verify us" },
  { p: `Every company in China is listed on the National Enterprise Credit Information Publicity System. Search for our registered name, ${COMPANY.legalNameZh}, on [gsxt.gov.cn](https://www.gsxt.gov.cn) and you'll see our registration, status and registered address.${COMPANY.licenceNo ? ` Our Unified Social Credit Code is ${COMPANY.licenceNo}.` : ""}` },
  { p: "We're also happy to send you a copy of our business licence. Just ask." },
];

export default function AboutPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }];
  const details: [string, string][] = [
    ["Registered name", COMPANY.legalNameZh],
    ["English rendering (unofficial)", COMPANY.legalNameEnGloss],
    ["Brand", COMPANY.brand],
    ...(COMPANY.licenceNo ? [["Unified Social Credit Code", COMPANY.licenceNo] as [string, string]] : []),
    ...(COMPANY.foundedYear ? [["Established", COMPANY.foundedYear] as [string, string]] : []),
    ["Registered address", `${COMPANY.addressZh} · ${COMPANY.address}`],
    ["Email", COMPANY.email],
    ["Phone / WhatsApp", COMPANY.phoneDisplay],
    ["WeChat", COMPANY.wechatId],
    ["Languages", "English, Chinese"],
  ];

  return (
    <SubpageShell>
      <JsonLd data={graph(breadcrumbLd(crumbs), {
        "@type": "AboutPage",
        "@id": `${abs("/about")}#webpage`,
        url: abs("/about"),
        name: "About SinoVorex",
        dateModified: PAGE_UPDATED.about,
        mainEntity: { "@id": ORG_ID },
        isPartOf: { "@id": WEBSITE_ID },
        ...(TEAM.length ? { about: TEAM.map((t) => ({ "@type": "Person", name: t.name, jobTitle: t.role, worksFor: { "@id": ORG_ID }, ...(t.linkedin ? { sameAs: [t.linkedin] } : {}) })) } : {}),
      })} />
      <article className="px-4 pb-16 pt-14 sm:px-6 md:pt-20">
        <div className="mx-auto max-w-[1280px]">
          <PageHeader
            crumbs={[{ name: "Home", path: "/" }, { name: "About" }]}
            h1="About SinoVorex"
            summary={`SinoVorex is the brand of ${COMPANY.legalNameZh}, a trade consulting company registered in Suzhou, China. We help buyers worldwide source, check and ship products from factories across China.`}
            updated={PAGE_UPDATED.about}
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px]">
            <div className="min-w-0 max-w-[820px]"><Blocks blocks={BODY} /></div>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <section data-theme="dark" className="rounded-[28px] bg-ink p-7 text-white">
                <h2 className="font-display text-[22px] font-medium tracking-[-0.03em]">Company details</h2>
                <dl className="mt-5 space-y-4 text-[14px]">
                  {details.map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">{k}</dt>
                      <dd className="mt-1 text-white/90">{v}</dd>
                    </div>
                  ))}
                </dl>
                {COMPANY.sameAs.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5 text-[13px]">
                    {COMPANY.sameAs.map((u) => (
                      <li key={u}><a href={u} target="_blank" rel="noopener noreferrer me" className="rounded-full bg-white/10 px-3 py-1.5 hover:bg-flame">{new URL(u).hostname.replace(/^www\./, "")}</a></li>
                    ))}
                  </ul>
                )}
              </section>
            </aside>
          </div>

          {TEAM.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-[clamp(26px,3vw,34px)] font-medium tracking-[-0.03em]">Our team</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {TEAM.map((t) => (
                  <li key={t.name} className="rounded-[24px] border border-ink/[0.07] bg-white p-6">
                    {t.photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.photo} alt={t.name} width={320} height={320} loading="lazy" className="mb-5 aspect-square w-full rounded-2xl object-cover" />
                    )}
                    <h3 className="font-display text-[20px] font-medium">{t.name}</h3>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-flame">{t.role}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{t.bio}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <RelatedLinks heading="Start here" paths={["/guides/china-sourcing-agent-cost", "/guides/factory-audit-checklist", "/services/product-sourcing"]} />
        </div>
      </article>
    </SubpageShell>
  );
}
