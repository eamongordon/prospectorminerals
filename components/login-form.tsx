"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
//import LoadingDots from "@/components/icons/loading-dots";
import { Input, Button } from "@nextui-org/react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter, usePathname} from "next/navigation";
import { useSearchParams } from 'next/navigation'
import Image from "next/image";
import LoginButton from "./login-button";
import { Suspense } from "react";
import { Divider, Tab, Tabs } from "@nextui-org/react";
import React from "react";

export default function FormWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const redirectUri = searchParams.get('redirect');const [selected, setSelected] = React.useState("login");
  const pathname = usePathname();
console.log(pathname)
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="mx-5 border border-stone-200 dark:border-stone-700 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md">
        <Tabs
          fullWidth
          size="md"
          aria-label="Tabs form"
          selectedKey={pathname}
          classNames={{
            tabList: "rounded-t-lg rounded-b-none",
            tab: "rounded-t-lg rounded-b-none",
          }}
        >
          <Tab key="/login" title="Login" href="/login">
            <Image
              alt="Platforms Starter Kit"
              width={100}
              height={100}
              className="relative mx-auto h-12 w-auto dark:scale-120 dark:rounded-full dark:border dark:border-stone-400 my-5"
              src="/PM-Favicon-New-Square.svg"
            />
            <h1 className="mt-6 text-center font-medium text-3xl dark:text-white">
              Welcome Back
            </h1>
            <Form type="login" />
            <Divider />
            <div className="mx-auto mt-8 w-11/12 max-w-xs mb-8 sm:w-full">
              <Suspense
                fallback={
                  <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
                }
              >
                <LoginButton signup={false} />
              </Suspense>
            </div>
          </Tab>
          <Tab key="/signup" title="Sign Up" href="/signup">
            <Image
              alt="Platforms Starter Kit"
              width={100}
              height={100}
              className="relative mx-auto h-12 w-auto dark:scale-120 dark:rounded-full dark:border dark:border-stone-400 my-5"
              src="/PM-Favicon-New-Square.svg"
            />
            <h1 className="mt-6 text-center font-medium text-3xl dark:text-white">
              Get Started
            </h1>
            <Form type="register" />
            <Divider />
            <div className="mx-auto mt-8 w-11/12 max-w-xs mb-8 sm:w-full">
              <Suspense
                fallback={
                  <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
                }
              >
                <LoginButton signup={true} />
              </Suspense>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  )

}

export function Form({ type }: { type: "login" | "register" }) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const redirectUri = searchParams.get('redirect');
  const [loading, setLoading] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (type === "login") {
          signIn("credentials", {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            // @ts-ignore
          }).then(({ error }) => {
            if (error) {
              setLoading(false);
              toast.error(error);
            } else {
              router.refresh();
              if (redirectUri) {
                router.push(decodeURIComponent(redirectUri));
              } else {
                router.push("/");
              }
            }
          });
        } else {
          fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
            }),
          }).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
              toast.success("Account created! Redirecting to login...");
              setTimeout(() => {
                router.push("/login");
              }, 2000);
            } else if (res.status === 400) {
              const { error } = await res.json();
              toast.error(error);
            } else {
              toast.error("Internal Server Error")
            }
          });
        }
      }}
      className="flex flex-col space-y-4 px-4 py-8 sm:px-16"
    >
      <div>
        <Input
          id="email"
          name="email"
          size="sm"
          type="email"
          placeholder="Email"
          autoComplete="email"
          required
        //className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <Input
          id="password"
          name="password"
          placeholder="Password"
          size="sm"
          type="password"
          required
        //className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <Button
        disabled={loading}
        isLoading={loading}
        color="default"
        type="submit"
      >
        <p>{type === "login" ? "Sign In" : "Sign Up"}</p>
      </Button>
      {type === "login" ? (
        <p className="text-center text-sm pt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold" >
            Sign up
          </Link>{" "}
          for free.
        </p>
      ) : (
        <p className="text-center text-sm pt-4">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold">
            Sign in
          </Link>{" "}
          instead.
        </p>
      )}
    </form>
  );
}