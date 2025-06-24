// TODO: 레이아웃 구조 완성되면 eslint 무효화 코드 제거
/* eslint-disable @typescript-eslint/no-unused-vars */

//  내/외부 라이브러리
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

  // variable
  const isSheetExpanded = sheetPosition === 'expanded'

  // style
  const sectionStyle = 'position-centered-x full-width absolute'
  const floatingBtnStyle = 'body4 rounded-l-xl rounded-r-xl bg-white px-3 py-2 shadow-xl'

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
    <div className="relative h-full pt-9">
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
          'left-0 overflow-hidden',
          sectionStyle,
          sheetPosition === 'half' && 'top-1/2 h-1/2',
          sheetPosition === 'collapsed' && 'bottom-0 h-32',
          sheetPosition === 'expanded' && 'top-8',
        )}
      >
        {!isSheetExpanded && (
          <div className="mx-2 mb-2 flex justify-between">
            <button type="button" className={floatingBtnStyle}>
              GPS
            </button>
            <button type="button" className={floatingBtnStyle}>
              이 위치 재검색
            </button>
            <button type="button" className={floatingBtnStyle}>
              목록보기
            </button>
          </div>
        )}
        <div className={clsx('relative h-full bg-white pt-1', !isSheetExpanded && 'rounded-t-xl')}>
          {!isSheetExpanded && (
            <button type="button" className="mx-auto my-3 block h-1 w-20 rounded-sm bg-gray-200">
              <span className="sr-only">목록 보기</span>
            </button>
          )}
          <div
            className={clsx(
              'flex items-center justify-between bg-amber-100 pr-2',
              isSheetExpanded && 'sticky top-0',
            )}
          >
            <BubbleTab
              bubbles={bubbles}
              active={bubbleSelected}
              onChange={onBubbleSelect}
              hasBorder={false}
            />
            <SortSelectBox
              sortOptions={sortOptions}
              active={selectedSort}
              onChange={onSelectSort}
              propsClass={sheetPosition === 'collapsed' && 'bottom-0'}
            />
          </div>
          <div className="">
            {Array.from({ length: 50 }).map((_, index) => (
              <div key={index}>{index}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
