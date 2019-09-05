<template>
  <table class="w-full">
    <thead class="main-page-table-header">
      <tr>
        <th class="px-3 w-1/4"></th>
        <th class="w-1/3">Client</th>
        <th>Shared With</th>
        <th />
      </tr>
    </thead>
    <tbody class="divide-y">
      <tr v-if="rfps.length === 0">
        <td colspan="4">
          <ApiState
            :loading="loading"
            :error-message="loadingError"
            class="mt-1"
          />
        </td>
      </tr>
      <my-rfp-row
        v-for="rfp in rfps"
        :key="rfp.presentationId"
        :rfp="rfp"
        :data-test="`my-rfp-row-${rfp.presentationId}`"
      />
    </tbody>
  </table>
</template>
<script>
import MyRfpRow from './MyRfpRow.vue'
import ApiState from '@/components/utils/apiState.vue'

export default {
  components: { MyRfpRow, ApiState },
  props: {
    rfps: { type: Array, required: true },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingError: {
      type: String,
      default: '',
    },
  },
}
</script>
