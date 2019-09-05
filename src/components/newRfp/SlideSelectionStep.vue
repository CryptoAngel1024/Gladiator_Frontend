<template>
  <div class="flex flex-col items-start py-7">
    <h1 v-if="!isOverview">Client Information</h1>
    <div
      v-if="!isOverview"
      class="flex items-center space-x-6 pb-4 w-full border-b"
    >
      <customerLogo
        class="w-24 max-h-32 min-h-20 border rounded-xl"
        :presentation-id="presentation.presentationId"
        :name="presentation.clientName"
      />
      <h1 class="text-primary text-3xl">{{ presentation.customerName }}</h1>
    </div>
    <div
      v-if="!isOverview"
      class="flex items-center w-full justify-between py-6 print:hidden"
    >
      <div class="flex items-center space-x-6 mr-2">
        <h1 class="text-primary text-2xl">Select your presentation slides</h1>
        <div class="relative flex">
          <dp-button
            type="button"
            text="Add Custom Slide"
            class="px-5 py-4 rounded-xl bg-primary text-white h-btn-builder min-h-btn-builder my-auto"
            :disabled="editIsDisallowed"
            data-test="add-custom-slide"
            @click="showMenu = !showMenu"
            @blur="delay(() => (showMenu = false))"
          />
          <div class="absolute right-0 top-16 z-50">
            <add-custom-slide-dropdown v-if="showMenu" class="shadow-xl" />
          </div>
        </div>
      </div>
      <div class="flex space-x-3">
        <dp-button
          type="button"
          text="Save As Template"
          class="px-5 py-4 rounded-xl text-white bg-secondary h-btn-builder min-h-btn-builder my-auto"
          :disabled="editIsDisallowed"
          @click="toggleSaveTemplateModal()"
        />
        <div class="relative inline-flex">
          <svg
            class="w-2 h-2 absolute top-0 right-0 mx-4 mt-6 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 412 232"
          >
            <path
              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
              fill="#648299"
              fill-rule="nonzero"
            />
          </svg>

          <select
            v-model="selectedTemplateIndex"
            class="border border-gray-300 rounded-md text-gray-600 py-4 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none w-64"
            :disabled="editIsDisallowed"
            @change="useTemplate"
          >
            <option disabled :value="null">Select template</option>
            <option
              v-for="template in templateData"
              :key="template.templateId"
              :value="template.templateId"
              :data-test="`select-template-${template.templateId}`"
            >
              {{ template.templateName }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="w-full">
      <slide-group
        v-for="category in categories"
        :key="`${category}_${selectedTemplateIndex}`"
        :category-slides="slidesByCategory[category]"
        :category="category"
      />
    </div>
  </div>

  <save-template v-if="saveTemplateModal" @hide="toggleSaveTemplateModal" />
</template>
<script>
import { ref } from '@vue/reactivity'
import SaveTemplate from './SaveTemplate.vue'
import DpButton from '@/components/buttons/DpButton.vue'
import SlideGroup from './SlideGroup.vue'
import AddCustomSlideDropdown from './AddCustomSlideDropdown.vue'
import { useStore } from 'vuex'
import { onMounted, computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { groupSlides } from '@/data/allSlides.js'
import customerLogo from '@/components/utils/s3/CustomerLogo.vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    SaveTemplate,
    DpButton,
    SlideGroup,
    AddCustomSlideDropdown,
    customerLogo,
  },

  setup() {
    const store = useStore()
    const route = useRoute()
    onMounted(async () => {
      try {
        await store.dispatch('templates/fetchTemplates', { page: 0, limit: 21 })
      } catch (err) {
        console.error('fetchTemplates: ', err)
      }
    })
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    const templateData = computed(() => store.getters['templates/allTemplates'])
    const editIsDisallowed = useRfpEditIsDisabled()

    const presentation = computed(() =>
      store.getters['rfps/getPresentationById'](route.params.presentationId),
    )
    const slides = computed(() => presentation.value?.slides || [])

    const selectedTemplateIndex = ref(null)
    const useTemplate = () => {
      const templateSlides = templateData.value.find(
        (template) => template.templateId == selectedTemplateIndex.value,
      )
      store.commit('rfps/setPresentationSlide', {
        presentationId: route.params.presentationId,
        templateSlides: templateSlides.slides,
      })
    }

    const slidesByCategory = computed(() => groupSlides(slides.value))

    let categories = computed(() => Object.keys(slidesByCategory.value))

    const saveTemplateModal = ref(false)
    const toggleSaveTemplateModal = () => {
      saveTemplateModal.value = !saveTemplateModal.value
    }

    const showMenu = ref(false)

    const delay = (func) => setTimeout(func, 500)

    onMounted(async () => {
      await store.dispatch('customSlide/fetchCustomSlidesByOwnerId')
    })

    return {
      templateData,
      saveTemplateModal,
      selectedTemplateIndex,
      showMenu,
      slidesByCategory,
      categories,
      toggleSaveTemplateModal,
      delay,
      useTemplate,
      presentation,
      isOverview,
      editIsDisallowed,
    }
  },
}
</script>
