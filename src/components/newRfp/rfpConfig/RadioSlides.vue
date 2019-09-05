<template>
  <div class="flex space-x-10 py-1">
    <div class="py-1">
      <h3 class="font-bold text-gray-500 py-2">
        {{ question }}
      </h3>

      <div class="flex space-x-10">
        <div class="flex items-center space-x-2">
          <input
            v-model="yesNo"
            :disabled="editIsDisallowed"
            class="presentation-wizard-radio"
            type="radio"
            :value="true"
            :data-test="`presentation-config-${keyName}`"
          />
          <label for="yesPriceAvailable" class="text-normal text-gray-450 mb-2">
            Yes
          </label>
        </div>
        <div class="flex items-center space-x-2">
          <input
            v-model="yesNo"
            :disabled="editIsDisallowed"
            class="presentation-wizard-radio"
            type="radio"
            :value="false"
          />
          <label for="priceNotAvailable" class="text-normal text-gray-450 mb-2">
            No
          </label>
        </div>
      </div>
      <slot name="link" />
      <div v-if="yesNo && descriptionYes" class="my-3 flex">
        <div class="flex font-bold rfp-config-question-box items-center p-2">
          <img
            class="w-8 h-8"
            src="@/assets/images/slide_bell.svg"
            alt="bell"
          />
          <a class="pl-2 mr-2" target="blank">{{ descriptionYes }}</a>
          <SlideImageUploadButton
            v-if="
              keyName == 'sterileContainers' || keyName == 'universalSmallFrag'
            "
            :slide-code="keyName === 'sterileContainers' ? 'SAV10' : 'SAV12'"
          />
        </div>
        <div
          v-if="
            keyName == 'sterileContainers' || keyName == 'universalSmallFrag'
          "
          class="rounded-lg border-dashed border-2 w-48 h-28 ml-4"
        >
          <slideImage
            :slide-code-prop="
              keyName === 'sterileContainers' ? 'SAV10' : 'SAV12'
            "
            class="w-full h-full object-contain w-50"
          />
        </div>
      </div>
      <div v-if="yesNo === false && descriptionNo" class="my-3">
        <div class="flex font-bold rfp-config-question-box items-center p-2">
          <img
            class="w-8 h-8"
            src="@/assets/images/slide_bell.svg"
            alt="bell"
          />
          <a class="pl-2" target="blank">{{ descriptionNo }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import SlideImageUploadButton from './SlideImageUploadButton.vue'
import slideImage from '@/components/newRfp/slideImage.vue'

export default {
  components: {
    SlideImageUploadButton,
    slideImage,
  },
  props: {
    keyName: { type: String, required: true },
    slideCodes: { type: Array, required: true },
    question: { type: String, required: true },
    descriptionYes: { type: String, default: '' },
    descriptionNo: { type: String, default: '' },
  },
  emits: ['changeOption'],
  setup(props, { emit }) {
    const route = useRoute()
    const store = useStore()

    const slideSelection = computed(
      () =>
        store.getters['rfps/getPresentationById'](route.params.presentationId)
          .slideSelection,
    )

    const editIsDisallowed = useRfpEditIsDisabled()

    const yesNo = ref(slideSelection.value?.[props.keyName])

    watch(yesNo, (updatedYesNo) => {
      emit('changeOption', {
        keyName: props.keyName,
        updatedYesNo,
        slideCodes: props.slideCodes,
      })
    })

    return {
      yesNo,
      editIsDisallowed,
    }
  },
}
</script>
