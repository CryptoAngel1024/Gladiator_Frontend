<template>
  <router-link
    :to="{ name: `${item.link}` }"
    class="w-40 pt-6 pb-6 mx-1 text-base font-bold tab-item text-accent-blue"
  >
    {{ item.title }}
  </router-link>
</template>
<script>
export default {
  props: {
    item: { type: Object, required: true },
  },
}
</script>

<style scoped lang="postcss">
.tab-item {
  @apply text-black;
}
.router-link-active.tab-item {
  @apply border-b-4 border-accent-blue text-accent-blue;
}
</style>
