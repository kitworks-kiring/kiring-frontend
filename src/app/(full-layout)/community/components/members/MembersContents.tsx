import { MEMBERS_BUBBLES } from '@/app/(full-layout)/constants'
import BubbleTab, { BubbleItem } from '@/components/tabs/BubbleTab'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMemberAll } from '@/services/members'
import { Member } from '@/app/(full-layout)/(main)/types/member'
import Image from 'next/image'

const MemberItem = ({ member }: { member: Member }) => {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
      <Image
        src={member.profileImageUrl}
        alt={member.name}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="body2-sb text-gray-800">{member.name}</div>
      <div className="body4 text-gray-600">{member.team.name}</div>
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
        <section className="flex flex-col bg-red-300 px-4 py-5">
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
