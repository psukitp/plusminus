import styled from 'styled-components'
import { ISegmentedProps } from './types'

export const SegmentedComponent = <T,>({
  options,
  className,
  active,

  onClick,
}: ISegmentedProps<T>) => {
  return (
    <div className={className}>
      {options.map((el) => (
        <SegmentedButton
          key={el.id}
          active={el.id === active}
          onClick={() => {
            onClick(el)
          }}
        >
          {el.label}
        </SegmentedButton>
      ))}
    </div>
  )
}

export const SegmentedButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  background-color: ${({ active, theme }) =>
    active ? theme.pallete.dom.white : 'transparent'};
  border-radius: 4px;
  font-weight: 600;

  &:hover {
    outline: ${({ active }) => (active ? 'none' : '1px solid #000')};
  }
`
