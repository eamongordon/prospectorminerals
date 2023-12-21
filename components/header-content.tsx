"use client"

import React from "react";
import { Navbar, NavbarMenuToggle, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@nextui-org/react";
import PMLogo from "./pmLogo";
import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react';

export default function HeaderComp({
    loggedIn,
}: {
    loggedIn: boolean
}) {
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
                <PMLogo />
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
                                    name="Jason Hughes"
                                    size="sm"
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">zoey@example.com</p>
                                </DropdownItem>
                                <DropdownItem key="settings">My Settings</DropdownItem>
                                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                <DropdownItem key="analytics">Analytics</DropdownItem>
                                <DropdownItem key="system">System</DropdownItem>
                                <DropdownItem key="configurations">Configurations</DropdownItem>
                                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
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
                        <Button as={Link} color="default" href={{
                            pathname: '/login',
                            query: {
                                redirect: encodeURIComponent(pathname)
                            }
                        }} variant="flat" className="hidden sm:flex">
                            Log In
                        </Button>
                    </NavbarContent>
                )}
            </NavbarContent>
        </Navbar>
    )
}