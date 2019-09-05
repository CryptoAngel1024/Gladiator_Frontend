/*eslint-env node, jest, amd*/
import { getMyrfps, updateRfp } from '@/api/rfps.api'
import { setupPage } from './setupViews.js'
import { flushPromises } from '@vue/test-utils'
import { mockUserDetail } from '../../__data__/auth/authData.js'
import { getMyRfps } from '../../__data__/rfps/sampleRfps'

jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/link.api')
jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')

const draftRfpsRows = (wrapper) => wrapper.findAll('[data-test*="my-rfp-row-"]')
const dropdownButtonElement = (rfpRow) =>
  rfpRow.find('[data-test="dropdown-button"]')
const dropdownOptionsListElement = (rfpRow) =>
  rfpRow.find('[data-test="dropdown-options"]')

async function setupPageAndStore(MY_PRESENTATIONS_URL) {
  const setup = await setupPage(MY_PRESENTATIONS_URL)
  return setup
}

for (const department of ['ASC', 'TRAUMA']) {
  const MY_PRESENTATIONS_URL = `/${department}/my-presentations`
  const UPDATE_PRESENTATION_URL = `/${department}/update-presentation`

  const sampleMyRfps = getMyRfps(department).filter(
    (rfp) => rfp.owner === mockUserDetail.email,
  )

  describe(`My presentations page ${department}`, () => {
    /**
     * @type {import('@vue/test-utils').VueWrapper}
     * */
    let wrapper

    beforeAll(async () => {
      const setup = await setupPageAndStore(MY_PRESENTATIONS_URL)
      wrapper = setup.wrapper
    })

    describe(`My presentations page display ${department}`, () => {
      it('should show correct title', async () => {
        const pageWrapperHeader = wrapper.find(
          '[data-test="page-wrapper-header"]',
        )
        expect(pageWrapperHeader.exists()).toBe(true)
        expect(pageWrapperHeader.text()).toBe('My Presentations')
      })

      it('should display correct headerBreadCrumps', () => {
        const breadCrumpsPageName = wrapper.find(
          '[data-test="header-bread-crumps-page-name"]',
        )
        expect(breadCrumpsPageName.exists()).toBe(true)
        expect(breadCrumpsPageName.text()).toBe('My Presentations')
      })

      it('displays table headers', () => {
        const expectedTableHeaders = ['', 'Client', 'Shared With', '']

        const myRfpDrafts = wrapper.find('[data-test="my-rfp-drafts"]')
        const draftTableHeaders = myRfpDrafts.findAll('th')

        const myRfpPublished = wrapper.find('[data-test="my-rfp-published"]')
        const publishedTableHeaders = myRfpPublished.findAll('th')

        ;[draftTableHeaders, publishedTableHeaders].forEach((tableHeaders) => {
          expect(tableHeaders.length).toBe(4)
          tableHeaders.forEach((tableHeader, index) =>
            expect(tableHeader.text()).toMatch(expectedTableHeaders[index]),
          )
        })
      })

      it('displays empty list of my-rfps-drafts', async () => {
        getMyrfps.mockImplementationOnce(() => Promise.resolve([]))
        const { wrapper } = await setupPage(MY_PRESENTATIONS_URL)

        expect(getMyrfps).toHaveBeenCalled()
        const draftRfpsList = draftRfpsRows(wrapper)
        expect(draftRfpsList.length).toBe(0)
      })

      it('displays list of my-rfps-drafts', async () => {
        const { wrapper } = await setupPage(MY_PRESENTATIONS_URL)

        expect(getMyrfps).toHaveBeenCalled()
        const draftRfpsList = draftRfpsRows(wrapper)
        expect(draftRfpsList.length).toBe(sampleMyRfps.length)
      })
    })

    describe(`My presentations page share rfps and update user role functionality ${department}`, () => {
      it('share rfps', async () => {
        const toShareRfpList = sampleMyRfps.filter((rfp) => rfp.contact == '[]')
        for (const rfp of toShareRfpList) {
          const { wrapper, store } = await setupPageAndStore(
            MY_PRESENTATIONS_URL,
          )
          const rfpRow = wrapper.find(
            `[data-test="my-rfp-row-${rfp.presentationId}"]`,
          )
          const dropdownButton = dropdownButtonElement(rfpRow)
          await dropdownButton.trigger('click')
          const dropdownOptions = dropdownOptionsListElement(rfpRow)

          const shareButton = dropdownOptions.find(
            '[data-test="share-rfp-button"]',
          )
          await shareButton.trigger('click')
          const shareRfpModal = () =>
            wrapper.find('[data-test="share-rfp-modal"]')
          expect(shareRfpModal().exists()).toBe(true)

          // collect user input
          //mock user detail
          const mockUser = {
            firstName: 'Demo',
            lastName: 'User',
            email: 'test@mail',
            role: 'VIEWER',
            userType: 'test',
            shareRfp: true,
          }

          const employeeNameInput = wrapper.find(
            '[data-test="employee-name-input"]',
          )
          await employeeNameInput.setValue(
            mockUser.firstName + ' ' + mockUser.lastName,
          )

          const employeeEmailInput = wrapper.find(
            '[data-test="employee-email-input"]',
          )
          await employeeEmailInput.setValue(mockUser.email)

          const employeeRoleInput = wrapper.find(
            '[data-test="employee-role-input"]',
          )
          employeeRoleInput.setValue(mockUser.userType)

          const employeeAccessRoleInput = wrapper.find(
            '[data-test="employee-access-role-input"]',
          )
          employeeAccessRoleInput.setValue(mockUser.role)

          // test form input
          const shareRfpForm = wrapper.find('[data-test="share-rfp-form"]')
          await shareRfpForm.trigger('submit.prevent')
          const shareActionButton = shareRfpModal().find(
            '[data-test="share-rfp-action-button"]',
          )
          await shareActionButton.trigger('click')

          // prepare update model
          const shareRfpPayload = {
            userDetail: {
              firstName: mockUser.firstName,
              lastName: mockUser.lastName,
              email: mockUser.email,
              role: mockUser.role,
              userType: mockUser.userType,
              shareRfp: true,
            },
            presentationId: rfp.presentationId,
          }

          // await store.dispatch('rfps/shareWithUser', shareRfpPayload)
          const internalUserDetails = rfp.internalUserDetails.filter(
            ({ role }) => role !== 'OWNER',
          )

          const expectedApiPayload = expect.objectContaining({
            internalTeamDetailList: [
              ...internalUserDetails,
              expect.objectContaining(shareRfpPayload.userDetail),
            ],
            presentationId: shareRfpPayload.presentationId,
          })

          expect(updateRfp).toHaveBeenLastCalledWith(
            'internal-team',
            expectedApiPayload,
          )

          // todo: enable below after mock update
          const sharedRfp = store.getters['rfps/getPresentationById'](
            shareRfpPayload.presentationId,
          )
          const userInStore = sharedRfp.internalUserDetails.find(
            (user) => user.email === shareRfpPayload.userDetail.email,
          )
          expect(userInStore).toEqual(shareRfpPayload.userDetail)
        }
      })

      it('update user role with shared-with modal', async () => {
        for (const sampleRfp of sampleMyRfps.slice(0, 1)) {
          const { wrapper, store } = await setupPageAndStore(
            MY_PRESENTATIONS_URL,
          )
          const rfpRow = wrapper.find(
            `[data-test="my-rfp-row-${sampleRfp.presentationId}"]`,
          )
          const dropdownButton = dropdownButtonElement(rfpRow)
          await dropdownButton.trigger('click')
          const dropdownOptions = dropdownOptionsListElement(rfpRow)

          const sharedWithButton = dropdownOptions.find(
            '[data-test="shared-with-button"]',
          )
          await sharedWithButton.trigger('click')
          const sharedWithModal = wrapper.findComponent(
            '[data-test="share-with-modal"]',
          )
          expect(sharedWithModal.exists()).toBe(true)

          const users = wrapper.findAll('[data-test*="avatar-"]')
          const shareableUsers = sampleRfp.internalUserDetails.filter(
            ({ role }) => role !== 'OWNER',
          )
          expect(users.length).toBe(shareableUsers.length)

          for (const user of shareableUsers) {
            const userRow = wrapper.find(
              `[data-test="share-user-${user.email}"]`,
            )
            const roleSelectorDropdown = userRow.find(
              '[data-test="role-dropdown"]',
            )
            const updatedRole =
              roleSelectorDropdown.value == 'EDITOR' ? 'NONE' : 'EDITOR'
            await roleSelectorDropdown.setValue(updatedRole)

            let mockUserDetail = {
              role: updatedRole,
              shareRfp: updatedRole !== 'NONE',
            }

            expect(updateRfp).toHaveBeenCalledWith(
              'internal-team',
              expect.objectContaining({
                internalTeamDetailList: expect.arrayContaining([
                  {
                    ...user,
                    ...mockUserDetail,
                  },
                ]),
                presentationId: sampleRfp.presentationId,
              }),
              expect.anything(),
            )

            // todo: enable below after mock update
            const sharedRfp = store.getters['rfps/getPresentationById'](
              sampleRfp.presentationId,
            )
            const userInStore = sharedRfp.internalUserDetails.find(
              ({ email }) => user.email === email,
            )
            expect(userInStore).toEqual({
              ...user,
              ...mockUserDetail,
            })
          }
        }
      })
    })

    describe(`My presentations page buttons functionality ${department}`, () => {
      it('display shared with tooltip on shared with button click', async () => {
        const rfpRows = draftRfpsRows(
          wrapper.find('[data-test="my-rfp-drafts"]').find('tbody'),
        )

        expect(rfpRows.length).toBe(sampleMyRfps.length)

        for (const rfpRow of rfpRows) {
          const sharedWithButton = rfpRow.find(
            '[data-test*="shared-with-button-"]',
          )
          const sharedWithToolTip = () =>
            rfpRow.find('[data-test*="shared-with-tooltip-"]')
          expect(sharedWithToolTip().exists()).toBe(false)
          await sharedWithButton.trigger('click')
          expect(sharedWithToolTip().exists()).toBe(true)
        }
      })
      it('displays dropdown menus on action button click', async () => {
        for (const rfp of sampleMyRfps.slice(0, 1)) {
          const rfpRow = wrapper.find(
            `[data-test="my-rfp-row-${rfp.presentationId}"]`,
          )

          const dropdownButton = dropdownButtonElement(rfpRow)
          const dropdownOptions = () => dropdownOptionsListElement(rfpRow)

          expect(dropdownOptions().exists()).toBe(false)
          await dropdownButton.trigger('click')
          expect(dropdownOptions().exists()).toBe(true)
        }
      })

      it('navigates to edit rfp on edit button click', async () => {
        for (const rfp of sampleMyRfps.slice(0, 1)) {
          const { wrapper, router } = await setupPage(MY_PRESENTATIONS_URL)
          const rfpRow = wrapper.find(
            `[data-test="my-rfp-row-${rfp.presentationId}"]`,
          )
          const editRfpButton = rfpRow.find('[data-test="edit-rfp-button"]')
          expect(editRfpButton.exists()).toBe(true)
          expect(editRfpButton.text()).toBe('Edit')

          await editRfpButton.trigger('click')
          await flushPromises()
          expect(router.currentRoute.value.path).toContain(
            `${UPDATE_PRESENTATION_URL}/${rfp.presentationId}`,
          )
        }
      })

      it('display share with modal on share-rfp-button click', async () => {
        for (const rfp of sampleMyRfps.slice(0, 1)) {
          const { wrapper } = await setupPageAndStore(MY_PRESENTATIONS_URL)
          const rfpRow = wrapper.find(
            `[data-test="my-rfp-row-${rfp.presentationId}"]`,
          )
          const dropdownButton = dropdownButtonElement(rfpRow)
          await dropdownButton.trigger('click')
          const dropdownOptions = dropdownOptionsListElement(rfpRow)

          const shareButton = dropdownOptions.find(
            '[data-test="share-rfp-button"]',
          )
          const shareModal = () => wrapper.find('[data-test="share-rfp-modal"]')
          expect(shareModal().exists()).toBe(false)
          await shareButton.trigger('click')
          expect(shareModal().exists()).toBe(true)
        }
      })
    })
  })
}
