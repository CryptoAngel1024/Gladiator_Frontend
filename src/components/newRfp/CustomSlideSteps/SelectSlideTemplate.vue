<template>
  <div class="grid grid-cols-3 justify-center px-3 py-6">
    <div
      class="col-span-3 md:col-span-1 flex flex-col justify-between items-center"
    >
      <img
        class="h-72"
        src="@/assets/images/slides/slide-template.png"
        alt="template"
      />
      <div class="flex flex-col items-center">
        <span class="text-gray-450 text-xl">Template 1</span>
        <h1 class="text-3xxl font-JnJ space-x-6 mb-6 text-center">
          Title + Subtitle
        </h1>
      </div>

      <button
        class="py-3 px-16 text-white bg-secondary text-sm font-semibold rounded-lg"
        @click="selectSlideTemplate('CUSTOM_SLIDE_1'), customSlide1SeeFulPrev()"
      >
        See in Full Preview
      </button>
    </div>
    <div
      class="col-span-3 md:col-span-1 flex flex-col justify-between items-center"
    >
      <img
        class="h-72"
        src="@/assets/images/slides/slide-template.png"
        alt="template"
      />
      <div class="flex flex-col items-center">
        <span class="text-gray-450 text-xl">Template 2</span>
        <h1 class="text-3xxl font-JnJ space-x-6 mb-6 text-center">
          Title + Image
        </h1>
      </div>

      <button
        class="py-3 px-16 text-white bg-secondary text-sm font-semibold rounded-lg"
        @click="selectSlideTemplate('CUSTOM_SLIDE_2'), customSlide2SeeFulPrev()"
      >
        See in Full Preview
      </button>
    </div>
    <div
      class="col-span-3 md:col-span-1 flex flex-col justify-between items-center"
    >
      <img
        class="h-72"
        src="@/assets/images/slides/slide-template.png"
        alt="template"
      />
      <div class="flex flex-col items-center">
        <span class="text-gray-450 text-xl">Template 3</span>
        <h1 class="text-3xxl font-JnJ space-x-6 mb-6 text-center">
          Title + Subtext + Image
        </h1>
      </div>

      <button
        class="py-3 px-16 text-white bg-secondary text-sm font-semibold rounded-lg"
        @click="selectSlideTemplate('CUSTOM_SLIDE_3'), customSlide3SeeFulPrev()"
      >
        See in Full Preview
      </button>
    </div>
  </div>
  <div class="flex justify-end p-6">
    <dp-button
      text="Next"
      class="py-2 px-12 text-white bg-secondary text-xs font-bold"
      @click="next()"
    />
  </div>
</template>
<script>
import DpButton from '@/components/buttons/DpButton.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed } from '@vue/reactivity'
import { gaEvent } from '@/utils/GA_Event.js'
export default {
  components: { DpButton },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const presentationId = computed(() => route.params.presentationId)

    const next = () => {
      if (presentationId.value) {
        router.push({
          name: 'presentation-create-custom-slide',
          params: {
            presentationId: presentationId.value,
            step: route.params.step,
            page: route.params.subStep,
            slideStep: 2,
          },
        })
      } else {
        router.push({
          name: 'create-custom-slide',
          params: {
            slideStep: 2,
          },
        })
      }
    }

    const selectSlideTemplate = (type) => {
      store.dispatch('customSlide/selectSlideTemplate', type)
      if (presentationId.value) {
        router.push({
          name: 'presentation-create-custom-slide',
          params: {
            presentationId: presentationId.value,
            step: route.params.step,
            page: route.params.subStep,
            slideStep: 2,
          },
        })
      } else {
        router.push({
          name: 'create-custom-slide',
          params: {
            slideStep: 2,
          },
        })
      }
    }

    const customSlide1SeeFulPrev = () => {
      gaEvent({
        action: 'custom-slide1-see-in-full-preview-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-custom-slide1-see-in-full-preview-btn',
      })
    }

    const customSlide2SeeFulPrev = () => {
      gaEvent({
        action: 'custom-slide2-see-in-full-preview-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-custom-slide2-see-in-full-preview-btn',
      })
    }
    const customSlide3SeeFulPrev = () => {
      gaEvent({
        action: 'custom-slide3-see-in-full-preview-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-custom-slide3-see-in-full-preview-btn',
      })
    }
    return {
      next,
      selectSlideTemplate,
      customSlide1SeeFulPrev,
      customSlide2SeeFulPrev,
      customSlide3SeeFulPrev,
    }
  },
}
</script>
