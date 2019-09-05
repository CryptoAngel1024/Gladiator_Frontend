export default {
  created() {
    const title = getTitle(this)
    if (title) {
      document.title = `DePuy Synthes | ${title}`
    }
  },
}

function getTitle(component) {
  const { title: viewTitle } = component.$options
  if (viewTitle) {
    return typeof viewTitle === 'function'
      ? viewTitle.call(component)
      : viewTitle
  }
}
