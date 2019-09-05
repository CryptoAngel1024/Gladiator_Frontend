<template>
  <base-card class="rounded-2xl h-full" card-style="bg-white pt-7">
    <form
      class="flex flex-col w-full"
      data-test="next-submite-form"
      @submit.prevent="next()"
    >
      <h1
        data-test="title"
        class="px-2 mx-6 font-JnJ font-medium text-2xl text-gray-850"
      >
        {{ title }}
      </h1>
      <error-banner
        v-if="versionError"
        data-test="error-banner"
        class="flex my-1 mx-6"
        :message="versionError"
      />
      <div class="flex flex-col w-full pb-7 px-8 min-h-screen">
        <hr v-if="!isOverview" class="w-full mt-4" />
        <slot />
      </div>
      <footer
        class="flex justify-between px-9 py-3 items-center sticky bottom-0 bg-white"
        style="box-shadow: 0px -1px 8px #ececf2"
      >
        <dp-button
          type="button"
          text="Previous"
          :disabled="step <= 1 && page <= 1"
          data-test="newRfp-previous"
          class="py-4 px-14 text-white bg-secondary h-btn-builder min-h-btn-builder my-auto"
          @click="previous"
        />
        <h1 v-if="currentProgress && currentProgress.total > 1">
          <span class="text-2xl font-black tracking-widest text-indigo-800"
            >{{ currentProgress.current }}/</span
          >
          <span class="text-lg font-bold text-gray-500">{{
            currentProgress.total
          }}</span>
        </h1>
        <div class="flex">
          <dp-button
            v-if="isOverview || isSlideSelection"
            type="button"
            :text="downloadingPdf ? 'Exporting' : 'Export'"
            :disabled="downloadingPdf"
            class="bordered-dp-button px-12 mr-2 border rounded-xl border-red-700 font-bold text-center text-red-700"
            @click="generatePdf"
          />

          <dp-button
            v-else-if="!isSlideSelection || (!isNewRfp && step == 1)"
            type="button"
            text="Skip To Slides"
            data-test="newRfp-skip-to-slides"
            class="bordered-dp-button px-3 mr-2 border rounded-xl border-red-700 font-bold text-center text-red-700"
            @click="skipToSlides(), skipSlideGaLog()"
          />
          <dp-button
            :loading="isUpdating"
            type="submit"
            text="Next"
            data-test="newRfp-next-slide"
            class="py-4 w-40 text-white bg-secondary h-btn-builder min-h-btn-builder my-auto rounded-xl"
            :class="isUpdating ? 'pr-12' : ''"
          />
        </div>
      </footer>
    </form>
  </base-card>
</template>

<script>
import BaseCard from '@/components/utils/container/BaseCard.vue'
import DpButton from '@/components/buttons/DpButton.vue'
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ErrorBanner from '../utils/ErrorBanner.vue'
import versionedApiUpdate from '@/utils/versionedApiUpdate.js'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import {
  rfpUpdateTypesPerStep,
  useRfpsContentComparator,
} from '@/utils/rfpsContentIsEqual.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'
import { gaEvent } from '@/utils/GA_Event.js'

const TOTAL_STEPS = 3

const routeNameUpdatePresentation = 'update-presentation'

export default {
  components: {
    BaseCard,
    DpButton,
    ErrorBanner,
  },
  props: {
    uploadCustomerLogo: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const currentStepNumber = computed(() =>
      Number((route.params.step || 1) + '.' + (route.params.subStep || 1)),
    )

    const currentStep = computed(() => Number(route.params.step) || 1)
    const currentPage = computed(() => Number(route.params.subStep) || 1)
    const department = computed(
      () => store.getters['setting/getCurrentDepartment'],
    )

    const {
      rfpStepPageName: title,
      rfpStepTotalPages: currentProgress,
      currentIsOverviewPage: isOverview,
      isSlideSelectionPage: isSlideSelection,
      nextRfpStepPage,
      previousRfpStepPage,
    } = useAllRfpSteps()

    const isNewRfp = computed(() => route.params.presentationId == null)
    const currentRfp = computed(() => store.getters['rfps/getCurrentRfp'])
    const emptyCurrentRfp = computed(
      () => store.getters['rfps/getEmptyCurrentRfp'],
    )
    const createdpresentationId = ref('')
    const presentationId = computed(
      () => route.params.presentationId || createdpresentationId.value,
    )

    const nextPath = computed(() => {
      if (!presentationId.value) return

      if (currentStep.value < TOTAL_STEPS) {
        return nextRfpStepPage(
          presentationId.value,
          currentStep.value,
          currentPage.value,
        )
      }
      return {
        name: 'builder',
        params: {
          presentationId: presentationId.value,
          slideId: 'INTRO1',
        },
      }
    })

    const createRfp = async () => {
      // create presentation
      if (!currentRfp.value.customerName) {
        throw 'Please Enter Customer Name'
      }

      const newRfp = {
        customerName: currentRfp.value.customerName,
        customerUcn: currentRfp.value.customerUcn,
        customerAddress: currentRfp.value.customerAddress,
        contact: currentRfp.value.contact,
        stakeHolder: currentRfp.value.stakeholders,
        customerProblem: currentRfp.value.customerProblem,
        customerOverview: currentRfp.value.customerOverview,
        internalUserDetails: currentRfp.value.internalUserDetails,
      }
      let createdRfp = await store.dispatch('rfps/createRfp', newRfp)
      createdpresentationId.value = createdRfp.presentationId

      const templateId = route.params.templateId

      if (templateId) {
        await store.dispatch('templates/getTemplate', templateId)
        const templateState =
          store.getters['templates/getTemplateByID'](templateId)
        const templateSlides = templateState.slides
        const presentationSlides = createdRfp.slides

        const correspondingTemplateSlide = (rfpSlide) =>
          templateSlides?.find(
            (templateSlide) =>
              templateSlide.slide.prePopulatedSlide ===
              rfpSlide.slide.prePopulatedSlide,
          )

        const updatedSlides = presentationSlides.map((presentationSlide) => ({
          ...presentationSlide,
          isEnabled: Boolean(
            correspondingTemplateSlide(presentationSlide)?.isEnabled,
          ),
        }))

        store.commit('rfps/updateRfp', {
          ...createdRfp,
          slides: updatedSlides,
        })

        createdRfp = await store.dispatch('rfps/saveRfpChanges', {
          presentationId: createdRfp.presentationId,
          updateType: 'slides',
        })
      }
      await props.uploadCustomerLogo(createdRfp.presentationId)

      return createdRfp
    }

    async function saveChanges() {
      if (currentStepNumber.value === 1.1 && isNewRfp.value) {
        await createRfp()
        return
      }

      if (currentStepNumber.value === 1.1) {
        await props.uploadCustomerLogo()
      }

      const updatedRfp = await store.dispatch('rfps/saveRfpChanges', {
        presentationId: presentationId.value,
        updateType:
          rfpUpdateTypesPerStep[department.value][currentStepNumber.value],
      })

      return updatedRfp
    }

    const next = async () => {
      await updateApi()
      if (
        nextPath.value &&
        (route.name === routeNameUpdatePresentation ||
          route.name === 'new-presentation-template' ||
          route.name === 'new-presentation')
      ) {
        router.push(nextPath.value)
      }
    }
    const previous = () => {
      if (!(currentStepNumber.value <= 1.1)) {
        router.push(
          previousRfpStepPage(
            presentationId.value,
            currentStep.value,
            currentPage.value,
          ),
        )
      }
    }

    const skipToSlides = async () => {
      if (currentStep.value === 1 && isNewRfp.value) {
        await updateApi()
      }
      router.push({
        name: routeNameUpdatePresentation,
        params: {
          presentationId: presentationId.value || 'new',
          step: 3,
          subStep: 1,
        },
      })
    }

    const presentationState = computed(() =>
      store.getters['rfps/getPresentationById'](route.params.presentationId),
    )
    const slideIndex = computed(
      () => `${presentationId.value}-${route.params.step}`,
    )
    const { rfpsContentIsEqual } = useRfpsContentComparator()

    const {
      apiError: versionError,
      updateValue: updateApiFunc,
      isUpdating,
    } = versionedApiUpdate({
      initialLocalValue: () =>
        route.params.presentationId
          ? presentationState.value
          : emptyCurrentRfp.value,
      updateLocalValue: () => {},
      updateRemoteValue: saveChanges,
      currentValueIndex: slideIndex,
      localRemoteValuesIsEqual: rfpsContentIsEqual,
    })

    const updateApi = async () => updateApiFunc(presentationState.value)

    const editIsDisallowed = useRfpEditIsDisabled()

    watch(
      presentationState,
      (newPresentationState, oldPresentationState) => {
        if (
          oldPresentationState &&
          !rfpsContentIsEqual(newPresentationState, oldPresentationState) &&
          !editIsDisallowed.value &&
          newPresentationState.presentationId ===
            oldPresentationState.presentationId &&
          !isNewRfp.value
        ) {
          updateApi()
        }
      },
      {
        deep: true,
        immediate: false,
      },
    )

    router.beforeEach(async (to) => {
      if (
        currentStepNumber.value === 1.1 &&
        isNewRfp.value &&
        to.params.presentationId === 'new'
      ) {
        await updateApi()
        if (
          ['builder', routeNameUpdatePresentation, 'create-link'].includes(
            to.name,
          )
        ) {
          if (!presentationId.value) {
            versionError.value =
              versionError.value || 'Please Enter Customer Name'
            return false
          }
          to.params.presentationId = presentationId.value
          return to
        }
      }
    })

    const scrollToTop = () => {
      window.scrollTo(0, 0)
    }

    router.afterEach(() => {
      scrollToTop()
    })

    const skipSlideGaLog = () => {
      gaEvent({
        action: 'skip-to-slides-button-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-skip-to-slides-button',
      })
    }

    const downloadingPdf = ref(false)

    async function generatePdf() {
      downloadingPdf.value = true
      await store.dispatch('link/generatePdf', {
        clientName: presentationState.value.clientName,
        presentationId: presentationId.value,
        pdfTypeParam: isOverview.value ? 'OVERVIEW' : 'SLIDE_DECK',
      })
      downloadingPdf.value = false
    }

    return {
      step: currentStep,
      page: currentPage,
      isNewRfp,
      isUpdating,
      title,
      next,
      previous,
      skipToSlides,
      isSlideSelection,
      isOverview,
      currentProgress,
      versionError,
      skipSlideGaLog,
      generatePdf,
      downloadingPdf,
    }
  },
}
</script>

<style lang="postcss">
.bordered-dp-button {
  padding-top: calc(1rem - 1px);
  padding-bottom: calc(1rem - 1px);
}
.presentation-wizard-input,
.presentation-wizard-textarea {
  @apply font-normal leading-relaxed rounded-lg bg-gray-50 py-3 px-3;
}
.presentation-wizard-input:enabled,
.presentation-wizard-textarea:enabled {
  @apply py-3 px-3;
}
.presentation-wizard-input:disabled,
.presentation-wizard-textarea:disabled {
  background-color: white;
  border: none;
}
.presentation-wizard-radio {
  @apply w-5 h-5 border-2 border-gray-450;
}
.presentation-wizard-select {
  @apply text-base font-normal leading-relaxed py-4 outline-1 outline px-3 rounded-lg bg-gray-50;
}
.presentation-wizard-select:disabled {
  background-color: white;
}
</style>
