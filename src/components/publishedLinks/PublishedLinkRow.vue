<template>
  <tr class="">
    <td class="pr-2">
      <CustomerLogo
        :presentation-id="link.presentationId"
        class="w-28 h-16 rounded-xl border"
      />
    </td>
    <td class="px-2 text-title-jnj">
      {{ link.linkName }}
    </td>
    <td class="px-2 text-normal">
      {{ link.clientName }}
    </td>

    <td class="px-2 text-normal">
      {{ link.viewCount }}
    </td>
    <td class="px-2 text-normal">
      {{ createdDate }}
    </td>
    <td class="px-2">
      <dp-link-button
        class="bg-white text-accent-blue border-accent-blue border-2 rounded-lg py-2"
        :to="{
          name: 'present',
          params: {
            clientName: link.clientName,
            hyperLink: link.hyperLink || 'no-link-found',
          },
        }"
        target="_blank"
        text="Preview"
        data-test="preview-published-link-button"
      />
    </td>
    <td class="px-2 justify-end">
      <div class="flex items-center justify-end">
        <dp-button
          class="px-4 bg-primary border-2 border-primary rounded-lg text-white py-2 mr-3 flex-grow"
          :text="downloadingPdf ? 'Exporting ...' : 'Export PDF'"
          :disabled="downloadingPdf"
          data-test="generate-pdf-button"
          @click="generatePdf"
        />
        <div class="relative flex">
          <button
            class="p-3 h-10 bg-gray-50 rounded-lg items-center"
            data-test="display-menu-button"
            @click=";(showMenu = !showMenu), publishedLinkRowShowMenuGaLog()"
            @blur="delay(() => (showMenu = false))"
          >
            <SvgIcon class="h-5 w-1" name="moreVertical" />
          </button>
          <div class="absolute right-0 top-11 z-50">
            <LinkPublishedMenu
              v-if="showMenu"
              data-test="published-link-menu"
              :presentation-id="link.presentationId"
              :link-id="link.id"
              class="shadow-xl"
            />
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import { computed, ref } from 'vue'
import LinkPublishedMenu from '../dashboard/LinkPublishedMenu.vue'
import DpLinkButton from '../buttons/DpLinkButton.vue'
import DpButton from '@/components/buttons/DpButton.vue'
import CustomerLogo from '@/components/utils/s3/CustomerLogo.vue'
import { gaEvent } from '@/utils/GA_Event.js'
import { formatDate } from '@/utils/formatDate.js'
import { useStore } from 'vuex'

export default {
  components: { LinkPublishedMenu, DpLinkButton, CustomerLogo, DpButton },
  props: { link: { type: Object, required: true } },

  setup(props) {
    const store = useStore()
    const showMenu = ref(false)
    const delay = (func) => setTimeout(func, 1000)

    const publishedLinkRowShowMenuGaLog = () => {
      gaEvent({
        action: `showMenu-toggler-in-published-link-click`,
        event_category: 'dashboard',
        event_label: 'User-clicked-showMenu-toggler-icon-in-published-link',
      })
    }

    const createdDate = computed(() => formatDate(props.link.createdDate))

    const downloadingPdf = ref(false)

    async function generatePdf() {
      downloadingPdf.value = true
      await store.dispatch('link/generatePdf', props.link)
      downloadingPdf.value = false
    }

    return {
      showMenu,
      delay,
      publishedLinkRowShowMenuGaLog,
      createdDate,
      generatePdf,
      downloadingPdf,
    }
  },
}
</script>

<style scoped lang="postcss">
td {
  @apply py-3;
}
</style>
