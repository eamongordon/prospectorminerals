"use client"

import React from "react";
import { Navbar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarBrand, NavbarContent, NavbarItem, Link as UILink, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Divider, Avatar, Button } from "@nextui-org/react";
import PMLogo from "./pmLogo";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { signOut } from "next-auth/react";
import LoginModalButton from './registration/login-modal-button';
import LoginModal from './modal/login';
import { toast } from "sonner";
import SearchModalButton from "./search/search-button";
//import RegModal from './next-ui-modal';

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
            isMenuOpen={isMenuOpen}
            maxWidth="xl"
            position="sticky"
            className="flex"
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="justify-start sm:hidden"
            />

            <NavbarBrand className="flex-none justify-center sm:justify-normal">
                <Link href="/">
                    <PMLogo />
                </Link>
            </NavbarBrand>
            <NavbarContent className="gap-[72px]" justify="center">
                <NavbarContent className="hidden lg:flex gap-10" justify="end">
                    <NavbarItem>
                        <UILink color="foreground" href="#">
                            Learn
                        </UILink>
                    </NavbarItem>
                    <NavbarItem>
                        <UILink color="foreground" href="/minerals">
                            Minerals
                        </UILink>
                    </NavbarItem>
                    <NavbarItem>
                        <UILink color="foreground" href="/localities">
                            Localities
                        </UILink>
                    </NavbarItem>
                    <NavbarItem>
                        <UILink color="foreground" href="/articles">
                            Articles
                        </UILink>
                    </NavbarItem>
                    <NavbarItem>
                        <UILink color="foreground" href="/photos">
                            Photos
                        </UILink>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent className="flex gap-5" justify="end">
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="mr-4 hidden sm:block lg:hidden xl:hidden"
                        onChange={() => console.log('')}
                    />
                        <>
                            <SearchModalButton {...(isMenuOpen ? { closeMenuCallback: setIsMenuOpen } : {})}><LoginModal /></SearchModalButton>
                        </>
                    {loggedIn ? (
                        <>
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="hidden sm:flex transition-transform"
                                        color="default"
                                        name={name ? name : undefined}
                                        size="sm"
                                        src={image ? image : undefined}
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={(item) => {
                                    if (item === 'logout') {
                                        signOut({ callbackUrl: pathname.includes('/account') ? '/' : undefined });
                                    }
                                }}>
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-semibold">Signed in as</p>
                                        <p className="font-semibold">{name ? name : email}</p>
                                    </DropdownItem>
                                    <DropdownItem key="dashboard">Dashboard</DropdownItem>
                                    <DropdownItem key="settings" as={Link} href="/account/settings">Settings</DropdownItem>
                                    <DropdownItem key="logout" color="danger">
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </>
                    ) : (
                        <>
                            <LoginModalButton {...(isMenuOpen ? { closeMenuCallback: setIsMenuOpen } : {})}><LoginModal /></LoginModalButton>
                        </>
                    )}
                </NavbarContent>
                <NavbarMenu>
                    <NavbarMenuItem key="learn">
                        <UILink color="foreground" href="#">
                            Learn
                        </UILink>
                    </NavbarMenuItem>
                    <NavbarMenuItem key="minerals">
                        <UILink color="foreground" href="/minerals">
                            Minerals
                        </UILink>
                    </NavbarMenuItem>
                    <NavbarMenuItem key="localities">
                        <UILink color="foreground" href="/localities">
                            Localities
                        </UILink>
                    </NavbarMenuItem>
                    <NavbarMenuItem key="articles">
                        <UILink color="foreground" href="/articles">
                            Articles
                        </UILink>
                    </NavbarMenuItem>
                    <NavbarMenuItem key="photos">
                        <UILink color="foreground" href="/photos">
                            Photos
                        </UILink>
                    </NavbarMenuItem>
                    <Divider className="my-4" />
                    <div className="flex flex-col">
                        {loggedIn ? (
                            <Dropdown placement="bottom-start">
                                <DropdownTrigger>
                                    <NavbarContent className="flex items-center">
                                        <Avatar
                                            isBordered
                                            as="button"
                                            className="transition-transform"
                                            color="default"
                                            name={name ? name : undefined}
                                            size="md"
                                            src={image ? image : undefined}
                                        />
                                        <div className="h-14 gap-2 py-1">
                                            <p className="text-sm">Signed in as</p>
                                            <p className="font-semibold">{name ? name : email}</p>
                                        </div>
                                    </NavbarContent>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={(item) => {
                                    if (item === 'logout') {
                                        signOut({ callbackUrl: pathname.includes('/account') ? '/' : undefined });
                                    }
                                }}>
                                    <DropdownItem key="dashboard">Dashboard</DropdownItem>
                                    <DropdownItem key="settings" as={Link} href="/account/settings">Settings</DropdownItem>
                                    <DropdownItem key="logout" color="danger">
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        ) : (
                            <LoginModalButton isMobile={true} closeMenuCallback={setIsMenuOpen}><LoginModal /></LoginModalButton>
                        )}
                    </div>
                </NavbarMenu>
            </NavbarContent>
        </Navbar>
    )
}