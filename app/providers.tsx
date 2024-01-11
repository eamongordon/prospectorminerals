"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ModalProvider } from "@/components/modal/provider";
import { useRouter } from 'next/navigation';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class">
          <Toaster className="dark:hidden" />
          <Toaster theme="dark" className="hidden dark:block" />
          <ModalProvider>
            {children}
          </ModalProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
