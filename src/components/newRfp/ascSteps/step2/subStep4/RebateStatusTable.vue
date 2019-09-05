<template>
  <div class="grid grid-flow-row w-full my-2">
    <div
      class="grid grid-cols-5 space-x-3 items-center"
      :class="
        isOverview
          ? 'bg-slidColor-1 text-white rounded-tl-lg rounded-tr-lg'
          : ''
      "
    >
      <div
        v-for="columnTitle in rebateStatusColumns"
        :key="columnTitle"
        class="w-3/4"
      >
        {{ columnTitle }}
      </div>
    </div>
    <rebate-status-row
      v-for="(rebateStatus, index) in rebateStatusData"
      :key="index"
      :rebate-status="rebateStatus"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import rebateStatusColumns from './rebateStatusColumns.json'
import RebateStatusRow from './RebateStatusRow.vue'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    RebateStatusRow,
  },
  props: {
    rebateStatusInfo: { type: Object, required: true },
  },
  setup(props) {
    const rebateStatusData = ref(props.rebateStatusInfo)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    return {
      rebateStatusColumns,
      rebateStatusData,
      isOverview,
    }
  },
}
</script>
