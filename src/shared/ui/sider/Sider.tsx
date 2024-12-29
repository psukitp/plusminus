import { SiderButton } from '../sider-button'
import { ISiderProps } from './types'
import {
  CategoriesIcon,
  ExitIcon,
  ExpensesIcon,
  IncomesIcon,
  ReviewIcon,
  SettingsIcon,
} from '../icons'
import { LogoWithText } from '@shared/lib/svgs/logo_w_text'
import { Button } from '../components'

export const SiderComponent = ({
  activeCaption,
  className,

  onLogout,
  setActiveButton,
}: ISiderProps) => {
  return (
    <div className={className}>
      <div className="header">
        <LogoWithText />
      </div>
      <div className="main">
        <SiderButton
          active={activeCaption.review}
          text="Обзор"
          linkTo="review"
          icon={<ReviewIcon />}
          onClick={() =>
            setActiveButton({
              review: true,
            })
          }
        />
        <SiderButton
          active={activeCaption.expenses}
          text="Расходы"
          linkTo="expenses"
          icon={<ExpensesIcon />}
          onClick={() =>
            setActiveButton({
              expenses: true,
            })
          }
        />
        <SiderButton
          active={activeCaption.incomes}
          text="Доходы"
          linkTo="incomes"
          icon={<IncomesIcon />}
          onClick={() =>
            setActiveButton({
              incomes: true,
            })
          }
        />
        <SiderButton
          active={activeCaption.categories}
          text="Категории"
          linkTo="categories"
          icon={<CategoriesIcon />}
          onClick={() =>
            setActiveButton({
              categories: true,
            })
          }
        />
      </div>
      <div className="bottom">
        <SiderButton
          linkTo="settings"
          active={activeCaption.settings}
          text="Настройки"
          icon={<SettingsIcon />}
          onClick={() =>
            setActiveButton({
              settings: true,
            })
          }
        />
        <Button onClick={onLogout} type="secondary" icon={<ExitIcon />}>
          Выйти
        </Button>
      </div>
    </div>
  )
}
