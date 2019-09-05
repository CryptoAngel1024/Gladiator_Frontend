<template>
  <div
    class="grid grid-cols-5 text-left py-2"
    :class="isOverview ? 'border-b' : ''"
  >
    <h1 class="font-semibold text-lg uppercase mt-4 pr-1">
      {{ rebateStatusData.title }}
    </h1>
    <input
      v-model.lazy="rebateStatusData.existingBusinessLineRebateOrContract"
      class="presentation-wizard-input w-11/12"
      placeholder="Enter Here"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="rebateStatusData.typeOfRebateOrContract"
      class="presentation-wizard-input w-11/12"
      placeholder="Enter Here"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="rebateStatusData.startDate"
      class="presentation-wizard-input w-11/12"
      placeholder="Enter Here"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="rebateStatusData.endDate"
      class="presentation-wizard-input w-11/12"
      placeholder="Enter Here"
      :disabled="editIsDisallowed"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'
export default {
  props: {
    rebateStatus: { type: Object, required: true },
  },
  setup(props) {
    const rebateStatusData = ref(props.rebateStatus)

    const editIsDisallowed = useRfpEditIsDisabled()
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    return { rebateStatusData, editIsDisallowed, isOverview }
  },
}
</script>
