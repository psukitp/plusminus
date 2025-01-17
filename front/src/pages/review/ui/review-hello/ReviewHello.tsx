import { useUser } from '@entities/user'
import { IReviewHelloProps } from './types'
import { useMemo } from 'react'

export const ReviewHelloComponent = ({
  className,
  dates,
}: IReviewHelloProps) => {
  const name = useUser((state) => state.data.name)

  const text = useMemo(() => {
    const [start, end] = dates
    const dayDiff = end.diff(start, 'day')
    if (dayDiff > 27 && dayDiff < 32)
      return 'Вот твоя статистика за текущий месяц'
    if (dayDiff > 5 && dayDiff < 8)
      return 'Вот твоя статистика за текущую неделю'
    if (dayDiff > 363 && dayDiff < 368)
      return 'Вот твоя статистика за текущий год'

    return 'Вот твоя статистика за период'
  }, [dates])

  return (
    <div className={className}>
      <div>
        <div className="hello">Привет, {name}!</div>
        <div className="description">{text}:</div>
      </div>
    </div>
  )
}
