/*eslint-env node, jest, amd*/
import {
  getCreatedSlide,
  getCustomSlidesByOwnerId,
  getUpdatedCustomSlide,
} from '../../../tests/__data__/customSlide/customSlideData'

const createSlide = jest.fn((payload) =>
  Promise.resolve({
    ...getCreatedSlide(),
    ...payload,
    slide: {
      ...getCreatedSlide().slide,
      ...payload.slide,
      slideContent: payload.slideData,
    },
  }),
)

const updateCustomSlide = jest.fn((payload) =>
  Promise.resolve({
    ...getUpdatedCustomSlide(),
    ...payload,
    slide: {
      ...getUpdatedCustomSlide().slide,
      slideInfoId: payload.slideInfoId,
      slideContent: payload.slideData,
    },
    department: 'TRAUMA',
  }),
)

const mockCustomSlides = getCustomSlidesByOwnerId()
const fetchCustomSlidesByOwnerId = jest.fn((ownerId, department) =>
  Promise.resolve(getCustomSlidesByOwnerId(department)),
)

// eslint-disable-next-line no-unused-vars
const deleteCustomSlide = jest.fn((_mockedSlideInfoId) => Promise.resolve())

export {
  createSlide,
  fetchCustomSlidesByOwnerId,
  updateCustomSlide,
  deleteCustomSlide,
  mockCustomSlides,
}
