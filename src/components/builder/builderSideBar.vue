<template>
  <div class="sticky top-5 z-10">
    <div
      class="relative px-3 py-3 overflow-y-auto bg-white builder__sidebar rounded-2xl"
    >
      <div
        class="flex items-center justify-between pb-2 text-left border-b builder__sidebar__header"
      >
        <div>
          <h3
            data-test="bulder-side-bar-information"
            class="text-base font-medium text-emerald-900"
          >
            Information
          </h3>
          <!-- todo: show slide number -->
          <!-- <span class="text-sm text-gray-500">Slide 1 : Introduction</span> -->
        </div>
        <div class="flex">
          <SvgIcon
            class="w-4 h-4 mr-2"
            name="arrow-up"
            data-test="svgIcon-test-arrow-up"
          />
          <SvgIcon
            class="w-4 h-4"
            name="arrow-down"
            data-test="svgIcon-test-arrow-down"
          />
        </div>
      </div>
      <div class="relative">
        <div
          v-if="userMessage"
          class="px-2 py-1 absolute w-full bg-gray-75 font-extrabold"
          data-test="user-message"
        >
          {{ userMessage }}
        </div>
        <ApiState
          v-if="!isLoaded || !slideIdIsFound"
          class="px-2 py-3 bg-white rounded-2xl font-Arial min-h-161px"
          :loading="!isLoaded"
          data-type="presentation"
        />
        <component
          :is="builder"
          v-else
          :slide-dynamic-data="slideContent"
          @update-slide-dynamic-data="updateSlideDynamicData"
        />
      </div>
      <error-banner
        v-if="versionError"
        class="flex my-1"
        :message="versionError"
      />
    </div>
  </div>
</template>

<script>
import industryFieldBuilder from '@/components/builder/sidebars/industryFieldBuilder.vue'
import introSlideBuilder from '@/components/builder/sidebars/introSlideBuilder.vue'
import surgeonPlanBuilder from '@/components/builder/sidebars/surgeonPlanBuilder.vue'
import sav10Builder from '@/components/builder/sidebars/sav10SlideBuilder.vue'
import sav12Builder from '@/components/builder/sidebars/sav12SlideBuilder.vue'
import sav21Builder from '@/components/builder/sidebars/sav21SlideBuilder.vue'
import sav22Builder from '@/components/builder/sidebars/sav22SlideBuilder.vue'
import sav23Builder from '@/components/builder/sidebars/sav23SlideBuilder.vue'

import sav25Builder from '@/components/builder/sidebars/sav25SlideBuilder.vue'
import sav26Builder from '@/components/builder/sidebars/sav26SlideBuilder.vue'
import sav27Builder from '@/components/builder/sidebars/sav27SlideBuilder.vue'
import sav28Builder from '@/components/builder/sidebars/sav28SlideBuilder.vue'
import asc5builder from '@/components/builder/sidebars/asc5Builder.vue'

import savingsSummaryBuilder from '@/components/builder/sidebars/savingsSummaryBuilder.vue'
import trainingPlanBuilder from '@/components/builder/sidebars/trainingPlanBuilder.vue'
import sav2Builder from '@/components/builder/sidebars/sav2SlideBuilder.vue'

import ErrorBanner from '@/components/utils/ErrorBanner.vue'
import ApiState from '@/components/utils/apiState.vue'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import versionedApiUpdate from '@/utils/versionedApiUpdate.js'

const builders = {
  INTRO1: introSlideBuilder,
  CS1: industryFieldBuilder,
  SRG2: surgeonPlanBuilder,
  SAV24: savingsSummaryBuilder,
  SAV10: sav10Builder,
  SAV12: sav12Builder,
  SAV23: sav23Builder,
  EDU3: trainingPlanBuilder,
  SAV2: sav2Builder,
  SAV21: sav21Builder,
  SAV22: sav22Builder,
  SAV25: sav25Builder,
  SAV26: sav26Builder,
  SAV27: sav27Builder,
  SAV28: sav28Builder,
  ASC_5: asc5builder,
}

export default {
  components: {
    ApiState,
    ErrorBanner,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const presentationId = computed(() => route.params.presentationId)

    const dynamicSldes = computed(() =>
      store.getters['rfps/enabledDynamicSlidesByPresentationId'](
        presentationId.value,
      ),
    )

    const slideId = computed(
      () =>
        route.params.slideId || dynamicSldes.value[0]?.slide.prePopulatedSlide,
    )

    const isLoaded = computed(() => store.getters['rfps/myRfps'].length > 0)

    const slideContent = computed(() =>
      store.getters['rfps/getslideContentBySlideId']({
        presentationId: presentationId.value,
        prePopulatedSlide: slideId.value,
      }),
    )

    function updateDraftLocal(newSlideDynamicData) {
      store.dispatch('rfps/updateDraftLocal', {
        content: JSON.stringify(newSlideDynamicData),
        presentationId: presentationId.value,
        prePopulatedSlide: slideId.value,
      })
    }

    async function updateDraftRemote(newSlideDynamicData) {
      const { slideContent } = await store.dispatch('rfps/updateSlideContent', {
        content: JSON.stringify(newSlideDynamicData),
        presentationId: presentationId.value,
        prePopulatedSlide: slideId.value,
      })
      return slideContent
    }

    const slideIndex = computed(
      () => `${presentationId.value}-${slideId.value}`,
    )

    const {
      apiError: versionError,
      updateValue: updateSlideDynamicData,
      isUpdating: isSavingChanges,
    } = versionedApiUpdate({
      currentComputedValue: slideContent,
      updateLocalValue: updateDraftLocal,
      updateRemoteValue: updateDraftRemote,
      currentValueIndex: slideIndex,
    })

    const showSavingIndicator = ref(false)
    const userMessage = computed(() =>
      showSavingIndicator.value && isSavingChanges.value
        ? 'Saving Changes. Please wait...'
        : '',
    )

    router.beforeEach(() => {
      if (isSavingChanges.value) {
        showSavingIndicator.value = true
        return false
      } else {
        showSavingIndicator.value = false
        return
      }
    })

    const builder = computed(() => builders[slideId.value])

    const isCurrentSlide = (slide) =>
      slide.slide.prePopulatedSlide === slideId.value

    const slideIdIsFound = computed(
      () => dynamicSldes.value.findIndex(isCurrentSlide) > -1,
    )
    return {
      slideContent,
      isLoaded,
      userMessage,
      versionError,
      updateSlideDynamicData,
      slideId,
      builder,
      slideIdIsFound,
    }
  },
}
</script>

<style scoped>
.builder__sidebar {
  height: 90vh;
}
.builder__sidebar::-webkit-scrollbar {
  width: 5px;
  border-radius: 2px;
}
</style>
