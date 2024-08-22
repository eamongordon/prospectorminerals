'use client'
import { Work_Sans } from 'next/font/google'
import './globals.css';
import { Button } from "@nextui-org/react";
import Link from "next/link";

const workSans = Work_Sans({ subsets: ['latin'] })

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body className={`${workSans.className} bg-gradient-to-b from-[rgb(214,219,220)] to-white text-black dark:bg-gradient-to-b dark:from-black dark:to-black dark:text-white`}>
                <div className="h-screen flex gap-y-5 items-center justify-center">
                    <div className="flex-col items-center justify-center">
                        <h2 className="mb-3 mx-auto">Oops! Something went wrong.</h2>
                        <div className="flex gap-3 items-center justify-center">
                            <Button onClick={
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