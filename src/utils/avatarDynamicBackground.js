export function avatarDynamicBackground(text) {
  const colorClasses = ['bg-avatar-violet-bg', 'bg-avatar-amber-bg']

  const charCodes = text
    .split('') // => ["A", "A"]
    .map((char) => char.charCodeAt(0)) // => [65, 65]
    .join('') // => "6565"

  return colorClasses[parseInt(charCodes, 10) % colorClasses.length]
}
