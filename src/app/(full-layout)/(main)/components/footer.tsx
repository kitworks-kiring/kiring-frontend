export default function Footer() {
  return (
    <footer className="w-full bg-white py-6 text-left text-xs text-gray-500">
      <div className="body5 mx-auto max-w-screen-md space-y-1 px-4">
        <p className="body4-sb text-gray-600">
          <a
            href="https://kitworks.notion.site/kiring-privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            개인정보처리방침
          </a>
          <span className="px-2 text-gray-300">|</span>
          <a
            href="https://kitworks.notion.site/kiring-terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
          >
            서비스 이용약관
          </a>
        </p>
        <p>상호: 데이빗(주) | 대표자: 양다윗 | 사업자등록번호: 108-21-93720</p>
        <p>주소: 서울특별시 영등포구 선유서로34길 11-2 (양평동3가)</p>
        <p>이메일: didekdnlt1996@gmail.com</p>
        <p className="pt-2 text-[11px] text-gray-400">© 2025 Daybit Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}
