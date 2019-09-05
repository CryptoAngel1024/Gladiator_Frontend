<template>
  <div class="card-container" :class="cardStyle">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    cardStyle: {
      type: String,
      required: false,
      default: () => 'py-4 px-8 bg-white',
    },
  },
}
</script>
<style lang="postcss" scoped>
.card-container {
  @apply flex border;
}
</style>
