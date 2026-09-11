import "server-only";

import nodemailer from "nodemailer";
import { BRAND } from "./constants";

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
};

const INQUIRY_LABELS: Record<string, string> = {
  league: "Bring Your League",
  partner: "Partner With Us",
  founding_member: "Future Member Interest",
};

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  return {
    host,
    port: Number(process.env.SMTP_PORT || 587),
    user,
    pass,
  };
}

export function isSmtpConfigured() {
  return getSmtpConfig() !== null;
}

function getTransporter() {
  const config = getSmtpConfig();
  if (!config) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in your environment.",
    );
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

function getMailTargets() {
  const config = getSmtpConfig();
  if (!config) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in your environment.",
    );
  }

  const to = process.env.SMTP_TO || process.env.CONTACT_TO_EMAIL || BRAND.email;
  const from = process.env.SMTP_FROM || config.user;

  return { to, from, transporter: getTransporter() };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatPayloadLines(payload: Record<string, unknown>) {
  return Object.entries(payload)
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
    .map(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (char) => char.toUpperCase());
      return `${label}: ${String(value)}`;
    });
}

function formatPayloadHtml(payload: Record<string, unknown>) {
  return Object.entries(payload)
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
    .map(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (char) => char.toUpperCase());
      return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(String(value))}</p>`;
    })
    .join("");
}

async function sendSiteEmail({
  subject,
  textLines,
  htmlBody,
  replyToName,
  replyToEmail,
}: {
  subject: string;
  textLines: string[];
  htmlBody: string;
  replyToName: string;
  replyToEmail: string;
}) {
  const { to, from, transporter } = getMailTargets();

  await transporter.sendMail({
    from: `"Little Mounties Website" <${from}>`,
    to,
    replyTo: `"${replyToName}" <${replyToEmail}>`,
    subject,
    text: textLines.join("\n"),
    html: htmlBody,
  });
}

export async function sendContactFormEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const textLines = [
    "New contact form submission — Little Mounties Community Sports Complex",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
  ].filter(Boolean) as string[];

  const htmlBody = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ""}
    <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `;

  await sendSiteEmail({
    subject: `[Little Mounties Contact] ${data.subject}`,
    textLines,
    htmlBody,
    replyToName: data.name,
    replyToEmail: data.email,
  });
}

export async function sendInquiryFormEmail(data: {
  type: "league" | "partner" | "founding_member";
  name: string;
  email: string;
  organization?: string;
  payload?: Record<string, unknown>;
}) {
  const formLabel = INQUIRY_LABELS[data.type] ?? "Website Inquiry";
  const payload = data.payload ?? {};
  const payloadLines = formatPayloadLines(payload);

  const textLines = [
    `New ${formLabel} form submission — Little Mounties Community Sports Complex`,
    "",
    `Form: ${formLabel}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.organization ? `Organization: ${data.organization}` : null,
    "",
    ...(payloadLines.length ? ["Details:", ...payloadLines] : []),
  ].filter(Boolean) as string[];

  const htmlBody = `
    <h2>New ${escapeHtml(formLabel)} Submission</h2>
    <p><strong>Form:</strong> ${escapeHtml(formLabel)}</p>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    ${data.organization ? `<p><strong>Organization:</strong> ${escapeHtml(data.organization)}</p>` : ""}
    ${payloadLines.length ? `<hr />${formatPayloadHtml(payload)}` : ""}
  `;

  await sendSiteEmail({
    subject: `[Little Mounties ${formLabel}] New submission from ${data.name}`,
    textLines,
    htmlBody,
    replyToName: data.name,
    replyToEmail: data.email,
  });
}

export async function sendBookingFormEmail(data: {
  name: string;
  email: string;
  phone: string;
  facility: string;
  date: string;
  timeSlot: string;
  notes?: string;
}) {
  const textLines = [
    "New booking request — Little Mounties Community Sports Complex",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Facility: ${data.facility}`,
    `Date: ${data.date}`,
    `Time: ${data.timeSlot}`,
    data.notes ? `Notes: ${data.notes}` : null,
  ].filter(Boolean) as string[];

  const htmlBody = `
    <h2>New Booking Request</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Facility:</strong> ${escapeHtml(data.facility)}</p>
    <p><strong>Date:</strong> ${escapeHtml(data.date)}</p>
    <p><strong>Time:</strong> ${escapeHtml(data.timeSlot)}</p>
    ${data.notes ? `<p><strong>Notes:</strong> ${escapeHtml(data.notes)}</p>` : ""}
  `;

  await sendSiteEmail({
    subject: `[Little Mounties Booking] ${data.facility} — ${data.date}`,
    textLines,
    htmlBody,
    replyToName: data.name,
    replyToEmail: data.email,
  });
}
