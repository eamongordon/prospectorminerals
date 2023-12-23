"use client";
import Form from './form-inner';
import { useRouter, usePathname } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import Image from "next/image";
import LoginButton from "./social-login-button";
import { Suspense } from "react";
import { Divider, Tab, Tabs, Link } from "@nextui-org/react";
import React from "react";

export default function FormWrapper({ isModal }: { isModal?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const redirectUri = searchParams.get('redirect');
  const [selected, setSelected] = React.useState("/login");
  const pathname = usePathname();
  console.log(pathname)
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="mx-5 border border-stone-200 dark:border-stone-700 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md">
        <Tabs
          fullWidth
          size="md"
          aria-label="Tabs form"
          selectedKey={isModal ? selected : pathname}
          // @ts-ignore
          onSelectionChange={setSelected}
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
            <p className="text-center text-sm pt-8 pb-8 px-16">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-sm" color="foreground" >
                Sign up
              </Link>{" "}
              for free.
            </p>
            <Divider />
            <div className="flex flex-col space-y-4 px-4 mt-8 mb-8 sm:px-16">
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
            <p className="text-center text-sm pt-8 pb-8 px-16">
              Already have an account?{" "}
              {isModal ? (
                <Link href="/login" className="font-semibold text-sm" color="foreground">
                  Sign in
                </Link>
                )
                : (
                  <Link href="/login" className="font-semibold text-sm" color="foreground">
                    Sign in
                  </Link>
                )
              }
              {" "}
              instead.
            </p>
            <Divider />
            <div className="flex flex-col space-y-4 px-4 mt-8 mb-8 sm:px-16">
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
