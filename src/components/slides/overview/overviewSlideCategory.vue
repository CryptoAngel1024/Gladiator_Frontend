<template>
  <section v-if="showSlideCategory">
    <div class="flex">
      <img class="h-10 w-10 object-contain mr-2" :src="categoryDetail.imgSrc" />
      <header class="text-xl pt-2 whitespace-nowrap">
        {{ categoryDetail.groupTitle }}
      </header>
    </div>
    <div
      class="mt-5 border-1 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-8"
    >
      <overview-slide-item
        v-for="slide in searchedSlides"
        :key="slide.enabledIndex"
        :img-src="slideDetails(slide.slide || slide)?.fullImgSrc"
        :slide-number="slide.enabledIndex"
        :title="
          slide.overviewTitle ||
          slide.slideTitle ||
          slideDetails(slide.slide || slide)?.slideTitle
        "
        :highlight="searchedSlideIDs.includes(slide.slideNumber)"
      />
    </div>
  </section>
</template>

<script>
import overviewSlideItem from '@/components/slides/overview/overviewSlideItem.vue'
import { slideDetails } from '@/data/allSlides.js'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  components: {
    overviewSlideItem,
  },
  props: {
    categoryDetail: { type: Object, required: true },
    slides: {
      type: Array,
      required: true,
    },
    searchedSlideIDs: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute()
    const store = useStore()
    const presentationId = computed(() => route.params.presentationId)
    const hyperLink = computed(() => route.params.hyperLink)

    function enabledIndex(slideId) {
      return store.getters['rfps/enabledSlideNumber']({
        presentationId: presentationId.value,
        hyperLink: hyperLink.value,
        clientName: route.params.clientName?.replace('-', ' '),
        slideId,
      })
    }

    const visibleSlides = computed(() =>
      props.slides
        .filter((slide) => slide.pageNumber)
        .map((slide) => ({
          ...slide,
          enabledIndex: enabledIndex(
            slide.slide?.prePopulatedSlide || slide.prePopulatedSlide,
          ),
        })),
    )

    const searchedSlides = computed(() =>
      props.searchedSlideIDs.length === 0
        ? visibleSlides.value
        : visibleSlides.value.filter((slide) =>
            props.searchedSlideIDs.includes(slide.slideNumber),
          ),
    )

    const showSlideCategory = computed(() => searchedSlides.value.length > 0)

    return { slideDetails, searchedSlides, showSlideCategory, visibleSlides }
  },
}
</script>
