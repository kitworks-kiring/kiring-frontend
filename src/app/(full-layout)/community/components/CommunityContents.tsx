'use client'

import DefaultTab from '@/components/tabs/DefaultTab'
import { useTab } from '@/components/tabs/DefaultTab/useTab'
import MembersContents from '@/app/(full-layout)/community/components/members/MembersContents'
import ComingSoon from '@/components/status/ComingSoon'

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
        <section className="mt-9">
          {activeTab === 'feed' && (
            <div className="absolute inset-0">
              <ComingSoon />
            </div>
          )}
        </section>
      </section>
    </>
  )
}
