<template>
  <tr :class="isOverview ? 'border-b' : ''">
    <th rowspan="4">SPORTS</th>
    <SportsTableRow
      :title="'UPPER EXTREMITIES : ROTATOR CUFF'"
      :row-data="elementInfoData.upperExtremities"
    />
  </tr>
  <tr :class="isOverview ? 'border-b' : ''">
    <SportsTableRow
      :title="'LOWER EXTREMITIES : ACL'"
      :row-data="elementInfoData.lowerExtremities"
    />
  </tr>
  <tr :class="isOverview ? 'border-b' : ''">
    <SportsTableRow :title="'CAPITAL'" :row-data="elementInfoData.capital" />
  </tr>
  <tr :class="isOverview ? 'border-b' : ''">
    <SportsTableRow :title="'OTHER'" :row-data="elementInfoData.other" />
  </tr>
</template>

<script>
import { ref } from 'vue'
import SportsTableRow from './UncoverTableRow.vue'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    SportsTableRow,
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
tr td {
  @apply p-1;
}
</style>
