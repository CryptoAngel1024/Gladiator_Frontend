import { get, post, put, del, getByToken } from './httpClient.js'

const path = '/publication'

const getRfpLinks = (presentationId) =>
  get(`${path}/presentation/${presentationId}`)

const deletePublishLink = (linkId) => del(`${path}/${linkId}`)

const publishLink = ({
  hyperLink,
  linkId,
  linkName,
  linkType,
  passCode,
  linkSlides,
  viewCount,
  presentationId,
}) =>
  linkId
    ? put(path, {
        hyperLink,
        linkId,
        linkName,
        linkType,
        passCode,
        linkSlides,
        viewCount,
        presentationId,
      })
    : post(path, {
        hyperLink,
        linkId,
        linkName,
        linkType,
        passCode,
        linkSlides,
        viewCount,
        presentationId,
      })

const getPublishedLinks = (department, limit, page) => {
  return get(
    `${path}/user/dept/${department}?page=${page ?? ''}&limit=${limit || ''}`,
  )
}

const getLinkByHyperLink = (clientName, hyperLink) =>
  get(`${path}/hyper-link/${clientName}/${hyperLink}`)

const getLinkByHyperLinkAndToken = (clientName, hyperLink, token, REQUEST_ID) =>
  getByToken({
    path: `${path}/hyper-link/${clientName}/${hyperLink}`,
    token,
    headers: {
      REQUEST_TYPE: 'GET_LINK',
      REQUEST_ID,
    },
  })

const syncLink = (linkId) => put(`${path}/sync/${linkId}`)

const generatePdf = ({ presentationId, hyperLink, pdfType }) =>
  post(`${path}/generatePdf`, {
    presentationId,
    hyperLink,
    pdfType,
    requestType: hyperLink ? 'GET_LINK' : 'GET_PRESENTATION',
  })

export {
  publishLink,
  getLinkByHyperLink,
  getLinkByHyperLinkAndToken,
  getRfpLinks,
  getPublishedLinks,
  deletePublishLink,
  syncLink,
  generatePdf,
}
