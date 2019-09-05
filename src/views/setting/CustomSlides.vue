<template>
  <page-wrapper title="Settings">
    <headerBreadCrumps page-name="Settings" :links="[]" />
    <base-card
      class="flex flex-col w-full space-y-5 p-0 rounded-2xl"
      :card-style="'py-4 bg-white'"
    >
      <tab-panel
        active-item="Custom Slides"
        :show-button="true"
        data-test="tab-panel"
      />
      <custom-slides-table data-test="custom-slides-table" />
    </base-card>
  </page-wrapper>
</template>

<script>
import TabPanel from '@/components/setting/TabPanel.vue'
import CustomSlidesTable from '@/components/setting/custom-slides/CustomSlidesTable.vue'
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import BaseCard from '@/components/utils/container/BaseCard.vue'
import headerBreadCrumps from '@/components/utils/headerBreadCrumps.vue'
import { ref } from '@vue/runtime-core'

export default {
  components: {
    TabPanel,
    CustomSlidesTable,
    PageWrapper,
    BaseCard,
    headerBreadCrumps,
  },
  setup() {
    const searchTerm = ref('')

    return {
      searchTerm,
    }
  },
}
</script>
