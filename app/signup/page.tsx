"use client";

import { Suspense } from "react";
import FormWrapper from "@/components/registration/login-form";
import React from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <FormWrapper />
    </Suspense>
  );
}
