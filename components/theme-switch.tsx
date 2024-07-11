"use client";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Skeleton } from "@nextui-org/react";
import { Laptop2, Moon, Sun } from "lucide-react";
import { useTheme } from 'next-themes';
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [hasSetTheme, setHasSetTheme] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Skeleton className="rounded-lg">
                <div className="h-9 rounded-lg bg-default-300"></div>
            </Skeleton>
        )
    }

    return (
        <div className="pt-8 flex-col justify-start">
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        startContent={
                            (() => {
                                if (hasSetTheme) {
                                    if (theme === 'light') {
                                        return <Sun />
                                    } else if (theme === 'dark') {
                                        return <Moon />
                                    } else {
                                        return <Laptop2 />
                                    }
                                } else {
                                    if (resolvedTheme === 'light') {
                                        return <Sun />
                                    } else if (resolvedTheme === 'dark') {
                                        return <Moon />
                                    } else {
                                        return <></>
                                    }
                                }
                            })()
                        }
                    >
                        {
                            (() => {
                                if (hasSetTheme) {
                                    if (theme === 'light') {
                                        return <>Light</>
                                    } else if (theme === 'dark') {
                                        return <>Dark</>
                                    } else {
                                        return <>Auto</>
                                    }
                                } else {
                                    if (resolvedTheme === 'light') {
                                        return <>Light</>
                                    } else if (resolvedTheme === 'dark') {
                                        return <>Dark</>
                                    } else {
                                        return <></>
                                    }
                                }
                            })()
                        }
                    </Button>
                </DropdownTrigger>
                <DropdownMenu variant="faded" aria-label="Shift Theme" onAction={(key) => { setTheme(key as string); setHasSetTheme(true) }}>
                    <DropdownItem
                        key="system"
                        startContent={<Laptop2 />}
                    >
                        Auto
                    </DropdownItem>
                    <DropdownItem
                        key="light"
                        startContent={<Sun />}
                    >
                        Light
                    </DropdownItem>
                    <DropdownItem
                        key="dark"
                        startContent={<Moon />}
                    >
                        Dark
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}