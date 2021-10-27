import { useAllDepartmentSlides } from '@/data/allSlides.js'
import { gaEvent } from '@/utils/GA_Event.js'

import {
  createSlide,
  fetchCustomSlidesByOwnerId,
  updateCustomSlide,
  deleteCustomSlide,
} from '@/api/custom-slide.api.js'

import { insertCustomSlide } from '@/api/rfps.api'
import { getCurrentDepartment } from '@/utils/departments.js'

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

export default {
  state: () => ({
    customSlides: [],
    customSlideToCreate: emptyCustomeSlide(),
  }),
  getters: {
    allCustomSlides(state) {
      return [...state.customSlides].sort((slide1, slide2) =>
        slide2.createdDate.localeCompare(slide1.createdDate),
      )
    },
    positionedSlidesList:
      (state, getters, rootState, rootGetters) =>
      ({ slideInfoId, presentationSlides }) => {
        const department = getCurrentDepartment(rootGetters)
        const { allDepartmentSlides } = useAllDepartmentSlides(department)

        const allSlides = presentationSlides || allDepartmentSlides.value
        const customSlide = getters.customSlide(slideInfoId)

        if (!customSlide) return [...allSlides]

        const slideCategoryIndex = allSlides.findIndex(
          ({ slideCategory }) => slideCategory === customSlide.slideCategory,
        )

        const customeSlideIndex = customSlide.pageNumber + slideCategoryIndex

        const positionedSlidesList = [...allSlides]

        positionedSlidesList.splice(customeSlideIndex, 0, customSlide)

        return positionedSlidesList
      },
    customSlide: (state) => (slideInfoId) => {
      const slide = slideInfoId
        ? state.customSlides.find((slide) => slide.slideInfoId === slideInfoId)
        : state.customSlideToCreate

      if (!slide) return

      let slideContent = slide.slide.slideContent
      if (typeof slideContent === 'string')
        slideContent = JSON.parse(slideContent)

      slideContent = { ...defaultCustomeSlide(), ...slideContent }

      return {
        ...slide,
        slide: {
          ...slide.slide,
          slideContent,
        },
      }
    },
    customSlideToCreate(state) {
      return state.customSlideToCreate
    },
  },
  mutations: {
    setCustomSlides(state, payload) {
      state.customSlides = payload.map((slide) => ({
        ...slide,
        slide: {
          ...slide.slide,
          slideContent: JSON.parse(slide.slide.slideContent || '{}'),
        },
      }))
    },
    resetCustomSlideToCreate(state) {
      state.customSlideToCreate = emptyCustomeSlide()
    },
    deleteCustomSlide(state, customSlideId) {
      const customSlideIndex = state.customSlides.findIndex(
        ({ slideInfoId }) => slideInfoId === customSlideId,
      )
      state.customSlides.splice(customSlideIndex, 1)
    },

    setCustomSlide(state, newCustomSlide) {
      const isCustomSlideToCreate = !newCustomSlide.slideInfoId

      const clonedNewCustomSlide = JSON.parse(JSON.stringify(newCustomSlide))

      if (clonedNewCustomSlide.slide) {
        let slideContent = clonedNewCustomSlide.slide.slideContent
        if (typeof slideContent === 'string')
          slideContent = JSON.parse(slideContent)

        clonedNewCustomSlide.slide.slideContent = {
          ...defaultCustomeSlide(),
          ...slideContent,
        }
      }

      if (isCustomSlideToCreate) {
        state.customSlideToCreate = {
          ...state.customSlideToCreate,
          ...clonedNewCustomSlide,
        }
      } else {
        const customSlideIndex = state.customSlides.findIndex(
          ({ slideInfoId }) => slideInfoId === newCustomSlide.slideInfoId,
        )
        if (customSlideIndex !== -1)
          state.customSlides[customSlideIndex] = {
            ...state.customSlides[customSlideIndex],
            ...clonedNewCustomSlide,
          }
        else state.customSlides.push(clonedNewCustomSlide)
      }
    },
  },
  actions: {
    setCustomSlide({ commit }, payload) {
      commit('setCustomSlide', payload)
      gaEvent({
        action: `set-custom-slide`,
        event_category: 'slide',
        event_label: 'User-set-custom-slide',
      })
    },

    async createCustomSlide({ commit, dispatch, getters, rootGetters }) {
      gaEvent({
        action: 'create-custom-slide',
        event_category: 'slide',
        event_label: 'User-create-custom-slide',
      })

      const customSlide = getters.customSlideToCreate
      const department = getCurrentDepartment(rootGetters)

      const customSlideBody = {
        customSlideType: customSlide.slide.customSlideType,
        pageNumber: customSlide.pageNumber,
        slideCategory: customSlide.slideCategory,
        slideData: JSON.stringify(customSlide.slide.slideContent),
        department,
      }

      try {
        let createdCustomSlide = await createSlide(customSlideBody)
        commit('setCustomSlide', createdCustomSlide)

        // this saves initialSlideInfoId
        const customSlide = getters.customSlide(createdCustomSlide.slideInfoId)
        createdCustomSlide = await dispatch('updateCustomSlide', customSlide)
        return createdCustomSlide
      } catch (err) {
        console.error('Cannot create a custom slide: ', err)
        throw err.message || err
      }
    },

    async updateCustomSlide({ commit }, customSlide) {
      gaEvent({
        action: 'update-custom-slide',
        event_category: 'slide',
        event_label: 'User-updates-custom-slide',
      })

      // const currentVersion = getters.customSlide(customSlide.slideInfoId)?.slide.version

      const customSlideBody = {
        slideInfoId: customSlide.slideInfoId,
        slideCategory: customSlide.slideCategory,
        pageNumber: customSlide.pageNumber,
        slideData: JSON.stringify({
          initialSlideInfoId: customSlide.slideInfoId,
          ...customSlide.slide.slideContent,
          // version: (currentVersion || 1) + 1,
        }),
      }

      try {
        const updatedCustomSlide = await updateCustomSlide(customSlideBody)
        commit('setCustomSlide', updatedCustomSlide)
        return updatedCustomSlide
      } catch (err) {
        console.error('Cannot update the custom slide: ', err)
        throw err.message || err
      }
    },

    async insertCustomSlide({ getters, commit, rootGetters }, customSlideInfo) {
      const customSlide = getters.customSlide(customSlideInfo.slideInfoId)

      const customSlideBody = {
        customSlideId: customSlide.slide.slideId,
        pageNumber: customSlide.pageNumber,
        slideCategory: customSlide.slideCategory,
        presentationId: customSlideInfo.presentationId,
      }

      try {
        const presentation = await insertCustomSlide(customSlideBody)

        const presentationState = rootGetters['rfps/getPresentationById'](
          customSlideInfo.presentationId,
        )
        const updatedPresentation = JSON.parse(
          JSON.stringify({
            ...presentationState,
            slides: presentation.slides,
          }),
        )

        commit('rfps/updateRfp', updatedPresentation, { root: true })

        return presentation
      } catch (err) {
        console.error('Cannot insert the custom slide: ', err)
        throw err.message || err
      }
    },

    async fetchCustomSlidesByOwnerId({ commit, rootGetters }) {
      gaEvent({
        action: 'fetch-custom-slide',
        event_category: 'slide',
        event_label: 'User-fetch-custom-slide',
      })
      try {
        const department = getCurrentDepartment(rootGetters)

        const customeSlides = await fetchCustomSlidesByOwnerId(department)
        commit('setCustomSlides', customeSlides)
      } catch (err) {
        console.error('Cannot fetch the custom slides: ', err)
        throw err.message || err
      }
    },

    async deleteCustomSlide(
      { commit },
      { customSlideId, deleteFromState = true },
    ) {
      try {
        if (deleteFromState) commit('deleteCustomSlide', customSlideId)
        await deleteCustomSlide(customSlideId)

        gaEvent({
          action: 'delete-custom-slide-option',
          event_category: 'slide',
          event_label: 'User-delete-custom-slide',
        })
      } catch (err) {
        console.error('Cannot delte the custom slide', err)
        throw err.message || err
      }
    },

    updateCustomSlidePosition(
      { commit, rootGetters },
      { slideCategory, pageNumber, slideInfoId, action, slides },
    ) {
      gaEvent({
        action: 'update-custom-slide-position',
        event_category: 'slide',
        event_label: 'User-updates-custom-slide-position',
      })

      const department = getCurrentDepartment(rootGetters)
      const { allDepartmentSlides } = useAllDepartmentSlides(department)

      const sortedSlides = [...(slides || allDepartmentSlides.value)]
        .sort((slideA, slideB) => slideA.slideNumber - slideB.slideNumber)
        .sort((slideA, slideB) => slideA.pageNumber - slideB.pageNumber)

      const categoryStartIndex = sortedSlides.findIndex(
        (slide) => slide.slideCategory === slideCategory,
      )
      const newPageNumber = pageNumber + categoryStartIndex

      // run for action == 'added'/'moved'
      if (action !== 'removed') {
        commit('setCustomSlide', {
          slideInfoId,
          slideCategory,
          pageNumber: newPageNumber,
        })
      }
    },
  },
}
