import Effect from '@/assets/welcome/effect.svg'
import Square from '@/assets/welcome/square.svg'
import Star from '@/assets/welcome/star.svg'
import Twinkle from '@/assets/welcome/twinkle.svg'

export default function WelcomeEffectGroup() {
  return (
    <>
      <div className="effect-effect fade-scale-effect absolute top-1/2 left-1/2 z-0 h-90 w-90 -translate-x-27/50 -translate-y-28/50">
        <Effect />
      </div>
      <div className="effect-icon float-star absolute top-58 right-16 -translate-x-1/2">
        <Star />
      </div>
      <div className="effect-icon float-square absolute bottom-60 left-3">
        <Square />
      </div>
      <div className="effect-icon float-twinkle absolute right-3 bottom-82">
        <Twinkle />
      </div>
    </>
  )
}
