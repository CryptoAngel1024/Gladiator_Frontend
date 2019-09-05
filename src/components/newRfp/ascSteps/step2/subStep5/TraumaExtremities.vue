<template>
  <tr :class="isOverview ? 'border-b' : ''">
    <th rowspan="2">TRAUMA & EXTREMITIES</th>
    <td>FOOT & ANKLE</td>
    <td>
      <input
        v-model.lazy="elementInfoData.footAnkle.annualCase"
        class="presentation-wizard-input"
        placeholder="Enter Here"
        :disabled="editIsDisallowed"
      />
    </td>
    <td>
      <input
        v-model.lazy="elementInfoData.footAnkle.ms"
        class="presentation-wizard-input"
        placeholder="Enter Here"
        :disabled="editIsDisallowed"
      />
    </td>
    <td>
      <input
        v-model.lazy="elementInfoData.footAnkle.vendors"
        class="presentation-wizard-input"
        placeholder="Enter Here"
        :disabled="editIsDisallowed"
      />
    </td>
    <td>
      <input
        v-model.lazy="elementInfoData.footAnkle.contractedBy"
        class="presentation-wizard-input"
        placeholder="Enter Here"
        :disabled="editIsDisallowed"
      />
    </td>
    <td rowspan="2">
      <div class="flex space-x-10">
        <div class="flex items-center space-x-2">
          <input
            v-model="elementInfoData.isOpportunity"
            class="presentation-wizard-radio"
            type="radio"
            :value="true"
            :disabled="editIsDisallowed"
          />
          <label class="text-normal text-gray-450">Yes </label>
        </div>
        <div class="flex items-center space-x-2">
          <input
            v-model="elementInfoData.isOpportunity"
            class="presentation-wizard-radio"
            type="radio"
            :value="false"
            :disabled="editIsDisallowed"
          />
          <label class="text-normal text-gray-450">No </label>
        </div>
      </div>
    </td>
  </tr>
  <tr :class="isOverview ? 'border-b' : ''">
    <td>UPPER EXTREMITIES</td>
    <td>
      <input
        v-model="elementInfoData.upperExtremities.annualCase"
        class="presentation-wizard-input"
        placeholder="Enter Here"
        :disabled="editIsDisallowed"
      />
    </td>
    <td>
      <input
        v-model="elementInfoData.upperExtremities.ms"
        class="presentation-wizard-input"
        placeholder="Enter Here"
        :disabled="editIsDisallowed"
      />
    </td>
    <td>
      <input
        v-model="elementInfoData.upperExtremities.vendors"
        class="presentation-wizard-input"
        placeholder="Enter Here"
        :disabled="editIsDisallowed"
      />
    </td>
    <td>
      <input
        v-model="elementInfoData.upperExtremities.contractedBy"
        class="presentation-wizard-input"
        placeholder="Enter Here"
        :disabled="editIsDisallowed"
      />
    </td>
  </tr>
</template>

<script>
import { ref } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  props: {
    elementInfo: { type: Object, required: true },
  },
  setup(props) {
    const editIsDisallowed = useRfpEditIsDisabled()
    const elementInfoData = ref(props.elementInfo)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    return {
      editIsDisallowed,
      elementInfoData,
      isOverview,
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
tr:nth-child(3) td {
  @apply pb-3;
}
.presentation-wizard-radio {
  @apply w-5 h-5 border-2 border-gray-450;
}
</style>
