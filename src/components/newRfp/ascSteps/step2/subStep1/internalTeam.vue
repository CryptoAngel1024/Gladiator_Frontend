<template>
  <div class="wizard-main-container">
    <h1 class="wizard-main-header2 text-primary">Pull Your Team Together</h1>

    <internal-team-table />
    <h1 class="text-header-jnj text-primary mt-4">Select Your Journey</h1>
    <multi-radio-items
      v-model="teamInfo.goal"
      :title="'What is your goal ?'"
      :options="[
        'Responding to a Request for Proposal (RFP)',
        'Proactively Targeting and Meeting with Customer',
      ]"
    />
  </div>
</template>

<script>
import InternalTeamTable from '../../../InternalTeamTable.vue'
import MultiRadioItems from '@/components/newRfp/ascSteps/sharedComponents/MultiRadioItems.vue'
import useRfpFieldEditor from '@/components/newRfp/useRfpFieldEditor.js'

export default {
  components: {
    InternalTeamTable,
    MultiRadioItems,
  },
  setup() {
    const { fieldValue: teamInfo } = useRfpFieldEditor('team')

    return {
      teamInfo,
    }
  },
}
</script>
