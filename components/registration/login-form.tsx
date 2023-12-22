"use client";
import Form from './form-inner';
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
