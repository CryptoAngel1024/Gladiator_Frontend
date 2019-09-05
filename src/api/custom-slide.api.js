import { get, post, put, del } from './httpClient.js'

const path = '/slide'

const createSlide = ({
  ownerId,
  slideCategory,
  pageNumber,
  slideData,
  customSlideType,
  department,
}) =>
  post(path, {
    department,
    ownerId,
    slideCategory,
    pageNumber,
    slideData,
    customSlideType,
  })

const fetchCustomSlidesByOwnerId = (department) => {
  return get(`${path}/customSlides/owner/dept/${department}`)
}

const deleteCustomSlide = (customSlideId) => del(`${path}/${customSlideId}`)

const updateCustomSlide = ({
  slideInfoId,
  slideCategory,
  pageNumber,
  slideData,
}) => put(path, { slideInfoId, slideCategory, pageNumber, slideData })

export {
  createSlide,
  fetchCustomSlidesByOwnerId,
  updateCustomSlide,
  deleteCustomSlide,
}
