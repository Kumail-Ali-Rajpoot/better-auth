// lib/nodemailer.ts
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // e.g. "smtp.gmail.com"
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
