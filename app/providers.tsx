"use client";

import { ModalProvider } from "@/components/modal/provider";
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from 'next/navigation';
import { Toaster } from "sonner";
import { workSansClassName } from '@/lib/utils';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class">
          <Toaster className={`${workSansClassName} dark:hidden`} />
          <Toaster theme="dark" className={`${workSansClassName} hidden dark:block`} />
          <ModalProvider>
            {children}
          </ModalProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
