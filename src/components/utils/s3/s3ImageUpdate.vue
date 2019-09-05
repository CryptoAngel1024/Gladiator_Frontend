<template>
  <div class="relative flex">
    <div
      class="my-4 border rounded-full w-40 h-40 relative flex items-center justify-center overflow-hidden"
    >
      <label
        v-if="$store.getters['auth/email']"
        class="flex flex-col items-center rounded-lg tracking-wide cursor-pointer"
        :class="imageExists || selectedFileSrc ? '' : 'px-14 py-6'"
      >
        <img
          v-if="!imageExists && selectedFileSrc"
          class="w-full h-full object-contain align-middle"
          :class="imgClass"
          :src="selectedFileSrc"
        />
        <h1 v-else-if="!imageExists">
          <svg-icon name="account" class="w-20 h-36" />
        </h1>
        <input
          id="s3_upload"
          class="hidden"
          type="file"
          accept="image/*"
          name="s3_upload"
          :disabled="disableUpload"
          @input="selectImage($event.target.files)"
        />
        <s3Image
          ref="s3ImageViewer"
          class="w-full h-full object-contain"
          :class="imgClass"
          :s3-directory="s3Directory"
          :s3-file-name="uploadedS3FileName"
          @image-fetched="imageFetched"
        />
      </label>
      <div
        v-else
        class="flex flex-col items-center rounded-lg tracking-wide cursor-pointer border-dashed border-2"
        :class="imageExists ? '' : 'px-14 py-6'"
      />
    </div>
    <label
      v-if="!imageExists"
      for="s3_upload"
      class="absolute bottom-7 left-30 z-10 w-10 h-10 cursor-pointer"
      ><svg-icon class="w-10 h-10" name="plus"
    /></label>
    <button
      v-if="imageExists"
      class="absolute bottom-32 left-32 z-10 w-8 h-8"
      @click="deleteImage()"
    >
      <svg-icon class="w-8 h-8" name="error" />
    </button>

    <label
      v-if="imageExists"
      for="s3_upload"
      class="p-2 border mx-6 my-auto rounded-xl text-secondary border-secondary font-bold text-center cursor-pointer"
    >
      Change Picture
    </label>
  </div>
</template>

<script>
import s3Image from './s3Image.vue'
import s3ImageUploader from './s3ImageUploader.js'

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
    disableUpload: {
      type: Boolean,
      default: false,
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
      deleteImage,
    } = s3ImageUploader(props, { emit })

    return {
      uploadImage,
      imageExists,
      uploadedS3FileName,
      s3ImageViewer,
      selectImage,
      selectedFileSrc,
      imageFetched,
      deleteImage,
    }
  },
}
</script>
