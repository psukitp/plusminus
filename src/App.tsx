import './App.less'
import { useEffect, useState } from 'react'
import { ReviewPage } from '@components/review/review-page'
import { Sider } from '@components/sider'
import { ActiveCaption } from '@components/sider/types'
import { ExpensesPage } from '@components/expenses/expenses-page'
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
    <div style={{ height: '100%', display: 'flex', background: 'linear-gradient(135deg, #f7f8fa 0%, #e6e7ed 100%)' }}>
      {!!user.id && <Sider
        activeCaption={activeCaption}
        setActiveButton={(value: Partial<ActiveCaption>) => onChangeActiveCaption(value)} />}
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
    </div>
  )
}

export default App
