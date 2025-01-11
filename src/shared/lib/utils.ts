export const getFormattedAmount = (amount: number | string) => {
  const stringAmount = amount.toString()
  const [integerPart, decimalPart] = stringAmount.split(/[.,]/)
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  const truncatedDecimalPart = decimalPart ? decimalPart.slice(0, 2) : ''

  return decimalPart
    ? `${formattedIntegerPart},${truncatedDecimalPart}`
    : formattedIntegerPart
}
