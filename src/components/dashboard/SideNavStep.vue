<template>
  <div class="pt-4">
    <router-link :to="getNavStepLink(presentationId, stepInfo.stepNumber)">
      <p
        :data-test="`step-slides-step-number-${stepInfo.stepNumber}`"
        class="text-gray-800"
      >
        Step {{ stepInfo.stepNumber }}
      </p>
      <p
        :data-test="`step-slides-step-name-${stepInfo.stepNumber}`"
        class="text-xl font-bold mb-5"
      >
        {{ stepInfo.stepName }}
      </p>
    </router-link>

    <div
      v-for="navList in pageNames"
      :key="navList.pageNumber"
      class="flex flex-col"
    >
      <SideNavList
        v-if="
          !autoCollapseSteps ||
          currentStep == stepInfo.stepNumber ||
          isOverviewPage(stepInfo.stepNumber, navList.pageNumber)
        "
        :list="navList"
        :step-info="stepInfo"
      />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import SideNavList from './SideNavList.vue'
import useAllRfpSteps, { getNavStepLink } from '@/data/allRfpSteps.js'
import { useStore } from 'vuex'

export default {
  components: {
    SideNavList,
  },
  props: {
    pageNames: { type: Array, required: true },
    stepInfo: { type: Object, required: true },
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const { isOverviewPage } = useAllRfpSteps()
    const department = computed(
      () => store.getters['setting/getCurrentDepartment'],
    )

    const autoCollapseSteps = computed(() => department.value === 'ASC')

    const presentationId = computed(() => route.params.presentationId || 'new')
    const currentStep = computed(() => {
      if (route.name == 'update-presentation') return route.params.step
      else if (route.name == 'builder') return 4
      else if (route.name == 'create-link' || route.name == 'update-link')
        return 5
      else return 1
    })

    return {
      currentStep,
      presentationId,
      autoCollapseSteps,
      isOverviewPage,
      getNavStepLink,
    }
  },
}
</script>
