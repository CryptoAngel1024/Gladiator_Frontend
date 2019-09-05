<template>
  <div class="px-2 pt-3 text-left">
    <h3 class="text-sm font-bold text-red-700 mt-6">Images</h3>
    <div class="mt-4">
      <p class="text-sm leading-none text-gray-800 font-book">
        Summary of procedure analysis
      </p>
      <slideImageUpload />
    </div>

    <h3 class="text-sm font-bold text-red-700 mt-6">Images</h3>
    <div class="mt-4">
      <p class="text-sm leading-none text-gray-800 font-book">Vendors share</p>
      <slideImageUpload :image-number="2" />
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { cloneDeep } from 'lodash'
import slideImageUpload from '@/components/newRfp/slideImageUpload.vue'
import { useRoute } from 'vue-router'

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
    const sav2SlideDraft = ref(cloneDeep(props.slideDynamicData))
    const route = useRoute()
    const slideCode = computed(() => route.params.slideId)
    const presentationId = computed(() => route.params.presentationId)
    watch(
      sav2SlideDraft,
      () => emit('updateSlideDynamicData', sav2SlideDraft.value),
      {
        deep: true,
      },
    )

    return {
      sav2SlideDraft,
      slideCode,
      presentationId,
    }
  },
}
</script>
