export type ActiveCaption = {
  review: boolean
  expenses: boolean
  incomes: boolean
  categories: boolean
  profile: boolean
  settings: boolean
}

export interface ISiderProps {
  activeCaption: ActiveCaption
  setActiveButton: (value: Partial<ActiveCaption>) => void
}
