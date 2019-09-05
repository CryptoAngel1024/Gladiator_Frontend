<template>
  <div
    class="grid grid-cols-6 gap-3 py-2 text-left items-center"
    :class="isOverview ? 'border-b' : ''"
  >
    <div>
      <h1 class="font-semibold text-lg uppercase">
        {{ contactLandscapeData.title }}
      </h1>
      <p>{{ contactLandscapeData.subtitle }}</p>
    </div>

    <input
      v-model.lazy="contactLandscapeData.traumaAndExtremities"
      class="presentation-wizard-input"
      placeholder="Enter Here"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="contactLandscapeData.jointRecon"
      class="presentation-wizard-input"
      placeholder="Enter Here"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="contactLandscapeData.surgicalSports"
      class="presentation-wizard-input"
      placeholder="Enter Here"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="contactLandscapeData.spine"
      class="presentation-wizard-input"
      placeholder="Enter Here"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="contactLandscapeData.additionalContract"
      class="presentation-wizard-input"
      placeholder="Enter Here"
      :disabled="editIsDisallowed"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'
export default {
  props: {
    contractLandscape: { type: Object, required: true },
  },
  setup(props) {
    const editIsDisallowed = useRfpEditIsDisabled()
    const contactLandscapeData = ref(props.contractLandscape)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    return { contactLandscapeData, editIsDisallowed, isOverview }
  },
}
</script>
