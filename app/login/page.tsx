"use client";

import Image from "next/image";
import LoginButton from "./login-button";
import { Suspense } from "react";
import FormWrapper from "@/components/registration/login-form";
import Link from "next/link";
import { Divider, Tab, Tabs } from "@nextui-org/react";
import React from "react";

export default function LoginPage() {
  /*
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <Link href="/">
            <Image
              src="/PM-Favicon-New-Square.svg"
              priority
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </Link>
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>
        <Form type="login" />
      </div>
    </div>
  );
*/
  return (
    <FormWrapper/>
  );
}
