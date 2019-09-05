<template>
  <div class="flex py-7 flex-col items-start">
    <h1
      v-if="!isOverview"
      class="text-header-jnj text-primary pb-6"
      data-test="discovery-step-msg"
    >
      Collect Reconnaissance and Discover Customer Problem to Be Solved
    </h1>
    <h1 v-else class="py-2">BU</h1>
    <discovery-table :discoveries="discoveriesData" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import DiscoveryTable from './DiscoveryTable.vue'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    DiscoveryTable,
  },

  setup() {
    const route = useRoute()
    const store = useStore()
    const presentationId = computed(() => route.params.presentationId)

    const presentation = computed(() =>
      store.getters['rfps/getPresentationById'](presentationId.value),
    )

    const allDiscoveriesData = JSON.parse(
      JSON.stringify(presentation.value?.discovery),
    )
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    const realDiscoveriesData = allDiscoveriesData.filter((item) => item.annual)
    const discoveriesData = isOverview.value
      ? realDiscoveriesData
      : allDiscoveriesData

    return {
      discoveriesData,
      isOverview,
    }
  },
}
</script>
