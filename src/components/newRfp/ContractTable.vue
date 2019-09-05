<template>
  <div class="flex flex-col w-full">
    <div class="flex space-x-8 items-center">
      <h1 class="text-title-jnj uppercase min-w-64">Gpo Affiliation</h1>
      <input
        v-model.lazy="contractDetail.gpoAffilation"
        class="presentation-wizard-input flex-grow mb-0.5"
        placeholder="Type Here"
        :disabled="editIsDisallowed"
        data-test="contract-gpoAffilation"
      />
    </div>
    <div class="flex space-x-8 items-center">
      <h1 class="text-title-jnj uppercase min-w-64">Contract # And Name</h1>
      <input
        v-model.lazy="contractDetail.numberAndName"
        class="presentation-wizard-input flex-grow mb-0.5"
        placeholder="Type Here"
        :disabled="editIsDisallowed"
        data-test="contract-numberAndName"
      />
    </div>
    <div class="flex space-x-8 items-center">
      <h1 class="text-title-jnj uppercase min-w-64">Contract End Date</h1>
      <input
        v-model.lazy="contractDetail.endDate"
        class="presentation-wizard-input flex-grow mb-0.5"
        placeholder="Type Here"
        :disabled="editIsDisallowed"
        data-test="contract-endDate"
      />
    </div>
    <div class="flex space-x-8 items-center">
      <h1 class="text-title-jnj uppercase min-w-64">Notes</h1>
      <textarea
        v-model.lazy="contractDetail.notes"
        class="presentation-wizard-textarea flex-grow mb-0.5"
        placeholder="Type Here"
        :disabled="editIsDisallowed"
        data-test="contract-notes"
      />
    </div>
  </div>
</template>
<script>
import { watch, ref } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'

export default {
  props: {
    contract: { type: Object, required: true },
  },
  emits: { updateContractdata: Object },
  setup(props, { emit }) {
    const contractDetail = ref(JSON.parse(JSON.stringify(props.contract)))
    const editIsDisallowed = useRfpEditIsDisabled()

    watch(
      contractDetail,
      (contractDetail) => emit('updateContractdata', contractDetail),
      {
        deep: true,
      },
    )

    return {
      contractDetail,
      editIsDisallowed,
    }
  },
}
</script>
