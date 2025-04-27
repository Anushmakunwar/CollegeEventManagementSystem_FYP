import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const mailer = async (
  email: string,
  subject: string,
  html: string,
  attachments?: any,
) => {
  const info = await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    text: html,
    attachDataUrls: true,
    html,
    attachments,
  });
  return info.messageId;
};
