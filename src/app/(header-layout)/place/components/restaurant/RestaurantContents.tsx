'use client'

import { useState, useRef, useEffect, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Map as KakaoMap, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import { useInfiniteQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { getCalcDistance } from '@/utils/calcDistance'
import { getRestaurantNearbyList } from '@/services/restaurant'
import { useSingleSelect } from '@/components/tabs/BubbleTab/useSingleSelect'
import BubbleTab, { BubbleItem } from '@/components/tabs/BubbleTab'
import SortSelectBox, {
  SortItem,
} from '@/app/(header-layout)/place/components/restaurant/SortSelectBox'
import NarrowCard from '@/app/(header-layout)/place/components/restaurant/NarrowCard'
import NarrowSkeleton from '@/app/(header-layout)/place/components/restaurant/NarrowSkeleton'
import WideCard from '@/app/(header-layout)/place/components/restaurant/WideCard'
import WideSkeleton from './WideSkeleton'
import SvgButton from '@/components/ui/SvgButton'
import {
  PLACE_BUBBLE_TAB_LIST,
  PLACE_SORT_DROPDOWN_LIST,
} from '@/app/(header-layout)/place/constants'
import { MARKER_IMG_URL, LIKE_IMG_URL } from '@/app/(header-layout)/place/constants'
import IcoNarrow from '@/assets/restaurant/ico-narrow.svg'
import IcoWide from '@/assets/restaurant/ico-wide.svg'
// import IcoGps from '@/assets/restaurant/ico-gps.svg'
import IcoList from '@/assets/restaurant/ico-list.svg'
import IcoListMore from '@/assets/restaurant/ico-list-more.svg'
import IcoMap from '@/assets/restaurant/ico-map.svg'
import IcoReload from '@/assets/restaurant/ico-reload.svg'
import {
  RestaurantType,
  RestaurantNearbyListResponseType,
} from '@/app/(header-layout)/place/types/restaurantType'

export default function RestaurantContents() {
  // 지도 중심 좌표
  const [center, setCenter] = useState({
    lat: 37.53292281015791,
    lng: 126.90366188575777,
  })
  // 리스트 카드 레이아웃
  const [cardLayout, setCardLayout] = useState<'narrow' | 'wide'>('narrow')
  // 전체 목록 보기
  const [sheetPosition, setSheetPosition] = useState<'collapsed' | 'half' | 'expanded'>('half')
  // 클릭한 레스토랑 데이터
  const [focusedRestaurant, setFocusedRestaurant] = useState<RestaurantType | null>(null)
  // 중앙 시점 변동 여부
  const [isCenterChanged, setIsCenterChanged] = useState(false)
  // 토스트 메세지
  const [toast, setToast] = useState(false)
  // 커스텀 오버레이 표시 여부
  const [isOverlayVisible, setIsOverlayVisible] = useState(true)

  // use hooks
  const router = useRouter()
  const mapRef = useRef<kakao.maps.Map>(null)
  const isProgrammaticMove = useRef(false) // 프로그램 이동(↔ 사용자 이동) 여부를 판단하기 위한 ref

  // variable
  const isSheetExpanded = sheetPosition === 'expanded'

  // style
  const sectionStyle = 'position-centered-x full-width absolute'
  const floatingBtnStyle =
    'body4 flex-row-center gap-1 rounded-l-xl rounded-r-xl bg-white p-2 shadow-xl'

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

  const {
    data: res,
    fetchNextPage, // 다음 페이지 호출
    hasNextPage, // 다음 페이지 존재 여부
    refetch, // 데이터 재호출
    isLoading,
    isFetchNextPageError, // 다음 페이지 호출 중 에러 여부
    isRefetchError, // 데이터 재호출 중 에러 여부
  } = useInfiniteQuery<RestaurantNearbyListResponseType>({
    queryKey: ['restaurantList', bubbleSelected, selectedSort],
    queryFn: ({ pageParam = 0 }) =>
      getRestaurantNearbyList({
        lat: center.lat,
        lon: center.lng,
        categoryName: bubbleSelected,
        radius: 500,
        page: pageParam as number,
        size: 50,
        sort: selectedSort,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { hasNext, pageNumber } = lastPage
      return hasNext ? +pageNumber + 1 : undefined
    },
    refetchOnWindowFocus: false,
  })

  // 카카오맵 중심 좌표 변경 감지
  const onIdleKakaoMap = () => {
    // 프로그램 이동 시 처리 건너뛰기
    if (isProgrammaticMove.current) {
      isProgrammaticMove.current = false
      return
    }
    const map = mapRef.current
    if (!map) return

    const THRESHOLD = 30 // 중심 좌표 변화 감지 임계값(m)
    const centerObj = map.getCenter()
    const newLat = centerObj.getLat()
    const newLng = centerObj.getLng()
    const distance = getCalcDistance({
      prevCoord: { lat: center.lat, lng: center.lng },
      nextCoord: { lat: newLat, lng: newLng },
    })
    if (distance > THRESHOLD) {
      setIsCenterChanged(true) // 중심 좌표 변경 여부 업데이트
      setSheetPosition('collapsed') // 전체 목록 보기 상태 변경
      setIsOverlayVisible(false) // 커스텀 오버레이 숨김
    }
  }

  // 새로운 center 좌표로 레스토랑 리스트 재조회
  const refetchNewList = async () => {
    // 포커스 된 레스토랑, 중심 좌표 변경 여부 초기화
    await setFocusedRestaurant(null)
    await setIsCenterChanged(false)

    const centerObj = mapRef?.current?.getCenter()
    if (centerObj) {
      const newCenter = { lat: centerObj.getLat(), lng: centerObj.getLng() }
      await setCenter(newCenter)
    }
    await refetch({ cancelRefetch: true })
  }

  // 마커 클릭 시 포커스 된 레스토랑 오버레이 출력
  const onMarkerClick = (marker: kakao.maps.Marker, restaurant: RestaurantType) => {
    isProgrammaticMove.current = true
    setSheetPosition('collapsed')
    setIsOverlayVisible(true)
    mapRef.current?.panTo(marker.getPosition())
    setFocusedRestaurant(restaurant)
  }

  // 리스트 카드 클릭 시 포커스 된 레스토랑 오버레이 출력
  const onClickListCard = () => {
    setSheetPosition('collapsed')
    setIsOverlayVisible(true)
  }

  // 바텀 시트 포지션 토글
  const toggleSheetPosition = () => {
    setSheetPosition((prev) => (['half', 'collapsed'].includes(prev) ? 'expanded' : 'collapsed'))
    setFocusedRestaurant(null)
  }

  // 페이지 마운트 시 파라미터 확인 및 레스토랑 포커스 설정
  useEffect(() => {
    const setFocusFromParams = () => {
      const restaurantParams = JSON.parse(sessionStorage.getItem('restaurantParams') || '{}')
      sessionStorage.removeItem('restaurantParams')
      const { latitude: paramLat = 0, longitude: paramLng = 0 } = restaurantParams
      if (!Object.keys(restaurantParams).length || !paramLat || !paramLng) return

      isProgrammaticMove.current = true
      onSelectSort('distance')
      setCenter({ lat: paramLat, lng: paramLng })
      setFocusedRestaurant(restaurantParams)
      setSheetPosition('collapsed')
      mapRef.current?.setLevel(1)

      return setTimeout(() => refetch({ cancelRefetch: true }), 0)
    }

    const timeoutId = setFocusFromParams()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  // 좋아요 업데이트 시 포커스 된 레스토랑과 데이터 동기화
  useEffect(() => {
    if (focusedRestaurant && res?.pages) {
      const updatedRestaurant = res.pages
        .flatMap((page) => page.content)
        .find((restaurant) => restaurant.placeId === focusedRestaurant.placeId)

      if (updatedRestaurant && updatedRestaurant.likeCount !== focusedRestaurant.likeCount) {
        setFocusedRestaurant(updatedRestaurant)
      }
    }
  }, [res, focusedRestaurant])

  // 에러 발생 시 에러 페이지로 랜딩
  useEffect(() => {
    if (isRefetchError || isFetchNextPageError) {
      router.push('/error')
    }
  }, [router, isRefetchError, isFetchNextPageError])

  // 토스트 메세지 표시
  useEffect(() => {
    const sholdShowToast = res && !hasNextPage && !isFetchNextPageError && !isRefetchError
    if (sholdShowToast) {
      setToast(true)
      const timer = setTimeout(() => {
        setToast(false)
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      setToast(false)
    }
  }, [res, hasNextPage, isFetchNextPageError, isRefetchError])

  return (
    <div className="relative h-full pt-9">
      {/* 카카오맵 */}
      <section
        className={clsx(
          'top-0 left-0 z-0 h-full pt-9',
          sectionStyle,
          isSheetExpanded ? 'point-event-none' : 'point-event-auto',
        )}
      >
        <KakaoMap
          ref={mapRef}
          center={center}
          style={{ width: '100%', height: '100%' }}
          level={2}
          onIdle={onIdleKakaoMap}
        >
          {res &&
            res?.pages?.map((page, pageIndex) => (
              <Fragment key={`res-${pageIndex}`}>
                {page.content.map((restaurant) => (
                  <Fragment key={`content-${restaurant.placeId}`}>
                    <MapMarker
                      key={`marker-${restaurant.placeId}`}
                      position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
                      title={restaurant.name}
                      image={{
                        src: MARKER_IMG_URL,
                        size: { width: 20, height: 30 },
                        options: {
                          alt: restaurant.name,
                          offset: { x: 10, y: 15 },
                        },
                      }}
                      onClick={(marker) => onMarkerClick(marker, restaurant)}
                    />
                    {focusedRestaurant?.placeId === restaurant.placeId && isOverlayVisible && (
                      <CustomOverlayMap
                        key={`overlay-${restaurant.placeId}`}
                        position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
                        zIndex={1}
                        xAnchor={0}
                        yAnchor={0.85}
                      >
                        <div className="position-centered-x">
                          <div className="flex-col-center gap-0.5 rounded-3xl border-2 border-purple-500 bg-white px-4 py-2">
                            <span className="body3">{restaurant.name}</span>
                            <div className="flex-row-center gap-0.5">
                              <Image
                                src={LIKE_IMG_URL}
                                alt="좋아요 수 아이콘"
                                width={14}
                                height={14}
                                className="object-contain"
                              />
                              <span className="body4-sb text-purple-500">
                                {restaurant.likeCount}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CustomOverlayMap>
                    )}
                  </Fragment>
                ))}
              </Fragment>
            ))}
        </KakaoMap>
        <div className="position-centered-x absolute bottom-28 left-1/2 z-10 w-9/10 rounded-l-2xl rounded-r-2xl bg-white px-2 shadow-lg">
          {focusedRestaurant && isOverlayVisible && (
            <NarrowCard
              key={`map-${focusedRestaurant.placeId}`}
              restaurant={focusedRestaurant}
              isFloating
            />
          )}
        </div>
      </section>

      {/* 바텀 시트 */}
      <section
        className={clsx(
          'left-0 transform-cpu transition-all duration-400 ease-in-out',
          sectionStyle,
          sheetPosition === 'half' && 'bottom-0 h-98 overflow-y-hidden',
          sheetPosition === 'collapsed' && 'bottom-0 h-32 overflow-y-hidden',
          sheetPosition === 'expanded' && '-bottom-8 h-full',
        )}
      >
        {!isSheetExpanded && (
          <div
            className={clsx(
              'z-1 mx-2 mb-2 flex justify-between',
              sheetPosition !== 'half' && isOverlayVisible ? 'invisible' : 'visible',
            )}
          >
            <button
              type="button"
              // {/* TODO: 2차 개발 시 geolocation 연동해서 GPS 기능 구현 */}
              // className={clsx('pointer-events-none hidden h-0 w-0', floatingBtnStyle)}
              className={clsx(
                'pointer-events-none hidden h-0 w-0',
                'body4 flex-row-center gap-1 rounded-l-xl rounded-r-xl p-2 shadow-xl',
              )}
            >
              {/* TODO: 2차 개발 시 geolocation 연동해서 GPS 기능 구현 */}
              {/* <span className="sr-only">실시간 내 위치 확인</span>
              <IcoGps /> */}
            </button>
            {isCenterChanged && (
              <button type="button" className={floatingBtnStyle} onClick={refetchNewList}>
                <IcoReload />
                <span>이 지역에서 검색</span>
              </button>
            )}
            {!isCenterChanged && hasNextPage && (
              <button type="button" className={floatingBtnStyle} onClick={() => fetchNextPage()}>
                <IcoListMore />
                <span>매장 더보기</span>
              </button>
            )}
            <button type="button" className={floatingBtnStyle} onClick={toggleSheetPosition}>
              <IcoList />
              <span className="sr-only">매장 목록 보기</span>
              <span className="not-sr-only">목록</span>
            </button>
          </div>
        )}
        <div
          className={clsx('relative min-h-dvh bg-white pt-1', !isSheetExpanded && 'rounded-t-xl')}
        >
          {!isSheetExpanded && (
            <button
              type="button"
              className="mx-auto my-3 block h-1 w-30 rounded-sm bg-gray-200"
              onClick={toggleSheetPosition}
            >
              <span className="sr-only">매장 목록 보기</span>
            </button>
          )}
          <div
            className={clsx(
              'z-1 flex items-center justify-between bg-white pr-2',
              isSheetExpanded && 'sticky top-9',
            )}
          >
            <BubbleTab
              bubbles={bubbles}
              active={bubbleSelected}
              onChange={onBubbleSelect}
              hasBorder={false}
            />
            <div className="flex-row-center gap-1">
              <SvgButton
                icon={cardLayout === 'narrow' ? <IcoNarrow /> : <IcoWide />}
                onClick={() => setCardLayout((prev) => (prev === 'narrow' ? 'wide' : 'narrow'))}
              />
              <SortSelectBox
                sortOptions={sortOptions}
                active={selectedSort}
                onChange={onSelectSort}
                propsClass={sheetPosition === 'collapsed' && 'bottom-0'}
              />
            </div>
          </div>
          {/* 리스트 */}
          <div className="relative">
            {isLoading && (cardLayout === 'narrow' ? <NarrowSkeleton /> : <WideSkeleton />)}
            {!isLoading && !res?.pages?.[0]?.content?.length && (
              <p className="flex-row-center h-100 text-gray-700">일치하는 데이터가 없습니다.</p>
            )}
            {(res &&
              res?.pages.map((page, pageIndex) => (
                <Fragment key={pageIndex}>
                  {page.content.map((restaurant, idx) =>
                    cardLayout === 'narrow' ? (
                      <NarrowCard
                        key={`narrow-${restaurant.placeId}`}
                        idx={idx}
                        restaurant={restaurant}
                        onFocusChange={setFocusedRestaurant}
                        onCenterChange={setCenter}
                        onClickListCard={onClickListCard}
                      />
                    ) : (
                      <WideCard
                        key={`wide-${restaurant.placeId}`}
                        idx={idx}
                        restaurant={restaurant}
                        onFocusChange={setFocusedRestaurant}
                        onCenterChange={setCenter}
                        onClickListCard={onClickListCard}
                      />
                    ),
                  )}
                </Fragment>
              ))) ??
              null}
          </div>
        </div>
        {isSheetExpanded && (
          <div className="sticky bottom-5 left-30 z-10 flex justify-end pr-5">
            <button
              type="button"
              className="flex-row-center rounded-3xl bg-black px-3 py-2 text-white"
              onClick={toggleSheetPosition}
            >
              <span className="body4-sb">지도 보기</span>
              <IcoMap className="h-5 w-5" />
            </button>
          </div>
        )}
      </section>

      {toast && (
        <div
          className={clsx(
            'full-width flex-row-center absolute bottom-17 z-0 h-12',
            'slide-up-down ease transition-all duration-200',
          )}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="body4 bg-basic-black rounded-xl p-4 text-center text-white">
            현재 위치의 모든 매장을 불러왔어요!
          </span>
        </div>
      )}
    </div>
  )
}
