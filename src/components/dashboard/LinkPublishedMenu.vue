<template>
  <div
    class="flex flex-col py-6 px-5 bg-white borde-2 rounded-xl w-44 space-y-4"
  >
    <div class="flex items-center text-gray-425 space-x-2">
      <svg-icon name="black_email" class="h-5 w-6 mr-3" />
      <button data-test="copy-email-button" @click="copyEmailBody">
        Copy Email
      </button>
    </div>
    <div class="flex items-center text-gray-425 space-x-2">
      <svg-icon
        :name="editIsDisallowed ? 'view' : 'edit'"
        class="h-5 w-6 mr-3"
      />
      <router-link
        data-test="update-published-link-button"
        :to="{
          name: 'update-link',
          params: {
            presentationId: presentationId,
            linkId: linkId,
          },
        }"
      >
        {{ editIsDisallowed ? 'View' : 'Edit' }}
      </router-link>
    </div>
    <button
      class="flex items-center text-primary space-x-2"
      data-test="delete-published-link-button"
      @click="removeRow"
    >
      <div class="p-1 border-primary border-2 rounded-md">
        <svg-icon name="delete" class="h-5 w-6" />
      </div>
      <h1>Delete</h1>
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRfpEditIsDisallowed } from '@/utils/useRfpEditIsDisabled.js'
import { copyHtmlString } from '@/utils/strings'

export default {
  props: {
    presentationId: { type: String, required: true },
    linkId: { type: String, required: true },
  },
  setup(props) {
    const store = useStore()
    const links = computed(() => store.getters['rfps/getPublishedLinks'])

    const { editIsDisallowed } = computed(() =>
      useRfpEditIsDisallowed(props.presentationId),
    )

    const activeLink = computed(
      () => links.value?.find((link) => link.id == props.linkId) || {},
    )

    const emailBody = computed(() =>
      store.getters['setting/populatedEmailBody'](activeLink.value),
    )

    const copyEmailBody = () => {
      copyHtmlString(emailBody.value)
    }

    const removeRow = async () => {
      try {
        await store.dispatch('rfps/deletePublishLink', props.linkId)
      } catch (err) {
        console.error('delete link: ', err)
      }
    }

    return {
      copyEmailBody,
      removeRow,
      editIsDisallowed,
    }
  },
}
</script>
