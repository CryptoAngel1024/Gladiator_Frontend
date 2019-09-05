/*eslint-env node, jest, amd*/
import { allRfpSteps } from '@/data/allRfpSteps.js'
import { getSampleUpdatePresentation } from '@tests/__data__/rfps/sampleRfps.js'
import {
  wizardSteps,
  setUpRfpForUpdate,
  clickNext,
} from './presentationWizardUtils.js'
import { DEPARTMENTS_DATA } from './testUtils.js'

jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')

for (const department of ['ASC', 'TRAUMA']) {
  const presentationId = DEPARTMENTS_DATA[department].pid

  describe(`Update presentation page: ${department}`, () => {
    const presentationToEdit = getSampleUpdatePresentation(
      department,
      presentationId,
    )

    forEachSubstep(department, ({ step, subStep, pageName }) =>
      describe(`Step ${step}.${subStep}: ${pageName}`, () => {
        let wizardPage = {}
        beforeAll(async () => {
          const { wrapper, store, router } = await setUpRfpForUpdate({
            step,
            subStep,
            department,
            presentationId,
          })
          wizardPage.wrapper = wrapper
          wizardPage.router = router
          wizardPage.store = store
          wizardPage.getPresentation = () =>
            store.getters['rfps/getPresentationById'](presentationId)
        })

        const allStepTests = wizardSteps.allSteps(wizardPage, {
          department,
          step,
          subStep,
          presentationToEdit,
        })
        for (const testName in allStepTests) {
          it(testName, allStepTests[testName])
        }

        if (wizardSteps[step][subStep]) {
          testDisplayingWizardSteps(
            step,
            subStep,
            department,
            wizardPage,
            presentationToEdit,
            presentationId,
          )

          testWizardStepsFunctionalities(
            step,
            subStep,
            department,
            presentationId,
            presentationToEdit,
          )
        }
      }),
    )

    // https://github.com/facebook/jest/issues/11543
    jest.setTimeout(30000)
    it('navigates wizard', async () => {
      jest.setTimeout(30000)
      const wizardPage = await setUpRfpForUpdate({
        step: 1,
        subStep: 1,
        department,
        presentationId,
      })
      const getWrapper = () => wizardPage

      await forEachSubstepAsync(department, async ({ step, subStep }) => {
        for (const dep of ['ALL_DEPARTMENTS', department]) {
          const allStepTests = wizardSteps.allSteps(wizardPage, {
            department,
            step,
            subStep,
            presentationToEdit,
          })
          for (const testName in allStepTests) {
            await allStepTests[testName]()
          }

          const functionalityTests = wizardSteps[step][subStep]?.functionality[
            dep
          ]?.(getWrapper, {
            department,
            presentationId,
            presentationToEdit,
          })

          for (const testName in functionalityTests?.testWizardStep) {
            await functionalityTests?.testWizardStep[testName]()
          }

          const displayTests = wizardSteps[step][subStep]?.display?.[dep]?.(
            wizardPage,
            {
              department,
              presentationToEdit,
              presentationId,
            },
          )

          for (const testName in displayTests?.testWizardStep) {
            await displayTests?.testWizardStep[testName]()
          }
        }

        await clickNext({
          wrapper: wizardPage.wrapper,
          router: wizardPage.router,
          department,
          presentationId,
        })
      })
    })
  })
}

function testWizardStepsFunctionalities(
  step,
  subStep,
  department,
  presentationId,
  presentationToEdit,
) {
  if (wizardSteps[step][subStep].functionality)
    describe('Functionality', () => {
      const getWrapper = async () =>
        setUpRfpForUpdate({
          step,
          subStep,
          department,
          presentationId,
        })

      for (const dep of ['ALL_DEPARTMENTS', department]) {
        const functionalityTests = wizardSteps[step][subStep].functionality[
          dep
        ]?.(getWrapper, {
          department,
          presentationId,
          presentationToEdit,
        })

        for (const testName in functionalityTests?.testWizardStep) {
          it(testName, functionalityTests.testWizardStep[testName])
        }
        for (const testName in functionalityTests?.additionalWizardStepTests) {
          it(testName, functionalityTests.additionalWizardStepTests[testName])
        }
      }
    })
}

function testDisplayingWizardSteps(
  step,
  subStep,
  department,
  wizardPage,
  presentationToEdit,
  presentationId,
) {
  if (wizardSteps[step][subStep].display)
    describe('Display', () => {
      for (const dep of ['ALL_DEPARTMENTS', department]) {
        const displayTests = wizardSteps[step][subStep].display[dep]?.(
          wizardPage,
          {
            department,
            presentationToEdit,
            presentationId,
          },
        )
        for (const testName in displayTests?.testWizardStep) {
          it(testName, displayTests.testWizardStep[testName])
        }
      }
    })
}

function forEachSubstep(department, func) {
  for (const step of [1, 2, 3]) {
    const { pageLinkLists } = allRfpSteps[department][step - 1]
    for (const { pageNumber: subStep, pageName } of pageLinkLists) {
      func({ step, subStep, pageName })
    }
  }
}

async function forEachSubstepAsync(department, func) {
  for (const step of [1, 2, 3]) {
    const { pageLinkLists } = allRfpSteps[department][step - 1]

    for (const { pageNumber: subStep, pageName } of pageLinkLists) {
      await func({ step, subStep, pageName })
    }
  }
}
