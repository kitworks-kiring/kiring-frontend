import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { useQuery } from '@tanstack/react-query'
import { getRestaurantList } from '@/services/restaurant'
import { useSingleSelect } from '@/components/tabs/BubbleTab/useSingleSelect'
import { PLACE_SORT_DROPDOWN_LIST } from '@/app/(header-layout)/place/constants'
import SvgButton from '@/components/ui/SvgButton'
import SortSelectBox, {
  SortItem,
} from '@/app/(header-layout)/place/components/restaurant/SortSelectBox'
import NarrowCard from '@/app/(header-layout)/place/components/restaurant/NarrowCard'
import WideCard from '@/app/(header-layout)/place/components/restaurant/WideCard'
import RestaurantMap from '@/app/(header-layout)/place/components/restaurant/RestaurantMap'
import Navigation from '@/components/layout/Navigation'
import { restaurantList as mockList } from '@/app/(header-layout)/place/mock/restaurant'
import { COMPANY_COORD } from '@/utils/calcDistance'
import {
  RestaurantType,
  RestaurantListType,
} from '@/app/(header-layout)/place/types/restaurantType'
import PlaceCalendar from '@/assets/place-calendar.svg'
import IcoNarrow from '@/assets/ico-narrow.svg'
import IcoWide from '@/assets/ico-wide.svg'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function RestaurantContents() {
  const [viewType, setViewType] = useState<'narrow' | 'wide'>('narrow')
  const [showMap, setShowMap] = useState(false)
  const [center, setCenter] = useState({
    lat: COMPANY_COORD.lat,
    lng: COMPANY_COORD.lng,
  })
  const [restaurantList, setRestaurantList] = useState<RestaurantListType>(mockList)
  const [focusedRestaurant, setFocusedRestaurant] = useState<RestaurantType | null>(null)

  const router = useRouter()

  const initialActiveSort = PLACE_SORT_DROPDOWN_LIST[0].value
  const { selected: selectedSort, onSelect: onSelectSort } = useSingleSelect(initialActiveSort)
  const sortOptions: SortItem[] = PLACE_SORT_DROPDOWN_LIST.map(({ label, value }) => ({
    label,
    value,
  }))

  const showMapTrue = () => setShowMap(true)

  const { data, isLoading, isError } = useQuery<object>({
    queryKey: ['restaurantList', center],
    queryFn: getRestaurantList,
    refetchOnWindowFocus: false,
  })
  if (isError) {
    router.push('/error')
  }

  useEffect(() => {
    console.log('api test', data)
  }, [data])

  useEffect(() => {
    // 중심좌표(center)가 바뀔 때마다 API 호출
    setRestaurantList(mockList)
  }, [center])

  useEffect(() => {
    // 초기값 설정
    if (mockList?.[0]?.id) {
      const { lat, lng } = mockList[0]
      setCenter({ lat, lng })
      setFocusedRestaurant(mockList[0])
    }
  }, [])

  return (
    <div className="relative h-full pt-9">
      {/* count section */}
      <section className="full-width sticky top-9 z-1 flex h-12 items-center justify-between border-b bg-white px-4">
        <p className="body4 text-gray-500">
          <b>{restaurantList?.length ?? 0}개</b>의 매장
        </p>
        <div className="flex-row-center">
          <SvgButton
            icon={viewType === 'narrow' ? <IcoNarrow /> : <IcoWide />}
            onClick={() => setViewType((prev) => (prev === 'narrow' ? 'wide' : 'narrow'))}
          />
          <SortSelectBox sortOptions={sortOptions} active={selectedSort} onChange={onSelectSort} />
        </div>
      </section>

      {/* restaurant list section */}
      {(isLoading || !data) && (
        <>
          <section className="nav-pd h-full">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <p className="flex-row-center body3 h-full text-gray-800">
                데이터가 존재하지 않습니다.
              </p>
            )}
          </section>
          <Navigation />
        </>
      )}
      {data && (
        <>
          <section
            className={clsx(
              'nav-pd transition-all duration-600',
              showMap
                ? 'invisible translate-y-full opacity-0'
                : 'visible translate-y-0 opacity-100',
            )}
          >
            {viewType === 'narrow' ? (
              <NarrowCard
                restaurantList={restaurantList}
                onFocusChange={setFocusedRestaurant}
                onCenterChange={setCenter}
                showMapTrue={showMapTrue}
              />
            ) : (
              <WideCard restaurantList={restaurantList} />
            )}
          </section>
          <section
            className={clsx(
              'full-width position-centered-x fixed top-35 left-0 h-[calc(100dvh-13rem)] bg-blue-50 transition-opacity duration-600',
              showMap ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
            )}
          >
            <RestaurantMap
              center={center}
              onCenterChange={setCenter}
              restaurantList={restaurantList}
              focusedRestaurant={focusedRestaurant}
              onFocusChange={setFocusedRestaurant}
            />
          </section>
        </>
      )}

      {/* footer section */}
      {data && !showMap && (
        <>
          <button
            type="button"
            className="flex-row-center position-centered-x fixed bottom-25 z-1 rounded-3xl bg-black px-3 py-2 text-white"
            onClick={showMapTrue}
          >
            <span className="body4-sb">지도 보기</span>
            <PlaceCalendar className="h-5 w-5" />
          </button>
          <Navigation />
        </>
      )}
      {data && showMap && (
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
      )}
    </div>
  )
}
