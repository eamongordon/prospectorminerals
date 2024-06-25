"use client";

import { useModal } from "@/components/modal/photo/provider";

export default function PhotoModal({
    children,
}: {
    children: React.ReactNode
}) {
    const modal = useModal();

    return (
<>{children}</>
    );
    {/*chore: experiment if modal!.hide prevents error of no provider*/}
}