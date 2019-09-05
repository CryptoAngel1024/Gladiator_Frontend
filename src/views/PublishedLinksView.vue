<template>
  <page-wrapper title="Published Links">
    <headerBreadCrumps page-name="Published Links" :links="[]" />
    <base-card class="p-4 rounded-2xl">
      <div class="flex flex-col w-full space-y-5">
        <div class="flex justify-between items-center">
          <div class="flex">
            <h1 class="text-header-jnj text-primary" data-test="page-title">
              Published Links
            </h1>
          </div>
          <div class="flex border items-center px-4 rounded-lg space-x-2">
            <svg-icon class="w-5 h-5" name="search" />
            <input
              v-model="searchTerm"
              placeholder="Search Links"
              class="py-3 my-auto focus:outline-none"
              data-test="search-published-link-input"
            />
          </div>
        </div>
        <published-links-table
          data-test="published-links-table"
          :published-links="publishedLinks"
        />
        <ApiState
          v-if="publishedLinks.length === 0"
          :loading="loading"
          :error-message="errorMessage"
          data-type="publishedLinks"
        />
      </div>
    </base-card>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import BaseCard from '@/components/utils/container/BaseCard.vue'
import SvgIcon from '@/components/utils/SvgIcon.vue'
import ApiState from '@/components/utils/apiState.vue'
import PublishedLinksTable from '@/components/publishedLinks/PublishedLinksTable.vue'
import headerBreadCrumps from '@/components/utils/headerBreadCrumps.vue'
import { useStore } from 'vuex'
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    PageWrapper,
    BaseCard,
    SvgIcon,
    PublishedLinksTable,
    ApiState,
    headerBreadCrumps,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const loading = ref(false)
    const errorMessage = ref('')

    const searchQuery = computed(() => route.query.search)
    const searchTerm = ref(searchQuery.value || '')
    watch(searchTerm, () =>
      router.push({ name: 'published', query: { search: searchTerm.value } }),
    )
    watch(searchQuery, () => {
      if (searchQuery.value !== searchTerm.value)
        searchTerm.value = searchQuery.value
    })

    onMounted(async () => {
      errorMessage.value = ''
      loading.value = true
      const { err } = await store.dispatch('rfps/getPublishedLinks')
      loading.value = false
      if (err) errorMessage.value = `Loading Failed: ${err.message || err}`
    })

    function searchRfp(link) {
      const lowerSearchTerm = searchTerm.value?.toLowerCase()
      if (!lowerSearchTerm) return true

      return (
        link.linkName?.toLowerCase().includes(lowerSearchTerm) ||
        link.clientName?.toLowerCase().includes(lowerSearchTerm) ||
        link.linkType?.toLowerCase().includes(lowerSearchTerm)
      )
    }

    const publishedLinks = computed(() =>
      store.getters['rfps/getPublishedLinks'].filter(searchRfp),
    )

    return {
      publishedLinks,
      searchTerm,
      loading,
      errorMessage,
    }
  },
}
</script>
