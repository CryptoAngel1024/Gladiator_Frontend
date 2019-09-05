import getPublishedLinkUnderPresentationJson from './getPublishedLinkUnderPresentation.json'
import createLinkRequest from './createLinkRequest.json'
import createLinkResponse from './createLinkResponse.json'
import updateLinkRequest from './updateLinkRequest.json'
import getLinkRespASC from './ASC/getLinkResp.json'
import getLinkRespTRAUMA from './TRAUMA/getLinkResp.json'

const getPublishedLinkUnderPresentation = (department) =>
  JSON.parse(
    JSON.stringify(
      getPublishedLinkUnderPresentationJson.map((link) => ({
        ...link,
        department: department,
      })),
    ),
  )
const getCreateLinkRequest = () => JSON.parse(JSON.stringify(createLinkRequest))
const getCreateLinkResponse = () =>
  JSON.parse(JSON.stringify(createLinkResponse))
const getUpdateLinkRequest = () => JSON.parse(JSON.stringify(updateLinkRequest))

const sampleLinks = {
  ASC: getLinkRespASC,
  TRAUMA: getLinkRespTRAUMA,
}
const getLinkResponsePerDepartment = (department) =>
  JSON.parse(JSON.stringify(sampleLinks[department]))

const getLinkResponse = (linkId) =>
  JSON.parse(
    JSON.stringify(
      [getLinkRespTRAUMA, getLinkRespASC].find(
        (link) => link.linkId === linkId || link.hyperLink === linkId,
      ) || { ...getLinkRespTRAUMA, department: linkId }, // todo: remove `department: linkId` workaround
    ),
  )

export {
  getPublishedLinkUnderPresentation,
  getCreateLinkRequest,
  getCreateLinkResponse,
  getUpdateLinkRequest,
  getLinkResponse,
  getLinkResponsePerDepartment,
}
