<template>
  <h1 class="py-7 w-full min-w-56 pb-2 font-bold text-gray-500 uppercase">
    Asc Stakeholders
  </h1>
  <div
    v-if="isOverview"
    class="flex space-x-4 py-3 bg-slidColor-1 text-white rounded-t-lg w-10/12 items-center"
  >
    <p class="pl-2 w-1/4">TYPE</p>
    <p class="pl-2 w-1/4">NAME</p>
    <p class="pl-2 w-1/4">Other ASC's this individual Works At</p>
    <p class="pl-2 w-1/4">Goal for the ASC</p>
  </div>
  <asc-stakeholders-row
    v-for="(stakeholder, index) in ascStakeholdersData"
    :key="index"
    :asc-stakeholder="stakeholder"
    :index="index"
  />
</template>

<script>
import { ref } from 'vue'
import AscStakeholdersRow from './AscStakeholdersRow.vue'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    AscStakeholdersRow,
  },
  props: {
    ascStakeholders: { type: Object, required: true },
  },
  setup(props) {
    const ascStakeholdersData = ref(props.ascStakeholders)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    return { ascStakeholdersData, isOverview }
  },
}
</script>
