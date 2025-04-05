import { ExpensesRecord } from '@entities/expense'
import { IncomesRecord } from '@entities/income'
import { RecordType } from '@shared/ui'
import dayjs from 'dayjs'

export const sortByDates = (a: RecordType, b: RecordType) => {
  const [aDay, aMonth] = a.group.split('.')
  const [bDay, bMonth] = b.group.split('.')

  const aDate = dayjs().set('date', +aDay).set('month', +aMonth)
  const bDate = dayjs().set('date', +bDay).set('month', +bMonth)
  return aDate.isAfter(bDate) ? -1 : 1
}

export const getListRecords = (
  expenses: ExpensesRecord[] | IncomesRecord[],
) => {
  return Object.values(
    expenses.reduce<{ [key: string]: RecordType }>((acc, item) => {
      const { date } = item
      const index = dayjs(date).format('DD.MM')
      if (!acc[index]) {
        acc[index] = { group: index, data: [] }
      }
      const {
        amount,
        categoryColor: color,
        categoryName: title,
        id: key,
      } = item
      acc[index].data.push({
        title,
        color,
        value: `- ${amount}`,
        suffix: 'Р',
        key,
      })
      return acc
    }, {}),
  )
}
