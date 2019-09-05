<template>
  <div class="flex justify-between" :class="isOverview ? 'w-full' : 'w-101'">
    <div :class="isOverview ? 'flex items-center w-full' : ''">
      <h1 class="py-2 text-subheader" :class="isOverview ? 'w-1/2' : ''">
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
    <div v-if="!isOverview" class="flex space-x-10 py-2">
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
  </div>
</template>

<script>
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

import { ref, watch } from 'vue'
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    options: { type: Array, default: () => ['Yes', 'No'] },
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
