import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../lib/generated/prisma";
import nodemailer from "nodemailer";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import PasswordResetEmail from "@/app/emails/PasswirdResetEmail";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY)
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
      tokens: {
    passwordReset: {
      expiresIn: "1h", // ⏰ change from 15m to 1 hour
    },
  },
   sendResetPassword: async ({ user, url }) => {
          // If you want, you can force the domain, but preserve the token
          const resetUrl = url.replace(
            "http://localhost:3000",
             process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
          );
        await resend.emails.send({
        from: "onboarding@resend.dev", // must be verified in Resend
        to: [user.email],
        subject: "Reset your password",
        react: PasswordResetEmail({
          userName: user.name,
          resetUrl,
          requestTime: new Date().toLocaleString(),
        }),
      });
    },
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
    autoSignInAfterVerification:true
  },
  plugins: [nextCookies()],
  trustedOrigins: ["http://localhost:3000", "https://yourdomain.com"]

});
