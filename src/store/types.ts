import { AuthResponseData } from '@components/auth/types'
import { Category } from '@common/types'
import { Key } from 'react'
import { ExpensesByCategoryRecord, ExpensesRecord } from '@components/expenses/expenses-page/types'
import { IncomesByCategoryRecord, IncomesRecord } from '@components/incomes/incomes-page/types'

export interface IUseAuth {
    loading: boolean
    data: AuthResponseData
    setUserData: (userData: AuthResponseData) => void
    setLoading: (val: boolean) => void
}

export interface IExpensesCategoriesData {
    data: Category[]
    isDataFetched: boolean
    loading: boolean

    fetchData: () => Promise<void>
    setCategories: (data: Category[]) => void
    deleteCategory: (id: Key) => void
    editCategory: (data: Category) => void
    addCategory: (data: Category) => void
}

export interface IIncomesCategoriesData {
    data: Category[]
    isDataFetched: boolean
    loading: boolean

    fetchData: () => Promise<void>
    setCategories: (data: Category[]) => void
    deleteCategory: (id: Key) => void
    editCategory: (data: Category) => void
    addCategory: (data: Category) => void
}

export interface ISummarizedExpensesData {
    data: ExpensesByCategoryRecord[]
    isDataFetched: boolean
    loading: boolean
    fetchData: (date: string) => void
    editExpense: (prevExpense: ExpensesRecord, newExpense: ExpensesRecord) => void
    deleteExpense: (expense: Pick<ExpensesRecord, "id" | "amount" | "categoryId">) => void
}

export interface ISummarizedIncomesData {
    data: IncomesByCategoryRecord[]
    isDataFetched: boolean
    loading: boolean
    fetchData: (date: string) => void
    editIncome: (prevExpense: IncomesRecord, newExpense: IncomesRecord) => void
    deleteIncome: (expense: Pick<IncomesRecord, "id" | "amount" | "categoryId">) => void
}
