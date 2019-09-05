/* eslint-disable no-unused-vars*/
/*eslint-env node, jest, amd*/
import { getPublishedLinksJson } from '../../../tests/__data__/rfps/sampleLinks'
import {
  getPublishedLinkUnderPresentation,
  getCreateLinkResponse,
  getLinkResponse,
} from '../../../tests/__data__/link/linkData'

const sampleLink = 'sampleLinkFromHyperLink'
const publishedLinks = ['link1', 'link2', 'link3']
const getRfpLinks = jest.fn(() =>
  Promise.resolve(getPublishedLinkUnderPresentation()),
)

const deletePublishLink = jest.fn(() => Promise.resolve())

const generatePdf = jest.fn(() => Promise.resolve('Mock_pdf_file_id'))
const publishLink = jest.fn((payload) =>
  Promise.resolve({
    ...getCreateLinkResponse(),
    ...payload,
    // department: department.value,
  }),
)
const getPublishedLinks = jest.fn((department, limit, page) =>
  Promise.resolve(getPublishedLinksJson(department)),
)

const getLinkByHyperLink = jest.fn((clientName, hyperLink) =>
  Promise.resolve(getLinkResponse(hyperLink)),
)

const getLinkByHyperLinkAndToken = jest.fn((clientName, hyperLink, token) =>
  Promise.resolve(getLinkResponse(hyperLink)),
)

const syncLink = jest.fn((linkId) => Promise.resolve(getLinkResponse(linkId)))

export {
  publishLink,
  getLinkByHyperLink,
  getLinkByHyperLinkAndToken,
  getRfpLinks,
  getPublishedLinks,
  deletePublishLink,
  syncLink,
  publishedLinks,
  sampleLink,
  generatePdf,
}
