/*eslint-env node, jest, amd*/
import { getNewStore } from './setupStore.js'
import {
  createRfp,
  deleteRfp,
  updateRfp,
  getMyRfp,
  updateSlideContent,
  updateSlideInfo,
} from '@/api/rfps.api'

import {
  getPublishedLinks,
  getLinkByHyperLink,
  getLinkByHyperLinkAndToken,
  syncLink,
  deletePublishLink,
} from '@/api/link.api'
import { getShareRfpPayload, getMyRfps } from '@tests/__data__/rfps/sampleRfps'
import { getLinkResponse } from '@tests/__data__/link/linkData'

import { getPublishedLinksJson } from '../../__data__/rfps/sampleLinks'
import { mockUserDetail } from '../../__data__/auth/authData.js'
import defaultSlideContents from '@/data/defaultSlideContent.js'
import { getUpdateRfpPayloads } from '@/store/modules/rfps.store.js'
import {
  traumaRfpInformationField,
  DEPARTMENTS_DATA,
  hideConsoleErrorOnce,
} from '@tests/integration/views/testUtils'

jest.mock('@/api/user.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/link.api')
jest.mock('@/api/pingIdAuth')

function storeGetMyRfps(store) {
  const response = store.getters['rfps/myRfps']
  return response
}

async function dispatchFetchMyRfps(store) {
  const response = await store.dispatch('rfps/fetchMyRfps')
  return response
}

function getPresentationById(store, presentationId) {
  const response = store.getters['rfps/getPresentationById'](presentationId)
  return response
}

function storeGetPublishedLinks(store) {
  const response = store.getters['rfps/getPublishedLinks']
  return response
}

async function dispatchGetPublishedLinks(store, payload) {
  const response = await store.dispatch('rfps/getPublishedLinks', payload)
  return response
}

function getInputProgressByPresentationId(store, pid, versionKey) {
  const response = store.getters['rfps/getInputProgressByPresentationId'](
    pid,
    versionKey,
  )
  return response
}

for (const dep of ['ASC', 'TRAUMA']) {
  const store = getNewStore()
  const sampleLink = getLinkResponse(dep)

  describe(`rfps store spec ${dep}`, () => {
    beforeAll(() => {
      store.commit('setting/setCurrentDepartment', dep)
    })

    afterEach(() => {
      store.commit('rfps/setMyRfps', [])
      store.commit('rfps/setPublishedLinks', [])
    })

    it('should get empty myRfps', () => {
      const myRfps = storeGetMyRfps(store)
      expect(myRfps).toEqual([])
    })

    // actions tests
    it('should fetch myRfps from api', async () => {
      const result = await dispatchFetchMyRfps(store)

      result.response.forEach((rfp) => {
        expect(rfp.slides.length).toBeGreaterThan(0)
      })

      const myRfps = storeGetMyRfps(store)
      expect(myRfps).toEqual(result.response)

      // latest rfps should be first
      expect(Date.parse(myRfps[0].lastUpdatedDate)).toBeGreaterThan(
        Date.parse(myRfps[1].lastUpdatedDate),
      )
    })

    it('should create Rfps with valid customer name', async () => {
      const rfpsToCreate = {
        TRAUMA: {
          customerName: 'new customer 12',
          contact: [
            {
              name: 'Contact 12',
              role: 'COO',
              email: 'contact12@depuy.com',
            },
          ],
          customerProblem: 'new customerProblem 12',
        },
        ASC: {
          customerName: 'new customer 13',
          customerOverview: {
            customerUcn: '',
            customerAddress: '',
            classOfTr3000: { selection: '' },
            ascJourney: '',
            onWinGrowServeList: { selection: '' },
            ownershipStructure: {
              physicianOwned: '',
              hospitalOwned: '',
              mgmtGroupOwned: '',
              medicare: '',
              private: '',
            },
            hospital: '',
            ascSpeciality: '',
            contractInPlace: {
              jointReconstuction: '',
              spine: '',
              sportsMedicine: '',
              traumaAndExtremities: '',
              help: '',
            },
            ownerShipAndBoard: {
              ownership: [
                {
                  title: 'HOSPITAL',
                  amount: 2,
                  names: 'df',
                },
                {
                  title: 'MANAGEMENT COMPANY / CHAIN',
                  amount: 2,
                  names: 'dfd',
                },
                {
                  title: 'PHYSICIANS',
                  amount: 2,
                  names: 'df',
                },
              ],
              board: [
                {
                  title: 'NUMBER OF SEATS ON THE BOARD ?',
                  structure: 'sdf',
                },
                {
                  title: 'WHO HOLDS THE MAJORITY ?',
                  structure: 'df',
                },
                {
                  title: 'WHO IS THE ANESTHESIA GROUP ?',
                  structure: 'sdfff',
                },
              ],
              specialities: [
                {
                  title: 'JOINT RECONSTRUCTION',
                  number: 3,
                  names: '',
                  votingMembers: '',
                },
                {
                  title: 'UPPER EXTREMITY',
                  number: 2,
                  names: 'dfdf',
                  votingMembers: '',
                },
                {
                  title: 'FOOT & ANKLE / PODIATRY',
                  number: '',
                  names: '',
                  votingMembers: 'fdfdf',
                },
                {
                  title: 'SURGICAL SPORTS',
                  number: '',
                  names: '',
                  votingMembers: '',
                },
                {
                  title: 'SPINE',
                  number: '',
                  names: '',
                  votingMembers: '',
                },
                {
                  title: 'OTHER',
                  number: '',
                  names: '',
                  votingMembers: '',
                },
              ],
            },
          },
        },
      }

      const rfpToCreate = rfpsToCreate[dep]

      const resp = await store.dispatch('rfps/createRfp', rfpToCreate)

      const initialInformationList = {
        TRAUMA: ['INFORMATION1', 'INFORMATION2'],
        ASC: ['INFORMATION1'],
      }
      const informationListPayload = initialInformationList[dep].map(
        (informationType) => ({
          informationType,
          data:
            typeof rfpToCreate[
              traumaRfpInformationField(informationType, dep)
            ] === 'string'
              ? rfpToCreate[traumaRfpInformationField(informationType, dep)]
              : JSON.stringify(
                  rfpToCreate[traumaRfpInformationField(informationType, dep)],
                ),
        }),
      )

      expect(createRfp).toHaveBeenLastCalledWith(
        {
          customerName: rfpToCreate.customerName,
          informationList: informationListPayload,
        },
        dep,
      )

      const createdRfp = getPresentationById(store, resp.presentationId)

      expect(createdRfp.owner).toEqual(mockUserDetail.email)
      expect(createdRfp).toMatchObject(rfpToCreate)
    })

    it('should reject Rfps with invalid customer name', async () => {
      const invalidRfp = {
        customerName: '@#name',
      }
      const expectedError = `Customer Name Contains Invalid Values: ${invalidRfp.customerName}`
      hideConsoleErrorOnce(expectedError)

      try {
        await store.dispatch('rfps/createRfp', invalidRfp)
      } catch (e) {
        expect(e).toEqual(expectedError)
      }
    })

    it('should delete rfp by presentationId', async () => {
      await dispatchFetchMyRfps(store)
      const presentationId = DEPARTMENTS_DATA[dep].pid
      const initialRfpsLength = storeGetMyRfps(store).length

      await store.dispatch('rfps/deleteRfp', presentationId)

      expect(deleteRfp).toHaveBeenCalledWith(presentationId)
      const myRfps = storeGetMyRfps(store)
      expect(myRfps.length).toEqual(initialRfpsLength - 1)
      const index = myRfps.findIndex(
        (rfp) => rfp.presentationId === presentationId,
      )
      expect(index).toEqual(-1)
    })

    it('should update rfp with key', async () => {
      await dispatchFetchMyRfps(store)
      const presentationId = DEPARTMENTS_DATA[dep].pid

      const presentationState = () => getPresentationById(store, presentationId)

      const allUpdateTypes = {
        ALL_DEPARTMENTS: [
          {
            updateType: 'internalUserDetails',
            updateValues: {
              internalUserDetails: [
                {
                  email: 'peter@gmail.com',
                  firstName: 'Peter 1',
                  lastName: 'Lastname',
                  role: 'EDITOR',
                },
              ],
            },
          },
          {
            updateType: 'slides',
            updateValues: {
              slides: [],
            },
          },
        ],
        TRAUMA: [
          {
            updateType: 'contact',
            updateValues: {
              customerName: 'updated customer 12',
              contact: [{ email: 'email12', name: 'name12', role: 'role12' }],
              customerProblem: 'updated customerProblem 12',
            },
          },
          {
            updateType: 'stakeholders',
            updateValues: { stakeholders: [{ name: 'stake1' }] },
          },
          {
            updateType: 'discovery',
            updateValues: { discovery: [{ name: 'discovery1' }] },
          },
          {
            updateType: 'contract',
            updateValues: { contract: [{ name: 'contract1' }] },
          },
          {
            updateType: 'slideSelection',
            updateValues: { slideSelection: [{ name: 'slideSelection1' }] },
          },
        ],
        ASC: [
          {
            updateType: 'customerOverview',
            updateValues: {
              customerOverview: {
                customerUcn: 'UCNUPDATE',
                customerAddress: 'ADDR',
                classOfTr3000: { selection: '' },
                ascJourney: '',
                onWinGrowServeList: { selection: '' },
                ownershipStructure: {
                  physicianOwned: '',
                  hospitalOwned: '',
                  mgmtGroupOwned: '',
                  medicare: '',
                  private: '',
                },
                hospital: '',
                ascSpeciality: 'SPEC3',
                contractInPlace: {
                  jointReconstuction: '',
                  spine: '',
                  sportsMedicine: '',
                  traumaAndExtremities: '',
                  help: '',
                },
                ownerShipAndBoard: {
                  ownership: [
                    {
                      title: 'HOSPITAL',
                      amount: 2,
                      names: 'df',
                    },
                    {
                      title: 'MANAGEMENT COMPANY / CHAIN',
                      amount: 2,
                      names: 'dfd',
                    },
                    {
                      title: 'PHYSICIANS',
                      amount: 2,
                      names: 'df',
                    },
                  ],
                  board: [
                    {
                      title: 'NUMBER OF SEATS ON THE BOARD ?',
                      structure: 'sdf',
                    },
                    {
                      title: 'WHO HOLDS THE MAJORITY ?',
                      structure: 'df',
                    },
                    {
                      title: 'WHO IS THE ANESTHESIA GROUP ?',
                      structure: 'sdfff',
                    },
                  ],
                  specialities: [
                    {
                      title: 'JOINT RECONSTRUCTION',
                      number: 3,
                      names: '',
                      votingMembers: '',
                    },
                    {
                      title: 'UPPER EXTREMITY',
                      number: 2,
                      names: 'dfdf',
                      votingMembers: '',
                    },
                    {
                      title: 'FOOT & ANKLE / PODIATRY',
                      number: '',
                      names: '',
                      votingMembers: 'fdfdf',
                    },
                    {
                      title: 'SURGICAL SPORTS',
                      number: '',
                      names: '',
                      votingMembers: '',
                    },
                    {
                      title: 'SPINE',
                      number: '',
                      names: '',
                      votingMembers: '',
                    },
                    {
                      title: 'OTHER',
                      number: '',
                      names: '',
                      votingMembers: '',
                    },
                  ],
                },
              },
            },
          },
        ],
      }

      const updateTypes = [
        ...allUpdateTypes[dep],
        ...allUpdateTypes.ALL_DEPARTMENTS,
      ]

      for (const { updateType, updateValues } of updateTypes) {
        const updatedPresentation = {
          ...presentationState(),
          ...updateValues,
        }
        store.commit('rfps/updateRfp', updatedPresentation)

        await store.dispatch('rfps/saveRfpChanges', {
          presentationId,
          updateType,
        })

        const payloads = getUpdateRfpPayloads(
          presentationId,
          updatedPresentation,
          updateType,
          store,
        )
        payloads.forEach(({ key, payload }) => {
          if (updateType === 'slideSelection' || updateType === 'slides')
            expect(updateSlideInfo).toHaveBeenCalled()
          else
            expect(updateRfp).toHaveBeenCalledWith(
              key,
              payload,
              expect.anything(),
            )
        })

        expect(updatedPresentation).toMatchObject(presentationState())
      }
    })

    it('should share with action', async () => {
      await dispatchFetchMyRfps(store)
      const shareRfpPayload = getShareRfpPayload(dep)

      await store.dispatch('rfps/sharedWithAction', shareRfpPayload)

      const expectedApiPayload = expect.objectContaining({
        internalTeamDetailList: shareRfpPayload.internalUserDetails.filter(
          ({ role }) => role !== 'OWNER',
        ),
        presentationId: shareRfpPayload.presentationId,
      })

      expect(updateRfp).toBeCalledWith(
        'internal-team',
        expectedApiPayload,
        expect.anything(),
      )
      const rfp = getPresentationById(store, shareRfpPayload.presentationId)

      expect(rfp.internalUserDetails).toEqual(
        shareRfpPayload.internalUserDetails,
      )
    })

    it('should share with user with all roles', async () => {
      await dispatchFetchMyRfps(store)
      const usersToShareTo = [
        {
          email: 'peter@gmail.com',
          firstName: 'Peter 1',
          lastName: 'Lastname',
          role: 'EDITOR',
          userType: 'RM',
          shareRfp: true,
        },
        {
          email: 'peter1@gmail.com',
          firstName: 'Peter 2',
          lastName: 'Lastname2',
          role: 'NONE',
          userType: 'R M',
          shareRfp: false,
        },
        {
          email: 'peter2@gmail.com',
          firstName: 'Peter 3',
          lastName: 'Lastname3',
          role: 'VIEWER',
          userType: 'R M2',
          shareRfp: true,
        },
      ]

      for (const userDetail of usersToShareTo) {
        const shareWithUserPayload = {
          presentationId: DEPARTMENTS_DATA[dep].pid,
          userDetail,
        }
        const internalUserDetails = getPresentationById(
          store,
          shareWithUserPayload.presentationId,
        ).internalUserDetails.filter(({ role }) => role !== 'OWNER')

        await store.dispatch('rfps/shareWithUser', shareWithUserPayload)

        const expectedApiPayload = expect.objectContaining({
          internalTeamDetailList: [
            ...internalUserDetails,
            expect.objectContaining(shareWithUserPayload.userDetail),
          ],
          presentationId: shareWithUserPayload.presentationId,
        })

        expect(updateRfp).toHaveBeenCalledWith(
          'internal-team',
          expectedApiPayload,
          expect.anything(),
        )

        const pres = getPresentationById(
          store,
          shareWithUserPayload.presentationId,
        )
        const userInStore = pres.internalUserDetails.find(
          (user) => user.email === shareWithUserPayload.userDetail.email,
        )
        expect(userInStore).toEqual(shareWithUserPayload.userDetail)
      }
    })

    it('should get myRfp by Id', async () => {
      await dispatchFetchMyRfps(store)
      const preId = DEPARTMENTS_DATA[dep].pid
      const result = await store.dispatch('rfps/getMyRfpbyId', preId)
      expect(getMyRfp).toBeCalledWith(preId, expect.anything())
      const rfp = getMyRfps().find((f) => f.presentationId === preId)
      expect(result.rfp.presentationId).toEqual(rfp.presentationId)
      expect(result.rfp.ownerId).toEqual(rfp.ownerId)
      const myRfps = storeGetMyRfps(store)
      const myrfp = myRfps.find(
        (rfp_l) => rfp_l.presentationId === rfp.presentationId,
      )
      expect(myrfp.presentationId).toEqual(rfp.presentationId)
      expect(myrfp.ownerId).toEqual(rfp.ownerId)
    })

    it('should get LinkByHyperLink', async () => {
      const hyperLink = {
        clientName: 'Jhon Oliver',
        hyperLink: dep,
      }
      const { link } = await store.dispatch(
        'rfps/getLinkByHyperLink',
        hyperLink,
      )
      expect(link).toEqual(sampleLink)
      expect(getLinkByHyperLink).toBeCalledWith(
        hyperLink.clientName,
        hyperLink.hyperLink,
      )
      const publishedLinks = storeGetPublishedLinks(store)
      expect(publishedLinks).toEqual([sampleLink])
    })

    it('should get LinkByHyperLinkAndToken', async () => {
      const hyperLink = {
        clientName: 'Jhon Oliver',
        hyperLink: dep,
        token: 'sample_token_uuid',
        REQUEST_ID: 'id1',
      }
      const { link } = await store.dispatch(
        'rfps/getLinkByHyperLinkAndToken',
        hyperLink,
      )
      expect(link).toEqual(sampleLink)
      expect(getLinkByHyperLinkAndToken).toBeCalledWith(
        hyperLink.clientName,
        hyperLink.hyperLink,
        hyperLink.token,
        hyperLink.REQUEST_ID,
      )
      const publishedLinks = storeGetPublishedLinks(store)
      expect(publishedLinks).toEqual([sampleLink])
    })

    it('should syncLink', async () => {
      const id = dep
      await store.dispatch('rfps/syncLink', id)

      expect(syncLink).toBeCalledWith(id)
      const publishedLinks = storeGetPublishedLinks(store)
      expect(publishedLinks).toEqual([sampleLink])
    })

    it('should get PublishedLinks', async () => {
      const payload = {
        limit: 10,
        page: 1,
      }
      const { links } = await dispatchGetPublishedLinks(store, payload)

      expect(links).toEqual(getPublishedLinksJson(dep))

      expect(getPublishedLinks).toHaveBeenLastCalledWith(
        dep,
        payload.limit,
        payload.page,
      )
      const publishedLinks_store = storeGetPublishedLinks(store)
      expect(publishedLinks_store).toEqual(getPublishedLinksJson(dep))
    })

    it('should delete PublishLink', async () => {
      const link1 = {
        id: 1,
        link: 'sample_link',
        updatedDate: '2022-02-01',
        department: dep,
      }
      const link2 = {
        id: 2,
        link: 'sample_link_2',
        updatedDate: '2022-01-01',
        department: dep,
      }
      store.commit('rfps/setPublishedLinks', [link1, link2])
      const id = 1
      await store.dispatch('rfps/deletePublishLink', id)

      expect(deletePublishLink).toBeCalledWith(id)
      const publishedLinks_store = storeGetPublishedLinks(store)
      expect(publishedLinks_store).toEqual([link2])
    })

    it('should update DraftLocal', async () => {
      await dispatchFetchMyRfps(store)
      const payload = {
        presentationId: DEPARTMENTS_DATA[dep].pid,
        prePopulatedSlide: DEPARTMENTS_DATA[dep].slideCode,
        content: 'UpdatedSlideContent',
      }
      await store.dispatch('rfps/updateDraftLocal', payload)

      const myRfps = storeGetMyRfps(store)
      const myRfpSlides = myRfps.find(
        (rfp) => rfp.presentationId === payload.presentationId,
      ).slides
      const updatedSlide = myRfpSlides.find(
        (slide) => slide.slide.prePopulatedSlide === payload.prePopulatedSlide,
      ).slide
      expect(updatedSlide.slideContent).toEqual(payload.content)
    })

    it('should update SlideContent', async () => {
      await dispatchFetchMyRfps(store)

      const payload = {
        presentationId: DEPARTMENTS_DATA[dep].pid,
        prePopulatedSlide: DEPARTMENTS_DATA[dep].slideCode,
        content: 'UpdatedSlideContent_new',
      }

      await store.dispatch('rfps/updateSlideContent', payload)

      const slideId = getMyRfps()
        .find((rfp) => rfp.presentationId === payload.presentationId)
        ?.slides?.find(
          (sl) => sl.slide.prePopulatedSlide === payload.prePopulatedSlide,
        )?.slide?.slideId

      const updateDraftBody = {
        content: payload.content,
        presentationId: payload.presentationId,
        slideId,
        version: 1,
      }
      expect(updateSlideContent).toHaveBeenCalledWith(updateDraftBody)

      const myRfps = storeGetMyRfps(store)
      const myRfpSlides = myRfps.find(
        (rfp) => rfp.presentationId === payload.presentationId,
      ).slides
      const updatedSlideFromStore = myRfpSlides.find(
        (slide) => slide.slide.prePopulatedSlide === payload.prePopulatedSlide,
      ).slide
      expect(updatedSlideFromStore.slideContent).toEqual(payload.content)
    })

    // getters tests
    it('should get DraftRfps', async () => {
      await dispatchFetchMyRfps(store)
      const draftRfps = store.getters['rfps/getDraftRfps']
      const myrfps = storeGetMyRfps(store)
      const draftsLocal = myrfps.filter((f) => f.publicationCount == 0)

      expect(draftRfps.length).toEqual(draftsLocal.length)
    })

    it('should get PublishedLinks', async () => {
      const publishedLinks = storeGetPublishedLinks(store)
      expect(publishedLinks).toEqual([])
    })

    it('should get PublishedLinksByPresentationId', async () => {
      await dispatchGetPublishedLinks(store)
      const pid = '34b28dfc-3488-4b24-b72f-88f831c7c1b2'
      const publishedLinksByPId =
        store.getters['rfps/getPublishedLinksByPresentationId'](pid)
      const fromJson = getPublishedLinksJson().find(
        (f) => f.presentationId === pid,
      )

      expect(publishedLinksByPId[0]).toMatchObject(fromJson)
    })

    it('should get PublishedLinksByLinkName', async () => {
      await dispatchGetPublishedLinks(store)
      const linkName = 'link1'
      const publishedLinksByLinkName =
        store.getters['rfps/getPublishedLinksByLinkName'](linkName)
      const fromJson = getPublishedLinksJson(dep).find(
        (f) => f.linkName === linkName,
      )
      expect(publishedLinksByLinkName).toEqual(fromJson)
    })

    it('should get non empty getPublishedLinks', async () => {
      await dispatchFetchMyRfps(store)
      const payload = {
        limit: 1,
        page: 1,
      }
      await dispatchGetPublishedLinks(store, payload)
      expect(getPublishedLinks).toHaveBeenLastCalledWith(
        dep,
        payload.limit,
        payload.page,
      )
      const publishedLinks = storeGetPublishedLinks(store)
      expect(publishedLinks).toEqual(getPublishedLinksJson(dep))
    })

    it('should get PublishedRfps', async () => {
      await dispatchFetchMyRfps(store)
      const publishedRfps = store.getters['rfps/getPublishedRfps']
      expect(publishedRfps).toEqual([])
    })

    it('should sharedWithMe', async () => {
      await dispatchFetchMyRfps(store)
      const result = store.getters['rfps/sharedWithMe']
      const expected = getMyRfps(dep).filter(
        (rfp) => rfp.owner !== mockUserDetail.email,
      )
      expect(result.length).toEqual(expected.length)
    })

    it('should get presentation by id', async () => {
      await dispatchFetchMyRfps(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const result = getPresentationById(store, pid)
      const fromJson = getMyRfps(dep).find((f) => f.presentationId === pid)
      expect(result.presentationId).toEqual(fromJson.presentationId)
    })

    it('should get currentRfp/EmptyCurrentRfpDefault for no id', async () => {
      await dispatchFetchMyRfps(store)
      const pid = null
      const result = getPresentationById(store, pid)
      expect(result.presentationId).toBeUndefined()
    })

    it('should get EmptyCurrentRfp', async () => {
      const result = store.getters['rfps/getEmptyCurrentRfp']
      expect(result.presentationId).toBeUndefined()
      expect(result.customerName).toEqual('')
    })

    it('should getNonCustomSlidesByPresentationId', async () => {
      await dispatchFetchMyRfps(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const result =
        store.getters['rfps/getNonCustomSlidesByPresentationId'](pid)
      const fromJson = getMyRfps(dep)
        .find((f) => f.presentationId === pid)
        .slides.filter((slide) => slide.customSlideType == undefined)
      expect(result.length).toEqual(fromJson.length)
    })

    it('should getLinkByHyperLink', async () => {
      await dispatchGetPublishedLinks(store)
      const link = {
        id: '94c16ce7-6307-4537-9de3-97cdc1999284',
        clientName: 'test1',
        hyperLink: 'hyperlink1',
      }
      const result = store.getters['rfps/getLinkByHyperLink'](
        link.clientName,
        link.hyperLink,
      )
      expect(result.id).toEqual(link.id)
    })

    it('should getSlidesByHyperLink', async () => {
      await dispatchGetPublishedLinks(store)
      const link = {
        id: '94c16ce7-6307-4537-9de3-97cdc1999284',
        clientName: 'test1',
        hyperLink: 'hyperlink1',
      }
      const slides = store.getters['rfps/getSlidesByHyperLink'](
        link.clientName,
        link.hyperLink,
      )
      const fromJson = getPublishedLinksJson(dep).find(
        (f) =>
          f.clientName === link.clientName && f.hyperLink === link.hyperLink,
      ).slides
      expect(slides.length).toEqual(fromJson.length)
    })

    it('should getEnabledSlidesByPresentationId', async () => {
      await dispatchGetPublishedLinks(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const link = {
        presentationId: pid,
        clientName: 'test1',
        hyperLink: 'hyperlink1',
      }
      const enabledSlides =
        store.getters['rfps/getEnabledSlidesByPresentationId'](link)
      const fromJson = getPublishedLinksJson(dep)
        .find(
          (f) =>
            f.clientName === link.clientName && f.hyperLink === link.hyperLink,
        )
        .slides.filter(({ isEnabled }) => isEnabled)
      expect(enabledSlides.length).toEqual(fromJson.length)
    })

    it('should getEnabledSlidesByPresentationId no hyperLink Provided', async () => {
      await dispatchFetchMyRfps(store)
      await dispatchGetPublishedLinks(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const link = {
        presentationId: pid,
        clientName: 'test1',
        hyperLink: null,
      }
      const enabledSlides =
        store.getters['rfps/getEnabledSlidesByPresentationId'](link)
      const fromJson = getMyRfps(dep)
        .find((f) => f.presentationId === pid)
        .slides.filter(({ isEnabled }) => isEnabled)
      expect(enabledSlides.length).toEqual(fromJson.length)
    })

    it('should getDisplayedSlidesByPresentationId', async () => {
      await dispatchFetchMyRfps(store)
      await dispatchGetPublishedLinks(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const link = {
        presentationId: pid,
        clientName: 'test1',
        hyperLink: 'hyperlink1',
      }
      const enabledSlides =
        store.getters['rfps/getDisplayedSlidesByPresentationId'](link)
      const fromJson = getPublishedLinksJson(dep)
        .find(
          (f) =>
            f.clientName === link.clientName && f.hyperLink === link.hyperLink,
        )
        .slides.filter(({ isEnabled }) => isEnabled)
      expect(enabledSlides.length).toEqual(fromJson.length)
    })

    it('should get enabledDynamicSlidesByPresentationId', async () => {
      await dispatchFetchMyRfps(store)
      await dispatchGetPublishedLinks(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const enabledDynamicSlides =
        store.getters['rfps/enabledDynamicSlidesByPresentationId'](pid)
      const fromJson = getMyRfps(dep)
        .find((f) => f.presentationId === pid)
        .slides.filter(
          (slide) => slide.isEnabled && slide.slide.slideType === 'DYNAMIC',
        )
      expect(enabledDynamicSlides.length).toEqual(fromJson.length)
    })

    it('should get enabledSlideNumber', async () => {
      await dispatchFetchMyRfps(store)
      await dispatchGetPublishedLinks(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const link = {
        presentationId: pid,
        clientName: 'test1',
        hyperLink: 'hyperlink1',
        slideId: 'INTR_PPH',
      }
      const enabledSlides = store.getters['rfps/enabledSlideNumber'](link)
      expect(enabledSlides).toEqual(2)
    })

    it('should get enabledSlideNumberPerCategory', async () => {
      await dispatchFetchMyRfps(store)
      await dispatchGetPublishedLinks(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const link = {
        presentationId: pid,
        clientName: 'test1',
        hyperLink: 'hyperlink1',
        slideCategory: 'INTRODUCTION',
      }
      const enabledSlides =
        store.getters['rfps/enabledSlideNumberPerCategory'](link)
      const fromJson = getPublishedLinksJson()
        .find(
          (f) =>
            f.clientName === link.clientName && f.hyperLink === link.hyperLink,
        )
        .slides.findIndex(
          ({ isEnabled, slideCategory }) =>
            isEnabled && slideCategory === link.slideCategory,
        )
      expect(enabledSlides).toEqual(fromJson)
    })

    it('should get slideContentBySlideId', async () => {
      await dispatchFetchMyRfps(store)
      await dispatchGetPublishedLinks(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const link = {
        presentationId: pid,
        clientName: 'test1',
        hyperLink: 'hyperlink1',
        prePopulatedSlide: 'INTRO1',
      }
      const enabledSlides = store.getters['rfps/getslideContentBySlideId'](link)
      const expected = defaultSlideContents[link.prePopulatedSlide]
      expect(enabledSlides).toEqual(expected)
    })

    it('should get slideContentBySlideId for undefined hyperlink', async () => {
      await dispatchFetchMyRfps(store)
      await dispatchGetPublishedLinks(store)
      const pid = DEPARTMENTS_DATA[dep].pid

      const dynamicSlideIds = {
        TRAUMA: 'CS1',
        ASC: 'ASC_5',
      }
      const link = {
        presentationId: pid,
        clientName: 'test1',
        hyperLink: undefined,
        prePopulatedSlide: dynamicSlideIds[dep],
      }
      const slideContent = store.getters['rfps/getslideContentBySlideId'](link)
      const expectedSlideContent = defaultSlideContents[link.prePopulatedSlide]
      expect(slideContent).toEqual(expectedSlideContent)
    })

    it('should get SlideContentByRoute', async () => {
      await dispatchFetchMyRfps(store)
      await dispatchGetPublishedLinks(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const route = {
        presentationId: pid,
        clientName: 'test1',
        hyperLink: 'hyperlink1',
        slideId: 'INTRO1',
      }
      const link = {
        route: {
          params: route,
        },
        slideId: 'test1',
      }
      const enabledSlides = store.getters['rfps/getSlideContentByRoute'](link)
      const expected = defaultSlideContents[route.slideId]
      expect(enabledSlides).toEqual(expected)
    })

    it('should get SlideBySlideId', async () => {
      await dispatchFetchMyRfps(store)
      // await dispatchGetPublishedLinks(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const payload = {
        presentationId: pid,
        prePopulatedSlide: 'INTRO1',
      }

      const enabledSlides = store.getters['rfps/getSlideBySlideId'](payload)
      const expected = storeGetMyRfps(store)
        .find((f) => f.presentationId === pid)
        .slides?.find(
          (f) => f.slide.prePopulatedSlide === payload.prePopulatedSlide,
        )?.slide
      expect(enabledSlides).toEqual(expected)
    })

    it('should get CustomerNameByPresentationId', async () => {
      await dispatchFetchMyRfps(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const customerName =
        store.getters['rfps/getCustomerNameByPresentationId'](pid)
      const expected = storeGetMyRfps(store).find(
        (f) => f.presentationId === pid,
      )?.customerName
      expect(customerName).toEqual(expected)
    })

    it('should get InputedStepsCounts', async () => {
      await dispatchFetchMyRfps(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const resp = store.getters['rfps/getInputedStepsCounts'](pid)

      expect(resp).toMatchObject({
        editedCount: DEPARTMENTS_DATA[dep].inputStepCount,
        totalSteps: expect.any(Number),
      })
    })

    it('should get InputProgressByPresentationId for versionKey = builders', async () => {
      await dispatchFetchMyRfps(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const versionKey = 'builders'
      const resp = getInputProgressByPresentationId(store, pid, versionKey)
      expect(resp).toEqual(false)
    })

    it('should get InputProgressByPresentationId for versionKey = internalUserDetails', async () => {
      await dispatchFetchMyRfps(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const versionKey = 'internalUserDetails'
      const resp = getInputProgressByPresentationId(store, pid, versionKey)
      expect(resp).toEqual(true)
    })

    it('should get InputProgressByPresentationId for versionKey = slides', async () => {
      await dispatchFetchMyRfps(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const versionKey = 'slides'
      const resp = getInputProgressByPresentationId(store, pid, versionKey)
      expect(resp).toEqual(DEPARTMENTS_DATA[dep].slide_INFOS_Progress)
    })

    it('should get LastBuilderPage', async () => {
      await dispatchFetchMyRfps(store)
      const pid = DEPARTMENTS_DATA[dep].pid
      const enabledDynamicSlides = store.getters['rfps/getLastBuilderPage'](pid)
      expect(enabledDynamicSlides).toEqual(
        DEPARTMENTS_DATA[dep].defualtLastPage,
      )
    })
  })
}
