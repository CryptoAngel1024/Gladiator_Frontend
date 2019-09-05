<template>
  <page-wrapper title="Resources">
    <headerBreadCrumps page-name="Resources" :links="[]" />
    <base-card class="p-4 rounded-2xl">
      <ResourcesBody data-test="resources-header" />
    </base-card>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import headerBreadCrumps from '@/components/utils/headerBreadCrumps.vue'
import ResourcesBody from '@/components/resources/ResourcesBody.vue'
import BaseCard from '@/components/utils/container/BaseCard.vue'

export default {
  components: {
    PageWrapper,
    BaseCard,
    headerBreadCrumps,
    ResourcesBody,
  },
}
</script>
