import type { Block, QA } from "@/components/sinovorex/content/types";
import { SITE_URL } from "./site";

/** RichText syntax to Markdown: site links become absolute, **bold** markers are dropped. */
const inline = (t: string) => t.replace(/\]\((\/[^)]*)\)/g, (_, p) => `](${SITE_URL}${p})`).replace(/\*\*([^*]+)\*\*/g, "$1");
const cell = (t: string) => inline(t).replace(/\|/g, "\|");

/** Converts a content block list (and FAQs) to Markdown, for llms-full.txt. */
export function blocksToMarkdown(blocks: Block[], faqs: QA[] = []) {
  const out: string[] = [];
  for (const b of blocks) {
    if ("h2" in b) out.push(`## ${b.h2}`);
    else if ("h3" in b) out.push(`### ${b.h3}`);
    else if ("p" in b) out.push(inline(b.p));
    else if ("ul" in b) out.push(b.ul.map((x) => `- ${inline(x)}`).join("\n"));
    else if ("ol" in b) out.push(b.ol.map((x, i) => `${i + 1}. ${inline(x)}`).join("\n"));
    else if ("table" in b) {
      const { head, rows, caption } = b.table;
      out.push([`| ${head.map(cell).join(" | ")} |`, `| ${head.map(() => "---").join(" | ")} |`, ...rows.map((r) => `| ${r.map(cell).join(" | ")} |`)].join("\n") + (caption ? `\n\n${inline(caption)}` : ""));
    } else if ("note" in b) out.push(`> ${b.label ? `${b.label}: ` : ""}${inline(b.note)}`);
  }
  if (faqs.length) out.push("## Common questions", ...faqs.map((f) => `### ${f.q}\n\n${inline(f.a)}`));
  return out.join("\n\n");
}
