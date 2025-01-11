import { GridElement } from './types'

export const generateGrid = (isMobile: boolean): GridElement[] => {
  return [
    {
      startrow: 1,
      startcol: 1,
      endrow: 2,
      endcol: 2,
    },
    {
      startrow: isMobile ? 2 : 1,
      startcol: isMobile ? 1 : 2,
      endrow: isMobile ? 3 : 2,
      endcol: isMobile ? 2 : 3,
    },
    {
      startrow: isMobile ? 3 : 1,
      startcol: isMobile ? 1 : 3,
      endrow: isMobile ? 4 : 2,
      endcol: isMobile ? 2 : 4,
    },
    {
      startrow: isMobile ? 4 : 1,
      startcol: isMobile ? 1 : 4,
      endrow: isMobile ? 4 : 2,
      endcol: isMobile ? 2 : 5,
    },
    {
      startrow: isMobile ? 5 : 2,
      startcol: isMobile ? 1 : 1,
      endrow: isMobile ? 10 : 6,
      endcol: isMobile ? 2 : 3,
    },
    {
      startrow: isMobile ? 10 : 2,
      startcol: isMobile ? 1 : 3,
      endrow: isMobile ? 12 : 3,
      endcol: isMobile ? 2 : 5,
    },
    {
      startrow: isMobile ? 12 : 3,
      startcol: isMobile ? 1 : 3,
      endrow: isMobile ? 15 : 6,
      endcol: isMobile ? 2 : 5,
    },
  ]
}
