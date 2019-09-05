/*eslint-env node, jest, amd*/
import {
  getAllTemplates,
  shareTemplate,
  updateTemplate,
  deleteTemplate,
} from '@/api/templates.api'
import { setupPage } from './setupViews.js'
import { getTemplates } from '../../__data__/templates/sampleTemplateData'
import { mockUserDetail } from '../../__data__/auth/authData.js'
import { flushPromises } from '@vue/test-utils'
jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/templates.api')
jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')

function getMyTemplates(store) {
  const myTemplates = store.getters['templates/myTemplates']
  return myTemplates
}

const myTemplatesElement = (wrapper) =>
  wrapper.find('[data-test="my-templates"]')

const dropdownButtonElement = (templateRow) =>
  templateRow.find('[data-test="dropdown-button"]')

const shareButtonElement = (templateRow) =>
  templateRow.find('[data-test="share-with-modal-btn"]')

const findMyTemplateRows = (wrapper) =>
  myTemplatesElement(wrapper)
    .find('tbody')
    .findAll('[data-test="my-template-row"]')

for (const department of ['ASC', 'TRAUMA']) {
  const TEMPLATES_URL = `/${department}/templates`

  const email = mockUserDetail.email
  const expectedMyTemplates = getTemplates()
    .filter((temp) => temp.owner === email)
    .map((temp) => ({
      ...temp,
      numberOfSlides: temp.slides.filter((slide) => slide.isEnabled).length,
    }))

  const expectedSharedTemplates = getTemplates()
    .filter((temp) => temp.owner !== email)
    .map((temp) => ({
      ...temp,
      numberOfSlides: temp.slides.filter((slide) => slide.isEnabled).length,
    }))

  describe(`Templates page ${department}`, () => {
    /**
     * @type {import('@vue/test-utils').VueWrapper}
     * */
    let wrapper

    beforeAll(async () => {
      const setup = await setupPage(TEMPLATES_URL)
      wrapper = setup.wrapper
    })

    describe(`My templates table display ${department}`, () => {
      it('should show correct title', async () => {
        const pageWrapperHeader = wrapper.find(
          '[data-test="page-wrapper-header"]',
        )
        expect(pageWrapperHeader.exists()).toBe(true)
        expect(pageWrapperHeader.text()).toBe('Templates')
      })

      it('should display correct headerBreadCrumps', () => {
        const breadCrumpsPageName = wrapper.find(
          '[data-test="header-bread-crumps-page-name"]',
        )
        expect(breadCrumpsPageName.exists()).toBe(true)
        expect(breadCrumpsPageName.text()).toBe('Templates')
      })

      it('displays table headers', async () => {
        const expectedTableHeaders = [
          '',
          'Template Name',
          'Number of slides',
          '',
        ]
        const myTemplates = myTemplatesElement(wrapper)
        const myTemplateTableHeaders = myTemplates.findAll('th')
        const templates = wrapper.find('[data-test="templates"]')
        const templateTableHeaders = templates.findAll('th')

        ;[myTemplateTableHeaders, templateTableHeaders].forEach(
          (tableHeaders) => {
            expect(tableHeaders.length).toBe(expectedTableHeaders.length)
            tableHeaders.forEach((tableHeader, index) =>
              expect(tableHeader.text()).toMatch(expectedTableHeaders[index]),
            )
          },
        )
      })

      it('displays table rows', async () => {
        const myTemplates = myTemplatesElement(wrapper)
        const templates = wrapper.find('[data-test="templates"]')

        ;[
          [myTemplates, expectedMyTemplates],
          [templates, expectedSharedTemplates],
        ].forEach(([templatesSection, expectedTemplates]) => {
          const templatesTableBody = templatesSection.find('tbody')
          const templatesRows = templatesTableBody.findAll('tr')
          expect(templatesRows.length).toBe(expectedTemplates.length)
          expect(expectedTemplates.length).toBeGreaterThan(0)

          templatesRows.forEach((tableRow, index) => {
            const expectedTempalte = expectedTemplates[index]
            const expectedTextsInRow = [
              expectedTempalte.templateName,
              expectedTempalte.templateDescription,
              String(expectedTempalte.numberOfSlides),
              'Edit',
            ]
            expectedTextsInRow.forEach((expectedText) =>
              expect(tableRow.text()).toContain(expectedText || ''),
            )
          })
        })
      })

      it('displays empty list of my-templates', async () => {
        getAllTemplates.mockImplementationOnce(() => Promise.resolve([]))
        const { wrapper, store } = await setupPage(TEMPLATES_URL)

        expect(getAllTemplates).toHaveBeenCalled()
        const myTemplatesStoreList = await getMyTemplates(store)
        expect(myTemplatesStoreList.length).toBe(0)

        const tableRows = wrapper.findAll('tr')
        expect(tableRows.length).toBe(0)
        expect(wrapper.text()).toContain('No templates available')
      })
    })
    describe(`My templates page button display ${department}`, () => {
      it('displays shared with modal on share button click', async () => {
        const { wrapper } = await setupPage(TEMPLATES_URL)
        const myTemplateRows = findMyTemplateRows(wrapper)

        for (const myTemplateRow of myTemplateRows.slice(0, 2)) {
          const dropdownButton = dropdownButtonElement(myTemplateRow)
          await dropdownButton.trigger('click')

          const shareWithButton = myTemplateRow.find(
            '[data-test="shared-with-modal-btn"]',
          )
          const shareWithModal = () =>
            myTemplateRow.find('[data-test="shared-with-modal"]')

          expect(shareWithModal().exists()).toBe(false)
          await shareWithButton.trigger('click')
          expect(shareWithModal().exists()).toBe(true)
        }
      })

      it('display share modal on share button click', async () => {
        const { wrapper } = await setupPage(TEMPLATES_URL)
        const myTemplateRows = findMyTemplateRows(wrapper)

        for (const myTemplateRow of myTemplateRows.slice(0, 2)) {
          const dropdownButton = dropdownButtonElement(myTemplateRow)
          await dropdownButton.trigger('click')

          const shareButton = shareButtonElement(myTemplateRow)
          const shareModal = () =>
            myTemplateRow.find('[data-test="share-with-modal"]')

          expect(shareModal().exists()).toBe(false)
          await shareButton.trigger('click')
          expect(shareModal().exists()).toBe(true)
        }
      })

      it('shared with modal allows role changes', async () => {
        const { wrapper } = await setupPage(TEMPLATES_URL)
        const myTemplateRows = findMyTemplateRows(wrapper)

        const dropdownButton = dropdownButtonElement(myTemplateRows[0])
        await dropdownButton.trigger('click')

        const shareWithButton = myTemplateRows[0].find(
          '[data-test="shared-with-modal-btn"]',
        )
        await shareWithButton.trigger('click')

        const shareWithModal = () =>
          myTemplateRows[0].find('[data-test="shared-with-modal"]')
        expect(shareWithModal().exists()).toBe(true)

        const userAvatars = wrapper.findAll('[data-test*="avatar-"]')
        const shareableUsers =
          expectedMyTemplates[0].internalUserDetails.filter(
            ({ role }) => role !== 'OWNER',
          )
        expect(userAvatars.length).toBe(shareableUsers.length)

        for (const user of shareableUsers) {
          const userRow = wrapper.find(`[data-test="share-user-${user.email}"]`)
          const roleSelectorDropdown = userRow.find(
            '[data-test="role-dropdown"]',
          )
          const updatedRole =
            roleSelectorDropdown.value == 'EDITOR' ? 'NONE' : 'EDITOR'
          await roleSelectorDropdown.setValue(updatedRole)

          const mockUserDetail = {
            role: updatedRole,
          }
          expect(shareTemplate).toHaveBeenCalledWith(
            expect.objectContaining({
              internalTeamDetailList: [
                {
                  ...user,
                  ...mockUserDetail,
                },
              ],
              templateId: expectedMyTemplates[0].templateId,
            }),
          )
        }
      })

      it('share modal allows share to user', async () => {
        const { wrapper } = await setupPage(TEMPLATES_URL)
        const myTemplateRows = findMyTemplateRows(wrapper)
        const dropdownButton = dropdownButtonElement(myTemplateRows[0])
        await dropdownButton.trigger('click')
        const shareButton = shareButtonElement(myTemplateRows[0])
        await shareButton.trigger('click')
        const shareModal = () =>
          myTemplateRows[0].find('[data-test="share-with-modal"]')
        expect(shareModal().exists()).toBe(true)

        //mock user detail
        const mockUser = {
          firstName: 'Demo',
          lastName: 'User',
          email: 'test@mail',
          role: 'EDITOR',
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
        const shareActionButton = shareModal().find(
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
          templateId: expectedMyTemplates[0].templateId,
        }
        const internalUserDetails =
          expectedMyTemplates[0].internalUserDetails.filter(
            ({ role }) => role !== 'OWNER',
          )

        const expectedApiPayload = {
          internalTeamDetailList: [
            {
              ...internalUserDetails[0],
              role: shareRfpPayload.userDetail.role,
            },
          ],
          templateId: shareRfpPayload.templateId,
        }
        expect(shareTemplate).toHaveBeenLastCalledWith(expectedApiPayload)
      })
    })
    describe(`My templates page display ${department}`, () => {
      it('displays dropdown menus on action button click', async () => {
        const myTemplateRows = findMyTemplateRows(wrapper)
        expect(myTemplateRows.length).toBeGreaterThan(0)

        for (const myTemplateRow of myTemplateRows.slice(0, 2)) {
          const dropdownButton = dropdownButtonElement(myTemplateRow)
          const dropdownOptions = () =>
            myTemplateRow.find('[data-test="dropdown-options"]')

          expect(dropdownOptions().exists()).toBe(false)
          await dropdownButton.trigger('click')
          expect(dropdownOptions().exists()).toBe(true)
          const shareButton = shareButtonElement(dropdownOptions())
          expect(shareButton.exists()).toBe(true)
        }
      })
      it('template is favorited on favorite button click', async () => {
        const { wrapper, store } = await setupPage(TEMPLATES_URL)
        const myTemplateRows = findMyTemplateRows(wrapper)
        const templateToBeUpdated = getMyTemplates(store)[0]
        const isbookmarked = () => getMyTemplates(store)[0].bookmarked

        const dropdownButton = dropdownButtonElement(myTemplateRows[0])

        await dropdownButton.trigger('click')
        const bookmarkButton = myTemplateRows[0].find('[data-test="bookmark"]')

        expect(isbookmarked()).toBe(true)
        await bookmarkButton.trigger('click')
        expect(isbookmarked()).toBe(false)

        const payload = {
          bookmarked: templateToBeUpdated.bookmarked,
          templateId: templateToBeUpdated.templateId,
          slideInfos: templateToBeUpdated.slides,
          templateName: templateToBeUpdated.templateName,
          templateDescription: templateToBeUpdated.templateDescription,
        }
        expect(updateTemplate).toBeCalledWith(payload)
      })

      it('template is deleted on delete button click', async () => {
        const { wrapper, store } = await setupPage(TEMPLATES_URL)
        const myTemplateRows = findMyTemplateRows(wrapper)
        const templateToBeDeleted = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

        const template = () =>
          getMyTemplates(store).find(
            (f) => f.templateId === templateToBeDeleted,
          )

        const dropdownButton = dropdownButtonElement(myTemplateRows[0])
        await dropdownButton.trigger('click')

        const deleteButton = myTemplateRows[0].find(
          '[data-test="template-remove"]',
        )

        expect(template()).toBeDefined()
        await deleteButton.trigger('click')
        expect(template()).not.toBeDefined()

        expect(deleteTemplate).toBeCalledWith(templateToBeDeleted)
      })

      it('navigates to edit rfp on edit button click', async () => {
        for (const expectedTemplate of expectedMyTemplates) {
          const { wrapper, router } = await setupPage(TEMPLATES_URL)
          const editButton = wrapper.find(
            `[data-test="edit-template-${expectedTemplate.templateId}"]`,
          )
          await editButton.trigger('click')
          await flushPromises()
          const editeURL = `/${department}/templates/${expectedTemplate.templateId}`
          expect(router.currentRoute.value.fullPath).toBe(editeURL)
        }
      })
    })
    describe(`Templates page functionality ${department}`, () => {
      it('should search keyword', async () => {
        const email = mockUserDetail.email
        const expectedMy = getTemplates()
          .filter((temp) => temp.owner === email)
          .map((temp) => ({
            ...temp,
            numberOfSlides: temp.slides.filter((slide) => slide.isEnabled)
              .length,
          }))
        const SEARCH_TERM = 'tes'
        const templatesHeader = wrapper.find('[data-test="templates-header"]')
        const searchInput = templatesHeader.find('input')
        await searchInput.setValue(SEARCH_TERM)

        const searchTemplates = (template) => {
          const lowerSearchTerm = SEARCH_TERM.toLowerCase()
          return (
            template.templateName?.toLowerCase().includes(lowerSearchTerm) ||
            template.templateDescription
              ?.toLowerCase()
              .includes(lowerSearchTerm) ||
            template.numberOfSlides?.includes(lowerSearchTerm)
          )
        }

        const searchResult = expectedMy.filter(searchTemplates)
        expect(searchResult.length).toBeGreaterThan(0)
        const myTemplates = myTemplatesElement(wrapper)
        const myTemplatesTableBody = myTemplates.find('tbody')
        const tableRows = myTemplatesTableBody.findAll('tr')

        expect(tableRows.length).toBe(searchResult.length)

        tableRows.forEach((tableRow) => {
          expect(tableRow.text().toLowerCase()).toContain(
            SEARCH_TERM.toLowerCase(),
          )
        })
      })
    })
  })
}
