'use client'

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@heroui/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div>
      {theme === 'light' ? (
        <Button
          radius="full"
          variant="ghost"
          isIconOnly
          onPress={() => setTheme('dark')}
        >
          <FontAwesomeIcon icon={faMoon} />
        </Button>
      ) : (
        <Button
          radius="full"
          variant="ghost"
          isIconOnly
          onPress={() => setTheme('light')}
        >
          <FontAwesomeIcon icon={faSun} />
        </Button>
      )}
    </div>
  )
}
