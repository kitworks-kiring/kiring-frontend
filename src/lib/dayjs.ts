import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/ko'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('ko')

// 전역 타임존을 KST(한국 표준시)로 설정
dayjs.tz.setDefault('Asia/Seoul')

export default dayjs
