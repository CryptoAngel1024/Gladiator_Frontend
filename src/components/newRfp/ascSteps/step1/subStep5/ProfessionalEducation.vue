<template>
  <div class="flex py-3 pb-4 flex-col items-start w-full min-w-56">
    <p class="font-bold">QUESTION</p>
    <YesNoSelection
      :title="'How to start an ASC Program'"
      :selection="professionalEducationInfo.howToStart"
      :key-name="'howToStart'"
      @change-option="updateSelection"
    />
    <YesNoSelection
      :title="'Administrator to administrator'"
      :selection="professionalEducationInfo.administratorToAdministrator"
      :key-name="'administratorToAdministrator'"
      @change-option="updateSelection"
    />
    <YesNoSelection
      :title="'Reimbursement'"
      :selection="professionalEducationInfo.reimbursement"
      :key-name="'reimbursement'"
      @change-option="updateSelection"
    />
    <YesNoSelection
      :title="'Nurse / Staff Training'"
      :selection="professionalEducationInfo.nurseStaffTraining"
      :key-name="'nurseStaffTraining'"
      @change-option="updateSelection"
    />
    <div class="flex items-center my-2 w-full">
      <p class="pb-2 text-base font-bold leading-none text-gray-500 w-1/2">
        Other Clinical
      </p>
      <div class="flex space-x-8">
        <input
          v-model.lazy="professionalEducationInfo.otherClinical"
          class="presentation-wizard-input"
          placeholder="Type Here"
          :disabled="editIsDisallowed"
        />
      </div>
    </div>
    <div class="flex items-center my-2 w-full">
      <p class="pb-2 text-base font-bold leading-none text-gray-500 w-1/2">
        Other Financial / Economic
      </p>
      <div class="flex space-x-8">
        <input
          v-model.lazy="professionalEducationInfo.otherFinancialEconomic"
          class="presentation-wizard-input"
          placeholder="Type Here"
          :disabled="editIsDisallowed"
        />
      </div>
    </div>
    <div class="flex items-center my-2 w-full">
      <p class="pb-2 text-base font-bold leading-none text-gray-500 w-1/2">
        Other Operations
      </p>
      <div class="flex space-x-8">
        <input
          v-model.lazy="professionalEducationInfo.otherOperations"
          class="presentation-wizard-input"
          placeholder="Type Here"
          :disabled="editIsDisallowed"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import YesNoSelection from './YesNoSelection.vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'

export default {
  components: {
    YesNoSelection,
  },
  props: {
    elementInfo: { type: Object, required: true },
  },
  setup(props) {
    const professionalEducationInfo = ref(props.elementInfo)
    const updateSelection = ({ keyName, updatedSelectedValue }) => {
      professionalEducationInfo.value[keyName] = updatedSelectedValue
    }
    const editIsDisallowed = useRfpEditIsDisabled()

    return {
      professionalEducationInfo,
      updateSelection,
      editIsDisallowed,
    }
  },
}
</script>
