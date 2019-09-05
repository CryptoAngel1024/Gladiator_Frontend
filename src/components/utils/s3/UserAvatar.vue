<template>
  <s3ImageWithPlaceholder
    :s3-directory="email ? `protected/${email}/` : ''"
    s3-file-name="profile.png"
    :alt="`${name} Avatar`"
    :placeholder="initials"
    img-class="rounded-full object-contain text-white"
    :placeholder-class="backgroundclass"
  />
</template>

<script>
import s3ImageWithPlaceholder from './s3ImageWithPlaceholder.vue'
import { avatarDynamicBackground } from '@/utils/avatarDynamicBackground.js'
import { computed } from '@vue/runtime-core'

export default {
  components: { s3ImageWithPlaceholder },
  props: {
    email: { type: String, default: '' },
    name: { type: String, default: '' },
  },
  setup(props) {
    const initials = computed(
      () => props.name.toUpperCase().match(/\b\w/g)?.join('') || '',
    )

    const backgroundclass = computed(() =>
      avatarDynamicBackground(initials.value),
    )
    return { initials, backgroundclass }
  },
}
</script>
