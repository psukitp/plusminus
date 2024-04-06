import { IMonthButtonProps } from "./types"

import './MonthButton.less'

export const MonthButton = ({ month, year, onClick }: IMonthButtonProps) => {
    return <button onClick={onClick} className='month-btn'>
        {month} {year}
    </button>
}