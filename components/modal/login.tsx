"use client";

import { useModal } from "@/components/modal/registration/provider";
import LoginForm from "@/components/registration/login-form";

export default function LoginModal() {
  const modal = useModal();

  return (
    <LoginForm isModal={true} onCloseAction={modal?.hide} />
  );
}