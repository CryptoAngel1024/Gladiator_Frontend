<template>
  <div>
    <s3Image
      v-if="s3Directory && s3FileName"
      class="w-full h-full border"
      :class="imgClass"
      :s3-directory="s3Directory"
      :s3-file-name="s3FileName"
      :alt="alt"
      @image-fetched="imageExists = true"
    />
    <div
      v-if="!imageExists"
      class="w-full h-full flex items-center justify-center"
      :class="`${imgClass} ${placeholderClass}`"
    >
      <h1>
        {{ placeholder }}
      </h1>
    </div>
  </div>
</template>

<script>
import s3Image from '@/components/utils/s3/s3Image.vue'
import { ref } from 'vue'

export default {
  components: { s3Image },
  props: {
    s3Directory: {
      type: String,
      default: '',
    },
    s3FileName: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    imgClass: {
      type: String,
      default: '',
    },
    placeholderClass: {
      type: String,
      default: '',
    },
  },
  setup() {
    const imageExists = ref(false)
    return { imageExists }
  },
}
</script>
