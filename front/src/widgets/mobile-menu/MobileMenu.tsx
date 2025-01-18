import { SiderButton } from '@shared/ui/sider-button'
import { IMenuProps } from './types'
import {
  CategoriesIcon,
  ExpensesIcon,
  IncomesIcon,
  ReviewIcon,
} from '@shared/ui/icons'
import { AddRecordButton } from './AddRecordButton'

export const MobileMenuComponent = ({
  activeCaption,
  className,
  setActiveButton,
}: IMenuProps) => {
  return (
    <div className={className}>
      <div className="buttons">
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
        <AddRecordButton onAdd={setActiveButton} />
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
      </div>
    </div>
  )
}
