<template>
  <div class="flex flex-col items-start p-7 w-full">
    <div class="flex items-center w-full justify-between py-6 border-b">
      <h1
        class="text-primary text-2xl text-center mr-2"
        data-test="presentation-title"
      >
        Select your presentation slides
      </h1>

      <dp-button
        text="Save As Template"
        class="px-5 py-4 rounded-xl text-white bg-secondary h-btn-builder min-h-btn-builder my-auto"
        data-test="save-template-button"
        @click="toggleSaveTemplateModal(), saveAsTempGaLog()"
      />
    </div>
    <slide-group
      v-for="category in Object.keys(slidesByCategory)"
      :key="category"
      :category-slides="slidesByCategory[category]"
      :category="category"
    />
  </div>
  <custom-slide-step
    v-if="customSlideModal"
    :type="selectedOption"
    @hide="toggleCustomSlideModal"
  />
  <save-template v-if="saveTemplateModal" @hide="toggleSaveTemplateModal" />
</template>
<script>
import { ref, computed } from '@vue/reactivity'

import SaveTemplate from '@/components/newRfp/SaveTemplate.vue'
import CustomSlideStep from '@/components/newRfp/CustomSlideStep.vue'
import DpButton from '@/components/buttons/DpButton.vue'
import SlideGroup from '@/components/newRfp/SlideGroup.vue'
import { groupSlides } from '@/data/allSlides.js'
import { useStore } from 'vuex'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: {
    SaveTemplate,
    CustomSlideStep,
    DpButton,
    SlideGroup,
  },

  setup() {
    const saveTemplateModal = ref(false)
    const store = useStore()
    store.dispatch('templates/initialSlide')
    const slides = computed(
      () => store.getters['templates/getNewTemplateSlides'],
    )
    const slidesByCategory = ref(groupSlides(slides.value))

    const toggleSaveTemplateModal = () => {
      saveTemplateModal.value = !saveTemplateModal.value
    }

    const saveAsTempGaLog = () => {
      gaEvent({
        action: 'save-as-template-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-save-as-template-btn',
      })
    }
    return {
      saveTemplateModal,
      toggleSaveTemplateModal,
      slidesByCategory,
      saveAsTempGaLog,
    }
  },
  data() {
    return {
      showMenu: false,
      customSlideModal: false,
      selectedOption: '',
    }
  },

  methods: {
    toggleCustomSlideModal(option) {
      this.selectedOption = option
      this.showMenu = false
      this.customSlideModal = !this.customSlideModal
    },
  },
}
</script>
