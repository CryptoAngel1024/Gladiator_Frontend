<template>
  <div class="flex py-7 flex-col items-start">
    <h1
      v-if="!isOverview"
      class="text-header-jnj text-primary pb-6"
      data-test="stake-holder-msg"
    >
      Map Stakeholders at the Customer
    </h1>

    <stakeholders-table :stake-holders="stakeHoldersData" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import StakeholdersTable from './StakeholdersTable.vue'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    StakeholdersTable,
  },

  setup() {
    const route = useRoute()
    const store = useStore()
    const presentationId = computed(() => route.params.presentationId)

    const presentation = computed(() =>
      store.getters['rfps/getPresentationById'](presentationId.value),
    )

    const allStakeHoldersData = JSON.parse(
      JSON.stringify(presentation.value?.stakeholders),
    )
    const realStakeHoldersData = allStakeHoldersData.filter((item) => item.name)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    const stakeHoldersData = isOverview.value
      ? realStakeHoldersData
      : allStakeHoldersData
    return {
      stakeHoldersData,
      isOverview,
    }
  },
}
</script>
