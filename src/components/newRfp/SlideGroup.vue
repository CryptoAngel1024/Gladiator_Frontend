<template>
  <section
    class="flex flex-col w-full print:mt-5"
    :class="
      categorySlides.length > 6 ? 'break-after-page break-before-page ' : ''
    "
  >
    <button
      type="button"
      class="flex space-x-6 justify-between px-4 border-b py-4"
      :class="isexpanded ? 'bg-gray-76' : ''"
      data-test="expand-slides-button"
      @click="isexpanded = !isexpanded"
    >
      <div class="flex space-x-6 items-center">
        <img
          :src="categoryInfo.imgSrcRed"
          class="h-10 w-10 object-contain"
          :alt="categoryInfo.groupTitle"
        />
        <h1 data-test="groupTitle">{{ categoryInfo.groupTitle }}</h1>
      </div>
      <div class="flex items-center">
        <div
          class="rounded-3xl w-10 h-10 bg-red-600 mr-4 text-white font-bold flex justify-center items-center"
        >
          {{ formattedEnabledSlidesCount }}
        </div>
        <SvgIcon
          class="w-4 h-4 mr-2"
          :name="isexpanded ? 'arrow-up' : 'arrow-down'"
        />
      </div>
    </button>
    <div v-if="isexpanded" class="flex w-full flex-wrap space-y-2 mb-2">
      <slide-selection-item
        v-for="slide in categorySlides"
        :key="slide.slideNumber"
        :slide="slide"
        :data-test="`selection-item-${slide.slideNumber || slide.pageNumber}`"
        class="w-1/3 md:w-1/4 xl:w-1/5 h-28 print:h-22 mt-auto"
      />
    </div>
  </section>
</template>

<script>
import SlideSelectionItem from './SlideSelectionItem.vue'
import useSlideCategoryInfo from '@/data/SlideCategoryInfo.js'
import { computed, ref } from 'vue'

export default {
  components: { SlideSelectionItem },
  props: {
    category: { type: String, required: true },
    categorySlides: { type: Array, required: true },
  },

  setup(props) {
    const isexpanded = ref(true)
    const { slideCategory: categoryInfo } = useSlideCategoryInfo(props.category)

    const enabledSlides = () =>
      props.categorySlides.filter((slide) => slide.isEnabled)

    const formattedEnabledSlidesCount = computed(() =>
      ('0' + enabledSlides().length).slice(-2),
    )

    return {
      categoryInfo,
      isexpanded,
      formattedEnabledSlidesCount,
    }
  },
}
</script>
