<template>
  <div class="px-9">
    <ul id="custom-slide-list">
      <li
        v-for="slide in customSlides"
        :key="slide.slideInfoId"
        class="inline-block md:flex items-center justify-between border-b-2 border-gray-75 py-3"
      >
        <div class="flex items-center">
          <s3ImageWithPlaceholder
            v-if="slide.slideInfoId"
            s3-directory="presentations/customeSlides"
            :s3-file-name="`${slide.slideInfoId}/image1.png`"
            class="w-28 h-16 rounded-xl border"
            img-class="object-contain"
            :data-test="`custom-slides-s3-image-${slide.slideInfoId}`"
          />
          <div
            v-else
            class="w-36 h-20 border border-dashed border-gray-850 rounded-lg"
          />
          <span class="font-Arial font-bold text-lg text-black ml-7">{{
            slide.slide.slideContent.slideTitle
          }}</span>
        </div>
        <div id="button-group" class="flex items-center mt-3 md:mt-0">
          <dp-outline-button
            class="text-base text-secondary border-secondary py-2 mx-3"
            text="See preview"
            @click="selectCustomSlide(slide, { step: 1 })"
          />
          <dp-outline-button
            class="text-base text-accent-blue border-accent-blue py-2 px-8 mx-3"
            text="Select"
            @click="selectCustomSlide(slide, { step: 2 })"
          />
        </div>
      </li>
    </ul>
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
import DpOutlineButton from '@/components/buttons/DpOutlineButton.vue'
import DpButton from '@/components/buttons/DpButton.vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import s3ImageWithPlaceholder from '@/components/utils/s3/s3ImageWithPlaceholder.vue'

export default {
  components: { DpOutlineButton, DpButton, s3ImageWithPlaceholder },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const presentationId = computed(() => route.params.presentationId)

    onMounted(async () => {
      await store.dispatch('customSlide/fetchCustomSlidesByOwnerId')
    })

    const customSlides = computed(
      () => store.getters['customSlide/allCustomSlides'],
    )

    const selectCustomSlide = (selectedSlide, { step }) => {
      const customSlide = {
        slideId: selectedSlide.slide.slideId,
        slideTitle: selectedSlide.slide.slideContent.slideTitle,
        slideCategory: selectedSlide.slideCategory,
        subTitle: selectedSlide.slide.slideContent.subTitle,
        customSlideType: selectedSlide.slide.customSlideType,
        pageNumber: selectedSlide.pageNumber,
        version: selectedSlide.slide.version,
        slideInfoId: selectedSlide.slideInfoId,
      }
      store.dispatch('customSlide/setCustomSlide', customSlide)
      router.push({
        name:
          step === 1
            ? 'presentation-update-custom-slide'
            : 'presentation-create-custom-slide',
        params: {
          presentationId: presentationId.value,
          step: route.params.step,
          page: route.params.subStep,
          selectionType: step === 2 ? 'existing' : undefined,
          customSlideId: selectedSlide.slideInfoId,
          slideStep: step,
        },
      })
    }

    const next = () => {
      const customSlide = {
        slideId: customSlides.value[0].slide.slideId,
        slideTitle: JSON.parse(customSlides.value[0].slide.slideContent)
          .slideTitle,
        slideCategory: customSlides.value[0].slideCategory,
        subTitle: JSON.parse(customSlides.value[0].slide.slideContent).subTitle,
        customSlideType: customSlides.value[0].slide.customSlideType,
        pageNumber: customSlides.value[0].pageNumber,
        version: customSlides.value[0].slide.version,
      }
      store.dispatch('customSlide/setCustomSlide', customSlide)
      router.push({
        name: 'presentation-update-custom-slide',
        params: {
          presentationId: presentationId.value,
          step: route.params.step,
          customSlideId: customSlides.value[0].slideInfoId,
          slideStep: 2,
        },
      })
    }

    return { selectCustomSlide, next, customSlides }
  },
}
</script>
