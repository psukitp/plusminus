import { GridElement } from './types'

export const generateGrid = (isMobile: boolean): GridElement[] => {
  return isMobile
    ? [
        {
          startrow: 1,
          startcol: 1,
          endrow: 2,
          endcol: 2,
        },
        {
          startrow: 1,
          startcol: 2,
          endrow: 2,
          endcol: 3,
        },
        {
          startrow: 2,
          startcol: 1,
          endrow: 3,
          endcol: 2,
        },
        {
          startrow: 2,
          startcol: 2,
          endrow: 3,
          endcol: 3,
        },
        {
          startrow: 3,
          startcol: 1,
          endrow: 8,
          endcol: 3,
        },
        {
          startrow: 8,
          startcol: 1,
          endrow: 10,
          endcol: 3,
        },
        {
          startrow: 10,
          startcol: 1,
          endrow: 15,
          endcol: 3,
        },
      ]
    : [
        {
          startrow: 1,
          startcol: 1,
          endrow: 2,
          endcol: 2,
        },
        {
          startrow: 1,
          startcol: 2,
          endrow: 2,
          endcol: 3,
        },
        {
          startrow: 1,
          startcol: 3,
          endrow: 2,
          endcol: 4,
        },
        {
          startrow: 1,
          startcol: 4,
          endrow: 2,
          endcol: 5,
        },
        {
          startrow: 2,
          startcol: 1,
          endrow: 6,
          endcol: 3,
        },
        {
          startrow: 2,
          startcol: 3,
          endrow: 3,
          endcol: 5,
        },
        {
          startrow: 3,
          startcol: 3,
          endrow: 6,
          endcol: 5,
        },
      ]
}
