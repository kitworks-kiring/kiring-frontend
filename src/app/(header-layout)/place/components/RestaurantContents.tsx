'use client'

import BubbleTab, { BubbleItem } from '@/components/tabs/BubbleTab'
import { useSingleSelect } from '@/components/tabs/BubbleTab/useSingleSelect'
import {
  PLACE_BUBBLE_TAB_LIST,
  PLACE_SORT_DROPDOWN_LIST,
} from '@/app/(header-layout)/place/constants'
import SortSelectBox, { SortItem } from '@/app/(header-layout)/place/components/SortSelectBox'

export default function RestaurantContents() {
  const initialActiveBubble = PLACE_BUBBLE_TAB_LIST[1].value
  const initialActiveSort = PLACE_SORT_DROPDOWN_LIST[0].value
  const { selected: selectedSort, onSelect: onSelectSort } = useSingleSelect(initialActiveSort)
  const { selected: bubbleSelected, onSelect: onBubbleSelect } =
    useSingleSelect(initialActiveBubble)
  const bubbles: BubbleItem[] = PLACE_BUBBLE_TAB_LIST.map(({ label, value }) => ({ label, value }))
  const sortOptions: SortItem[] = PLACE_SORT_DROPDOWN_LIST.map(({ label, value }) => ({
    label,
    value,
  }))

  return (
    <>
      <BubbleTab bubbles={bubbles} active={bubbleSelected} onChange={onBubbleSelect} />
      <section className="flex h-12 items-center justify-between border-b border-gray-50 px-4">
        <p className="font-body4 text-gray-500">
          <b>522개</b>의 매장
        </p>
        <SortSelectBox sortOptions={sortOptions} active={selectedSort} onChange={onSelectSort} />
      </section>
      <section></section>
    </>
  )
}
