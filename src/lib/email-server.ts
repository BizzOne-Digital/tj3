import "server-only";

import nodemailer from "nodemailer";
import { BRAND } from "./constants";

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
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

export async function sendContactFormEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const config = getSmtpConfig();
  if (!config) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in your environment.",
    );
  }

  const to = process.env.SMTP_TO || process.env.CONTACT_TO_EMAIL || BRAND.email;
  const from = process.env.SMTP_FROM || config.user;
  const transporter = getTransporter();

  const text = [
    "New contact form submission — Little Mounties Community Sports Complex",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ""}
    <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `;

  await transporter.sendMail({
    from: `"Little Mounties Website" <${from}>`,
    to,
    replyTo: `"${data.name}" <${data.email}>`,
    subject: `[Little Mounties Contact] ${data.subject}`,
    text,
    html,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
