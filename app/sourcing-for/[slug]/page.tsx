import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AUDIENCES, AUDIENCE_BY_SLUG } from "@/components/sinovorex/content/audiences";
import { ArticleView } from "@/components/sinovorex/ArticleView";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return AUDIENCES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = AUDIENCE_BY_SLUG[params.slug];
  if (!a) return {};
  return pageMeta({ title: a.title, description: a.description, path: `/sourcing-for/${a.slug}` });
}

export default function AudiencePage({ params }: { params: { slug: string } }) {
  const a = AUDIENCE_BY_SLUG[params.slug];
  if (!a) notFound();
  const path = `/sourcing-for/${a.slug}`;
  return (
    <ArticleView
      a={a} path={path} kind="page" eyebrow={`Who we help · ${a.label}`}
      crumbs={[{ name: "Home", path: "/" }, { name: a.label, path }]}
    />
  );
}
