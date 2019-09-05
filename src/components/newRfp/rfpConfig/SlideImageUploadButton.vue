<template>
  <button
    v-if="!isOverview"
    type="button"
    class="flex slide-image-upload-button font-bold p-2"
    :disabled="editIsDisallowed"
    @click="toggleModal(), slideImgUploadGaLog()"
  >
    Upload a Slide Image
  </button>
  <BaseModal
    v-if="s3UploadModal"
    title="S3 Image Uploader"
    :close-dialog="toggleModal"
  >
    <div class="modal flex flex-col space-y-4" style="width: 30vw">
      <div class="modal__header flex px-5 pt-5 justify-between">
        <h3 class="font-bold text-base text-black text-xl">Upload New file</h3>
        <button class="text-gray-500" type="button" @click="toggleModal">
          X
        </button>
      </div>
      <div class="modal__body px-5 pb-5">
        <s3ImageUploader
          img-class="w-50"
          :s3-directory="`presentations/${presentationId}/${slideCode}/`"
          s3-file-name="image1.png"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from '@/components/utils/container/BaseModal.vue'
import { computed, ref } from 'vue'
import s3ImageUploader from '@/components/utils/s3/s3ImageUploader.vue'
import { useRoute } from 'vue-router'
import { gaEvent } from '@/utils/GA_Event.js'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    BaseModal,
    s3ImageUploader,
  },
  props: {
    slideCode: {
      type: String,
      required: true,
    },
  },
  setup() {
    const route = useRoute()
    const s3UploadModal = ref(false)
    const presentationId = computed(() => route.params.presentationId)
    const toggleModal = () => {
      s3UploadModal.value = !s3UploadModal.value
    }

    const slideImgUploadGaLog = () => {
      gaEvent({
        action: 'slide-image-upload',
        event_category: 'dashboard',
        event_label: 'User-clicked-slide-image-upload-btn',
      })
    }

    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    const editIsDisallowed = useRfpEditIsDisabled()

    return {
      s3UploadModal,
      toggleModal,
      presentationId,
      slideImgUploadGaLog,
      isOverview,
      editIsDisallowed,
    }
  },
}
</script>
<style>
.slide-image-upload-button {
  background-color: #2979ff;
  color: white;
  border-radius: 7px;
}
</style>
