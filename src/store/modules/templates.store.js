import { useCurrentDepartment } from '@/utils/departments.js'
import {
  getAllTemplates,
  createTemplate,
  updateTemplate,
  getTemplate,
  shareTemplate,
  deleteTemplate,
} from '@/api/templates.api'
import { groupSlides, useAllDepartmentSlides } from '@/data/allSlides.js'
import { getCurrentDepartment } from '@/utils/departments.js'
import { gaEvent } from '@/utils/GA_Event.js'
import { cloneDeep } from 'lodash'

function getUpdatedTemplates(templates) {
  return templates.map((template) => ({
    ...template,
    numberOfSlides: template.slides.filter((slide) => slide.isEnabled).length,
  }))
}

export default {
  state: () => ({
    templates: [],
    myTemplates: [],
    editTemplates: {},
    templatebyID: {},
    slides: null,
  }),

  getters: {
    templates(state, getters, rootState, rootGetters) {
      const department = getCurrentDepartment(rootGetters)
      const { isCurrentDepartment } = useCurrentDepartment(department)
      return state.templates.filter(isCurrentDepartment)
    },
    getNewTemplateSlides(state, rootState, getters, rootGetters) {
      const department = getCurrentDepartment(rootGetters)
      const { allDepartmentSlides } = useAllDepartmentSlides(department)
      return state.slides || cloneDeep(allDepartmentSlides.value)
    },
    myTemplates(state, getters, rootState, rootGetters) {
      const department = getCurrentDepartment(rootGetters)
      const { isCurrentDepartment } = useCurrentDepartment(department)
      return state.myTemplates.filter(isCurrentDepartment)
    },
    allTemplates(state, getters) {
      return [...getters.templates, ...getters.myTemplates].sort((t1, t2) =>
        t1.updatedOn > t2.updatedOn ? -1 : 1,
      )
    },
    getTemplateByID: (state, getters) => (templateId) => {
      const fetchedTemplate = getters.allTemplates.find(
        (template) => template.templateId === templateId,
      )
      if (fetchedTemplate) return fetchedTemplate
      const fetchedTemplateID = state.templatebyID.templateId
      return templateId === fetchedTemplateID ? state.templatebyID : {}
    },

    recentlyUsedTemplates(state, getters) {
      return getters.allTemplates.filter(({ bookmarked }) => !bookmarked)
    },

    favoriteTemplates(state, getters) {
      return getters.allTemplates.filter(({ bookmarked }) => bookmarked)
    },
    newTemplate(state) {
      return state.newTemplate
    },
    getEditTemplates: (state) => (templateId) => {
      const fetchedTemplateID = state.editTemplates.templateId

      return templateId === fetchedTemplateID
        ? state.editTemplates.groupedSlides
        : {}
    },
    getEditTemplatesById: (state) => (templateId) => {
      const fetchedTemplateID = state.editTemplates.templateId

      return templateId === fetchedTemplateID ? state.editTemplates : {}
    },
  },

  mutations: {
    setTemplates(state, payload) {
      state.templates = payload.sort((t1, t2) =>
        t1.updatedOn > t2.updatedOn ? -1 : 1,
      )
    },
    setMyTemplates(state, payload) {
      state.myTemplates = payload.sort((t1, t2) =>
        t1.updatedOn > t2.updatedOn ? -1 : 1,
      )
    },
    toggleEnabled(state, { allDepartmentSlides, slideToToggle }) {
      if (!state.slides) state.slides = cloneDeep(allDepartmentSlides)
      const slide = state.slides.find(
        ({ slideNumber }) => slideToToggle.slideNumber === slideNumber,
      )
      slide.isEnabled = !slide.isEnabled
    },
    editTemplates(state, payload) {
      state.editTemplates = payload
    },
    setTemplateName(state, payload) {
      state.editTemplates.templateName = payload
    },
    setTemplateDescription(state, payload) {
      state.editTemplates.templateDescription = payload
    },

    setBookmarked(state, templatesID) {
      const template = [...state.templates, ...state.myTemplates].find(
        (template) => template.templateId === templatesID,
      )
      template.bookmarked = !template.bookmarked
    },
    setCurrentTemplate(state, payload) {
      state.newRfp = payload
    },
    setInitialSlide(state, department) {
      const { allDepartmentSlides } = useAllDepartmentSlides(department)
      if (!state.slides) state.slides = cloneDeep(allDepartmentSlides.value)
      state.slides.map((slide) => {
        slide.isEnabled = false
      })
    },
    selectSlide(state, payload) {
      state.editTemplates.slides.map((slide) => {
        if (slide.slideInfoId === payload.slideInfoId) {
          slide.isEnabled = !slide.isEnabled
        }
      })
    },
    addTempalte(state, payload) {
      state.templates.push(payload)
      state.templates.sort((t1, t2) => (t1.updatedOn > t2.updatedOn ? -1 : 1))
    },
    addMyTempalte(state, payload) {
      state.myTemplates.push(payload)
      state.myTemplates.sort((t1, t2) => (t1.updatedOn > t2.updatedOn ? -1 : 1))
    },
    deleteTemplate(state, templatesID) {
      const myTemplateIndex = state.myTemplates.findIndex(
        (template) => template.templateId === templatesID,
      )
      if (myTemplateIndex > -1) state.myTemplates.splice(myTemplateIndex, 1)

      const templateIndex = state.templates.findIndex(
        (template) => template.templateId === templatesID,
      )
      if (templateIndex > -1) state.templates.splice(templateIndex, 1)
    },
    sharedTemplate(state, payload) {
      state.templates[payload - 1].sharable =
        !state.templates[payload - 1].sharable
    },
    setShareWith(state, payload) {
      const template = [...state.templates, ...state.myTemplates].find(
        (template) => template.templateId === payload.templateId,
      )
      template.internalUserDetails = payload.internalUserDetails
    },
    roleUpdate(state, payload) {
      const templates = [...state.templates, ...state.myTemplates]
      if (payload.role === 'EDITOR' || payload.role === 'VIEWER') {
        const template = templates.find(
          (template) => template.templateId === payload.templateId,
        )
        const sharedWith = template.internalUserDetails.find(
          (sharedWith) =>
            sharedWith.internalUserId ===
            payload.internalTeamDetail.internalUserId,
        )
        sharedWith.role = payload.role
      }
      if (payload.role === 'NONE') {
        const template = templates.find(
          (template) => template.templateId === payload.templateId,
        )
        const sharewith = template.internalUserDetails.findIndex(
          (sharedWith) =>
            sharedWith.internalUserId ===
            payload.internalTeamDetail.internalUserId,
        )
        template.internalUserDetails.splice(sharewith, 1)
      }
    },
    setEdit(state, payload) {
      state.templatebyID = payload
    },
  },

  actions: {
    initialSlide({ commit, rootGetters }) {
      gaEvent({
        action: 'initial-slide',
        event_category: 'template',
        event_label: 'User-click-initial-slide',
      })
      const department = getCurrentDepartment(rootGetters)
      commit('setInitialSlide', department)
    },

    toggleEnabled({ commit, rootGetters }, payload) {
      const department = getCurrentDepartment(rootGetters)
      const { allDepartmentSlides } = useAllDepartmentSlides(department)
      commit('toggleEnabled', {
        allDepartmentSlides: allDepartmentSlides.value,
        slideToToggle: payload,
      })
    },

    async sharedWithAction({ commit }, payload) {
      gaEvent({
        action: 'share-template-with-action',
        event_category: 'template',
        event_label: 'User-click-share-template-with-action',
      })
      try {
        let sharedTemplate = await shareTemplate(payload)
        commit('setShareWith', sharedTemplate)
      } catch (err) {
        console.error(err.response || err)
        throw err
      }
    },
    async shareWithUser({ commit }, payload) {
      gaEvent({
        action: 'share-template-with-user',
        event_category: 'template',
        event_label: 'User-click-share-template-with-user',
      })
      try {
        await shareTemplate({
          internalTeamDetailList: [
            { ...payload.internalTeamDetail, role: payload.role },
          ],
          templateId: payload.templateId,
        })
        commit('roleUpdate', payload)
      } catch (err) {
        console.error(err.response || err)
        throw err
      }
    },
    async fetchTemplates(
      { commit, getters, rootGetters },
      { limit, page } = {},
    ) {
      gaEvent({
        action: 'fetch-template',
        event_category: 'template',
        event_label: 'User-click-fetch-template',
      })
      try {
        const email = rootGetters['auth/email']

        const department = getCurrentDepartment(rootGetters)

        const fetchedTemplates = await getAllTemplates(department, limit, page)
        const fetchedTemplateIds = fetchedTemplates.map(
          ({ templateId }) => templateId,
        )

        const stateTemplates = getters.allTemplates.filter(
          ({ templateId }) => !fetchedTemplateIds.includes(templateId),
        )

        const allTemplates = [...stateTemplates, ...fetchedTemplates]

        const myTemplates = allTemplates.filter(
          (template) => email === template.owner,
        )
        const notMyTemplates = allTemplates.filter(
          (template) => email !== template.owner,
        )

        const updatedMyTemplates = getUpdatedTemplates(myTemplates)

        const updatedNotMyTemplates = getUpdatedTemplates(notMyTemplates)

        commit('setMyTemplates', updatedMyTemplates)
        commit('setTemplates', updatedNotMyTemplates)
      } catch (err) {
        console.error(err.response || err)
        throw err
      }
    },
    async getTemplate({ commit }, payload) {
      gaEvent({
        action: 'get-template',
        event_category: 'template',
        event_label: 'User-click-get-template',
      })
      try {
        let fetchedTemplate = await getTemplate(payload)
        fetchedTemplate.slides.sort(function (a, b) {
          return a.pageNumber - b.pageNumber
        })
        commit('editTemplates', {
          ...fetchedTemplate,
          groupedSlides: groupSlides(fetchedTemplate.slides),
        })
        commit('setEdit', fetchedTemplate)
      } catch (err) {
        console.error(err.response || err)
        throw err
      }
    },
    async createTemplate({ commit, rootGetters }, payload) {
      gaEvent({
        action: 'create-template',
        event_category: 'template',
        event_label: 'User-click-create-template',
      })
      try {
        const slideInfos = []
        for (let category in payload.slides) {
          let slideInfo = {
            isEnabled: payload.slides[category].isEnabled,
            pageNumber:
              payload.slides[category].slideNumber ||
              payload.slides[category].pageNumber,
            slideCategory: payload.slides[category].slideCategory,
            slideCode:
              payload.slides[category].slideCode ||
              payload.slides[category].slide?.prePopulatedSlide,
          }
          slideInfos.push(slideInfo)
        }

        const department = getCurrentDepartment(rootGetters)

        const createdTemplate = await createTemplate(
          {
            slideInfos: slideInfos,
            templateName: payload.templateName,
            templateDescription: payload.templateDescription,
          },
          department,
        )
        commit('addMyTempalte', createdTemplate)
        return createdTemplate
      } catch (err) {
        console.error('create Template: ', err)
        throw err
      }
    },
    async delTemplate({ commit }, payload) {
      gaEvent({
        action: 'delete-template',
        event_category: 'template',
        event_label: 'User-click-delete-template',
      })
      commit('deleteTemplate', payload)
      await deleteTemplate(payload)
    },
    async updateTemplate({ commit }, templateToUpdate) {
      gaEvent({
        action: 'update-template',
        event_category: 'template',
        event_label: 'User-click-update-template',
      })
      try {
        const payload = {
          bookmarked: templateToUpdate.bookmarked,
          slideInfos: templateToUpdate.slideInfos || templateToUpdate.slides,
          templateDescription: templateToUpdate.templateDescription,
          templateId: templateToUpdate.templateId,
          templateName: templateToUpdate.templateName,
        }

        const updatedTemplate = await updateTemplate(payload)
        commit('editTemplates', {
          ...updatedTemplate,
          groupedSlides: groupSlides(updatedTemplate.slides),
        })
        commit('setEdit', updatedTemplate)
      } catch (err) {
        console.error(err.response || err)
        throw err
      }
    },
    async changeBookmarkState({ commit, dispatch, getters }, templateId) {
      gaEvent({
        action: 'change-bookmark-state',
        event_category: 'template',
        event_label: 'User-click-change-bookmark-state',
      })
      try {
        commit('setBookmarked', templateId)
        const updatedTemplate = getters.getTemplateByID(templateId)
        await dispatch('updateTemplate', updatedTemplate)
      } catch (err) {
        console.error(err.response || err)
      }
    },
  },
}
