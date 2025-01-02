import { GridElement } from './types'

export const generateGrid = (isMobile: boolean): GridElement[] => {
  return [
    {
      startRow: 1,
      startCol: 1,
      endRow: 2,
      endCol: 2,
    },
    {
      startRow: isMobile ? 2 : 1,
      startCol: isMobile ? 1 : 2,
      endRow: isMobile ? 3 : 2,
      endCol: isMobile ? 2 : 3,
    },
    {
      startRow: isMobile ? 3 : 1,
      startCol: isMobile ? 1 : 3,
      endRow: isMobile ? 4 : 2,
      endCol: isMobile ? 2 : 4,
    },
    {
      startRow: isMobile ? 4 : 1,
      startCol: isMobile ? 1 : 4,
      endRow: isMobile ? 4 : 2,
      endCol: isMobile ? 2 : 5,
    },
    {
      startRow: isMobile ? 5 : 2,
      startCol: isMobile ? 1 : 1,
      endRow: isMobile ? 10 : 6,
      endCol: isMobile ? 2 : 3,
    },
    {
      startRow: isMobile ? 10 : 2,
      startCol: isMobile ? 1 : 3,
      endRow: isMobile ? 12 : 3,
      endCol: isMobile ? 2 : 5,
    },
    {
      startRow: isMobile ? 12 : 3,
      startCol: isMobile ? 1 : 3,
      endRow: isMobile ? 15 : 6,
      endCol: isMobile ? 2 : 5,
    },
  ]
}
