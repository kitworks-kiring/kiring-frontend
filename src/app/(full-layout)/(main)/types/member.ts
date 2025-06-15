export interface Team {
  id: number
  name: string
  code: string
  createdAt?: string
  updatedAt?: string
}

export interface Member {
  id: number
  name: string
  email: string
  phone: string
  kakaoId: string
  nickname: string
  profileImageUrl: string
  kiringImageUrl: string
  birthday: string
  githubId: string
  joinedAt: string
  team: Team
  admin: boolean
  employed: boolean
}

export interface MembersResponse {
  members: Member[]
}
