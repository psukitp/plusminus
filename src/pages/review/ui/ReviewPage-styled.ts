import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import { GridElement } from './types'

export const ReviewContainer = styled.div`
  background: ${isMobile
    ? ({ theme }) => theme.colors.backgroundComponent.default
    : 'unset'};

  padding: ${`15px 15px 
    ${isMobile ? '80px' : '15px'}
     15px`};

  overflow: auto;
  width: 100%;
`

export const ReviewGrid = styled.div`
  grid-template-rows: ${isMobile ? 'repeat(10, 1fr)' : 'repeat(6, 1fr)'};
  grid-template-columns: ${isMobile ? '1fr' : 'repeat(4, 1fr)'};
  display: grid;
  gap: 10px;
  height: ${isMobile ? '1500px' : 'calc(100% - 70px)'};
`

export const WidgetContainer = styled.div<GridElement>`
  grid-row-start: ${({ startRow }) => startRow};
  grid-column-start: ${({ startCol }) => startCol};
  grid-row-end: ${({ endRow }) => endRow};
  grid-column-end: ${({ endCol }) => endCol};
`
