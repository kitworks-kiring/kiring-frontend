// 내/외부 라이브러리
import { useState, useRef } from 'react'
import { Map as KakaoMap } from 'react-kakao-maps-sdk'
import clsx from 'clsx'

// utils
// import { COMPANY_COORD } from '@/utils/calcDistance'

// hooks
import { useSingleSelect } from '@/components/tabs/BubbleTab/useSingleSelect'

// components
import BubbleTab, { BubbleItem } from '@/components/tabs/BubbleTab'
import SortSelectBox, {
  SortItem,
} from '@/app/(header-layout)/place/components/restaurant/SortSelectBox'

// constants
import {
  PLACE_BUBBLE_TAB_LIST,
  PLACE_SORT_DROPDOWN_LIST,
} from '@/app/(header-layout)/place/constants'

export default function RestaurantContents() {
  // 지도 중심 좌표
  const [center, setCenter] = useState({
    lat: 37.53190102889455,
    lng: 126.90471536090858,
  })

  // 전체 목록 보기
  const [sheetPosition, setSheetPosition] = useState<'collapsed' | 'half' | 'expanded'>('expanded')

  // ref
  const mapRef = useRef<kakao.maps.Map>(null)

  // style
  const sectionStyle = 'position-centered-x full-width absolute'

  // bubble tab, sort dropdown 초기값 설정
  const initialActiveBubble = PLACE_BUBBLE_TAB_LIST[0].value
  const initialActiveSort = PLACE_SORT_DROPDOWN_LIST[0].value
  const { selected: bubbleSelected, onSelect: onBubbleSelect } =
    useSingleSelect(initialActiveBubble)
  const { selected: selectedSort, onSelect: onSelectSort } = useSingleSelect(initialActiveSort)
  const bubbles: BubbleItem[] = PLACE_BUBBLE_TAB_LIST.map(({ label, value }) => ({ label, value }))
  const sortOptions: SortItem[] = PLACE_SORT_DROPDOWN_LIST.map(({ label, value }) => ({
    label,
    value,
  }))

  return (
    <div className="relative h-full bg-gray-50 pt-9">
      {/* 카카오맵 */}
      <section className={clsx('top-0 left-0 z-0 h-full pt-9', sectionStyle)}>
        <KakaoMap
          ref={mapRef}
          center={center}
          style={{ width: '100%', height: '100%' }}
          level={3}
          onIdle={() => console.log(mapRef.current?.getCenter())}
        ></KakaoMap>
      </section>

      {/* 리스트 */}
      <section
        className={clsx(
          '',
          'left-0 z-1 rounded-t-3xl bg-white',
          sectionStyle,
          sheetPosition === 'half' && 'top-1/2 h-1/2 overflow-y-hidden',
          sheetPosition === 'collapsed' && 'bottom-0 h-22 overflow-y-hidden',
          sheetPosition === 'expanded' && 'top-2',
        )}
      >
        <button type="button" className="mx-auto my-3 block h-1 w-20 rounded-sm bg-gray-200">
          <span className="sr-only">목록 보기</span>
        </button>
        <div
          className={clsx(
            'flex items-center justify-between pr-2',
            sheetPosition === 'expanded' && 'sticky top-0 h-12 bg-red-500',
          )}
        >
          <BubbleTab bubbles={bubbles} active={bubbleSelected} onChange={onBubbleSelect} />
          <SortSelectBox
            sortOptions={sortOptions}
            active={selectedSort}
            onChange={onSelectSort}
            propsClass={sheetPosition === 'collapsed' && 'bottom-0'}
          />
        </div>
        <div>
          {Array.from({ length: 50 }).map((_, index) => (
            <div key={index}>{index}</div>
          ))}
        </div>
      </section>
    </div>
  )
}
