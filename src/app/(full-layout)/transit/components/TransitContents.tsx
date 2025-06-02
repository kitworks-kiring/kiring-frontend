'use client'

import DefaultTab from '@/components/tabs/DefaultTab'
import { useTab } from '@/components/tabs/DefaultTab/useTab'
import SubwayContents from '@/app/(full-layout)/transit/components/subway/SubwayContents'
import BusContents from '@/app/(full-layout)/transit/components/bus/ButContents'
import BicycleContents from '@/app/(full-layout)/transit/components/bicycle/BicycleContents'
import { TRANSIT_TABS } from '@/app/(full-layout)/transit/constants'

export default function TransitContents() {
  const initialActiveTab = 'subway'
  const { activeTab, onTabClick } = useTab(initialActiveTab)

  return (
    <>
      <DefaultTab tabs={TRANSIT_TABS} active={activeTab} onChange={onTabClick} />
      <section className="mt-9">
        {activeTab === 'subway' && <SubwayContents />}
        {activeTab === 'bus' && <BusContents />}
        {activeTab === 'bicycle' && <BicycleContents />}
      </section>
    </>
  )
}
