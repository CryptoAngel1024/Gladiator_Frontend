<template>
  <section v-if="customSlide" class="flex flex-col h-full overflow-auto">
    <div class="flex flex-col h-full">
      <div class="flex flex-col flex-grow flex-shrink px-10 py-8 max-h-full">
        <h1
          v-if="customSlide.showTitle"
          class="mb-4 py-3 px-1 font-medium flex-grow-0 flex-shrink text-black text-4xl text-center"
          :class="{
            'border border-dashed border-gray-850': !customSlide.slideTitle,
          }"
          data-test="custom-slide-preview-title"
        >
          {{ customSlide.slideTitle ? customSlide.slideTitle : 'Title' }}
        </h1>

        <h2
          v-if="customSlide.showSubtitle"
          class="mb-4 py-7 px-1 font-light text-black text-4xl text-center whitespace-pre-wrap flex-grow-0 flex-shrink"
          :class="{
            'border border-dashed border-gray-850': !customSlide.subTitle,
          }"
          data-test="custom-slide-preview-subTitle"
        >
          {{ customSlide.subTitle ? customSlide.subTitle : 'Subtitle' }}
        </h2>

        <div
          v-if="customSlide.showImages && customSlide.slideInfoId"
          class="flex space-x-8 justify-between flex-grow flex-shrink fill h-50"
        >
          <div
            v-for="imageIndex in customSlide.numberOfImages"
            :key="imageIndex"
            class="flex justify-center content-center equal-width"
            :class="{
              'border border-dashed border-gray-850':
                notFoundImages[imageIndex],
            }"
          >
            <s3Image
              s3-directory="presentations/customeSlides"
              :s3-file-name="`${customSlide.initialSlideInfoId}/image${imageIndex}.png`"
              class="object-contain max-h-full"
              @image-load-error="notFoundImages[imageIndex] = true"
              @image-fetched="notFoundImages[imageIndex] = false"
            />
            <p
              v-if="notFoundImages[imageIndex]"
              class="font-light text-xl text-black text-center"
            >
              Image {{ imageIndex }}
            </p>
          </div>
        </div>
      </div>
      <slideFooter class="mx-5" :is-custom-slide="true" />
    </div>
  </section>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import slideFooter from '@/components/slides/slideFooter.vue'
import s3Image from '@/components/utils/s3/s3Image.vue'
import dynamicSlide from '@/components/slides/dynamicSlide.js'

export default {
  components: { slideFooter, s3Image },

  setup() {
    const store = useStore()
    const route = useRoute()

    const notFoundImages = ref({
      1: false,
      2: false,
      3: false,
    })

    const { slideDetail } = dynamicSlide()

    const customSlideId = computed(() => route.params.customSlideId)

    const customSlideFullData = computed(() =>
      store.getters['customSlide/customSlide'](route.params.customSlideId),
    )

    const slideDetailPerId = computed(() => ({
      ...customSlideFullData.value?.slide.slideContent,
      slideInfoId: customSlideId.value,
    }))

    const customSlide = computed(
      () => slideDetail.value || slideDetailPerId.value,
    )

    return { notFoundImages, customSlide }
  },
}
</script>

<style lang="postcss" scoped>
.equal-width {
  flex-grow: 1;
  flex-basis: 0;
}
</style>
