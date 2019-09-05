<template>
  <div class="grid grid-flow-row w-full my-2">
    <div
      class="grid grid-cols-6 gap-3 items-center"
      :class="
        isOverview
          ? 'bg-slidColor-1 text-white rounded-tl-lg rounded-tr-lg'
          : ''
      "
    >
      <div v-for="columnTitle in contractLandscapeColumns" :key="columnTitle">
        {{ columnTitle }}
      </div>
    </div>
    <contract-landscape-row
      v-for="(contractLandscape, index) in contractLandscapeData"
      :key="index"
      :contract-landscape="contractLandscape"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import contractLandscapeColumns from './contractLandscapeColumns.json'
import ContractLandscapeRow from './ContractLandscapeRow.vue'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    ContractLandscapeRow,
  },
  props: {
    contractLandscapeInfo: { type: Object, required: true },
  },
  setup(props) {
    const contractLandscapeData = ref(props.contractLandscapeInfo)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    return {
      contractLandscapeColumns,
      contractLandscapeData,
      isOverview,
    }
  },
}
</script>

<style scoped lang="postcss">
input:disabled {
  background-color: white;
  border: none;
}
</style>
