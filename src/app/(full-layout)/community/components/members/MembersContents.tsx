'use client'

import { MEMBERS_BUBBLES } from '@/app/(full-layout)/constants'
import BubbleTab from '@/components/tabs/BubbleTab'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMemberAll } from '@/services/members'
import { Member } from '@/app/(full-layout)/(main)/types/member'
import Image from 'next/image'

const MemberItem = ({ member }: { member: Member }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 p-2">
        <Image
          src={member.profileImageUrl}
          alt={member.name}
          width={52}
          height={52}
          className="rounded-full border border-gray-300"
        />
        <div className="body2-sb text-basic-black">{member.name}</div>
      </div>
      <button
        className="body4 text-basic-black rounded-full border border-gray-200 px-4 py-2"
        onClick={() => console.log('paper plane to ', member.name)}
      >
        <span className="mb-[-2px] block">종이 비행기</span>
      </button>
    </div>
  )
}

export default function MembersContents() {
  const [selectedBubble, setSelectedBubble] = useState('all')

  const handleBubbleSelect = (bubble: string) => {
    setSelectedBubble(bubble)
  }
  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: getMemberAll,
  })

  return (
    <>
      <div className="full-width fixed top-23 z-10 bg-white">
        <BubbleTab
          bubbles={MEMBERS_BUBBLES}
          active={selectedBubble}
          onChange={handleBubbleSelect}
          propsClass="body4"
        />
        <section className="flex h-[calc(100vh-224px)] flex-col overflow-y-auto px-4 py-5 [&::-webkit-scrollbar]:hidden">
          {selectedBubble === 'all'
            ? members?.members.map((member) => <MemberItem key={member.id} member={member} />)
            : members?.members
                .filter((member) => member.team.code === selectedBubble)
                .map((member) => <MemberItem key={member.id} member={member} />)}
        </section>
      </div>
    </>
  )
}
