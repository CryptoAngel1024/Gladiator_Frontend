<template>
  <div>
    <h1>Customer Information</h1>
    <customer-info-step ref="customerInfoComponent" class="break-after-page" />

    <h1>The Team</h1>
    <the-team-step class="break-after-page" />

    <h1>The Customer</h1>
    <the-customer-step
      :stake-holders="presentation.stakeholders"
      class="break-after-page"
    />

    <h1>The Discovery</h1>
    <the-discovery-step
      :discoveries="presentation.discovery"
      class="break-after-page"
    />

    <h1>The Contract</h1>
    <the-contract-step
      :contract="presentation.contract"
      class="break-after-page"
    />

    <h1>The Presentation</h1>
    <PresentationConfigureStep :slide-selection="presentation.slideSelection" />
  </div>
</template>

<script>
import CustomerInfoStep from '@/components/newRfp/CustomerInfoStep.vue'
import TheTeamStep from '@/components/newRfp/TheTeamStep.vue'
import TheCustomerStep from '@/components/newRfp/TheCustomerStep.vue'
import TheDiscoveryStep from '@/components/newRfp/TheDiscoveryStep.vue'
import PresentationConfigureStep from '@/components/newRfp/PresentationConfigureStep.vue'
import TheContractStep from '@/components/newRfp/TheContractStep.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components: {
    CustomerInfoStep,
    TheTeamStep,
    TheCustomerStep,
    TheDiscoveryStep,
    PresentationConfigureStep,
    TheContractStep,
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const presentation = computed(() =>
      store.getters['rfps/getPresentationById'](route.params.presentationId),
    )

    const customerInfoComponent = ref(null)
    const uploadCustomerLogo = (presentationIdParam) =>
      customerInfoComponent.value?.uploadImage(presentationIdParam)

    return {
      presentation,
      customerInfoComponent,
      uploadCustomerLogo,
    }
  },
}
</script>

<style scoped lang="postcss">
h1 {
  @apply text-gray-475 px-8 py-4 text-2xl font-bold print:mt-5;
  background-color: #f4f4f4;
}
</style>
