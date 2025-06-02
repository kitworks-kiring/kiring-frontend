'use client'

import DefaultTab, { TabItem } from '@/components/tabs/DefaultTab'
import { useTab } from '@/components/tabs/DefaultTab/useTab'
import { PLACE_DEFAULT_TAB_LIST } from '@/app/(header-layout)/place/constants'
import RestaurantContents from '@/app/(header-layout)/place/components/RestaurantContents'
import TrailContents from '@/app/(header-layout)/place/components/TrailContents'

export default function PlaceContent() {
  const initialActiveTab = PLACE_DEFAULT_TAB_LIST[0].value
  const { activeTab, onTabClick } = useTab(initialActiveTab)
  const tabs: TabItem[] = PLACE_DEFAULT_TAB_LIST.map(({ label, value }) => ({ label, value }))

  return (
    <>
      <DefaultTab tabs={tabs} active={activeTab} onChange={onTabClick} />
      {activeTab === tabs[0].value && <RestaurantContents />}
      {activeTab === tabs[1].value && <TrailContents />}
    </>
  )
}
