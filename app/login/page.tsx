import Image from "next/image";
import LoginButton from "./login-button";
import { Suspense } from "react";
import Form from "@/components/login-form";
import Link from "next/link";
import { Divider } from "@nextui-org/react";

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
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="mx-5 border border-stone-200 py-10 dark:border-stone-700 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md">
        <Image
          alt="Platforms Starter Kit"
          width={100}
          height={100}
          className="relative mx-auto h-12 w-auto dark:scale-120 dark:rounded-full dark:border dark:border-stone-400"
          src="/PM-Favicon-New-Square.svg"
        />
        <h1 className="mt-6 text-center font-medium text-3xl dark:text-white">
          Welcome Back
        </h1>
        <Form type="login" />
        <Divider/>
        <div className="mx-auto mt-8 w-11/12 max-w-xs sm:w-full">
          <Suspense
            fallback={
              <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
            }
          >
            <LoginButton />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
