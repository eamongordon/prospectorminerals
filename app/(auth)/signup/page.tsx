"use client";

import { Suspense } from "react";
import FormWrapper from "@/components/registration/login-form";

export default async function LoginPage() {
  return (
    <Suspense>
      <FormWrapper />
    </Suspense>
  );
}
