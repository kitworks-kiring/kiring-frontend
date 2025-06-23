'use client'

import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getRestaurantNearbyList } from '@/services/restaurant'
import BubbleTab, { BubbleItem } from '@/components/tabs/BubbleTab'
import SortSelectBox, {
  SortItem,
} from '@/app/(header-layout)/place/components/restaurant/SortSelectBox'
import RestaurantMap from '@/app/(header-layout)/place/components/restaurant/RestaurantMap'
import Navigation from '@/components/layout/Navigation'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import NarrowCard from '@/app/(header-layout)/place/components/restaurant/NarrowCard'
import { useSingleSelect } from '@/components/tabs/BubbleTab/useSingleSelect'
import { COMPANY_COORD } from '@/utils/calcDistance'
import {
  PLACE_BUBBLE_TAB_LIST,
  PLACE_SORT_DROPDOWN_LIST,
} from '@/app/(header-layout)/place/constants'
import { RealRestaurantType } from '@/app/(header-layout)/place/types/restaurantType'
import PlaceCalendar from '@/assets/place-calendar.svg'

export default function RestaurantContents() {
  // 지도 표시 여부
  const [showMap, setShowMap] = useState(false)
  // 지도 중심 좌표
  const [center, setCenter] = useState({
    lat: COMPANY_COORD.lat,
    lng: COMPANY_COORD.lng,
  })
  // 클릭한 레스토랑 데이터
  const [focusedRestaurant, setFocusedRestaurant] = useState<RealRestaurantType | null>(null)

  const loadMoreRef = useRef<HTMLDivElement>(null)

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

  const showMapTrue = () => setShowMap(true)

  // 리스트 호출
  const {
    data,
    fetchNextPage, // 다음 페이지 호출
    hasNextPage, // 다음 페이지 존재 여부
    isFetchingNextPage, // 다음 페이지 호출 중 여부
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['restaurantList', bubbleSelected, selectedSort],
    queryFn: ({ pageParam = 0 }) =>
      getRestaurantNearbyList({
        lat: center.lat,
        lon: center.lng,
        categoryName: bubbleSelected,
        radius: 1000,
        page: pageParam,
        size: 10,
        sort: selectedSort,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { hasNext, pageNumber } = lastPage
      return hasNext && typeof pageNumber === 'number' ? pageNumber + 1 : undefined
    },
    refetchOnWindowFocus: false,
  })

  const totalCount = data?.pages.reduce((total, page) => total + page.content.length, 0) || 0

  useEffect(() => {
    // 초기값 설정: 첫 페이지 데이터가 로드되면 첫 번째 레스토랑을 중심으로 설정
    const firstRestaurant = data?.pages?.[0]?.content?.[0] ?? null
    if (firstRestaurant?.placeId) {
      // TODO: API 수정되면 lat, lng 순서 변경
      const { latitude: lng, longitude: lat } = firstRestaurant
      setCenter({ lat, lng })
      setFocusedRestaurant(firstRestaurant)
    }
  }, [data])

  // 무한스크롤
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || showMap) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage() // 화면에 보이면 자동으로 다음 페이지 로드
        }
      },
      { threshold: 0.1 },
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, showMap])

  return (
    <div className="relative h-full pt-9">
      {/* page header */}
      <section className="full-width fixed top-23 z-1 border-b bg-white">
        <BubbleTab bubbles={bubbles} active={bubbleSelected} onChange={onBubbleSelect} />
        <div className="flex h-12 items-center justify-between px-4">
          <p className="body4 text-gray-500">
            <b>{totalCount}개</b>의 매장
          </p>
          <div className="flex-row-center">
            <SortSelectBox
              sortOptions={sortOptions}
              active={selectedSort}
              onChange={onSelectSort}
            />
          </div>
        </div>
      </section>

      {/* page content */}
      <section className="relative h-full pt-27">
        {/* 데이터 없을 경우 예외 처리 */}
        {isLoading && !data && <LoadingSpinner />}
        {!isLoading && !data?.pages?.[0]?.content?.length && (
          <p className="flex-row-center body3 h-full text-gray-800">데이터가 존재하지 않습니다.</p>
        )}

        {/* 레스토랑 리스트 */}
        <div
          className={clsx(
            'nav-pd transition-all duration-700 ease-in-out',
            showMap ? 'invisible translate-y-full opacity-0' : 'visible translate-y-0 opacity-100',
          )}
        >
          {data &&
            data?.pages.map((page, pageIndex) => (
              <div key={pageIndex}>
                {page.content.map((restaurant, idx) => (
                  <NarrowCard
                    key={restaurant.placeId}
                    idx={idx}
                    restaurant={restaurant}
                    onFocusChange={setFocusedRestaurant}
                    onCenterChange={setCenter}
                    showMapTrue={showMapTrue}
                  />
                ))}
              </div>
            ))}
        </div>

        {/* 카카오맵 */}
        <div
          className={clsx(
            'full-width position-centered-x fixed top-50 left-0 h-[calc(100dvh-16.5rem)]',
            'transition-all duration-700 ease-in-out',
            showMap
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-8 opacity-0',
          )}
        >
          <RestaurantMap
            center={center}
            onCenterChange={setCenter}
            restaurantList={(data && data?.pages[0].content) ?? []}
            focusedRestaurant={focusedRestaurant}
            onFocusChange={setFocusedRestaurant}
          />
        </div>

        {/* observer target */}
        <div ref={loadMoreRef} className="h-4" />
      </section>

      {/* page footer */}
      <section>
        {showMap ? (
          <div className="nav-shadow full-width fixed bottom-0 h-18">
            <button
              type="button"
              className="relative h-18 w-full min-w-80"
              onClick={() => setShowMap(false)}
            >
              <div className="position-centered-x absolute top-4 h-1 w-20 rounded-sm bg-gray-200" />
              <span className="body4-sb text-gray-800">목록보기</span>
            </button>
          </div>
        ) : (
          <>
            {data && (
              <button
                type="button"
                className="flex-row-center position-centered-x fixed bottom-25 z-1 rounded-3xl bg-black px-3 py-2 text-white"
                onClick={showMapTrue}
              >
                <span className="body4-sb">지도 보기</span>
                <PlaceCalendar className="h-5 w-5" />
              </button>
            )}
            <Navigation />
          </>
        )}
      </section>
    </div>
  )
}
