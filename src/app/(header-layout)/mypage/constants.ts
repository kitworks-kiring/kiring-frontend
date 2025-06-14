export interface PlaneMessage {
  id: number
  senderName: string
  senderProfileImageUrl: string
  message: string
  sentAt: string
}

export const planeMessages: PlaneMessage[] = [
  {
    id: 1,
    senderName: '김한솔',
    senderProfileImageUrl: '/mock/avatar1.png',
    message: '“정말 멋진 선임이에요! 정말 본받고 싶습니다..!!! 진심으로',
    sentAt: '2025-06-13T14:20:00',
  },
  {
    id: 2,
    senderName: '백혜인',
    senderProfileImageUrl: '/mock/avatar2.png',
    message: '덕분에 점심 잘 먹었어요!',
    sentAt: '2025-06-12T11:05:00',
  },
  {
    id: 3,
    senderName: '인범진',
    senderProfileImageUrl: '/mock/avatar3.png',
    message: '언제나 응원하고 있어요 ✨',
    sentAt: '2025-06-10T08:40:00',
  },
]
