import { useState } from 'react'
import './App.less'
import { ReviewPage } from './components/review/review-page'
import { Sider } from './components/sider'
import { ActiveCaption } from './components/sider/types'

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
    <div style={{ height: '100%', display: 'flex' }}>
      <Sider activeCaption={activeCaption} setActiveButton={(value: Partial<ActiveCaption>) => onChangeActiveCaption(value)} />
      {activeCaption.review && <ReviewPage />}
    </div>
  )
}

export default App
