<template>
  <div v-if="displayedResources.length" class="flex flex-wrap justify-between">
    <h1 class="text-header-jnj text-primary w-full">Folders</h1>
    <router-link
      v-for="(folder, folderIndex) in displayedResources"
      :key="folderIndex"
      class="w-52 h-32 border rounded-xl p-4 flex flex-col relative my-4"
      :to="{
        name: 'resources-folder',
        params: {
          folderName: folderIndex,
        },
      }"
    >
      <SvgIcon class="h-14 w-20" name="folderIcon" />
      <div class="absolute top-4 right-4 flex items-center">
        <SvgIcon class="h-4 w-4 mr-1" name="filenumber" />
        <div>{{ folder.data.length }}</div>
      </div>
      <div class="text-sm pl-4">
        {{ folder.name }}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    folders: { type: Array, required: true },
  },
  computed: {
    displayedResources() {
      return this.folders.slice(1)
    },
  },
}
</script>
