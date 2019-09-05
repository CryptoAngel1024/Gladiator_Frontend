<template>
  <page-wrapper title="Overview">
    <div class="flex flex-col">
      <tab-panel />
      <statics-chart />
      <utilization-report />
      <div class="flex justify-between">
        <customer-checklist v-if="isASC" class="w-3/5" />
        <bulk-export v-if="isASC" class="w-1/3" />
      </div>
    </div>
  </page-wrapper>
</template>

<script>
import TabPanel from '@/components/overview/TabPanel.vue'
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import StaticsChart from '@/components/overview/StaticsChart.vue'
import UtilizationReport from '@/components/overview/UtilizationReport.vue'
import CustomerChecklist from '@/components/overview/CustomerChecklist.vue'
import BulkExport from '@/components/overview/BulkExport.vue'
import { isAscDepartment } from '@/utils/departments'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    PageWrapper,
    StaticsChart,
    UtilizationReport,
    CustomerChecklist,
    BulkExport,
    TabPanel,
  },
  setup() {
    const isASC = isAscDepartment()
    const store = useStore()

    async function fetchGAReport() {
      await store.dispatch('ga/fetchReportData')
    }

    onMounted(fetchGAReport)

    return {
      isASC,
    }
  },
}
</script>
