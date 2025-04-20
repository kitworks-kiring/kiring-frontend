module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능 추가
        'fix', // 버그 수정
        'chore', // 빌드 설정 변경, 패키지 설치, ci/cd 설정 등
        'style', // 코드 포맷팅, 세미콜론 추가/제거 등 (코드 로직 변경 X)
        'refactor', // 기능 변경 없이 코드 구조 개선
        'perf', // 성능 개선
        'docs', // readme, 주석, 문서 파일 수정
        'revert', // 이전 커밋으로 복구
        'ci', // ci/cd 설정 변경
        'test', // 테스트 코드 추가/변경
      ],
    ],
  },
}
