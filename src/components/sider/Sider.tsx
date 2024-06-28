import { SiderButton } from '@components/common/buttons'
import { ISiderProps } from './types'
import './Sider.less'
import { BarChartOutlined, MinusSquareOutlined, PlusSquareOutlined, SettingOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const Sider = ({ activeCaption, setActiveButton }: ISiderProps) => {


    return <div className='sider'>
        <div className='sider-main'>
            <SiderButton
                active={activeCaption.review}
                text="Обзор"
                linkTo='review'
                icon={<BarChartOutlined />}
                onClick={() => setActiveButton({
                    review: true
                })} />
            <SiderButton
                active={activeCaption.expenses}
                text="Расходы"
                linkTo='expenses'
                icon={<MinusSquareOutlined />}
                onClick={() => setActiveButton({
                    expenses: true
                })} />
            <SiderButton
                active={activeCaption.incomes}
                text="Доходы"
                linkTo='incomes'
                icon={<PlusSquareOutlined />}
                onClick={() => setActiveButton({
                    incomes: true
                })} />
            <SiderButton
                active={activeCaption.categories}
                text="Категории"
                linkTo='categories'
                icon={<UnorderedListOutlined />}
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
                    <UserOutlined />
                </button>
            </Link>
            <Link to='/settings' className='settings-link'>
                <button
                    className={`sider-settings ${activeCaption.settings ? 'on' : ''}`}
                    onClick={() => setActiveButton({
                        settings: true
                    })}>
                    <SettingOutlined />
                </button>
            </Link>
        </div>
    </div>
}