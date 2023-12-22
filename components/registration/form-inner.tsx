"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
//import LoadingDots from "@/components/icons/loading-dots";
import { Input, Button } from "@nextui-org/react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter} from "next/navigation";
import { useSearchParams } from 'next/navigation'
import React from "react";

export default function Form({ type }: { type: "login" | "register" }) {
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