import Image from 'next/image'
import { MemberMeType } from '@/app/types/memberType'
import { formatElapsedDate } from '@/utils/date'

interface ProfileSectionProps {
  user: MemberMeType
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <section className="mx-aut container px-4 py-3">
      <div className="flex-row-center min-h-53 w-full gap-12 rounded-xl bg-white py-8 shadow-[0px_1px_10px_rgba(0,0,0,0.15)]">
        <div className="flex-col-center">
          <Image
            src={user?.profileImageUrl ?? '/default-avatar.png'}
            alt="사용자 프로필"
            width={100}
            height={100}
            className="mx-auto rounded-full"
            priority
          />
          <h2 className="head5 mt-2 text-black">{user?.name}</h2>
        </div>
        <div className="flex flex-col gap-2 text-left">
          <p className="body5 text-gray-900">팀 구성</p>
          <div className="body3-sb text-black">{user?.team?.name}</div>
          <hr className="my-1"></hr>
          <p className="body5 text-gray-900">함께 한 시간</p>
          <div className="body3-sb text-black">
            {user?.joinedAt && formatElapsedDate(user.joinedAt)}
          </div>
        </div>
      </div>
    </section>
  )
}
