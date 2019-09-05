<template>
  <div class="px-2 pt-3 text-left">
    <div class="flex justify-between items-center">
      <h3 class="text-red-700 font-bold text-sm">Texts</h3>
    </div>
    <div class="mt-4">
      <p class="text-sm">Date</p>
      <div class="flex items-center border">
        <input
          v-model="introSlide.date"
          class="rounded font-bold focus:outline-none mb-0 py-2 px-2 text-sm w-full text-grey-darker"
          type="date"
        />
      </div>
    </div>
    <div class="flex justify-between items-center mt-6">
      <h3 class="text-red-700 font-bold text-sm">Images</h3>
    </div>
    <div class="mt-4">
      <p class="text-sm">Company Logo</p>
      <s3ImageUpload
        class="rounded-lg border-dashed border-2 w-50 h-30"
        img-class="w-50"
        :s3-directory="`presentations/${presentationId}/`"
        s3-file-name="customerProfile.png"
        :allow-img-delete="true"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import s3ImageUpload from '@/components/utils/s3/s3ImageUpload.vue'
import { cloneDeep } from 'lodash'

export default {
  components: { s3ImageUpload },
  props: {
    slideDynamicData: {
      type: Object,
      required: true,
    },
  },
  emits: { updateSlideDynamicData: Object },

  setup(props, { emit }) {
    const introSlide = ref(cloneDeep(props.slideDynamicData))

    watch(introSlide, () => emit('updateSlideDynamicData', introSlide.value), {
      deep: true,
    })

    const route = useRoute()
    const presentationId = computed(() => route.params.presentationId)

    return {
      introSlide,
      presentationId,
    }
  },
}
</script>
