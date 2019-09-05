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
    <td class="py-4">
      <div class="flex items-center">
        <SvgIcon class="h-6 w-8" name="templateplay" />
        <div class="font-bold text-gray-500 ml-1">
          {{ templateData.numberOfSlides }}
        </div>
      </div>
    </td>
    <td class="py-4">
      <div class="flex justify-end">
        <dp-link-button
          class="mx-8 px-8 bg-white text-accent-blue border-accent-blue border-2 rounded-lg py-2"
          :to="{
            name: 'templates-edit',
            params: {
              templateID: templateData.templateId,
            },
          }"
          text="Edit"
          :data-test="`edit-template-${templateData.templateId}`"
        />
        <div class="relative">
          <div class="relative flex">
            <button
              data-test="dropdown-button"
              class="p-3 h-10 bg-gray-50 rounded-lg items-center"
              @click="dropdown(), templateMyRowDropGalog()"
              @blur="delay(() => (showMenu = false))"
            >
              <SvgIcon class="h-5 w-1" name="moreVertical" />
            </button>
          </div>

          <div
            v-if="showMenu"
            data-test="dropdown-options"
            class="absolute right-0 top-11 z-50 shadow-xl bg-white borde-2 rounded-xl"
          >
            <div class="flex flex-col py-6 px-5 w-48 space-y-4">
              <button
                data-test="bookmark"
                class="flex items-center text-gray-425 space-x-2"
                @click="changebookmarkstate"
              >
                <svg-icon
                  class="h-5 w-6"
                  :name="templateData.bookmarked ? 'favorite' : 'star'"
                />

                <h1>Add to Favorite</h1>
              </button>
              <button
                data-test="share-with-modal-btn"
                class="flex items-center text-gray-425 space-x-2"
                @click="shareWithModal(), shareWithModalGaLog()"
              >
                <svg-icon name="share" class="h-5 w-6" />
                <h1>Share</h1>
              </button>
              <button
                data-test="shared-with-modal-btn"
                class="flex items-center text-gray-425 space-x-2"
                @click="
                  showHideSharedWithModal(), showHideSharedWithModalGaLog()
                "
              >
                <svg-icon name="shared" class="h-5 w-6" />
                <h1>Shared with</h1>
              </button>
              <button
                class="flex items-center text-primary space-x-2"
                data-test="template-remove"
                @click="removeRow"
              >
                <div class="p-1 border-primary border-2 rounded-md">
                  <svg-icon name="delete" class="h-5 w-6" />
                </div>
                <h1>Delete</h1>
              </button>
            </div>
          </div>
          <shared-with-modal
            v-if="showSharedWithModal"
            :template-id="templateData.templateId"
            data-test="shared-with-modal"
            @hide="showHideSharedWithModal"
          />
          <share-with-modal
            v-if="shareWithFlag"
            :rfp="templateData"
            :store-name="shareWithStore"
            data-test="share-with-modal"
            @hide="shareWithModal"
          />
        </div>
      </div>
    </td>
  </tr>
</template>
<script>
import { mapMutations, useStore } from 'vuex'
import { ref } from 'vue'
import ShareWithModal from '@/components/share/ShareWithModal.vue'
import DpLinkButton from '@/components/buttons/DpLinkButton.vue'
import SharedWithModal from '@/components/templates/templatesItems/SharedWithModal.vue'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: {
    SharedWithModal,
    ShareWithModal,
    DpLinkButton,
  },
  props: {
    templateData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const showMenu = ref(false)
    const shareWithFlag = ref(false)
    const showSharedWithModal = ref(false)

    const shareWithStore = ref('templates/sharedWithAction')
    const showHideSharedWithModal = () => {
      showSharedWithModal.value = !showSharedWithModal.value
      showMenu.value = false
    }
    const shareWithModal = () => {
      shareWithFlag.value = !shareWithFlag.value
      showMenu.value = false
    }
    const removeRow = async () => {
      try {
        await store.dispatch(
          'templates/delTemplate',
          props.templateData.templateId,
        )
      } catch (err) {
        console.error(err)
      }
    }
    const dropdown = () => {
      showMenu.value = !showMenu.value
      showSharedWithModal.value = false
      shareWithFlag.value = false
    }
    const delay = (func) => setTimeout(func, 1000)

    const templateMyRowDropGalog = () => {
      gaEvent({
        action: 'template-myRow-dropdown-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-template-myRow-dropdown-btn',
      })
    }

    const shareWithModalGaLog = () => {
      gaEvent({
        action: 'share-with-modal-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-share-with-modal-btn',
      })
    }
    const showHideSharedWithModalGaLog = () => {
      gaEvent('show-hide-shared-with-modal-click', {
        event_category: 'dashboard',
        event_label: 'User-clicked-show-hide-shared-with-modal-btn',
      })
    }

    return {
      showMenu,
      delay,
      showSharedWithModal,
      shareWithFlag,
      showHideSharedWithModal,
      shareWithModal,
      dropdown,
      shareWithStore,
      removeRow,
      templateMyRowDropGalog,
      shareWithModalGaLog,
      showHideSharedWithModalGaLog,
    }
  },
  methods: {
    ...mapMutations({
      setBookmarked: 'templates/setBookmarked',
      sharedTemplate: 'templates/sharedTemplate',
    }),
    async changebookmarkstate() {
      try {
        this.setBookmarked(this.templateData.templateId)
        const updatedTemplate = {
          bookmarked: this.templateData.bookmarked,
          slideInfos: this.templateData.slides,
          templateDescription: this.templateData.templateDescription,
          templateId: this.templateData.templateId,
          templateName: this.templateData.templateName,
        }
        await this.$store.dispatch('templates/updateTemplate', updatedTemplate)
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
