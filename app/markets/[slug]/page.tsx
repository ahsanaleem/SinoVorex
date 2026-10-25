import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MARKETS, MARKET_BY_SLUG } from "@/components/sinovorex/content/markets";
import { ArticleView } from "@/components/sinovorex/ArticleView";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return MARKETS.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const m = MARKET_BY_SLUG[params.slug];
  if (!m) return {};
  return pageMeta({ title: m.title, description: m.description, path: `/markets/${m.slug}` });
}

export default function MarketPage({ params }: { params: { slug: string } }) {
  const m = MARKET_BY_SLUG[params.slug];
  if (!m) notFound();
  const path = `/markets/${m.slug}`;
  return (
    <ArticleView
      a={m} path={path} kind="page" eyebrow={`Market · ${m.country}`}
      crumbs={[{ name: "Home", path: "/" }, { name: "Markets", path: "/markets" }, { name: m.label, path }]}
    />
  );
}
