"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
//import LoadingDots from "@/components/icons/loading-dots";
import { Input, Button } from "@nextui-org/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import React from "react";


export default function Form({ type, isModal, onCloseAction, resetPasswordFunc }: { type: "login" | "register" | "forgotPassword", isModal?: boolean, onCloseAction?: Function, resetPasswordFunc?: Function }) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const redirectUri = searchParams.get('redirect');
  const [sentForgotPasswordEmail, setSentForgotPasswordEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (type === "login") {
          if (isModal) {
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
                if (isModal) {
                  // @ts-expect-error
                  onCloseAction();
                  toast.success("Logged In Successfully!");
                }
              }
            });
          } else {
            signIn("credentials", {
              callbackUrl: decodeURIComponent(redirectUri || "/"),
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
              // @ts-ignore
            }).then(({ error }) => {
              if (error) {
                setLoading(false);
                toast.error(error);
              }
            });
          }
        } else if (type === 'register') {
          fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
              name: e.currentTarget.nametxt.value ? e.currentTarget.nametxt.value : undefined
            }),
          }).then(async (res) => {
            if (res.status === 200) {
              signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
                // @ts-ignore
              }).then(({ error }) => {
                if (error) {
                  setLoading(false);
                  toast.error(error);
                } else {
                  router.refresh();
                  if (isModal) {
                    // @ts-expect-error
                    onCloseAction();
                    toast.success("Signed Up Successfully. Welcome aboard!");
                  } else {
                    if (redirectUri) {
                      router.push(decodeURIComponent(redirectUri));
                    } else {
                      router.push("/");
                    }
                  }
                }
              })
            } else if (res.status === 400) {
              setLoading(false);
              const { error } = await res.json();
              toast.error(error);
            } else {
              toast.error("Internal Server Error")
            }
          });
        } else {
          //Forgot Password
          setLoading(true);
          signIn('email', { redirect: false, email: e.currentTarget.email.value, callbackUrl: '/account/settings/#new-password' }).then(() => {
            setLoading(false);
            setSentForgotPasswordEmail(true);
            toast.success("Email Sent! Check your inbox.");
          });
        }
      }}
      className="flex flex-col space-y-4 px-4 mt-8 sm:px-16"
    >
      {type === 'register' ? (
        <div>
          <Input
            id="nametxt"
            name="nametxt"
            placeholder="Name (Optional)"
            size="sm"
            type="text"
          //className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
      ) : (null)}
      <div>
        <Input
          id="email"
          name="email"
          size="sm"
          type="email"
          placeholder="Email"
          autoComplete="email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        //className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      {type === 'register' || type === 'login' ? (
        <div>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            size="sm"
            type="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          //className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
      ) : (null)
      }
      {type === 'login' ? (
        <button className="hover:opacity-80 transition-opacity tap-highlight-transparent relative inline-flex items-center font-semibold text-sm" color="foreground" {...(resetPasswordFunc ? { onClick: () => resetPasswordFunc(false) } : {})} >
          Forgot Password?
        </button>
      ) : (null)}
      <Button
        disabled={loading}
        isLoading={loading}
        color="default"
        type="submit"
      >
        <p>{type === "login" ? "Sign In" : type === "register" ? "Sign Up" : sentForgotPasswordEmail ? "Resend Email" : "Send Email"}</p>
      </Button>
    </form>
  );
}