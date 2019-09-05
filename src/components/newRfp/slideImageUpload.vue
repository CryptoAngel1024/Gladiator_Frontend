<template>
  <s3ImageUpload
    class="rounded-lg border-dashed border-2 w-48 h-28 mt-5"
    img-class="w-50"
    :s3-directory="`presentations/${presentationId}/${slideCode}/`"
    :s3-file-name="`image${imageNumber}.png`"
    :disable-upload="editIsDisallowed"
  />
</template>

<script>
import s3ImageUpload from '@/components/utils/s3/s3ImageUpload.vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  components: { s3ImageUpload },
  props: {
    imageNumber: {
      type: Number,
      default: 1,
    },
    slideId: {
      type: String,
      default: '',
    },
    imgClass: {
      type: String,
      default: '',
    },
    isUploadable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['imageFetched', 'imageSelected', 'imageNotFound'],

  setup(props) {
    const route = useRoute()
    const slideCode = computed(() => props.slideId || route.params.slideId)
    const presentationId = computed(() => route.params.presentationId)

    const editIsDisallowed = computed(
      () => !props.isUploadable || useRfpEditIsDisabled().value,
    )

    return {
      editIsDisallowed,
      slideCode,
      presentationId,
    }
  },
}
</script>
