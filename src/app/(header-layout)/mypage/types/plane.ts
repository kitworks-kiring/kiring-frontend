export interface PlaneMessage {
  messageId: number
  sender: PlaneSender
  message: string
  sentAt: string
}

export interface PlaneSender {
  id: number
  name: string
  profileImageUrl: string
}
