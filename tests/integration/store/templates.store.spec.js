/*eslint-env node, jest, amd*/
import { getNewStore } from './setupStore.js'

import {
  createTemplate,
  updateTemplate,
  getTemplate,
  shareTemplate,
  deleteTemplate,
} from '@/api/templates.api'
import {
  getTemplates,
  getCreateTemplate,
  getShareTemplate,
  getUpdatedTemplate,
  getAllTemplatesForUpdate,
} from '../../__data__/templates/sampleTemplateData'
import { useAllDepartmentSlides, groupSlides } from '@/data/allSlides'
import { mockUserDetail } from '../../__data__/auth/authData.js'

jest.mock('@/api/user.api')
jest.mock('@/api/templates.api')
jest.mock('@/api/pingIdAuth')

function getMyTemplates(store) {
  const templates = store.getters['templates/myTemplates']
  return templates
}

function getAllTemplates(store) {
  const templates = store.getters['templates/allTemplates']
  return templates
}

async function dispatchFetchTemplates(store) {
  const templates = await store.dispatch('templates/fetchTemplates')
  return templates
}

function getTemplateByID(store, templateId) {
  const template = store.getters['templates/getTemplateByID'](templateId)
  return template
}

const testTemplateId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

for (const dep of ['ASC', 'TRAUMA']) {
  let store = getNewStore()
  describe(`templates store module spec ${dep}`, () => {
    beforeAll(() => {
      store.commit('setting/setCurrentDepartment', dep)
    })
    afterEach(() => {
      store.commit('templates/setTemplates', [])
      store.commit('templates/setMyTemplates', [])
      store.commit('templates/editTemplates', {})
    })

    it('should get empty templates', () => {
      const templates = store.getters['templates/templates']
      expect(templates).toEqual([])
    })

    it('should get new template slides', () => {
      const slides = store.getters['templates/getNewTemplateSlides']
      const { allDepartmentSlides } = useAllDepartmentSlides(dep)
      expect(slides).toEqual(allDepartmentSlides.value)
    })

    it('should get empty my templates', () => {
      const myTemplates = getMyTemplates(store)
      expect(myTemplates).toEqual([])
    })

    it('should get empty all templates', () => {
      const allTemplates = getAllTemplates(store)
      expect(allTemplates).toEqual([])
    })

    it('should set initialSlide', () => {
      store.dispatch('templates/initialSlide')
      const slides = store.getters['templates/getNewTemplateSlides']

      const { allDepartmentSlides } = useAllDepartmentSlides(dep)
      expect(slides).toEqual(allDepartmentSlides.value)
    })

    it('should sharedWithAction', async () => {
      await dispatchFetchTemplates(store)

      const payload = getShareTemplate(dep)
      payload.templateId = testTemplateId
      await store.dispatch('templates/sharedWithAction', payload)
      expect(shareTemplate).toBeCalledWith(payload)
      const allTemplates = getAllTemplates(store)
      const received = allTemplates.find(
        (f) =>
          f.templateId === testTemplateId && f.owner === mockUserDetail.email,
      )
      expect(received.internalUserDetails).toEqual(payload.internalUserDetails)
    })

    it('should shareWithUser with "EDITOR" role', async () => {
      await dispatchFetchTemplates(store)

      const payload = {
        templateId: testTemplateId,
        role: 'EDITOR',
        internalTeamDetail: {
          internalUserId: 'internalUserId',
        },
      }
      await store.dispatch('templates/shareWithUser', payload)
      const args = {
        internalTeamDetailList: [
          { ...payload.internalTeamDetail, role: payload.role },
        ],
        templateId: payload.templateId,
      }
      expect(shareTemplate).toBeCalledWith(args)
      const allTemplates = getAllTemplates(store)
      const received = allTemplates.find(
        (f) =>
          f.templateId === testTemplateId && f.owner === mockUserDetail.email,
      )
      const shareWith = received.internalUserDetails.find(
        (f) => f.internalUserId === payload.internalTeamDetail.internalUserId,
      )
      expect(shareWith.role).toEqual(payload.role)
    })

    it('should shareWithUser with "NONE" role', async () => {
      await dispatchFetchTemplates(store)

      const payload = {
        templateId: testTemplateId,
        role: 'NONE',
        internalTeamDetail: {
          internalUserId: 'internalUserId',
        },
      }
      await store.dispatch('templates/shareWithUser', payload)
      const args = {
        internalTeamDetailList: [
          { ...payload.internalTeamDetail, role: payload.role },
        ],
        templateId: payload.templateId,
      }
      expect(shareTemplate).toBeCalledWith(args)
      const allTemplates = getAllTemplates(store)

      const received = allTemplates.find(
        (f) =>
          f.templateId === testTemplateId && f.owner === mockUserDetail.email,
      )
      const shareWith = received.internalUserDetails.find(
        (f) => f.internalUserId === payload.internalTeamDetail.internalUserId,
      )
      expect(shareWith).toEqual(undefined)
    })

    it('should roleUpdate with "EDITOR" role', async () => {
      await dispatchFetchTemplates(store)

      const payload = {
        templateId: testTemplateId,
        role: 'EDITOR',
        internalTeamDetail: {
          internalUserId: 'internalUserId',
        },
      }
      await store.commit('templates/roleUpdate', payload)
      const allTemplates = getAllTemplates(store)
      const received = allTemplates.find(
        (f) =>
          f.templateId === testTemplateId && f.owner === mockUserDetail.email,
      )
      const shareWith = received.internalUserDetails.find(
        (f) => f.internalUserId === payload.internalTeamDetail.internalUserId,
      )
      expect(shareWith.role).toEqual(payload.role)
    })

    it('should fetch templates', async () => {
      await store.dispatch('auth/fetchUserDetail')
      const ownerEmail = mockUserDetail.email
      await dispatchFetchTemplates(store)
      const myTemplates = getMyTemplates(store).map((temp) => ({
        ...temp,
        numberOfSlides: temp.slides.filter((slide) => slide.isEnabled).length,
      }))

      const expectedMy = getTemplates(dep)
        .filter((temp) => temp.owner === ownerEmail)
        .map((temp) => ({
          ...temp,
          numberOfSlides: temp.slides.filter((slide) => slide.isEnabled).length,
        }))
      expect(myTemplates).toEqual(
        expectedMy.sort((t1, t2) => (t1.updatedOn > t2.updatedOn ? -1 : 1)),
      )

      const templates = store.getters['templates/templates']
      const expected = getTemplates(dep)
        .filter((temp) => temp.owner !== ownerEmail)
        .map((temp) => ({
          ...temp,
          numberOfSlides: temp.slides.filter((slide) => slide.isEnabled).length,
        }))
      expect(templates).toEqual(expected)
    })

    it('should getTemplate', async () => {
      const templateId = getAllTemplatesForUpdate()[0].templateId
      await store.dispatch('templates/getTemplate', templateId)
      expect(getTemplate).toBeCalledWith(templateId)
      const editTemplate =
        store.getters['templates/getEditTemplatesById'](templateId)

      const expectedTemplate = getAllTemplatesForUpdate().find(
        (template) => template.templateId == templateId,
      )
      expectedTemplate.slides.sort((a, b) => a.pageNumber - b.pageNumber)
      expectedTemplate.groupedSlides = groupSlides(expectedTemplate.slides)

      expect(editTemplate).toMatchObject(expectedTemplate)
      const recievedTemplate = getTemplateByID(store, templateId)

      expect(expectedTemplate).toMatchObject(recievedTemplate)
    })

    it('should createTemplate', async () => {
      const templateToBeCreated = {
        templateId: '2539cef5-542e-4922-a1d1-e58c4841cc54',
        templateName: 'asasasasd',
        templateDescription: 'asasdasdasdasda',
        updatedOn: '2021-07-26',
        owner: mockUserDetail.email,
        slides: [
          {
            isEnabled: false,
            slideCategory: 'INTRODUCTION',
            pageNumber: 1,
            slideInfoId: 'test1',
            slide: {
              slideType: 'DYNAMIC',
              slideContent: '',
              prePopulatedSlide: 'APPD1',
            },
          },
          {
            isEnabled: false,
            slideCategory: 'INTRODUCTION',
            pageNumber: 2,
            slideInfoId: 'test1',
            slide: {
              slideType: 'DYNAMIC',
              slideContent: '',
              prePopulatedSlide: 'APPD2',
            },
          },
        ],
        bookmarked: false,
      }
      await store.dispatch('templates/createTemplate', templateToBeCreated)
      const args = {
        slideInfos: [
          {
            isEnabled: false,
            pageNumber: 1,
            slideCategory: 'INTRODUCTION',
            slideCode: 'APPD1',
          },
          {
            isEnabled: false,
            pageNumber: 2,
            slideCategory: 'INTRODUCTION',
            slideCode: 'APPD2',
          },
        ],
        templateName: 'asasasasd',
        templateDescription: 'asasdasdasdasda',
      }
      expect(createTemplate).toHaveBeenLastCalledWith(args, dep)
      const templates = getMyTemplates(store)
      expect(templates.length).toEqual(1)
      expect(templates[0]).toMatchObject({ ...getCreateTemplate(), ...args })
    })

    it('should delTemplate', async () => {
      await dispatchFetchTemplates(store)
      const templateToBeDeleted = testTemplateId
      const templates = getAllTemplates(store)
      expect(templates.length).toEqual(2)
      const beforeDeleted = templates.find(
        (f) => f.templateId === templateToBeDeleted,
      )
      expect(beforeDeleted).toBeDefined()

      await store.dispatch('templates/delTemplate', templateToBeDeleted)
      expect(deleteTemplate).toBeCalledWith(templateToBeDeleted)
      const templates_after_delete = getAllTemplates(store)
      expect(templates_after_delete.length).toEqual(1)
      const deleted = templates_after_delete.find(
        (f) => f.templateId === templateToBeDeleted,
      )
      expect(deleted).toEqual(undefined)
    })

    it('should updateTemplate', async () => {
      const templateToBeUpdated = {
        templateId: testTemplateId,
        templateName: 'asasasasd',
        templateDescription: 'asasdasdasdasda',
        updatedOn: '2021-07-26',
        ownerId: '26bf9c9c-2f5d-4ca7-b65f-e39354715e4d',
        slides: [
          {
            isEnabled: false,
            slideCategory: 'INTRODUCTION',
            pageNumber: 1,
            slideInfoId: 'test1',
            slide: {
              slideType: 'DYNAMIC',
              slideContent: '',
              prePopulatedSlide: 'APPD1',
            },
          },
          {
            isEnabled: false,
            slideCategory: 'INTRODUCTION',
            pageNumber: 2,
            slideInfoId: 'test1',
            slide: {
              slideType: 'DYNAMIC',
              slideContent: '',
              prePopulatedSlide: 'APPD2',
            },
          },
        ],
        bookmarked: false,
      }
      await store.dispatch('templates/updateTemplate', templateToBeUpdated)
      const args = {
        bookmarked: templateToBeUpdated.bookmarked,
        templateId: templateToBeUpdated.templateId,
        slideInfos: templateToBeUpdated.slides,
        templateName: templateToBeUpdated.templateName,
        templateDescription: templateToBeUpdated.templateDescription,
      }
      expect(updateTemplate).toBeCalledWith(args)

      const editTemplate = store.getters['templates/getEditTemplatesById'](
        templateToBeUpdated.templateId,
      )
      const expected = getUpdatedTemplate()
      expected.groupedSlides = { Category1: expected.slides }
      expect(editTemplate).toEqual(expected)
      const recievedTemplate = getTemplateByID(
        store,
        templateToBeUpdated.templateId,
      )

      expect(recievedTemplate).toEqual(getUpdatedTemplate())
    })

    it('should changeBookmarkState', async () => {
      await dispatchFetchTemplates(store)

      const templates_before = getAllTemplates(store)
      const template = templates_before.find(
        (f) => f.templateId === testTemplateId,
      )
      expect(template.bookmarked).toEqual(true)
      await store.dispatch('templates/changeBookmarkState', testTemplateId)
      const templates_after = getAllTemplates(store)
      const template_after = templates_after.find(
        (f) => f.templateId === testTemplateId,
      )
      expect(template_after.bookmarked).toEqual(false)
    })

    it('should getTemplateByID', async () => {
      await dispatchFetchTemplates(store)

      const templatebyID = getTemplateByID(store, testTemplateId)
      const expected = getTemplates(dep).find(
        (f) => (f.templateId = testTemplateId),
      )
      expected.numberOfSlides = 2
      expect(templatebyID).toEqual(expected)
    })
  })
}
