# BetterAuthTest Web App

BetterAuthTest is a web application built with Next.js that provides a secure login and sign-up system with **email verification** and password reset functionality.

---

## Features

- **User Authentication**
  - Login with email and password
  - Sign-up with email verification
  - Email verification required before login

- **Password Reset**
  - Users can request a password reset via email
  - Reset links expire after 1 hour
  - **Known Issue:** Users may sometimes encounter `INVALID_TOKEN` if the reset link is used after expiration or if the token URL is modified. Make sure to click the link immediately after receiving it.

- **Database**
  - Uses MongoDB via Prisma for storing user credentials and authentication data

- **Email Notifications**
  - Verification emails sent via Nodemailer
  - Password reset emails sent via Resend

---

## Environment Variables

The following environment variables are required:

```env
# Database URL (MongoDB)
DATABASE_URL=

# Base URL for the app (used in email links)
NEXT_PUBLIC_APP_URL=

# Better Auth configuration
BETTER_AUTH_URL=
BETTER_AUTH_SECRET=

# Gmail credentials for sending verification emails
EMAIL_USER=
EMAIL_PASS=

# Resend API Key for sending password reset emails
RESEND_API_KEY=
