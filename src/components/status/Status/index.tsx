import Cloud from '@/assets/status/cloud.svg'
import SmallPlane from '@/assets/status/small-plane.svg'
import Status404 from '@/assets/status/status-404.svg'
import Status500 from '@/assets/status/status-500.svg'

interface StatusProps {
  statusCode: 'not-found' | 'error'
}

export default function Status({ statusCode }: StatusProps) {
  const statusStyle = 'float-down-and-up position-centered-x position-centered-y absolute z-1'
  const textStyle = 'effect-name fade-name head3 text-center leading-8 -mt-5'

  return (
    <section>
      <div className="border-gray-10 relative h-100">
        <Cloud className="float-up-and-down absolute -left-20 z-0" />
        {statusCode === 'not-found' ? (
          <Status404 className={statusStyle} />
        ) : (
          <Status500 className={statusStyle} />
        )}
        <SmallPlane className="float-up-and-down absolute top-10 right-5 z-1" />
        <Cloud className="float-up-and-down absolute -right-20 bottom-5 z-2" />
      </div>
      {statusCode === 'not-found' ? (
        <p className={textStyle}>
          찾고 계신{' '}
          <span className="text-purple-500">
            페이지가
            <br />
            하늘 어딘가로{' '}
          </span>
          날아가버렸어요
        </p>
      ) : (
        <p className={textStyle}>
          구름 속에서 <span className="text-purple-500">길을 잃었어요</span>
          <br />
          잠시 후 다시 시도해주세요
        </p>
      )}
    </section>
  )
}
