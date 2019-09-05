/*eslint-env node, jest, amd*/
import { updateRfp, insertCustomSlide, updateSlideInfo } from '@/api/rfps.api'
import {
  createSlide,
  updateCustomSlide,
  fetchCustomSlidesByOwnerId,
} from '@/api/custom-slide.api.js'
import { setupPage } from './setupViews.js'
import { flushPromises } from '@vue/test-utils'
import defaultStakeHolders from '@/data/defaultRfpFields/trauma/defaultStakeHolders.json'
import defaultDiscoveries from '@/data/defaultRfpFields/trauma/defaultDiscoveries.json'
import {
  getInsertedCustomSlide,
  getCreatedSlide,
  getUpdatedCustomSlide,
} from '../../__data__/customSlide/customSlideData'
import {
  hideConsoleWarningOnce,
  hideConsoleErrorOnce,
  setInputElement,
  expectElementToExistOrNot,
  expectInputValue,
  expectElementValue,
  expectElementToBeDisabled,
  expectElementsToBeDisabled,
  expectTextElementsPerDataTest,
} from './testUtils.js'
import { getTemplates } from '@tests/__data__/templates/sampleTemplateData'
import {
  rfpInformationIndex,
  getPayloadPerField,
} from '@tests/integration/views/testUtils'
import { allRfpSteps } from '@/data/allRfpSteps.js'
import { cloneDeep } from 'lodash'

jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/link.api')
jest.mock('@/api/custom-slide.api.js')
jest.mock('@/api/templates.api.js')

function getPresentationById(store, presentationId) {
  const presentation = store.getters['rfps/getPresentationById'](presentationId)
  return presentation
}

const invalidCustomerNameMessageElement = (wrapper) =>
  wrapper.find('[data-test="customer-info-step-name-invalid"]')

const noSelectedFileToUploadWarning = 'no selected file to upload'

const inputTagCustomerNameInput = 'customer-name-input'

const ENABLED_SLIDE_CLASS = 'bg-accent-blue'
const CUSTOMER_NAME_OVERVIEW_CLASS = 'text-3xl'
const CUSTOM_SLIDE_STEPS_TITLES = {
  1: 'Step 1 : Edit the custom slide template',
  2: 'Step 2 : Set the position of slide on current presentation',
  3: 'Step 1 : Select the custom slide',
}

async function displayInvalidCustomerNameWarning(getWrapper) {
  const { wrapper } = await getWrapper()

  hideConsoleWarningOnce(noSelectedFileToUploadWarning)

  const invalidCustomerName = '!nvalaid $ustomer Nam@'

  hideConsoleErrorOnce(
    `Customer Name Contains Invalid Values: ${invalidCustomerName}`,
  )

  await setInputElement({
    wrapper,
    tag: inputTagCustomerNameInput,
    updatedValue: invalidCustomerName,
  })

  expect(invalidCustomerNameMessageElement(wrapper).exists()).toBe(true)

  expect(updateRfp).not.toHaveBeenCalledWith(
    undefined,
    expect.objectContaining({
      customerName: invalidCustomerName,
    }),
    expect.anything(),
  )

  await setInputElement({
    wrapper,
    tag: inputTagCustomerNameInput,
    updatedValue: 'validName',
  })

  expect(invalidCustomerNameMessageElement(wrapper).exists()).toBe(false)
}

const getUpdatePresentationUrl = ({
  step,
  subStep,
  department,
  presentationId,
}) => `/${department}/update-presentation/${presentationId}/${step}/${subStep}`

export async function setUpRfpForUpdate({
  step,
  subStep,
  department,
  presentationId,
}) {
  const updatePresentationUrl = getUpdatePresentationUrl({
    step,
    subStep,
    department,
    presentationId,
  })

  const { wrapper, router, store } = await setupPage(updatePresentationUrl)
  const getPresentation = () => getPresentationById(store, presentationId)

  return { wrapper, router, store, getPresentation }
}

async function expectRfpIsUpdated({
  router,
  store,
  expectedRoute,
  updates,
  updatedPresentaionFields = {},
  department,
  presentationId,
}) {
  await flushPromises()
  updates.forEach((update) => {
    const calledWith = getPayloadPerField(
      update,
      updatedPresentaionFields[update],
      department,
      presentationId,
    )
    const sPath = calledWith.key
    expect(updateRfp).toHaveBeenCalledWith(
      sPath,
      expect.objectContaining({
        presentationId,
        ...calledWith.payload,
      }),
      expect.anything(),
    )
  })

  const updatedPresentation = getPresentationById(store, presentationId)
  expect(updatedPresentation).toMatchObject(updatedPresentaionFields)

  if (expectedRoute)
    expect(router.currentRoute.value.path).toMatch(expectedRoute)
}

export async function clickNext({
  wrapper,
  router,
  department,
  presentationId,
  expectedStep,
}) {
  const form = wrapper.find('[data-test="next-submite-form"]')
  await form.trigger('submit.prevent')

  const nextButton = wrapper.find('[data-test="newRfp-next-slide"]')
  expect(nextButton.exists()).toBe(true)
  await nextButton.trigger('click')

  await flushPromises()

  if (expectedStep) {
    const expectedRoute = getUpdatePresentationUrl({
      step: expectedStep.step,
      subStep: expectedStep.subStep,
      department,
      presentationId,
    })
    expect(router.currentRoute.value.path).toMatch(expectedRoute)
  }
}

async function clickSkipToSlides({
  wrapper,
  router,
  department,
  presentationId,
}) {
  const form = wrapper.find('[data-test="next-submite-form"]')
  await form.trigger('submit.prevent')

  const skipToSlidesButton = wrapper.find('[data-test="newRfp-skip-to-slides"]')
  expect(skipToSlidesButton.exists()).toBe(true)
  await skipToSlidesButton.trigger('click')

  await flushPromises()
  const expectedRoute = getUpdatePresentationUrl({
    step: 3,
    subStep: 1,
    department,
    presentationId,
  })
  expect(router.currentRoute.value.path).toMatch(expectedRoute)
}

async function testTierInputTrauma(
  { router, store, wrapper, getPresentation },
  { presentationId, department },
) {
  const currentPresentaion = getPresentation()

  const tiers = {
    TIER_4: 'TIER1_3',
    TIER1_3: 'TIER_4',
  }
  const tier = {
    tier: tiers[currentPresentaion.tier] || 'TIER1_3',
  }

  const tier1_3Input = wrapper.find('[data-test="the-team-tier1_3-input"]')
  expect(tier1_3Input.exists()).toBe(true)
  await tier1_3Input.setChecked()

  await expectRfpIsUpdated({
    router,
    expectedRoute: `/${department}/update-presentation/${presentationId}/1/2`,
    store,
    updatedPresentaionFields: {
      ...currentPresentaion,
      ...tier,
    },
    subPath: 'tier',
    apiPayload: tier,
    updates: ['tier', 'internalUserDetails'],
    presentationId,
    department,
  })

  const internalUserDetailsPayload = currentPresentaion.internalUserDetails
    .filter(({ role }) => role !== 'OWNER')
    .map((user) => ({
      ...user,
      userId: user.userId || undefined,
      name: undefined,
    }))

  expect(updateRfp).toHaveBeenCalledWith(
    'internal-team',
    expect.objectContaining({
      presentationId: presentationId,
      internalTeamDetailList: internalUserDetailsPayload,
    }),
    expect.anything(),
  )
}

async function testInternalUsersEditor(
  { router, store, wrapper, getPresentation },
  { presentationId, department },
) {
  const currentPresentaion = getPresentation()

  async function expectUsersAreUpdated(updatedUsers) {
    const fieldsToUpdate = {
      TRAUMA: ['internalUserDetails', 'tier'],
      ASC: ['internalUserDetails', 'team'],
    }

    await expectRfpIsUpdated({
      router,
      store,
      updatedPresentaionFields: {
        ...currentPresentaion,
        internalUserDetails: updatedUsers,
      },
      subPath: 'internal-team',
      apiPayload: {
        internalTeamDetailList: updatedUsers,
      },
      updates: fieldsToUpdate[department],
      presentationId,
      department,
    })
  }

  const clonedInternalUserDetails = cloneDeep(
    currentPresentaion.internalUserDetails,
  )
  const nonOwnerUsers = () =>
    clonedInternalUserDetails.filter(({ role }) => role !== 'OWNER')

  // update internal user detail
  const userTypeToUpdate = 'REGIONAL MANAGER'
  const updatedName = 'regionalManager1'
  const updatedEmail = 'regionalManger1@gmail.com'

  const internalUserToUpdate = nonOwnerUsers().find(
    (user) => user.userType === userTypeToUpdate,
  )
  internalUserToUpdate.lastName = updatedName

  await setInputElement({
    wrapper,
    tag: 'team-row-name-' + userTypeToUpdate,
    updatedValue: updatedName,
  })

  await expectUsersAreUpdated(nonOwnerUsers())

  await setInputElement({
    wrapper,
    tag: 'team-row-email-' + userTypeToUpdate,
    updatedValue: updatedEmail,
  })

  internalUserToUpdate.email = updatedEmail
  delete internalUserToUpdate.internalUserId
  delete internalUserToUpdate.userId

  await expectUsersAreUpdated(nonOwnerUsers())

  const shareYesButton = wrapper.find(
    '[data-test="team-row-shareRfp-yes-' + userTypeToUpdate + '"]',
  )
  await shareYesButton.setChecked(true)

  const viewButton = wrapper.find(
    '[data-test="team-row-access-view-' + userTypeToUpdate + '"]',
  )
  await viewButton.setChecked(true)

  internalUserToUpdate.shareRfp = true
  internalUserToUpdate.role = 'VIEWER'
  internalUserToUpdate.internalUserId = expect.any(String)
  internalUserToUpdate.userId = expect.any(String)

  await expectUsersAreUpdated(nonOwnerUsers())

  const shareNoButton = wrapper.find(
    '[data-test="team-row-shareRfp-no-' + userTypeToUpdate + '"]',
  )
  await shareNoButton.setChecked(true)
  internalUserToUpdate.shareRfp = false
  internalUserToUpdate.role = 'NONE'

  await expectUsersAreUpdated(nonOwnerUsers())
}

async function testTraumaStep6(
  { router, store, wrapper },
  { presentationId, department },
) {
  const currentPresentaion = getPresentationById(store, presentationId)

  const keyNameList = {
    keyName_1: 'prebuiltValueStories',
    keyName_2: 'sourceView',
    keyName_3: 'isPricingLever',
    keyName_4: 'tpsSolutions',
    keyName_5: 'receptiveeSIMS',
    keyName_6: 'sterileContainers',
    keyName_7: 'universalSmallFrag',
    keyName_8: 'capitalPlacementProgram',
    // keyName_9: 'typeofTraumaHospital',
    keyName_10: 'savingsSummary',
    keyName_11: 'surgeonPlan',
    keyName_12: 'implementationPlan',
    keyName_13: 'aoSlides',
    // keyName_14: 'productPortfolio',
    keyName_15: 'salesTeam',
    keyName_16: 'overviewofDPS',
    keyName_17: 'biologics',
    keyName_18: 'rebatesNBI',
    keyName_19: 'instrumentWarranty',
    keyName_20: 'profedSlide',
    keyName_21: 'futureLeaders',
    keyName_22: 'partnershipSellingProducts',
    keyName_23: 'upcomingInnovation',
    keyName_24: 'propack',
    keyName_25: 'drg',
    keyName_26: 'hipFractureCare',
  }
  const slideIdentifier = {
    radioSlide_1: ['SAV3', 'SAV4', 'SAV5', 'SAV6'],
    radioSlide_2: ['SAV8'],
    radioSlide_3: [],
    radioSlide_4: ['SAV14', 'SAV15'],
    radioSlide_5: ['SAV13'],
    radioSlide_6: ['SAV9', 'SAV10'],
    radioSlide_7: ['SAV11', 'SAV12'],
    radioSlide_8: [],
    radioSlide_9: ['INTR5', 'INTR6', 'INTR7', 'INTR8'],
    radioSlide_10: ['SAV24'],
    radioSlide_11: ['SRG2'],
    radioSlide_12: ['EDU3'],
    radioSlide_13: ['QOC6', 'QOC7'],
    // radioSlide_14: ['APPD1', 'APPD1'],
    radioSlide_15: ['CS1'],
    radioSlide_16: ['SRG1'],
    radioSlide_17: ['SAV21', 'SAV22'],
    radioSlide_18: ['SAV23'],
    radioSlide_19: ['QOC1'],
    radioSlide_20: ['EDU1'],
    radioSlide_21: ['EDU2'],
    radioSlide_22: ['PORT4'],
    radioSlide_23: ['PORT7'],
    radioSlide_24: ['PORT5', 'PORT6'],
    radioSlide_25: ['APDX0', 'APDX1', 'APDX2'],
    introSlides: ['INTRO1', 'INTR_PPH', 'INTR1', 'INTR2', 'INTR3', 'INTR4'],
    radioSlide_26: ['QOC3', 'QOC4'],
  }
  const expectedSlideSelection = cloneDeep(currentPresentaion.slideSelection)
  const clonedSlides = JSON.parse(JSON.stringify(currentPresentaion.slides))
  const enabledSlideIds = []

  function enableClonedSlide(slideCode) {
    const slide = clonedSlides.find(
      (s) =>
        s.slideCode === slideCode || s.slide.prePopulatedSlide === slideCode,
    )

    if (slide) {
      slide.isEnabled = true
      enabledSlideIds.push(slide.pageNumber)
    }
  }

  slideIdentifier.introSlides.forEach(enableClonedSlide)

  for (const key in keyNameList) {
    const obj = {}
    obj[keyNameList[key]] = true

    const updatedSlideCodes = slideIdentifier['radioSlide_' + key.split('_')[1]]

    updatedSlideCodes.forEach(enableClonedSlide)

    const configInput = wrapper.find(
      '[data-test="presentation-config-' + keyNameList[key] + '"]',
    )
    expect(configInput.exists()).toBe(true)
    await flushPromises()
    await configInput.setChecked(true)
    expectedSlideSelection[keyNameList[key]] = true
  }

  await expectRfpIsUpdated({
    router,
    expectedRoute: `/${department}/update-presentation/${presentationId}/2/1`,
    store,
    updatedPresentaionFields: {
      ...currentPresentaion,
      slideSelection: expectedSlideSelection,
      slides: clonedSlides,
    },
    updates: ['slideSelection'], // todo: add slides payload ckeck
    presentationId,
    department: 'TRAUMA',
  })

  return { enabledSlideIds }
}

async function expectTraumaRfpIsUpdatedStep1_1({
  contact,
  customerName,
  customerProblem,
  expectedRoute,
  router,
  store,
  subPath,
  updates,
  presentationId,
}) {
  await expectRfpIsUpdated({
    router,
    store,
    expectedRoute,
    subPath,
    updates,
    updatedPresentaionFields: {
      contact,
      customerName,
      customerProblem,
    },
    presentationId,
    department: 'TRAUMA',
  })
}

async function expectAscRfpIsUpdatedStep1_1({
  customerName,
  expectedRoute,
  router,
  store,
  subPath,
  updates,
  presentationId,
}) {
  await expectRfpIsUpdated({
    router,
    store,
    expectedRoute,
    subPath,
    updates,
    updatedPresentaionFields: {
      customerName,
    },
    presentationId,
    department: 'ASC',
  })
}

async function testTeamUsersDisplay(wrapper, getPresentation, department) {
  const presentation = getPresentation()

  const rmRole = 'REGIONAL MANAGER'
  const DEFAULT_ROLES = {
    TRAUMA: [
      rmRole,
      'TEAM LEAD (AVP, DSA)',
      'CONTRACT DIRECTOR',
      'DEAL DESK',
      'COMMERCIAL EXECUTION',
      'CAPABILITIES',
      'HEMA',
      'SUPPLY CHAIN',
    ],
    ASC: [
      rmRole,
      'ASC Sr. FLELD MANAGER',
      'TEAM LEAD(AVP)',
      'CONTRACT DIRECTOR',
      'DEAL DESK',
      'ENABLING TECH',
      'POWER  TOOLS',
      'SUPPLY CHAIN CUSTOMER SOLUTIONS',
      'COMMERCIAL EXECUTION',
      'OTHERS SOLUTIONS (ie. eSIMS, HEMA)',
    ],
  }

  DEFAULT_ROLES[department].forEach((role) => {
    const tag = 'team-role-' + role
    expectElementToExistOrNot(wrapper, tag, true)

    if (department === 'ASC') expectElementValue(wrapper, tag, role)
    else expectInputValue(wrapper, tag, role)

    const nameTag = 'team-row-name-' + role
    const internalUser = presentation.internalUserDetails.find(
      (f) => f.userType === role,
    )
    if (internalUser) {
      expectInputValue(
        wrapper,
        nameTag,
        internalUser.firstName + internalUser.lastName,
      )
      const emailTag = 'team-row-email-' + role
      expectInputValue(wrapper, emailTag, internalUser.email)
    }
  })
}

export const wizardSteps = {
  allSteps: (wizardPage, { department, step, subStep }) => ({
    'should show correct page wapper': () => {
      const { wrapper, getPresentation } = wizardPage
      const textElements = {
        'page-wrapper-header': '',
        'header-bread-crumps-page-name-newRfp': `Home \\ Update Presentation\\ ${
          allRfpSteps[department][step - 1].pageLinkLists[subStep - 1].pageName
        }`,
        'page-title': getPresentation().customerName + ' Presentation Deck',
        title:
          allRfpSteps[department][step - 1].pageLinkLists[subStep - 1].pageName,
      }

      expectTextElementsPerDataTest(wrapper, textElements)
    },
  }),
  1: {
    1: {
      display: {
        ALL_DEPARTMENTS: (wizardPage) => ({
          testWizardStep: {
            'should show correct page wapper'() {
              const { wrapper, getPresentation } = wizardPage
              const textElements = {
                'page-wrapper-header': '',
                'page-title':
                  getPresentation().customerName + ' Presentation Deck',
              }
              expectTextElementsPerDataTest(wrapper, textElements)
            },
          },
        }),
        TRAUMA: (wizardPage) => ({
          testWizardStep: {
            async 'should display correct customer name'() {
              const { wrapper, getPresentation } = wizardPage

              const textElements = {
                'customer-name-lable': 'Customer Name*',
                [inputTagCustomerNameInput]: getPresentation().customerName,
              }
              expectTextElementsPerDataTest(wrapper, textElements)
            },

            'should display correct customer info'() {
              const { wrapper, getPresentation } = wizardPage
              const currentPresentaion = getPresentation()

              const nameInvalidMessage =
                invalidCustomerNameMessageElement(wrapper)
              expect(nameInvalidMessage.exists()).toBe(false)

              const sideLogo = wrapper.find('[data-test="customer-logo"]')
              expect(sideLogo.exists()).toBe(true)

              const contacts = currentPresentaion.contact

              const allContactRows = wrapper.findAll(
                '[data-test*="contacts-table-row-"]',
              )
              const contactRows = allContactRows.filter(
                (row) =>
                  row.find('[data-test="contacts-table-name-input"]').element
                    .value ||
                  row.find('[data-test="contacts-table-role-input"]').element
                    .value ||
                  row.find('[data-test="contacts-table-email-input"]').element
                    .value,
              )
              expect(contactRows.length).toEqual(contacts.length)

              const contactNameInputs = contactRows.map((row) =>
                row.find('[data-test="contacts-table-name-input"]'),
              )
              expect(contactNameInputs.length).toEqual(contacts.length)

              const contactRoleInputs = contactRows.map((row) =>
                row.find('[data-test="contacts-table-role-input"]'),
              )
              expect(contactRoleInputs.length).toEqual(contacts.length)

              const contactEmailInputs = contactRows.map((row) =>
                row.find('[data-test="contacts-table-email-input"]'),
              )
              expect(contactEmailInputs.length).toEqual(contacts.length)

              contacts.forEach((contact, index) => {
                expect(contactNameInputs[index].element.value).toEqual(
                  contact.name,
                )
                expect(contactRoleInputs[index].element.value).toEqual(
                  contact.role,
                )
                expect(contactEmailInputs[index].element.value).toEqual(
                  contact.email,
                )
              })

              const insightHelp = wrapper.find(
                '[data-test="customer-info-step-insights-help"]',
              )
              expect(insightHelp.exists()).toEqual(true)
              expect(insightHelp.text()).toEqual(
                'Please list your information that would be helpful about this customer',
              )

              const insightComment = wrapper.find(
                '[data-test="customer-problem-input"]',
              )
              expect(insightComment.exists()).toBe(true)

              expect(insightComment.element.value).toEqual(
                currentPresentaion.customerProblem || '',
              )
            },
          },
        }),
        ASC: (wizardPage) => ({
          testWizardStep: {
            async 'should display correct customer name'() {
              const { wrapper, getPresentation } = wizardPage

              const textElements = {
                'customer-name-lable': 'Customer Name',
                [inputTagCustomerNameInput]: getPresentation().customerName,
              }
              expectTextElementsPerDataTest(wrapper, textElements)
            },
          },
        }),
      },
      functionality: {
        TRAUMA: (getWrapper, { presentationId, department = 'TRAUMA' }) => ({
          testWizardStep: {
            async 'should update customer name and problem'() {
              const updatedCustomerName = `Updated Customer Name ${department}`
              const updatedCustomerProblem = `Updated Customer Problem ${department}`

              const { wrapper, store, router, getPresentation } =
                await getWrapper()

              const currentPresentaion = getPresentation()

              hideConsoleWarningOnce(noSelectedFileToUploadWarning)
              await setInputElement({
                wrapper,
                tag: inputTagCustomerNameInput,
                updatedValue: updatedCustomerName,
                initialValue: currentPresentaion.customerName,
              })

              await flushPromises()

              await expectTraumaRfpIsUpdatedStep1_1({
                customerName: updatedCustomerName,
                contact: currentPresentaion.contact,
                customerProblem: currentPresentaion.customerProblem,
                router,
                expectedRoute: `/${department}/update-presentation/${presentationId}/1/1`,
                store,
                ownerId: currentPresentaion.owner,
                updates: ['customerName', 'contact', 'customerProblem'],
                presentationId,
              })

              hideConsoleWarningOnce(noSelectedFileToUploadWarning)
              await setInputElement({
                wrapper,
                tag: 'customer-problem-input',
                updatedValue: updatedCustomerProblem,
                initialValue: currentPresentaion.customerProblem,
              })

              const expected = {
                customerName: updatedCustomerName,
                contact: currentPresentaion.contact,
                customerProblem: updatedCustomerProblem,
                router,
                expectedRoute: `/${department}/update-presentation/${presentationId}/1`,
                store,
                ownerId: currentPresentaion.owner,
                updates: ['customerName', 'contact'],
                presentationId,
              }
              await expectTraumaRfpIsUpdatedStep1_1(expected)
            },

            async 'add button should add table column (cells)'() {
              const { wrapper, getPresentation } = await getWrapper()

              const addMoreBtn = wrapper.find('[data-test="add-more"]')
              const contactsTableRows = () =>
                wrapper.findAll('[data-test*="contacts-table-row-"]')
              const contacts = JSON.parse(
                getPresentation().informations[
                  rfpInformationIndex('contact', department)
                ],
              )
              expect(contactsTableRows().length).toBe(contacts.length)
              await addMoreBtn.trigger('click')
              expect(contactsTableRows().length).toBe(contacts.length + 1)
            },
          },

          additionalWizardStepTests: {
            async 'should display invalid customer name'() {
              displayInvalidCustomerNameWarning(getWrapper)
            },
          },
        }),
        ASC: (getWrapper, { presentationId, department = 'ASC' }) => ({
          testWizardStep: {
            async 'should update customer name'() {
              const updatedCustomerName = `Updated Customer Name ${department}`

              const { wrapper, store, router, getPresentation } =
                await getWrapper()

              const currentPresentaion = getPresentation()

              hideConsoleWarningOnce(noSelectedFileToUploadWarning)
              await setInputElement({
                wrapper,
                tag: inputTagCustomerNameInput,
                updatedValue: updatedCustomerName,
                initialValue: currentPresentaion.customerName,
              })

              await flushPromises()

              await expectAscRfpIsUpdatedStep1_1({
                customerName: updatedCustomerName,
                router,
                expectedRoute: `/${department}/update-presentation/${presentationId}/1/1`,
                store,
                ownerId: currentPresentaion.owner,
                updates: ['customerName'],
                presentationId,
              })
            },
          },

          additionalWizardStepTests: {
            async 'should display invalid customer name warning'() {
              displayInvalidCustomerNameWarning(getWrapper)
            },
          },
        }),
      },
    },
    2: {
      display: {
        TRAUMA: (wizardPage) => ({
          testWizardStep: {
            async 'should display correct tier'() {
              const { wrapper, getPresentation } = wizardPage
              const presentation = getPresentation()

              const teamLabel = wrapper.find('[data-test="the-team-header"]')
              expect(teamLabel.exists()).toBe(true)
              expect(teamLabel.text()).toBe('Pull the Internal Team Together')

              const tier3Tag = 'the-team-tier1_3-input'
              expectElementToExistOrNot(wrapper, tier3Tag, true)
              expectInputValue(
                wrapper,
                tier3Tag,
                'TIER1_3',
                presentation.tier === 'TIER1_3',
              )

              const tier4Tag = 'the-team-tier4-input'
              expectElementToExistOrNot(wrapper, tier4Tag, true)
              expectInputValue(
                wrapper,
                tier4Tag,
                'TIER_4',
                presentation.tier === 'TIER_4',
              )
            },
            async 'should display correct team'() {
              const { wrapper, getPresentation } = wizardPage
              await testTeamUsersDisplay(wrapper, getPresentation, 'TRAUMA')
            },
          },
        }),
        ASC() {},
      },
      functionality: {
        TRAUMA: (getWrapper, { presentationId, department = 'TRAUMA' }) => ({
          testWizardStep: {
            async 'should save tier'() {
              const { wrapper, store, router, getPresentation } =
                await getWrapper()

              await testTierInputTrauma(
                { router, store, wrapper, getPresentation },
                { presentationId, department },
              )
            },
            async 'should save user updates'() {
              const { wrapper, store, router, getPresentation } =
                await getWrapper()

              await testInternalUsersEditor(
                { router, store, wrapper, getPresentation },
                { presentationId, department },
              )
            },
          },
        }),
      },
    },
    3: {
      display: {
        TRAUMA: (wizardPage) => ({
          testWizardStep: {
            async 'should display correct customer'() {
              const { wrapper, getPresentation } = wizardPage
              const presentation = getPresentation()

              const customerHeaderTag = 'stake-holder-msg'
              expectElementToExistOrNot(wrapper, customerHeaderTag, true)
              expectElementValue(
                wrapper,
                customerHeaderTag,
                'Map Stakeholders at the Customer',
              )
              defaultStakeHolders.forEach((sh) => {
                const sh_nameTag = 'stake-holder-name-input-' + sh.title
                expectElementToExistOrNot(wrapper, sh_nameTag, true)

                const stakeHolderDetail = presentation.stakeholders.find(
                  (f) => f.title === sh.title,
                )

                expectInputValue(
                  wrapper,
                  sh_nameTag,
                  stakeHolderDetail.name || '',
                )
              })
            },
          },
        }),
        ASC() {},
      },
      functionality: {
        TRAUMA: (getWrapper, { presentationId, department = 'TRAUMA' }) => ({
          testWizardStep: {
            async 'should save the customer'() {
              const { wrapper, store, router, getPresentation } =
                await getWrapper()
              const currentPresentaion = getPresentation()

              // update the customer (stakeholders)
              const stakeHolderTitle =
                defaultStakeHolders[defaultStakeHolders.length - 1]
              const stakeHolderUpdateName = 'Hospital Analyst Updated Name'
              const oldStakeHolders = currentPresentaion.stakeholders
              const oldStakeHolderData = oldStakeHolders.find(
                (f) => f.title === stakeHolderTitle.title,
              )
              oldStakeHolderData.name = stakeHolderUpdateName

              await setInputElement({
                wrapper,
                tag: 'stake-holder-name-input-' + stakeHolderTitle.title,
                updatedValue: stakeHolderUpdateName,
              })

              await expectRfpIsUpdated({
                router,
                expectedRoute: `/${department}/update-presentation/${presentationId}/1/3`,
                store,
                updatedPresentaionFields: {
                  ...currentPresentaion,
                  stakeholders: oldStakeHolders,
                },
                subPath: 'stakeholder',
                apiPayload: {
                  stakeHolder: JSON.stringify(oldStakeHolders),
                },
                updates: ['stakeholders'],
                presentationId,
                department,
              })
            },
          },
        }),
      },
    },
    4: {
      display: {
        TRAUMA: (wizardPage) => ({
          testWizardStep: {
            async 'should display dicovery, contract info'() {
              const { wrapper, getPresentation } = wizardPage
              const presentation = getPresentation()

              const discoveryHeaderTag = 'discovery-step-msg'
              expectElementToExistOrNot(wrapper, discoveryHeaderTag, true)
              expectElementValue(
                wrapper,
                discoveryHeaderTag,
                'Collect Reconnaissance and Discover Customer Problem to Be Solved',
              )

              defaultDiscoveries.forEach((disc) => {
                const discoveryAnnualTag = 'disovery-annual-input-' + disc.title
                const discoveryDetail = presentation.discovery.find(
                  (f) => f.title === disc.title,
                )

                expectElementToExistOrNot(wrapper, discoveryAnnualTag, true)
                expectInputValue(
                  wrapper,
                  discoveryAnnualTag,
                  discoveryDetail.annual || '',
                )

                const discoveryMsTag = 'disovery-ms-input-' + disc.title
                expectElementToExistOrNot(wrapper, discoveryMsTag, true)
                expectInputValue(
                  wrapper,
                  discoveryMsTag,
                  discoveryDetail.ms || '',
                )

                const discoveryNotesTag = 'disovery-notes-input-' + disc.title
                expectElementToExistOrNot(wrapper, discoveryNotesTag, true)
                expectInputValue(
                  wrapper,
                  discoveryNotesTag,
                  discoveryDetail.need || '',
                )
              })
            },
          },
        }),
        ASC() {},
      },
      functionality: {
        TRAUMA: (getWrapper, { presentationId, department = 'TRAUMA' }) => ({
          testWizardStep: {
            async 'should save the discovery updates correctly'() {
              const { wrapper, store, router, getPresentation } =
                await getWrapper()

              const currentPresentaion = getPresentation()

              // update discovery
              const discovery =
                defaultDiscoveries[defaultDiscoveries.length - 1]
              const discoveryUpdatedAnnual = '1.23333'
              const discoveries = currentPresentaion.discovery
              const discoveryData = discoveries.find(
                (f) => f.title === discovery.title,
              )
              discoveryData.annual = discoveryUpdatedAnnual

              await setInputElement({
                wrapper,
                tag: 'disovery-annual-input-' + discovery.title,
                updatedValue: discoveryUpdatedAnnual,
              })

              await expectRfpIsUpdated({
                router,
                expectedRoute: `/${department}/update-presentation/${presentationId}/1/4`,
                store,
                updatedPresentaionFields: {
                  ...currentPresentaion,
                  discovery: discoveries,
                },
                subPath: 'discovery',
                apiPayload: {
                  discovery: JSON.stringify(discoveries),
                },
                updates: ['discovery'],
                presentationId,
                department,
              })
            },
          },
        }),
      },
    },
    5: {
      display: {
        TRAUMA: (wizardPage) => ({
          testWizardStep: {
            async 'should display contract info'() {
              const { wrapper, getPresentation } = wizardPage
              const presentation = getPresentation()

              expectElementValue(
                wrapper,
                'scan-existing-contract',
                'Scan Existing Contract Landscape',
              )
              expectElementValue(
                wrapper,
                'contract-sub-header',
                'Scan and Record The Contract Landscape',
              )
              const oldContract = presentation.contract

              const contractDetail = {
                gpoAffilation: '',
                numberAndName: '',
                endDate: '',
                notes: '',
              }
              for (const key in contractDetail) {
                const contractInput = wrapper.find(
                  '[data-test="contract-' + key + '"]',
                )
                expect(contractInput.exists()).toBe(true)
                expect(contractInput.element.value).toEqual(oldContract[key])
              }
            },
          },
        }),
        ASC() {},
      },
      functionality: {
        TRAUMA: (getWrapper, { presentationId, department = 'TRAUMA' }) => ({
          additionalWizardStepTests: {
            async 'should save contract updates correctly'() {
              const { wrapper, store, router, getPresentation } =
                await getWrapper()

              const currentPresentaion = getPresentation()

              // update contract
              const currentExpectedContract = cloneDeep(
                currentPresentaion.contract,
              )
              const contractFieldsToUpdate = {
                gpoAffilation: 'GPO Affilation Updated',
                numberAndName: 'Number and Name Updated',
              }

              for (const key in contractFieldsToUpdate) {
                const updated = {}
                updated[key] = contractFieldsToUpdate[key]

                await setInputElement({
                  wrapper,
                  tag: 'contract-' + key,
                  updatedValue: contractFieldsToUpdate[key],
                  initialValue: currentExpectedContract[key],
                })
                currentExpectedContract[key] = contractFieldsToUpdate[key]
              }

              for (const item in contractFieldsToUpdate) {
                currentExpectedContract[item] = contractFieldsToUpdate[item]
                await expectRfpIsUpdated({
                  router,
                  expectedRoute: `/${department}/update-presentation/${presentationId}/1/5`,
                  store,
                  updatedPresentaionFields: {
                    ...currentPresentaion,
                    contract: currentExpectedContract,
                  },
                  subPath: 'contract',
                  apiPayload: {
                    contract: currentExpectedContract,
                  },
                  updates: ['contract'],
                  presentationId,
                  department,
                })
              }

              await expectRfpIsUpdated({
                router,
                expectedRoute: `/${department}/update-presentation/${presentationId}/1/5`,
                store,
                updatedPresentaionFields: {
                  ...currentPresentaion,
                  contract: currentExpectedContract,
                },
                subPath: 'contract',
                apiPayload: {
                  contract: JSON.stringify(currentExpectedContract),
                },
                updates: ['contract'],
                presentationId,
                department,
              })
            },
          },
        }),
      },
    },
  },
  2: {
    1: {
      display: {
        ASC: (wizardPage) => ({
          testWizardStep: {
            async 'should display correct team'() {
              const { wrapper, getPresentation } = wizardPage
              await testTeamUsersDisplay(wrapper, getPresentation, 'ASC')
            },
          },
        }),
      },
      functionality: {
        TRAUMA: (getWrapper, { presentationId, department = 'TRAUMA' }) => ({
          testWizardStep: {
            async 'should configure the presentation slides'() {
              jest.setTimeout(30000)
              const { wrapper, store, router } = await getWrapper()

              await testTraumaStep6(
                {
                  router,
                  store,
                  wrapper,
                },
                { presentationId, department },
              )
            },
          },
          additionalWizardStepTests: {
            async 'should configure the presentation slides'() {
              jest.setTimeout(30000)
              const { wrapper, store, router } = await getWrapper()

              const { enabledSlideIds } = await testTraumaStep6(
                {
                  router,
                  store,
                  wrapper,
                },
                { presentationId, department },
              )

              // go to the contract page
              await clickSkipToSlides({
                wrapper,
                router,
                department,
                presentationId,
              })

              // assert all enabled slides have bg-accent blue class and others text-gray-425
              enabledSlideIds.forEach((id) => {
                const selectedSlideDiv = wrapper.find(
                  '[data-test="slide-selection-div-' + id + '"]',
                )
                expect(selectedSlideDiv.exists()).toEqual(true)
                expect(selectedSlideDiv.classes()).toContain(
                  ENABLED_SLIDE_CLASS,
                )
              })
            },
          },
        }),
        ASC: (getWrapper, { presentationId, department = 'ASC' }) => ({
          testWizardStep: {
            async 'should update team users'() {
              const { wrapper, router, store, getPresentation } =
                await getWrapper()
              await testInternalUsersEditor(
                { wrapper, router, store, getPresentation },
                { presentationId, department },
              )
            },
          },
        }),
      },
    },
    2: {
      functionality: {
        TRAUMA: (getWrapper, { presentationId }) => ({
          testWizardStep: {
            async 'should display presenation overview'() {
              const { wrapper, store } = await getWrapper()

              const currentPresentaion = getPresentationById(
                store,
                presentationId,
              )

              // verify customer info
              const breadCrumpsPageName = wrapper.find(
                '[data-test="header-bread-crumps-page-name-newRfp"]',
              )
              expect(breadCrumpsPageName.exists()).toBe(true)
              expect(breadCrumpsPageName.text()).toContain('Overview')
              const cardTitle = wrapper.find('[ data-test="title"]')
              expect(cardTitle.exists()).toBe(true)
              expect(cardTitle.text()).toContain('Overview')

              const customerName = wrapper.find(
                '[data-test="customer-name-input"]',
              )
              expect(customerName.exists()).toBe(true)
              expect(customerName.element.value).toBe(
                currentPresentaion.customerName,
              )
              expect(customerName.classes()).toContain(
                CUSTOMER_NAME_OVERVIEW_CLASS,
              )
              expectElementToBeDisabled(wrapper, inputTagCustomerNameInput)
              expectElementToBeDisabled(wrapper, 'customer-problem-input')
              expectElementToExistOrNot(wrapper, 'add-more', false)
              expectElementToExistOrNot(
                wrapper,
                'customer-info-step-insights-help',
                false,
              )

              // verify the team info
              expectElementToBeDisabled(wrapper, 'the-team-tier1_3-input')
              // verify the customer
              expectElementToExistOrNot(wrapper, 'stake-holder-msg', false)
              // verify the discovery
              expectElementToExistOrNot(wrapper, 'discovery-step-msg', false)
              expectElementToExistOrNot(wrapper, 'dicovery-table-header', true)
              // verify the contract
              expectElementToExistOrNot(
                wrapper,
                'scan-existing-contract',
                false,
              )
              expectElementToExistOrNot(
                wrapper,
                'contract-priceAvailable',
                false,
              )
              expectElementToExistOrNot(wrapper, 'sfdc-case-number', false)
              // verify the presenation
              expectElementsToBeDisabled(wrapper, 'presentation-config')
              // expectElementsValue(wrapper, 'presentation-config', false)
            },
          },
        }),
      },
    },
  },
  3: {
    1: {
      functionality: {
        TRAUMA: (getWrapper, { presentationId, department = 'TRAUMA' }) =>
          slideSelectionPageTests(getWrapper, { presentationId, department }),
        // todo: enable
        // ASC: (getWrapper, { presentationId, department = 'ASC' }) =>
        //   slideSelectionPageTests(getWrapper, { presentationId, department }),
      },
    },
  },
}

function slideSelectionPageTests(getWrapper, { presentationId, department }) {
  return {
    testWizardStep: {
      async 'should enable or disable slides'() {
        const { wrapper, getPresentation } = await getWrapper()

        const slideNumber = 19
        const slide0 = wrapper.find(
          `[data-test="selection-item-${slideNumber}"]`,
        )
        const toggleSlideButton = expectElementToExistOrNot(
          slide0,
          'toggleSlide',
          true,
        )

        const isEnabled = () => {
          const currentPresentaion = getPresentation()
          const slide = currentPresentaion.slides.find(
            (sl) => sl.pageNumber === slideNumber,
          )
          return slide.isEnabled
        }
        const isInitiallyEnabled = isEnabled()

        await toggleSlideButton.trigger('click')
        flushPromises()
        expect(isEnabled()).toBe(!isInitiallyEnabled)

        const updateSlideInfoRequestList = getPresentation().slides.map(
          (sl) => ({
            isEnabled: sl.isEnabled,
            slideInfoId: sl.slideInfoId,
            version: expect.any(Number),
            pageNumber: sl.pageNumber,
            slideCategory: sl.slideCategory,
          }),
        )

        expect(updateSlideInfo).toHaveBeenCalledWith(
          {
            presentationId: presentationId,
            updateSlideInfoRequestList,
          },
          expect.anything(),
        )
      },

      async 'should load enabled slides from template'() {
        const { wrapper, getPresentation } = await getWrapper()

        const { templateId } = getTemplates(department)[1]
        const mockTemplate = getTemplates(department).find(
          (t) => t.templateId === templateId,
        )

        const templateEnabledSlides = mockTemplate.slides
          .filter((sl) => sl.isEnabled)
          .map((sl) => sl.slide.prePopulatedSlide)

        const templateOption = expectElementToExistOrNot(
          wrapper,
          'select-template-' + templateId,
          true,
        )
        await templateOption.setSelected()

        const storeSlides = getPresentation().slides

        const enabledSlidesByTemplate = storeSlides
          .filter((sl) => sl.isEnabled)
          .map((sl) => sl.slide.prePopulatedSlide)

        expect(enabledSlidesByTemplate).toEqual(templateEnabledSlides)

        const updateSlideInfoRequestList = getPresentation().slides.map(
          (slide) => ({
            isEnabled: slide.isEnabled,
            slideInfoId: slide.slideInfoId,
            version: expect.any(Number),
            pageNumber: slide.pageNumber,
            slideCategory: slide.slideCategory,
          }),
        )

        expect(updateSlideInfo).toHaveBeenCalledWith(
          {
            presentationId,
            updateSlideInfoRequestList,
          },
          expect.anything(),
        )
      },

      async 'should add new custom slide'() {
        jest.setTimeout(15000)
        const { wrapper, router, getPresentation } = await getWrapper()

        const currentPresentaion = getPresentation()

        const addCustomSlideButton = wrapper.find(
          '[data-test="add-custom-slide"]',
        )
        expect(addCustomSlideButton.exists()).toBe(true)
        await addCustomSlideButton.trigger('click')

        const openNewCustomSlideButton = wrapper.find(
          '[data-test="open-new-custom-slide"]',
        )
        expect(openNewCustomSlideButton.exists()).toBe(true)
        await openNewCustomSlideButton.trigger('click')
        await flushPromises()
        const expectedRoute =
          getUpdatePresentationUrl({
            step: 3,
            subStep: 1,
            department,
            presentationId,
          }) + '/custom-slides/new/1'
        expect(router.currentRoute.value.path).toMatch(expectedRoute)
        expectElementValue(
          wrapper,
          'create-custom-slide-title',
          'Create custom slide',
        )

        expectElementValue(
          wrapper,
          'custom-slide-steps-title',
          CUSTOM_SLIDE_STEPS_TITLES['1'],
        )

        const titleButton = wrapper.find(
          '[data-test="custom-slide-title-button"]',
        )
        const titleInputTag = 'custom-slide-title-input'
        expectElementToExistOrNot(wrapper, titleInputTag, true)
        expect(titleButton.exists()).toBe(true)
        await titleButton.trigger('click')
        expectElementToExistOrNot(wrapper, titleInputTag, false)

        const subTitleButton = wrapper.find(
          '[data-test="custom-slide-subTitle-button"]',
        )
        const subTitleInputTag = 'custom-slide-subTitle-textArea'
        expectElementToExistOrNot(wrapper, subTitleInputTag, true)
        expect(subTitleButton.exists()).toBe(true)
        await subTitleButton.trigger('click')
        expectElementToExistOrNot(wrapper, subTitleInputTag, false)

        // update title and assert its shown in preview panel
        const titleValue = 'Awesome_Title'
        const subTitleValue = 'Awesome_Subtitle'

        await titleButton.trigger('click')
        await setInputElement({
          wrapper,
          tag: titleInputTag,
          updatedValue: titleValue,
        })

        await subTitleButton.trigger('click')
        await setInputElement({
          wrapper,
          tag: subTitleInputTag,
          updatedValue: subTitleValue,
        })

        expectElementValue(wrapper, 'custom-slide-preview-title', titleValue)
        expectElementValue(
          wrapper,
          'custom-slide-preview-subTitle',
          subTitleValue,
        )

        const nextButton = wrapper.find('[data-test="custom-slide-next"]')
        await nextButton.trigger('click')
        await flushPromises()
        const expectedRoute2 =
          getUpdatePresentationUrl({
            step: 3,
            subStep: 1,
            department,
            presentationId,
          }) + '/custom-slides/new/2'
        expect(router.currentRoute.value.path).toMatch(expectedRoute2)
        expectElementValue(
          wrapper,
          'custom-slide-steps-title',
          CUSTOM_SLIDE_STEPS_TITLES['2'],
        )

        const customSlideByTitleTag = 'slide-by-title-' + titleValue
        expectElementToExistOrNot(wrapper, customSlideByTitleTag, true)

        const saveCustomSlideButton = wrapper.find(
          '[data-test="save-custom-slide-button"]',
        )

        const customSlide = getInsertedCustomSlide()
        const slideContent = JSON.parse(customSlide.slide.slideContent)
        slideContent.slideTitle = titleValue
        slideContent.subTitle = subTitleValue
        delete slideContent.initialSlideInfoId
        customSlide.slide.slideContent = JSON.stringify(slideContent)
        const slides = currentPresentaion.slides
        slides.push(customSlide)
        insertCustomSlide.mockImplementationOnce(() =>
          Promise.resolve({
            ...currentPresentaion,
            slides,
          }),
        )
        await saveCustomSlideButton.trigger('click')
        await flushPromises()
        const expectedRoute8 = getUpdatePresentationUrl({
          step: 3,
          subStep: 1,
          department,
          presentationId,
        })
        expect(router.currentRoute.value.path).toMatch(expectedRoute8)

        const customSlideDivTag = `slideTitle-${titleValue}`
        const customSlideDiv = expectElementToExistOrNot(
          wrapper,
          customSlideDivTag,
          true,
        )
        expect(customSlideDiv.text()).toContain(titleValue)

        // assert create, update and insert custom clide apis are called
        const createSlideCalledWith = {
          customSlideType: customSlide.slide.customSlideType,
          pageNumber: customSlide.pageNumber,
          slideCategory: customSlide.slideCategory,
          slideData: JSON.stringify(slideContent),
          department: department,
        }
        const slideInfoId = getCreatedSlide().slideInfoId
        const updateSlideCalledWith = {
          slideInfoId: slideInfoId,
          pageNumber: customSlide.pageNumber,
          slideCategory: customSlide.slideCategory,
          slideData: JSON.stringify({
            initialSlideInfoId: slideInfoId,
            ...slideContent,
          }),
        }
        const insertCustomSlideCalledWith = {
          customSlideId: getUpdatedCustomSlide().slide.slideId,
          pageNumber: customSlide.pageNumber,
          slideCategory: customSlide.slideCategory,
          presentationId: presentationId,
        }
        expect(createSlide).toHaveBeenCalledWith(createSlideCalledWith)
        expect(updateCustomSlide).toHaveBeenCalledWith(updateSlideCalledWith)
        expect(fetchCustomSlidesByOwnerId).toHaveBeenCalledWith(department)
        expect(insertCustomSlide).toHaveBeenCalledWith(
          insertCustomSlideCalledWith,
        )
      },
    },
  }
}
