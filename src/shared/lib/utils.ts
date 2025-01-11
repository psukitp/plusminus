export const getFormattedAmount = (amount: number | string) => {
  if (!amount) return 0
  const stringAmount = amount.toString()
  const [integerPart, decimalPart] = stringAmount.split(/[.,]/)
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  const truncatedDecimalPart = decimalPart ? decimalPart.slice(0, 2) : ''

  return decimalPart
    ? `${formattedIntegerPart},${truncatedDecimalPart}`
    : formattedIntegerPart
}
