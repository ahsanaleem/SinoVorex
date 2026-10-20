import type { Metadata } from "next";
import { COMPANY, PAGE_UPDATED } from "@/components/sinovorex/data";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";
import { QuoteForm } from "@/components/sinovorex/QuoteForm";
import { Breadcrumbs } from "@/components/sinovorex/PageParts";
import { JsonLd, ORG_ID, abs, breadcrumbLd, graph, pageMeta } from "@/lib/seo";

const TITLE = "Request a Quote: Sourcing from China | Sino Vorex";
const DESCRIPTION = "Tell us what you want to source from China: product, quantity, target price and destination. We reply within 24 hours with next steps.";

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/quote" });

const NEXT_STEPS = [
  "We'll read your request and get back to you within 24 hours, usually with a few questions about the details.",
  "We send you a written quote with the work involved, our fee and a rough timeline. Nothing starts until you're happy with it.",
  "We start looking for suppliers and send you a shortlist with prices, MOQs and lead times.",
];

/** Server-rendered quote page: the same form as the modal, reachable by URL and by fetch-only agents. */
export default function QuotePage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Request a quote", path: "/quote" }];
  return (
    <SubpageShell quoteCta={false}>
      <JsonLd data={graph(breadcrumbLd(crumbs), {
        "@type": "ContactPage",
        "@id": `${abs("/quote")}#webpage`,
        url: abs("/quote"),
        name: "Request a quote",
        dateModified: PAGE_UPDATED.quote,
        about: { "@id": ORG_ID },
      })} />
      <section className="px-4 pb-20 pt-14 sm:px-6 md:pt-20">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1fr_minmax(0,680px)]">
          <div>
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Request a quote" }]} />
            <h1 className="mt-8 font-display text-[clamp(38px,5vw,64px)] font-medium leading-[1] tracking-[-0.045em]">
              Request a free <span className="font-serif font-normal italic text-flame">quote</span>
            </h1>
            <p className="mt-6 max-w-[480px] text-[18px] leading-relaxed text-ink/75">
              Tell us what you want to source. Photos, drawings or an item list all help us give you a more accurate quote.
            </p>
            <h2 className="mt-10 font-display text-[22px] font-medium tracking-[-0.02em]">What happens next</h2>
            <ol className="mt-4 max-w-[480px] space-y-3 text-[16px] leading-relaxed text-ink/80">
              {NEXT_STEPS.map((t, i) => (
                <li key={t} className="flex gap-3"><span className="font-mono text-[13px] text-flame">0{i + 1}</span>{t}</li>
              ))}
            </ol>
            <h2 className="mt-10 font-display text-[22px] font-medium tracking-[-0.02em]">Prefer to message us?</h2>
            <ul className="mt-4 space-y-2 text-[16px] text-ink/80">
              <li>Email: <a href={`mailto:${COMPANY.email}`} className="font-medium text-flame underline-offset-2 hover:underline">{COMPANY.email}</a></li>
              <li>WhatsApp: <a href={COMPANY.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-medium text-flame underline-offset-2 hover:underline">{COMPANY.phoneDisplay}</a></li>
              <li>WeChat: {COMPANY.wechatId}</li>
            </ul>
          </div>
          <div className="rounded-[32px] bg-white p-6 shadow-[0_40px_120px_-40px_rgba(14,14,22,0.35)] sm:p-10">
            <QuoteForm showHeader={false} />
          </div>
        </div>
      </section>
    </SubpageShell>
  );
}
