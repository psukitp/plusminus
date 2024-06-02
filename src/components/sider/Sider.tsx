import { SiderButton } from '@components/common/buttons'
import { ISiderProps } from './types'
import './Sider.less'

export const Sider = ({ activeCaption, setActiveButton }: ISiderProps) => {


    return <div className='sider'>
        <div className='sider-main'>
            <SiderButton
                active={activeCaption.review}
                text="Обзор"
                linkTo='review'
                onClick={() => setActiveButton({
                    review: true
                })} />
            <SiderButton
                active={activeCaption.expenses}
                text="Расходы"
                linkTo='expenses'
                onClick={() => setActiveButton({
                    expenses: true
                })} />
            <SiderButton
                active={activeCaption.incomes}
                text="Доходы"
                linkTo='incomes'
                onClick={() => setActiveButton({
                    incomes: true
                })} />
            <SiderButton
                active={activeCaption.categories}
                text="Категории"
                linkTo='categories'
                onClick={() => setActiveButton({
                    categories: true
                })} />
        </div>
        <div className='sider-bottom'>
            <button
                className='sider-profile'
                onClick={() => setActiveButton({
                    profile: true
                })}>
                Профиль
            </button>
            <button
                className='sider-settings'
                onClick={() => setActiveButton({
                    settings: true
                })}>
            </button>
        </div>
    </div>
}