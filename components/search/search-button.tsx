"use client";

import { useModal } from "@/components/modal/search/provider";
import { ReactNode, Dispatch, SetStateAction } from "react";
import { Button } from "@nextui-org/react";
import { Search } from 'lucide-react';

export default function SearchModalButton({
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
            onClick={() => { if (closeMenuCallback) { closeMenuCallback(false); } modal?.show(children); }}
            isIconOnly color="default" variant="faded" aria-label="Search">
            <Search />
        </Button>
    );
}