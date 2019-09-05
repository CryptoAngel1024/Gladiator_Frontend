<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    return { symbolId }
  },
}
</script>
