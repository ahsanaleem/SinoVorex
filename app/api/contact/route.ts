import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const CONTACT_TO = process.env.CONTACT_TO || "business@sinovorex.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILES = 3;
const MAX_TOTAL_BYTES = 8 * 1024 * 1024;
// Images, PDFs and spreadsheets (multi-item procurement lists). Keep in sync with components/sinovorex/QuoteForm.tsx.
const ALLOWED_TYPES = new Set([
  "image/jpeg", "image/png", "image/webp", "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", "text/csv",
]);
const ALLOWED_EXT = /\.(jpe?g|png|webp|pdf|xlsx|xls|csv)$/i;
const INCOTERMS = new Set(["Not sure", "FOB", "CIF", "DDP", "EXW"]);

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const safeFilename = (n: string) => n.replace(/[^\w.\- ]+/g, "_").slice(0, 100) || "attachment";

export async function POST(req: NextRequest) {
  // Plain HTML form posts (no JavaScript) get a redirect back to /quote instead of JSON.
  const res = await handle(req);
  if (!(req.headers.get("accept") || "").includes("text/html")) return res;
  return NextResponse.redirect(new URL(res.ok ? "/quote/thanks" : "/quote/problem", req.url), 303);
}

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

async function handle(req: NextRequest) {
  let fields: Record<string, unknown> = {};
  let uploads: File[] = [];
  try {
    if ((req.headers.get("content-type") || "").includes("multipart/form-data")) {
      const fd = await req.formData();
      fd.forEach((v, k) => { if (typeof v === "string") fields[k] = v; });
      uploads = fd.getAll("files").filter((f): f is File => typeof f !== "string" && f.size > 0);
    } else {
      fields = await req.json();
    }
  } catch {
    return fail("Invalid request.", 400);
  }

  // Honeypot: real visitors never see or fill this field
  if (clean(fields.website, 200)) return NextResponse.json({ success: true });

  const data = {
    name: clean(fields.name, 120),
    email: clean(fields.email, 200),
    company: clean(fields.company, 160),
    phone: clean(fields.phone, 40),
    product: clean(fields.product, 300),
    quantity: clean(fields.quantity, 120),
    targetPrice: clean(fields.targetPrice, 120),
    destination: clean(fields.destination, 160),
    incoterm: clean(fields.incoterm, 20),
    message: clean(fields.message, 5000),
  };
  if (!INCOTERMS.has(data.incoterm)) data.incoterm = "Not sure";

  if (!data.name || !data.email || !data.product || !data.quantity || !data.destination) {
    return fail("Please fill in your name, email, product, quantity and destination.", 400);
  }
  if (!EMAIL_RE.test(data.email)) return fail("Please enter a valid email address.", 400);
  if (clean(fields.consent, 10) !== "yes") return fail("Please agree to the privacy policy so we can reply to you.", 400);

  if (uploads.length > MAX_FILES) return fail(`Please attach up to ${MAX_FILES} files.`, 400);
  if (uploads.some((f) => !ALLOWED_EXT.test(f.name) || (f.type && f.type !== "application/octet-stream" && !ALLOWED_TYPES.has(f.type)))) return fail("Attachments must be JPG, PNG, WebP, PDF, Excel or CSV files.", 400);
  if (uploads.reduce((n, f) => n + f.size, 0) > MAX_TOTAL_BYTES) return fail("Attachments can be up to 8 MB in total.", 400);

  const { SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP_USER / SMTP_PASS are not set. Add them to .env.local (see .env.example).");
    return fail("Our quote form is temporarily unavailable. Please email us at business@sinovorex.com or message us on WhatsApp.", 503);
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows: [string, string][] = [
    ["Product", data.product],
    ["Quantity", data.quantity],
    ["Target price", data.targetPrice || "—"],
    ["Destination", data.destination],
    ["Incoterm", data.incoterm],
    ["Details", data.message || "—"],
    ["Name", data.name],
    ["Company", data.company || "—"],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone || "—"],
    ["Attachments", uploads.length ? uploads.map((f) => f.name).join(", ") : "—"],
  ];
  const rowHtml = rows.map(([label, value], i) => `
    <tr>
      <td style="padding: 11px 0; ${i < rows.length - 1 ? "border-bottom: 1px solid #eee;" : ""} width: 150px; vertical-align: top;">
        <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #999;">${label}</span>
      </td>
      <td style="padding: 11px 0; ${i < rows.length - 1 ? "border-bottom: 1px solid #eee;" : ""} font-size: 15px; color: #111; white-space: pre-wrap;">${escapeHtml(value)}</td>
    </tr>`).join("");

  const attachments = await Promise.all(uploads.map(async (f) => ({
    filename: safeFilename(f.name),
    content: Buffer.from(await f.arrayBuffer()),
    // Browsers sometimes send spreadsheets without a type; nodemailer then infers it from the (checked) extension.
    contentType: ALLOWED_TYPES.has(f.type) ? f.type : undefined,
  })));

  try {
    await transporter.sendMail({
      from: `"Sino Vorex Website" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: { name: data.name, address: data.email },
      subject: `Quote request: ${data.product.slice(0, 60)} — ${data.name}`,
      text: `New quote request\n\n${rows.map(([l, v]) => `${l}: ${v}`).join("\n")}\n`,
      attachments,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #f9f9f9;">
          <div style="background: #0E0E16; padding: 28px 36px; border-bottom: 3px solid #FF6B2B;">
            <h1 style="color: #FF6B2B; font-size: 20px; margin: 0; letter-spacing: 2px; text-transform: uppercase;">SINO VOREX</h1>
            <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 6px 0 0; letter-spacing: 1px; text-transform: uppercase;">New Quote Request</p>
          </div>
          <div style="background: #ffffff; padding: 28px 36px;">
            <table style="width: 100%; border-collapse: collapse;">${rowHtml}</table>
          </div>
          <div style="background: #f5f5f5; padding: 18px 36px; text-align: center;">
            <p style="font-size: 12px; color: #888; margin: 0;">
              Sent from the Sino Vorex website quote form &nbsp;·&nbsp;
              <a href="mailto:${escapeHtml(data.email)}" style="color: #FF6B2B; text-decoration: none;">Reply to ${escapeHtml(data.name)}</a>
            </p>
          </div>
        </div>
      `,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form: failed to send email:", err);
    return fail("We couldn't send your request right now. Please try again, email business@sinovorex.com, or message us on WhatsApp.", 502);
  }
}
