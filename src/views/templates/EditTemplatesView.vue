<template>
  <page-wrapper title="Edit Templates">
    <headerBreadCrumps
      page-name="Edit Templates"
      :links="[{ name: 'Templates', path: { name: 'templates' } }]"
    />
    <base-card class="p-4 rounded-2xl">
      <edit-body :id="templateID" />
    </base-card>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import headerBreadCrumps from '@/components/utils/headerBreadCrumps.vue'
import EditBody from '@/components/templates/EditBody.vue'
import BaseCard from '@/components/utils/container/BaseCard.vue'
import { useRoute } from 'vue-router'
import { computed } from '@vue/runtime-core'

export default {
  components: {
    PageWrapper,
    BaseCard,
    headerBreadCrumps,
    EditBody,
  },
  setup() {
    const route = useRoute()
    const templateID = computed(() => route.params.templateID)

    return {
      templateID,
    }
  },
}
</script>
