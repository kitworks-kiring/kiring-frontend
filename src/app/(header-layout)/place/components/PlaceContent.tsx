'use client'

import DefaultTab, { TabItem } from '@/components/tabs/DefaultTab'
import BubbleTab, { BubbleItem } from '@/components/tabs/BubbleTab'
import Navigation from '@/components/layout/Navigation'
import { useTab } from '@/components/tabs/DefaultTab/useTab'
import { useBubble } from '@/components/tabs/BubbleTab/useBubble'
import { PLACE_MAIN_TAB_LIST, PLACE_FILTER_TAB_LIST } from '@/app/(header-layout)/place/constants'

export default function PlaceContent() {
  const initialActiveTab = PLACE_MAIN_TAB_LIST[0].value
  const initialActiveBubble = PLACE_FILTER_TAB_LIST[1].value

  const { activeTab, onTabClick } = useTab(initialActiveTab)
  const { activeBubble, onBubbleClick } = useBubble(initialActiveBubble)

  const tabs: TabItem[] = PLACE_MAIN_TAB_LIST.map(({ label, value }) => ({ label, value }))
  const bubbles: BubbleItem[] = PLACE_FILTER_TAB_LIST.map(({ label, value }) => ({ label, value }))

  return (
    <>
      <DefaultTab tabs={tabs} active={activeTab} onChange={onTabClick} />
      <BubbleTab bubbles={bubbles} active={activeBubble} onChange={onBubbleClick} />
      {activeTab === tabs[0].value && <p>맛집</p>}
      {activeTab === tabs[1].value && <p>산책로</p>}
      <Navigation />
    </>
  )
}
