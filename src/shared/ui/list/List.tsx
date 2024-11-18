import { ReactNode } from 'react'
import styled from 'styled-components'

type RecordType = {
  prefix?: ReactNode
  title: string
  suffix?: ReactNode
  color?: string
}

export const ListComponent = ({
  records,
  className,
}: {
  records: RecordType[]
  className?: string
}) => {
  return (
    <div className={className}>
      {records.map((r) => (
        <Record color={r?.color}>
          <span className="title">{r.title}</span> <span>{r?.suffix}</span>
        </Record>
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
