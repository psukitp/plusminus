import { ISmallWidgetProps } from './types'
import { Loader } from '@shared/ui'
import { Widget } from '../widget'
import { PositiveChart, NegativeChart } from '@shared/ui/icons'
import { useMemo } from 'react'

export const SmallWidgetComponent = ({
  text,
  dates,
  additionalText,
  title,
  diff,
  isLoading,
  className,
  type,
  icon,
}: ISmallWidgetProps) => {
  const description = useMemo(() => {
    if (additionalText) return additionalText
    if (!dates) return null

    const dayDiff = dates[1].diff(dates[0], 'day')
    if (dayDiff > 27 && dayDiff < 32) return 'По сравнению с предыдущим месяцем'
    if (dayDiff > 5 && dayDiff < 8) return 'По сравнению с предыдущей неделей'
    if (dayDiff > 363 && dayDiff < 368) return 'По сравнению с предыдущим годом'

    return 'По сравнению с предыдущим периодом'
  }, [dates, additionalText])

  const image = useMemo(() => {
    if (icon) return icon

    if (!!diff) {
      return diff > 0 ? <PositiveChart /> : <NegativeChart />
    }

    return null
  }, [diff, icon])

  return (
    <div className={className}>
      <Widget title={title} needpadding type={type}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="container">
            <div className="text">{text}</div>
            {(diff || description) && (
              <div className="diff">
                <span className="description">{description}</span>
                {/* {image} */}
                <div className="image">{image}</div>
              </div>
            )}
          </div>
        )}
      </Widget>
    </div>
  )
}
