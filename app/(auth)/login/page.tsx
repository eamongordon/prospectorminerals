import FormWrapper from "@/components/registration/login-form";
import React from "react";
import { Suspense } from 'react';
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    return redirect(`/account/settings`);
  }
  return (
    <Suspense>
      <FormWrapper />
    </Suspense>
  );
}
