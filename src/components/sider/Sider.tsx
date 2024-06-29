import { SiderButton } from '@components/common/buttons'
import { ISiderProps } from './types'
import { BarChartOutlined, MinusSquareOutlined, PlusSquareOutlined, SettingOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { SiderBottom, SiderBottomButton, SiderContainer, SiderMain } from './Sider-styled'

export const Sider = ({ activeCaption, setActiveButton }: ISiderProps) => {


    return <SiderContainer>
        <SiderMain>
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
        </SiderMain>
        <SiderBottom>
            <Link to='/profile'>
                <SiderBottomButton
                    active={activeCaption.profile}
                    onClick={() => setActiveButton({
                        profile: true
                    })}>
                    <UserOutlined />
                </SiderBottomButton>
            </Link>
            <Link to='/settings' className='settings-link'>
                <SiderBottomButton
                    active={activeCaption.settings}
                    onClick={() => setActiveButton({
                        settings: true
                    })}>
                    <SettingOutlined />
                </SiderBottomButton>
            </Link>
        </SiderBottom>
    </SiderContainer>
}