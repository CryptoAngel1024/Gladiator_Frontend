<template>
  <section>
    <h5 class="font-bold font-Arial text-lg text-primary">
      {{ categoryInfo.groupTitle }}
    </h5>
    <draggable
      v-if="droppedSlide"
      v-model="slides"
      class="mt-3 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-x-8"
      group="slides"
      @change="handlePositionChange"
    >
      <div
        v-for="slide in slides"
        :key="slide.slideInfoId || slide.slideCode"
        class="font-bold font-Arial text-base text-gray-850 border-t border-gray-100 px-7 py-4"
        :class="
          (slideInfoId && slideInfoId === slide.slideInfoId) ||
          (slide.slide || slide)?.slideContent?.customSlideType
            ? 'bg-gradient-to-r from-primary-grad-from-light to-primary-grad-to-light border border-accent-purple cursor-pointer'
            : ''
        "
        :data-test="`slide-by-title-${
          (slide.slide || slide)?.slideContent?.slideTitle
        }`"
      >
        {{
          slide.slideTitle ||
          slide.subTitle ||
          (slide.slide || slide)?.slideContent?.slideTitle ||
          (slide.slide || slide)?.slideContent?.subTitle ||
          'Custom Slide'
        }}
      </div>
    </draggable>
  </section>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
import { useStore } from 'vuex'
import useSlideCategoryInfo from '@/data/SlideCategoryInfo'
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

export default {
  components: {
    draggable: VueDraggableNext,
  },
  props: {
    category: { type: String, required: true },
    categorySlides: { type: Array, required: true },
  },

  setup(props) {
    const store = useStore()
    const route = useRoute()
    const slideInfoId = computed(() => route.params.customSlideId)
    const presentationId = computed(() => route.params.presentationId)
    const droppedSlide = computed(() =>
      store.getters['customSlide/customSlide'](slideInfoId.value),
    )
    const slides = computed({
      get() {
        return props.categorySlides
      },
      set() {},
    })

    const presentation = computed(() =>
      presentationId.value
        ? store.getters['rfps/getPresentationById'](presentationId.value)
        : undefined,
    )

    const { slideCategory: categoryInfo } = useSlideCategoryInfo(props.category)

    const handlePositionChange = (event) => {
      const action = Object.keys(event)[0]
      const elementIndex = event.removed
        ? event.removed.oldIndex
        : event[action].newIndex

      const payload = {
        slideCategory: props.category,
        pageNumber: elementIndex + 1,
        slideInfoId: slideInfoId.value,
        slides: presentation.value?.slides || undefined,
        action,
      }

      store.dispatch('customSlide/updateCustomSlidePosition', payload)
    }

    return {
      droppedSlide,
      handlePositionChange,
      categoryInfo,
      slides,
      slideInfoId,
    }
  },
}
</script>
