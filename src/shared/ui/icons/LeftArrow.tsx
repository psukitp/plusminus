import { FC } from 'react'
import { IconProps } from './types'

export const LeftArrow: FC<IconProps> = ({
  className,
  height = 11,
  width = 7,
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 7 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.18311 1.675L2.35811 5.5L6.18311 9.325L4.99977 10.5L-0.000227928 5.5L4.99977 0.5L6.18311 1.675Z"
      fill="currentColor"
    />
  </svg>
)
