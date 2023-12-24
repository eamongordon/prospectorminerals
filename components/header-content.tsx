"use client"

import React from "react";
import { Navbar, NavbarMenuToggle, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@nextui-org/react";
import PMLogo from "./pmLogo";
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { signOut } from "next-auth/react";
import LoginModalButton from './registration/login-modal-button';
import LoginModal from './modal/login';
import RegModal from './next-ui-modal';

export default function HeaderComp({
    loggedIn,
    userData
}: {
    loggedIn: boolean,
    userData?: {
        name?: string,
        image?: string
        email?: string
    }
}) {
    const { name, image, email } = userData || {};
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathname = usePathname();
    return (
        <Navbar
            isBordered
            maxWidth="xl"
            position="sticky"
            className="flex"
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="mr-4 sm:hidden"
            />

            <NavbarBrand className="flex-none">
                <Link href="/">
                    <PMLogo />
                </Link>
            </NavbarBrand>
            <NavbarContent className="flex-auto gap-[72px]" justify="end">
                <NavbarContent className="hidden lg:flex gap-10" justify="end">
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Learn
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Minerals
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Localities
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Articles
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Photos
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                {loggedIn ? (
                    <NavbarContent className="hidden sm:flex gap-5">
                        <Button isIconOnly color="default" variant="faded" aria-label="Take a photo">
                            <Search />
                        </Button>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="default"
                                    name={name ? name : undefined}
                                    size="sm"
                                    src={image ? image : undefined}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={(item) => {
                                if (item === 'logout') {
                                    signOut();
                                }
                            }}>
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{name ? name : email}</p>
                                </DropdownItem>
                                <DropdownItem key="dashboard">Dashboard</DropdownItem>
                                <DropdownItem key="settings" href="/account/settings">Settings</DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarContent>
                ) : (
                    <NavbarContent className="flex gap-5">
                        <Button isIconOnly color="default" variant="faded" aria-label="Take a photo">
                            <Search />
                        </Button>
                        <RegModal/>
                    </NavbarContent>
                )}
            </NavbarContent>
        </Navbar>
    )
}