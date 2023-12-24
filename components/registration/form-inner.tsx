"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
//import LoadingDots from "@/components/icons/loading-dots";
import { Input, Button } from "@nextui-org/react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import React from "react";


export default function Form({ type, isModal, onCloseAction }: { type: "login" | "register", isModal?: boolean, onCloseAction?: Function }) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const redirectUri = searchParams.get('redirect');
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
                console.log(isModal);
                console.log('CloseAction');
                // @ts-expect-error
                onCloseAction();
              } else {
                console.log('hey');
                if (redirectUri) {
                  router.push(decodeURIComponent(redirectUri));
                } else {
                  router.push("/");
                }
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
      ) : (<></>)}
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
      <Button
        disabled={loading}
        isLoading={loading}
        color="default"
        type="submit"
      >
        <p>{type === "login" ? "Sign In" : "Sign Up"}</p>
      </Button>
    </form>
  );
}