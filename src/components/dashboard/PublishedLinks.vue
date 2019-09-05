<template>
  <section class="">
    <h1
      class="text-gray-875 text-2xl font-bold pb-3"
      data-test="published-links-title"
    >
      Published Links
    </h1>
    <base-card class="flex flex-col bg-white p-4 divide-y">
      <ApiState
        v-if="publishedLinks.length === 0"
        :loading="isLoading"
        data-type="publishedLinks"
      />

      <published-link-item
        v-for="(value, presentationId) in rfpLinks"
        :key="presentationId"
        :links="value"
      />
    </base-card>
  </section>
</template>
<script>
import PublishedLinkItem from './PublishedLinkItem.vue'
import BaseCard from '@/components/utils/container/BaseCard.vue'
import ApiState from '@/components/utils/apiState.vue'
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'

export default {
  components: {
    PublishedLinkItem,
    BaseCard,
    ApiState,
  },
  setup() {
    const store = useStore()
    const isLoading = ref(false)

    async function getPublishedLinks() {
      isLoading.value = true
      try {
        await store.dispatch('rfps/getPublishedLinks', { limit: 8, page: 0 })
      } catch (err) {
        console.error('fetch links: ', err)
      }
      isLoading.value = false
    }

    onMounted(getPublishedLinks)

    const department = computed(
      () => store.getters['setting/getCurrentDepartment'],
    )
    watch(department, getPublishedLinks)

    const publishedLinks = computed(
      () => store.getters['rfps/getPublishedLinks'],
    )

    const rfpLinks = computed(() => {
      return publishedLinks.value?.reduce((groupedLinks, link) => {
        groupedLinks[link.presentationId] = [
          ...(groupedLinks[link.presentationId] || []),
          link,
        ]
        return groupedLinks
      }, {})
    })

    return { publishedLinks, isLoading, rfpLinks }
  },
}
</script>
