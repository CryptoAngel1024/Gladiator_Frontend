/*eslint-env node, jest, amd*/
import {
  getCreatedRfp,
  getMyRfps,
  getUpdatedSlideContent,
} from '../../../tests/__data__/rfps/sampleRfps'
import { mockUserDetail } from '../../../tests/__data__/auth/authData.js'

import { getInsertSlideResp } from '../../../tests/__data__/customSlide/customSlideData'

function getPresentationById(getters, presentationId) {
  const presentation = getters['rfps/getPresentationById'](presentationId)
  return presentation
}

const getMyrfps = jest.fn(({ department }) => {
  return Promise.resolve(getMyRfps(department))
})

const getMyRfp = jest.fn((presentationId, { getters }) => {
  const presentation = getPresentationById(getters, presentationId)
  const mockPresentation = getMyRfps().find(
    (presenation) => presenation.presentationId == presentationId,
  )
  return Promise.resolve(presentation || mockPresentation)
})

const getMyRfpByToken = jest.fn(
  (presentationId, token, headers, { getters }) => {
    const presentation = getPresentationById(getters, presentationId)
    const mockPresentation = getMyRfps().find(
      (presenation) => presenation.presentationId == presentationId,
    )
    const rfp = presentation || mockPresentation
    return Promise.resolve(rfp)
  },
)

const createRfp = jest.fn((payload, department) => {
  const informations = {}
  payload.informationList.forEach((info) => {
    informations[info.informationType] = info.data
  })
  return Promise.resolve({
    ...getCreatedRfp(department),
    owner: mockUserDetail.email,
    customerName: payload.customerName,
    informations,
    ...payload,
  })
})

const deleteRfp = jest.fn(() => Promise.resolve())

const updateRfp = jest.fn(async (subPath, payload, { getters }) => {
  const presentation = getPresentationById(getters, payload.presentationId)

  const updatedSlides = JSON.parse(JSON.stringify(presentation.slides))
  if (subPath === 'slide-info')
    updatedSlides.forEach((slide) => {
      const updatedSlide = payload.updateSlideInfoRequestList.find(
        (s) => s.slideInfoId === slide.slideInfoId,
      )
      slide.isEnabled = updatedSlide?.isEnabled || slide.isEnabled
    })

  if (subPath === 'update-info') {
    payload.informationList.forEach((info) => {
      presentation.informations[info.informationType] = info.data
    })
  }

  const returnValues = {
    'customer-name': {
      customerName: payload.customerName,
    },
    'update-info': {},
    'slide-info': {
      slides: updatedSlides,
    },
    'internal-team': {
      internalUserDetails: payload.internalTeamDetailList,
    },
    default: {},
  }

  return Promise.resolve({
    ...presentation,
    ...(returnValues[subPath] || returnValues.default),
  })
})

const getPrePopulatedSlide = (pid, slideId) => {
  const slides = getMyRfps().find(
    (presenation) => presenation.presentationId == pid,
  )?.slides
  const slide = slides.find((sl) => sl.slide.slideId === slideId)?.slide
  return slide.prePopulatedSlide
}

const updateSlideContent = jest.fn((payload) =>
  Promise.resolve({
    ...getUpdatedSlideContent(),
    presentationId: payload.presentationId,
    prePopulatedSlide: getPrePopulatedSlide(
      payload.presentationId,
      payload.slideId,
    ),
    slideContent: payload.content,
  }),
)

const updateSlideInfo = jest.fn((payload, { getters }) => {
  const presentation = getPresentationById(getters, payload.presentationId)
  const updatedSlides = JSON.parse(JSON.stringify(presentation.slides))

  updatedSlides.forEach((slide) => {
    const updatedSlide = payload.updateSlideInfoRequestList.find(
      (s) => s.slideInfoId === slide.slideInfoId,
    )
    slide.isEnabled = updatedSlide?.isEnabled
  })
  return Promise.resolve(updatedSlides)
})

const insertCustomSlide = jest.fn((slidePayload) =>
  Promise.resolve(getInsertSlideResp(slidePayload)),
)

export {
  getMyrfps,
  getMyRfp,
  getMyRfpByToken,
  createRfp,
  updateRfp,
  updateSlideContent,
  deleteRfp,
  insertCustomSlide,
  updateSlideInfo,
}
