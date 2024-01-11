"use client";
import Form from './form-inner';
import { useRouter, usePathname } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import Image from "next/image";
import LoginButton from "./social-login-button";
import { Suspense } from "react";
import { Divider, Tab, Tabs, Link, Spacer } from "@nextui-org/react";
import React from "react";

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
      <div className={`${isModal ? "bg-white dark:bg-black border border-stone-200 dark:border-stone-700 sm:mx-auto w-full sm:max-w-md rounded-xl sm:shadow-md" : "border border-stone-200 dark:border-stone-700 sm:mx-auto w-full sm:max-w-md rounded-xl sm:shadow-md"}`}>
        <Tabs
          fullWidth
          size="md"
          aria-label="Tabs form"
          selectedKey={isModal ? selected : pathname}
          // @ts-ignore
          onSelectionChange={setSelected}
          classNames={{
            tabList: "rounded-t-xl rounded-b-none",
            tab: "rounded-t-xl rounded-b-none",
          }}
        >
          <Tab key="/login" title="Login" {...(isModal ? {} : { href: "/login" })}>
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
                    <Link className="font-semibold text-sm" color="foreground" onPress={() => pull_ForgotPassword(true)} >
                      Back to Login
                    </Link>
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
                    <Link className="font-semibold text-sm" color="foreground" {...(isModal ? { onPress: () => setSelected("/signup") } : { href: "/signup" })} >
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
                      <LoginButton signup={false} isModal={isModal} />
                    </Suspense>
                  </div>
                </>
              )
            }
          </Tab>
          <Tab key="/signup" title="Sign Up" {...(isModal ? {} : { href: "/signup" })}>
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
              <Link className="font-semibold text-sm" color="foreground" {...(isModal ? { onPress: () => setSelected("/login") } : { href: "/login" })}>
                Sign in
              </Link>
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
