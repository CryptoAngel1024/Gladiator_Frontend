<template>
  <tr>
    <td>
      <SvgIcon class="h-14 w-20 mr-4" :name="resource.filetype || 'link'" />
    </td>
    <td class="text-title-jnj">
      {{ resource.filename }}
      <p class="text-base text-gray-500">
        {{ resource.snippet }}
      </p>
    </td>
    <td class="w-60">
      <div class="flex justify-center">
        <div
          v-for="tag in resource.tags"
          :key="tag"
          class="mx-auto text-center flex items-center bg-white font-bold text-pink-500 border-pink-500 border-2 rounded-full px-2"
        >
          <div>
            {{ tag }}
          </div>
        </div>
      </div>
    </td>
    <td>
      <div class="flex items-center justify-end ml-4">
        <button data-test="favorite-button" @click="changefavorite">
          <SvgIcon
            class="h-8 w-9"
            :name="resource.favorite ? 'favorite' : 'star'"
          />
        </button>
        <a
          :href="resource.url || resource.externalUrl"
          :download="Boolean(resource.url) ? '' : null"
          target="blank"
        >
          <button
            class="mx-3 px-8 bg-white text-accent-blue border-accent-blue border-2 rounded-lg py-2"
            data-test="view-button"
            @click="setdownloaded"
          >
            {{ resource.url ? 'Download' : 'View' }}
          </button>
        </a>
      </div>
    </td>
  </tr>
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
  methods: {
    ...mapMutations({
      setFavorite: 'resources/setFavorite',
      setDownload: 'resources/setDownload',
    }),
    changefavorite() {
      this.setFavorite({
        folder_id: this.folderId - 1,
        file_id: this.resource.id - 1,
      })
    },
    setdownloaded() {
      this.setDownload({ folder_id: this.folderId, downloaded: this.resource })
    },
  },
}
</script>

<style scoped lang="postcss">
td {
  @apply py-4;
}
</style>
