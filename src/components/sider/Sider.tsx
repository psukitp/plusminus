import { useState } from 'react'
import { SiderButton } from '../buttons'
import { ActiveButton } from './types'
import './Sider.less'

const initialActiveButton: ActiveButton = {
    categories: false,
    expenses: false,
    incomes: false,
    review: false,
    profile: false,
    settings: false
}

export const Sider = () => {
    const [activeButton, setActiveButton] = useState<ActiveButton>({
        ...initialActiveButton,
        review: true
    })

    return <div className='sider'>
        <div className='sider-main'>
            <SiderButton
                active={activeButton.review}
                text="Обзор"
                onClick={() => setActiveButton({
                    ...initialActiveButton,
                    review: true
                })} />
            <SiderButton
                active={activeButton.expenses}
                text="Расходы"
                onClick={() => setActiveButton({
                    ...initialActiveButton,
                    expenses: true
                })} />
            <SiderButton
                active={activeButton.incomes}
                text="Доходы"
                onClick={() => setActiveButton({
                    ...initialActiveButton,
                    incomes: true
                })} />
            <SiderButton
                active={activeButton.categories}
                text="Категории"
                onClick={() => setActiveButton({
                    ...initialActiveButton,
                    categories: true
                })} />
        </div>
        <div className='sider-bottom'>
            <button
                className='sider-profile'
                onClick={() => setActiveButton({
                    ...initialActiveButton,
                    profile: true
                })}>
                Профиль
            </button>
            <button
                className='sider-settings'
                onClick={() => setActiveButton({
                    ...initialActiveButton,
                    settings: true
                })}>

            </button>
        </div>
    </div>
}