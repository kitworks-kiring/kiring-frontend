'use client'

import { useState } from 'react'
import clsx from 'clsx'
// import BubbleTab, { BubbleItem } from '@/components/tabs/BubbleTab'
import { useSingleSelect } from '@/components/tabs/BubbleTab/useSingleSelect'
import {
  // PLACE_BUBBLE_TAB_LIST,
  PLACE_SORT_DROPDOWN_LIST,
  HEADER_MARGIN_TOP,
  MAP_HEIGHT_CALC,
  CONTENT_TRANSLATE_Y,
  SHOW_MAP_BTN_BOTTOM,
} from '@/app/(header-layout)/place/constants'
import SortSelectBox, { SortItem } from '@/app/(header-layout)/place/components/SortSelectBox'
import Navigation from '@/components/layout/Navigation'
import PlaceCalendar from '@/assets/place-calendar.svg'

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
    <div className="relative">
      {/* header section */}
      <section
        className={`full-width fixed top-0 z-1 mt-${HEADER_MARGIN_TOP} flex h-12 items-center justify-between border-b bg-white px-4`}
      >
        <p className="font-body4 text-gray-500">
          <b>522개</b>의 매장
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
      {/* <section className={`full-width absolute top-21 h-${MAP_HEIGHT_CALC} bg-blue-200`}> */}
      <section
        className={clsx(
          `full-width absolute top-21 h-${MAP_HEIGHT_CALC} bg-blue-200`,
          showMap ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        TODO: Kakao Map
      </section>
      {/* content section */}
      <div
        className={clsx(
          'full-width h-full transition-transform duration-400',
          showMap ? `nav-shadow z-1 ${CONTENT_TRANSLATE_Y}` : 'mt-21 translate-y-0',
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
          {/* TODO: restaurant card list */}
          {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer
          took a galley of type and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.`.repeat(3)}
        </section>
      </div>

      {/* footer section */}
      <div>
        {!showMap && (
          <>
            <button
              type="button"
              className={`flex-row-center position-centered-x fixed bottom-${SHOW_MAP_BTN_BOTTOM} rounded-3xl bg-black px-4 py-3 text-white`}
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
