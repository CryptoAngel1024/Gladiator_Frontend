<template>
  <div class="wizard-main-container">
    <h1 v-if="!isOverview" class="text-header-jnj text-primary my-4">
      Vendor Landscape
    </h1>
    <h1 class="pb-2 text-base font-bold leading-none text-gray-500">
      Who are the vendors at the account?
    </h1>
    <div
      v-if="isOverview"
      class="flex w-4/5 bg-slidColor-1 text-white py-2 rounded-tl-lg rounded-tr-lg"
    >
      <div class="w-1/4 pl-3">Joint Reconstruction</div>
      <div class="w-1/4 pl-3">Spine</div>
      <div class="w-1/4 pl-3">Sports Medicine</div>
      <div class="w-1/4 pl-3">Sports Medicine</div>
    </div>
    <div class="flex w-4/5 space-x-2 py-2">
      <input
        v-model.lazy="situationInfo.whoVendors.jointReconstruction"
        class="presentation-wizard-input w-1/4"
        placeholder="Joint Reconstruction"
        :disabled="editIsDisallowed"
      />
      <input
        v-model.lazy="situationInfo.whoVendors.spine"
        class="presentation-wizard-input w-1/4"
        placeholder="Spine"
        :disabled="editIsDisallowed"
      />
      <input
        v-model.lazy="situationInfo.whoVendors.sportsMedicine"
        class="presentation-wizard-input w-1/4"
        placeholder="Sports Medicine"
        :disabled="editIsDisallowed"
      />
      <input
        v-model.lazy="situationInfo.whoVendors.traumaExtremities"
        class="presentation-wizard-input w-1/4"
        placeholder="Trauma & Extremities"
        :disabled="editIsDisallowed"
      />
    </div>
    <h1 class="pb-2 text-base font-bold leading-none text-gray-500">
      What are the current agreements with competitors?
    </h1>
    <div
      v-if="isOverview"
      class="flex w-4/5 bg-slidColor-1 text-white py-2 rounded-tl-lg rounded-tr-lg"
    >
      <div class="w-1/4 pl-3">Joint Reconstruction</div>
      <div class="w-1/4 pl-3">Spine</div>
      <div class="w-1/4 pl-3">Sports Medicine</div>
      <div class="w-1/4 pl-3">Sports Medicine</div>
    </div>
    <div class="flex w-4/5 space-x-2 py-2">
      <input
        v-model.lazy="situationInfo.whatAgreements.jointReconstruction"
        class="presentation-wizard-input w-1/4"
        placeholder="Joint Reconstruction"
        :disabled="editIsDisallowed"
      />
      <input
        v-model.lazy="situationInfo.whatAgreements.spine"
        class="presentation-wizard-input w-1/4"
        placeholder="Spine"
        :disabled="editIsDisallowed"
      />
      <input
        v-model.lazy="situationInfo.whatAgreements.sportsMedicine"
        class="presentation-wizard-input w-1/4"
        placeholder="Sports Medicine"
        :disabled="editIsDisallowed"
      />
      <input
        v-model.lazy="situationInfo.whatAgreements.traumaExtremities"
        class="presentation-wizard-input w-1/4"
        placeholder="Trauma & Extremities"
        :disabled="editIsDisallowed"
      />
    </div>
    <multi-radio-items
      v-model="situationInfo.isTied"
      :title="'Is any of the ASC`s spend tied to competitive capital equipment (i.e. Athrex towers, robotics)?'"
      :options="['Yes', 'No', 'I don`t know']"
    />
    <multi-radio-items
      v-model="situationInfo.isOpportunityToPresent"
      :title="'Is there an opportunity to present Capital Placement options to the customer?'"
      :options="['Yes', 'No', 'I don`t know']"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import MultiRadioItems from '@/components/newRfp/ascSteps/sharedComponents/MultiRadioItems.vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    MultiRadioItems,
  },
  props: {
    elementInfo: { type: Object, required: true },
  },
  setup(props) {
    const situationInfo = ref(props.elementInfo)
    const editIsDisallowed = useRfpEditIsDisabled()
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    return {
      situationInfo,
      editIsDisallowed,
      isOverview,
    }
  },
}
</script>
