<template>
  <s3ImageUpload
    ref="s3ImageUploader"
    class="w-40"
    :img-class="imgClass"
    :is-uploadable="Boolean(presentationId)"
    :s3-directory="`presentations/${presentationId}/`"
    :s3-file-name="presentationId ? 'customerProfile.png' : ''"
    :disable-upload="editIsDisallowed"
  />
</template>

<script>
import { ref, computed } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import s3ImageUpload from '@/components/utils/s3/s3ImageUpload.vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'

export default {
  components: {
    s3ImageUpload,
  },
  props: {
    imgClass: {
      type: String,
      default: 'w-40',
    },
  },

  setup() {
    const route = useRoute()
    const presentationIdInput = ref('')
    const presentationId = computed(
      () => route.params.presentationId || presentationIdInput.value,
    )
    const s3ImageUploader = ref(null)
    const uploadImage = async (presentationIdParam) => {
      presentationIdInput.value = presentationIdParam
      await s3ImageUploader.value?.uploadImage()
    }

    const editIsDisallowed = useRfpEditIsDisabled()

    return { presentationId, s3ImageUploader, uploadImage, editIsDisallowed }
  },
}
</script>
