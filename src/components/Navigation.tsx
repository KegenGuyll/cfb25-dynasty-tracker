'use client'

import React, { useCallback } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react"
import Link from 'next/link'
import { useParams, usePathname, useSearchParams } from 'next/navigation'

type MenuItems = {
  friendlyName: string
  href: string
}

const menuItems = (
  dynastyId?: string,
  teamId?: string,
  year?: string
): MenuItems[] => {
  const items: MenuItems[] = [
    { friendlyName: 'Dynasty Dashboard', href: '/dynasty' },
    { friendlyName: 'Download', href: '/dynasty/download' },
  ]

  if (dynastyId && teamId) {
    items.push({
      friendlyName: 'All Seasons',
      href: `/dynasty/${dynastyId}/dashboard/${teamId}`,
    })
  }

  // if (dynastyId && teamId) {
  //   items.push({
  //     friendlyName: 'Team Dashboard',
  //     href: `/dynasty/${dynastyId}/team/${teamId}`,
  //   })
  // }

  if (dynastyId && teamId && year) {
    items.push({
      friendlyName: `${year} Season`,
      href: `/dynasty/${dynastyId}/dashboard/${teamId}/${year}`,
    })
  }

  // if (dynastyId && teamId && year) {
  //   items.push({
  //     friendlyName: 'Recruiting',
  //     href: `/dynasty/${dynastyId}/team/${teamId}/year/${year}/recruiting`,
  //   })
  // }

  return items
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const pathname = usePathname()

  const { dynastyId, teamId, year } = useParams()

  const isPathActive = useCallback(
    (href: string) => pathname.includes(href),
    [pathname]
  )

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">CFB25 Dynasty Tracker</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems(String(dynastyId), String(teamId), String(year)).map(
          (item, index) => (
            <NavbarItem key={index} isActive={isPathActive(item.href)}>
              <Link color="foreground" href={item.href}>
                {item.friendlyName}
              </Link>
            </NavbarItem>
          )
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems(String(dynastyId), String(teamId), String(year)).map(
          (item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
                }
                className="w-full"
                href={item.href}
              >
                {item.friendlyName}
              </Link>
            </NavbarMenuItem>
          )
        )}
      </NavbarMenu>
    </Navbar>
  )
}
