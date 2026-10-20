import { clsx } from "clsx";

/* ── Sino Vorex brand assets (public/brand, from SinoVorex-Logo) ── */
/** Full horizontal logo: globe mark + SINO VOREX + TRADE CONSULTING (435×120). */
export function BrandLogo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/brand/sinovorex-logo-horizontal-on-${dark ? "dark" : "light"}.svg`}
      alt="Sino Vorex, sourcing and export from China"
      width={434} height={120}
      draggable={false}
      className={clsx("block select-none", className)}
    />
  );
}

/** Globe mark on its own (square). */
export function BrandMark({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/brand/sinovorex-mark-on-${dark ? "dark" : "light"}.svg`}
      alt=""
      aria-hidden
      width={512} height={512}
      draggable={false}
      className={clsx("block select-none", className)}
    />
  );
}
