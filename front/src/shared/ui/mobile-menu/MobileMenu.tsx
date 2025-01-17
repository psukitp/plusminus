import { SiderButton } from '../sider-button'
import { MobileMenuButtons, MobileMenuContainer } from './MobileMenu-styled'
import { IMenuProps } from './types'
import { CategoriesIcon, ExpensesIcon, IncomesIcon, ReviewIcon } from '../icons'

export const MobileMenu = ({ activeCaption, setActiveButton }: IMenuProps) => {
  return (
    <MobileMenuContainer>
      <MobileMenuButtons>
        <SiderButton
          active={activeCaption.review}
          linkTo="review"
          icon={<ReviewIcon />}
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
          icon={<ExpensesIcon />}
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
          icon={<IncomesIcon />}
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
          icon={<CategoriesIcon />}
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
