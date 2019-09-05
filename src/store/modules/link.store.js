import { getRfpLinks, publishLink, generatePdf } from '@/api/link.api.js'
import { retrySaveS3File } from '@/components/utils/s3/saveS3File'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  state: () => ({
    rfpLinks: {},
  }),

  getters: {
    getLinksByPresentationId:
      (state, _g, _rs, rootGetters) => (presentationId) =>
        state.rfpLinks[presentationId] ||
        rootGetters['rfps/getPublishedLinksByPresentationId'](presentationId),
    getLinkByLinkId: (state, getters, rootState, rootGetters) => (linkId) => {
      for (const presentationId in state.rfpLinks) {
        const link = state.rfpLinks[presentationId]?.find(
          (linkItem) => linkItem.id === linkId,
        )
        if (link) return link
      }
      return rootGetters['rfps/getPublishedLinks'].find(
        (link) => link.id === linkId,
      )
    },
    rfpLinks(state) {
      return state.rfpLinks
    },
  },

  mutations: {
    setRfpLinks(state, payload) {
      payload.links.forEach((link) => {
        link.slides.sort(
          (slideA, slideB) => slideA.pageNumber - slideB.pageNumber,
        )
      })
      state.rfpLinks[payload.presentationId] = payload.links
    },
    toggleSlideStarred(state, payload) {
      let link
      for (const presentationId in state.rfpLinks) {
        link = state.rfpLinks[presentationId]?.find(
          (linkItem) => linkItem.id === payload.linkId,
        )
      }
      const slide = link.slides.find(
        (slide) => slide.slideInfoId === payload.slideId,
      )

      if (slide) {
        slide.isStarred = !slide.isStarred
      }
      gaEvent({
        action: 'link-toggle-slide-starred-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-builder-toggle-slide-starred-btn',
      })
    },

    toggleSlideSelection(state, payload) {
      let link
      for (const presentationId in state.rfpLinks) {
        link = state.rfpLinks[presentationId]?.find(
          (linkItem) => linkItem.id === payload.linkId,
        )
      }
      const slide = link.slides.find(
        (slide) => slide.slideInfoId === payload.slideId,
      )

      if (slide) {
        slide.isEnabled = !slide.isEnabled
      }
      gaEvent({
        action: 'link-toggle-slide-selection-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-builder-toggle-slide-selection-btn',
      })
    },
  },

  actions: {
    async fetchRfpLinks({ commit }, presentationId) {
      gaEvent({
        action: 'fetch-presentation-link',
        event_category: 'presentation',
        event_label: 'User-fetch-presentation-link',
        presentationIdParam: presentationId,
      })
      let response = await getRfpLinks(presentationId)
      let payload = {
        links: response,
        presentationId: presentationId,
      }

      commit('setRfpLinks', payload)

      return response
    },

    async publishLink({ dispatch }, payload) {
      gaEvent({
        action: 'publish-presentation-link',
        event_category: 'presentation',
        event_label: 'User-publish-presentation-link',
        presentationIdParam: payload.presentationId,
      })

      const hyperLinkIsInvalid = /[-/:?#[\]@!$&'()*+,;=\\]+/.test(
        payload.hyperLink,
      )
      if (hyperLinkIsInvalid)
        throw `No "- / \\ : ? # [ ] @ ! $ & ' ( ) * + , ; =" allowed in hyper link`

      const publishedLink = await publishLink(payload)

      await dispatch('fetchRfpLinks', payload.presentationId)

      return publishedLink
    },

    async generatePdf(
      { rootGetters },
      { presentationId, hyperLink, clientName, linkName, pdfTypeParam },
    ) {
      try {
        const pdfType = pdfTypeParam || (hyperLink ? 'LINK' : 'PRESENTATION')

        const fileId = await generatePdf({
          presentationId,
          hyperLink,
          pdfType,
        })

        clientName =
          clientName ||
          rootGetters['rfps/getPresentationById'](presentationId)?.customerName

        await retrySaveS3File({
          s3FileName: `presentations/pdfs/${fileId}.pdf`,
          fileName: `Presentaion ${clientName || ''} ${
            linkName || hyperLink || ''
          } ${
            pdfTypeParam ? pdfTypeParam.replace('_', ' ').toLowerCase() : ''
          }.pdf`,
        })
      } catch (err) {
        console.error('failed to download link pdf: ', err)
      }
    },
  },
}
