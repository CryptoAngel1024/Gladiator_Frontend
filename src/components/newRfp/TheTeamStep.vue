<template>
  <div class="flex py-7 flex-col items-start">
    <h1 class="wizard-main-header2 text-primary" data-test="the-team-header">
      Pull the Internal Team Together
    </h1>
    <h1 class="text-subheader py-5">
      Select the customer tier<span v-if="isOverview" class="ml-8">{{
        Team.tier
      }}</span>
    </h1>
    <div class="flex space-x-5" :class="isOverview ? 'opacity-0 -mt-12' : ''">
      <div class="flex items-center space-x-2">
        <input
          id="tier1-3"
          v-model="Team.tier"
          name="tier"
          value="TIER1_3"
          class="presentation-wizard-radio checked:bg-primary"
          type="radio"
          :disabled="editIsDisallowed"
          data-test="the-team-tier1_3-input"
        />
        <label for="tier1-3" class="text-normal text-gray-450">Tier 1-3 </label>
      </div>
      <div class="flex items-center space-x-2">
        <input
          id="tier4"
          v-model="Team.tier"
          name="tier"
          value="TIER_4"
          class="presentation-wizard-radio"
          type="radio"
          :disabled="editIsDisallowed"
          data-test="the-team-tier4-input"
        />
        <label for="tier4" class="text-normal text-gray-450">Tier 4 </label>
      </div>
    </div>
    <h1 class="text-subheader py-8">Internal team</h1>
    <internal-team-table />
  </div>
</template>

<script>
import InternalTeamTable from './InternalTeamTable.vue'
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    InternalTeamTable,
  },
  setup() {
    const route = useRoute()

    const store = useStore()
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    const presentationState = computed(() =>
      store.getters['rfps/getPresentationById'](route.params.presentationId),
    )

    const editIsDisallowed = useRfpEditIsDisabled()

    const Team = ref(
      JSON.parse(
        JSON.stringify({
          tier: presentationState.value.tier,
        }),
      ),
    )

    const updateTeam = () => {
      const updatedPresentation = JSON.parse(
        JSON.stringify({
          ...presentationState.value,
          tier: Team.value.tier,
        }),
      )
      store.commit('rfps/updateRfp', updatedPresentation)
    }

    watch(Team, updateTeam, {
      deep: true,
    })
    return { isOverview, editIsDisallowed, Team }
  },
}
</script>
