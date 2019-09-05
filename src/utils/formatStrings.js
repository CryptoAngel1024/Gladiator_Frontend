export function capitalize(str = '') {
  let strArray = str.split(' ')
  strArray = strArray.map(
    (strItem) =>
      strItem.charAt(0).toUpperCase() + strItem.slice(1).toLowerCase(),
  )
  return strArray.join(' ')
}
