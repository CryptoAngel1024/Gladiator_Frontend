<template>
  <page-wrapper title="Shared with Me">
    <headerBreadCrumps page-name="Shared with Me" :links="[]" />
    <base-card class="flex flex-col w-full space-y-5 rounded-2xl">
      <div class="flex justify-between items-center">
        <h1 class="text-header-jnj text-primary" data-test="page-title">
          Shared with Me
        </h1>

        <div class="flex border items-center px-4 rounded-lg space-x-2">
          <svg-icon class="w-5 h-5" name="search" />
          <input
            v-model="searchTerm"
            placeholder="Search Presentations"
            class="py-3 my-auto focus:outline-none"
          />
        </div>
      </div>

      <shared-with-me-table
        :shared-rfps="filteredRfps"
        :is-loading="isLoading"
        :loading-error="loadingError"
      />
    </base-card>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import BaseCard from '@/components/utils/container/BaseCard.vue'
import SvgIcon from '@/components/utils/SvgIcon.vue'
import SharedWithMeTable from '@/components/sharedWithMe/SharedWithMeTable.vue'
import headerBreadCrumps from '@/components/utils/headerBreadCrumps.vue'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    PageWrapper,
    BaseCard,
    SvgIcon,
    SharedWithMeTable,
    headerBreadCrumps,
  },

  setup() {
    const searchTerm = ref('')
    const store = useStore()
    const sharedRfps = computed(() => store.getters['rfps/sharedWithMe'])

    const filteredRfps = computed(() => {
      const query = searchTerm.value.toLowerCase()
      return sharedRfps.value?.filter(
        (rfp) =>
          rfp.customerName.toLowerCase().includes(query) ||
          rfp.sharedBy.firstName.toLowerCase().includes(query) ||
          rfp.sharedBy.lastName.toLowerCase().includes(query),
      )
    })

    const isLoading = ref(false)
    const loadingError = ref('')

    onMounted(async () => {
      isLoading.value = true
      const { err } = await store.dispatch('rfps/fetchMyRfps', {
        sharedWithMe: true,
      })
      if (err) loadingError.value = err.message || err
      isLoading.value = false
    })
    return {
      filteredRfps,
      searchTerm,
      isLoading,
      loadingError,
    }
  },
}
</script>
