export function searchTemplates(searchTerm) {
  const lowerSearchTerm = searchTerm?.toLowerCase()
  return function (template) {
    return (
      template.templateName.toLowerCase().includes(lowerSearchTerm) ||
      template.templateDescription.toLowerCase().includes(lowerSearchTerm)
    )
  }
}
