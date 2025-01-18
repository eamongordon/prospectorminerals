"use client";

import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from 'next/navigation';
import { Toaster } from "sonner";
import { workSansClassName } from '@/lib/utils';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <SessionProvider>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class">
          <Toaster className={`${workSansClassName} dark:hidden`} />
          <Toaster theme="dark" className={`${workSansClassName} hidden dark:block`} />
          {children}
        </NextThemesProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
