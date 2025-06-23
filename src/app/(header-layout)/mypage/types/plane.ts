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

export interface PlaneSendMessage {
  senderId: number
  receiverId: number
  message: string
}

export interface PlaneTodayMessage {
  todaySentCount: number
  hasTodayReceived: boolean
  todayRecommendation: PlaneTodayRecommendation
}
export interface PlaneTodayRecommendation {
  id: number
  name: string
  profileImageUrl: string
  kiringImageUrl: string
}
