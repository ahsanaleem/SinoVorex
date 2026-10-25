import type { Metadata } from "next";
import { COMPANY } from "@/components/sinovorex/data";
import { SITE_URL } from "./site";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const OG_IMAGE = { url: "/opengraph-image.png", width: 1200, height: 630, alt: "SinoVorex, a China sourcing agent helping buyers source, inspect and ship products from China" };

export const abs = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

/**
 * Full per-page metadata. Next.js replaces (not merges) a parent's openGraph/twitter objects,
 * so every page sets its own title, url and image here.
 */
export function pageMeta({ title, description, path, type = "website", published, modified }: {
  title: string; description: string; path: string; type?: "website" | "article"; published?: string; modified?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title, description, url: path, siteName: "SinoVorex", locale: "en_US", images: [OG_IMAGE],
      ...(type === "article" ? { type: "article", publishedTime: published, modifiedTime: modified } : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});

export const orgLd = (description: string) => ({
  // ProfessionalService (a LocalBusiness type) fits a services firm with a real registered office.
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: COMPANY.brand,
  alternateName: ["Sino Vorex", COMPANY.legalNameEnGloss],
  legalName: COMPANY.legalNameZh,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/sinovorex-logo-512.png`, width: 512, height: 512 },
  image: `${SITE_URL}/opengraph-image.png`,
  email: COMPANY.email,
  telephone: COMPANY.phoneDisplay.replace(/\s/g, ""),
  description,
  address: { "@type": "PostalAddress", streetAddress: "G239, No. 504 Shantang Street, Gusu District", addressLocality: "Suzhou", addressRegion: "Jiangsu", addressCountry: "CN" },
  areaServed: "Worldwide",
  knowsLanguage: ["en", "zh"],
  contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: COMPANY.email, telephone: COMPANY.phoneDisplay.replace(/\s/g, ""), availableLanguage: ["English", "Chinese"] }],
  ...(COMPANY.licenceNo ? { taxID: COMPANY.licenceNo } : {}),
  ...(COMPANY.foundedYear ? { foundingDate: COMPANY.foundedYear } : {}),
  ...(COMPANY.sameAs.length ? { sameAs: COMPANY.sameAs } : {}),
});

export const websiteLd = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: COMPANY.brand,
  inLanguage: "en",
  publisher: { "@id": ORG_ID },
});

/** Wraps nodes in one @graph so entities share @id references. */
export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });

export function JsonLd({ data }: { data: object }) {
  // `<` is escaped so content can never close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
