<template>
  <tr>
    <td class="py-4">
      <div class="flex">
        <img
          class="h-16 w-28"
          src="@/assets/images/template6.png"
          alt="template icon"
        />
      </div>
    </td>
    <td class="py-4">
      <div class="flex">
        <div class="ml-4 my-auto">
          {{ templateData.templateName }}
          <p class="text-xs text-gray-500">
            {{ templateData.templateDescription }}
          </p>
        </div>
      </div>
    </td>
    <td class="py-4 flex items-center">
      <SvgIcon class="h-6 w-8" name="templateplay" />
      <div class="font-bold text-gray-500 ml-1">
        {{ templateData.numberOfSlides }}
      </div>
    </td>
    <td class="py-4 pr-8">
      <div class="flex justify-end">
        <button @click="changeFavorite">
          <SvgIcon
            class="h-8 w-9"
            :name="templateData.bookmarked ? 'favorite' : 'star'"
          />
        </button>
        <router-link
          :to="{
            name: 'templates-edit',
            params: {
              templateID: templateData.templateId,
            },
          }"
          class="mx-8 px-8 bg-white text-accent-blue border-accent-blue border-2 rounded-lg py-2"
        >
          Edit
        </router-link>
      </div>
    </td>
  </tr>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    templateData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      changeBookmarkState: 'templates/changeBookmarkState',
    }),
    async changeFavorite() {
      await this.changeBookmarkState(this.templateData.templateId)
    },
  },
}
</script>
