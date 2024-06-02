import { SiderButton } from '@components/common/buttons'
import { ISiderProps } from './types'
import './Sider.less'
import { SettingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

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
            <Link to='/profile'>
                <button
                    className={`sider-profile ${activeCaption.profile ? 'on' : ''}`}
                    onClick={() => setActiveButton({
                        profile: true
                    })}>
                    Профиль
                </button>
            </Link>
            <button
                className={`sider-settings ${activeCaption.settings ? 'on' : ''}`}
                onClick={() => setActiveButton({
                    settings: true
                })}>
                <SettingOutlined />
            </button>
        </div>
    </div>
}