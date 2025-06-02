'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export function useTab(initialActiveTab: string): {
  activeTab: string
  onTabClick: (tab: string) => void
} {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentTab = searchParams.get('tabView') || initialActiveTab
  const [activeTab, setActiveTab] = useState(currentTab)

  useEffect(() => {
    setActiveTab(currentTab)
  }, [currentTab])

  const onTabClick = useCallback(
    (tab: string) => {
      if (tab === activeTab) return
      setActiveTab(tab)
      router.push(`${pathname}?tabView=${tab}`)
    },
    [activeTab, pathname, router],
  )

  return { activeTab, onTabClick }
}
