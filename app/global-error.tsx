'use client'
import { Work_Sans } from 'next/font/google'
import './globals.css';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/react";

const inter = Work_Sans({ subsets: ['latin'] })

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const router = useRouter();
    return (
        <html>
            <body className={`${inter.className} bg-gradient-to-b from-[rgb(214,219,220)] to-white text-black dark:bg-gradient-to-b dark:from-black dark:to-black dark:text-white`}>
                <NextUIProvider navigate={router.push}>
                <NextThemesProvider attribute="class">
                <div className="h-screen flex gap-y-5 items-center justify-center">
                    <div className="flex-col items-center justify-center">
                        <h2 className="mb-3 mx-auto">Oops! Something went wrong.</h2>
                        <div className="flex gap-3 items-center justify-center">
                            {/*
                                <button className="bg-gray-100 p-3 hover:bg-gray-300 dark:bg-gray-600 rounded-xl">Try Again</button>
                                <button className="bg-gray-100 p-3 dark:bg-gray-600 hover:bg-gray-300 rounded-xl">Go Home</button>
                                */}
                            <Button onClick={
                                // Attempt to recover by trying to re-render the segment
                                () => reset()
                            }>Try Again</Button>
                            <Button href="/" >Go Home</Button>
                        </div>
                    </div>
                </div>
                </NextThemesProvider>
                </NextUIProvider>
            </body>
        </html>
    )
}