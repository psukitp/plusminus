export type IncomesRecord = {
    id: number
    date: Date | string
    categoryId: number
    amount: number
}

export type IncomesByCategoryRecord = {
    categoryName: string
    amount: number
    color: string
}