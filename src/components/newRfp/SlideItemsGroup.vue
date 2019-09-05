<template>
  <div class="flex flex-col w-full space-y-4 mt-4">
    <div class="flex space-x-6 items-center">
      <img :src="categoryInfo.imgSrcRed" class="h-10 w-10 object-contain" />
      <h1 data-test="groupTitle">{{ categoryInfo.groupTitle }}</h1>
    </div>
    <div class="flex flex-wrap">
      <slide-item
        v-for="slide in categorySlides"
        :key="slide.slideInfoId"
        :slide="slide"
        class="w-1/3 md:w-1/4 xl:w-1/5 pr-3 pb-3"
        :data-test="`selection-item-${slide.slideNumber || slide.pageNumber}`"
      />
    </div>
  </div>
</template>

<script>
import SlideItem from './SlideItem.vue'
import useSlideCategoryInfo from '@/data/SlideCategoryInfo.js'

export default {
  components: { SlideItem },
  props: {
    category: { type: String, required: true },
    categorySlides: { type: Array, required: true },
  },

  setup(props) {
    const { slideCategory: categoryInfo } = useSlideCategoryInfo(props.category)

    return {
      categoryInfo,
    }
  },
}
</script>
