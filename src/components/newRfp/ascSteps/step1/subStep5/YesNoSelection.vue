<template>
  <div class="flex items-center my-2 w-full">
    <div :class="isOverview ? 'w-full flex' : 'w-1/2'">
      <p
        class="pb-2 text-base font-bold leading-none text-gray-500 w-1/2"
        :class="isOverview ? 'w-1/2' : 'w-full'"
      >
        {{ title }}
      </p>
      <p
        v-if="isOverview"
        class="px-4 font-bold"
        :class="selectedValue == 'Yes' ? 'text-indigo-750' : 'text-primary'"
      >
        {{ selectedValue }}
      </p>
    </div>
    <div v-if="!isOverview" class="flex space-x-8">
      <div class="flex space-x-2">
        <input
          v-model="selectedValue"
          type="radio"
          value="Yes"
          class="presentation-wizard-radio"
          :disabled="editIsDisallowed"
        />
        <label class="text-normal text-gray-450">Yes</label>
      </div>
      <div class="flex space-x-2">
        <input
          v-model="selectedValue"
          type="radio"
          value="No"
          class="presentation-wizard-radio"
          :disabled="editIsDisallowed"
        />
        <label class="text-normal text-gray-450">No</label>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    selection: {
      type: String,
      required: true,
    },
    keyName: {
      type: String,
      required: true,
    },
  },
  emits: ['changeOption'],
  setup(props, { emit }) {
    const selectedValue = ref(props.selection)
    const editIsDisallowed = useRfpEditIsDisabled()
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    // todo: temp migration, remove
    onMounted(() => {
      if (selectedValue.value === true) selectedValue.value = 'Yes'
      else if (selectedValue.value === false) selectedValue.value = 'No'
    })

    watch(selectedValue, (updatedSelectedValue) => {
      emit('changeOption', {
        keyName: props.keyName,
        updatedSelectedValue,
      })
    })

    return {
      selectedValue,
      editIsDisallowed,
      isOverview,
    }
  },
}
</script>
