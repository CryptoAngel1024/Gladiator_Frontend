<template>
  <div class="max-w-2xl">
    <div :class="isOverview ? 'flex items-center w-full justify-between' : ''">
      <h1 class="text-subheader py-0">
        {{ title }}
      </h1>
      <p
        v-if="isOverview"
        class="px-4 font-bold"
        :class="selectedValue == 'Yes' ? 'text-indigo-750' : 'text-primary'"
      >
        {{ selectedValue }}
      </p>
    </div>
    <div v-if="!isOverview" class="flex space-x-10 py-1">
      <div
        v-for="(item, index) in options"
        :key="index"
        class="flex items-center space-x-2"
      >
        <input
          :id="`item${index}`"
          v-model="selectedValue"
          class="presentation-wizard-radio"
          type="radio"
          :value="item"
          :disabled="editIsDisallowed"
        />

        <label :for="`item${index}`" class="text-normal text-gray-450"
          >{{ item }}
        </label>
      </div>
    </div>

    <div
      v-show="selectedValue === showDetailInfoIf && detailInfoText"
      class="w-full inline-flex space-x-2.5 items-center justify-start p-2.5 mt-1 bg-blue-500 bg-opacity-10 border rounded-md border-blue-500"
    >
      <img class="w-8 h-8" src="@/assets/images/slide_bell.svg" alt="bell" />

      <p class="text-sm font-bold text-blue-500">
        {{ detailInfoText }}
      </p>
    </div>
  </div>
</template>

<script>
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import { ref, watch } from 'vue'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    detailInfoText: {
      type: String,
      default: '',
    },
    showDetailInfoIf: {
      type: String,
      default: 'Yes',
    },
    modelValue: {
      type: [String, Boolean],
      required: true,
    },
    options: { type: Array, required: true },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const editIsDisallowed = useRfpEditIsDisabled()
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    const selectedValue = ref(props.modelValue)

    watch(selectedValue, (updatedValue) => {
      emit('update:modelValue', updatedValue)
    })

    return {
      editIsDisallowed,
      selectedValue,
      isOverview,
    }
  },
}
</script>
