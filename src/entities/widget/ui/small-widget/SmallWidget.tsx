import { ISmallWidgetProps } from './types'
import { Loader } from '@shared/ui'
import { Widget } from '../widget'
import { PositiveChart, NegativeChart } from '@shared/ui/icons'

export const SmallWidgetComponent = ({
  text,
  title,
  diff,
  isLoading,
  className,
  type,
}: ISmallWidgetProps) => {
  return (
    <div className={className}>
      <Widget title={title} needPadding type={type}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="container">
            <div className="text">{text}</div>
            {diff && (
              <div className="diff">
                <span className="diff_value">
                  По сравнению с предыдущим месяцем
                </span>
                {diff > 0 ? <PositiveChart /> : <NegativeChart />}
              </div>
            )}
          </div>
        )}
      </Widget>
    </div>
  )
}
