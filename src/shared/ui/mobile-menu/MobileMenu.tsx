import { BarChartOutlined, MinusSquareOutlined, PlusSquareOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { SiderButton } from "../sider-button/SiderButton"
import { MobileMenuButtons, MobileMenuContainer } from "./MobileMenu-styled"
import { IMenuProps } from "./types"

export const MobileMenu = ({ activeCaption, setActiveButton }: IMenuProps) => {
    return <MobileMenuContainer>
        <MobileMenuButtons>
            <SiderButton
                active={activeCaption.review}
                linkTo='review'
                icon={<BarChartOutlined />}
                onClick={() => setActiveButton({
                    review: true
                })} />
            <SiderButton
                active={activeCaption.expenses}
                linkTo='expenses'
                icon={<MinusSquareOutlined />}
                onClick={() => setActiveButton({
                    expenses: true
                })} />
            <SiderButton
                active={activeCaption.incomes}
                linkTo='incomes'
                icon={<PlusSquareOutlined />}
                onClick={() => setActiveButton({
                    incomes: true
                })} />
            <SiderButton
                active={activeCaption.categories}
                linkTo='categories'
                icon={<UnorderedListOutlined />}
                onClick={() => setActiveButton({
                    categories: true
                })} />
        </MobileMenuButtons>
    </MobileMenuContainer>
}