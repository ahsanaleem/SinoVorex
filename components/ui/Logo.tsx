"use client";

interface Props {
  /** Rendered height in px — width scales automatically */
  height?: number;
  className?: string;
}

export function AppvixLogo({ height = 36, className = "" }: Props) {
  const h = height;
  const fontSize = Math.round(h * 0.78);
  const slashSize = Math.round(h * 0.88);

  return (
    <span
      className={`inline-flex items-center ${className}`}
      style={{ height: h, lineHeight: 1 }}
    >
      {/* Custom "a" mark — cyan arch with open bottom */}
      <svg
        width={Math.round(h * 0.75)}
        height={h}
        viewBox="0 0 36 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {/* Outer arch of the "a" — white */}
        <path
          d="M32 8C28.5 3 22.5 0.5 16 0.5C9.5 0.5 4 3 1.5 8C-0.5 12 -0.5 17 2 21.5L14 42C14.8 43.5 16 44.5 17.5 44.5C19 44.5 20.2 43.5 21 42L33 21.5C35.5 17 35.5 12 32 8Z"
          fill="white"
          fillOpacity="0.92"
        />
        {/* Inner cutout — creates the open bottom of the "a" */}
        <path
          d="M16 8C12 8 9 11 9 15C9 19 12 22 16 22C20 22 23 19 23 15C23 11 20 8 16 8Z"
          fill="#020617"
        />
        {/* Cyan bottom curve — the signature open-bottom stroke */}
        <path
          d="M6 26C6 26 8 36 16 38C24 40 30 34 30 34"
          stroke="#06e5ff"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Wordmark: ppvix */}
      <span
        style={{
          fontFamily: "var(--font-geist-sans), Inter, system-ui, sans-serif",
          fontSize,
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          marginLeft: Math.round(h * 0.12),
        }}
      >
        ppvix
      </span>

      {/* Cyan slash accent */}
      <span
        style={{
          fontFamily: "var(--font-geist-sans), Inter, system-ui, sans-serif",
          fontSize: slashSize,
          fontWeight: 700,
          color: "#06e5ff",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          marginLeft: Math.round(h * 0.08),
        }}
      >
        /
      </span>
    </span>
  );
}

export default AppvixLogo;
