export interface SubwayArrivalType {
  barvlDt: string
  recptnDt: string
  btrainSttus: string
  destination: string
  ordkey: string
  korDirection: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
export interface SubwayDataType {
  groupedNum2: Record<string, SubwayArrivalType[]>
  groupedNum9: Record<string, SubwayArrivalType[]>
  receptnDt: string
}
