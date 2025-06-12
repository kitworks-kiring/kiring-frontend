export interface BusArrivalRaw {
  stId: string // 정류소 ID
  stNm: string // 정류소 이름
  arsId: string // 정류소 ID
  busRouteId: string // 버스 노선 ID
  busRouteAbrv: string // 버스 노선 약칭
  routeType: string // 버스 노선 유형
  mkTm: string // 버스 노선 출발 시간
  stationNm1: string // 정류소 이름
  traTime1: string // 버스 노선 도착 시간
  isArrive1: string // 버스 노선 도착 여부
  busType1: string // 버스 노선 유형
  exps1: string // 버스 노선 도착 시간
  rerdie_Div1: string // 2: 재차인원, 4: 혼잡도
  reride_Num1: string // 0: 데이터X, 3: 여유, 4: 보통, 5: 혼잡
  arrmsg1: string // 버스 노선 도착 메시지
}

export interface BusResponseType {
  stationName: string
  mkTm: string
  buses: BusArrivalRaw[]
}
