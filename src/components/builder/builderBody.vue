<template>
  <section class="px-2 py-3 bg-white rounded-2xl font-Arial">
    <!-- title and menu div -->
    <header class="flex justify-between">
      <h1
        class="text-base font-medium text-slidColor-1"
        data-test="slide-title"
      >
        Slide {{ slideDetail?.slideNumber }}:
        {{ slideDetail?.slideTitle }}
      </h1>
      <!-- menu div -->
      <div class="flex flex-row-reverse text-base font-medium items-center">
        <button type="button" @click="toggleSlideSelection">
          <svg-icon
            class="w-4 h-4 ml-2"
            :name="slideDetail?.isEnabled ? 'slide-eye' : 'slide-eyeoff'"
            data-test="slide-eye"
          />
        </button>
        <router-link :to="nextPage" class="my-auto">
          <svg-icon
            class="w-4 h-4 ml-2"
            name="slide-down"
            data-test="slide-slide-down"
          />
        </router-link>
        <router-link :to="previousPage" class="my-auto">
          <svg-icon
            class="w-4 h-4 ml-2"
            name="slide-up"
            data-test="slide-slide-up"
          />
        </router-link>
      </div>
    </header>

    <builderSlideContainer v-if="slideDetail">
      <component :is="builderSlides[slideId]" />
    </builderSlideContainer>

    <div v-else class="min-h-161px">
      <ApiState
        class="px-2 py-3 bg-white rounded-2xl font-Arial"
        :loading="loading"
        :error-message="error"
        data-type="presentation"
      />
    </div>
    <footer class="flex items-center justify-between py-3">
      <dp-link-button
        text="Previous"
        :to="previousPage"
        class="py-4 px-14 text-white bg-secondary h-btn-builder min-h-btn-builder my-auto"
        data-test="slide-previous-button"
      />

      <dp-link-button
        text="Next"
        :to="nextPage"
        class="py-4 px-14 ml-auto mr-0 text-white bg-secondary h-btn-builder min-h-btn-builder my-auto rounded-xl"
        data-test="slide-next-button"
      />
    </footer>
  </section>
</template>

<script>
import IndustryFieldSlide from '@/components/slides/0.IndustryField.vue'
import Sav10Slide from '@/components/slides/sav-10.vue'
import Sav12Slide from '@/components/slides/sav-12.vue'
import IntroductionSlide from '@/components/slides/1.IntroductionSlide.vue'
import SurgeonPlanSlide from '@/components/slides/2.SurgeonPlan.vue'
import TrainingPlanSlide from '@/components/slides/4.TrainingPlanWithCalender.vue'
import SavingSummarySlide from '@/components/slides/5.SavingSummary.vue'
import Sav2Slide from '@/components/slides/sav2/1.sav-2.vue'
import Sav21Slide from '@/components/slides/sav-21.vue'
import Sav22Slide from '@/components/slides/sav-22.vue'
import Sav23Slide from '@/components/slides/sav-23.vue'
import Sav25Slide from '@/components/slides/sav-25.vue'
import Sav26Slide from '@/components/slides/sav-26.vue'
import Sav27Slide from '@/components/slides/sav-27.vue'
import Sav28Slide from '@/components/slides/sav-28.vue'
import DpLinkButton from '@/components/buttons/DpLinkButton.vue'
import builderSlideContainer from '@/components/builder/builderSlideContainer.vue'
import AmbulatorySurgeryCenter from '@/components/slides/ASC/5.AmbulatorySurgeryCenter.vue'
import ApiState from '@/components/utils/apiState.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'
import SvgIcon from '@/components/utils/SvgIcon.vue'

const builderSlides = {
  SRG2: SurgeonPlanSlide,
  EDU3: TrainingPlanSlide,
  INTRO1: IntroductionSlide,
  SAV2: Sav2Slide,
  SAV10: Sav10Slide,
  SAV12: Sav12Slide,
  SAV21: Sav21Slide,
  SAV22: Sav22Slide,
  SAV23: Sav23Slide,
  SAV24: SavingSummarySlide,
  SAV25: Sav25Slide,
  SAV26: Sav26Slide,
  SAV27: Sav27Slide,
  SAV28: Sav28Slide,
  CS1: IndustryFieldSlide,
  ASC_5: AmbulatorySurgeryCenter,
}

export default {
  components: {
    ApiState,
    builderSlideContainer,
    DpLinkButton,
    SvgIcon,
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const loading = ref(true)
    const error = ref('')
    const presentationId = computed(() => route.params.presentationId)

    onMounted(async () => {
      if (currentSlideIndex.value === -1) goToDynamicSlide1()
      loading.value = true
      const { err } = await store.dispatch(
        'rfps/getMyRfpbyId',
        presentationId.value,
      )
      if (err) error.value = err.message || err
      loading.value = false

      if (currentSlideIndex.value === -1) goToDynamicSlide1()
    })

    const dynamicSldes = computed(() =>
      store.getters['rfps/enabledDynamicSlidesByPresentationId'](
        presentationId.value,
      ),
    )

    const slideId = computed(
      () =>
        route.params.slideId || dynamicSldes.value[0]?.slide.prePopulatedSlide,
    )
    const toggleSlideSelection = async () => {
      store.commit('rfps/toggleSlideSelection', {
        slideId: slideId.value,
        presentationId: presentationId.value,
      })

      try {
        await store.dispatch('rfps/saveRfpChanges', {
          presentationId: presentationId.value,
          updateType: 'slides',
        })
      } catch (err) {
        console.error(`error toggling slide: ${err}`)
      }
    }

    const isCurrentSlide = (slide) =>
      slide.slide.prePopulatedSlide === route.params.slideId

    const slideDetail = computed(() => dynamicSldes.value?.find(isCurrentSlide))

    const currentSlideIndex = computed(() =>
      dynamicSldes.value.findIndex(isCurrentSlide),
    )

    function goToDynamicSlide1() {
      const dynamicSlide1 = dynamicSldes.value[0]?.slide.prePopulatedSlide
      if (dynamicSlide1)
        router.push({
          ...route,
          params: {
            ...route.params,
            slideId: dynamicSlide1,
          },
        })
    }

    watch(
      dynamicSldes,
      () => {
        if (currentSlideIndex.value === -1) goToDynamicSlide1()
      },
      {
        deep: true,
      },
    )

    const nextPage = computed(() => {
      const nextIndex = currentSlideIndex.value + 1
      return nextIndex < dynamicSldes.value.length
        ? {
            params: {
              slideId: dynamicSldes.value[nextIndex].slide.prePopulatedSlide,
            },
          }
        : {
            name: 'create-link',
            params: {
              presentationId: presentationId.value,
            },
          }
    })

    const RFP_STEPS_TOTAL_STEPS = 3

    const previousPage = computed(() => {
      return currentSlideIndex.value > 0
        ? {
            params: {
              slideId:
                dynamicSldes.value[currentSlideIndex.value - 1].slide
                  .prePopulatedSlide,
            },
          }
        : {
            name: 'update-presentation',
            params: {
              presentationId: presentationId.value,
              step: RFP_STEPS_TOTAL_STEPS,
              subStep: 1,
            },
          }
    })

    return {
      slideDetail,
      nextPage,
      previousPage,
      slideId,
      dynamicSldes,
      currentSlideIndex,
      loading,
      error,
      toggleSlideSelection,
      builderSlides,
    }
  },
}
</script>
