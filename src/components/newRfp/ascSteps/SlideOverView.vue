<template>
  <div>
    <section>
      <h1 class="print:mt-5">Customer Checklist</h1>
      <AssignCustomerChecklistEditor />
      <CustomerFacilityInfrastructure class="break-after-page print:mt-5" />
      <CFIEquipmentCapital class="break-after-page print:mt-5" />
      <CFIEquipmentGeneral class="break-after-page print:mt-5" />
      <ReimbursementPayerMix class="break-after-page print:mt-5" />
    </section>
    <section v-if="!showOnlyCustomerOverview">
      <h1 class="print:mt-5">Blueprint The Customer</h1>
      <internalTeam class="break-after-page" />
      <MapStakeholdersAtTheCustomer class="break-after-page print:mt-5" />
      <CollectReconnaissance class="break-after-page print:mt-5" />
      <ScanExistingContractLandscape class="break-after-page print:mt-5" />
      <UncoverCustomerSituation class="break-after-page print:mt-5" />
    </section>
    <section v-if="!showOnlyCustomerOverview">
      <h1 class="print:mt-5">ASC Gladiator Flow</h1>
      <EconomicValueCapabilities class="break-after-page" />
      <OperationalSupportCapabilities class="break-after-page print:mt-5" />
      <ClinicalExcellenceCapabilities />
    </section>
  </div>
</template>

<script>
import AssignCustomerChecklistEditor from './step1/subStep1/AssignCustomerChecklistEditor.vue'
import CustomerFacilityInfrastructure from '@/components/newRfp/ascSteps/step1/subStep2/CustomerFacilityInfrastructure.vue'
import CFIEquipmentCapital from '@/components/newRfp/ascSteps/step1/subStep3/CFIEquipmentCapital.vue'
import CFIEquipmentGeneral from '@/components/newRfp/ascSteps/step1/subStep4/CFIEquipmentGeneral.vue'
import ReimbursementPayerMix from '@/components/newRfp/ascSteps/step1/subStep5/ReimbursementPayerMix.vue'
import internalTeam from '@/components/newRfp/ascSteps/step2/subStep1/internalTeam.vue'
import MapStakeholdersAtTheCustomer from '@/components/newRfp/ascSteps/step2/subStep2/MapStakeholdersAtTheCustomer.vue'
import CollectReconnaissance from '@/components/newRfp/ascSteps/step2/subStep3/CollectReconnaissance.vue'
import ScanExistingContractLandscape from '@/components/newRfp/ascSteps/step2/subStep4/ScanExistingContractLandscape.vue'
import UncoverCustomerSituation from './step2/subStep5/UncoverCustomerSituation.vue'
import EconomicValueCapabilities from '@/components/newRfp/ascSteps/step6/EconomicValueCapabilities.vue'
import OperationalSupportCapabilities from '@/components/newRfp/ascSteps/step7/OperationalSupportCapabilities.vue'
import ClinicalExcellenceCapabilities from '@/components/newRfp/ascSteps/step8/ClinicalExcellenceCapabilities.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  components: {
    CustomerFacilityInfrastructure,
    CFIEquipmentCapital,
    CFIEquipmentGeneral,
    ReimbursementPayerMix,
    internalTeam,
    MapStakeholdersAtTheCustomer,
    CollectReconnaissance,
    ScanExistingContractLandscape,
    AssignCustomerChecklistEditor,
    UncoverCustomerSituation,
    EconomicValueCapabilities,
    OperationalSupportCapabilities,
    ClinicalExcellenceCapabilities,
  },
  setup() {
    const route = useRoute()
    const showOnlyCustomerOverview = computed(
      () => route.name === 'print-checklist-export',
    )
    return { showOnlyCustomerOverview }
  },
}
</script>

<style scoped lang="postcss">
h1 {
  @apply text-gray-475 px-8 py-4 text-2xl font-bold -mx-8;
  background-color: #f4f4f4;
}
</style>
