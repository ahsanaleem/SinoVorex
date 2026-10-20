import type { Metadata } from "next";
import { COMPANY, PAGE_UPDATED } from "@/components/sinovorex/data";
import { LegalPage } from "@/components/sinovorex/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy | Sino Vorex",
  description: "How Sino Vorex collects, uses and protects personal information sent through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated={PAGE_UPDATED.privacy}>
      <p>
        This policy explains how {COMPANY.legalNameZh}, operating under the brand {COMPANY.brand} (&ldquo;Sino Vorex&rdquo;, &ldquo;we&rdquo;), handles personal
        information collected through this website. It is written with the Personal Information Protection Law of the People&apos;s
        Republic of China (PIPL) and, for visitors in the European Union, the General Data Protection Regulation (GDPR) in mind.
      </p>

      <h2>Who is responsible</h2>
      <p>{COMPANY.legalNameZh}, {COMPANY.addressZh} ({COMPANY.address}). Contact: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</p>

      <h2>What we collect</h2>
      <ul>
        <li>Details you enter in the quote form: name, company, email, phone or WhatsApp number, product, quantity, target price, destination and any message.</li>
        <li>Files you attach, such as product photos, drawings or specifications.</li>
        <li>Messages you send us by email, WhatsApp or WeChat.</li>
        <li>If website analytics is enabled: basic usage data such as pages visited, device type and approximate location, collected with cookies.</li>
      </ul>

      <h2>Why we use it</h2>
      <ul>
        <li>To reply to your enquiry and prepare a quote.</li>
        <li>To find and contact suitable factories and freight partners for your request.</li>
        <li>To carry out work you ask us to do, and keep records of it.</li>
        <li>To understand how the website is used and improve it (analytics, if enabled).</li>
      </ul>
      <p>We rely on your consent (given when you submit the form) and on steps needed before entering into a contract with you. We do not sell your personal information or use it for unrelated marketing.</p>

      <h2>Who we share it with</h2>
      <p>
        Only as needed to handle your request: manufacturers and freight forwarders we contact on your behalf (usually product details only,
        not your contact details unless you agree), and service providers who run this website and our email. They may only use the
        information to provide their service to us.
      </p>

      <h2>Cross-border transfer</h2>
      <p>
        We are based in China. If you contact us from outside China, your information is transferred to and handled in China. Our website
        and email providers may also store data on servers outside China. By submitting the form you agree to these transfers.
      </p>

      <h2>How long we keep it</h2>
      <p>We keep enquiry information only as long as needed to respond and, if we work together, for as long as business and legal record-keeping requires. You can ask us to delete it earlier.</p>

      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete your personal information, ask how it is used, or withdraw your consent at any time by
        emailing <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Withdrawing consent does not affect processing already carried out.
        EU visitors may also complain to their local data protection authority.
      </p>

      <h2>Security</h2>
      <p>We take reasonable technical and organisational measures to protect your information. No method of transmission over the internet is completely secure.</p>

      <h2>Changes</h2>
      <p>We may update this policy. The date at the top shows when it last changed.</p>
    </LegalPage>
  );
}
