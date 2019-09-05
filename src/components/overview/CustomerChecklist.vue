<template>
  <section class="flex flex-col">
    <h1 class="text-header-jnj py-3">Customer Checklist</h1>
    <div class="w-full bg-white py-8 px-4 rounded-xl my-4">
      <div
        class="flex border items-center px-4 rounded-lg space-x-2 ml-auto max-w-max"
      >
        <svg-icon class="w-5 h-5" name="search" />
        <input
          v-model="searchTerm"
          type="search"
          placeholder="Search Customers"
          class="py-3 my-auto focus:outline-none max-w-sm"
        />
      </div>

      <table class="w-full my-4">
        <thead class="main-page-table-header">
          <tr>
            <th class="w-1/4 py-4" />
            <th class="w-1/3 text-subheader text-black">Customer Name</th>
            <th class="w-1/3 text-subheader text-black">Customer Created On</th>
            <th class="w-1/3 text-subheader text-black pr-2">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-if="rfps.length === 0">
            <td colspan="4">
              <ApiState
                :loading="loading"
                :error-message="error"
                class="mt-1"
              />
            </td>
          </tr>
          <customer-checklist-item
            v-for="rfp in rfps"
            :key="rfp.presentationId"
            :rfp="rfp"
            :data-test="`my-rfp-row-${rfp.presentationId}`"
          />
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, onMounted } from 'vue'
import CustomerChecklistItem from './CustomerChecklistItem.vue'
import ApiState from '@/components/utils/apiState.vue'

export default {
  components: { CustomerChecklistItem, ApiState },

  setup() {
    const store = useStore()
    const loading = ref(true)
    const error = ref('')
    const searchTerm = ref('')

    onMounted(async () => {
      loading.value = true
      const { err } = await store.dispatch('rfps/fetchMyRfps')
      if (err) error.value = err.message || err
      loading.value = false
    })

    function searchMyRfp(rfp) {
      const lowerSearchTerm = searchTerm.value.toLowerCase()
      if (!lowerSearchTerm) return true

      return rfp.customerName?.toLowerCase().includes(lowerSearchTerm)
    }
    const rfps = computed(() =>
      store.getters['rfps/myRfps'].filter(searchMyRfp),
    )

    return { rfps, searchTerm, loading, error }
  },
}
</script>
