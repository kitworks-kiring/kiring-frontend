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
        <p className="text-[11px] text-gray-400">© 2025 Daybit Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}
