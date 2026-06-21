export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0A0F1E", color: "#F5F5F5", fontFamily: "'Barlow Condensed', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 96, fontWeight: 900, color: "#FF6B2B", lineHeight: 1 }}>404</div>
          <div style={{ fontSize: 18, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,245,0.5)", margin: "16px 0 32px" }}>Page Not Found</div>
          <a href="/" style={{ color: "#FF6B2B", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", border: "1px solid rgba(255,107,43,0.4)", padding: "10px 24px" }}>
            Return Home
          </a>
        </div>
      </body>
    </html>
  );
}
