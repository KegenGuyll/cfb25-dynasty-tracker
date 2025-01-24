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
  Button,
} from '@heroui/react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { ThemeSwitcher } from './ThemeSwitcher'
import SearchModal from './Modal/SearchModal'

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
    {
      friendlyName: 'Download Data',
      href: '/dynasty/download',
    },
  ]

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
        <NavbarBrand as={Link} href="/dynasty">
          <p className="font-bold text-inherit">CFB25 Dynasty Tracker</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4 divide-x" justify="center">
        {menuItems(String(dynastyId), String(teamId), String(year)).map(
          (item, index) => (
            <NavbarItem key={index} isActive={isPathActive(item.href)}>
              <Link color="foreground" href={item.href}>
                {item.friendlyName}
              </Link>
            </NavbarItem>
          )
        )}
        <div className="pl-4 flex gap-2 w-full">
          <SearchModal />
          <Button
            as={Link}
            href="https://github.com/KegenGuyll/cfb25-dynasty-tracker"
            className="px-8"
            variant="ghost"
            radius="full"
            startContent={<FontAwesomeIcon icon={faGithub} />}
          >
            Github
          </Button>
          <ThemeSwitcher />
        </div>
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
