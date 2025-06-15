export interface MemberMeType {
  id: number
  name: string
  nickname: string
  email: string
  joinedAt: string
  profileImageUrl: string
  kiringImageUrl: string
  birthday: string
  phone: string
  githubId: string
  kakaoId: string
  admin: boolean
  employed: boolean
  team: TeamType
  createdAt: string
  updatedAt: string
}

export interface TeamType {
  id: number
  code: string
  name: string
  createdAt: string
  updatedAt: string
}
