<template>
  <page-wrapper title="Page not found: 404">
    <base-card class="rounded-2xl">
      Please go to
      <router-link class="text-light-blue pl-1" to="dashboard">
        dashboard
      </router-link>
    </base-card>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import BaseCard from '@/components/utils/container/BaseCard.vue'

export default {
  components: {
    PageWrapper,
    BaseCard,
  },
}
</script>
