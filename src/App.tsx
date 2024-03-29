import { useState } from 'react'
import './App.less'
import { ReviewPage } from './components/review/review-page'
import { Sider } from './components/sider'
import { ActiveCaption } from './components/sider/types'
import { ExpensesPage } from './components/expenses/expenses-page'
import { IncomesPage } from './components/incomes/incomes-page'

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

  const onChangeActiveCaption = (value: Partial<ActiveCaption>) => {
    setActiveCaption({
      ...initialActiveCaption,
      ...value
    })
  }

  return (
    <div style={{ height: '100%', display: 'flex', background: 'linear-gradient(135deg, #f7f8fa 0%, #e6e7ed 100%)' }}>
      <Sider activeCaption={activeCaption} setActiveButton={(value: Partial<ActiveCaption>) => onChangeActiveCaption(value)} />
      {activeCaption.review && <ReviewPage />}
      {activeCaption.expenses && <ExpensesPage />}
      {activeCaption.incomes && <IncomesPage />}
    </div>
  )
}

export default App
