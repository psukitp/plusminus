import { Category } from '@entities/category'
import { IncomesByCategoryRecord, IncomesRecord } from '@entities/income/model'
import { NewRecord, ModalRecordInfo } from '@features/category'
import { ColumnsType } from 'antd/es/table'

export interface IIncomesPageProps {
  currentDate: string
  columns: ColumnsType<IncomesRecord>
  records: IncomesRecord[]
  modalInfo: ModalRecordInfo
  recordsLoading: boolean
  summarizedRecords: IncomesByCategoryRecord[]
  summarizedColumns: ColumnsType<IncomesByCategoryRecord>
  categories: Category[]
  mode: 'create' | 'edit'
  categoriesLoading: boolean
  summarizedRecordsLoading: boolean
  viewModal: boolean

  setModalInfo: React.Dispatch<React.SetStateAction<ModalRecordInfo>>
  queriesOnCreate: (data: NewRecord) => Promise<void>
  editIncome: (income: {
    amount: number | null
    categoryId: React.Key | null
    id: React.Key | null
  }) => void
  getIncomes: (date: string) => void
  getIncomesByCategories: (date: string) => void
  setCurrentDate: React.Dispatch<React.SetStateAction<string>>
  setMode: React.Dispatch<React.SetStateAction<'create' | 'edit'>>
  setViewModal: React.Dispatch<React.SetStateAction<boolean>>
}
