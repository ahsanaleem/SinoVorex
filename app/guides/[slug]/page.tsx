import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GUIDES, GUIDE_BY_SLUG } from "@/components/sinovorex/content/guides";
import { ArticleView } from "@/components/sinovorex/ArticleView";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = GUIDE_BY_SLUG[params.slug];
  if (!g) return {};
  return pageMeta({ title: g.title, description: g.description, path: `/guides/${g.slug}`, type: "article", published: g.published, modified: g.updated });
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = GUIDE_BY_SLUG[params.slug];
  if (!g) notFound();
  const path = `/guides/${g.slug}`;
  return (
    <ArticleView
      a={g} path={path} kind="guide" eyebrow="Guide"
      crumbs={[{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: g.h1, path }]}
    />
  );
}
