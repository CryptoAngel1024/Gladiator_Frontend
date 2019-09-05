export function formatDate(date) {
  let dateObject = new Date(date)
  let dd = String(dateObject.getDate()).padStart(2, '0')
  let mm = String(dateObject.getMonth() + 1).padStart(2, '0') //January is 0!
  let yyyy = dateObject.getFullYear()

  return mm + '/' + dd + '/' + yyyy
}

export function formatDateWithMonthString(date) {
  const d = new Date(date + 'Z')
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const offset = d.getTimezoneOffset()
  const hOffset = Math.ceil(offset / 60)
  const mOffset = offset % 60

  d.setMinutes(d.getMinutes() - mOffset)
  d.setHours(d.getHours() - hOffset)

  const month = months[d.getMonth()]
  const year = d.getFullYear()
  const day = d.getDate()

  return `${(day < 10 ? '0' : '') + day} ${month}, ${year}`
}

export function formatDateWithDateString(someDate) {
  const today = new Date()
  const yesterday = new Date(Date.now() - 864e5)

  const isToday =
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  const isYesterday =
    someDate.getDate() == yesterday.getDate() &&
    someDate.getMonth() == yesterday.getMonth() &&
    someDate.getFullYear() == yesterday.getFullYear()

  return isToday ? 'Today' : isYesterday ? 'Yesterday' : formatDate(someDate)
}

export function dateOrdinalSuffix(d) {
  const day = d.getDate()

  if (day > 3 && day < 21) return 'th'
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}
