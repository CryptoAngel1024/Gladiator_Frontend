<template>
  <div
    class="flex space-x-4 justify-between py-3 w-11/12"
    :class="isOverview ? 'border-b' : ''"
  >
    <h1 class="font-semibold text-lg uppercase my-auto w-1/4">
      {{ ascStakeholderData.title }}
    </h1>
    <div class="flex justify-between w-3/4">
      <input
        v-model.lazy="ascStakeholderData.name"
        class="presentation-wizard-input w-4/15"
        placeholder="Enter Name Here"
        :disabled="editIsDisallowed"
      />
      <input
        v-model.lazy="ascStakeholderData.otherWork"
        class="presentation-wizard-input w-4/15"
        placeholder="Other ASC's this individual works at"
        :disabled="editIsDisallowed"
      />
      <input
        v-model.lazy="ascStakeholderData.goal"
        class="presentation-wizard-input w-4/15"
        placeholder="Goal for the ASC"
        :disabled="editIsDisallowed"
      />
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  props: {
    ascStakeholder: { type: Object, required: true },
    index: { type: Number, required: true },
  },
  setup(props) {
    const editIsDisallowed = useRfpEditIsDisabled()

    const ascStakeholderData = ref(props.ascStakeholder)
    const indexData = ref(props.index)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    return { ascStakeholderData, editIsDisallowed, indexData, isOverview }
  },
}
</script>
