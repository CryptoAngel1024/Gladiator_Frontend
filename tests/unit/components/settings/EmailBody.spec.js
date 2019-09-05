/*eslint-env node, jest, amd*/
import EmailBody from '@/components/setting/EmailBody.vue'
import * as mockStore from '../../../__mocks__/store.mock.js'
import mountComponent from '../mountComponent.js'

jest.mock('@/api/pingIdAuth.js')
describe('EmailBody Component spec', () => {
  /**
   * @type {import('@vue/test-utils').VueWrapper}
   * */
  let wrapper
  const { updateUserArgument, settingStoreModule, settingActions } = mockStore

  beforeEach(() => {
    const tinymc = {
      activeEditor: {
        execCommand: () => {},
      },
      init: () => {},
    }

    global.tinymce = tinymc
  })

  beforeAll(() => {
    wrapper = mountComponent(EmailBody)
  })

  it('should call fetch user onmount', () => {
    expect(settingActions.fetchUser).toHaveBeenCalled()
  })

  it('should call fetch default email body', () => {
    expect(settingStoreModule.getters.emailBody).toHaveBeenCalled()
  })

  it('should display the defualt email Instruction title', () => {
    const div = wrapper.get('[data-test="instruction-header"]')
    expect(div.exists()).toBe(true)
    expect(div.text()).toContain('Instruction')
  })

  it('should display the defualt email Instruction body', () => {
    const div = wrapper.find('[data-test="instruction-body"]')
    expect(div.exists()).toBe(true)
    expect(div.text()).toContain(
      'Use the area on the left to customize your Gladiator email template.',
    )
  })

  it('should call ga-event(linkTag-click) when link tag clikecd', async () => {
    const linkButton = wrapper.getComponent('[data-test="link-button"]')
    expect(linkButton.text()).toBe('Link tag')

    await linkButton.trigger('click')
  })

  it('should call ga-event(passCodeTag-click) when passcode button clicked', async () => {
    const passcodeButton = wrapper.getComponent('[data-test="passcode-button"]')
    expect(passcodeButton.text()).toBe('Passcode tag')

    await passcodeButton.trigger('click')
  })

  it('should call ga-event(cancle-at-emailBody-click)  when Cancel button clicked', async () => {
    const cancelButton = wrapper.getComponent('[data-test="cancel-button"]')
    expect(cancelButton.text()).toBe('Cancel')

    await cancelButton.trigger('click')
  })

  it('should call update-user when Save button clicked', async () => {
    const saveButton = wrapper.getComponent('[data-test="save-button"]')
    expect(saveButton.text()).toBe('Save')

    await saveButton.trigger('click')

    expect(settingActions.updateUser).toHaveBeenCalled()
    expect(settingActions.updateUser.mock.calls[0][1]).toEqual({
      emailBody: updateUserArgument,
    })
  })
})
