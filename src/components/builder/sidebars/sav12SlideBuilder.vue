<template>
  <div class="px-2 pt-3 text-left">
    <div class="flex items-center justify-between mt-6">
      <h3 class="text-sm font-bold text-red-700">Images</h3>
    </div>
    <div class="mt-4">
      <p class="text-sm leading-none text-gray-800 font-book">Lorem Impusm</p>
      <slideImageUpload />
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { cloneDeep } from 'lodash'
import slideImageUpload from '@/components/newRfp/slideImageUpload.vue'

export default {
  components: { slideImageUpload },
  props: {
    slideDynamicData: {
      type: Object,
      required: true,
    },
  },
  emits: { updateSlideDynamicData: Object },

  setup(props, { emit }) {
    const sav12SlideDraft = ref(cloneDeep(props.slideDynamicData))

    watch(
      sav12SlideDraft,
      () => emit('updateSlideDynamicData', sav12SlideDraft.value),
      {
        deep: true,
      },
    )

    return {
      sav12SlideDraft,
    }
  },
}
</script>
