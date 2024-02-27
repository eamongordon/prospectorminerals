"use client";

import { useModal } from "@/components/modal/registration/provider";
import { ReactNode, Dispatch, SetStateAction } from "react";
import { Button } from "@nextui-org/react";

export default function LoginModalButton({
  isMobile,
  children,
  closeMenuCallback
}: {
  isMobile?: boolean
  children: ReactNode;
  closeMenuCallback?: Dispatch<SetStateAction<boolean>>;
}) {
  const modal = useModal();
  return (
    <Button 
      onClick={() => {if (closeMenuCallback) {closeMenuCallback(false);} modal?.show(children);}}
      color="default" variant="flat" className={`${isMobile ? "px-4": "hidden sm:flex"}`}
    >
      Log In
    </Button>
  );
}
