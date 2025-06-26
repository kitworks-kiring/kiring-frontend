'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import SectionHeader from '@/app/(full-layout)/(main)/components/SectionHeader'
import { getTeamMembers, getMemberImages } from '@/services/members'
import TeamSelector from '@/app/(full-layout)/(main)/components/memberSection/TeamSelector'
import { TEAMS } from '@/app/(full-layout)/constants'
import { useAuthStore } from '@/stores/login'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/user'
import { Member } from '@/app/(full-layout)/(main)/types/member'

// 스켈레톤 멤버 컴포넌트
function MemberSkeleton() {
  return (
    <div className="scroll-hidden flex h-19 items-start justify-start gap-6 overflow-x-scroll">
      {Array.from({ length: 2 }).map((_, idx) => (
        <div key={`skeleton-${idx}`} className="flex-shrink-0">
          <div className="aspect-square h-13 w-13 animate-pulse rounded-full bg-gray-300" />
        </div>
      ))}
    </div>
  )
}

export default function MemberSection() {
  const router = useRouter()
  const { user } = useUserStore()
  const [selectedTeam, setSelectedTeam] = useState<number>(user?.team?.id ?? TEAMS[0].id)
  const { isLogin } = useAuthStore()

  const handleClickMember = (memberId: number) => {
    router.push(memberId === user?.id ? '/profile' : `/profile/${memberId}`)
  }

  const sortByCurrentUserFirst = (a: Member, b: Member) => {
    if (a.id === user?.id) return -1
    if (b.id === user?.id) return 1
    return 0
  }

  // 팀 선택 초기화
  useEffect(() => {
    if (user?.team?.id) {
      setSelectedTeam(user.team.id)
    }
  }, [user])

  // 팀 멤버 데이터를 가져오는 쿼리
  const { data, isLoading, error } = useQuery({
    queryKey: ['teamMembers', selectedTeam, isLogin],
    queryFn: () => (isLogin ? getTeamMembers(selectedTeam) : getMemberImages()),
  })

  return (
    <section className="w-full bg-white pb-6">
      <SectionHeader
        title="팀 구성원"
        onClick={() => {
          router.push('/community')
        }}
      />
      <div className={clsx('flex flex-col justify-center', isLogin && 'gap-[18px]')}>
        {isLogin && (
          <TeamSelector teams={TEAMS} selectedTeam={selectedTeam} onTeamSelect={setSelectedTeam} />
        )}

        {(isLoading || error) && (
          <div className={clsx('mx-4 h-19', isLoading ? 'flex' : 'flex-row-center')}>
            {isLoading ? (
              <MemberSkeleton />
            ) : (
              <span className="body4 text-red-500">데이터를 불러오는데 실패했습니다.</span>
            )}
          </div>
        )}

        {isLogin && data && 'members' in data && Array.isArray(data.members) && (
          <div
            className={clsx(
              'flex items-center gap-[7%] px-4',
              data.members.length <= 4 && 'justify-start',
              data.members.length === 5 && 'justify-between',
              data.members.length > 5 && 'scroll-hidden justify-between overflow-x-scroll',
            )}
          >
            {([...data.members] as Member[]).sort(sortByCurrentUserFirst).map((member) => {
              const isCurrentUser = member.id === user?.id
              return (
                <div
                  key={member.id}
                  onClick={() => handleClickMember(member.id)}
                  className={clsx(
                    'flex cursor-pointer flex-col gap-[10px] text-center',
                    data.members.length === 5 ? 'flex-1' : 'flex-shrink-0',
                  )}
                >
                  <Image
                    src={member.profileImageUrl}
                    alt={member.name || 'profile'}
                    width={52}
                    height={52}
                    className="aspect-square h-13 w-13 rounded-full border border-gray-300 object-cover"
                  />
                  <span className="body4 text-gray-800">
                    {member.name}
                    {isCurrentUser && ' (나)'}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {!isLogin && Array.isArray(data) && (
          <div className="scroll-hidden flex h-19 items-center gap-6 overflow-x-scroll px-4">
            {data.map(({ profileImageUrl }, index) => (
              <div key={profileImageUrl + index} className="flex-shrink-0">
                <Image
                  src={profileImageUrl}
                  alt="profile"
                  width={52}
                  height={52}
                  className="aspect-square h-13 w-13 rounded-full border border-gray-300 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
