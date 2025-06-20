import { MemberMeType } from '@/app/types/memberType'
import dayjs from 'dayjs'
import MemberInfoItem from '@/app/(header-layout)/profile/components/memberinfo/MemberInfoItem'

export default function MemberInfoSection({ user }: { user: MemberMeType }) {
  return (
    <section className="container px-4">
      <div className="head5">
        <p className="text-balck">나의 정보</p>
      </div>
      <div className="mt-3 w-full">
        <ul className="space-y-4">
          <MemberInfoItem
            label="입사일"
            value={user?.joinedAt ? dayjs(user.joinedAt).format('YYYY년 M월 D일') : '-'}
          />
          <MemberInfoItem
            label="생일"
            value={user?.birthday ? dayjs(user.birthday).format('M월 D일') : '-'}
          />
          <MemberInfoItem
            label="전화번호"
            value={
              user?.phone ? (
                <a className="text-purple-300" href={`tel:${user.phone}`}>
                  {user.phone}
                </a>
              ) : (
                '-'
              )
            }
          />

          <MemberInfoItem
            label="이메일"
            value={
              user?.email ? (
                <a className="text-purple-300" href={`mailto:${user.email}`}>
                  {user.email}
                </a>
              ) : (
                '-'
              )
            }
          />
          <MemberInfoItem label="깃허브" value={user?.githubId} />
        </ul>
      </div>
    </section>
  )
}
