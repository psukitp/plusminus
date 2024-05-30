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

export type IncomesLastMonthes = {
    monthes: string[]
    values: number[]
}

export type IncomesThisMonth = {
    incomesTotal: number
    incomesDiff: number
}