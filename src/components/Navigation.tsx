'use client'

import React, { useCallback } from "react";
import {  
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle, 
  NavbarMenu,  
  NavbarMenuItem
} from "@nextui-org/navbar";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { usePathname } from "next/navigation";

type MenuItems = {
  friendlyName: string;
  href: string;
}

const menuItems: MenuItems[] = [
  {friendlyName: 'Dashboard', href: '/' },
  {friendlyName: 'Team Schedule', href: '/team-schedule'},
  {friendlyName: 'Awards', href: '/awards'},
  {friendlyName: 'Recruiting', href: '/recruiting'},
  {friendlyName: 'Draft Results', href: '/draft-results'},
];


export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const isPathActive = useCallback((href: string) => pathname === href, [pathname]);


  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">CB25 Dynasty Tracker</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index} isActive={isPathActive(item.href)}>
            <Link color="foreground" href={item.href}>
              {item.friendlyName}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={item.href}
            >
              {item.friendlyName}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
