/*eslint-env node, jest, amd*/
export function rfpInformationIndex(informationField, department) {
  for (const informationKey in rfpInformationFields[department]) {
    if (rfpInformationFields[department][informationKey] === informationField)
      return informationKey
  }
}

export function hideConsoleWarningOnce(warning) {
  jest.spyOn(console, 'warn').mockImplementationOnce((...err) => {
    if (err[0] !== warning) console.warn(...err)
  })
}

export function hideConsoleErrorOnce(error) {
  jest.spyOn(console, 'error').mockImplementationOnce((...err) => {
    if (err.join('') !== error) console.error(...err)
  })
}

const payloadKeyUpdateInfo = 'update-info'
const dataTestElement = (wrapper, tag) => wrapper.find(`[data-test="${tag}"]`)

const rfpInformationFields = {
  TRAUMA: {
    INFORMATION1: 'contact',
    INFORMATION2: 'customerProblem',
    INFORMATION3: 'tier',
    INFORMATION4: 'stakeholders',
    INFORMATION5: 'discovery',
    INFORMATION6: 'contract',
    INFORMATION7: 'slideSelection',
  },
  ASC: {
    // todo: replace by asc rfp field list
    INFORMATION1: 'customerOverview',
    INFORMATION2: 'facilityInfrastructure',
    INFORMATION3: 'facilityInfrastructureEquipmentCapital',
    INFORMATION4: 'facilityInfrastructureEquipmentGeneral',
    INFORMATION5: 'reimbursementAndPayerMix',
    INFORMATION6: 'stakeholders',
    INFORMATION7: 'reconnaissance',
    INFORMATION8: 'contract',
    INFORMATION9: 'situation',
    INFORMATION10: 'economicValueCapabilities',
    INFORMATION11: 'operationalSupportCapabilities',
    INFORMATION12: 'clinicalExcellence',
    INFORMATION13: 'team',
  },
}

export function traumaRfpInformationField(informationKey, department) {
  return rfpInformationFields[department][informationKey]
}

export function getPayloadPerField(field, data, department, presentationId) {
  const payloadsPerField = {
    customerName: {
      key: 'customer-name',
      payload: { customerName: data },
    },
    internalUserDetails: {
      key: 'internal-team',
      payload: {
        internalTeamDetailList: data
          ?.filter?.(
            (member) =>
              (member.email ||
                member.firstName ||
                member.lastName ||
                member.userId) &&
              member.role !== 'OWNER',
          )
          .map((user) => expect.objectContaining({ ...user, name: undefined })),
        version: expect.any(Number),
      },
    },
    slides: {
      key: 'slide-info',
      payload: {
        updateSlideInfoRequestList: data?.map?.((slide) => ({
          isEnabled: slide.isEnabled,
          pageNumber: slide.slideNumber || slide.pageNumber,
          slideCategory: slide.slideCategory,
          slideInfoId: slide.slideInfoId,
          version: (slide.version || 1) + 1,
        })),
      },
    },
    contact: {
      key: payloadKeyUpdateInfo,
      payload: {
        informationList: [
          {
            data: data ? JSON.stringify(data) : data,
            informationType: rfpInformationIndex('contact', department),
            version: expect.any(Number),
          },
        ],
      },
    },
    customerProblem: {
      key: payloadKeyUpdateInfo,
      payload: {
        informationList: [
          {
            data: data ? JSON.stringify(data) : data,
            informationType: rfpInformationIndex('customerProblem', department),
            version: expect.any(Number),
          },
        ],
      },
    },
  }

  const departmentRfpInformationFields = rfpInformationFields[department]
  for (const informationIndex in departmentRfpInformationFields) {
    const fieldName = departmentRfpInformationFields[informationIndex]
    if (!payloadsPerField[fieldName]) {
      payloadsPerField[fieldName] = {
        key: payloadKeyUpdateInfo,
        presentationInformation: fieldName,
      }

      const informationIndex = rfpInformationIndex(fieldName, department)

      if (typeof data !== 'string') data = JSON.stringify(data)

      payloadsPerField[fieldName].payload = {
        informationList: [
          {
            data,
            informationType: informationIndex,
            version: expect.any(Number),
          },
        ],
      }
    }
  }

  payloadsPerField[field].payload.presentationId = presentationId

  return payloadsPerField[field]
}

export const DEPARTMENTS_DATA = {
  TRAUMA: {
    userId: 'userID1',
    pid: 'ada7476c-7f3a-46cb-af61-39dca7f0303a',
    slideCode: 'QOC_PPH',
    inputStepCount: 4,
    slide_INFOS_Progress: true,
    defualtLastPage: 'CS1',
  },
  ASC: {
    userId: 'userID2',
    pid: '3c890f8a-7f3a-46cb-af61-7d4c9825c1e7',
    slideCode: 'ASC_38',
    inputStepCount: 3,
    slide_INFOS_Progress: false,
    defualtLastPage: 'INTRO1',
  },
}

export function expectTextElementsPerDataTest(wrapper, expectedValues) {
  for (const dataTest in expectedValues) {
    const expectedText = expectedValues[dataTest]

    const textElement = wrapper.find(`[data-test="${dataTest}"]`)

    try {
      expect(textElement.exists()).toBe(true)
      expect(textElement.text() || textElement.element.value || '').toBe(
        expectedText,
      )
    } catch (err) {
      throw { expectedText, dataTest, err }
    }
  }
}

export async function setInputElement({
  wrapper,
  tag,
  updatedValue,
  initialValue,
}) {
  const inputElement = wrapper.find(`[data-test="${tag}"]`)
  if (initialValue) expect(inputElement.element.value).toBe(initialValue)

  await inputElement.setValue(updatedValue)
}

export function expectElementToBeDisabled(wrapperL, tag) {
  const element = dataTestElement(wrapperL, tag)
  expect(element.attributes()['disabled']).toBe('')
}

export function expectElementToExistOrNot(wrapperL, tag, shouldExist) {
  const element = dataTestElement(wrapperL, tag)
  expect(element.exists()).toBe(shouldExist)
  return element
}

export function expectElementsToBeDisabled(wrapperL, tag) {
  const elements = wrapperL.findAll('[data-test*="' + tag + '"]')
  elements.forEach((element) => {
    expect(element.attributes()['disabled']).toBe('')
  })
}
// function expectElementsValue(wrapperL, tag, value) {
//   const elements = wrapperL.findAll('[data-test*="' + tag + '"]')
//   elements.forEach((element) => {
//     expect(element.element.checked).toBe(value)
//   })
// }

export function expectElementValue(wrapperL, tag, value) {
  const element = dataTestElement(wrapperL, tag)
  expect(element.exists()).toBe(true)
  expect(element.text()).toEqual(value)
}

export function expectInputValue(wrapperL, tag, value, isSelected) {
  const element = dataTestElement(wrapperL, tag)
  expect(element.exists()).toBe(true)
  expect(element.element.value).toEqual(value)
  if (isSelected !== undefined)
    expect(element.element.checked).toEqual(isSelected)
}
