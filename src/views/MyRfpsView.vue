<template>
  <page-wrapper title="My Presentations">
    <headerBreadCrumps page-name="My Presentations" :links="[]" />
    <base-card class="p-4 rounded-2xl space-y-5 flex-col">
      <div class="flex justify-between items-center">
        <h1 class="text-header-jnj text-primary">Drafts</h1>
        <div class="flex border items-center px-4 rounded-lg space-x-2">
          <svg-icon class="w-5 h-5" name="search" />
          <input
            v-model="searchTerm"
            placeholder="Search Presentations"
            class="py-3 my-auto focus:outline-none"
          />
        </div>
      </div>
      <my-rfp-table
        :rfps="myDraftRfps"
        :loading="loading"
        :loading-error="error"
        data-test="my-rfp-drafts"
      />
      <h1 class="text-header-jnj text-primary">Published Presentations</h1>
      <my-rfp-table
        :rfps="myPublishedRfps"
        :loading="loading"
        :loading-error="error"
        data-test="my-rfp-published"
      />
    </base-card>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import BaseCard from '@/components/utils/container/BaseCard.vue'
import headerBreadCrumps from '@/components/utils/headerBreadCrumps.vue'
import SvgIcon from '@/components/utils/SvgIcon.vue'
import { useStore } from 'vuex'
import { computed, ref, onMounted } from '@vue/runtime-core'
import MyRfpTable from '@/components/myRfp/MyRfpTable.vue'

export default {
  components: {
    PageWrapper,
    BaseCard,
    SvgIcon,
    MyRfpTable,
    headerBreadCrumps,
  },
  setup() {
    const store = useStore()
    const searchTerm = ref('')

    const loading = ref(true)
    const error = ref('')

    onMounted(async () => {
      loading.value = true
      const { err } = await store.dispatch('rfps/fetchMyRfps', {
        ownedByMe: true,
      })
      if (err) error.value = err.message || err
      loading.value = false
    })

    function searchMyRfp(rfp) {
      const email = store.getters['auth/email']
      if (rfp.owner !== email) return false

      const lowerSearchTerm = searchTerm.value.toLowerCase()
      if (!lowerSearchTerm) return true

      return (
        rfp.title?.toLowerCase().includes(lowerSearchTerm) ||
        rfp.customerInfo?.name.toLowerCase().includes(lowerSearchTerm) ||
        rfp.customerName?.toLowerCase().includes(lowerSearchTerm)
      )
    }

    const myDraftRfps = computed(() =>
      store.getters['rfps/getDraftRfps'].filter(searchMyRfp),
    )

    const myPublishedRfps = computed(() =>
      store.getters['rfps/getPublishedRfps'].filter(searchMyRfp),
    )
    return {
      myDraftRfps,
      myPublishedRfps,
      searchTerm,
      loading,
      error,
    }
  },
}
</script>
