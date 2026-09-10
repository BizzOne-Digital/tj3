import nodemailer from "nodemailer";

async function main() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.SMTP_TO || user;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass || !to) {
    throw new Error("Missing SMTP env vars. Check SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_TO.");
  }

  console.log(`Connecting to ${host}:${port} as ${user}...`);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.verify();
  console.log("SMTP connection verified.");

  await transporter.sendMail({
    from: `"Little Mounties Website" <${from}>`,
    to,
    subject: "[Little Mounties Contact] SMTP test",
    text: "This is an automated SMTP test from the Little Mounties website. If you received this, email delivery is working.",
    html: "<p>This is an automated <strong>SMTP test</strong> from the Little Mounties website. If you received this, email delivery is working.</p>",
  });

  console.log(`SMTP test email sent successfully to ${to}`);
}

main().catch((error) => {
  console.error("SMTP test failed:");
  console.error(error);
  process.exit(1);
});
