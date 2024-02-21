"use client";

import { FC } from "react";
import { Drawer } from "vaul";
import LoginModal from "../modal/login";

interface DrawerScrollableWithInputsProps {}

const DrawerScrollableWithInputs: FC<DrawerScrollableWithInputsProps> = () => {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button className="bg-slate-800 text-white py-1 px-3 rounded-md m-2">Drawer</button>
      </Drawer.Trigger>
      <Drawer.Portal >
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="flex flex-col fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-t-[10px] z-50 overflow-auto">
          <LoginModal/>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default DrawerScrollableWithInputs;