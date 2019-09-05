<template>
  <s3ImageWithPlaceholder
    :s3-directory="
      presentationIdComputed ? `presentations/${presentationIdComputed}/` : ''
    "
    s3-file-name="customerProfile.png"
    :alt="`${name} Avatar`"
    placeholder-class="rounded-xl bg-gray-75"
    img-class="rounded-xl object-contain"
  />
</template>

<script>
import s3ImageWithPlaceholder from './s3ImageWithPlaceholder.vue'

export default {
  components: { s3ImageWithPlaceholder },
  props: {
    presentationId: { type: String, default: '' },
    name: { type: String, default: '' },
  },
  computed: {
    presentationIdComputed() {
      return this.presentationId || this.$route.params.presentationId
    },
  },
}
</script>
