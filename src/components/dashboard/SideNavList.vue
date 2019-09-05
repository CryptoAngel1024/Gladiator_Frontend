<template>
  <router-link
    v-if="isOverviewPage(stepNumber, pageNumber)"
    :to="link"
    class="py-2 border border-solid border-red-500 text-center rounded-lg font-bold w-full"
    :class="
      currentStep >= 3 || isOverviewPage(currentStep, currentSubStep)
        ? 'bg-red-500 text-white'
        : 'bg-white text-red-500'
    "
    :data-test="`side-nav-item-${list.pageName}`"
  >
    {{ list.pageName }}
  </router-link>
  <router-link
    v-else
    :to="link"
    class="flex items-center"
    :data-test="`side-nav-item-${list.pageName}`"
  >
    <div :class="isActiveStep ? 'round_1' : 'round'">
      <input
        type="checkbox"
        disabled
        :checked="isActiveStep ? false : inputProgress"
      />
      <label class="border-solid border-4 border-light-blue-500"></label>
    </div>
    <p
      class="pl-3"
      :class="inputProgress || isActiveStep ? 'text-blue-800' : 'text-gray-300'"
    >
      {{ list.pageName }}
    </p>
  </router-link>
  <div
    v-if="isBeforeOverviewPage(stepInfo.stepNumber, list.pageNumber)"
    class="border-l border-dashed border-gray-800 py-3 mx-2 my-1"
  ></div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'
import useAllRfpSteps from '@/data/allRfpSteps.js'
import { rfpUpdateTypesPerStep } from '@/utils/rfpsContentIsEqual.js'

function isUpdatePresentationPage(route) {
  return route.name === 'update-presentation'
}
export default {
  props: {
    list: { type: Object, required: true },
    stepInfo: { type: Object, required: true },
  },
  setup(props) {
    const route = useRoute()
    const store = useStore()
    const pageNumber = computed(() => props.list.pageNumber)
    const stepNumber = computed(() => props.stepInfo.stepNumber)
    const currentStep = computed(() => {
      if (isUpdatePresentationPage(route)) return route.params.step
      else if (route.name == 'builder') return 4
      else return 1
    })
    const department = computed(
      () => store.getters['setting/getCurrentDepartment'],
    )

    const { isOverviewPage, isBeforeOverviewPage } = useAllRfpSteps()

    const currentSubStep = computed(() => {
      if (isUpdatePresentationPage(route)) return route.params.subStep
      else return 1
    })
    const presentationId = computed(() => route.params.presentationId || 'new')

    const isActiveStep = computed(() =>
      isUpdatePresentationPage(route)
        ? currentStep.value == stepNumber.value &&
          currentSubStep.value == pageNumber.value
        : route.name === link.value.name,
    )

    const inputProgress = computed(() =>
      store.getters['rfps/getInputProgressByPresentationId'](
        presentationId.value,
        rfpUpdateTypesPerStep[department.value][
          `${stepNumber.value}.${pageNumber.value}`
        ] || 'link',
      ),
    )

    const link = computed(() =>
      stepNumber.value < 4
        ? {
            name: 'update-presentation',
            params: {
              presentationId: presentationId.value,
              step: stepNumber.value,
              subStep: pageNumber.value,
            },
          }
        : stepNumber.value == 5
        ? {
            name: 'create-link',
            params: {
              presentationId: presentationId.value,
            },
          }
        : {
            name: 'builder',
            params: {
              presentationId: presentationId.value,
              slideId: 'INTRO1',
            },
          },
    )

    return {
      currentStep,
      currentSubStep,
      stepNumber,
      pageNumber,
      link,
      inputProgress,
      isActiveStep,
      isOverviewPage,
      isBeforeOverviewPage,
    }
  },
}
</script>

<style scoped>
.round {
  position: relative;
  height: 15px;
  margin-bottom: 3px;
}

.round label {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: 16px;
  left: 0;
  position: absolute;
  top: 0;
  width: 16px;
}

.round label:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: '';
  height: 7px;
  left: 2px;
  opacity: 0;
  position: absolute;
  top: 2px;
  transform: rotate(-45deg);
  width: 10px;
}

.round input[type='checkbox'] {
  visibility: hidden;
}
.round_1 label {
  background-color: white;
  border: 1px solid #005cc8;
  border-radius: 50%;
  cursor: pointer;
  height: 16px;
  left: 0;
  position: absolute;
  top: 0;
  width: 16px;
}

.round_1 label:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background: #005cc8;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.round input[type='checkbox']:checked + label {
  background-color: #4caf50;
  border-color: #4caf50;
}

.round input[type='checkbox']:checked + label:after {
  opacity: 1;
}

.round_1 {
  position: relative;
  height: 15px;
  margin-bottom: 3px;
}

.round_1 input[type='checkbox'] {
  visibility: hidden;
}

.round_1 input[type='checkbox']:checked + label {
  background-color: #4caf50;
  border-color: #4caf50;
}

.round_1 input[type='checkbox']:checked + label:after {
  opacity: 1;
}
</style>
