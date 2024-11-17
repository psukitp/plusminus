import { useUser } from '@entities/user'
import { IReviewHelloProps } from './types'

export const ReviewHelloComponent = ({ className }: IReviewHelloProps) => {
  const name = useUser((state) => state.data.name)
  return (
    <div className={className}>
      <div>
        <div className="hello">Привет, {name}!</div>
        <div className="description">Вот твоя статистика за текущий месяц:</div>
      </div>
    </div>
  )
}
