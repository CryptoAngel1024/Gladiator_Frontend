<template>
  <page-wrapper title="Overview">
    <div class="flex flex-row flex-wrap">
      <div
        class="flex flex-col space-y-4 mb-6 flex-grow xl:w-2/3 w-full xl:pr-10"
      >
        <get-started />
        <recent-drafts />
        <templates />
      </div>
      <published-links class="xl:w-1/3 xl:max-w-xs w-full min-w-64" />
    </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import GetStarted from '@/components/dashboard/GetStarted.vue'
import RecentDrafts from '@/components/dashboard/RecentDrafts.vue'
import Templates from '@/components/dashboard/TemplatesSection.vue'
import PublishedLinks from '@/components/dashboard/PublishedLinks.vue'

export default {
  components: {
    PageWrapper,
    GetStarted,
    RecentDrafts,
    Templates,
    PublishedLinks,
  },
}
</script>
