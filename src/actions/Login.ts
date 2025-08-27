
import { signIn } from "next-auth/react";

export async function loginAction(email: string, password: string) {
  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  return result;
}
