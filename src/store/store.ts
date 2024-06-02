import { create } from 'zustand'
import { AuthResponseData } from '@components/auth/types'
import { Category } from '@common/types'
import { Key } from 'react'
import { expensesCategoriesQueries } from '@api/queries/expenses-categories-queries'
import { incomesCategoriesQueries } from '@api/queries/incomes-categories-queries'

interface IUseAuth {
    data: AuthResponseData
    setUserData: (userData: AuthResponseData) => void
}

interface IExpensesCategoriesData {
    data: Category[]
    isDataFetched: boolean
    loading: boolean

    fetchData: () => Promise<void>
    setCategories: (data: Category[]) => void
    deleteCategory: (id: Key) => void
    editCategory: (data: Category) => void
    addCategory: (data: Category) => void
}

interface IIncomesCategoriesData {
    data: Category[]
    isDataFetched: boolean
    loading: boolean

    fetchData: () => Promise<void>
    setCategories: (data: Category[]) => void
    deleteCategory: (id: Key) => void
    editCategory: (data: Category) => void
    addCategory: (data: Category) => void
}

export const useUser = create<IUseAuth>(set => ({
    data: {
        id: null,
        name: '',
        secondName: '',
        login: '',
        phone: '',
        email: ''
    },
    setUserData: (userData: AuthResponseData) => set({
        data: { ...userData }
    })
}))

export const useExpensesCategoriesData = create<IExpensesCategoriesData>(set => ({
    data: [],
    isDataFetched: false,
    loading: false,
    fetchData: async () => {
        set({ loading: true })
        const result = await expensesCategoriesQueries.fetchExpensesCategories()
        set({ data: result, loading: false, isDataFetched: true })
    },
    setCategories: (categories) => set({
        data: [...categories]
    }),
    deleteCategory: (id) => set((state) => ({
        data: state.data.filter(c => c.id !== id)
    })),
    editCategory: (category) => set((state) => ({
        data: state.data.map(c => c.id === category.id ? { ...category } : c)
    })),
    addCategory: (category) => set((state) => ({
        data: [...state.data, category]
    }))
}))

export const useIncomesCategoriesData = create<IIncomesCategoriesData>(set => ({
    data: [],
    isDataFetched: false,
    loading: false,
    fetchData: async () => {
        set({ loading: true })
        const result = await incomesCategoriesQueries.fetchIncomesCategories()
        set({ data: result, loading: false, isDataFetched: true })
    },
    setCategories: (categories) => set({
        data: [...categories]
    }),
    deleteCategory: (id) => set((state) => ({
        data: state.data.filter(c => c.id !== id)
    })),
    editCategory: (category) => set((state) => ({
        data: state.data.map(c => c.id === category.id ? { ...category } : c)
    })),
    addCategory: (category) => set((state) => ({
        data: [...state.data, category]
    }))
}))