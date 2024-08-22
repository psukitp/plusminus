import { GridElement } from "./types"

export const generateGrid = (isMobile: boolean): GridElement[] => {
    return [
        {
            startRow: 1,
            startCol: 1,
            endRow: 2,
            endCol: 2
        },
        {
            startRow: isMobile ? 2 : 1,
            startCol: isMobile ? 1 : 2,
            endRow: isMobile ? 3 : 2,
            endCol: isMobile ? 2 : 3
        },
        {
            startRow: isMobile ? 3 : 1,
            startCol: isMobile ? 1 : 3,
            endRow: isMobile ? 4 : 2,
            endCol: isMobile ? 2 : 4
        },
        {
            startRow: isMobile ? 4 : 1,
            startCol: isMobile ? 1 : 4,
            endRow: isMobile ? 4 : 2,
            endCol: isMobile ? 2 : 5
        },
        {
            startRow: isMobile ? 5 : 2,
            startCol: isMobile ? 1 : 1,
            endRow: isMobile ? 7 : 4,
            endCol: isMobile ? 2 : 3
        },
        {
            startRow: isMobile ? 7 : 2,
            startCol: isMobile ? 1 : 3,
            endRow: isMobile ? 9 : 4,
            endCol: isMobile ? 2 : 5
        },
        {
            startRow: isMobile ? 9 : 4,
            startCol: isMobile ? 1 : 1,
            endRow: isMobile ? 11 : 7,
            endCol: isMobile ? 2 : 5
        },
    ]
}