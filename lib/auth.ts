import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../lib/generated/prisma";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  telemetry: {
    enabled: true,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // ✅ must verify before login
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      // Nodemailer transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"TradesTreasure" <${process.env.EMAIL_USER}>`,
        to: user.email, // ✅ use user.email not just "email"
        subject: "Verify your email",
        text: `Click the link to verify your account: ${url}`,
        html: `
        <h1>Welcome on trades treasure</h1>
        <p>I hope they will be helpful for you in learning trading!</p>
        <br/>
        <a href="${url}" style="background-color: black; color: white; padding:0.7rem; text-decoration:none; border-radius:0.5rem;">Verify your email</a><br/>
        `,
      });
    },
  },
});
