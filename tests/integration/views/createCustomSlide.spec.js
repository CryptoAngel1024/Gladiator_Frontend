/*eslint-env node, jest, amd*/
import { setupPage } from './setupViews.js'
import { DEFAULT_DEPARTMENT } from '@/utils/constants.js'
import { flushPromises } from '@vue/test-utils'
import {
  createSlide,
  fetchCustomSlidesByOwnerId,
  updateCustomSlide,
} from '@/api/custom-slide.api.js'

import { hideConsoleErrorOnce } from './testUtils.js'

jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/link.api')
jest.mock('@/api/custom-slide.api.js')
jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')

const CREATE_CUSTOM_SLIDE_URL_STEP_1 = `/${DEFAULT_DEPARTMENT}/settings/custom-slides/create/1`
const CREATE_CUSTOM_SLIDE_URL_STEP_2 = `/${DEFAULT_DEPARTMENT}/settings/custom-slides/create/2`
const CUSTOM_SLIDES_URL = `/${DEFAULT_DEPARTMENT}/settings/custom-slides`

const testTitle = 'Test Title'
const testSubTitle = 'Test Sub Title'

describe('Create Custom Slide page', () => {
  /**
   * @type {import('@vue/test-utils').VueWrapper}
   * */
  let wrapper

  beforeAll(async () => {
    const setup = await setupPage(CREATE_CUSTOM_SLIDE_URL_STEP_1)
    wrapper = setup.wrapper
  })

  describe('Create custom slide page display', () => {
    it('should show create custom slide title', async () => {
      const pageWrapperTitle = wrapper.find(
        '[data-test="create-custom-slide-title"]',
      )
      expect(pageWrapperTitle.exists()).toBe(true)
      expect(pageWrapperTitle.text()).toBe('Create custom slide')
    })

    it('should show create custom slide steps title', async () => {
      const stepsTitle = wrapper.find('[data-test="custom-slide-steps-title"]')
      expect(stepsTitle.exists()).toBe(true)
      expect(stepsTitle.text()).toBe('Step 1 : Edit the custom slide template')
    })

    it('should show current step', async () => {
      const currentStep = wrapper.find('[data-test="current-step"]')
      expect(currentStep.exists()).toBe(true)
      expect(currentStep.text()).toBe('1/2')
    })

    it('should show sidebar heads', async () => {
      const head1 = wrapper.find('[data-test="custom-slide-sidebar-head1"]')
      const head2 = wrapper.find('[data-test="custom-slide-sidebar-head2"]')
      expect(head1.exists()).toBe(true)
      expect(head1.text()).toBe('Information')
      expect(head2.exists()).toBe(true)
      expect(head2.text()).toBe('Custom Slide')
    })

    it('should show sidebar input lables', async () => {
      const titleLable = wrapper.find(
        '[data-test="custom-slide-sidebar-title-input-lable"]',
      )
      const subTitleLable = wrapper.find(
        '[data-test="custom-slide-sidebar-subTitle-input-lable"]',
      )
      const imageLable = wrapper.find(
        '[data-test="custom-slide-sidebar-image-input-lable"]',
      )
      expect(titleLable.exists()).toBe(true)
      expect(titleLable.text()).toBe('Title')
      expect(subTitleLable.exists()).toBe(true)
      expect(subTitleLable.text()).toBe('Subtitle')
      expect(imageLable.exists()).toBe(true)
      expect(imageLable.text()).toBe('Images')
    })

    it('should show body title', async () => {
      const bodyTitle = wrapper.find('[data-test="custom-slide-body-title"]')
      expect(bodyTitle.exists()).toBe(true)
      expect(bodyTitle.text()).toBe('Slide # : Custom Slide')
    })
  })

  describe('Create custom slide page functionality', () => {
    it('create custom slide close modal test', async () => {
      const { wrapper, router } = await setupPage(
        CREATE_CUSTOM_SLIDE_URL_STEP_1,
      )
      const closeModal = wrapper.find(
        '[data-test="create-custom-slide-closeModal"]',
      )
      expect(closeModal.exists()).toBe(true)
      await closeModal.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.path).toContain(CUSTOM_SLIDES_URL)
    })

    it('stepper buttons test', async () => {
      const { wrapper, router } = await setupPage(
        CREATE_CUSTOM_SLIDE_URL_STEP_1,
      )
      const stepperButtons = wrapper.findAll(`[data-test*="stepper-button-"]`)
      const stepperButton1 = stepperButtons[0].find('button')
      const stepperButton2 = stepperButtons[1].find('button')
      await stepperButton2.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.path).toContain(
        CREATE_CUSTOM_SLIDE_URL_STEP_2,
      )
      await stepperButton1.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.path).toContain(
        CREATE_CUSTOM_SLIDE_URL_STEP_1,
      )
    })

    it('sidebar input toggler buttons test', async () => {
      const { wrapper } = await setupPage(CREATE_CUSTOM_SLIDE_URL_STEP_1)

      const titleTogglerBtn = wrapper.find(
        `[data-test="custom-slide-title-button"]`,
      )
      expect(titleTogglerBtn.exists()).toBe(true)

      const subTitleToggleBtn = wrapper.find(
        `[data-test="custom-slide-subTitle-button"]`,
      )
      expect(subTitleToggleBtn.exists()).toBe(true)

      const titleInput = () =>
        wrapper.find(`[data-test="custom-slide-title-input"]`)

      const subTitleInput = () =>
        wrapper.find(`[data-test="custom-slide-subTitle-textArea"]`)

      expect(titleInput().exists()).toBe(true)
      await titleTogglerBtn.trigger('click')
      expect(titleInput().exists()).toBe(false)

      expect(subTitleInput().exists()).toBe(true)
      await subTitleToggleBtn.trigger('click')
      expect(subTitleInput().exists()).toBe(false)
    })

    it('sidebar input onChange test', async () => {
      const { wrapper } = await setupPage(CREATE_CUSTOM_SLIDE_URL_STEP_1)

      const titleInput = wrapper.find(`[data-test="custom-slide-title-input"]`)
      const subTitleInput = wrapper.find(
        `[data-test="custom-slide-subTitle-textArea"]`,
      )
      const bodyTitleValue = wrapper.find(
        '[data-test="custom-slide-preview-title"]',
      )
      const bodySubTitleValue = wrapper.find(
        '[data-test="custom-slide-preview-subTitle"]',
      )

      expect(bodyTitleValue.text()).toBe('Title')
      await titleInput.setValue(testTitle)
      expect(bodyTitleValue.text()).toBe(testTitle)

      expect(bodySubTitleValue.text()).toBe('Subtitle')
      await subTitleInput.setValue(testSubTitle)
      expect(bodySubTitleValue.text()).toBe(testSubTitle)
    })

    it('next and save buttons saves custom slide', async () => {
      const { wrapper, router } = await setupPage(
        CREATE_CUSTOM_SLIDE_URL_STEP_1,
      )

      const slideInputValues = {
        title: 'Test Title 4',
        subTitle: 'Test Sub Title 3',
      }

      const titleInput = wrapper.find(`[data-test="custom-slide-title-input"]`)
      await titleInput.setValue(slideInputValues.title)

      const subTitleInput = wrapper.find(
        `[data-test="custom-slide-subTitle-textArea"]`,
      )
      await subTitleInput.setValue(slideInputValues.subTitle)

      const nextBtn = wrapper.find(`[data-test="custom-slide-next"]`)
      expect(nextBtn.text()).toBe('Next')
      await nextBtn.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.path).toContain(
        CREATE_CUSTOM_SLIDE_URL_STEP_2,
      )

      const currentStep = wrapper.find('[data-test="current-step"]')
      expect(currentStep.text()).toBe('2/2')

      const stepsTitle = wrapper.find('[data-test="custom-slide-steps-title"]')
      expect(stepsTitle.text()).toBe(
        'Step 2 : Set the position of slide on current presentation',
      )

      const saveButton = wrapper.find('[data-test="save-custom-slide-button"]')
      expect(saveButton.exists()).toBe(true)
      await saveButton.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.path).toContain(CUSTOM_SLIDES_URL)

      const createCustomSlidePayload = {
        customSlideType: 'CUSTOM_SLIDE_1',
        pageNumber: 1,
        slideCategory: 'INTRODUCTION',
        slideData: `{"slideTitle":"${slideInputValues.title}","subTitle":"${slideInputValues.subTitle}","slideCategory":"INTRODUCTION","pageNumber":1,"customSlideType":"CUSTOM_SLIDE_1","version":0,"showTitle":true,"showSubtitle":true,"showImages":true,"numberOfImages":0}`,
        department: 'TRAUMA',
      }
      const updateCustomSlidePayload = {
        pageNumber: 1,
        slideCategory: 'INTRODUCTION',
        slideData: `{"initialSlideInfoId":"87654321-f5f7-4f3e-917c-2fa6079b4599","slideTitle":"${slideInputValues.title}","subTitle":"${slideInputValues.subTitle}","slideCategory":"INTRODUCTION","pageNumber":1,"customSlideType":"CUSTOM_SLIDE_1","version":0,"showTitle":true,"showSubtitle":true,"showImages":true,"numberOfImages":0}`,
        slideInfoId: '87654321-f5f7-4f3e-917c-2fa6079b4599',
      }
      expect(createSlide).toHaveBeenCalledWith(createCustomSlidePayload)
      expect(updateCustomSlide).toHaveBeenCalledWith(updateCustomSlidePayload)

      expect(fetchCustomSlidesByOwnerId).toHaveBeenCalledWith('TRAUMA')
    })

    it('error api response 504', async () => {
      const { wrapper } = await setupPage(CREATE_CUSTOM_SLIDE_URL_STEP_1)
      const failedApiCallResponse =
        'Saving custom slide: Request failed with status code 504'
      createSlide.mockImplementationOnce(() => {
        throw failedApiCallResponse
      })

      // hide failedApiCallResponse console error in logs
      hideConsoleErrorOnce(
        `Cannot create a custom slide: ${failedApiCallResponse}`,
      )

      const titleInput = wrapper.find(`[data-test="custom-slide-title-input"]`)
      await titleInput.setValue(testTitle)
      const subTitleInput = wrapper.find(
        `[data-test="custom-slide-subTitle-textArea"]`,
      )
      await subTitleInput.setValue(testSubTitle)
      const nextBtn = wrapper.find(`[data-test="custom-slide-next"]`)
      await nextBtn.trigger('click')
      await flushPromises()
      const saveButton = wrapper.find('[data-test="save-custom-slide-button"]')
      expect(saveButton.exists()).toBe(true)
      await saveButton.trigger('click')
      await flushPromises()

      const errorBannerHead = wrapper.find('[data-test="error-banner-header"]')
      const errorBannerText = wrapper.find('[data-test="error-banner-message"]')

      expect(errorBannerHead.exists()).toBe(true)
      expect(errorBannerHead.text()).toBe('ERROR')
      expect(errorBannerText.exists()).toBe(true)
      expect(errorBannerText.text()).toMatch(failedApiCallResponse)
    })
  })
})
