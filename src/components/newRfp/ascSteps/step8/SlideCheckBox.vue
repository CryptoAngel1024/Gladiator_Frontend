<template>
  <div class="flex space-x-2 w-full">
    <div class="flex w-3/4 max-w-sm">
      <p class="text-sm flex-grow text-gray-500 pr-2 py-2">{{ lableText }}</p>
      <input
        v-model="selectedValue"
        type="checkbox"
        class="w-4 h-4 px-0.5 my-auto accent-indigo-800 rounded-sm"
        :disabled="editIsDisallowed"
      />
    </div>
    <div
      v-show="selectedValue"
      class="flex items-center max-w-sm justify-start flex-1 my-auto bg-blue-500 bg-opacity-10 border rounded-md border-blue-500"
    >
      <p class="px-3 py-1 text-sm font-bold text-blue-500">{{ slideName }}</p>
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
    slideName: {
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
