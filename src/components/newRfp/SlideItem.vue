<template>
  <div
    v-if="!showStarredSlides || slide.isStarred"
    class="flex flex-col space-y-3 rounded-md min-w-28"
  >
    <div class="flex w-full relative min-h-14 slide-img-aspect-ratio">
      <img
        class="w-80 border rounded-md"
        :src="slideDetail.fullImgSrc"
        alt="slide screenshot"
      />
      <div
        v-if="!slide.isEnabled"
        :data-test="`isEnabled-${slideDetail.slideNumber}`"
        class="flex items-center justify-center bg-gray-500 absolute top-0 h-full w-full bg-opacity-50 rounded-md"
      >
        <SvgIcon name="eyeOff" class="h-11 w-11" />
      </div>
      <button
        v-else
        type="button"
        class="absolute top-1 right-1 border border-gray-350 p-1 rounded-lg bg-white"
        @click="toggleStarred"
      >
        <SvgIcon
          :name="slide.isStarred == true ? 'yellowStar' : 'grayStar'"
          class="h-4 w-4"
        />
      </button>
    </div>

    <div class="flex justify-between w-full">
      <div class="flex flex-col items-start">
        <h6>{{ slideDetail.slideTitle }}</h6>
        <h1>{{ slideDetail.subTitle }}</h1>
      </div>
      <button
        v-if="!editIsDisallowed"
        :data-test="`toggleSlide-${slideDetail.slideNumber}`"
        @click="toggleEnabled"
      >
        <SvgIcon name="view" class="h-5 w-5 text-gray-425" />
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { slideDetails } from '@/data/allSlides.js'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  props: {
    slide: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute()
    const store = useStore()
    const presentationId = computed(() => route.params.presentationId)
    const linkId = computed(() => route.params.linkId)

    const toggleEnabled = () => {
      store.commit(
        linkId.value
          ? 'link/toggleSlideSelection'
          : 'rfps/toggleSlideSelection',
        {
          slideId: props.slide.slideInfoId,
          linkId: linkId.value,
          presentationId: presentationId.value,
        },
      )
    }

    const toggleStarred = () => {
      store.commit(
        linkId.value ? 'link/toggleSlideStarred' : 'rfps/toggleSlideStarred',
        {
          slideId: props.slide.slideInfoId,
          linkId: linkId.value,
          presentationId: presentationId.value,
        },
      )
    }

    const slideDetail = computed(
      () => slideDetails(props.slide.slide || props.slide) || {},
    )
    const editIsDisallowed = useRfpEditIsDisabled()

    const showStarredSlides = computed(
      () =>
        route.name === 'create-link-starred' ||
        route.name === 'update-link-starred',
    )

    return {
      toggleEnabled,
      slideDetail,
      editIsDisallowed,
      toggleStarred,
      showStarredSlides,
    }
  },
}
</script>

<style scoped>
.slide-img-aspect-ratio {
  aspect-ratio: 1200/720;
}
</style>
