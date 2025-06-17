'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import SectionHeader from '@/app/(full-layout)/(main)/components/SectionHeader'
import { getTeamMembers } from '@/services/members'
import TeamSelector from '@/app/(full-layout)/(main)/components/memberSection/TeamSelector'
import { TEAMS } from '@/app/(full-layout)/constants'

export default function MemberSection() {
  const [selectedTeam, setSelectedTeam] = useState<number>(TEAMS[0].id)
  const isLogin = true

  // 팀 멤버 데이터를 가져오는 쿼리
  const { data, isLoading, error } = useQuery({
    queryKey: ['teamMembers', selectedTeam],
    queryFn: () => getTeamMembers(selectedTeam),
  })

  return (
    <section className="w-full bg-white pb-6">
      <SectionHeader title="팀 구성원" onClick={() => {}} />
      <div className={clsx('mx-4 flex flex-col justify-center', isLogin && 'gap-[18px]')}>
        <TeamSelector teams={TEAMS} selectedTeam={selectedTeam} onTeamSelect={setSelectedTeam} />

        {isLoading && (
          <div className="flex-row-center mx-4 h-19">
            <span className="body4 text-gray-400">로딩 중...</span>
          </div>
        )}

        {error && (
          <div className="flex-row-center mx-4 h-19">
            <span className="body4 text-red-500">데이터를 불러오는데 실패했습니다.</span>
          </div>
        )}

        {data?.members && (
          <div
            className={clsx(
              'flex items-center gap-[7%]',
              data?.members.length <= 4 && 'justify-start',
              data?.members.length === 5 && 'justify-between',
              data?.members.length > 5 && 'scroll-hidden justify-between overflow-x-scroll',
            )}
          >
            {data?.members.map(({ id, name, profileImageUrl }) => (
              <div
                key={id}
                className={clsx(
                  'flex flex-col gap-[10px] text-center',
                  data?.members.length === 5 ? 'flex-1' : 'flex-shrink-0',
                )}
              >
                <Image
                  src={profileImageUrl}
                  alt={name}
                  width={52}
                  height={52}
                  className="aspect-square h-11/12 rounded-full object-cover"
                />
                <span className="body4 text-gray-800">{name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
