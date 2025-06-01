'use client'

import clsx from 'clsx'
import SectionHeader from '@/app/(full-layout)/(main)/components/section-header'
import Image from 'next/image'

export default function MemberSection() {
  const isLogin = false
  const team = 'BE'

  const teams = [
    { code: 'BE', name: '백엔드팀' },
    { code: 'FE', name: '프론트팀' },
    { code: 'MG', name: '경영팀' },
    { code: 'PM', name: '기획팀' },
  ]
  return (
    <section className="w-full bg-white pb-6">
      <SectionHeader title="팀 구성원" onClick={() => {}} />
      <div className={clsx('mx-4 flex flex-col justify-center', isLogin && 'gap-[18px]')}>
        <div className="flex items-center gap-2">
          {isLogin &&
            teams.map(({ code, name }) => (
              <div
                key={code}
                className={clsx(
                  'flex items-center justify-center rounded-[20px] px-4 py-2',
                  team === code ? 'bg-purple-500' : 'border border-gray-200',
                )}
              >
                <span className={clsx('body4', team === code ? 'text-white' : 'text-black')}>
                  {name}
                </span>
              </div>
            ))}
        </div>
        <div className="flex items-center justify-between gap-1">
          {[1, 1, 1, 1, 1].map((_, index) => (
            <div key={index} className="flex flex-col gap-[10px] text-center">
              <Image
                src="https://www.ricoh-imaging.co.jp/english/products/wg-6/ex/img/ex-pic04.jpg"
                alt="member"
                width={52}
                height={52}
                className="aspect-square h-11/12 rounded-full object-cover"
              />
              {isLogin && <span className="body4 text-gray-800">양다윗</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
