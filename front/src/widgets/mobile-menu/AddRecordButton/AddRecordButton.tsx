import { Button } from '@shared/ui'
import { ExpensesIcon, IncomesIcon, PlusIcon } from '@shared/ui/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IAddRecordButtonProps } from './types'

export const AddRecordButtonComponent = ({
  className,
  onAdd,
}: IAddRecordButtonProps) => {
  const [active, setActive] = useState<boolean>(false)
  const navigate = useNavigate()

  const onButtonClick = (path: 'incomes' | 'expenses') => {
    onAdd(path == 'incomes' ? { incomes: true } : { expenses: true })
    setActive(false)
    navigate(path, { state: { create: true } })
  }

  return (
    <div className={className}>
      <div className={`actions ${active ? 'active' : ''}`}>
        <div className="action">
          <Button type="ghost" onClick={() => onButtonClick('incomes')}>
            <IncomesIcon />
          </Button>
        </div>
        <div className="action">
          <Button type="ghost" onClick={() => onButtonClick('expenses')}>
            <ExpensesIcon />
          </Button>
        </div>
      </div>
      <Button
        className={`add ${active ? 'active' : ''}`}
        type="primary"
        onClick={() => setActive((prev) => !prev)}
      >
        <PlusIcon />
      </Button>
    </div>
  )
}
