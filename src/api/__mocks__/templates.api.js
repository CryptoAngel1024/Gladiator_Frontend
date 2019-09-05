/* eslint-disable no-unused-vars*/
/*eslint-env node, jest, amd*/
import { mockUserDetail } from '../../../tests/__data__/auth/authData.js'
import {
  getTemplates,
  getCreatedTemplate,
  getShareTemplate,
  getUpdatedTemplate,
  getAllTemplatesForUpdate,
} from '../../../tests/__data__/templates/sampleTemplateData'

const getAllTemplates = jest.fn((department, limit, page) =>
  Promise.resolve(getTemplates(department)),
)

const deleteTemplate = jest.fn(() => Promise.resolve({}))
const getTemplate = jest.fn((templateId) =>
  Promise.resolve(
    [...getAllTemplatesForUpdate(), ...getTemplates()].find(
      (template) => template.templateId == templateId,
    ),
  ),
)

const createdTemplateIDs = (newTemplateIndex) =>
  `new-template-${newTemplateIndex}`

let newTemplateIndex = 0
const createTemplate = jest.fn((payload, department) => {
  newTemplateIndex++
  return Promise.resolve({
    ...getCreatedTemplate(),
    ...payload,
    owner: mockUserDetail.email,
    templateId: createdTemplateIDs(newTemplateIndex),
    department: department,
  })
})
const updateTemplate = jest.fn(() => Promise.resolve(getUpdatedTemplate()))
const shareTemplate = jest.fn(() => Promise.resolve(getShareTemplate()))

export {
  getAllTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  shareTemplate,
  deleteTemplate,
  createdTemplateIDs,
}
