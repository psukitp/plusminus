import { ExpensesByCategoryRecord } from '@entities/expense'
import { useMemo } from 'react'

export const PieLegendComponent = ({
  className,
  records,
}: {
  className?: string
  records: ExpensesByCategoryRecord[]
}) => {
  const sortedFirts = useMemo<Partial<ExpensesByCategoryRecord>[]>(() => {
    const sorted = records.sort((a, b) => b.amount - a.amount)
    if (sorted.length < 12) return sorted

    const first = sorted.slice(0, 11)
    const remaining = sorted
      .slice(11)
      .reduce((sum, item) => sum + item.amount, 0)

    return [
      ...first,
      {
        amount: remaining,
        categoryName: 'Остальное',
        id: 'remaining-id',
      },
    ]
  }, [records])
  return (
    <div className={className}>
      {sortedFirts.map((r) => (
        <div className="item">
          {r.color && (
            <div
              className="color-indicator"
              style={{ background: r.color }}
            ></div>
          )}
          <div className="info">
            <div className="name">{r.categoryName}</div>
            <div className="amount">{r.amount}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
