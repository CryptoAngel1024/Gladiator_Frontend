<template>
  <page-wrapper title="">
    <builder-header />
    <rfp-step-wrapper
      v-if="presentation"
      :upload-customer-logo="uploadCustomerLogo"
    >
      <component :is="currentStepComponent" ref="rfpStepComponent" />
    </rfp-step-wrapper>

    <ApiState
      v-else
      :loading="loading"
      :error-message="error"
      data-type="presentation"
      class="mt-2"
    />
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import builderHeader from '@/components/builder/wizardHeader.vue'
import RfpStepWrapper from '@/components/newRfp/RfpStepWrapper.vue'
import ApiState from '@/components/utils/apiState.vue'

import CustomerInfoStep from '@/components/newRfp/CustomerInfoStep.vue'
import TheTeamStep from '@/components/newRfp/TheTeamStep.vue'
import TheCustomerStep from '@/components/newRfp/TheCustomerStep.vue'
import TheDiscoveryStep from '@/components/newRfp/TheDiscoveryStep.vue'
import TheContractStep from '@/components/newRfp/TheContractStep.vue'
import PresentationConfigureStep from '@/components/newRfp/PresentationConfigureStep.vue'
import SlideOverView from '@/components/newRfp/SlideOverView.vue'
import SlideSelectionStep from '@/components/newRfp/SlideSelectionStep.vue'

import AssignCustomerChecklistEditor from '@/components/newRfp/ascSteps/step1/subStep1/AssignCustomerChecklistEditor.vue'
import CustomerFacilityInfrastructure from '@/components/newRfp/ascSteps/step1/subStep2/CustomerFacilityInfrastructure.vue'
import CFIEquipmentCapital from '@/components/newRfp/ascSteps/step1/subStep3/CFIEquipmentCapital.vue'
import CFIEquipmentGeneral from '@/components/newRfp/ascSteps/step1/subStep4/CFIEquipmentGeneral.vue'
import ReimbursementPayerMix from '@/components/newRfp/ascSteps/step1/subStep5/ReimbursementPayerMix.vue'
import MapStakeholdersAtTheCustomer from '@/components/newRfp/ascSteps/step2/subStep2/MapStakeholdersAtTheCustomer.vue'
import CollectReconnaissance from '@/components/newRfp/ascSteps/step2/subStep3/CollectReconnaissance.vue'
import ScanExistingContractLandscape from '@/components/newRfp/ascSteps/step2/subStep4/ScanExistingContractLandscape.vue'
import EconomicValueCapabilities from '@/components/newRfp/ascSteps/step6/EconomicValueCapabilities.vue'
import OperationalSupportCapabilities from '@/components/newRfp/ascSteps/step7/OperationalSupportCapabilities.vue'
import ClinicalExcellenceCapabilities from '@/components/newRfp/ascSteps/step8/ClinicalExcellenceCapabilities.vue'
import internalTeam from '@/components/newRfp/ascSteps/step2/subStep1/internalTeam.vue'
import UncoverCustomerSituation from '@/components/newRfp/ascSteps/step2/subStep5/UncoverCustomerSituation.vue'
import AscSlideOverViewe from '@/components/newRfp/ascSteps/SlideOverView.vue'

import { onMounted, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const allRfpSteps = {
  TRAUMA: {
    1.1: CustomerInfoStep,
    1.2: TheTeamStep,
    1.3: TheCustomerStep,
    1.4: TheDiscoveryStep,
    1.5: TheContractStep,
    2.1: PresentationConfigureStep,
    2.2: SlideOverView,
    3.1: SlideSelectionStep,
  },
  ASC: {
    1.1: AssignCustomerChecklistEditor,
    1.2: CustomerFacilityInfrastructure,
    1.3: CFIEquipmentCapital,
    1.4: CFIEquipmentGeneral,
    1.5: ReimbursementPayerMix,
    2.1: internalTeam,
    2.2: MapStakeholdersAtTheCustomer,
    2.3: CollectReconnaissance,
    2.4: ScanExistingContractLandscape,
    2.5: UncoverCustomerSituation,
    2.6: EconomicValueCapabilities,
    2.7: OperationalSupportCapabilities,
    2.8: ClinicalExcellenceCapabilities,
    2.9: AscSlideOverViewe,
    3.1: SlideSelectionStep,
  },
}

export default {
  components: {
    PageWrapper,
    builderHeader,
    RfpStepWrapper,
    ApiState,
  },

  setup() {
    const route = useRoute()
    const store = useStore()

    const presentationId = computed(() => route.params.presentationId)

    const step = computed(
      () => (route.params.step || 1) + '.' + (route.params.subStep || 1),
    )

    const department = computed(
      () => store.getters['setting/getCurrentDepartment'],
    )

    const currentStepComponent = computed(
      () => allRfpSteps[department.value][step.value],
    )

    const loading = ref(false)
    const error = ref('')

    async function fetchRfp() {
      if (presentationId.value) {
        loading.value = true
        const { err } = await store.dispatch(
          'rfps/getMyRfpbyId',
          presentationId.value,
        )
        if (err) error.value = err.message || err
        loading.value = false
      }
    }

    onMounted(fetchRfp)

    watch(presentationId, fetchRfp)

    const presentation = computed(() =>
      store.getters['rfps/getPresentationById'](presentationId.value),
    )

    const rfpStepComponent = ref(null)
    const uploadCustomerLogo = (presentationIdParam) =>
      rfpStepComponent.value?.uploadImage?.(presentationIdParam)

    return {
      presentation,
      currentStepComponent,
      loading,
      error,
      rfpStepComponent,
      uploadCustomerLogo,
    }
  },
}
</script>
