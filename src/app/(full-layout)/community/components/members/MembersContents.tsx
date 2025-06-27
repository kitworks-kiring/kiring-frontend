'use client'

import { MEMBERS_BUBBLES } from '@/app/(full-layout)/constants'
import BubbleTab from '@/components/tabs/BubbleTab'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMemberAll } from '@/services/members'
import { Member } from '@/app/(full-layout)/(main)/types/member'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/user'

const MemberItem = ({
  member,
  onClick,
  currentUserId,
}: {
  member: Member
  onClick?: () => void
  currentUserId?: number
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex cursor-pointer items-center gap-3 p-2" onClick={onClick}>
        <Image
          src={member.profileImageUrl}
          alt={member.name}
          width={52}
          height={52}
          className="rounded-full border border-gray-300"
        />
        <div className="body2-sb text-basic-black">
          {member.name}
          {member.id === currentUserId && ' (나)'}
        </div>
      </div>
      {/* TODO 2차 작업 */}
      {/* <button className="body4 text-basic-black rounded-full border border-gray-200 px-4 py-2">
        <span className="mb-[-2px] block">종이 비행기</span>
      </button> */}
    </div>
  )
}

export default function MembersContents() {
  const [selectedBubble, setSelectedBubble] = useState('all')
  const router = useRouter()
  const { user } = useUserStore()

  const handleBubbleSelect = (bubble: string) => {
    setSelectedBubble(bubble)
  }

  const handleClickMember = (memberId: number) => {
    router.push(memberId === user?.id ? '/profile' : `/profile/${memberId}`)
  }

  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: getMemberAll,
  })

  const sortByCurrentUserFirst = (a: Member, b: Member) => {
    if (a.id === user?.id) return -1
    if (b.id === user?.id) return 1
    return 0
  }

  const filteredMembers = members?.members
    ?.filter((member) => selectedBubble === 'all' || member.team.code === selectedBubble)
    .slice()
    .sort(sortByCurrentUserFirst)

  return (
    <>
      <div className="full-width fixed top-23 z-10 bg-white">
        <BubbleTab
          bubbles={MEMBERS_BUBBLES}
          active={selectedBubble}
          onChange={handleBubbleSelect}
          propsClass="body4"
        />
        <section className="scroll-hidden flex h-[calc(100vh-224px)] flex-col overflow-y-auto px-4 py-5">
          {filteredMembers?.map((member) => (
            <MemberItem
              key={member.id}
              member={member}
              onClick={() => handleClickMember(member.id)}
              currentUserId={user?.id}
            />
          ))}
        </section>
      </div>
    </>
  )
}
