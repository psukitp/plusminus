import './App.less'
import { useEffect, useState } from 'react'
import { ReviewPage } from '@components/review/review-page'
import { Sider } from '@components/sider'
import { ActiveCaption } from '@components/sider/types'
import { RegisterPage } from '@components/register'
import { AuthPage } from '@components/auth'
import { Routes, Route } from 'react-router-dom'
import { useUser } from '@store'
import { useAuth } from '@hooks'
import { ProfilePage } from '@components/profile/ProfilePage'
import { SettingsPage } from '@components/settings/SettingsPage'
import { IncomesPageDataContainer } from '@components/incomes/incomes-page/IncomesPageDataConteiner'
import { CategoriesPageDataContainer } from '@components/categories/categories-page/CategoriesPageDataContainer'
import { ExpensesPageDataContainer } from '@components/expenses/expenses-page/ExpensesPageDataContainer'
import { Loader } from '@components/common/loaders'
import { ThemeProvider } from 'styled-components'
// import { themeDark } from '@common/theme-dark'
import { AppContainer } from './App-styled'
import { themeLight } from '@common/theme-light'
import { isBrowser, isMobile } from 'react-device-detect'
import { MobileMenu } from '@components/mobile-menu'

const initialActiveCaption: ActiveCaption = {
  categories: false,
  expenses: false,
  incomes: false,
  review: false,
  profile: false,
  settings: false
}

const App = () => {
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
    <ThemeProvider theme={themeLight}>
      <AppContainer>
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
              <Route path='/auth' element={<AuthPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/review' element={<ReviewPage />} />
              <Route path='/expenses' element={<ExpensesPageDataContainer />} />
              <Route path='/incomes' element={<IncomesPageDataContainer />} />
              <Route path='/categories' element={<CategoriesPageDataContainer />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/settings' element={<SettingsPage />} />
            </Routes>
          </>
        )}
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
