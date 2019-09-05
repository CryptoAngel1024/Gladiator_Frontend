/*eslint-env node, jest, amd*/
import { createRfp, updateSlideInfo } from '@/api/rfps.api'
import { setupPage } from './setupViews.js'
import { flushPromises } from '@vue/test-utils'
import { getCreatedRfp } from '../../__data__/rfps/sampleRfps'
import { mockUserDetail } from '../../__data__/auth/authData.js'
import {
  hideConsoleWarningOnce,
  hideConsoleErrorOnce,
  rfpInformationIndex,
  expectTextElementsPerDataTest,
} from './testUtils.js'
import { allRfpSteps } from '@/data/allRfpSteps.js'

jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/link.api')
jest.mock('@/api/custom-slide.api.js')
jest.mock('@/api/templates.api')
jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')

const mainRfpForm = (wrapper) => wrapper.find('[data-test="next-submite-form"]')

export function testNewPresentationPage(
  NEW_PRESENTATION_URL,
  department,
  templateId,
) {
  const createdPresentationId = getCreatedRfp(department).presentationId

  const pageLinkLists = allRfpSteps[department]
    .map(({ pageLinkLists }) => pageLinkLists)
    .flat(1)

  /**
   * @type {import('@vue/test-utils').VueWrapper}
   * */
  let wrapper

  beforeAll(async () => {
    const setup = await setupPage(NEW_PRESENTATION_URL)
    wrapper = setup.wrapper
  })

  describe('page display', () => {
    it('should display page title', () => {
      const allTextElements = {
        TRAUMA: {
          'customer-name-lable': 'Customer Name*',
          'customer-logo': 'Customer Logo',
          contacts: 'Contacts',
          'customer-insight': 'Customer Insights:',
        },
        ASC: {},
        ALL_DEPARTMENTS: {
          'page-title': 'Presentation Deck',
          'header-bread-crumps-page-name-newRfp': 'Home \\ New Presentation',
          'newRfp-previous': 'Previous',
          'newRfp-next-slide': 'Next',
          'newRfp-skip-to-slides': 'Skip To Slides',
        },
      }
      const textElements = {
        ...allTextElements[department],
        ...allTextElements.ALL_DEPARTMENTS,
      }

      expectTextElementsPerDataTest(wrapper, textElements)
    })

    if (department === 'TRAUMA') {
      it('displays table headers', () => {
        const expectedTableHeaders = ['Name', 'Role', 'Email', 'Options']
        const newRfpDrafts = wrapper.find('[data-test="newRfp-drafts"]')
        expect(newRfpDrafts.exists()).toBe(true)
        const draftTableHeaders = newRfpDrafts.findAll('th')
        expect(draftTableHeaders.length).toBe(expectedTableHeaders.length)
        draftTableHeaders.forEach((tableHeader, index) =>
          expect(tableHeader.text()).toMatch(expectedTableHeaders[index]),
        )
      })
    }

    it('should display sideNav steps', () => {
      const expectedSteps = allRfpSteps[department]

      const sideNavStepNumber = wrapper.findAll(
        '[data-test*="step-slides-step-number-"]',
      )
      const sideNavStepName = wrapper.findAll(
        '[data-test*="step-slides-step-name-"]',
      )
      ;[sideNavStepNumber, sideNavStepName].forEach((steps) => {
        expect(steps.length).toBe(expectedSteps.length)
      })
      sideNavStepNumber.forEach((step, index) =>
        expect(step.text()).toMatch(
          String(expectedSteps[index].stepInfo.stepNumber),
        ),
      )
      sideNavStepName.forEach((step, index) =>
        expect(step.text()).toMatch(
          String(expectedSteps[index].stepInfo.stepName),
        ),
      )
    })

    it('should display inputs', () => {
      const customerNameInputFeild = wrapper.find(
        '[data-test="customer-name-input"]',
      )
      expect(customerNameInputFeild.exists()).toBe(true)

      if (department === 'TRAUMA') {
        const contactsTableNameInputFeild = wrapper.find(
          '[data-test="contacts-table-name-input"]',
        )
        expect(contactsTableNameInputFeild.exists()).toBe(true)

        const contactsTableRoleInputFeild = wrapper.find(
          '[data-test="contacts-table-role-input"]',
        )
        expect(contactsTableRoleInputFeild.exists()).toBe(true)

        const contactsTableEmailInputFeild = wrapper.find(
          '[data-test="contacts-table-email-input"]',
        )
        expect(contactsTableEmailInputFeild.exists()).toBe(true)

        const addMoreBtn = wrapper.find('[ data-test="add-more"]')
        expect(addMoreBtn.exists()).toBe(true)
      }

      const form = mainRfpForm(wrapper)
      expect(form.exists()).toBe(true)
    })
  })

  if (department === 'TRAUMA') {
    it('side nav page links should be shown', async () => {
      const { wrapper } = await setupPage(NEW_PRESENTATION_URL)
      const stepLinkList = wrapper.findAll('[data-test*="side-nav-item-"]')

      expect(stepLinkList.length).toBe(pageLinkLists.length)
      stepLinkList.forEach((step, index) => {
        expect(step.exists()).toBe(true)
        expect(step.text()).toBe(pageLinkLists[index].pageName)
      })
    })

    it('add button should add table column (cells)', async () => {
      const addMoreBtn = wrapper.find('[ data-test="add-more"]')
      const contactsTableRows = () =>
        wrapper.findAll('[data-test*="contacts-table-row-"]')

      expect(contactsTableRows().length).toBe(3)
      await addMoreBtn.trigger('click')
      expect(contactsTableRows().length).toBe(3 + 1)
    })
  }
  if (department === 'TRAUMA') {
    describe('test api calls responses', () => {
      async function inputNewRfp({
        customerName,
        contactsName,
        contactsRole,
        contactsEmail,
        contactsCustomerProblem,
        wrapper,
      }) {
        const customerNameInputFeild = wrapper.find(
          '[data-test="customer-name-input"]',
        )
        await customerNameInputFeild.setValue(customerName)

        const contactsTableNameInputFeild = wrapper.find(
          '[data-test="contacts-table-name-input"]',
        )
        await contactsTableNameInputFeild.setValue(contactsName)

        const contactsTableRoleInputFeild = wrapper.find(
          '[data-test="contacts-table-role-input"]',
        )
        await contactsTableRoleInputFeild.setValue(contactsRole)

        const contactsTableEmailInputFeild = wrapper.find(
          '[data-test="contacts-table-email-input"]',
        )
        await contactsTableEmailInputFeild.setValue(contactsEmail)

        const customerProblemInputInputFeild = wrapper.find(
          '[data-test="customer-problem-input"]',
        )
        await customerProblemInputInputFeild.setValue(contactsCustomerProblem)

        hideConsoleWarningOnce('no selected file to upload')
      }

      async function expectRfpIsCreated({
        contact,
        customerName,
        customerProblem,
        expectedRoute,
        router,
        store,
      }) {
        const contactPayload = {
          data: JSON.stringify(contact),
          informationType: rfpInformationIndex('contact', department),
        }
        const problemPayload = {
          data: customerProblem,
          informationType: rfpInformationIndex('customerProblem', department),
        }

        expect(createRfp).toHaveBeenLastCalledWith(
          {
            customerName,
            informationList: [contactPayload, problemPayload],
          },
          department,
        )

        const createdPresentation = store.getters['rfps/getPresentationById'](
          createdPresentationId,
        )

        expect(createdPresentation).toMatchObject({
          contact,
          customerName,
          customerProblem,
          owner: mockUserDetail.email,
        })

        await flushPromises()
        expect(router.currentRoute.value.path).toMatch(expectedRoute)

        if (templateId) {
          const templateSlides =
            store.getters['templates/getTemplateByID'](templateId).slides
          const presentationSlides = createdPresentation.slides

          const correspondingTemplateSlide = (rfpSlide) =>
            templateSlides?.find(
              (templateSlide) =>
                templateSlide.slide.prePopulatedSlide ===
                rfpSlide.slide.prePopulatedSlide,
            )

          const updatedSlides = presentationSlides.map((presentationSlide) => ({
            ...presentationSlide,
            isEnabled: Boolean(
              correspondingTemplateSlide(presentationSlide)?.isEnabled,
            ),
          }))

          const updateSlideInfoRequestList = updatedSlides.map((slide) => ({
            isEnabled: slide.isEnabled,
            slideInfoId: slide.slideInfoId,
            version: expect.any(Number),
            pageNumber: slide.pageNumber,
            slideCategory: slide.slideCategory,
          }))

          expect(updateSlideInfo).toHaveBeenLastCalledWith(
            {
              presentationId: createdPresentationId,
              updateSlideInfoRequestList,
            },
            expect.anything(),
          )

          expect(createdPresentation.slides).toMatchObject(updatedSlides)
        }
      }

      function setupRfpCreation({
        inputsPrefix,
        expectedRoute,
        wrapper,
        router,
        store,
      }) {
        const inputs = {
          customerName: `${inputsPrefix}_cus_name`,
          contact: {
            name: `${inputsPrefix}-name-contact1`,
            role: `${inputsPrefix}-role-contact1`,
            email: `${inputsPrefix}-email-contact1`,
          },
          customerProblem: `${inputsPrefix}-customerProblem-contact1`,
        }
        const inputNewRfpInputs = async () =>
          inputNewRfp({
            customerName: inputs.customerName,
            contactsName: inputs.contact.name,
            contactsRole: inputs.contact.role,
            contactsEmail: inputs.contact.email,
            contactsCustomerProblem: inputs.customerProblem,
            wrapper,
          })

        const expectRfpCreated = async () =>
          expectRfpIsCreated({
            customerName: inputs.customerName,
            contact: [inputs.contact],
            customerProblem: inputs.customerProblem,
            router,
            expectedRoute,
            store,
          })

        return { inputNewRfpInputs, expectRfpCreated }
      }

      it('should display skip to slides button and should call createRfp api at click', async () => {
        const { wrapper, router, store } = await setupPage(NEW_PRESENTATION_URL)

        const { inputNewRfpInputs, expectRfpCreated } = setupRfpCreation({
          inputsPrefix: `skip_${department}_`,
          expectedRoute: `/${department}/update-presentation/${createdPresentationId}/3/1`,
          router,
          store,
          wrapper,
        })

        await inputNewRfpInputs()

        const skipToSlidesButton = wrapper.find(
          '[data-test="newRfp-skip-to-slides"]',
        )
        await skipToSlidesButton.trigger('click')
        await flushPromises()

        await expectRfpCreated()
      })

      it('Next button should create rfp', async () => {
        const { wrapper, router, store } = await setupPage(NEW_PRESENTATION_URL)

        const { inputNewRfpInputs, expectRfpCreated } = setupRfpCreation({
          inputsPrefix: 'next',
          expectedRoute: `/${department}/update-presentation/${createdPresentationId}/1/2`,
          router,
          store,
          wrapper,
        })

        await inputNewRfpInputs()

        const form = mainRfpForm(wrapper)
        await form.trigger('submit.prevent')

        const nextButton = wrapper.find('[data-test="newRfp-next-slide"]')
        await nextButton.trigger('click')

        await expectRfpCreated()
      })

      it('should return failed api call response with status 500', async () => {
        const { wrapper, router, store } = await setupPage(NEW_PRESENTATION_URL)

        const { inputNewRfpInputs } = setupRfpCreation({
          inputsPrefix: 'duplicateUser',
          router,
          store,
          wrapper,
        })

        await inputNewRfpInputs()

        const failedApiCallResponse = 'client name already exists'
        createRfp.mockImplementationOnce(() => {
          throw failedApiCallResponse
        })

        // hide failedApiCallResponse console error in logs
        hideConsoleErrorOnce(failedApiCallResponse)

        const form = mainRfpForm(wrapper)
        await form.trigger('submit.prevent')

        const nextButton = wrapper.find('[data-test="newRfp-next-slide"]')
        await nextButton.trigger('click')
        await flushPromises()

        expectTextElementsPerDataTest(wrapper, {
          'error-banner': `ERROR${failedApiCallResponse}`,
        })

        expect(router.currentRoute.value.path).toMatch(NEW_PRESENTATION_URL)
      })

      describe('side nav page links should create rfp on click', () => {
        jest.setTimeout(15000)
        for (const step of pageLinkLists) {
          it(`${step.pageName} link should create rfp on click`, async () => {
            const { wrapper, router, store } = await setupPage(
              NEW_PRESENTATION_URL,
            )
            const stepElement = wrapper.find(
              `[data-test*="side-nav-item-${step.pageName}"]`,
            )

            let expectedStepElementLink =
              stepElement.element.getAttribute('href')
            expectedStepElementLink = expectedStepElementLink.replace(
              '/new',
              `/${createdPresentationId}`,
            )

            const { inputNewRfpInputs, expectRfpCreated } = setupRfpCreation({
              inputsPrefix: step.pageName,
              expectedRoute: expectedStepElementLink,
              router,
              wrapper,
              store,
            })
            await inputNewRfpInputs()

            await stepElement.trigger('click')

            await flushPromises()
            await expectRfpCreated()
          })
        }
      })
    })
  }
}

// todo: test ASC
for (const department of ['TRAUMA', 'ASC']) {
  const NEW_PRESENTATION_URL_TO_TEST = `/${department}/new-presentation`
  describe(`New presentations page ${department}`, () =>
    testNewPresentationPage(NEW_PRESENTATION_URL_TO_TEST, department))
}
