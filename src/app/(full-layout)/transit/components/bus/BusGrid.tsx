import clsx from 'clsx'
import IcoBusLogo from '@/assets/ico-bus-logo.svg'
import { BusArrivalRaw } from '@/app/(full-layout)/transit/types/busType'
import { BUS_TYPE_COLOR, CONGESTION_COLOR } from '@/app/(full-layout)/transit/constants'
import IcoArrowDown from '@/assets/ico-arrow-down.svg'

interface BusGridProps {
  stationName: string
  buses: BusArrivalRaw[]
  showAll: boolean
  setShowAll: (showAll: boolean) => void
}

export default function BusGrid({ stationName, buses, showAll, setShowAll }: BusGridProps) {
  // 버스 타입별 색상 반환
  function getBusTypeColor(type: string) {
    return BUS_TYPE_COLOR[type] || 'bg-gray-300'
  }

  // 혼잡도 및 좌석 표시 박스
  function busCongestion(rerdie_Div1: string, reride_Num1: string) {
    const BusCongestionBox = ({ color, text }: { color: string; text: string }) => (
      <div
        className={clsx('flex-row-center rounded-full border px-2 py-1', CONGESTION_COLOR[color])}
      >
        <span className="body5">{text}</span>
      </div>
    )
    // 재차인원
    if (rerdie_Div1 === '2') return <BusCongestionBox color="gray" text={`${reride_Num1}석`} />
    // 혼잡도
    if (rerdie_Div1 === '4') {
      switch (reride_Num1) {
        case '3':
          return <BusCongestionBox color="blue" text="여유" />
        case '4':
          return <BusCongestionBox color="green" text="보통" />
        case '5':
          return <BusCongestionBox color="red" text="혼잡" />
        default:
          return <BusCongestionBox color="gray" text="-" />
      }
    }
    return null
  }

  // 더보기 버튼 로직
  const visibleBuses = showAll ? buses : buses.slice(0, 6)

  return (
    <div key={stationName} className="rounded-xl border bg-white p-4 shadow">
      {/* 정류소 이름 및 도보 거리 */}
      <div className="mb-2 flex items-center gap-3">
        <IcoBusLogo />
        <div className="flex flex-col gap-1">
          <span className="body3-sb text-gray-900">{stationName}</span>
          <span className="body4 text-gray-600">
            도보 1분 <span className="text-purple-300">(20m)</span>
          </span>
        </div>
      </div>
      {/* 구분선 */}
      <div className="mb-2 h-[1px] w-full bg-gray-200" />
      {/* 버스 목록 */}
      <ul className="flex flex-col gap-2 py-1">
        {visibleBuses.map((bus: BusArrivalRaw) => (
          <li key={bus.busRouteId} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* 버스 번호 + 색상 */}
              <span
                className={clsx(
                  'body4-sb flex items-center justify-center rounded-full px-2 py-1 text-white',
                  getBusTypeColor(bus.routeType),
                )}
              >
                {bus.busRouteAbrv}
              </span>
              {/* 도착 메시지 */}
              <span
                className={clsx(
                  'body3-sb',
                  bus.arrmsg1.includes('곧') ||
                    bus.arrmsg1.includes('도착') ||
                    (Number(bus.traTime1) > 0 && Number(bus.traTime1) < 300)
                    ? 'text-red-500'
                    : 'text-base-black',
                )}
              >
                {Number(bus.exps1) < 80
                  ? '곧 도착'
                  : `${Math.floor(Number(bus.exps1) / 60)}분 후 도착`}
              </span>
            </div>
            {/* 혼잡도/좌석 등 */}
            <div>{busCongestion(bus.rerdie_Div1, bus.reride_Num1)}</div>
          </li>
        ))}
      </ul>
      {/* 더보기 버튼 */}
      {buses.length > 6 && (
        <button className="flex-row-center mt-3 w-full" onClick={() => setShowAll(!showAll)}>
          <IcoArrowDown
            className={clsx(
              'transition-transform duration-300',
              showAll ? '-rotate-180' : 'rotate-0',
            )}
          />
        </button>
      )}
    </div>
  )
}
