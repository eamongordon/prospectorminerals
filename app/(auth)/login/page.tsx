import FormWrapper from "@/components/registration/login-form";
import React from "react";
import { Suspense } from 'react';

export default async function LoginPage() {
  return (
    <Suspense>
      <FormWrapper />
    </Suspense>
  );
}
