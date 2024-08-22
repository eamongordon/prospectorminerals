"use client";

import { ModalProvider } from "@/components/modal/provider";
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from 'next/navigation';
import { Toaster } from "sonner";
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ subsets: ['latin'] })

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class">
          <Toaster className={`${workSans.className} dark:hidden`} />
          <Toaster theme="dark" className={`${workSans.className} hidden dark:block`} />
          <ModalProvider>
            {children}
          </ModalProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
