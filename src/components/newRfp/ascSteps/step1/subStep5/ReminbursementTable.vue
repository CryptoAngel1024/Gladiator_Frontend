<template>
  <div class="flex py-3 pb-4 flex-col items-start w-full min-w-56">
    <div
      v-if="isOverview"
      class="flex w-full bg-slidColor-1 text-white py-2 rounded-tl-lg rounded-tr-lg"
    >
      <div class="w-1/2">QUESTION</div>
      <div class="w-1/4 pl-3">Medicare % / Medicaid %</div>
      <div class="w-1/4 pl-3">Private Insurance %</div>
    </div>
    <p v-else class="font-bold">QUESTION</p>
    <div
      class="flex items-center my-2 w-full"
      :class="isOverview ? 'border-b' : ''"
    >
      <p class="pb-2 text-base font-bold leading-none text-gray-500 w-1/2">
        What is the payer mix for the ASC ?
      </p>
      <div
        class="flex"
        :class="isOverview ? 'w-1/2 justify-between' : 'space-x-8'"
      >
        <input
          v-model.lazy="raimbursementInfo.playerMix.medicarePerMadicaid"
          class="presentation-wizard-input"
          placeholder="Medicare % / Medicaid %"
          :disabled="editIsDisallowed"
        />
        <input
          v-model.lazy="raimbursementInfo.playerMix.privateInsurance"
          class="presentation-wizard-input"
          placeholder="Private Insurance %"
          :disabled="editIsDisallowed"
        />
      </div>
    </div>
    <div
      class="flex items-center my-2 w-full"
      :class="isOverview ? 'border-b' : ''"
    >
      <p class="pb-2 text-base font-bold leading-none text-gray-500 w-1/2">
        Which commercial payers are the group contracted with?
      </p>
      <div
        class="flex"
        :class="isOverview ? 'w-1/2 justify-between' : 'space-x-8'"
      >
        <input
          v-model.lazy="raimbursementInfo.commercialPayers.medicarePerMadicaid"
          class="presentation-wizard-input"
          placeholder="Medicare % / Medicaid %"
          :disabled="editIsDisallowed"
        />
        <input
          v-model.lazy="raimbursementInfo.commercialPayers.medicarePerMadicaid"
          class="presentation-wizard-input"
          placeholder="Private Insurance %"
          :disabled="editIsDisallowed"
        />
      </div>
    </div>
    <YesNoSelection
      :key-name="'negotiateReimbursement'"
      :title="'Did the ASC negotiate reimbursement for the implants?'"
      :selection="raimbursementInfo.negotiateReimbursement"
      @change-option="updateSelection"
    />
    <YesNoSelection
      :key-name="'lowerExtremity'"
      :title="'Will the ASC perform Lower Extremity Joint Reconstruction on Medicare patients?'"
      :selection="raimbursementInfo.lowerExtremity"
      @change-option="updateSelection"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import YesNoSelection from './YesNoSelection.vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'
export default {
  components: {
    YesNoSelection,
  },
  props: {
    elementInfo: { type: Object, required: true },
  },
  setup(props) {
    const raimbursementInfo = ref(props.elementInfo)
    const updateSelection = ({ keyName, updatedSelectedValue }) => {
      raimbursementInfo.value[keyName] = updatedSelectedValue
    }
    const editIsDisallowed = useRfpEditIsDisabled()
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    return {
      raimbursementInfo,
      editIsDisallowed,
      updateSelection,
      isOverview,
    }
  },
}
</script>
