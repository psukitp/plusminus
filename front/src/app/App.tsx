import './App.css'
import { useEffect, useState } from 'react'
import { ReviewPage } from '@pages/review'
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import { isBrowser, isMobile } from 'react-device-detect'
import { StyledComponentProps } from '@shared/lib'
import { useAuth, useUser } from '@entities/user'
import {
  ActiveCaption,
  Sider,
  LazyComponent,
  Loader,
} from '@shared/ui'
import { AuthPage } from '@pages/auth'
import { RegisterPage } from '@pages/register'
import { ExpensesPage } from '@pages/expenses-new'
import { IncomesPage } from '@pages/incomes'
import { CategoriesPage } from '@pages/categories'
import { ProfilePage } from '@pages/profile'
import { SettingsPage } from '@pages/settings'
import { AddCurrencyModal } from '@features/user-info'
import { ResetPasswordPage } from '@pages/reset-password'
import { Header } from '@widgets/header/ui'
import dayjs, { Dayjs } from 'dayjs'
import { MobileMenu } from '@widgets/mobile-menu'

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

  const [dates, setDates] = useState<[start: Dayjs, end: Dayjs]>([
    dayjs().startOf('month'),
    dayjs(),
  ])

  const user = useUser((state) => state.data)
  const loading = useUser((state) => state.loading)
  const { onCheck, logout } = useAuth()

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
          <Loader size={50} />
        </div>
      ) : (
        <>
          {!!user.id && isBrowser && (
            <Sider
              activeCaption={activeCaption}
              setActiveButton={(value: Partial<ActiveCaption>) =>
                onChangeActiveCaption(value)
              }
              onLogout={logout}
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
          <div className="content">
            {!!user.id && (
              <Header
                showAddExpense={activeCaption.expenses}
                showAddIncome={activeCaption.incomes}
                onChangeDates={setDates}
                showDates={activeCaption.review}
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
                element={
                  <LazyComponent component={<ReviewPage dates={dates} />} />
                }
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
              <Route
                path="/reset"
                element={<LazyComponent component={<ResetPasswordPage />} />}
              />
            </Routes>

            <AddCurrencyModal
              open={
                (!user?.settings || !user?.settings?.currency) &&
                user.id !== null
              }
            />
          </div>
        </>
      )}
    </div>
  )
}

const App = styled(AppContainer) <StyledComponentProps>`
  background: ${({ theme }) => theme.pallete.dom.white};
  color: ${({ theme }) => theme.pallete.content.main};

  position: relative;
  height: 100%;
  display: flex;

  .content {
    width: 100%;
    height: 100%;
    padding-bottom: ${isMobile ? '102px' : '0'};
    display: flex;
    flex-direction: column;
  }

  .fullscreen_loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export default App
