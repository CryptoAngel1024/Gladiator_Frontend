<template>
  <base-modal id="templateForm" title="Create custom slide">
    <div class="flex flex-col rounded-2xl" style="width: 90vw">
      <div class="flex justify-between pt-6 pb-4 px-6">
        <h1
          class="text-2xl font-bold font-JnJ text-gray-850"
          data-test="create-custom-slide-title"
        >
          Create custom slide
        </h1>
        <button
          data-test="create-custom-slide-closeModal"
          @click="closeModal()"
        >
          <img
            class="w-7 h-7"
            src="@/assets/generalIcons/close.png"
            alt="close"
          />
        </button>
      </div>

      <div
        class="inline-block md:flex justify-between px-6 py-5 bg-gray-75 shadow-2md border border-solid border-gray-200"
      >
        <h3
          class="text-2xl font-JnJ text-blue-2 font-medium"
          data-test="custom-slide-steps-title"
        >
          {{ title }}
        </h3>
        <custom-slide-stepper
          :current-step="currentStep"
          @goto-step="gotoStep"
        />
      </div>
      <div>
        <custom-slide-template v-if="currentStep == 1 && !selectExisting" />
        <existing-custom-slides v-if="currentStep == 1 && selectExisting" />
        <set-slide-position v-if="currentStep == 2" />
      </div>
    </div>
  </base-modal>
</template>
<script>
import BaseModal from '@/components/utils/container/BaseModal.vue'
import CustomSlideStepper from '@/components/stepper/CustomSlideStepper.vue'
import ExistingCustomSlides from './CustomSlideSteps/ExistingCustomSlides.vue'
import CustomSlideTemplate from './CustomSlideSteps/CustomSlideTemplate.vue'
import SetSlidePosition from './CustomSlideSteps/SetSlidePosition.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const TITLES = {
  1: 'Step 1 : Edit the custom slide template',
  2: 'Step 2 : Set the position of slide on current presentation',
  3: 'Step 1 : Select the custom slide',
}

export default {
  components: {
    BaseModal,
    CustomSlideStepper,
    ExistingCustomSlides,
    CustomSlideTemplate,
    SetSlidePosition,
  },
  props: {
    type: { type: String, default: 'new' },
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const currentStep = computed(() => Number(route.params.slideStep) || 1)
    const slideInfoId = computed(() => route.params.customSlideId)
    const presentationId = computed(() => route.params.presentationId)
    const title = computed(() => TITLES[currentStep.value])
    const selectionType = computed(() => route.params.selectionType)
    const selectExisting = computed(() => selectionType.value === 'existing')

    onMounted(async () => {
      try {
        await store.dispatch('customSlide/fetchCustomSlidesByOwnerId')
      } catch (err) {
        console.error('fetch Custom Slides: ', err)
      }
    })

    const gotoStep = (step) => {
      if (presentationId.value) {
        if (slideInfoId.value && !selectExisting.value) {
          router.push({
            name: 'presentation-update-custom-slide',
            params: {
              presentationId: presentationId.value,
              step: route.params.step,
              page: route.params.subStep,
              customSlideId: slideInfoId.value,
              slideStep: step,
              selectionType: selectionType.value,
            },
          })
        } else {
          router.push({
            name: 'presentation-create-custom-slide',
            params: {
              presentationId: presentationId.value,
              step: route.params.step,
              page: route.params.subStep,
              slideStep: step,
              selectionType: selectionType.value,
            },
          })
        }
      } else {
        if (slideInfoId.value) {
          router.push({
            name: 'update-custom-slide',
            params: {
              customSlideId: slideInfoId.value,
              slideStep: step,
            },
          })
        } else {
          router.push({
            name: 'create-custom-slide',
            params: {
              slideStep: step,
            },
          })
        }
      }
    }

    const closeModal = () => {
      if (presentationId.value) {
        router.push({
          name: 'update-presentation',
          params: {
            presentationId: presentationId.value,
            step: route.params.step,
            subStep: route.params.subStep,
          },
        })
      } else {
        router.push({
          name: 'settings-custom-slides',
        })
      }
    }

    return { currentStep, selectExisting, title, gotoStep, closeModal }
  },
}
</script>
