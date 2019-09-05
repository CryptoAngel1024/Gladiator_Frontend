<template>
  <page-wrapper title="Settings">
    <headerBreadCrumps page-name="Settings" :links="[]" />
    <base-card
      class="flex flex-col w-full space-y-5 p-0 rounded-2xl"
      :card-style="'py-4 bg-white'"
    >
      <tab-panel active-item="Email Body" />
      <email-body />
    </base-card>
  </page-wrapper>
</template>

<script>
import TabPanel from '@/components/setting/TabPanel.vue'
import EmailBody from '@/components/setting/EmailBody.vue'
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import BaseCard from '@/components/utils/container/BaseCard.vue'
import headerBreadCrumps from '@/components/utils/headerBreadCrumps.vue'

export default {
  components: {
    TabPanel,
    EmailBody,
    PageWrapper,
    BaseCard,
    headerBreadCrumps,
  },
}
</script>
