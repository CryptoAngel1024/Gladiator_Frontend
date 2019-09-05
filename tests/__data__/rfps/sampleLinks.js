import samplePublishedLinks from './samplePublishedLinks.json'

function getPublishedLinksJson(department) {
  return JSON.parse(
    JSON.stringify(
      samplePublishedLinks.map((link) => ({
        ...link,
        department: department,
      })),
    ),
  )
}
export { getPublishedLinksJson }
