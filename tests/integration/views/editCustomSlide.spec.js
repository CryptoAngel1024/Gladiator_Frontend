/*eslint-env node, jest, amd*/
import { setupPage } from './setupViews.js'
import { DEFAULT_DEPARTMENT } from '@/utils/constants.js'
import { flushPromises } from '@vue/test-utils'
import {
  fetchCustomSlidesByOwnerId,
  updateCustomSlide,
} from '@/api/custom-slide.api.js'
import { hideConsoleErrorOnce } from './testUtils.js'
import getCustomSlidesByOwnerId from '../../__data__/customSlide/getCustomSlidesByOwnerId.json'

jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/rfps.api')
jest.mock('@/api/link.api')
jest.mock('@/api/custom-slide.api.js')
jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')

const slideInfoId = getCustomSlidesByOwnerId[0].slideInfoId

const EDIT_CUSTOM_SLIDE_URL_STEP1 = `/${DEFAULT_DEPARTMENT}/settings/custom-slides/edit/${slideInfoId}/1`
const EDIT_CUSTOM_SLIDE_URL_STEP2 = `/${DEFAULT_DEPARTMENT}/settings/custom-slides/edit/${slideInfoId}/2`
const CUSTOM_SLIDES_URL = `/${DEFAULT_DEPARTMENT}/settings/custom-slides`

describe('Edit Custom Slide page', () => {
  /**
   * @type {import('@vue/test-utils').VueWrapper}
   * */
  let wrapper

  beforeAll(async () => {
    const setup = await setupPage(EDIT_CUSTOM_SLIDE_URL_STEP1)
    wrapper = setup.wrapper
  })

  describe('Edit Custom Slide page display', () => {
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

  describe('Edit Custom Slide page functionality', () => {
    it('create custom slide close modal test', async () => {
      const { wrapper, router } = await setupPage(EDIT_CUSTOM_SLIDE_URL_STEP1)
      const closeModal = wrapper.find(
        '[data-test="create-custom-slide-closeModal"]',
      )
      expect(closeModal.exists()).toBe(true)
      await closeModal.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.path).toContain(CUSTOM_SLIDES_URL)
    })

    it('stepper buttons test', async () => {
      const { wrapper, router } = await setupPage(EDIT_CUSTOM_SLIDE_URL_STEP1)
      const steppper = wrapper.findAll(`[data-test*="stepper-button-"]`)
      const steppperButton1 = steppper[0].find('button')
      const steppperButton2 = steppper[1].find('button')

      await steppperButton2.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.path).toContain(
        EDIT_CUSTOM_SLIDE_URL_STEP2,
      )

      await steppperButton1.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.path).toContain(
        EDIT_CUSTOM_SLIDE_URL_STEP1,
      )
    })

    it('sidebar input toggler buttons test', async () => {
      const { wrapper } = await setupPage(EDIT_CUSTOM_SLIDE_URL_STEP1)

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
      const { wrapper } = await setupPage(EDIT_CUSTOM_SLIDE_URL_STEP1)

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

      expect(bodyTitleValue.text()).toBe('tes12')
      await titleInput.setValue('Test Title')
      expect(bodyTitleValue.text()).toBe('Test Title')

      expect(bodySubTitleValue.text()).toBe('Subtitle')
      expect(subTitleInput.element.value).toBe('')
      await subTitleInput.setValue('Test Sub Title')
      expect(bodySubTitleValue.text()).toBe('Test Sub Title')
    })

    it('next buttons test', async () => {
      const { wrapper, router } = await setupPage(EDIT_CUSTOM_SLIDE_URL_STEP1)

      const titleInput = wrapper.find(`[data-test="custom-slide-title-input"]`)
      await titleInput.setValue('Test Title 67')
      const subTitleInput = wrapper.find(
        `[data-test="custom-slide-subTitle-textArea"]`,
      )
      await subTitleInput.setValue('Test Sub Title 89')
      await flushPromises()
      const nextBtn = wrapper.find(`[data-test="custom-slide-next"]`)
      expect(nextBtn.text()).toBe('Next')
      await nextBtn.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.path).toContain(
        EDIT_CUSTOM_SLIDE_URL_STEP2,
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

      const updateCustomSlidePayload = {
        pageNumber: 1,
        slideCategory: 'INTRODUCTION',
        slideData: `{"initialSlideInfoId":"${slideInfoId}","slideTitle":"${titleInput.element.value}","subTitle":"${subTitleInput.element.value}","slideCategory":"INTRODUCTION","pageNumber":1,"customSlideType":"CUSTOM_SLIDE_1","version":0,"showTitle":true,"showSubtitle":true,"showImages":true,"numberOfImages":1,"slideInfoId":"${slideInfoId}"}`,
        slideInfoId,
      }
      expect(updateCustomSlide).toHaveBeenCalledWith(updateCustomSlidePayload)

      expect(fetchCustomSlidesByOwnerId).toHaveBeenCalledWith('TRAUMA')
    })

    it('error api response 504', async () => {
      const { wrapper } = await setupPage(EDIT_CUSTOM_SLIDE_URL_STEP2)
      const failedApiCallResponse =
        'Saving custom slide: Request failed with status code 504'
      updateCustomSlide.mockImplementationOnce(() => {
        throw failedApiCallResponse
      })

      // hide failedApiCallResponse console error in logs
      hideConsoleErrorOnce(
        `Cannot update the custom slide: ${failedApiCallResponse}`,
      )

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
