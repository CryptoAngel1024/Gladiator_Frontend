import customSlide from './createdSlide.json'
import customSlidesByOwnerId from './getCustomSlidesByOwnerId.json'
import updatedCustomSlide from './updatedCustomSlide.json'
import insertSlideReq from './insertSlideRequest.json'
import insertSlideRes from './insertSlideResponse.json'
import insertedCustomSlide from './customSlideInserted.json'
import ascInsertSlideRes from './ASC/insertSlideResponse.json'

const defaultCustomeSlide = () => ({
  slideTitle: '',
  subTitle: '',
  slideCategory: 'INTRODUCTION',
  pageNumber: 1,
  customSlideType: 'CUSTOM_SLIDE_1',
  version: 0,
  showTitle: true,
  showSubtitle: true,
  showImages: true,
  numberOfImages: 0,
})

const emptyCustomeSlide = () => ({
  slideInfoId: '',
  slideCategory: 'INTRODUCTION',
  pageNumber: 1,
  slide: {
    slideId: '',
    slideContent: defaultCustomeSlide(),
    version: 0,
    prePopulatedSlide: '',
    slideType: 'CUSTOM',
    customSlideType: 'CUSTOM_SLIDE_1',
  },
  isEnabled: true,
})

const departments = {
  TRAUMA: {
    insertCustomSlide: insertSlideRes,
  },
  ASC: {
    insertCustomSlide: ascInsertSlideRes,
  },
  default: {
    insertCustomSlide: insertSlideRes,
  },
}

function getCreatedSlide() {
  return JSON.parse(JSON.stringify(customSlide))
}
function getCustomSlidesByOwnerId(department) {
  const resp = customSlidesByOwnerId.map((slide) => ({
    ...slide,
    department: department,
  }))
  return JSON.parse(JSON.stringify(resp))
}

function getUpdatedCustomSlide() {
  return JSON.parse(JSON.stringify(updatedCustomSlide))
}
function getInsertSlideReq() {
  return JSON.parse(JSON.stringify(insertSlideReq))
}
function getInsertSlideResp(slidePayload, department) {
  const insertSlideResClone = JSON.parse(
    JSON.stringify(
      departments[department]?.insertCustomSlide ||
        departments.default.insertCustomSlide,
    ),
  )
  insertSlideResClone.slides.push({ ...slidePayload, slide: slidePayload })
  return insertSlideResClone
}

function getInsertedCustomSlide() {
  return JSON.parse(JSON.stringify(insertedCustomSlide))
}
function getAscInsertSlideResp(slidePayload) {
  const insertSlideResClone = JSON.parse(JSON.stringify(ascInsertSlideRes))
  insertSlideResClone.slides.push({ ...slidePayload, slide: slidePayload })
  return insertSlideResClone
}

export {
  getCreatedSlide,
  getCustomSlidesByOwnerId,
  getUpdatedCustomSlide,
  emptyCustomeSlide,
  getInsertSlideReq,
  getInsertSlideResp,
  getInsertedCustomSlide,
  getAscInsertSlideResp,
}
