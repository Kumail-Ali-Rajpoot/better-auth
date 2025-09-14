// @/server/auth.ts
"use server";
import { auth } from "@/lib/auth";

export async function signUpUser(name: string, email: string, password: string) {
  return await auth.api.signUpEmail({   // ✅ notice: signUpEmail
    body: { name, email, password },
  });
}

export async function signInUser(email: string, password: string) {
  try {
    const res = await auth.api.signInEmail({   // ✅ notice: signInEmail
      body: { email, password},
    });
    if(!res.user.emailVerified) {
      return { verified: false}
    }
      return { verified: true}
  }catch (err) {
    return err
  }
}