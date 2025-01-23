'use client'

import { useEffect } from 'react'

type IdScrollWrapperProps = {
  children: React.ReactNode
}

const IdScrollWrapper: React.FC<IdScrollWrapperProps> = ({
  children,
}: IdScrollWrapperProps) => {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const targetNode = document.body // Observe the entire body
      const config = { childList: true, subtree: true } // Observe new child nodes

      const callback = (
        mutationsList: MutationRecord[],
        observer: MutationObserver
      ) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            const element = document.querySelector(hash)
            if (element) {
              element.scrollIntoView({ behavior: 'instant' })
              observer.disconnect() // Stop observing
            }
          }
        }
      }

      const observer = new MutationObserver(callback)
      observer.observe(targetNode, config)

      // Clean up the observer on component unmount
      return () => {
        observer.disconnect()
      }
    }
  }, [])

  return children
}

export default IdScrollWrapper
