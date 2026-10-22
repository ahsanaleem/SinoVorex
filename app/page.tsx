import TradevorexHome from "@/components/TradevorexHome";
import { PAGE_UPDATED } from "@/components/sinovorex/data";
import { JsonLd, ORG_ID, WEBSITE_ID, abs, graph } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={graph({
        "@type": "WebPage",
        "@id": `${abs("/")}#webpage`,
        url: abs("/"),
        name: "China Sourcing Agent for Global Buyers",
        dateModified: PAGE_UPDATED.home,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        primaryImageOfPage: abs("/opengraph-image.png"),
      })} />
      <TradevorexHome />
    </>
  );
}
