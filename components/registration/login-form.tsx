"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense, type Key } from "react";
import { Button, Input, Divider, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toast } from "sonner";
import { createUser } from "@/lib/actions";
import LoginButton from "./social-login-button";

type AuthHeaderProps = {
  title: string;
};

type AuthFooterProps = {
  isModal?: boolean;
  linkText?: string;
  secondLinkText?: string;
  linkHref: string;
  buttonText: string;
  onClick: () => void;
};

type AuthFormProps = {
  type: "login" | "register" | "forgotPassword";
  data: { email: string; password?: string };
  setData: React.Dispatch<React.SetStateAction<{ email: string; password?: string }>>;
  loading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, type: "login" | "register" | "forgotPassword") => void;
  resetPassword?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthHeader = ({ title }: AuthHeaderProps) => (
  <>
    <Image
      alt="Prospector Minerals"
      width={100}
      height={100}
      className="relative mx-auto h-12 w-auto dark:scale-120 dark:rounded-full dark:border dark:border-stone-400 my-5"
      src="/PM-Favicon-New-Square.svg"
    />
    <h1 className="mt-6 text-center font-medium text-3xl dark:text-white">
      {title}
    </h1>
  </>
);

const AuthFooter = ({ isModal, linkText, secondLinkText, linkHref, buttonText, onClick }: AuthFooterProps) => (
  <p className="text-center text-sm pt-8 pb-8 px-16">
    {linkText && linkText + " "}
    {isModal ? (
      <button className="hover:opacity-80 transition-opacity tap-highlight-transparent font-semibold text-sm" onClick={onClick}>
        {buttonText}
      </button>
    ) : (
      <Link href={linkHref}>
        <button className="hover:opacity-80 transition-opacity tap-highlight-transparent font-semibold text-sm">
          {buttonText}
        </button>
      </Link>
    )}
    {secondLinkText && " " + secondLinkText}
  </p>
);

const AuthForm = ({ type, data, setData, loading, handleSubmit, resetPassword }: AuthFormProps) => (
  <form
    onSubmit={(e) => handleSubmit(e, type)}
    className="flex flex-col space-y-4 px-4 mt-8 sm:px-16"
  >
    {type === "register" && (
      <div>
        <Input
          id="nametxt"
          name="nametxt"
          label="Name (Optional)"
          size="sm"
          radius="md"
          type="text"
        />
      </div>
    )}
    <div>
      <Input
        id="email"
        name="email"
        size="sm"
        radius="md"
        type="email"
        label="Email"
        autoComplete="email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
        required
      />
    </div>
    {type !== "forgotPassword" && (
      <div>
        <Input
          id="password"
          name="password"
          label="Password"
          size="sm"
          radius="md"
          type="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        />
      </div>
    )}
    {type === "login" && (
      <div>
        <button type="button" className="hover:opacity-80 transition-opacity tap-highlight-transparent relative inline-flex items-center font-semibold text-sm" color="foreground" onClick={() => resetPassword!(true)}>
          Forgot Password?
        </button>
      </div>
    )}
    <Button
      isLoading={loading}
      color="default"
      type="submit"
    >
      <p>{type === "login" ? "Sign In" : type === "register" ? "Sign Up" : "Send Email"}</p>
    </Button>
  </form>
);

const FallbackUI = () => (
  <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
);

export default function FormWrapper({ isModal, onCloseAction }: { isModal?: boolean, onCloseAction?: Function }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const callbackUrl = searchParams.get('callbackUrl');
  const [selected, setSelected] = useState<Key>(isModal ? "/login" : pathname);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ email: string; password?: string }>({
    email: "",
    password: "",
  });

  const handleLogin = async (email: string, password: string, initialLogin?: boolean) => {
    try {
      const signInResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      setLoading(false);
      const toastLoginSuccessMsg = initialLogin ? "Signed Up Successfully. Welcome aboard!" : "Logged In Successfully!";
      if (signInResult?.error) {
        toast.error("Invalid Email or Password");
      } else {
        router.refresh();
        if (isModal) {
          onCloseAction?.();
          toast.success(toastLoginSuccessMsg);
        } else {
          if (callbackUrl) {
            router.push(decodeURIComponent(callbackUrl));
          } else {
            router.push("/");
            toast.success(toastLoginSuccessMsg);
          }
        }
      }
    } catch {
      setLoading(false);
      toast.error("An unknown error occurred. Please try again later.");
    }
  };

  const handleRegister = async (email: string, password: string, name?: string) => {
    try {
      await createUser({ email, password, name });
      await handleLogin(email, password, true);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        if (err.message === "User already exists") {
          toast.error("An account already exists under this email.");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      } else {
        toast.error("An unknown error occurred. Please try again later.");
      }
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      const signInResult = await signIn('nodemailer', { redirect: false, email, callbackUrl: '/account/settings/#new-password' });
      setLoading(false);
      if (signInResult?.error) {
        toast.error("There was an error sending the email. Please try again later.");
      } else {
        toast.success("Email Sent! Check your inbox.");
      }
    } catch {
      setLoading(false);
      toast.error("There was an error sending the email. Please try again later.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: "login" | "register" | "forgotPassword") => {
    e.preventDefault();
    setLoading(true);

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password?.value;
    const name = e.currentTarget.nametxt?.value;

    if (type === "login") {
      await handleLogin(email, password);
    } else if (type === 'register') {
      await handleRegister(email, password, name);
    } else {
      await handleForgotPassword(email);
    }
  };

  return (
    <div className={`${isModal ? "flex items-center justify-center" : "flex h-screen w-screen items-center justify-center"}`}>
      <div className={`${isModal ? "bg-white dark:bg-black border border-stone-200 dark:border-stone-700 sm:mx-auto w-full rounded-xl sm:shadow-md" : "max-w-[348px] border border-stone-200 dark:border-stone-700 sm:max-w-md sm:mx-auto w-full rounded-xl sm:shadow-md"}`}>
        <Tabs
          fullWidth
          size="md"
          aria-label="Shift between Login and Signup forms"
          selectedKey={isModal ? selected.toString() : pathname}
          onSelectionChange={setSelected}
          classNames={{
            tabList: "rounded-t-xl rounded-b-none",
            tab: "rounded-t-xl rounded-b-none",
          }}
        >
          <Tab key="/login" title="Log In" {...(isModal ? {} : { href: "/login", as: Link })}>
            <AuthHeader title={forgotPassword ? "Reset Password" : "Welcome Back"} />
            {forgotPassword ? (
              <>
                <p className="text-center text-sm pt-4 px-16">
                  Send a login link to your account&apos;s email.
                </p>
                <AuthForm type="forgotPassword" data={data} setData={setData} loading={loading} handleSubmit={handleSubmit} />
                <AuthFooter isModal={isModal} linkHref="/login" buttonText="Back to Login" onClick={() => setForgotPassword(false)} />
              </>
            ) : (
              <>
                <AuthForm type="login" data={data} setData={setData} loading={loading} handleSubmit={handleSubmit} resetPassword={setForgotPassword} />
                <AuthFooter isModal={isModal} linkText="Don&apos;t have an account?" secondLinkText="for free." linkHref="/signup" buttonText="Sign Up" onClick={() => setSelected("/signup")} />
                <Divider />
                <div className="flex flex-col space-y-4 px-4 mt-8 mb-8 sm:px-16">
                  <Suspense fallback={<FallbackUI />}>
                    <LoginButton signup={false} isModal={isModal} />
                  </Suspense>
                </div>
              </>
            )}
          </Tab>
          <Tab key="/signup" title="Sign Up" {...(isModal ? {} : { href: "/signup", as: Link })}>
            <AuthHeader title="Get Started" />
            <AuthForm type="register" data={data} setData={setData} loading={loading} handleSubmit={handleSubmit} />
            <AuthFooter isModal={isModal} linkText="Already have an account?" secondLinkText="instead." linkHref="/login" buttonText="Log In" onClick={() => setSelected("/login")} />
            <Divider />
            <div className="flex flex-col space-y-4 px-4 mt-8 mb-8 sm:px-16">
              <Suspense fallback={<FallbackUI />}>
                <LoginButton signup={true} isModal={isModal} />
              </Suspense>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}