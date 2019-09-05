/*eslint-env node, jest, amd*/
import sampleTemplates from '../../__data__/templates/sampleTemplates.json'
import { testNewPresentationPage } from './newRfp.spec.js'

jest.mock('@/api/pingIdAuth.js')
jest.mock('@/api/s3Files.js')
const template = sampleTemplates[0]
const { templateId } = template

// todo: test ASC
for (const department of ['TRAUMA']) {
  const NEW_PRESENTATION_URL_TO_TEST = `/${department}/new-presentation/${templateId}`

  describe(`New presentation template page: ${department}`, () =>
    testNewPresentationPage(
      NEW_PRESENTATION_URL_TO_TEST,
      department,
      templateId,
    ))
}
