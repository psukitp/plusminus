import { Key } from "react"

export type ExpensesRecord = {
    id: Key
    date: Date | string
    categoryId: Key
    categoryName: string
    amount: number
}

export type ExpensesByCategoryRecord = {
    id: Key
    categoryName: string
    amount: number
    color: string
}

export type ExpensesLastMonthes = {
    monthes: string[]
    values: number[]
}

export type ExpensesThisMonth = {
    expensesTotal: number
    expensesDiff: number
}