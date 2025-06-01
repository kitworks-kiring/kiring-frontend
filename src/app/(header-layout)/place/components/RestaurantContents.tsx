'use client'

import { useState } from 'react'
import clsx from 'clsx'
// import BubbleTab, { BubbleItem } from '@/components/tabs/BubbleTab'
import { useSingleSelect } from '@/components/tabs/BubbleTab/useSingleSelect'
import {
  // PLACE_BUBBLE_TAB_LIST,
  PLACE_SORT_DROPDOWN_LIST,
} from '@/app/(header-layout)/place/constants'
import SortSelectBox, { SortItem } from '@/app/(header-layout)/place/components/SortSelectBox'
import Navigation from '@/components/layout/Navigation'
import PlaceCalendar from '@/assets/place-calendar.svg'
import RestaurantCard from '@/app/(header-layout)/place/components/RestaurantCard'
import RestaurantWideCard from '@/app/(header-layout)/place/components/RestaurantWideCard'
import { restaurantList } from '../mock/restaurant'

export default function RestaurantContents() {
  // const initialActiveBubble = PLACE_BUBBLE_TAB_LIST[1].value
  const initialActiveSort = PLACE_SORT_DROPDOWN_LIST[0].value
  const { selected: selectedSort, onSelect: onSelectSort } = useSingleSelect(initialActiveSort)
  // const { selected: bubbleSelected, onSelect: onBubbleSelect } =
  //   useSingleSelect(initialActiveBubble)
  // const bubbles: BubbleItem[] = PLACE_BUBBLE_TAB_LIST.map(({ label, value }) => ({ label, value }))
  const sortOptions: SortItem[] = PLACE_SORT_DROPDOWN_LIST.map(({ label, value }) => ({
    label,
    value,
  }))

  const [showMap, setShowMap] = useState(false)

  return (
    <div className="nav-pd relative pt-9">
      {/* header section */}
      <section className="full-width sticky top-9 z-1 flex h-12 items-center justify-between border-b bg-white px-4">
        <p className="font-body4 text-gray-500">
          <b>{restaurantList?.length ?? 0}개</b>의 매장
        </p>
        <SortSelectBox sortOptions={sortOptions} active={selectedSort} onChange={onSelectSort} />
      </section>

      {/* TODO: BubbleTab 컴포넌트 사용 확정되면 주석 해제 */}
      {/* <BubbleTab
        bubbles={bubbles}
        active={bubbleSelected}
        onChange={onBubbleSelect}
        propsClass={'hidden'}
      /> */}

      {/* map content */}
      <section
        className={clsx(
          'full-width absolute top-21 h-[calc(100dvh-12.5rem)] bg-blue-200 duration-400',
          showMap ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        TODO: Kakao Map
      </section>

      {/* content section */}
      <div
        className={clsx(
          'full-width h-full transition-transform duration-400',
          showMap ? 'nav-shadow z-1 translate-y-[calc(100vh-13rem)]' : 'translate-y-0',
        )}
      >
        <section className="h-full overflow-y-auto">
          {showMap && (
            <button
              type="button"
              className="relative h-18 w-full max-w-110 min-w-80"
              onClick={() => setShowMap(false)}
            >
              <div className="position-centered-x absolute top-4 h-2 w-20 rounded-sm bg-gray-200" />
            </button>
          )}
          {selectedSort !== 'latest' ? (
            <RestaurantCard restaurantList={restaurantList} />
          ) : (
            <RestaurantWideCard restaurantList={restaurantList} />
          )}
        </section>
      </div>

      {/* footer section */}
      <div className="bg-blue-500">
        {!showMap && (
          <>
            <button
              type="button"
              className={`flex-row-center position-centered-x fixed bottom-25 z-1 rounded-3xl bg-black px-4 py-3 text-white`}
              onClick={() => setShowMap(true)}
            >
              <span>지도 보기</span>
              <PlaceCalendar className="h-5 w-5" />
            </button>
            <Navigation />
          </>
        )}
      </div>
    </div>
  )
}
