<template>
  <div
    class="flex flex-col py-6 px-5 bg-white borde-2 rounded-xl w-44 space-y-4 text-gray-425"
  >
    <router-link
      :to="{
        name: 'slide',
        params: {
          presentationId,
        },
      }"
      target="_blank"
      class="flex"
    >
      <svg-icon name="presentation" class="h-5 w-6 mr-4" />
      <h1>Preview</h1>
    </router-link>
    <router-link
      :to="{
        name: 'create-link',
        params: {
          presentationId,
        },
      }"
      class="flex"
    >
      <svg-icon
        :name="editIsDisallowed ? 'view' : 'edit'"
        class="h-5 w-6 mr-4"
      />

      <h1>{{ editIsDisallowed ? 'View' : 'Edit' }}</h1>
    </router-link>
    <button
      class="flex items-center text-primary space-x-1"
      type="button"
      @click.stop="deletePresentation"
    >
      <div class="p-1 border-primary border-2 rounded-md">
        <svg-icon name="delete" class="h-5 w-6" />
      </div>
      <h1>Delete</h1>
    </button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRfpEditIsDisallowed } from '@/utils/useRfpEditIsDisabled.js'

export default {
  props: {
    presentationId: { type: String, required: true },
  },
  setup(props) {
    const store = useStore()
    const { editIsDisallowed } = computed(() =>
      useRfpEditIsDisallowed(props.presentationId),
    )

    const deletePresentation = async () => {
      try {
        await store.dispatch('rfps/deleteRfp', props.presentationId)
      } catch (err) {
        console.error('delete Rfp: ', err)
      }
    }

    return { deletePresentation, editIsDisallowed }
  },
}
</script>
