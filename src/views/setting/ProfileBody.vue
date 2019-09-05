<template>
  <page-wrapper title="Settings">
    <headerBreadCrumps page-name="Settings" :links="[]" />
    <base-card
      class="flex flex-col w-full space-y-5 p-0 rounded-2xl"
      :card-style="'py-4 bg-white'"
    >
      <tab-panel active-item="Profile" />
      <ProfileBody />
    </base-card>
  </page-wrapper>
</template>

<script>
import TabPanel from '@/components/setting/TabPanel.vue'
import ProfileBody from '@/components/setting/ProfileBody.vue'
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import BaseCard from '@/components/utils/container/BaseCard.vue'
import headerBreadCrumps from '@/components/utils/headerBreadCrumps.vue'

export default {
  components: {
    TabPanel,
    ProfileBody,
    PageWrapper,
    BaseCard,
    headerBreadCrumps,
  },
}
</script>
