<template>
  <section
    id="slide_overview"
    class="border-8 modal-bg overflow-y-auto h-screen"
  >
    <div class="container mx-auto relative pl-5 pr-5 pb-20">
      <div class="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-0">
        <div class="mt-4 relative inline-flex wm-280">
          <button
            class="rounded-xl bg-gray-450 h-10 w-10 flex items-center justify-center absolute -top-4 right-0 m-4 hover:border-gray-500"
            @click="slideSearchGaLog"
          >
            <SvgIcon class="w-6 h-6" name="slideSearch" />
          </button>
          <input
            v-model="searchString"
            type="search"
            placeholder="Search for slides"
            class="border text-black border-gray-300 placeholder-black rounded-xl h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
          />
        </div>
        <button
          class="h-10 w-20 flex items-center justify-center absolute right-4 m-4"
          @click="gotoExist(), slideCloseGaLog()"
        >
          close
          <SvgIcon class="w-6 h-6 ml-1" name="closeBorder" />
        </button>
      </div>
      <ApiState
        v-if="!slidesAreFetched && (loading || errorMessage)"
        :loading="loading"
        :error-message="errorMessage"
        data-type="presentation"
        class="m-auto"
      />
      <overviewSlideCategory
        v-for="category in Object.keys(slidesByCategory)"
        :key="category"
        :category-detail="slideCategories[category]"
        :slides="slidesByCategory[category]"
        :searched-slide-i-ds="searchedSlideIDs"
        class="mt-16"
      />
    </div>
  </section>
</template>

<script>
import overviewSlideCategory from '@/components/slides/overview/overviewSlideCategory.vue'
import useSlideCategoryInfo from '@/data/SlideCategoryInfo.js'
import ApiState from '@/components/utils/apiState.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from '@vue/runtime-core'
import { groupSlides } from '@/data/allSlides.js'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: { overviewSlideCategory, ApiState },

  setup() {
    const store = useStore()
    const route = useRoute()

    const errorMessage = ref('')
    const loading = ref(false)

    const { slideCategories } = useSlideCategoryInfo()

    onMounted(async () => {
      errorMessage.value = ''
      loading.value = true

      const { err } = route.params.hyperLink
        ? await store.dispatch('rfps/getLinkByHyperLink', {
            clientName: route.params.clientName?.replace('-', ' '),
            hyperLink: route.params.hyperLink,
          })
        : await store.dispatch('rfps/getMyRfpbyId', route.params.presentationId)

      errorMessage.value = err
        ? `Loading Failed: ${
            err.message ||
            err.response?.statusText ||
            err.statusText ||
            err.status ||
            err
          }`
        : ''

      loading.value = false
    })

    const displayedSlides = computed(() =>
      store.getters['rfps/getDisplayedSlidesByPresentationId']({
        presentationId: route.params.presentationId,
        hyperLink: route.params.hyperLink,
        clientName: route.params.clientName?.replace('-', ' '),
      }),
    )
    const slidesAreFetched = computed(() => displayedSlides.value?.length)

    const slidesByCategory = computed(() =>
      displayedSlides.value ? groupSlides(displayedSlides.value) : {},
    )

    const searchString = ref('')
    const searchedSlideIDs = computed(() => {
      const query = searchString.value.toUpperCase()

      const searchedSlides = displayedSlides.value.filter(
        (slide) =>
          query &&
          (slide.slideTitle?.toUpperCase().includes(query) ||
            slide.overviewTitle?.toUpperCase().includes(query) ||
            slide.slideCategory.toUpperCase().includes(query)),
      )
      return searchedSlides.map((slide) => slide.slideNumber)
    })

    const slideSearchGaLog = () => {
      gaEvent({
        action: 'slide-search-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-slide-search-btn',
      })
    }
    const slideCloseGaLog = () => {
      gaEvent({
        action: 'slide-close-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-slide-close-btn',
      })
    }
    return {
      searchString,
      slidesByCategory,
      slideCategories,
      searchedSlideIDs,
      slideSearchGaLog,
      slideCloseGaLog,
      slidesAreFetched,
      loading,
      errorMessage,
    }
  },

  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.navigateToSlide()
      }
    })
  },
  unmounted() {
    document.removeEventListener('keydown', this.navigateToSlide())
  },
  methods: {
    gotoExist() {
      this.navigateToSlide()
    },
    navigateToSlide() {
      this.$router.push(
        this.$route.params.presentationId
          ? {
              name: 'slide',
              hash: `#/${this.$route.params.slideId}`,
              params: {
                presentationId: this.$route.params.presentationId,
              },
            }
          : {
              name: 'present',
              hash: `#/${this.$route.params.slideId}`,
              params: {
                hyperLink: this.$route.params.hyperLink,
                clientName: this.$route.params.clientName?.replace('-', ' '),
              },
            },
      )
      this.$router.go()
    },
  },
}
</script>

<style lang="postcss">
.wm-280 {
  max-width: 280px;
  width: 280px;
}
.modal-bg {
  background: #3b3c46;
}
.modal-bg * {
  color: #fff;
}
.modal-bg .text-black {
  color: #000 !important;
}
.border-accent-yellow {
  @apply border-amber-500;
}
</style>
