"use client";

import { useModal } from "@/components/modal/registration/provider";
import { ReactNode } from "react";
import { Button } from "@nextui-org/react";

export default function LoginModalButton({
  isMobile,
  children
}: {
  isMobile?: boolean
  children: ReactNode;
}) {
  const modal = useModal();
  return (
    <Button
      onClick={() => modal?.show(children)}
      color="default" variant="flat" className={`${isMobile ? "px-4": "hidden sm:flex"}`}
    >
      Log In
    </Button>
  );
}
