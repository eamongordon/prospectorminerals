"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <NextThemesProvider attribute="class">
          <Toaster className="dark:hidden" />
          <Toaster theme="dark" className="hidden dark:block" />
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
