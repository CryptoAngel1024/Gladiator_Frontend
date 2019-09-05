<template>
  <s3ImageWithPlaceholder
    :s3-directory="`presentations/${presentationId}/${slideCode}/`"
    :s3-file-name="`image${imageNumber}.png`"
    v-bind="$props"
  />
</template>

<script>
import s3ImageWithPlaceholder from '@/components/utils/s3/s3ImageWithPlaceholder.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  components: { s3ImageWithPlaceholder },
  props: {
    slideCodeProp: {
      type: String,
      required: true,
    },
    presentationIdProp: {
      type: String,
      default: '',
    },
    imageNumber: {
      type: Number,
      default: 1,
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
      default: 'object-contain',
    },
    placeholderClass: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()

    const link = computed(() =>
      store.getters['rfps/getLinkByHyperLink'](
        route.params.clientName?.replace('-', ' '),
        route.params.hyperLink?.replace('-', ' '),
      ),
    )
    const presentationId = computed(
      () => route.params.presentationId || link.value.presentationId,
    )
    const slideCode = computed(
      () => props.slideCodeProp || route.params.slideId,
    )

    return { slideCode, presentationId }
  },
}
</script>
