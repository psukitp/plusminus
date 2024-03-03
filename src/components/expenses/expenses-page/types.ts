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