import { get, post, put, del, getByToken } from './httpClient.js'

const path = '/presentation'

const getMyrfps = ({
  limit = '',
  page = 0,
  ownedByMe,
  sharedWithMe,
  isPublished = '',
  department,
}) => {
  return get(`${path}/user/dept/${department}/filter`, {
    page,
    limit,
    sharedWithCurrentUser: sharedWithMe || '',
    ownedByCurrentUser: ownedByMe || '',
    isPublished,
  })
}

const getMyRfp = (presentationId) => get(`${path}/${presentationId}`)

const getMyRfpByToken = (presentationId, token, headers) =>
  getByToken({
    path: `${path}/${presentationId}`,
    token,
    headers,
  })

const createRfp = (rfp, department) => {
  return post(path, { department, ...rfp })
}
const deleteRfp = (presentationId) =>
  del(`${path}/${presentationId}`, {}, { presentationId })

const updateRfp = (subPath, payload) => put(`${path}/${subPath || ''}`, payload)

const updateSlideContent = (slide) => put('/slide/content', slide)

const updateSlideInfo = ({ presentationId, updateSlideInfoRequestList }) =>
  put('/slide/slide-info', { presentationId, updateSlideInfoRequestList })

const insertCustomSlide = (payload) => put(`${path}/insert-slide`, payload)

export {
  getMyrfps,
  getMyRfp,
  getMyRfpByToken,
  createRfp,
  updateRfp,
  updateSlideContent,
  updateSlideInfo,
  deleteRfp,
  insertCustomSlide,
}
