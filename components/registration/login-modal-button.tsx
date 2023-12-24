"use client";

import { useModal } from "@/components/modal/provider";
import { ReactNode } from "react";
import { Button } from "@nextui-org/react";

export default function LoginModalButton({
  children,
}: {
  children: ReactNode;
}) {
  const modal = useModal();
  return (
    <Button
      onClick={() => modal?.show(children)}
      color="default" variant="flat" className="flex"
    >
      Log In
    </Button>
  );
}
