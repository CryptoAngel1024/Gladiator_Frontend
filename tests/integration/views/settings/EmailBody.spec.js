/*eslint-env node, jest, amd*/
import { updateUser } from '@/api/user.api'
import {
  mockUserDetail,
  defaultEmailBody,
} from '../../../__data__/auth/authData.js'

import { setupPage } from '../setupViews.js'
jest.mock('@/api/user.api')
jest.mock('@/api/notification.api')
jest.mock('@/api/pingIdAuth.js')

for (const department of ['ASC', 'TRAUMA']) {
  describe(`EmailBody page spec ${department}`, () => {
    /**
     * @type {import('@vue/test-utils').VueWrapper}
     * */
    let wrapper
    let tinymc

    beforeEach(() => {
      tinymc = {
        activeEditor: {
          execCommand: jest.fn(),
        },
        init: () => {},
      }

      global.tinymce = tinymc
    })

    beforeAll(async () => {
      const setup = await setupPage(`/${department}/settings/email-body`)
      wrapper = setup.wrapper
    })

    describe(`EmailBody page display`, () => {
      it('should show correct title', () => {
        const pageWrapperHeader = wrapper.find(
          '[data-test="page-wrapper-header"]',
        )
        expect(pageWrapperHeader.exists()).toBe(true)
        expect(pageWrapperHeader.text()).toBe('Settings')
      })

      it('should display correct headerBreadCrumps', () => {
        const breadCrumpsPageName = wrapper.find(
          '[data-test="header-bread-crumps-page-name"]',
        )
        expect(breadCrumpsPageName.exists()).toBe(true)
        expect(breadCrumpsPageName.text()).toBe('Settings')
      })

      it('should display correct card title', () => {
        const tabAccountSettings = wrapper.find(
          '[data-test="tab-panel-account-settings"]',
        )
        expect(tabAccountSettings.exists()).toBe(true)
        expect(tabAccountSettings.text()).toBe('Account Settings')
      })

      it('should display correct active tab title', () => {
        const tabActiveItem = wrapper.find(
          '[data-test="tab-panel-active-item"]',
        )
        expect(tabActiveItem.exists()).toBe(true)
        expect(tabActiveItem.text()).toBe('Email Body')
      })

      it('should display the defualt email Instruction title', () => {
        const instructionHeader = wrapper.find(
          '[data-test="instruction-header"]',
        )
        expect(instructionHeader.exists()).toBe(true)
        expect(instructionHeader.text()).toContain('Instruction')
      })

      it('should display the defualt email Instruction body', () => {
        const instructionBody = wrapper.find('[data-test="instruction-body"]')
        expect(instructionBody.exists()).toBe(true)
        expect(instructionBody.text()).toContain(
          'Use the area on the left to customize your Gladiator email template.',
        )
      })

      it('should display tinymce editor', () => {
        const emailEditor = wrapper.getComponent(
          '[data-test="email-body-editor"]',
        )
        expect(emailEditor.exists()).toBe(true)
      })
    })

    describe(`EmailBody page functionality`, () => {
      it('should add link tag to tiny editor on Link Tag button click', async () => {
        const linkButton = wrapper.getComponent('[data-test="link-button"]')
        expect(linkButton.text()).toBe('Link tag')

        await linkButton.trigger('click')
        expect(tinymc.activeEditor.execCommand).toBeCalled()
        expect(tinymc.activeEditor.execCommand.mock.calls[0][2]).toContain(
          '{link}',
        )
      })

      it('should add passcode to tinymce editor when passcode button clicked', async () => {
        const passcodeButton = wrapper.getComponent(
          '[data-test="passcode-button"]',
        )
        expect(passcodeButton.text()).toBe('Passcode tag')

        await passcodeButton.trigger('click')
        expect(tinymc.activeEditor.execCommand).toBeCalled()
        expect(tinymc.activeEditor.execCommand.mock.calls[0][2]).toContain(
          '{passcode}',
        )
      })

      it('should call API update user when Save button clicked', async () => {
        const saveButton = wrapper.getComponent('[data-test="save-button"]')
        expect(saveButton.text()).toBe('Save')

        await saveButton.trigger('click')

        expect(updateUser).toHaveBeenCalled()

        expect(updateUser.mock.calls[0][0]).toMatchObject({
          emailBody:
            mockUserDetail.emailBody || defaultEmailBody(mockUserDetail),
          firstName: mockUserDetail.firstName,
          lastName: mockUserDetail.lastName,
          id: mockUserDetail.id,
        })
      })
    })
  })
}
