import './App.css'
import { useEffect, useState } from 'react'
import { ReviewPage } from '@pages/review'
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import { isBrowser, isMobile } from 'react-device-detect'
import { StyledComponentProps } from '@shared/lib'
import { useAuth, useUser } from '@entities/user'
import { ActiveCaption } from '@shared/ui'
import { Loader, MobileMenu, Sider } from '@shared/ui'
import { LazyComponent } from '@shared/ui'
import { AuthPage } from '@pages/auth'
import { RegisterPage } from '@pages/register'
import { ExpensesPage } from '@pages/expenses'
import { IncomesPage } from '@pages/incomes'
import { CategoriesPage } from '@pages/categories'
import { ProfilePage } from '@pages/profile'
import { SettingsPage } from '@pages/settings'
import { AddCurrencyModal } from '@features/user-info'
import { ResetPasswordPage } from '@pages/reset-password'

const initialActiveCaption: ActiveCaption = {
  categories: false,
  expenses: false,
  incomes: false,
  review: false,
  profile: false,
  settings: false,
}

const AppContainer = ({ className }: { className?: string }) => {
  const [activeCaption, setActiveCaption] = useState<ActiveCaption>({
    ...initialActiveCaption,
    review: true,
  })

  const user = useUser((state) => state.data)
  const loading = useUser((state) => state.loading)
  const { onCheck } = useAuth()

  useEffect(() => {
    onCheck()
  }, [])

  const onChangeActiveCaption = (value: Partial<ActiveCaption>) => {
    setActiveCaption({
      ...initialActiveCaption,
      ...value,
    })
  }

  return (
    <div className={className}>
      {loading ? (
        <div className="fullscreen_loader">
          <Loader fontSize={50} />
        </div>
      ) : (
        <>
          {!!user.id && isBrowser && (
            <Sider
              activeCaption={activeCaption}
              setActiveButton={(value: Partial<ActiveCaption>) =>
                onChangeActiveCaption(value)
              }
            />
          )}
          {!!user.id && isMobile && (
            <MobileMenu
              activeCaption={activeCaption}
              setActiveButton={(value: Partial<ActiveCaption>) =>
                onChangeActiveCaption(value)
              }
            />
          )}
          <Routes>
            <Route
              path="/auth"
              element={<LazyComponent component={<AuthPage />} />}
            />
            <Route
              path="/register"
              element={<LazyComponent component={<RegisterPage />} />}
            />
            <Route
              path="/review"
              element={<LazyComponent component={<ReviewPage />} />}
            />
            <Route
              path="/expenses"
              element={<LazyComponent component={<ExpensesPage />} />}
            />
            <Route
              path="/incomes"
              element={<LazyComponent component={<IncomesPage />} />}
            />
            <Route
              path="/categories"
              element={<LazyComponent component={<CategoriesPage />} />}
            />
            <Route
              path="/profile"
              element={<LazyComponent component={<ProfilePage />} />}
            />
            <Route
              path="/settings"
              element={<LazyComponent component={<SettingsPage />} />}
            />
            <Route path="/reset" element={<LazyComponent component={<ResetPasswordPage />} />} />
          </Routes>

          <AddCurrencyModal
            open={
              (!user?.settings || !user?.settings?.currency) && user.id !== null
            }
          />
        </>
      )}
    </div>
  )
}

//TODO разобраться со шрифтом
const App = styled(AppContainer)<StyledComponentProps>`
  background: ${({ theme }) => theme.colors.backgroundComponent.default};
  color: ${({ theme }) => theme.colors.textColor.default};
  padding-bottom: ${isMobile ? '70px' : '0'};

  position: relative;
  height: 100%;
  display: flex;

  .fullscreen_loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export default App
