'use client'
import DefaultKiring from '@/assets/intro-kiring.svg'
import LikeButton from '@/assets/like-button.svg'
import Like from '@/assets/like.svg'
import SectionHeader from './components/section-header'

import Image from 'next/image'

export default function Main() {
  return (
    <div className="mx-auto flex flex-col items-center gap-3 bg-gray-50">
      {/* Intro Section */}
      <section className="flex h-[198px] max-w-[390px] justify-between pr-4 pl-[21px]">
        <span className="head3 mt-7 text-black">
          키링의
          <br />
          다양한 서비스를
          <br />
          <span className="text-system-purple">로그인</span> 후<br />
          만나보세요!
        </span>
        <div className="mt-[10px] h-full max-w-[190px] self-center">
          <DefaultKiring className="w-full" />
        </div>
      </section>

      {/* Recommend Section */}
      <section className="flex w-full flex-col bg-white pb-6">
        <SectionHeader
          time="Lunch"
          title="오늘 점심은 여기 어때요?"
          onClick={() => console.log('click')}
        />
        <div className="flex gap-4 overflow-x-scroll px-4 [&::-webkit-scrollbar]:hidden">
          {[1, 1, 1, 1, 1, 1, 1].map((item, index) => (
            <div key={index} className="flex flex-shrink-0 flex-col gap-2">
              <Image
                src="https://www.ricoh-imaging.co.jp/english/products/wg-6/ex/img/ex-pic04.jpg"
                alt="recommend"
                width={150}
                height={150}
                className="h-[150px] w-[150px] rounded-[12px] object-cover"
              />
              <div>
                <div className="flex items-center justify-between">
                  <span className="body2">해주반</span>
                  <LikeButton />
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-[2px]">
                    <Like />
                    <span className="body5 text-purple-500">12</span>
                  </div>
                  <span className="body6 mt-[1px] text-gray-600">
                    {'한식'} · {'당산'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Schedule Section */}
      <section className="h-[285px] w-full bg-blue-400">
        <SectionHeader title="주간 일정" onClick={() => console.log('click')} />
        <div></div>
      </section>

      {/* Member Section */}
      <section className="h-[285px] w-full bg-amber-400">
        <SectionHeader title="팀 구성원" onClick={() => console.log('click')} />
      </section>
    </div>
  )
}
