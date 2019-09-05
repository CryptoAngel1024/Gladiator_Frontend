<template>
  <div class="grid grid-cols-2 gap-4 space-x-2.5 items-center justify-start">
    <div class="flex space-x-2.5 items-center justify-start">
      <input
        v-model="selectedValue"
        type="checkbox"
        class="flex justify-center w-4 h-4 px-0.5 accent-indigo-800 rounded-sm"
        :disabled="editIsDisallowed"
      />

      <label class="text-sm leading-none text-gray-500"> {{ lableText }}</label>
    </div>
    <div
      v-show="selectedValue"
      class="flex items-center w-full flex-1 p-2.5 bg-blue-500 bg-opacity-10 border rounded-md border-blue-500"
    >
      <p class="text-sm font-bold text-blue-500">
        {{ slide }}
      </p>
    </div>
  </div>
</template>

<script>
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import { ref, watch } from 'vue'

export default {
  props: {
    lableText: {
      type: String,
      required: true,
    },
    slide: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Boolean],
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const editIsDisallowed = useRfpEditIsDisabled()

    const selectedValue = ref(props.modelValue)

    watch(selectedValue, (updatedValue) => {
      emit('update:modelValue', updatedValue)
    })

    return {
      editIsDisallowed,
      selectedValue,
    }
  },
}
</script>
