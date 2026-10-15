/**
 * Analytics event helper. Sends to Plausible (NEXT_PUBLIC_PLAUSIBLE_DOMAIN) and/or Google Analytics 4
 * (NEXT_PUBLIC_GA_ID), whichever is configured in app/layout.tsx. No-op when neither is set.
 */
type Gtag = (cmd: "event", name: string, params?: Record<string, unknown>) => void;
type Plausible = (name: string, opts?: { props?: Record<string, string | number | boolean> }) => void;

/** Friendlier goal names in the Plausible dashboard. */
const PLAUSIBLE_NAMES: Record<string, string> = {
  generate_lead: "Quote Request",
  quote_form_open: "Quote Form Open",
  whatsapp_click: "WhatsApp Click",
  wechat_copy: "WeChat Copy",
};

export function track(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: Gtag; plausible?: Plausible };
  w.gtag?.("event", name, params);
  w.plausible?.(PLAUSIBLE_NAMES[name] ?? name, params ? { props: params } : undefined);
}
