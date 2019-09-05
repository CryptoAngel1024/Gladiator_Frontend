<template>
  <div class="wizard-main-container">
    <h1 class="wizard-main-header2 text-primary">Uncover Customer Situation</h1>
    <table class="mt-6">
      <tr
        class="text-left"
        :class="isOverview ? 'bg-slidColor-1 text-white' : ''"
      >
        <th :class="isOverview ? ' rounded-tl-lg' : ''">BU</th>
        <th style="width: 14%">Sub-Speciality</th>
        <th>Annual Cases</th>
        <th>MS %</th>
        <th>Vendors</th>
        <th>Contracted By Vendor ?</th>
        <th :class="isOverview ? 'rounded-tr-lg' : ''">
          Is there an opportunity here?
        </th>
      </tr>
      <TraumaExtremities :element-info="situationInfo.traumaExtremities" />
      <JointRecon :element-info="situationInfo.jointRecon" />
      <SportsTable :element-info="situationInfo.sports" />
      <SpineTable :element-info="situationInfo.spine" />
    </table>
    <VendorLandscape :element-info="situationInfo" />
  </div>
</template>

<script>
import TraumaExtremities from './TraumaExtremities.vue'
import JointRecon from './JointRecon.vue'
import SportsTable from './SportsTable.vue'
import SpineTable from './SpineTable.vue'
import VendorLandscape from './VendorLandscape.vue'
import useRfpFieldEditor from '@/components/newRfp/useRfpFieldEditor.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    TraumaExtremities,
    JointRecon,
    SportsTable,
    SpineTable,
    VendorLandscape,
  },
  setup() {
    const { editIsDisallowed, fieldValue: situationInfo } =
      useRfpFieldEditor('situation')
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    return {
      editIsDisallowed,
      situationInfo,
      isOverview,
    }
  },
}
</script>

<style scoped lang="postcss">
th {
  @apply text-base font-normal font-Arial;
}
</style>
