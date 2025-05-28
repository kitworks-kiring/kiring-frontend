'use client'

import MainTab, { TabItem } from '@/components/tabs/MainTab'
import { useTabs } from '@/components/tabs/MainTab/useTab'
import { PLACE_MAIN_TAB_LIST } from './constants'

export default function Place() {
  const defaultTab = PLACE_MAIN_TAB_LIST[0].type
  const { activeTab, onTabClick } = useTabs(defaultTab)

  const tabs: TabItem[] = PLACE_MAIN_TAB_LIST.map(({ label, type }) => ({
    label,
    value: type,
  }))

  return (
    <section className="h-full">
      <MainTab tabs={tabs} active={activeTab} onChange={onTabClick} />

      {activeTab === tabs[0].value && <p>맛집</p>}
      {activeTab === tabs[1].value && <p>산책로</p>}
    </section>
  )
}
