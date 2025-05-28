'use client'

import { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export function useTabs(defaultTab: string) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentTab = searchParams.get('tabView') || defaultTab
  const [activeTab, setActiveTab] = useState(currentTab)

  useEffect(() => {
    if (currentTab !== activeTab) {
      setActiveTab(currentTab)
    }
  }, [currentTab, activeTab])

  const onTabClick = (tab: string) => {
    if (tab === activeTab) return
    setActiveTab(tab)
    router.replace(`${pathname}?tabView=${tab}`)
  }

  return { activeTab, onTabClick }
}
