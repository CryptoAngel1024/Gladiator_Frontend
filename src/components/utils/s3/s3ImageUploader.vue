<template>
  <div class="h-64">
    <div v-if="!imageExists">
      <img class="m-auto" src="@/assets/images/drag_file.png" alt="drag-file" />
      <label class="cursor-pointer">
        <p class="text-center text-lg font-bold text-black">Drag file here</p>
        <input
          class="hidden"
          type="file"
          accept="image/*"
          name="s3_upload"
          @input="selectImage($event.target.files)"
        />
      </label>
      <p class="text-center text-black">or</p>
    </div>
    <s3Image
      v-else
      ref="s3ImageViewer"
      class="w-full h-full object-contain"
      :class="imgClass"
      :s3-directory="s3Directory"
      :s3-file-name="uploadedS3FileName"
      @image-fetched="imageFetched"
    />
  </div>
  <label
    class="flex items-center rounded-lg cursor-pointer border-blue-400 border-2 py-2 px-2 w-9/12 m-auto mt-4"
  >
    <h1 class="text-blue-400 flex m-auto">Browse your computer</h1>
    <input
      class="hidden"
      type="file"
      accept="image/*"
      name="s3_upload"
      @input="selectImage($event.target.files)"
    />
    <s3Image
      ref="s3ImageViewer"
      class="w-full h-full object-contain hidden"
      :class="imgClass"
      :s3-directory="s3Directory"
      :s3-file-name="uploadedS3FileName"
      @image-fetched="imageFetched"
    />
  </label>
  <button
    class="text-sm text-gray-600 mt-2 mx-auto flex"
    type="button"
    @click="s3ImgUploaderCancleGaLog()"
  >
    Cancel
  </button>
</template>

<script>
import s3Image from './s3Image.vue'
import s3ImageUploader from './s3ImageUploader.js'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: { s3Image },
  props: {
    s3Directory: {
      type: String,
      required: true,
    },
    s3FileName: {
      type: String,
      required: true,
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

  setup(props, { emit }) {
    const {
      uploadImage,
      imageExists,
      uploadedS3FileName,
      s3ImageViewer,
      selectImage,
      selectedFileSrc,
      imageFetched,
    } = s3ImageUploader(props, { emit })

    const s3ImgUploaderCancleGaLog = () => {
      gaEvent({
        action: 's3-Image-uploader-cancel-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-s3-Image-uploader-cancel-btn',
      })
    }
    return {
      uploadImage,
      imageExists,
      uploadedS3FileName,
      s3ImageViewer,
      selectImage,
      selectedFileSrc,
      imageFetched,
      s3ImgUploaderCancleGaLog,
    }
  },
}
</script>
