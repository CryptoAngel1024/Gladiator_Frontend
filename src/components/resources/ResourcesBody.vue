<template>
  <div class="flex flex-col w-full">
    <div class="flex justify-between items-center pb-4">
      <div class="flex">
        <h1 class="text-header-jnj text-primary">All Resources</h1>
      </div>
      <div class="flex border items-center px-4 rounded-lg space-x-2">
        <svg-icon class="w-5 h-5" name="search" />
        <input
          v-model="searchTerm"
          placeholder="Search Resources"
          class="py-3 my-auto focus:outline-none"
        />
      </div>
    </div>
    <div class="flex flex-col w-full space-y-5">
      <p v-if="searchedResources.length === 0" class="my-2">
        No resources found.
      </p>
      <table v-else class="w-full">
        <thead class="main-page-table-header">
          <tr class="">
            <th class="py-2 rounded-l-lg"></th>
            <th class="py-2">RESOURCE NAME</th>

            <th class="py-2 text-center">TAGS</th>

            <th class="py-2 rounded-r-lg"></th>
          </tr>
        </thead>
        <tbody class="divide-y" data-test="resources-body">
          <ResourcesRow
            v-for="Resource in searchedResources"
            :key="Resource.id"
            :resource="Resource"
            :folder-id="Resource.folderID"
            :data-test="`resource-row-${Resource.id}`"
          />
        </tbody>
      </table>
      <ResourcesFolder :folders="resources" />
    </div>
  </div>
</template>
<script>
import ResourcesFolder from '@/components/resources/items/ResourcesFolder.vue'
import ResourcesRow from '@/components/resources/items/ResourcesRow.vue'
import { useStore } from 'vuex'
import { computed, ref } from '@vue/runtime-core'

export default {
  components: {
    ResourcesFolder,
    ResourcesRow,
  },
  setup() {
    const store = useStore()
    const searchTerm = ref('')

    const resources = computed(() => store.getters['resources/getResources'])
    const allResources = computed(() => store.getters['resources/allResources'])

    function searchResources(resource) {
      const lowerSearchTerm = searchTerm.value.toLowerCase()
      return (
        resource.filename?.toLowerCase().includes(lowerSearchTerm) ||
        resource.snippet?.toLowerCase().includes(lowerSearchTerm) ||
        resource.tags?.filter((tag) =>
          tag.toLowerCase().includes(lowerSearchTerm),
        ).length ||
        resource.externalUrl?.toLowerCase().includes(lowerSearchTerm)
      )
    }
    const searchedResources = computed(() =>
      !searchTerm.value
        ? allResources.value
        : allResources.value.filter(searchResources),
    )

    return {
      resources,
      searchTerm,
      searchedResources,
    }
  },
}
</script>
