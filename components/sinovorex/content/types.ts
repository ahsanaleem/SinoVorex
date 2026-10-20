/** Structured long-form content, rendered by <Blocks>. Text supports [link text](/path) and **bold**. */
export type Block =
  | { h2: string; id?: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { table: { caption?: string; head: string[]; rows: string[][] } }
  | { note: string; label?: string };

export type QA = { q: string; a: string };

/** Long-form page (guide or audience page). Dates are ISO yyyy-mm-dd. */
export type Article = {
  slug: string;
  title: string;        // <title>
  h1: string;
  description: string;  // meta description, ≤ 155 chars
  summary: string;      // short answer shown under the H1 (quotable by AI engines)
  takeaways: string[];  // "In short" box: 3 or 4 points for readers who skim
  published: string;
  updated: string;
  body: Block[];
  faqs?: QA[];
  related?: string[];   // internal paths
};
