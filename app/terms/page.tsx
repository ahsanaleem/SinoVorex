import type { Metadata } from "next";
import { COMPANY } from "@/components/sinovorex/data";
import { LegalPage } from "@/components/sinovorex/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Sino Vorex",
  description: "Terms for using the Sino Vorex website and requesting quotes.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="16 October 2026">
      <p>
        These terms apply to your use of this website, operated by {COMPANY.legalNameZh} under the brand {COMPANY.brand} (&ldquo;Sino Vorex&rdquo;,
        &ldquo;we&rdquo;). By using the website you agree to them.
      </p>

      <h2>Information on this website</h2>
      <p>
        The website describes our services in general terms. It is not an offer, and nothing on it is legal, customs or tax advice.
        Transit times and other figures are typical ranges and can vary.
      </p>

      <h2>Quotes and orders</h2>
      <p>
        Sending a quote request does not create a contract. Prices, fees, timelines, payment terms and responsibilities apply only once
        they are confirmed in writing in a quote or agreement for your specific order. If that document conflicts with these terms, it takes priority.
      </p>

      <h2>Your submissions</h2>
      <p>
        You confirm that information and files you send us are accurate and that you have the right to share them. We use them as
        described in our <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>Intellectual property</h2>
      <p>The Sino Vorex name, logo and website content belong to us. Please do not copy or reuse them without permission.</p>

      <h2>Limitation of liability</h2>
      <p>
        We provide the website &ldquo;as is&rdquo;. To the extent permitted by law, we are not liable for losses arising from use of the website
        or reliance on its general information. Our responsibilities for any order are those set out in the written agreement for that order.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the People&apos;s Republic of China.</p>

      <h2>Contact</h2>
      <p>Questions about these terms: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</p>
    </LegalPage>
  );
}
