<template>
  <table class="w-full">
    <thead
      v-if="isOverview"
      class="bg-gray-75 text-left font-medium text-gray-500 uppercase tracking-wider w-full"
    >
      <tr class="bg-blue-555 text-white">
        <th class="rounded-tl-xl pl-2 pr-4">Name</th>
        <th class="pr-4">Role</th>
        <th class="pr-4">Info On The Individual</th>
        <th class="rounded-tr-xl">What They Want For Their Hospital</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(stakeHolder, index) in stakeHoldersRef"
        :key="index"
        class="space-x-8"
      >
        <td class="pl-2">
          <h1 class="text-title-jnj uppercase">
            {{ stakeHolder.title }}
          </h1>
        </td>
        <td>
          <input
            v-model.lazy="stakeHolder.name"
            placeholder="Name"
            class="presentation-wizard-input print:w-12"
            :disabled="editIsDisallowed"
            :data-test="`stake-holder-name-input-${stakeHolder.title}`"
          />
        </td>

        <td>
          <input
            v-model.lazy="stakeHolder.individualInfo"
            type="text"
            placeholder="Info on the individual"
            class="presentation-wizard-input print:w-20"
            :disabled="editIsDisallowed"
            :data-test="`stake-holder-individualInfo-input-${stakeHolder.title}`"
          />
        </td>
        <td>
          <input
            v-model.lazy="stakeHolder.need"
            type="text"
            class="presentation-wizard-input w-full print:w-20"
            placeholder="What They Want For Their Hospital"
            :disabled="editIsDisallowed"
            :data-test="`stake-holder-need-input-${stakeHolder.title}`"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'
import { computed, ref, watch } from 'vue'

export default {
  props: {
    stakeHolders: { type: Array, required: true },
  },

  setup(props) {
    const store = useStore()
    const route = useRoute()

    const presentation = computed(() =>
      store.getters['rfps/getPresentationById'](route.params.presentationId),
    )

    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    const editIsDisallowed = useRfpEditIsDisabled()
    const stakeHoldersRef = ref(JSON.parse(JSON.stringify(props.stakeHolders)))

    watch(
      stakeHoldersRef,
      () => {
        store.commit(
          'rfps/updateRfp',
          JSON.parse(
            JSON.stringify({
              ...presentation.value,
              stakeholders: stakeHoldersRef.value,
            }),
          ),
        )
      },
      { deep: true },
    )

    return {
      isOverview,
      editIsDisallowed,
      stakeHoldersRef,
    }
  },
}
</script>

<style scoped lang="postcss">
th {
  @apply py-3 text-base font-normal font-Arial;
}
</style>
