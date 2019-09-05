import { slideDetails } from '@/data/allSlides.js'
import { useCurrentDepartment } from '@/utils/departments.js'

import {
  getMyrfps,
  getMyRfp,
  createRfp,
  updateRfp,
  updateSlideContent,
  updateSlideInfo,
  deleteRfp,
  getMyRfpByToken,
} from '@/api/rfps.api.js'
import {
  getPublishedLinks,
  deletePublishLink,
  getLinkByHyperLink,
  syncLink,
  getLinkByHyperLinkAndToken,
} from '@/api/link.api.js'

import defaultPresentationConfig from '@/data/defaultRfpFields/trauma/defaultPresentationConfig.json'
import defaultSlideContents from '@/data/defaultSlideContent.js'
import defaultContacts from '@/data/defaultRfpFields/trauma/defaultContacts.json'
import defaultStakeHolders from '@/data/defaultRfpFields/trauma/defaultStakeHolders.json'
import defaultDiscoveries from '@/data/defaultRfpFields/trauma/defaultDiscoveries.json'
import defaultAscCustomerOverview from '@/data/defaultRfpFields/asc/customerOverview.json'
import defaultAscFacility from '@/data/defaultRfpFields/asc/defaultAscFacility.json'
import defaultEquipmentCapital from '@/data/defaultRfpFields/asc/defaultEquipmentCapital.json'
import defaultEconomicValueCapabilities from '@/data/defaultRfpFields/asc/defaultEconomicValueCapabilities.json'
import defaultAscCapabilities from '@/data/defaultRfpFields/asc/defaultAscCapabilities.json'
import defaultAscClinicalExcellence from '@/data/defaultRfpFields/asc/defaultAscClinicalExcellence.json'
import defaultAscReimbursementAndPayerMix from '@/data/defaultRfpFields/asc/defaultAscReimbursementAndPayerMix.json'
import defaultAscCFIgEquipmentGeneral from '@/data/defaultRfpFields/asc/defaultAscCFIgEquipmentGeneral.json'
import defaultAscStakeholders from '@/data/defaultRfpFields/asc/defaultAscStakeholders.json'
import defaultAscReconnaissance from '@/data/defaultRfpFields/asc/defaultAscReconnaissance.json'
import defaultAscContract from '@/data/defaultRfpFields/asc/defaultAscContract.json'
import defaultAscSituation from '@/data/defaultRfpFields/asc/defaultAscSituation.json'
import defaultAscTeam from '@/data/defaultRfpFields/asc/defaultAscTeam.json'

import { gaEvent } from '@/utils/GA_Event.js'
import { cloneDeep } from 'lodash'
import { useRfpEditIsDisallowed } from '@/utils/useRfpEditIsDisabled.js'
import { getCurrentDepartment } from '@/utils/departments.js'

const KEY_SLIDE_INFO = 'slide-info'
const KEY_UPDATE_INFO = 'update-info'

function filterInternalTeams(internalTeamDetailList) {
  return internalTeamDetailList.filter(
    (member) =>
      (member.email || member.firstName || member.lastName || member.userId) &&
      member.role !== 'OWNER',
  )
}

const emptyCurrentRfpDefault = () => ({
  customerName: '',
  internalUserDetails: [],
  informations: {},
})

export const rfpInformationFields = {
  TRAUMA: {
    INFORMATION1: 'contact',
    INFORMATION2: 'customerProblem',
    INFORMATION3: 'tier',
    INFORMATION4: 'stakeholders',
    INFORMATION5: 'discovery',
    INFORMATION6: 'contract',
    INFORMATION7: 'slideSelection',
  },
  ASC: {
    // todo: replace by asc rfp field list
    INFORMATION1: 'customerOverview',
    INFORMATION2: 'facilityInfrastructure',
    INFORMATION3: 'facilityInfrastructureEquipmentCapital',
    INFORMATION4: 'facilityInfrastructureEquipmentGeneral',
    INFORMATION5: 'reimbursementAndPayerMix',
    // INFORMATION1 to INFORMATION5: customerChecklist pages 1 to 5 (steps 1.1 to 1.5)
    INFORMATION6: 'stakeholders',
    INFORMATION7: 'reconnaissance',
    INFORMATION8: 'contract',
    INFORMATION9: 'situation', // step 2.5
    INFORMATION10: 'economicValueCapabilities',
    INFORMATION11: 'operationalSupportCapabilities',
    INFORMATION12: 'clinicalExcellence',
    INFORMATION13: 'team', //(step 2.1)
  },
}

export function rfpInformationFieldNames(department) {
  const departmentRfpInformationFields = rfpInformationFields[department]

  return Object.keys(departmentRfpInformationFields).map(
    (informationIndex) => departmentRfpInformationFields[informationIndex],
  )
}

const defaultRfpFields = {
  TRAUMA: {
    contact: defaultContacts,
    customerProblem: '',
    tier: '',
    stakeholders: defaultStakeHolders,
    discovery: defaultDiscoveries,
    contract: {
      gpoAffilation: '',
      numberAndName: '',
      endDate: '',
      notes: '',
      priceAvailable: null,
    },
    slideSelection: defaultPresentationConfig,
  },
  ASC: {
    customerOverview: defaultAscCustomerOverview,
    facilityInfrastructure: defaultAscFacility,
    facilityInfrastructureEquipmentCapital: defaultEquipmentCapital,
    economicValueCapabilities: defaultEconomicValueCapabilities,
    operationalSupportCapabilities: defaultAscCapabilities,
    clinicalExcellence: defaultAscClinicalExcellence,
    facilityInfrastructureEquipmentGeneral: defaultAscCFIgEquipmentGeneral,
    reimbursementAndPayerMix: defaultAscReimbursementAndPayerMix,
    stakeholders: defaultAscStakeholders,
    reconnaissance: defaultAscReconnaissance,
    contract: defaultAscContract,
    team: defaultAscTeam,
    situation: defaultAscSituation,
  },
}

function rfpInformationField(informationKey, department) {
  return rfpInformationFields[department][informationKey]
}

function rfpInformationIndex(informationField, department) {
  for (const informationKey in rfpInformationFields[department]) {
    if (rfpInformationFields[department][informationKey] === informationField)
      return informationKey
  }
}

function processFetchedRfp(rfp) {
  const informations = {
    INFORMATION1: null,
    INFORMATION2: null,
    INFORMATION3: null,
    INFORMATION4: null,
    INFORMATION5: null,
    INFORMATION6: null,
    INFORMATION7: null,
    INFORMATION8: null,
    INFORMATION9: null,
    INFORMATION10: null,
    INFORMATION11: null,
    INFORMATION12: null,
    ...rfp.informations,
  }
  for (const informationKey in informations) {
    const fieldName = rfpInformationField(informationKey, rfp.department)
    if (fieldName in rfp) continue

    const stringFieldValue =
      rfp.informations[informationKey] ||
      defaultRfpFields[rfp.department][fieldName]

    const isStringifiedJson =
      typeof stringFieldValue === 'string' &&
      stringFieldValue &&
      fieldName !== 'tier' &&
      fieldName !== 'customerProblem'

    let jsonFieldValue
    try {
      jsonFieldValue = isStringifiedJson
        ? JSON.parse(stringFieldValue)
        : stringFieldValue
    } catch (err) {
      console.error('Invalid rfp field:', fieldName, stringFieldValue, err)
      jsonFieldValue = defaultRfpFields[rfp.department][fieldName]
    }

    rfp[fieldName] = jsonFieldValue
  }
}

function processedPresentationField(presentation, fieldName) {
  const fieldItem =
    presentation[fieldName] ||
    defaultRfpFields[presentation.department][fieldName]

  return typeof fieldItem === 'string' &&
    fieldItem &&
    fieldName !== 'tier' &&
    fieldName !== 'customerProblem'
    ? JSON.parse(fieldItem)
    : fieldItem || undefined
}

function processedPresentation(presentation, state) {
  presentation = { ...presentation }
  processFetchedRfp(presentation)
  for (const key in presentation)
    if (presentation[key] === null || presentation[key] === undefined)
      delete presentation[key]

  const slidesWithDetails = presentation.slides
    ?.map((slide) => ({
      ...slideDetails(slide.slide),
      ...slide,
    }))
    .sort((slideA, slideB) => slideA.slideNumber - slideB.slideNumber)
    .sort((slideA, slideB) => slideA.pageNumber - slideB.pageNumber)

  const stateRfp =
    state?.myRfps.find(
      ({ presentationId }) => presentationId === presentation.presentationId,
    ) || {}

  const processedRfp = {
    ...emptyCurrentRfpDefault(),
    ...stateRfp,
    ...presentation,
    slides: slidesWithDetails,
  }

  rfpInformationFieldNames(presentation.department).forEach((rfpFieldName) => {
    processedRfp[rfpFieldName] = processedPresentationField(
      processedRfp,
      rfpFieldName,
    )
  })

  return processedRfp
}

function saveUserIds(internalUserDetails, internalUserDetailsWithIds) {
  const existingUserIds = () =>
    internalUserDetails
      ?.filter(({ userId }) => userId)
      .map(({ userId }) => userId)

  const existingInternalUserIds = () =>
    internalUserDetails
      ?.filter(({ internalUserId }) => internalUserId)
      .map(({ internalUserId }) => internalUserId)

  internalUserDetails.forEach((user) => {
    const remoteInternalUser = internalUserDetailsWithIds
      ?.filter(
        ({ internalUserId }) =>
          !existingInternalUserIds().includes(internalUserId),
      )
      .find(({ email }) => email && email === user.email)

    const internalUserDetailsWithIds1 = internalUserDetailsWithIds?.filter(
      (userWithId) =>
        ((userWithId.userId === user.userId && user.userId) ||
          (userWithId.userType === user.userType && user.userType) ||
          (userWithId.email === user.email && user.email) ||
          (`${userWithId.firstName}${userWithId.lastName}` ===
            `${user.firstName}${user.lastName}` &&
            `${user.firstName}${user.lastName}`)) &&
        !(userWithId.email !== user.email && userWithId.email && user.email),
    )

    const unusedUserIds = internalUserDetailsWithIds1
      ?.filter(({ userId }) => userId && !existingUserIds().includes(userId))
      .map(({ userId }) => userId)

    const unusedInternalUserIds = internalUserDetailsWithIds1
      ?.filter(
        ({ internalUserId }) =>
          internalUserId && !existingInternalUserIds().includes(internalUserId),
      )
      .map(({ internalUserId }) => internalUserId)

    user.internalUserId =
      remoteInternalUser?.internalUserId ||
      user.internalUserId ||
      unusedInternalUserIds?.[0]

    user.userId =
      remoteInternalUser?.userId || user.userId || unusedUserIds?.[0]
  })
}

async function callUpdateRfp(
  { getters, commit, rootGetters },
  { payload, key },
) {
  gaEvent({
    action: 'update-presentation',
    event_category: 'presentation',
    event_label: 'User-update-presentation',
  })

  if (payload.internalTeamDetailList) {
    const presentationState = getters.getPresentationById(
      payload.presentationId,
    )
    payload.internalTeamDetailList = filterInternalTeams(
      payload.internalTeamDetailList,
    ).map((user) => ({ ...user, name: undefined }))

    saveUserIds(
      payload.internalTeamDetailList,
      presentationState?.internalUserDetails,
    )
  }

  const updateResponse =
    key === KEY_SLIDE_INFO
      ? await updateSlideInfo(payload, { getters: rootGetters })
      : await updateRfp(key, payload, { getters: rootGetters })

  const presentation = getters.getPresentationById(payload.presentationId)

  const updatedRfp =
    key === KEY_SLIDE_INFO
      ? {
          ...presentation,
          slides: updateResponse,
        }
      : updateResponse

  const versionKey =
    key === KEY_UPDATE_INFO ? payload.informationList[0].informationType : key
  commit('updatePresentationVersions', {
    presentationId: payload.presentationId,
    presentationVersions: updatedRfp.presentationVersions,
    internalUserDetails: updatedRfp.internalUserDetails,
    slides: updatedRfp.slides,
    versionKey,
  })

  return processedPresentation(updatedRfp)
}

export function getUpdateRfpPayloads(
  presentationId,
  presentation,
  updateType,
  rootGetters,
) {
  const { editIsDisallowed } = useRfpEditIsDisallowed(
    presentationId,
    presentation,
    rootGetters,
  )
  const payloadsPerField = getPayloadsPerField(presentation)

  const departmentRfpInformationFields =
    rfpInformationFields[presentation.department]
  for (const informationIndex in departmentRfpInformationFields) {
    const fieldName = departmentRfpInformationFields[informationIndex]
    if (!payloadsPerField[fieldName]) {
      payloadsPerField[fieldName] = {
        key: KEY_UPDATE_INFO,
        presentationInformation: fieldName,
      }
    }
  }

  const additionaPayloadsPerField = getAdditionaPayloadsPerField(
    payloadsPerField,
    presentation,
    editIsDisallowed,
  )

  const updateRfpPayloads = [payloadsPerField[updateType]]
  ;(additionaPayloadsPerField[updateType] || []).forEach((additionaPayload) => {
    if (additionaPayload) {
      updateRfpPayloads.push(additionaPayload)
    }
  })

  updateRfpPayloads.forEach((updateRfpPayload) => {
    if (updateRfpPayload.presentationInformation) {
      const informationIndex = rfpInformationIndex(
        updateRfpPayload.presentationInformation,
        presentation.department,
      )

      const currentVersion =
        presentation.presentationVersions?.presentationInformation?.[
          informationIndex
        ]

      let informationListData =
        presentation.informationListData ||
        presentation[updateRfpPayload.presentationInformation]
      if (typeof informationListData !== 'string')
        informationListData = JSON.stringify(informationListData)

      updateRfpPayload.payload = {
        informationList: [
          {
            data: informationListData,
            informationType: informationIndex,
            version: (currentVersion || 1) + 1,
          },
        ],
      }
    } else if (updateRfpPayload.versionKey) {
      const currentVersion =
        presentation.presentationVersions[updateRfpPayload.versionKey]
      updateRfpPayload.payload.version = (currentVersion || 1) + 1
    }

    updateRfpPayload.payload.presentationId = presentationId
  })

  return updateRfpPayloads.map(({ key, payload }) => ({ key, payload }))
}

export default {
  state: () => ({
    myRfps: [],
    publishedLinks: [],
    currentRfp: emptyCurrentRfpDefault(),
  }),

  getters: {
    myRfps(state, getters, rootState, rootGetters) {
      const department = getCurrentDepartment(rootGetters)
      const { isCurrentDepartment } = useCurrentDepartment(department)
      return state.myRfps.filter(isCurrentDepartment)
    },
    getDraftRfps(state, getters) {
      return getters.myRfps.filter(
        ({ publicationCount }) => publicationCount === 0,
      )
    },
    getPublishedLinks(state, getters, rootState, rootGetters) {
      const department = getCurrentDepartment(rootGetters)
      const { isCurrentDepartment } = useCurrentDepartment(department)
      return state.publishedLinks.filter(isCurrentDepartment)
    },
    getPublishedLinksByPresentationId: (state, getters) => (presentationId) => {
      return getters.getPublishedLinks.filter(
        (publishedLink) => publishedLink.presentationId === presentationId,
      )
    },
    getPublishedLinksByLinkName: (state, getters) => (linkName) => {
      return getters.getPublishedLinks.find(
        (publishedLink) => publishedLink.linkName == linkName,
      )
    },
    getPublishedRfps(state, getters) {
      return getters.myRfps.filter(
        ({ publicationCount }) => publicationCount > 0,
      )
    },
    sharedWithMe(state, getters, rootState, rootGetters) {
      const email = rootGetters['auth/email']
      const department = getCurrentDepartment(rootGetters)
      const { isCurrentDepartment } = useCurrentDepartment(department)

      return getters.myRfps
        .filter(isCurrentDepartment)
        .filter((rfp) => rfp.owner !== email)
        .map((rfp) => {
          const shareDetail = rfp.internalUserDetails.find(
            (user) => user.email == email,
          )
          const owner = rfp.internalUserDetails.find(
            (user) => user.email == rfp.owner,
          )

          return {
            customerName: rfp.customerName,
            owner: owner,
            sharedBy: owner, // TODO: update to shared by user when the field is added in the api
            role: shareDetail?.role,
            presentationId: rfp.presentationId,
          }
        })
    },

    getPresentationById: (state, getters) => (id) => {
      const presentation = id
        ? getters.myRfps.find((rfp) => rfp.presentationId == id)
        : getters.getCurrentRfp

      if (!presentation) return

      return cloneDeep(processedPresentation(presentation))
    },

    getCurrentRfp(state, getters, rootState, rootGetters) {
      return {
        department: getCurrentDepartment(rootGetters),
        ...state.currentRfp,
      }
    },
    getEmptyCurrentRfp(state, getters, rootState, rootGetters) {
      return {
        department: getCurrentDepartment(rootGetters),
        ...emptyCurrentRfpDefault(),
      }
    },

    getNonCustomSlidesByPresentationId:
      (state, getters) => (presentationId) => {
        const allSlides =
          getters.getSlidesByPresentationId(presentationId) || []
        return allSlides.filter((slide) => slide.customSlideType == undefined)
      },

    getSlidesByPresentationId: (state, getters) => (presentationId) => {
      const presentation = getters.getPresentationById(presentationId)

      if (presentation)
        return [...(presentation.slides || [])].sort(
          ({ pageNumber: pageNumber1 }, { pageNumber: pageNumber2 }) =>
            pageNumber1 - pageNumber2,
        )
    },

    getLinkByHyperLink: (state) => (clientName, hyperLink) => {
      return state.publishedLinks.find(
        (link) =>
          link.hyperLink === hyperLink && link.clientName === clientName,
      )
    },

    getSlidesByHyperLink: (state, getters) => (clientName, hyperLink) => {
      const link = getters.getLinkByHyperLink(clientName, hyperLink)

      if (link)
        return [...(link.slides || [])].sort(
          ({ pageNumber: pageNumber1 }, { pageNumber: pageNumber2 }) =>
            pageNumber1 - pageNumber2,
        )
    },

    getEnabledSlidesByPresentationId:
      (state, getters) =>
      ({ presentationId, hyperLink, clientName }) => {
        const slides = hyperLink
          ? getters.getSlidesByHyperLink(clientName, hyperLink)
          : getters.getSlidesByPresentationId(presentationId)

        if (slides) return slides.filter(({ isEnabled }) => isEnabled)
      },

    getDisplayedSlidesByPresentationId:
      (state, getters) =>
      ({ presentationId, hyperLink, clientName }) => {
        const enabledSlides = getters.getEnabledSlidesByPresentationId({
          presentationId,
          hyperLink,
          clientName,
        })

        if (enabledSlides) {
          return enabledSlides.filter((slideFull) => {
            const slide = {
              ...slideFull,
              ...slideDetails(slideFull.slide || slideFull),
            }

            const isPartnershipSlide = (
              slide.slideCode || slide.customSlideType
            ).includes('_PPH')
            if (!isPartnershipSlide) return true

            const CatrgorySlideCount = enabledSlides.filter(
              ({ slideCategory }) => slideCategory == slide.slideCategory,
            ).length
            return CatrgorySlideCount > 1
          })
        }
      },

    enabledDynamicSlidesByPresentationId:
      (state, getters) => (presentationId) => {
        const slides =
          getters.getEnabledSlidesByPresentationId({ presentationId }) || []

        return slides.filter(({ slide }) => slide.slideType === 'DYNAMIC')
      },

    enabledSlideNumber:
      (state, getters) =>
      ({ presentationId, slideId, hyperLink, clientName }) => {
        const enabledSlides = getters.getDisplayedSlidesByPresentationId({
          presentationId,
          hyperLink,
          clientName,
        })

        if (enabledSlides)
          return (
            enabledSlides.findIndex(
              (slide) =>
                (slide.slideId ||
                  slide.slide?.prePopulatedSlide ||
                  slide.prePopulatedSlide) === slideId,
            ) + 1
          )
      },

    enabledSlideNumberPerCategory:
      (state, getters) =>
      ({ presentationId, hyperLink, slideCategory, clientName }) => {
        const enabledSlides = getters.getDisplayedSlidesByPresentationId({
          presentationId,
          hyperLink,
          clientName,
        })

        if (enabledSlides)
          return enabledSlides.findIndex(
            (slide) => slide.slideCategory === slideCategory,
          )
      },

    getslideContentBySlideId:
      (state, getters) =>
      ({ presentationId, prePopulatedSlide, hyperLink, clientName }) => {
        const slides = hyperLink
          ? getters.getSlidesByHyperLink(clientName, hyperLink)
          : getters.getSlidesByPresentationId(presentationId)

        const slide = slides?.find(
          (slide) =>
            slide.slide?.prePopulatedSlide === prePopulatedSlide ||
            slide.prePopulatedSlide === prePopulatedSlide,
        )

        const slideContent = slide?.slide?.slideContent || slide?.slideContent

        return slideContent
          ? JSON.parse(slideContent)
          : defaultSlideContents[prePopulatedSlide]
      },

    getSlideContentByRoute:
      (state, getters) =>
      ({ route, slideId }) => {
        const slideContent = getters.getslideContentBySlideId({
          presentationId: route.params.presentationId,
          prePopulatedSlide: route.params.slideId || slideId,
          hyperLink: route.params.hyperLink,
          clientName: route.params.clientName?.replace('-', ' '),
        })

        return slideContent
      },

    getSlideBySlideId: (state, getters) => (payload) => {
      const slides = getters.getSlidesByPresentationId(payload.presentationId)

      const slide = slides?.find(
        (slide) => slide.slide.prePopulatedSlide === payload.prePopulatedSlide,
      )

      return slide?.slide
    },
    getCustomerNameByPresentationId: (state) => (presentationId) => {
      const presentation = state.myRfps.find(
        (presentation) => presentation.presentationId === presentationId,
      )

      return presentation?.customerName
    },

    getInputedStepsCounts: (state, getters) => (presentationId) => {
      const { department } = getters.getPresentationById(presentationId)
      const wizardSteps = [
        'update_PRESENTATION',
        'internal_USER',
        'slide_INFOS',
        'builders',
        'link',
        ...rfpInformationFieldNames(department),
      ]

      const editedVersions = wizardSteps.filter((step) =>
        getters.getInputProgressByPresentationId(presentationId, step),
      )
      return {
        editedCount: editedVersions.length,
        totalSteps: wizardSteps.length,
      }
    },

    getInputProgressByPresentationId:
      (state, getters) => (presentationId, versionKey) => {
        const presentation = getters.getPresentationById(presentationId)
        if (presentation) {
          if (versionKey == 'builders') {
            const editedSlides = presentation.slides.filter(
              ({ slide }) => slide.version > 0,
            )
            return editedSlides.length > 0
          } else if (
            versionKey == 'internalUserDetails' ||
            versionKey == 'tier'
          ) {
            const userVersion = presentation.presentationVersions.internal_USER
            const tierVersion = presentation.presentationVersions.tier
            return userVersion > 0 || tierVersion > 0
          } else if (versionKey == 'slides') {
            const slideInfosVersion =
              presentation.presentationVersions.slide_INFOS
            const enabledSlides = presentation.slides.filter(
              ({ isEnabled }) => isEnabled,
            )
            return slideInfosVersion > 0 || enabledSlides.length > 0
          } else if (versionKey == 'update_PRESENTATION') {
            const updatePresentaionVersion =
              presentation.presentationVersions.update_PRESENTATION
            const isEdited = Boolean(
              presentation.customerProblem || presentation.contact?.length > 0,
            )
            return updatePresentaionVersion > 0 || isEdited
          } else if (versionKey == 'link') {
            return presentation.publicationCount > 0
          } else if (
            versionKey == 'customerOverview' ||
            versionKey === 'contact'
          ) {
            return Boolean(presentation.customerName)
          }

          const informationIndex = rfpInformationIndex(
            versionKey,
            presentation.department,
          )
          const versionValue =
            presentation.presentationVersions[versionKey] ??
            presentation.presentationVersions.presentationInformation?.[
              informationIndex
            ]

          return versionValue > 0
        }
      },
    getLastBuilderPage: (state, getters) => (presentationId) => {
      const enabledDynamicSlides =
        getters.enabledDynamicSlidesByPresentationId(presentationId)

      const lastEnabledDynamicSlide =
        enabledDynamicSlides[enabledDynamicSlides.length - 1]

      return lastEnabledDynamicSlide?.slide.prePopulatedSlide || 'INTRO1'
    },
  },

  mutations: {
    setMyRfps(state, myRfps) {
      state.myRfps = myRfps.sort((rfp1, rfp2) =>
        rfp2.lastUpdatedDate?.localeCompare(rfp1.lastUpdatedDate),
      )
    },

    setPublishedLinks(state, payload) {
      state.publishedLinks = payload.sort((link1, link2) =>
        link2.updatedDate?.localeCompare(link1.updatedDate),
      )
    },

    // eg. use case when slides is assigned for presentation from template
    setPresentationSlide(state, { presentationId, templateSlides }) {
      const presentation = state.myRfps.find(
        (presentation) => presentation.presentationId === presentationId,
      )

      const correspondingTemplateSlide = (rfpSlide) =>
        templateSlides.find(
          (templateSlide) =>
            templateSlide.slide.prePopulatedSlide ===
            rfpSlide.slide.prePopulatedSlide,
        )

      presentation.slides.forEach((rfpSlide) => {
        rfpSlide.isEnabled = Boolean(
          correspondingTemplateSlide(rfpSlide)?.isEnabled,
        )
      })
    },

    setCurrentRfp(state, payload) {
      state.currentRfp = cloneDeep(payload)
    },

    updateRfp(state, updatedRfp) {
      const tempRfps = state.myRfps.filter(
        ({ presentationId }) => presentationId !== updatedRfp.presentationId,
      )

      const oldRfp =
        state.myRfps.find(
          ({ presentationId }) => presentationId === updatedRfp.presentationId,
        ) || {}

      const internalUserDetails = updatedRfp.internalUserDetails || []

      saveUserIds(internalUserDetails, oldRfp?.internalUserDetails)

      const fullUpdatedRfp = cloneDeep({
        ...oldRfp,
        ...updatedRfp,
        internalUserDetails,
      })

      tempRfps.push(fullUpdatedRfp)

      state.myRfps = tempRfps.sort((rfp1, rfp2) =>
        rfp2.lastUpdatedDate?.localeCompare(rfp1.lastUpdatedDate),
      )
    },

    updateLink(state, updatedLink) {
      const tempRfpLinks = state.publishedLinks.filter(
        ({ id }) => id !== updatedLink.id,
      )
      tempRfpLinks.push(updatedLink)
      state.publishedLinks = tempRfpLinks.sort((link1, link2) =>
        link2.updatedDate?.localeCompare(link1.updatedDate),
      )
    },

    // slide Id param
    toggleSlideSelection(state, payload) {
      const rfp = state.myRfps.find(
        (rfp) => rfp.presentationId == payload.presentationId,
      )
      const slide = rfp.slides.find(
        (slide) =>
          slide.slideInfoId === payload.slideId ||
          slide.slide.prePopulatedSlide == payload.slideId,
      )

      if (slide) {
        slide.isEnabled = !slide.isEnabled
      }
      gaEvent({
        action: 'builder-toggle-slide-selection-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-builder-toggle-slide-selection-btn',
      })
    },

    toggleSlideStarred(state, payload) {
      const rfp = state.myRfps.find(
        (rfp) => rfp.presentationId == payload.presentationId,
      )
      const slide = rfp.slides.find(
        (slide) =>
          slide.slideInfoId === payload.slideId ||
          slide.slide.prePopulatedSlide == payload.slideId,
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

    switchSlideSelection(state, { presentationId, slideCode, isEnabledValue }) {
      const rfp = state.myRfps.find(
        (rfp) => rfp.presentationId == presentationId,
      )
      const slide = rfp.slides.find(
        (slide) =>
          slide.slideCode === slideCode ||
          slide.slide.prePopulatedSlide === slideCode,
      )

      if (slide) {
        slide.isEnabled = isEnabledValue
      }
    },

    roleUpdate(state, payload) {
      if (payload.role === 'EDITOR' || payload.role === 'VIEWER') {
        let presentation = state.myRfps.find(
          (presentation) =>
            presentation.presentationId === payload.presentationId,
        )
        let sharedWith = presentation.internalUserDetails.find(
          (sharedWith) =>
            sharedWith.internalUserId ===
            payload.internalTeamDetail.internalUserId,
        )
        sharedWith.role = payload.role
      }
      if (payload.role === 'NONE') {
        let presentation = state.myRfps.find(
          (presentation) =>
            presentation.presentationId === payload.presentationId,
        )
        let sharewith = presentation.internalUserDetails.findIndex(
          (sharedWith) =>
            sharedWith.internalUserDetails ===
            payload.internalTeamDetail.internalUserId,
        )
        presentation.internalUserDetails.splice(sharewith, 1)
      }
    },
    setSlideContentUpdate(state, payload) {
      let presentation = state.myRfps.find(
        (presentation) =>
          presentation.presentationId === payload.presentationId,
      )
      let slides = presentation.slides
      let slide = slides.find(
        (slide) => slide.slide.prePopulatedSlide === payload.prePopulatedSlide,
      ).slide

      slide.slideContent = payload.slideContent

      slide.slideContent = payload.slideContent || slide.slideContent
      slide.customSlideType = payload.customSlideType || slide.customSlideType
      slide.slideType = payload.slideType || slide.slideType
      slide.version = payload.version || slide.version
    },
    deleteRow(state, presentationId) {
      const rfpIndex = state.myRfps.findIndex(
        (rfp) => rfp.presentationId === presentationId,
      )
      state.myRfps.splice(rfpIndex, 1)
    },
    deleteLink(state, linkId) {
      const publishedLinkIndex = state.publishedLinks.findIndex(
        (publishedLink) => publishedLink.id === linkId,
      )
      state.publishedLinks.splice(publishedLinkIndex, 1)
    },
    updatePresentationVersions(
      state,
      {
        presentationId,
        presentationVersions,
        internalUserDetails,
        slides,
        versionKey,
      },
    ) {
      const presentation = state.myRfps.find(
        (presentation) => presentation.presentationId === presentationId,
      )

      const versionKeys = {
        'customer-name': 'customerName',
        'internal-team': 'internal_USER',
      }
      if (versionKey === KEY_SLIDE_INFO) {
        presentation.slides.forEach((slide) => {
          const newVersion = slides.find(
            ({ slideInfoId }) => slideInfoId === slide.slideInfoId,
          ).version
          // todo: preformance, update slide version only for updated slide
          if (slide.version !== newVersion) slide.version = newVersion
        })
      } else if (versionKeys[versionKey]) {
        presentation.presentationVersions[versionKeys[versionKey]] =
          presentationVersions[versionKeys[versionKey]]
      } else {
        const currentVersion =
          presentationVersions.presentationInformation[versionKey]

        presentation.presentationVersions.presentationInformation[versionKey] =
          currentVersion
      }

      if (versionKey === 'internal-team')
        saveUserIds(presentation.internalUserDetails, internalUserDetails)
    },
  },

  actions: {
    async createRfp({ commit, dispatch, rootGetters }, payload) {
      gaEvent({
        action: 'create-presentation',
        event_category: 'presentation',
        event_label: 'User-create-presentation',
      })

      const customerNameIsInvalid = /[-/:?#[\]@!$&'()*+,;=\\]+/.test(
        payload.customerName,
      )
      if (customerNameIsInvalid)
        throw `Customer Name Contains Invalid Values: ${payload.customerName}`

      const department = getCurrentDepartment(rootGetters)

      const initialInformationList = {
        TRAUMA: ['INFORMATION1', 'INFORMATION2'],
        ASC: ['INFORMATION1'],
      }

      const informationInputValue = (informationType) =>
        payload[rfpInformationField(informationType, department)]

      const informationList = initialInformationList[department]
        .filter(informationInputValue)
        .map((informationType) => ({
          informationType,
          data:
            typeof informationInputValue(informationType) === 'string'
              ? informationInputValue(informationType)
              : JSON.stringify(informationInputValue(informationType)),
        }))

      let rfp = await createRfp(
        {
          customerName: payload.customerName,
          informationList,
        },
        department,
      )
      rfp = processedPresentation(rfp)

      commit('updateRfp', rfp)

      commit('setCurrentRfp', emptyCurrentRfpDefault())

      const unsavedInternalUsersExist = payload.internalUserDetails?.length > 0
      if (unsavedInternalUsersExist) {
        const updatedRfp = JSON.parse(
          JSON.stringify({
            ...rfp,
            internalUserDetails: payload.internalUserDetails,
          }),
        )

        commit('updateRfp', updatedRfp)

        await dispatch('saveRfpChanges', {
          presentationId: rfp.presentationId,
          updateType: 'internalUserDetails',
        })
      }

      return rfp
    },
    async deleteRfp({ commit }, payload) {
      gaEvent({
        action: 'delete-presentation',
        event_category: 'presentation',
        event_label: 'User-delete-presentation',
        presentationIdParam: payload,
      })
      commit('deleteRow', payload)
      await deleteRfp(payload)
    },

    async saveRfpChanges(
      { getters, commit, rootGetters },
      { presentationId, updateType },
    ) {
      gaEvent({
        action: `save-presentation-changes-${updateType}`,
        event_category: 'presentation',
        event_label: 'User-save-presentation-changes',
        presentationIdParam: presentationId,
      })
      const presentation = getters.getPresentationById(presentationId)

      const customerNameIsInvalid = /[-/:?#[\]@!$&'()*+,;=\\]+/.test(
        presentation.customerName,
      )
      if (customerNameIsInvalid)
        throw `Customer Name Contains Invalid Values: ${presentation.customerName}`

      const updateRfpPayloads = getUpdateRfpPayloads(
        presentationId,
        presentation,
        updateType,
        rootGetters,
      )

      let updatedRfp
      for (const updateRfpPayload of updateRfpPayloads) {
        updatedRfp = await callUpdateRfp(
          { getters, commit, rootGetters },
          updateRfpPayload,
        )
      }

      return updatedRfp
    },

    async sharedWithAction(
      { commit, getters, dispatch },
      { presentationId, internalUserDetails },
    ) {
      gaEvent({
        action: 'share-with-action',
        event_category: 'presentation',
        event_label: 'User-share-with-action',
      })
      const presentation = getters.getPresentationById(presentationId)

      try {
        const updatedRfp = JSON.parse(
          JSON.stringify({
            ...presentation,
            internalUserDetails,
          }),
        )

        commit('updateRfp', updatedRfp)

        await dispatch('saveRfpChanges', {
          presentationId,
          updateType: 'internalUserDetails',
        })
      } catch (err) {
        console.error(err.response || err)
        throw err
      }
    },

    async shareWithUser({ getters, dispatch }, { presentationId, userDetail }) {
      gaEvent({
        action: 'share-with-user',
        event_category: 'presentation',
        event_label: 'User-share-with-user',
        presentationIdParam: presentationId,
      })
      const presentation = getters.getPresentationById(presentationId)

      try {
        await dispatch('sharedWithAction', {
          presentationId,
          internalUserDetails: [
            ...presentation.internalUserDetails,
            userDetail,
          ],
        })
      } catch (err) {
        console.error(err.response || err)
        throw err
      }
    },

    async fetchMyRfps(
      { commit, state, rootGetters },
      { limit, page, ownedByMe, sharedWithMe, isPublished } = {},
    ) {
      gaEvent({
        action: 'fetch-my-presentations',
        event_category: 'presentation',
        event_label: 'User-fetch-my-presentations',
      })
      try {
        const department = getCurrentDepartment(rootGetters)

        let myRfps = await getMyrfps({
          limit,
          page,
          ownedByMe,
          sharedWithMe,
          isPublished,
          department,
        })
        myRfps = myRfps.map((rfp) => processedPresentation(rfp, state))

        myRfps.sort((rfp1, rfp2) =>
          rfp2.lastUpdatedDate.localeCompare(rfp1.lastUpdatedDate),
        )
        myRfps.forEach((rfp) => commit('updateRfp', rfp))

        return { response: myRfps }
      } catch (err) {
        console.error('Cannot fetch rfps: ', err)
        return { err }
      }
    },

    async getMyRfpbyId({ commit, rootGetters }, presentationId) {
      gaEvent({
        action: 'get-my-presentation-byId',
        event_category: 'presentation',
        event_label: 'User-get-my-presentation-byId',
        presentationIdParam: presentationId,
      })

      try {
        let rfp = await getMyRfp(presentationId, { getters: rootGetters })

        rfp = processedPresentation(rfp)

        commit('updateRfp', rfp)
        return { rfp }
      } catch (err) {
        console.error('Error fetching Rfp ', err)
        return { err }
      }
    },

    async getMyRfpByToken(
      { commit, rootGetters },
      { presentationId, token, REQUEST_ID },
    ) {
      try {
        let rfp = await getMyRfpByToken(
          presentationId,
          token,
          { REQUEST_ID, REQUEST_TYPE: 'GET_PRESENTATION' },
          {
            getters: rootGetters,
          },
        )

        rfp = processedPresentation(rfp)

        commit('updateRfp', rfp)
        return { rfp }
      } catch (err) {
        console.error('Error fetching Rfp ', err)
        return { err }
      }
    },

    async getLinkByHyperLink({ commit }, { clientName, hyperLink }) {
      gaEvent({
        action: 'get-link-by-hyperLink',
        event_category: 'presentation',
        event_label: 'User-get-link-by-hyperLink',
      })
      try {
        const link = await getLinkByHyperLink(clientName, hyperLink)

        commit('updateLink', link)
        return { link }
      } catch (err) {
        console.error('Error fetching published link ', err)
        return { err }
      }
    },

    async getLinkByHyperLinkAndToken(
      { commit },
      { clientName, hyperLink, token, REQUEST_ID },
    ) {
      try {
        const link = await getLinkByHyperLinkAndToken(
          clientName,
          hyperLink,
          token,
          REQUEST_ID,
        )

        commit('updateLink', link)
        return { link }
      } catch (err) {
        console.error('Error fetching published link ', err)
        return { err }
      }
    },

    async syncLink({ commit }, id) {
      try {
        const link = await syncLink(id)
        commit('updateLink', link)
      } catch (err) {
        console.error('Error syncing link ', err)
        return { err }
      }
    },

    async getPublishedLinks({ commit, rootGetters }, { limit, page } = {}) {
      gaEvent({
        action: 'get-published-link',
        event_category: 'presentation',
        event_label: 'User-get-published-link',
      })
      try {
        const department = getCurrentDepartment(rootGetters)

        const links = await getPublishedLinks(department, limit, page)
        links.forEach((link) => commit('updateLink', link))

        return { links }
      } catch (err) {
        console.error('Error fetching published links ', err)
        return { err }
      }
    },

    async deletePublishLink({ commit }, payload) {
      gaEvent({
        action: 'delete-published-link',
        event_category: 'presentation',
        event_label: 'User-delete-published-link',
      })
      try {
        commit('deleteLink', payload)
        await deletePublishLink(payload)
      } catch (err) {
        console.error('Error delete published links ', err)
        return { err }
      }
    },

    async updateDraftLocal({ commit }, payload) {
      gaEvent({
        action: 'update-draft-local',
        event_category: 'presentation',
        event_label: 'User-update-draft-local',
        presentationIdParam: payload.presentationId,
      })
      commit('setSlideContentUpdate', {
        presentationId: payload.presentationId,
        prePopulatedSlide: payload.prePopulatedSlide,
        slideContent: payload.content,
      })
    },

    async updateSlideContent({ commit, getters }, payload) {
      gaEvent({
        action: 'update-draft-content',
        event_category: 'presentation',
        event_label: 'User-update-draft-content',
        presentationIdParam: payload.presentationId,
      })

      const { version, slideId } = getters.getSlideBySlideId({
        presentationId: payload.presentationId,
        prePopulatedSlide: payload.prePopulatedSlide,
      })
      const updateDraftBody = {
        content: payload.content,
        presentationId: payload.presentationId,
        slideId,
        version: (version || 0) + 1,
      }

      try {
        commit('setSlideContentUpdate', {
          presentationId: payload.presentationId,
          prePopulatedSlide: payload.prePopulatedSlide,
          slideContent: payload.content,
        })

        const updatedSlide = await updateSlideContent(updateDraftBody)
        updatedSlide.presentationId = payload.presentationId
        commit('setSlideContentUpdate', updatedSlide)

        return updatedSlide
      } catch (err) {
        console.error('Cannot update the Draft: ', err)
        throw err.message || err
      }
    },

    async saveSlideInfoChanges(
      { getters, commit, rootGetters },
      { presentationId },
    ) {
      const presentation = () => getters.getPresentationById(presentationId)

      const rfpSlidesPayload = presentation().slides.map((slide) => ({
        isEnabled: slide.isEnabled,
        pageNumber: slide.slideNumber,
        slideCategory: slide.slideCategory,
        slideInfoId: slide.slideInfoId,
      }))

      const updatedSlides = await updateSlideInfo(rfpSlidesPayload, {
        getters: rootGetters,
      })
      commit('updateRfp', {
        ...presentation(),
        slides: updatedSlides,
      })

      return presentation()
    },
  },
}
function getAdditionaPayloadsPerField(
  payloadsPerField,
  presentation,
  editIsDisallowed,
) {
  return {
    clinicalExcellence: [payloadsPerField.slides],
    economicValueCapabilities: [payloadsPerField.slides],
    operationalSupportCapabilities: [payloadsPerField.slides],
    slideSelection: [payloadsPerField.slides],
    internalUserDetails: [
      presentation.department === 'TRAUMA'
        ? payloadsPerField.tier
        : payloadsPerField.team,
    ],
    contact: [payloadsPerField.customerName, payloadsPerField.customerProblem],
    customerOverview: editIsDisallowed.value
      ? []
      : [payloadsPerField.customerName, payloadsPerField.internalUserDetails],
  }
}

function getPayloadsPerField(presentation) {
  return {
    customerName: {
      key: 'customer-name',
      versionKey: 'customerName',
      payload: {
        customerName: presentation.customerName,
      },
    },
    internalUserDetails: {
      key: 'internal-team',
      versionKey: 'internal_USER',
      payload: {
        internalTeamDetailList: filterInternalTeams(
          presentation.internalUserDetails,
        ),
      },
    },
    slides: {
      key: 'slide-info',
      payload: {
        updateSlideInfoRequestList: presentation.slides.map((slide) => ({
          isEnabled: slide.isEnabled,
          pageNumber: slide.slideNumber || slide.pageNumber,
          slideCategory: slide.slideCategory,
          slideInfoId: slide.slideInfoId,
          version: (slide.version || 1) + 1,
        })),
      },
    },
    contact: {
      key: KEY_UPDATE_INFO,
      presentationInformation: 'contact',
      informationListData: presentation.contact?.filter(
        (contactItem) =>
          contactItem.email || contactItem.name || contactItem.role,
      ),
    },
  }
}
