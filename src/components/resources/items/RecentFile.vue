<template>
  <div class="flex justify-between border-b">
    <div class="flex items-center py-4">
      <SvgIcon class="h-14 w-20" :name="resource.filetype || 'link'" />
      <h1 class="text-title-jnj ml-4 width">
        {{ resource.filename }}
        <p class="text-xs text-gray-500">
          {{ resource.snippet }}
        </p>
      </h1>
    </div>

    <div class="flex items-center">
      <div class="flex justify-center w-72">
        <div
          v-for="tag in resource.tags"
          :key="tag"
          class="mx-1 text-center flex items-center bg-white font-bold text-pink-500 border-pink-500 border-2 rounded-full px-2"
        >
          <div>
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end ml-4">
      <SvgIcon
        v-if="resource.favorite"
        class="h-8 w-9"
        name="favorite"
        @click="change"
      />
      <SvgIcon v-else class="h-8 w-9" name="star" @click="change" />
      <a :href="resource.url" download>
        <button
          class="mx-3 px-8 bg-white text-accent-blue border-accent-blue border-2 rounded-lg py-2"
          @click="downloaded"
        >
          Download
        </button>
      </a>
      <div class="relative flex">
        <div class="p-3 h-10 bg-gray-50 rounded-lg items-center">
          <SvgIcon class="h-5 w-1" name="moreVertical" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    resource: {
      type: Object,
      required: true,
    },
    folderId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      status: false,
    }
  },
  methods: {
    ...mapMutations({
      setFavorite: 'resources/setFavorite',
      setDownload: 'resources/setDownload',
    }),
    change() {
      this.setFavorite({
        folder_id: this.folderId - 1,
        file_id: this.resource.id,
      })
    },
    downloaded() {
      this.setDownload({
        folder_id: this.folderId - 1,
        downloaded: this.resource,
      })
    },
  },
}
</script>
<style scoped>
.width {
  width: 350px;
}
</style>
