import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/components/sinovorex/data";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";

// Landing page for the quote form when it is submitted without JavaScript.
export const metadata: Metadata = { title: "Thank you: your request has been sent | Sino Vorex", robots: { index: false, follow: true }, alternates: { canonical: null } };

export default function Page() {
  return (
    <SubpageShell quoteCta={false}>
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-[640px] text-center">
          <h1 className="font-display text-[clamp(32px,4.5vw,52px)] font-medium leading-tight tracking-[-0.04em]">Thank you: your request has been sent</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-ink/75">We have received your quote request and will reply within 24 hours. For anything urgent, message us on WhatsApp.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${COMPANY.email}`} className="rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-white">{COMPANY.email}</a>
            <a href={COMPANY.whatsappHref} className="rounded-full bg-[#25D366] px-6 py-3 text-[15px] font-medium text-white">WhatsApp</a>
            <Link href="/" className="rounded-full border border-ink/15 px-6 py-3 text-[15px] font-medium">Home</Link>
          </div>
        </div>
      </section>
    </SubpageShell>
  );
}
