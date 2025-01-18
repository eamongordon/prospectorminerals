'use client'

import { workSansClassName } from '@/lib/utils';
import { Button } from "@heroui/react";
import Link from "next/link";
import './globals.css';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body className={`${workSansClassName} bg-gradient-to-b from-[rgb(214,219,220)] to-white text-black dark:bg-gradient-to-b dark:from-black dark:to-black dark:text-white`}>
                <div className="h-screen flex gap-y-5 items-center justify-center">
                    <div className="flex-col items-center justify-center">
                        <h2 className="mb-3 mx-auto">Oops! Something went wrong.</h2>
                        <div className="flex gap-3 items-center justify-center">
                            <Button onPress={
                                // Attempt to recover by trying to re-render the segment
                                () => reset()
                            }>Try Again</Button>
                            <Button as={Link} href="/" >Go Home</Button>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}