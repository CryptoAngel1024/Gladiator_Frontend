<template>
  <page-wrapper title="Templates">
    <headerBreadCrumps page-name="Templates" :links="[]" />
    <base-card class="p-4 rounded-2xl">
      <TemplatesBody />
    </base-card>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import headerBreadCrumps from '@/components/utils/headerBreadCrumps.vue'
import TemplatesBody from '@/components/templates/TemplatesBody.vue'
import BaseCard from '@/components/utils/container/BaseCard.vue'

export default {
  components: {
    PageWrapper,
    BaseCard,
    headerBreadCrumps,
    TemplatesBody,
  },
}
</script>
