import styled from "styled-components"

interface GridElement {
    startRow: number
    startCol: number
    endRow: number
    endCol: number
}

export const ReviewContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 15px;
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  `

export const WidgetContainer = styled.div<GridElement>`
    grid-row-start: ${({ startRow }) => startRow};
    grid-column-start: ${({ startCol }) => startCol};
    grid-row-end: ${({ endRow }) => endRow};
    grid-column-end: ${({ endCol }) => endCol};
  `