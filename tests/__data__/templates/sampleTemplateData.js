import templates from './sampleTemplates.json'
import saveAsTemplate from './sampleSaveAsTemplate.json'
import updatedTemplate from './sampleUpdateTemplate.json'
import shareTemplate from './sampleShareTemplate.json'
import createTemplate from './sampleCreateTemplate.json'
import templatesForUpdate from './sampleTemplatesForUpdate.json'
import { mockUserDetail } from '../auth/authData.js'
import createdTemplate from './sampleCreatedTemplate.json'

function getTemplates(department) {
  const templatesTo = JSON.parse(
    JSON.stringify(
      templates.map((temp) => ({
        ...temp,
        department: department,
      })),
    ),
  )
  templatesTo[0].owner = mockUserDetail.email
  return JSON.parse(JSON.stringify(templatesTo))
}
function getSaveAsTemplate() {
  return JSON.parse(JSON.stringify(saveAsTemplate))
}
function getUpdatedTemplate(department) {
  return JSON.parse(
    JSON.stringify({ ...updatedTemplate, department: department }),
  )
}
function getShareTemplate(department) {
  return JSON.parse(
    JSON.stringify({ ...shareTemplate, department: department }),
  )
}
function getCreateTemplate(department) {
  return JSON.parse(
    JSON.stringify({ ...createTemplate, department: department }),
  )
}
function getCreatedTemplate(department) {
  return JSON.parse(
    JSON.stringify({
      ...createdTemplate,
      department: department,
    }),
  )
}
function getAllTemplatesForUpdate(department) {
  return JSON.parse(
    JSON.stringify(
      templatesForUpdate.map((temp) => ({
        ...temp,
        department: department,
      })),
    ),
  )
}

export {
  getCreateTemplate,
  getSaveAsTemplate,
  getTemplates,
  getShareTemplate,
  getUpdatedTemplate,
  getAllTemplatesForUpdate,
  getCreatedTemplate,
}
