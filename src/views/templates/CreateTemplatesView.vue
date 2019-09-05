<template>
  <page-wrapper title="Create Templates">
    <headerBreadCrumps
      page-name="Create Templates"
      :links="[{ name: 'Templates', path: { name: 'templates' } }]"
    />
    <base-card class="p-4 rounded-2xl">
      <CreateBody />
    </base-card>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import headerBreadCrumps from '@/components/utils/headerBreadCrumps.vue'
import CreateBody from '@/components/templates/CreateBody.vue'
import BaseCard from '@/components/utils/container/BaseCard.vue'

import { computed } from '@vue/reactivity'
import { useRoute } from 'vue-router'

export default {
  components: {
    PageWrapper,
    BaseCard,
    headerBreadCrumps,
    CreateBody,
  },
  setup() {
    const route = useRoute()
    const currentStep = computed(() => Number(route.params.step) || 1)

    return { currentStep }
  },
}
</script>
