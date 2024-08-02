"use client";

import Form from './form-inner';
import { useRouter, usePathname } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import Image from "next/image";
import LoginButton from "./social-login-button";
import { Suspense } from "react";
import { Divider, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import Link from 'next/link';

export default function FormWrapper(
  {
    isModal,
    onCloseAction
  }: {
    isModal?: boolean,
    onCloseAction?: Function

  }) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const redirectUri = searchParams.get('redirect');
  const [selected, setSelected] = React.useState("/login");
  const [forgotPassword, setForgotPassword] = React.useState(false);
  const pull_ForgotPassword = (back: boolean) => {
    if (back) {
      setForgotPassword(false);
    } else {
      setForgotPassword(true);
    }
  }
  const pathname = usePathname();
  return (
    <div className={`${isModal ? "flex items-center justify-center" : "flex h-screen w-screen items-center justify-center"}`}>
      <div className={`${isModal ? "bg-white dark:bg-black border border-stone-200 dark:border-stone-700 sm:mx-auto w-full rounded-xl sm:shadow-md" : "max-w-[348px] border border-stone-200 dark:border-stone-700 sm:max-w-md sm:mx-auto w-full rounded-xl sm:shadow-md"}`}>
        <Tabs
          fullWidth
          size="md"
          aria-label="Shift between Login and Signup forms"
          selectedKey={isModal ? selected : pathname}
          // @ts-ignore
          onSelectionChange={setSelected}
          classNames={{
            tabList: "rounded-t-xl rounded-b-none",
            tab: "rounded-t-xl rounded-b-none",
          }}
        >
          <Tab key="/login" title="Log In" {...(isModal ? {} : { href: "/login", as: Link })}>
            <Image
              alt="Prospector Minerals"
              width={100}
              height={100}
              className="relative mx-auto h-12 w-auto dark:scale-120 dark:rounded-full dark:border dark:border-stone-400 my-5"
              src="/PM-Favicon-New-Square.svg"
            />
            {
              forgotPassword ? (
                <>
                  <h1 className="mt-6 text-center font-medium text-3xl dark:text-white">
                    Reset Password
                  </h1>
                  <p className="text-center text-sm pt-4 px-16">
                    Send a login link to your account&apos;s email.
                  </p>
                  <Form type="forgotPassword" isModal={isModal} onCloseAction={onCloseAction} resetPasswordFunc={pull_ForgotPassword} />
                  <p className="text-center text-sm pt-8 pb-8 px-16">
                    <button className="hover:opacity-80 transition-opacity tap-highlight-transparent font-semibold text-sm" onClick={() => pull_ForgotPassword(true)} >
                      Back to Login
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <h1 className="mt-6 text-center font-medium text-3xl dark:text-white">
                    Welcome Back
                  </h1>
                  <Form type="login" isModal={isModal} onCloseAction={onCloseAction} resetPasswordFunc={pull_ForgotPassword} />
                  <p className="text-center text-sm pt-8 pb-8 px-16">
                    Don&apos;t have an account?{" "}
                    {isModal ? (
                      <button className="hover:opacity-80 transition-opacity tap-highlight-transparent font-semibold text-sm" {...(isModal ? { onClick: () => setSelected("/signup") } : { href: "/signup" })} >
                        Sign up
                      </button>
                    ) : (
                      <Link href="/signup">
                        <button className="hover:opacity-80 transition-opacity tap-highlight-transparent font-semibold text-sm" {...(isModal ? { onClick: () => setSelected("/signup") } : { href: "/signup" })} >
                          Sign up
                        </button>
                      </Link>
                    )}
                    {" "}
                    for free.
                  </p>
                  <Divider />
                  <div className="flex flex-col space-y-4 px-4 mt-8 mb-8 sm:px-16">
                    <Suspense
                      fallback={
                        <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
                      }
                    >
                      <LoginButton signup={false} isModal={isModal} />
                    </Suspense>
                  </div>
                </>
              )
            }
          </Tab>
          <Tab key="/signup" title="Sign Up" {...(isModal ? {} : { href: "/signup", as: Link })}>
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
            <Form type="register" isModal={isModal} onCloseAction={onCloseAction} />
            <p className="text-center text-sm pt-8 pb-8 px-16">
              Already have an account?{" "}
              {isModal ? (
                <button className="hover:opacity-80 transition-opacity tap-highlight-transparent font-semibold text-sm" {...(isModal ? { onClick: () => setSelected("/login") } : { href: "/login" })}>
                  Sign in
                </button>
              ) : (
                <Link href="/login">
                  <button className="hover:opacity-80 transition-opacity tap-highlight-transparent font-semibold text-sm" {...(isModal ? { onClick: () => setSelected("/login") } : { href: "/login" })}>
                    Sign in
                  </button>
                </Link>
              )}
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
                <LoginButton signup={true} isModal={isModal} />
              </Suspense>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div >
  )

}
