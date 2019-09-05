<template>
  <div class="px-2 pt-3 text-left">
    <div v-for="(sav25SlideData, i) in sav25SlideDraft.element" :key="i">
      <div class="flex justify-between items-center">
        <h3 class="text-red-700 font-bold text-sm mb-2">
          {{ sav25SlideData.type }}
        </h3>
      </div>
      <hr class="mb-2" />
      <div v-for="(subData, j) in sav25SlideData.subElement" :key="j">
        <div class="text-xs text-gray-1">{{ subData.subTitle }}</div>
        <div class="grid grid-cols-2 gap-2">
          <div class="mt-2">
            <p class="text-sm">Current</p>
            <div class="flex items-center border mt-1">
              <SvgIcon class="w-4 h-4 ml-2" name="amount" />
              <input
                v-model="subData.current"
                type="number"
                class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker"
              />
            </div>
          </div>
          <div class="mt-2">
            <p class="text-sm">Offers</p>
            <div class="flex items-center border mt-1">
              <SvgIcon class="w-4 h-4 ml-2" name="amount" />
              <input
                v-model="subData.offers"
                type="number"
                class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker"
              />
            </div>
          </div>
        </div>
        <hr class="my-4" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { cloneDeep } from 'lodash'

export default {
  props: {
    slideDynamicData: {
      type: Object,
      required: true,
    },
  },
  emits: { updateSlideDynamicData: Object },

  setup(props, { emit }) {
    const sav25SlideDraft = ref(cloneDeep(props.slideDynamicData))
    watch(
      sav25SlideDraft,
      () => emit('updateSlideDynamicData', sav25SlideDraft.value),
      {
        deep: true,
      },
    )
    return {
      sav25SlideDraft,
    }
  },
}
</script>
