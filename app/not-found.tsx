import type { Metadata } from "next";
import Link from "next/link";
import { SubpageShell } from "@/components/sinovorex/SubpageShell";
import { FOOTER_RESOURCES } from "@/components/sinovorex/links";

// Next.js adds noindex to 404 responses itself, so no robots tag here (avoids a duplicate).
export const metadata: Metadata = { title: "Page not found | Sino Vorex", alternates: { canonical: null } };

export default function NotFound() {
  return (
    <SubpageShell quoteCta={false}>
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-[640px] text-center">
          <div className="font-display text-[96px] font-medium leading-none text-flame">404</div>
          <h1 className="mt-4 font-display text-[clamp(28px,4vw,44px)] font-medium tracking-[-0.04em]">Page not found</h1>
          <p className="mt-4 text-[17px] text-ink/70">The page you are looking for has moved or does not exist. These may help:</p>
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            <li><Link href="/" className="inline-block rounded-full bg-ink px-5 py-2.5 text-[15px] font-medium text-white">Home</Link></li>
            {FOOTER_RESOURCES.map(([label, href]) => (
              <li key={href}><Link href={href} className="inline-block rounded-full border border-ink/15 px-5 py-2.5 text-[15px] font-medium hover:border-flame">{label}</Link></li>
            ))}
          </ul>
        </div>
      </section>
    </SubpageShell>
  );
}
