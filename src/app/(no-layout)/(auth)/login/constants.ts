export const LOGIN_ERROR_MESSAGES = [
  {
    type: 'AUTH_ERROR_404',
    message: '키링에 가입 할 수 없는 사용자에요.\n\n다른 계정으로 로그인하시겠어요?',
    confirmable: true,
  },
  {
    type: 'AUTH_ERROR_500',
    message: '일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
    confirmable: false,
  },
  {
    type: 'Default',
    message: '로그인 중 문제가 발생했어요.',
    confirmable: false,
  },
]
