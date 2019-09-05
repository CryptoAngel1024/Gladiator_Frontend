/*eslint-env node, jest, amd*/
import { flushPromises } from '@vue/test-utils'
import { setupPage } from './../setupViews.js'
import { getMyrfps, deleteRfp } from '@/api/rfps.api'
import { getMyRfps } from '@tests/__data__/rfps/sampleRfps.js'
jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/templates.api')
jest.mock('@/api/link.api')
jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')

const dropdownButtonElement = (rfpRow) =>
  rfpRow.find('[data-test="draft-item-dropdown-button"]')

const dropdownOptionsElement = (rfpRow) =>
  rfpRow.find('[data-test="draft-rfp-dropdown-options"]')

// todo: test ASC
for (const department of ['TRAUMA']) {
  const DASHBOARD_URL = `/${department}/dashboard`
  const sampleMyRfps = getMyRfps(department)

  const recentDrafts = sampleMyRfps
    .sort((rfp1, rfp2) =>
      rfp2.lastUpdatedDate?.localeCompare(rfp1.lastUpdatedDate),
    )
    .filter(({ publicationCount }) => publicationCount === 0)
    .slice(0, 4)

  describe(`Dashboard page - Recent drafts - ${department}`, () => {
    /**
     * @type {import('@vue/test-utils').VueWrapper}
     * */
    let wrapper

    beforeAll(async () => {
      const setup = await setupPage(DASHBOARD_URL)
      wrapper = setup.wrapper
    })

    describe('Recent drafts component draft details display', () => {
      it('should display correct component title', () => {
        const recentDraftsTitle = wrapper.find(
          '[data-test="recent-drafts-title"]',
        )
        expect(recentDraftsTitle.text()).toBe('Recent Drafts')
      })

      it('should display correct customer name', async () => {
        expect(recentDrafts.length).toBeGreaterThan(0)
        for (const draftRfp of recentDrafts) {
          const draftRfpItem = wrapper.find(
            `[data-test="draft-rfp-item-${draftRfp.presentationId}"]`,
          )
          const draftRfpCustomerName = draftRfpItem.find(
            '[data-test="draft-rfp-customer-name"]',
          )
          expect(draftRfpCustomerName.exists()).toBe(true)
          expect(draftRfpCustomerName.text()).toBe(draftRfp.customerName)
        }
      })

      it('should display correct publication count', async () => {
        for (const draftRfp of recentDrafts) {
          const draftRfpItem = wrapper.find(
            `[data-test="draft-rfp-item-${draftRfp.presentationId}"]`,
          )

          const publicationCount = () =>
            draftRfpItem.find('[data-test="draft-rfp-publication-count"]')
          expect(publicationCount().text()).toBe(
            String(draftRfp.publicationCount),
          )
        }
      })

      it('should display correct progress percentage', async () => {
        const { wrapper, store } = await setupPage(DASHBOARD_URL)
        for (const draftRfp of recentDrafts) {
          const draftRfpItem = wrapper.find(
            `[data-test="draft-rfp-item-${draftRfp.presentationId}"]`,
          )

          const draftRfpProgress = () =>
            draftRfpItem.find('[data-test="draft-rfp-progress"]')

          const draftRfpProgressBar = () =>
            draftRfpItem.find('[data-test="draft-rfp-progress-bar"]')

          const countUserInputedSteps = store.getters[
            'rfps/getInputedStepsCounts'
          ](draftRfp.presentationId)
          const userInputedProgress = Math.round(
            (countUserInputedSteps.editedCount /
              countUserInputedSteps.totalSteps) *
              100,
          )

          expect(draftRfpProgress().text()).toBe(userInputedProgress + '%')
          expect(draftRfpProgressBar().attributes().style).toContain(
            `width: ${userInputedProgress}%`,
          )
        }
      })
    })
    describe('Recent drafts component users display', () => {
      it('should display correct number of internal team members', async () => {
        for (const draftRfp of recentDrafts) {
          const draftRfpItem = wrapper.find(
            `[data-test="draft-rfp-item-${draftRfp.presentationId}"]`,
          )
          const sharedWithUsers = draftRfp.internalUserDetails?.filter(
            (user) => user.role !== 'OWNER' && user.role !== 'NONE',
          )
          const internalTeam = sharedWithUsers.slice(
            0,
            Math.min(draftRfp.internalUserDetails.length, 4),
          )
          const membersAvatarList = draftRfpItem.findAll(
            `[data-test*="member-avatar-"]`,
          )
          expect(membersAvatarList.length).toBe(internalTeam.length)
        }
      })

      it('should display correct member avatar', async () => {
        for (const draftRfp of recentDrafts) {
          const draftRfpItem = wrapper.find(
            `[data-test="draft-rfp-item-${draftRfp.presentationId}"]`,
          )
          const sharedWithUsers = draftRfp.internalUserDetails?.filter(
            (user) => user.role !== 'OWNER' && user.role !== 'NONE',
          )
          const visibleUsersCount = 4

          const internalTeamList = sharedWithUsers.slice(
            0,
            Math.min(draftRfp.internalUserDetails.length, visibleUsersCount),
          )
          for (const internalTeamMember of internalTeamList) {
            const memberAvatar = draftRfpItem.find(
              `[data-test="member-avatar-${internalTeamMember.email}"]`,
            )
            expect(memberAvatar.exists()).toBe(true)
            //TODO: Add additional avatar tests
          }
        }
      })
    })
    describe('Recent drafts component hidden users display', () => {
      it('should display correct hidden users count', async () => {
        for (const draftRfp of recentDrafts) {
          const draftRfpItem = wrapper.find(
            `[data-test="draft-rfp-item-${draftRfp.presentationId}"]`,
          )
          const internalTeamsCount = draftRfp.internalUserDetails.length
          const visibleUsersCount = 4
          const hiddenUsersCount = internalTeamsCount - visibleUsersCount
          const hiddenUsersCountData = draftRfpItem.find(
            '[data-test="draft-rfp-hidden-users-count"]',
          )

          if (hiddenUsersCount > 0) {
            expect(hiddenUsersCountData.text()).toBe(String(hiddenUsersCount))
          } else {
            expect(hiddenUsersCountData.exists()).toBe(false)
          }
        }
      })
    })

    describe('Recent drafts component drafts detail functionality', () => {
      it('should display empty list of recent drafts', async () => {
        getMyrfps.mockImplementationOnce(() => Promise.resolve([]))
        const { wrapper } = await setupPage(DASHBOARD_URL)
        expect(getMyrfps).toHaveBeenCalled()
        const draftRfpItems = wrapper.findAll('[data-test*="draft-item-"]')
        expect(draftRfpItems.length).toBe(0)
      })

      it('should display list of recent drafts', async () => {
        const { wrapper } = await setupPage(DASHBOARD_URL)

        expect(getMyrfps).toHaveBeenCalled()
        const draftRfpsList = wrapper.findAll('[data-test*="draft-rfp-item"]')
        expect(draftRfpsList.length).toBe(recentDrafts.length)
      })

      it('should display draft item dropdown menu on draft-item-dropdown-button click', async () => {
        const { wrapper } = await setupPage(DASHBOARD_URL)
        for (const rfp of recentDrafts.slice(0, 2)) {
          const rfpRow = wrapper.find(
            `[data-test="draft-rfp-item-${rfp.presentationId}"]`,
          )
          const dropdownButton = dropdownButtonElement(rfpRow)

          expect(dropdownOptionsElement(rfpRow).exists()).toBe(false)
          await dropdownButton.trigger('click')
          expect(dropdownOptionsElement(rfpRow).exists()).toBe(true)
        }
      })

      it('should open new preview draft rfp tab on preview-draft-rfp-button click', async () => {
        const { wrapper } = await setupPage(DASHBOARD_URL)
        for (const rfp of recentDrafts.slice(0, 2)) {
          const rfpRow = wrapper.find(
            `[data-test="draft-rfp-item-${rfp.presentationId}"]`,
          )
          const dropdownButton = dropdownButtonElement(rfpRow)

          await dropdownButton.trigger('click')

          const previewDraftRfpButton = dropdownOptionsElement(rfpRow).find(
            '[data-test="preview-draft-rfp-button"]',
          )
          expect(previewDraftRfpButton.exists()).toBe(true)
          expect(previewDraftRfpButton.text()).toBe('Preview')
          const targetUrl = `/${department}/slide/${rfp.presentationId}`
          expect(previewDraftRfpButton.attributes().href).toBe(targetUrl)
        }
      })
      it('should display correct enabled and total slides count', async () => {
        for (const draftRfp of recentDrafts) {
          const { totalSlidesCount, enabledSlidesCount } = draftRfp

          const draftRfpItem = wrapper.find(
            `[data-test="draft-rfp-item-${draftRfp.presentationId}"]`,
          )
          const draftRfpCounts = draftRfpItem.find(
            '[data-test="draft-rfp-counts"]',
          )

          expect(draftRfpCounts.text()).toBe(
            `${enabledSlidesCount}/${totalSlidesCount}`,
          )
        }
      })
    })
    describe('Recent drafts component buttons functionality', () => {
      // https://github.com/facebook/jest/issues/11543
      jest.setTimeout(15000)
      it('should navigate to update presentation page on update-draft-rfp-button click', async () => {
        jest.setTimeout(15000)
        for (const rfp of recentDrafts.slice(0, 2)) {
          const { wrapper, router } = await setupPage(DASHBOARD_URL)
          const rfpRow = wrapper.find(
            `[data-test="draft-rfp-item-${rfp.presentationId}"]`,
          )
          const dropdownButton = dropdownButtonElement(rfpRow)

          await dropdownButton.trigger('click')
          const updateDraftRfpButton = dropdownOptionsElement(rfpRow).find(
            '[data-test="update-draft-rfp-button"]',
          )
          expect(updateDraftRfpButton.exists()).toBe(true)
          expect(updateDraftRfpButton.text()).toBe('Edit' || 'View')
          await updateDraftRfpButton.trigger('click')
          await flushPromises()
          const updatePresentationPageRoute = `/${department}/update-presentation/${rfp.presentationId}/1/1`
          expect(router.currentRoute.value.path).toBe(
            updatePresentationPageRoute,
          )
        }
      })

      it('should display share-with-modal on share-draft-rfp-button click', async () => {
        for (const draftRfp of recentDrafts.slice(0, 2)) {
          const { wrapper } = await setupPage(DASHBOARD_URL)
          const draftRfpItem = wrapper.find(
            `[data-test="draft-rfp-item-${draftRfp.presentationId}"]`,
          )
          expect(draftRfpItem.exists()).toBe(true)
          const dropdownButton = dropdownButtonElement(draftRfpItem)
          await dropdownButton.trigger('click')

          const shareDraftRfpButton = draftRfpItem.find(
            '[data-test="share-draft-rfp-button"]',
          )
          expect(shareDraftRfpButton.exists()).toBe(true)
          expect(shareDraftRfpButton.text()).toBe('Share')
          const shareWithModal = () =>
            draftRfpItem.find('[data-test="draft-rfp-share-with-modal"]')
          expect(shareWithModal().exists()).toBe(false)
          await shareDraftRfpButton.trigger('click')
          expect(shareWithModal().exists()).toBe(true)
        }
      })

      it('should display share-modal on shared-with-draft-rfp-button click', async () => {
        for (const draftRfp of recentDrafts.slice(0, 2)) {
          const { wrapper } = await setupPage(DASHBOARD_URL)
          const draftRfpItem = wrapper.find(
            `[data-test="draft-rfp-item-${draftRfp.presentationId}"]`,
          )
          expect(draftRfpItem.exists()).toBe(true)
          const dropdownButton = dropdownButtonElement(draftRfpItem)
          await dropdownButton.trigger('click')

          const sharedWithDraftRfpButton = draftRfpItem.find(
            '[data-test="shared-with-draft-rfp-button"]',
          )
          expect(sharedWithDraftRfpButton.exists()).toBe(true)
          expect(sharedWithDraftRfpButton.text()).toBe('Shared with')
          const shareModal = () =>
            draftRfpItem.find('[data-test="draft-rfp-share-modal"]')
          expect(shareModal().exists()).toBe(false)
          await sharedWithDraftRfpButton.trigger('click')
          expect(shareModal().exists()).toBe(true)
        }
      })

      it('should delete draft rfp on delete-draft-rfp-button click', async () => {
        const { wrapper } = await setupPage(DASHBOARD_URL)
        for (const draftRfp of recentDrafts.slice(0, 2)) {
          const draftRfpItem = () =>
            wrapper.find(
              `[data-test="draft-rfp-item-${draftRfp.presentationId}"]`,
            )
          const dropdownButton = dropdownButtonElement(draftRfpItem())

          await dropdownButton.trigger('click')

          const deleteDraftRfpButton = dropdownOptionsElement(
            draftRfpItem(),
          ).find('[data-test="delete-draft-rfp-button"]')
          expect(deleteDraftRfpButton.exists()).toBe(true)
          expect(deleteDraftRfpButton.text()).toBe('Delete')

          expect(draftRfpItem().exists()).toBe(true)
          await deleteDraftRfpButton.trigger('click')
          expect(deleteRfp).toHaveBeenCalledWith(draftRfp.presentationId)
          expect(draftRfpItem().exists()).toBe(false)
        }
      })
    })
  })
}
