<template>
  <label
    v-if="$store.getters['auth/email']"
    class="flex flex-col items-center rounded-lg tracking-wide cursor-pointer border-dashed border-2 relative"
    :class="imageExists || selectedFileSrc ? '' : 'px-14 py-6'"
  >
    <img
      v-if="!imageExists && selectedFileSrc"
      class="w-full h-full object-contain align-middle"
      :class="imgClass"
      :src="selectedFileSrc"
    />
    <h1 v-else-if="!imageExists" class="text-6xl my-auto">+</h1>
    <input
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
      @image-not-found="imageNotFound"
    />
    <button
      v-if="imageExists && allowImgDelete"
      class="absolute bottom-0 right-0 z-10 w-8 h-8"
      @click.prevent="deleteImage()"
    >
      <svg-icon class="w-8 h-8" name="error" />
    </button>
  </label>
  <div
    v-else
    class="flex flex-col items-center rounded-lg tracking-wide cursor-pointer border-dashed border-2"
    :class="imageExists ? '' : 'px-14 py-6'"
  />
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
    allowImgDelete: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'imageFetched',
    'imageSelected',
    'imageDeleted',
    'onImageNotFound',
    'imageNotFound',
  ],

  setup(props, { emit }) {
    const {
      uploadImage,
      imageExists,
      uploadedS3FileName,
      s3ImageViewer,
      selectImage,
      selectedFileSrc,
      imageFetched,
      imageNotFound,
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
      imageNotFound,
      deleteImage,
    }
  },
}
</script>
