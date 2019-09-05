<template>
  <div
    v-if="showCollapsedSideMenu"
    class="flex-none w-70 bg-white p-6 min-h-screen"
    :class="
      showHambergerMenu
        ? 'absolute z-30 w-60 mt-0 ml-0 shadow h-full '
        : 'mt-8 ml-8'
    "
  >
    <SideNavStep
      v-for="step in rfpSteps"
      :key="step"
      :step-info="step.stepInfo"
      :page-names="step.pageLinkLists"
    />
    <div
      v-if="showHambergerMenu && showAscFooter"
      class="flex fixed bottom-0 left-auto pt-2 bg-white"
      :class="!showCollapsedSideMenu ? 'pb-1' : 'pb-2'"
    >
      <img class="w-44" src="@/assets/logo/asc_logo_expanded.png" alt="logo" />
    </div>
  </div>
</template>

<script>
import SideNavStep from '@/components/dashboard/SideNavStep.vue'
import useShowHambergerMenu from './SideMenu/showHambergerMenu.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    SideNavStep,
  },
  setup() {
    const { showCollapsedSideMenu, showHambergerMenu, showAscFooter } =
      useShowHambergerMenu()
    const { rfpSteps } = useAllRfpSteps()

    return {
      showHambergerMenu,
      showAscFooter,
      showCollapsedSideMenu,
      rfpSteps,
    }
  },
}
</script>
