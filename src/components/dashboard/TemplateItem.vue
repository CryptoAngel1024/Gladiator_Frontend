<template>
  <div class="flex space-x-7 py-4 mx-9" data-test="template-item">
    <div class="flex-col flex-grow space-y-3">
      <h1 class="text-lg font-bold" data-test="template-name">
        {{ template.templateName }}
      </h1>
      <div class="flex space-x-2 items-center">
        <SvgIcon class="h-5 w-5 text-gray-450" name="presentation" />
        <h1
          class="text-lg font-bold text-gray-450"
          data-test="number-of-slides"
        >
          {{ template.numberOfSlides }}
        </h1>
      </div>
    </div>
    <div class="flex items-center space-x-4">
      <button
        :data-test="`change-bookmark-state-button-${template.templateId}`"
        @click="changeFavorite(), templateBdStarGALog()"
      >
        <SvgIcon
          class="h-8 w-9"
          :name="template.bookmarked ? 'favorite' : 'star'"
        />
      </button>

      <router-link
        :to="{
          name: 'new-presentation-template',
          params: {
            templateId: template.templateId,
          },
        }"
        :data-test="`new-presentation-template-button-${template.templateId}`"
      >
        <dp-button
          class="bg-white text-accent-blue py-2 border-accent-blue border-2 rounded-lg"
          text="Start Presentation"
        />
      </router-link>
      <div class="relative">
        <div class="relative flex">
          <button
            class="p-3 h-10 bg-gray-50 rounded-lg items-center"
            :data-test="`template-dropdown-button-${template.templateId}`"
            @click="dropdown(), templateItemDropdownGalog()"
            @blur="delay(() => (showMenu = false))"
          >
            <SvgIcon class="h-5 w-1" name="moreVertical" />
          </button>
        </div>

        <div
          v-if="showMenu"
          data-test="template-dropdown-options"
          class="absolute right-0 top-11 z-50 shadow-xl bg-white borde-2 rounded-xl"
        >
          <div class="flex flex-col py-6 px-5 w-48 space-y-4">
            <button
              data-test="template-share-button"
              class="flex items-center text-gray-425 space-x-2"
              @click="shareModal(), templateItemShareGalog()"
            >
              <svg-icon name="share" class="h-5 w-6" />
              <h1>Share</h1>
            </button>
            <button
              data-test="template-shared-with-button"
              class="flex items-center text-gray-425 space-x-2"
              @click="shareWithModal(), templateItemShareWithGalog()"
            >
              <svg-icon name="shared" class="h-5 w-6" />
              <h1>Shared with</h1>
            </button>
            <button
              data-test="remove-template-button"
              class="flex items-center text-primary space-x-2"
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
          v-if="sharedWithModalFlag"
          data-test="template-shared-with-modal"
          :template-id="template.templateId"
          @hide="shareWithModal"
        />
        <share-with-modal
          v-if="shareWithFlag"
          data-test="template-share-with-modal"
          :rfp="template"
          :store-name="shareWithStore"
          @hide="shareModal"
        />
      </div>
    </div>
  </div>
</template>
<script>
import DpButton from '@/components/buttons/DpButton.vue'
import { useStore } from 'vuex'
import ShareWithModal from '@/components/share/ShareWithModal.vue'
import SharedWithModal from '@/components/templates/templatesItems/SharedWithModal.vue'
import { ref } from 'vue'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: {
    DpButton,
    ShareWithModal,
    SharedWithModal,
  },
  props: {
    template: { type: Object, required: true },
  },
  setup(props) {
    const store = useStore()
    const showMenu = ref(false)
    const shareWithFlag = ref(false)
    const sharedWithModalFlag = ref(false)

    const shareWithStore = ref('templates/sharedWithAction')
    const shareModal = () => {
      shareWithFlag.value = !shareWithFlag.value
      showMenu.value = false
    }
    const shareWithModal = () => {
      sharedWithModalFlag.value = !sharedWithModalFlag.value
      showMenu.value = false
    }
    const dropdown = () => {
      showMenu.value = !showMenu.value
      sharedWithModalFlag.value = false
      shareWithFlag.value = false
    }
    const delay = (func) => setTimeout(func, 1000)

    const templateItemDropdownGalog = () => {
      gaEvent({
        action: 'template-in-dashboard-dropdown-icon-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-template-in-dashboard-dropdown-icon',
      })
    }

    const templateItemShareGalog = () => {
      gaEvent({
        action: 'template-in-dashboard-share-icon-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-template-in-dashboard-share-icon',
      })
    }

    const templateItemShareWithGalog = () => {
      gaEvent({
        action: 'template-in-dashboard-sharedWith-icon-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-template-in-dashboard-sharedWith-icon',
      })
    }
    const templateBdStarGALog = () => {
      gaEvent({
        action: 'template-in-dashboard-star-icon-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-template-in-dashboard-star-icon',
      })
    }

    const removeRow = async () => {
      try {
        await store.dispatch('templates/delTemplate', props.template.templateId)
      } catch (err) {
        console.error(err)
      }
    }

    const changeFavorite = async () => {
      try {
        await store.dispatch(
          'templates/changeBookmarkState',
          props.template.templateId,
        )
      } catch (err) {
        console.error(err)
      }
    }

    return {
      showMenu,
      delay,
      sharedWithModalFlag,
      shareWithFlag,
      shareModal,
      shareWithModal,
      dropdown,
      shareWithStore,
      templateItemDropdownGalog,
      templateItemShareGalog,
      templateItemShareWithGalog,
      templateBdStarGALog,
      removeRow,
      changeFavorite,
    }
  },
}
</script>
