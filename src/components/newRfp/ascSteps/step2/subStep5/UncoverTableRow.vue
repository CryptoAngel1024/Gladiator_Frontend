<template>
  <td>{{ title }}</td>

  <td>
    <input
      v-model.lazy="rowDataInfo.annualCase"
      class="presentation-wizard-input"
      placeholder="Enter Here"
      :disabled="editIsDisallowed"
    />
  </td>
  <td>
    <input
      v-model.lazy="rowDataInfo.ms"
      class="presentation-wizard-input"
      placeholder="Enter Here"
      :disabled="editIsDisallowed"
    />
  </td>
  <td>
    <input
      v-model.lazy="rowDataInfo.vendors"
      class="presentation-wizard-input"
      placeholder="Enter Here"
      :disabled="editIsDisallowed"
    />
  </td>
  <td>
    <input
      v-model.lazy="rowDataInfo.contractedBy"
      class="presentation-wizard-input"
      placeholder="Enter Here"
      :disabled="editIsDisallowed"
    />
  </td>
  <td>
    <div class="flex space-x-10">
      <div class="flex items-center space-x-2">
        <input
          v-model="rowDataInfo.isOpportunity"
          class="presentation-wizard-radio"
          type="radio"
          :value="true"
          :disabled="editIsDisallowed"
        />
        <label class="text-normal text-gray-450">Yes </label>
      </div>
      <div class="flex items-center space-x-2">
        <input
          v-model="rowDataInfo.isOpportunity"
          class="presentation-wizard-radio"
          type="radio"
          :value="false"
          :disabled="editIsDisallowed"
        />
        <label class="text-normal text-gray-450">No </label>
      </div>
    </div>
  </td>
</template>

<script>
import { ref } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'

export default {
  props: {
    title: { type: String, required: true },
    rowData: { type: Object, required: true },
  },
  setup(props) {
    const editIsDisallowed = useRfpEditIsDisabled()

    const rowDataInfo = ref(props.rowData)
    return {
      editIsDisallowed,
      rowDataInfo,
    }
  },
}
</script>
<style scoped lang="postcss">
th {
  @apply text-base font-normal font-Arial;
}

tr th:nth-child(1) {
  @apply font-bold text-left;
}

tr td:nth-child(1),
td:nth-child(2) {
  @apply font-bold text-left;
}
tr td {
  @apply p-1;
}
tr:nth-child(4) td,
tr:nth-child(6) td,
tr:nth-child(7) td,
tr:nth-child(10) td,
tr:nth-child(11) td {
  @apply pb-3;
}
.presentation-wizard-radio {
  @apply w-5 h-5 border-2 border-gray-450;
}
</style>
