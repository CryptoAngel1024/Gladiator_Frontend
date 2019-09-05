<template>
  <div class="wizard-main-container">
    <h1 class="wizard-main-header2 text-primary" data-test="stake-holder-msg">
      Reimbursement & Payer Mix
    </h1>
    <ReminbursementTable :element-info="raimbursementInfo" />
    <h1 class="text-header-jnj text-primary pb-3" data-test="stake-holder-msg">
      Johnson & Johnson Business Areas Currently Contracted With This ASC
    </h1>
    <BusinessTable :element-info="raimbursementInfo" />
    <h1 class="text-header-jnj text-primary pb-3" data-test="stake-holder-msg">
      Professional Education Interests ( Select All That Apply)
    </h1>
    <ProfessionalEducation :element-info="raimbursementInfo" />
  </div>
</template>

<script>
import ReminbursementTable from './ReminbursementTable.vue'
import BusinessTable from './BusinessTable.vue'
import ProfessionalEducation from './ProfessionalEducation.vue'
import useRfpFieldEditor from '@/components/newRfp/useRfpFieldEditor.js'

export default {
  components: {
    ReminbursementTable,
    BusinessTable,
    ProfessionalEducation,
  },
  setup() {
    const { fieldValue: raimbursementInfo } = useRfpFieldEditor(
      'reimbursementAndPayerMix',
    )

    return {
      raimbursementInfo,
    }
  },
}
</script>
