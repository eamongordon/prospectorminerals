"use client";

import { toast } from "sonner";
//import { createContact } from "@/lib/functions/contacts/contacts";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/registration/login-form"
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "./provider";
import va from "@vercel/analytics";
import { useEffect, useState } from "react";

export default function LoginModal() {
  const router = useRouter();
  const modal = useModal();

  /*
  useEffect(() => {
    setData((prev) => ({
      ...prev
    }));
  }, [data.name]);
*/
  return (
    <LoginForm isModal={true}/>
  );
}