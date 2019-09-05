import { computed } from 'vue'
import { isEqual } from 'lodash'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { rfpInformationFieldNames } from '@/store/modules/rfps.store'

export const rfpUpdateTypesPerStep = {
  TRAUMA: {
    1.1: 'contact',
    1.2: 'internalUserDetails',
    1.3: 'stakeholders',
    1.4: 'discovery',
    1.5: 'contract',
    2.1: 'slideSelection',
    3.1: 'slides',
  },
  ASC: {
    1.1: 'customerOverview',
    1.2: 'facilityInfrastructure',
    1.3: 'facilityInfrastructureEquipmentCapital',
    1.4: 'facilityInfrastructureEquipmentGeneral',
    1.5: 'reimbursementAndPayerMix',
    2.1: 'internalUserDetails',
    2.2: 'stakeholders',
    2.3: 'reconnaissance',
    2.4: 'contract',
    2.5: 'situation',
    2.6: 'economicValueCapabilities',
    2.7: 'operationalSupportCapabilities',
    2.8: 'clinicalExcellence',
    3.1: 'slides',
  },
}

const rfpSlidesVersionReset = (rfp) =>
  rfp?.slides
    ?.map((slide) => ({
      ...slide,
      slide: { ...slide.slide, version: 0 },
      version: 0,
    }))
    .sort((slideA, slideB) => slideA.slideNumber - slideB.slideNumber)
    .sort((slideA, slideB) => slideA.pageNumber - slideB.pageNumber)

const rfpUsersToCompare = (rfp) =>
  rfp?.internalUserDetails
    ?.map((user) => ({
      ...user,
      shareRfp: '',
      internalUserId: '',
      name: '',
      email: user.email || '',
      role: user.role === 'NONE' ? null : user.role,
    }))
    .sort((userA, userB) =>
      `${userA.firstName}${userA.lastName}${userA.email}`.localeCompare(
        `${userB.firstName}${userB.lastName}${userB.email}`,
      ),
    )
    .filter((user) => user.role !== 'OWNER') || []

export function useCurrentStepRfpUpdateType() {
  const store = useStore()
  const route = useRoute()
  const currentStepNumber = computed(
    () => `${route.params.step || 1}.${route.params.subStep || 1}`,
  )
  const department = computed(
    () => store.getters['setting/getCurrentDepartment'],
  )
  const currentStepRfpUpdateType = computed(
    () => rfpUpdateTypesPerStep[department.value][currentStepNumber.value],
  )
  return { currentStepRfpUpdateType }
}

export function useRfpsContentComparator() {
  const store = useStore()
  const department = computed(
    () => store.getters['setting/getCurrentDepartment'],
  )
  const { currentStepRfpUpdateType } = useCurrentStepRfpUpdateType()

  function rfpsContentIsEqual(rfp1, rfp2) {
    const comparedValues = {
      TRAUMA: {
        slides: () =>
          JSON.stringify(rfpSlidesVersionReset(rfp1)) ===
          JSON.stringify(rfpSlidesVersionReset(rfp2)),
        contact: () =>
          isEqual(rfp1?.contact, rfp2?.contact) &&
          rfp1?.customerName === rfp2?.customerName &&
          rfp1?.customerProblem === rfp2?.customerProblem,
        internalUserDetails: () =>
          isEqual(rfpUsersToCompare(rfp1), rfpUsersToCompare(rfp2)) &&
          rfp1?.tier === rfp2?.tier,
      },
      ASC: {
        customerOverview: () =>
          isEqual(rfp1?.customerOverview, rfp2?.customerOverview) &&
          isEqual(rfpUsersToCompare(rfp1), rfpUsersToCompare(rfp2)) &&
          rfp1?.customerName === rfp2?.customerName &&
          rfp1?.customerUcn === rfp2?.customerUcn &&
          rfp1?.customerAddress === rfp2?.customerAddress,
        slides: () =>
          JSON.stringify(rfpSlidesVersionReset(rfp1)) ===
          JSON.stringify(rfpSlidesVersionReset(rfp2)),
        internalUserDetails: () =>
          isEqual(rfpUsersToCompare(rfp1), rfpUsersToCompare(rfp2)) &&
          isEqual(rfp1?.team, rfp2?.team),
      },
    }

    const departmentValues = comparedValues[department.value]

    rfpInformationFieldNames(department.value).forEach((fieldName) => {
      if (departmentValues[fieldName]) return

      departmentValues[fieldName] = () =>
        isEqual(rfp1?.[fieldName], rfp2?.[fieldName])
    })

    const typeIncludedInComparison =
      currentStepRfpUpdateType.value in departmentValues

    return typeIncludedInComparison
      ? departmentValues[currentStepRfpUpdateType.value]()
      : true
  }

  return { rfpsContentIsEqual }
}
