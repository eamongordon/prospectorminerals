"use client";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn } from "@nextui-org/react";
import { Sun, Moon, Laptop2 } from "lucide-react";
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="bordered"
                >
                    Theme
                </Button>
            </DropdownTrigger>
            {/*@ts-expect-error*/}
            <DropdownMenu variant="faded" aria-label="Dropdown menu with icons" onAction={(key) => {setTheme(key); router.refresh()}}>
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
    )
}