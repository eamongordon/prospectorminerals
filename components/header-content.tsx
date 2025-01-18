"use client"

import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Link as UILink } from "@heroui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import CustomAvatar from "./avatar";
import PMLogo from "./pm-logo";
import SearchComp from './search';
import { useModal } from "./modal/provider";
import LoginForm from "./registration/login-form";
import { Search } from "lucide-react";

export default function HeaderComp({
    userData
}: {
    userData?: {
        name?: string,
        image?: string
        email?: string
    }
}) {
    const { name, image, email } = userData || {};
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const modal = useModal();
    const loggedIn = !!userData;

    useEffect(() => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    }, [pathname]);

    const handleMenuItemPress = (targetPath: string) => {
        if (pathname === targetPath || (targetPath && targetPath.startsWith('/#') && targetPath.substring(0, 1) === pathname)) {
            setIsMenuOpen(false);
        }
    }

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
                        <UILink color="foreground" href="/#explore">
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
                    />
                    <Button
                        onPress={() => { setIsMenuOpen(false); modal?.show(<section className="max-w-screen-xl px-8 w-full"><SearchComp /></section>, "search"); }}
                        isIconOnly color="default" variant="faded" aria-label="Search">
                        <Search />
                    </Button>
                    {loggedIn ? (
                        <Dropdown placement="bottom-end" shouldBlockScroll={false}>
                            <DropdownTrigger>
                                <CustomAvatar
                                    isBordered
                                    as="button"
                                    className="hidden sm:flex transition-transform"
                                    color="default"
                                    name={name ? name : undefined}
                                    size="sm"
                                    src={image ? image : undefined}
                                    height={32}
                                    width={32}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={(item) => {
                                if (item === 'logout') {
                                    signOut({ callbackUrl: pathname.includes('/account') ? '/' : undefined });
                                }
                            }}>
                                <DropdownItem key="profile" className="h-14 gap-2" as={Link} href="/account/settings">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{name ? name : email}</p>
                                </DropdownItem>
                                <DropdownItem key="settings" as={Link} href="/account/settings">Settings</DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        <Button
                            onPress={() => { setIsMenuOpen(false); modal?.show(<LoginForm isModal={true} onCloseAction={modal?.hide} />, "registration"); }}
                            color="default" variant="flat" className="hidden sm:flex"
                        >
                            Log In
                        </Button>
                    )}
                </NavbarContent>
                <NavbarMenu>
                    <NavbarMenuItem key="learn">
                        <UILink color="foreground" href="/#explore" onPress={() => handleMenuItemPress('/#explore')}>
                            Learn
                        </UILink>
                    </NavbarMenuItem>
                    <NavbarMenuItem key="minerals">
                        <UILink color="foreground" href="/minerals" onPress={() => handleMenuItemPress('/minerals')}>
                            Minerals
                        </UILink>
                    </NavbarMenuItem>
                    <NavbarMenuItem key="localities">
                        <UILink color="foreground" href="/localities" onPress={() => handleMenuItemPress('/localities')}>
                            Localities
                        </UILink>
                    </NavbarMenuItem>
                    <NavbarMenuItem key="articles">
                        <UILink color="foreground" href="/articles" onPress={() => handleMenuItemPress('/articles')}>
                            Articles
                        </UILink>
                    </NavbarMenuItem>
                    <NavbarMenuItem key="photos">
                        <UILink color="foreground" href="/photos" onPress={() => handleMenuItemPress('/photos')}>
                            Photos
                        </UILink>
                    </NavbarMenuItem>
                    <Divider className="my-4" />
                    <div className="flex flex-col">
                        {loggedIn ? (
                            <Dropdown placement="bottom-start">
                                <DropdownTrigger>
                                    <NavbarContent className="flex items-center">
                                        <CustomAvatar
                                            isBordered
                                            as="button"
                                            className="transition-transform"
                                            color="default"
                                            name={name ? name : undefined}
                                            size="md"
                                            src={image ? image : undefined}
                                            height={40}
                                            width={40}
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
                                    <DropdownItem key="settings" as={Link} href="/account/settings">Settings</DropdownItem>
                                    <DropdownItem key="logout" color="danger">
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        ) : (
                            <Button
                                onPress={() => { setIsMenuOpen(false); modal?.show(<LoginForm isModal={true} onCloseAction={modal?.hide} />, "registration"); }}
                                color="default" variant="flat" className="px-4"
                            >
                                Log In
                            </Button>
                        )}
                    </div>
                </NavbarMenu>
            </NavbarContent>
        </Navbar>
    )
}