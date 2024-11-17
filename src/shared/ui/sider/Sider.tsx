import { SiderButton } from '../sider-button/SiderButton'
import { ISiderProps } from './types'
import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { SiderBottomButton } from './Sider-styled'
import { CategoriesIcon, ExpensesIcon, IncomesIcon, ReviewIcon } from '../icons'

export const SiderComponent = ({
  activeCaption,
  setActiveButton,
  className,
}: ISiderProps) => {
  return (
    <div className={className}>
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
        <Link to="/profile">
          <SiderBottomButton
            active={activeCaption.profile}
            onClick={() =>
              setActiveButton({
                profile: true,
              })
            }
          >
            <UserOutlined />
          </SiderBottomButton>
        </Link>
        <Link to="/settings" className="settings-link">
          <SiderBottomButton
            active={activeCaption.settings}
            onClick={() =>
              setActiveButton({
                settings: true,
              })
            }
          >
            <SettingOutlined />
          </SiderBottomButton>
        </Link>
      </div>
    </div>
  )
}
