<template>
  <section>
    <div class="flex justify-between">
      <h1 class="text-header-jnj py-3" data-test="recent-drafts-title">
        Utilization Report
      </h1>
      <dp-button
        :disabled="hideExportButton"
        type="submit"
        text="Export"
        class="w-28 text-white bg-accent-blue h-btn-builder min-h-btn-builder my-auto rounded-xl"
        @click="exportData"
      />
    </div>
    <div v-if="report2" class="w-full bg-white p-4 rounded-xl my-4">
      <table class="w-full" data-test="my-templates">
        <thead class="main-page-table-header">
          <tr class="uppercase text-center">
            <th class="pl-3 text-left">MODULE NAME</th>
            <th>referral link</th>
            <th>page views</th>
            <th>time spent</th>
            <th>bounce rate</th>
            <th>sessions</th>
            <th>Button clicks</th>
          </tr>
        </thead>
        <tbody class="divide-y" data-test="my-template-table-body">
          <ReportDatRow v-for="i in 8" :key="i" />
        </tbody>
      </table>
    </div>
    <LoadingState v-else-if="isLoading" />
    <ErrorBanner v-else-if="error" :message="error" />
  </section>
</template>

<script>
import DpButton from '@/components/buttons/DpButton.vue'
import ReportDatRow from './ReportDatRow.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import csvDownload from 'json-to-csv-export'
import LoadingState from '@/components/utils/LoadingState.vue'
import ErrorBanner from '@/components/utils/ErrorBanner.vue'

export default {
  components: {
    DpButton,
    ReportDatRow,
    LoadingState,
    ErrorBanner,
  },
  setup() {
    const store = useStore()
    async function exportData() {
      try {
        await store.dispatch('ga/fetchReportData')
        const data = store.getters['ga/report2']
        const csv = []
        for (const [key, value] of Object.entries(data)) {
          const lowerCaseValue = {}
          for (const [k, v] of Object.entries(value)) {
            lowerCaseValue[
              k.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase()
            ] = v
          }
          const entry = { module: key, ...lowerCaseValue }
          csv.push(entry)
        }
        csvDownload(csv, 'UtilizationReport.csv')
      } catch (err) {
        console.error('fetching ga report failed!', err)
      }
    }

    const report2 = computed(() => store.getters['ga/report2'])
    const isLoading = computed(() => store.getters['ga/getIsLoading'])
    const error = computed(() => store.getters['ga/getError'])
    const hideExportButton = computed(() => isLoading.value)

    return {
      exportData,
      isLoading,
      error,
      report2,
      hideExportButton,
    }
  },
}
</script>
