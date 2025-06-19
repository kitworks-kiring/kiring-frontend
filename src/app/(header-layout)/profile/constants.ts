interface Sender {
  id: number
  name: string
  profileImageUrl: string
}

export interface PlaneMessage {
  messageId: number
  sender: Sender
  message: string
  sentAt: string
}

export const planeMessages: PlaneMessage[] = [
  {
    messageId: 1001,
    sender: {
      id: 1,
      name: '김한솔',
      profileImageUrl: 'https://cdn.kiring.app/profile/123.jpg',
    },
    message: '정말 멋진 선임이에요! 정말 본받고 싶습니다..!!! 진심으로',
    sentAt: '2025-06-15T15:12:00',
  },
  {
    messageId: 1002,
    sender: {
      id: 2,
      name: '백혜인',
      profileImageUrl: 'https://cdn.kiring.app/profile/123.jpg',
    },
    message: '정말 킹 받네용 킹받',
    sentAt: '2025-06-14T01:12:00Z',
  },
  {
    messageId: 1003,
    sender: {
      id: 3,
      name: '인범진',
      profileImageUrl: 'https://cdn.kiring.app/profile/123.jpg',
    },
    message: '응원합니다! :))',
    sentAt: '2025-06-13T09:12:00',
  },
]
