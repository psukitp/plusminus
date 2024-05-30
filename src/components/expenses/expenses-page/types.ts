export type ExpensesRecord = {
    id: number
    date: Date | string
    categoryName: string
    amount: number
}

export type ExpensesByCategoryRecord = {
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