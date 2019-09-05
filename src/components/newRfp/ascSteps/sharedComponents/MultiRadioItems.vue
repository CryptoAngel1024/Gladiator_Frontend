<template>
  <div class="mb-6 w-full">
    <div :class="isOverview ? 'flex items-center w-full' : ''">
      <h1
        class="pb-2 font-bold text-gray-500"
        :class="isOverview ? 'w-1/2' : ''"
      >
        {{ title }}
      </h1>
      <p
        v-if="isOverview"
        class="px-4 font-bold"
        :class="
          selectedValue.selection == 'Yes' ? 'text-indigo-750' : 'text-primary'
        "
      >
        {{ selectedValue.selection }}
      </p>
    </div>
    <div v-if="!isOverview" class="flex space-x-10 py-2">
      <div
        v-for="(optionValue, index) in options"
        :key="index"
        class="flex items-center space-x-2"
      >
        <input
          :id="`item${index}`"
          v-model="selectedValue.selection"
          class="presentation-wizard-radio"
          type="radio"
          :value="optionValue"
          :disabled="editIsDisallowed"
        />

        <label :for="`item${index}`" class="text-normal text-gray-450"
          >{{ optionValue }}
        </label>
      </div>
    </div>
    <div
      v-if="additionalInfo[selectedValue.selection]"
      :class="isOverview ? 'flex items-center w-full' : 'max-w-2xl'"
    >
      <p
        class="mt-4 mb-2 text-sm text-gray-450"
        :class="isOverview ? 'w-1/2' : ''"
      >
        {{ additionalInfo[selectedValue.selection] }}
      </p>
      <input
        v-model="selectedValue.additionalInfo[selectedValue.selection]"
        :placeholder="isOverview ? '' : 'Type something here...'"
        class="presentation-wizard-input w-full p-4 rounded-md my-1 max-w-sm bg-white"
        :disabled="editIsDisallowed"
      />
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
      default: '',
    },
    modelValue: {
      type: Object,
      required: true,
    },
    options: { type: Array, default: () => ['Yes', 'No'] },
    additionalInfo: { type: Object, default: () => ({ Yes: '' }) },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const editIsDisallowed = useRfpEditIsDisabled()
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    const selectedValue = ref(props.modelValue)

    watch(
      selectedValue,
      (updatedValue) => {
        emit('update:modelValue', updatedValue)
      },
      { deep: true },
    )

    return {
      editIsDisallowed,
      selectedValue,
      isOverview,
    }
  },
}
</script>

<style scoped lang="postcss">
input[type='text']:enabled,
input:not([type]):enabled {
  @apply my-2 py-4 px-3 rounded-lg bg-gray-50;
}
input[type='text']:disabled,
input:not([type]):disabled {
  background-color: white;
  border: none;
  font-weight: bold;
  margin-left: 3px;
  @apply mb-2 text-indigo-750;
}
.presentation-wizard-radio {
  @apply w-5 h-5 border-2 border-gray-450;
}
</style>
