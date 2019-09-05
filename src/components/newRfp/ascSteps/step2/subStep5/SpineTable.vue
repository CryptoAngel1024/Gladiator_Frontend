<template>
  <tr :class="isOverview ? 'border-b' : ''">
    <th>SPINE</th>
    <SpineTableRow :title="'SPINE'" :row-data="elementInfoData.spine" />
  </tr>
</template>

<script>
import { ref } from 'vue'
import SpineTableRow from './UncoverTableRow.vue'
import useAllRfpSteps from '@/data/allRfpSteps.js'
export default {
  components: {
    SpineTableRow,
  },
  props: {
    elementInfo: { type: Object, required: true },
  },
  setup(props) {
    const elementInfoData = ref(props.elementInfo)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    return {
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
tr {
  border-collapse: separate;
  border-spacing: 0 8px;
}
tr td {
  @apply p-1;
}
table tr:nth-child(11) td {
  padding-top: 20px !important;
}

.presentation-wizard-radio {
  @apply w-5 h-5 border-2 border-gray-450;
}
</style>
