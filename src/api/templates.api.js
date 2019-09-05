import { get, post, put, del } from './httpClient.js'

const path = '/template'

const getAllTemplates = async (department, limit, page) => {
  return get(
    `/template/user/dept/${department}?page=${page ?? ''}&limit=${limit || ''}`,
  )
}

const deleteTemplate = async (template_id) =>
  del(`/template/${template_id}`, {}, { templateId: template_id })
const getTemplate = async (template_id) => get(`/template/${template_id}`)
const createTemplate = async (template, department) => {
  return post(path, { department, ...template })
}
const updateTemplate = async (template) => put(path, template)
const shareTemplate = async (template) =>
  put('/template/share-template', template)

export {
  getAllTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  shareTemplate,
  deleteTemplate,
}
