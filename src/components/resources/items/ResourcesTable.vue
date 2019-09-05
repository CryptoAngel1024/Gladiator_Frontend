<template>
  <div class="w-full">
    <div
      class="bg-gray-75 text-left text-xs font-bold uppercase w-full rounded-lg flex py-2"
    >
      <div class="px-3 mr-80">resource name</div>
      <div>tags</div>
    </div>
    <div class="">
      <ResourcesRow
        v-for="(resource, index) in res.data"
        :key="index"
        :resource="resource"
        :folder-id="res.folderID"
      />
    </div>
  </div>
</template>

<script>
import ResourcesRow from './ResourcesRow.vue'
export default {
  components: { ResourcesRow },
  props: {
    res: { type: Array, required: true },
  },
}
</script>
