<template>
  <div class="justify-center flex flex-col relative">
    <div
      v-if="togglePopup"
      data-test="slideModal"
      class="absolute w-80 rounded-lg shadow-lg bg-white flex flex-col p-4 space-y-4 z-10 bottom-20"
    >
      <img :src="slideDetail.fullImgSrc" class="min-h-161px" />
      <h1
        class="font-bold text-xl"
        :data-test="`slide-item-header-${slideDetail.slideNumber}`"
      >
        Slide {{ slideDetail.slideNumber }} | {{ slideDetail.slideTitle }}
      </h1>
      <dp-button
        text="See in Full View"
        class="w-full text-white bg-secondary"
        data-test="toggleFullView"
        @click="toggleFullView"
      />
    </div>
    <div
      class="border p-4 pr-0 flex rounded-xl mr-4 min-h-full"
      :class="isEnabled ? 'bg-accent-blue text-white' : 'text-gray-425'"
      :data-test="`slide-selection-div-${slideDetail.slideNumber}`"
    >
      <div v-if="isOverview" class="flex justify-between w-full">
        <h1 class="flex flex-grow focus:outline-none text-left my-auto">
          {{ slideDetail.slideTitle }}
        </h1>
        <div class="flex my-auto">
          <svg-icon class="h-5 w-5 mr-2" name="view" />
        </div>
      </div>
      <button
        v-else
        class="flex justify-between w-full"
        :disabled="editIsDisallowed"
        data-test="toggleSlide"
        @click.prevent="toggleSlideSelection"
      >
        <div
          class="flex flex-grow focus:outline-none text-left my-auto"
          :data-test="`slideTitle-${slideDetail.slideTitle}`"
        >
          {{ slideDetail.slideTitle }}
        </div>
        <button
          class="flex my-auto"
          data-test="togglePopup"
          @click.prevent.stop="togglePopupFunc"
          @blur="delay(() => (togglePopup = false))"
        >
          <svg-icon class="h-5 w-5 mr-2" name="view" />
        </button>
      </button>
    </div>
    <slide-selection-full-view
      v-if="openFullView"
      :close-dialog="toggleFullView"
      :slide="slideDetail"
      data-test="fullVeiwModal"
    />
  </div>
</template>

<script>
import DpButton from '@/components/buttons/DpButton.vue'
import { ref, computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import SvgIcon from '@/components/utils/SvgIcon.vue'
import SlideSelectionFullView from './SlideSelectionFullView.vue'
import { slideDetails } from '@/data/allSlides.js'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: { DpButton, SvgIcon, SlideSelectionFullView },

  props: {
    slide: { type: Object, required: true },
  },

  setup(props) {
    const togglePopup = ref(false)
    const openFullView = ref(false)
    const store = useStore()
    const route = useRoute()
    const delay = (func) => setTimeout(func, 1000)
    const slideDetail = computed(() => slideDetails(props.slide.slide) || {})
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    // invoke toggle slide mutation,
    const toggleSlideSelection = () => {
      if (route.params.templateID) {
        store.commit('templates/selectSlide', props.slide)
      } else if (route.params.presentationId) {
        store.commit('rfps/toggleSlideSelection', {
          slideId: props.slide.slideInfoId,
          presentationId: route.params.presentationId,
        })
      } else {
        store.dispatch('templates/toggleEnabled', props.slide)
      }
    }
    const isEnabled = computed(() => props.slide.isEnabled)

    const togglePopupFunc = () => {
      togglePopup.value = !togglePopup.value
      openFullView.value = false
    }

    const toggleFullView = () => {
      openFullView.value = !openFullView.value
      togglePopup.value = false
    }

    const editIsDisallowed = useRfpEditIsDisabled()

    return {
      togglePopup,
      isEnabled,
      toggleSlideSelection,
      openFullView,
      togglePopupFunc,
      toggleFullView,
      delay,
      slideDetail,
      isOverview,
      editIsDisallowed,
    }
  },
}
</script>
