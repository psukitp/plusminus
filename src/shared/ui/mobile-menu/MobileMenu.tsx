import {
  BarChartOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { SiderButton } from '../sider-button'
import { MobileMenuButtons, MobileMenuContainer } from './MobileMenu-styled'
import { IMenuProps } from './types'

export const MobileMenu = ({ activeCaption, setActiveButton }: IMenuProps) => {
  return (
    <MobileMenuContainer>
      <MobileMenuButtons>
        <SiderButton
          active={activeCaption.review}
          linkTo="review"
          icon={<BarChartOutlined />}
          type="mobile"
          onClick={() =>
            setActiveButton({
              review: true,
            })
          }
        />
        <SiderButton
          active={activeCaption.expenses}
          linkTo="expenses"
          icon={<MinusSquareOutlined />}
          type="mobile"
          onClick={() =>
            setActiveButton({
              expenses: true,
            })
          }
        />
        <SiderButton
          active={activeCaption.incomes}
          linkTo="incomes"
          icon={<PlusSquareOutlined />}
          type="mobile"
          onClick={() =>
            setActiveButton({
              incomes: true,
            })
          }
        />
        <SiderButton
          active={activeCaption.categories}
          linkTo="categories"
          icon={<UnorderedListOutlined />}
          type="mobile"
          onClick={() =>
            setActiveButton({
              categories: true,
            })
          }
        />
      </MobileMenuButtons>
    </MobileMenuContainer>
  )
}
