<template>
  <div class="px-2 pt-3 text-left">
    <div v-for="(powerElement, i) in sav21SlideDraft.biologic" :key="i">
      <div class="flex justify-between items-center">
        <h3 class="text-red-700 font-bold text-sm mb-2">
          {{ powerElement.type }}
        </h3>
      </div>
      <hr />
      <div class="grid grid-cols-2 gap-2">
        <div class="mt-2">
          <p class="text-sm">Committed Price</p>
          <div class="flex items-center border mt-1">
            <SvgIcon class="w-4 h-4 ml-2" name="amount" />
            <input
              v-model="powerElement.price"
              type="number"
              class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker"
              placeholder="Enter amount"
            />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="mt-2">
          <p class="text-sm w-38">Cost for Comparable Competitor</p>
          <div class="flex items-center border mt-1">
            <SvgIcon class="w-4 h-4 ml-2" name="amount" />
            <input
              v-model="powerElement.competitor"
              type="number"
              class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker"
              placeholder="Enter amount"
            />
          </div>
        </div>
        <div class="mt-2">
          <p class="text-sm w-38">Total savings Opportunity</p>
          <div class="flex items-center border mt-1">
            <SvgIcon class="w-4 h-4 ml-2" name="amount" />
            <input
              v-model="powerElement.opportunity"
              type="number"
              class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker"
              placeholder="Enter amount"
            />
          </div>
        </div>
      </div>
      <hr class="my-4" />
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
    const sav21SlideDraft = ref(cloneDeep(props.slideDynamicData))

    watch(
      sav21SlideDraft,
      () => emit('updateSlideDynamicData', sav21SlideDraft.value),
      {
        deep: true,
      },
    )

    return {
      sav21SlideDraft,
    }
  },
}
</script>
