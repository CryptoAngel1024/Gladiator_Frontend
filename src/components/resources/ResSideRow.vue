<template>
  <div class="flex flex-col border-b">
    <div class="flex items-center py-3">
      <SvgIcon class="h-14 w-20" :name="resource.filetype || 'link'" />
      <h1 class="text-title-jnj ml-2">
        {{ resource.filename }}{{ resource.filetype ? '.' : ''
        }}{{ resource.filetype || '' }}
      </h1>
    </div>
    <div class="text-sm text-gray-500">
      {{ resource.snippet }}
    </div>
    <div class="flex items-center justify-between ml-4 py-3">
      <div class="flex">
        <SvgIcon class="h-6 w-8 mr-2" name="clock" />
        <div v-if="resource.filesize" class="font-bold text-gray-500">
          {{ resource.filesize }}&nbsp;MB
        </div>
      </div>
      <a
        :href="resource.url || resource.externalUrl"
        :download="Boolean(resource.url) ? '' : null"
        target="blank"
      >
        <button
          class="mx-3 px-4 bg-white text-accent-blue border-accent-blue border-2 rounded-lg py-2"
        >
          Download
        </button>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style scoped>
.width {
  width: 350px;
}
</style>
