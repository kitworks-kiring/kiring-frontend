import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { RefObject } from 'react'

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

/** Plane 단계 Enum (write → confirm → sending → done) */
export enum PlaneStep {
  WRITE = 'write',
  CONFIRM = 'confirm',
  SENDING = 'sending',
  DONE = 'done',
}

/** 애니메이션 상태 관리 타입 */
export type PlaneAnimStates = {
  showRewriteBtn: boolean
  showSubmitBtn: boolean
  showTextarea: boolean
  showNextButton: boolean
  showSendingText: boolean
  showDoneText: boolean
  showHomeBtn: boolean
}

export interface PlaneProfileProps {
  step: PlaneStep
  recommendation?: PlaneTodayRecommendation
}

export interface PlaneWriteStepProps {
  message: string
  setMessage: (msg: string) => void
  setStep: (step: PlaneStep) => void
  isValid: boolean
  textareaRef: RefObject<HTMLTextAreaElement | null>
  animStates: Pick<PlaneAnimStates, 'showTextarea' | 'showNextButton'>
}

export type PlaneConfirmStepProps = {
  setStep: (step: PlaneStep) => void
  handleSubmit: () => void
  animStates: Pick<PlaneAnimStates, 'showRewriteBtn' | 'showSubmitBtn'>
}

export interface PlaneSendingOrDoneStepProps {
  step: PlaneStep
  recommendation?: { name: string }
  animStates: Pick<PlaneAnimStates, 'showSendingText' | 'showDoneText' | 'showHomeBtn'>
  router: AppRouterInstance
}
