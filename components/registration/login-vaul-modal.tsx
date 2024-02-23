"use client";

import { FC } from "react";
import { ReactNode, useState } from "react";
import { Drawer } from "vaul";
import LoginModal from "../modal/login";

interface DrawerScrollableWithInputsProps {
    children: ReactNode;
}

const DrawerScrollableWithInputs: FC<DrawerScrollableWithInputsProps> = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(true);
    return (
        <Drawer.Root shouldScaleBackground open={open}  onOpenChange={() => {setOpen(false)}}>
            <Drawer.Trigger asChild>
                <button className="bg-slate-800 text-white py-1 px-3 rounded-md m-2">Drawer</button>
            </Drawer.Trigger>
            <Drawer.Portal >
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="flex flex-col fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-t-[10px] z-50">
                    <div className="overflow-auto">
                        {children}
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default DrawerScrollableWithInputs;