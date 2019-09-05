export function copyHtmlString(htmlSting) {
  const listener = function (ev) {
    ev.preventDefault()
    ev.clipboardData.setData('text/html', htmlSting)
    ev.clipboardData.setData('text/plain', htmlSting)
  }
  document.addEventListener('copy', listener)
  document.execCommand('copy')
  document.removeEventListener('copy', listener)

  // navigator.clipboard.write([
  //   new window.ClipboardItem({
  //     'text/html': new Blob([htmlSting], { type: 'text/html' }),
  //     'text/plain': new Blob([htmlSting], { type: 'text/plain' }),
  //   }),
  // ])
}
