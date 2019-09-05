import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

const SLIDE_SELECTION = 'Slide Selection'
const UPDATE_PRESENTATION = 'update-presentation'
export const allRfpSteps = {
  TRAUMA: [
    {
      stepInfo: {
        stepNumber: 1,
        stepName: 'Collaboration',
      },
      pageLinkLists: [
        {
          pageNumber: 1,
          pageName: 'Customer Information',
        },
        {
          pageNumber: 2,
          pageName: 'The Team',
        },
        {
          pageNumber: 3,
          pageName: 'The Customer',
        },
        {
          pageNumber: 4,
          pageName: 'The Discovery',
        },
        {
          pageNumber: 5,
          pageName: 'The Contract',
        },
      ],
    },
    {
      stepInfo: {
        stepNumber: 2,
        stepName: 'Slide Preparation',
      },
      pageLinkLists: [
        {
          pageNumber: 1,
          pageName: 'The Presentation',
        },
        {
          pageNumber: 2,
          pageName: 'Overview',
        },
      ],
    },
    {
      stepInfo: {
        stepNumber: 3,
        stepName: SLIDE_SELECTION,
      },
      pageLinkLists: [
        {
          pageNumber: 1,
          pageName: SLIDE_SELECTION,
        },
      ],
    },
    {
      stepInfo: {
        stepNumber: 4,
        stepName: 'Slide Builder',
      },
      pageLinkLists: [
        {
          pageNumber: 1,
          pageName: 'Edit Slide',
        },
      ],
    },
    {
      stepInfo: {
        stepNumber: 5,
        stepName: 'Generate Link',
      },
      pageLinkLists: [
        {
          pageNumber: 1,
          pageName: 'Edit Link',
        },
      ],
    },
  ],

  ASC: [
    {
      stepInfo: {
        stepNumber: 1,
        stepName: 'Customer Checklist',
      },
      pageLinkLists: [
        {
          pageNumber: 1,
          pageName: 'Customer Overview',
        },
        {
          pageNumber: 2,
          pageName: 'Facility Infrastructure',
        },
        {
          pageNumber: 3,
          pageName: 'Facility Capital',
        },
        {
          pageNumber: 4,
          pageName: 'Facility Equipment',
        },
        {
          pageNumber: 5,
          pageName: 'Miscellaneous',
        },
      ],
    },
    {
      stepInfo: {
        stepNumber: 2,
        stepName: 'Blueprint the Customer',
      },
      pageLinkLists: [
        {
          pageNumber: 1,
          pageName: 'Internal Team',
        },
        {
          pageNumber: 2,
          pageName: 'Customer Stakeholders',
        },
        {
          pageNumber: 3,
          pageName: 'Reconnaissance',
        },
        {
          pageNumber: 4,
          pageName: 'Existing Landscape',
        },
        {
          pageNumber: 5,
          pageName: 'Total Available Market',
        },
        {
          pageNumber: 6,
          pageName: 'Economic Value',
        },
        {
          pageNumber: 7,
          pageName: 'Operational Support',
        },
        {
          pageNumber: 8,
          pageName: 'Clinical Excellence',
        },
        {
          pageNumber: 9,
          pageName: 'Overview',
        },
      ],
    },
    {
      stepInfo: {
        stepNumber: 3,
        stepName: 'Build the Story',
      },
      pageLinkLists: [
        {
          pageNumber: 1,
          pageName: SLIDE_SELECTION,
        },
      ],
    },
    {
      stepInfo: {
        stepNumber: 4,
        stepName: 'Presentation',
      },
      pageLinkLists: [
        {
          pageNumber: 1,
          pageName: 'Edit Slide',
        },
      ],
    },
    {
      stepInfo: {
        stepNumber: 5,
        stepName: 'Generate Link',
      },
      pageLinkLists: [
        {
          pageNumber: 1,
          pageName: 'Edit Link',
        },
      ],
    },
  ],
}

export function getNavStepLink(presentationId, step) {
  if (step < 4) {
    return {
      name: UPDATE_PRESENTATION,
      params: {
        presentationId,
        step,
        subStep: 1,
      },
    }
  } else if (step == 5) {
    return {
      name: 'create-link',
      params: {
        presentationId,
      },
    }
  } else {
    return {
      name: 'builder',
      params: {
        presentationId,
        slideId: 'INTRO1',
      },
    }
  }
}

export default function useAllRfpSteps() {
  const route = useRoute()
  const store = useStore()
  const currentStep = computed(() => route.params.step)
  const currentSubStep = computed(() => route.params.subStep)
  const currentDepartment = computed(
    () => store.getters['setting/getCurrentDepartment'],
  )
  const rfpSteps = computed(() => allRfpSteps[currentDepartment.value])

  function isOverviewPage(step, subStep) {
    if (!step && !subStep) {
      step = currentStep.value
      subStep = currentSubStep.value
    }
    return currentDepartment.value === 'TRAUMA'
      ? step == 2 && subStep == 2
      : step == 2 && subStep == 9
  }

  const currentIsOverviewPage = computed(() => isOverviewPage())

  const isSlideSelectionPage = computed(
    () => currentStep.value == 3 && currentSubStep.value == 1,
  )

  function isBeforeOverviewPage(step, subStep) {
    if (!step && !subStep) {
      step = currentStep.value
      subStep = currentSubStep.value
    }
    return (
      step < 2 ||
      (currentDepartment.value === 'TRAUMA'
        ? step == 2 && subStep < 2
        : step == 2 && subStep < 9)
    )
  }

  const getCurrentRfpStep = (stepNumber) =>
    rfpSteps.value?.find(
      (stepDetail) => stepDetail.stepInfo.stepNumber == stepNumber,
    )

  const rfpStepPageName = computed(() => {
    const currentRfpStep = getCurrentRfpStep(currentStep.value)
    const pageLink = currentRfpStep?.pageLinkLists?.find(
      (pageLink) => pageLink.pageNumber == currentSubStep.value,
    )
    return pageLink?.pageName || ''
  })

  const rfpStepTotalPages = computed(() => {
    if (!isBeforeOverviewPage(currentStep.value, currentStep.value)) {
      return null
    }

    const currentRfpStep = getCurrentRfpStep(currentStep.value)
    const totalPages = currentRfpStep.pageLinkLists?.length

    return {
      current: currentSubStep.value,
      total: totalPages,
    }
  })

  function nextRfpStepPage(presentationId, nextStep, nextPage) {
    const currentRfpStep = getCurrentRfpStep(nextStep)

    if (currentRfpStep.pageLinkLists.length > nextPage) {
      nextPage++
    } else {
      nextStep++
      nextPage = 1
    }

    return {
      name: UPDATE_PRESENTATION,
      params: {
        presentationId,
        step: nextStep,
        subStep: nextPage,
      },
    }
  }

  function previousRfpStepPage(presentationId, nextStep, nextPage) {
    const previousRfpStep = getCurrentRfpStep(nextStep - 1)

    if (nextPage > 1) {
      nextPage--
    } else {
      nextStep--
      nextPage = previousRfpStep.pageLinkLists.length
    }
    return {
      name: UPDATE_PRESENTATION,
      params: {
        presentationId: presentationId,
        step: nextStep,
        subStep: nextPage,
      },
    }
  }

  return {
    isOverviewPage,
    isSlideSelectionPage,
    isBeforeOverviewPage,
    rfpStepPageName,
    rfpStepTotalPages,
    nextRfpStepPage,
    previousRfpStepPage,
    rfpSteps,
    currentIsOverviewPage,
  }
}
