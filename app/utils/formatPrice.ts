export function formatPrice(amount: number, currency = 'TWD') {
  if (currency !== 'TWD') {
    return new Intl.NumberFormat('zh-Hant-TW', { style: 'currency', currency }).format(amount)
  }
  return `NT.${amount.toLocaleString('zh-Hant-TW')}`
}
