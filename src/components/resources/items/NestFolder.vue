<template>
  <page-wrapper title="Resources">
    <headerBreadCrumps page-name="Resources" :links="[]" />
    <base-card
      class="min-h-screen border-none rounded-3xl py-7 divide-x justify-between"
    >
      <div class="flex flex-col space-y-8 w-full">
        <div class="flex items-center">
          <router-link
            class="flex space-x-4 items-center"
            :to="{
              name: 'resources',
            }"
          >
            <SvgIcon name="left_arrow_2" class="text-primary w-6 h-6" />
            <h1 class="text-primary text-2xl font-medium">Back</h1>
          </router-link>
          <div class="flex justify-between items-center ml-4">
            <ol class="rounded flex items-center bg-grey-light text-grey">
              <li class="px-2">
                <router-link
                  to="resources"
                  class="no-underline text-sm text-gray-500"
                >
                  Resources
                </router-link>
              </li>
              <li class="text-gray-500 text-sm">\</li>
              <li class="px-2 font-medium text-emerald-900">
                {{ resources[folderName].name }}
              </li>
            </ol>
          </div>
        </div>
        <ResourcesTable :res="resources[folderName]" />
      </div>
    </base-card>
  </page-wrapper>
</template>

<script>
import headerBreadCrumps from '@/components/utils/headerBreadCrumps.vue'
import ResourcesTable from '@/components/resources/items/ResourcesTable.vue'

import BaseCard from '@/components/utils/container/BaseCard.vue'
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
  components: {
    PageWrapper,
    BaseCard,
    headerBreadCrumps,
    ResourcesTable,
  },
  setup() {
    const store = useStore()
    const resources = computed(() => store.getters['resources/getResources'])
    return {
      resources,
    }
  },
  computed: {
    folderName() {
      return this.$route.params.folderName
    },
  },
}
</script>
