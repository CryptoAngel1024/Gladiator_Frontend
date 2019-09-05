<template>
  <div class="wizard-main-container">
    <h1 class="wizard-main-header2 text-primary">Collect Reconnaissance</h1>
    <h1 class="sub-title-text">
      Which Business Units (BU) are currently engaged with this ASC and what are
      the relationships with the customer?
    </h1>

    <business-unit-relationship
      :bu-relationship-info="reconnaissanceInfo.buCustomerRelationships"
    />
    <h1 class="title-text">What is the TAM for each BU with this customer?</h1>
    <tam-list :tam-info="reconnaissanceInfo.buTamWithCustomer" />
  </div>
</template>

<script>
import BusinessUnitRelationship from './BusinessUnitRelationship.vue'
import TamList from './TamList.vue'
import useRfpFieldEditor from '@/components/newRfp/useRfpFieldEditor.js'

export default {
  components: {
    BusinessUnitRelationship,
    TamList,
  },
  setup() {
    const { editIsDisallowed, fieldValue: reconnaissanceInfo } =
      useRfpFieldEditor('reconnaissance')

    return {
      editIsDisallowed,
      reconnaissanceInfo,
    }
  },
}
</script>

<style scoped lang="postcss">
.title-text {
  @apply py-7 w-full min-w-56 pb-2 font-bold  text-primary text-2xl;
}
.sub-title-text {
  @apply pb-2 text-base font-bold leading-none text-gray-500 mt-4;
}
</style>
