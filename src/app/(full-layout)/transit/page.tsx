import fetchSubway from '@/app/(full-layout)/transit/fetch-subway'
import GroupHeader from '@/app/(full-layout)/transit/components/group-header'
import DirectionGrid from '@/app/(full-layout)/transit/components/direction-grid'
import RealtimeHeader from '@/app/(full-layout)/transit/components/realtime-header'

export default async function Transit() {
  const data = await fetchSubway()
  if (!data) return <div>데이터를 불러올 수 없습니다.</div>
  const { groupedNum2, groupedNum9 } = data

  return (
    <div className="px-4">
      {/* 2호선 헤더 */}
      <GroupHeader number={2} />
      {/* 실시간/시간표, 시간 */}
      <RealtimeHeader />
      {/* 2호선 방면별 카드 (2단) */}
      <DirectionGrid grouped={groupedNum2} />
      {/* 9호선 헤더 */}
      <GroupHeader number={9} />
      {/* 실시간/시간표, 시간 */}
      <RealtimeHeader />
      {/* 9호선 방면별 카드 (2단) */}
      <DirectionGrid grouped={groupedNum9} />
    </div>
  )
}
