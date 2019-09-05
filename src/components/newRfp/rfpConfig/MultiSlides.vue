<template>
  <div>
    <h3 class="font-bold text-gray-500 py-2">{{ headerText }}</h3>
    <div class="flex items-center">
      <div
        v-for="slideItem in ['INTR 5', 'INTR 6', 'INTR 7', 'INTR 8']"
        :key="slideItem"
        class="flex items-center space-x-2 pr-4"
      >
        <input
          v-model="selectedSlideArray"
          :disabled="editIsDisallowed"
          class="presentation-wizard-radio m-0"
          type="checkbox"
          :value="slideItem.replace(' ', '')"
          :name="`yesPriceAvailable-${slideItem}`"
        />
        <label
          :for="`yesPriceAvailable-${slideItem}`"
          class="text-normal text-gray-450"
        >
          {{ radioSelections[slideItem] }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'

export default {
  props: {
    keyName: { type: String, required: true },
    slideCodes: { type: Array, required: true },
    headerText: { type: String, required: true },
  },
  emits: ['changeOption'],
  setup(props, { emit }) {
    const route = useRoute()
    const store = useStore()
    const radioSelections = {
      'INTR 5': 'Large Level 1-2',
      'INTR 6': 'AMC',
      'INTR 7': 'Community Hospital',
      'INTR 8': 'ASC',
    }

    const slideSelection = computed(
      () =>
        store.getters['rfps/getPresentationById'](route.params.presentationId)
          .slideSelection,
    )

    const editIsDisallowed = useRfpEditIsDisabled()

    const selectedSlide = ref(slideSelection.value?.[props.keyName])
    const selectedSlideArray = ref(
      selectedSlide.value.length ? selectedSlide.value.split(',') : [],
    )
    watch(selectedSlideArray, (updatedSelectedSlideArray) => {
      const updatedSelectedSlide = updatedSelectedSlideArray.join()
      emit('changeOption', {
        keyName: props.keyName,
        updatedSelectedSlide,
        slideCodes: props.slideCodes,
      })
    })

    return {
      selectedSlide,
      selectedSlideArray,
      editIsDisallowed,
      radioSelections,
    }
  },
}
</script>
