"use client";

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from 'next/navigation';
import { Toaster } from "sonner";
import { workSansClassName } from '@/lib/utils';
import { useTheme } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class">
          <Toaster theme={resolvedTheme as "system" | "light" | "dark"} className={workSansClassName} />
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
