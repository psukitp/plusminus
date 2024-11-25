import styled from 'styled-components'
import { RecordType } from './types'
import { Loader } from '../loader'
import { Fragment, useMemo } from 'react'

export const ListComponent = ({
  records,
  className,
  loading,
  sort = null,
}: {
  records: RecordType[]
  loading?: boolean
  className?: string
  sort?: 'asc' | 'desc' | null
}) => {
  const sortedRecords = useMemo(() => {
    if (!sort) return records
    return records.sort((a, b) =>
      sort === 'asc'
        ? a.group.localeCompare(b.group)
        : b.group.localeCompare(a.group),
    )
  }, [records, sort])

  return loading ? (
    <Loader />
  ) : (
    <div className={className}>
      {sortedRecords.map((r) => (
        <Fragment key={r.group}>
          <div className="group">{r.group}</div>
          {r.data.map((el) => (
            <Record color={el?.color} key={el.key}>
              <span className="title">{el.title}</span>{' '}
              <span>{el?.suffix}</span>
            </Record>
          ))}
        </Fragment>
      ))}
    </div>
  )
}

const Record = styled.div<Partial<RecordType>>`
  padding: 12px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.pallete.dom.white};
    border-radius: 8px;
  }

  .title {
    color: ${({ color }) => color ?? '#000'};
  }
`
