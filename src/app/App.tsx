import './App.css'
import { useEffect, useState } from 'react'
import { ReviewPage } from '@pages/review'
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import { isBrowser, isMobile } from 'react-device-detect'
import { StyledComponentProps } from '@shared/lib/styles/theme-light'
import { useAuth, useUser } from '@features/auth/model'
import { ActiveCaption } from '@shared/ui/sider/types'
import { Loader, MobileMenu, Sider } from '@shared/ui'
import { LazyComponent } from '@shared/lib'
import { AuthPage } from '@pages/auth'
import { RegisterPage } from '@pages/register'
import ExpensesPageDataContainer from '@pages/expenses/ui/ExpensesPageDataContainer'
import IncomesPageDataContainer from '@pages/incomes/ui/IncomesPageDataContainer'
import { CategoriesPageDataContainer } from '@pages/categories/ui'
import { ProfilePage } from '@pages/profile'
import { SettingsPage } from '@pages/settings'

const initialActiveCaption: ActiveCaption = {
  categories: false,
  expenses: false,
  incomes: false,
  review: false,
  profile: false,
  settings: false
}

const AppContainer = ({ className }: { className?: string }) => {
  const [activeCaption, setActiveCaption] = useState<ActiveCaption>({
    ...initialActiveCaption,
    review: true
  })

  const user = useUser(state => state.data)
  const loading = useUser(state => state.loading)
  const { onCheck } = useAuth()

  useEffect(() => {
    onCheck()
  }, [])

  const onChangeActiveCaption = (value: Partial<ActiveCaption>) => {
    setActiveCaption({
      ...initialActiveCaption,
      ...value
    })
  }

  return (
    <div className={className}>
      {loading ? (
        <div className='fullscreen_loader'>
          <Loader fontSize={50} />
        </div>
      ) : (
        <>

          {!!user.id && isBrowser && (<Sider
            activeCaption={activeCaption}
            setActiveButton={(value: Partial<ActiveCaption>) => onChangeActiveCaption(value)}
          />
          )}
          {!!user.id && isMobile && (<MobileMenu
            activeCaption={activeCaption}
            setActiveButton={(value: Partial<ActiveCaption>) => onChangeActiveCaption(value)}
          />
          )}
          <Routes>
            <Route path='/auth' element={<LazyComponent component={<AuthPage />} />} />
            <Route path='/register' element={<LazyComponent component={<RegisterPage />} />} />
            <Route path='/review' element={<LazyComponent component={<ReviewPage />} />} />
            <Route path='/expenses' element={<LazyComponent component={<ExpensesPageDataContainer />} />} />
            <Route path='/incomes' element={<LazyComponent component={<IncomesPageDataContainer />} />} />
            <Route path='/categories' element={<LazyComponent component={<CategoriesPageDataContainer />} />} />
            <Route path='/profile' element={<LazyComponent component={<ProfilePage />} />} />
            <Route path='/settings' element={<LazyComponent component={<SettingsPage />} />} />
          </Routes>
        </>
      )}
    </div>
  )
}

//TODO разобраться со шрифтом
const App = styled(AppContainer) <StyledComponentProps>`
  background: ${({ theme }) => theme.colors.backgroundComponent.default};
      color: ${({ theme }) => theme.colors.textColor.default};
      padding-bottom: ${isMobile
    ? '70px'
    : '0'};


      position: relative;
      height: 100%;
      display: flex;

      .fullscreen_loader{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
      }
`

export default App
