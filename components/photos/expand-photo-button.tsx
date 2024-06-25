"use client";

import { useModal } from "../modal/photo/provider";
import { ReactNode, Dispatch, SetStateAction } from "react";
import { Button } from "@nextui-org/react";

export default function ExpandPhotoButton({
  children,
  closeMenuCallback
}: {
  children: ReactNode;
  closeMenuCallback?: Dispatch<SetStateAction<boolean>>;
}) {
  const modal = useModal();
  return (
      <Button
        onClick={() => { if (closeMenuCallback) { closeMenuCallback(false); } modal!.show(children); }}
        color="default" variant="flat"
      >
        Open Photo
      </Button>
  );
}
