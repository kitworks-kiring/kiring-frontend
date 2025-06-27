export const LOGIN_ERROR_MESSAGES = [
  {
    type: 'ERR_1001',
    message: '키링에 가입 할 수 없는 사용자에요.\n\n다른 계정으로 로그인하시겠어요?',
    confirmable: true,
  },
  {
    type: 'ERR_1002',
    message: '필수 항목 동의가 누락되었어요.\n\n다시  로그인하시겠어요?',
    confirmable: true,
  },
  {
    type: 'ERR_1003',
    message: '휴대폰 번호가 존재하지 않아 로그인할 수없어요.\n\n다른 계정으로 로그인하시겠어요?',
    confirmable: true,
  },
  {
    type: 'ERR_1099',
    message: '일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
    confirmable: false,
  },
  {
    type: 'ERR_Default',
    message: '로그인 중 문제가 발생했어요.',
    confirmable: false,
  },
]
