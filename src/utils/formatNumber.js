export function commaNumbers(integer) {
  if (!integer) return ''
  const pattern = /(-?\d+)(\d{3})/
  let string = integer.toString().trim()
  while (pattern.test(string)) string = string.replace(pattern, '$1,$2')
  return `${string}.00`
}
