<template>
  <div class="flex flex-col border-b">
    <div
      class="flex flex-col text-left border-l-2 border-blue-650 py-3 ml-8 pl-8"
    >
      <router-link
        :to="{
          name: 'update-link',
          params: {
            presentationId: link.presentationId,
            linkId: link.id,
          },
        }"
        data-test="update-link-button"
        class="flex justify-between"
      >
        <h1 class="text-lg font-bold">
          {{ link.linkName }}
        </h1>
        <div class="flex space-x-2 items-center">
          <SvgIcon class="h-5 w-5 text-primary" name="view" />

          <h1 class="text-sm text-gray-425">{{ link.viewCount }}</h1>
        </div>
      </router-link>
      <h2 class="text-sm text-gray-425 font-medium opacity-70">
        Last updated on {{ updatedOn || '...' }}
      </h2>
      <div class="flex space-x-4 pt-3">
        <dp-button
          class="px-4 bg-white text-accent-blue py-2 border-accent-blue border-2 rounded-lg"
          text="Copy Email"
          data-test="copy-email-button"
          @click="copyEmailBody"
        />
        <dp-button
          class="px-4 bg-primary border-2 border-primary rounded-lg text-white"
          data-test="present-pdf-button"
          :text="downloadingPdf ? 'Exporting ...' : 'Export PDF'"
          :disabled="downloadingPdf"
          @click="generatePdf"
        />
      </div>
    </div>
  </div>
</template>
<script>
import DpButton from '@/components/buttons/DpButton.vue'
import { formatDate } from '@/utils/formatDate'
import { copyHtmlString } from '@/utils/strings'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    DpButton,
  },
  props: { link: { type: Object, required: true } },
  setup(props) {
    const store = useStore()

    const updatedOn = computed(() =>
      props.link.updatedDate ? formatDate(props.link.updatedDate) : '',
    )

    const emailBody = computed(() =>
      store.getters['setting/populatedEmailBody'](props.link),
    )

    const copyEmailBody = () => {
      copyHtmlString(emailBody.value)
    }

    const downloadingPdf = ref(false)
    async function generatePdf() {
      downloadingPdf.value = true
      await store.dispatch('link/generatePdf', props.link)
      downloadingPdf.value = false
    }

    return {
      updatedOn,
      copyEmailBody,
      generatePdf,
      downloadingPdf,
    }
  },
}
</script>
