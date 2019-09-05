<template>
  <tr :class="isOverview ? 'border-b' : ''">
    <th rowspan="3">JOINT RECON</th>
    <JointTableRow :title="'KNEES'" :row-data="elementInfoData.knees" />
  </tr>
  <tr :class="isOverview ? 'border-b' : ''">
    <JointTableRow :title="'HIPS'" :row-data="elementInfoData.hips" />
  </tr>
  <tr :class="isOverview ? 'border-b' : ''">
    <JointTableRow :title="'SHOULDERS'" :row-data="elementInfoData.shoulders" />
  </tr>
</template>

<script>
import { ref } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import JointTableRow from './UncoverTableRow.vue'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    JointTableRow,
  },
  props: {
    elementInfo: { type: Object, required: true },
  },
  setup(props) {
    const editIsDisallowed = useRfpEditIsDisabled()
    const elementInfoData = ref(props.elementInfo)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    return {
      elementInfoData,
      editIsDisallowed,
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
</style>
