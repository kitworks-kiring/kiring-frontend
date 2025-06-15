'use client'

import DefaultTab from '@/components/tabs/DefaultTab'
import { useTab } from '@/components/tabs/DefaultTab/useTab'
import MembersContents from '@/app/(full-layout)/community/components/members/MembersContents'

const COMMUNITY_TABS = [
  { label: '팀 구성원', value: 'members' },
  { label: '피드', value: 'feed' },
]

export default function CommunityContents() {
  const initialActiveTab = 'members'
  const { activeTab, onTabClick } = useTab(initialActiveTab)

  return (
    <>
      <DefaultTab tabs={COMMUNITY_TABS} active={activeTab} onChange={onTabClick} />
      <section className="mt-9">
        {activeTab === 'members' && <MembersContents />}
        {activeTab === 'feed' && <div>피드</div>}
      </section>
    </>
  )
}
