import { useState } from 'react'
import clsx from 'clsx'
import { useSingleSelect } from '@/components/tabs/BubbleTab/useSingleSelect'
import { PLACE_SORT_DROPDOWN_LIST } from '@/app/(header-layout)/place/constants'
import SortSelectBox, { SortItem } from '@/app/(header-layout)/place/components/SortSelectBox'
import RestaurantCard from '@/app/(header-layout)/place/components/RestaurantCard'
import RestaurantWideCard from '@/app/(header-layout)/place/components/RestaurantWideCard'
import Navigation from '@/components/layout/Navigation'
import { restaurantList } from '@/app/(header-layout)/place/mock/restaurant'
import PlaceCalendar from '@/assets/place-calendar.svg'

export default function TestContents() {
  const initialActiveSort = PLACE_SORT_DROPDOWN_LIST[0].value
  const { selected: selectedSort, onSelect: onSelectSort } = useSingleSelect(initialActiveSort)
  const sortOptions: SortItem[] = PLACE_SORT_DROPDOWN_LIST.map(({ label, value }) => ({
    label,
    value,
  }))

  const [showMap, setShowMap] = useState(false)

  return (
    <div className="relative pt-9">
      {/* count section */}
      <section className="full-width sticky top-9 z-1 flex h-12 items-center justify-between border-b bg-white px-4">
        <p className="font-body4 text-gray-500">
          <b>{restaurantList?.length ?? 0}개</b>의 매장
        </p>
        <SortSelectBox sortOptions={sortOptions} active={selectedSort} onChange={onSelectSort} />
      </section>

      {/* restaurant list section */}
      <section
        className={clsx(
          'nav-pd transition-all duration-600',
          showMap ? 'invisible translate-y-full opacity-0' : 'visible translate-y-0 opacity-100',
        )}
      >
        {selectedSort !== 'latest' ? (
          <RestaurantCard restaurantList={restaurantList} />
        ) : (
          <RestaurantWideCard restaurantList={restaurantList} />
        )}
      </section>
      <section
        className={clsx(
          'full-width position-centered-x fixed top-35 left-0 h-[calc(100dvh-13rem)] bg-blue-50 transition-opacity duration-600',
          showMap ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        TODO: 카카오맵 구현
      </section>

      {/* footer section */}
      {!showMap ? (
        <>
          <button
            type="button"
            className="flex-row-center position-centered-x fixed bottom-25 z-1 rounded-3xl bg-black px-3 py-2 text-white"
            onClick={() => setShowMap(true)}
          >
            <span className="body4-sb">지도 보기</span>
            <PlaceCalendar className="h-5 w-5" />
          </button>
          <Navigation />
        </>
      ) : (
        <div className="nav-shadow full-width fixed bottom-0 h-18">
          <button
            type="button"
            className="relative h-18 w-full min-w-80"
            onClick={() => setShowMap(false)}
          >
            <div className="position-centered-x absolute top-4 h-2 w-20 rounded-sm bg-gray-200" />
          </button>
        </div>
      )}
    </div>
  )
}
