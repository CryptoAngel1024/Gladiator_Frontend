<template>
  <div class="flex flex-row w-full tab-box-shadow bg-white text-center text-xs">
    <tab-bar-item v-for="(item, index) in items" :key="index" :item="item" />
  </div>
</template>
<script>
import TabBarItem from './TabBarItem.vue'
export default {
  components: { TabBarItem },
  props: {
    items: { type: Array, required: true },
  },
}
</script>

<style scoped lang="postcss">
.tab-box-shadow {
  box-shadow: inset 0px 1px 0px #e2e2ea, inset 0px -1px 0px #e2e2ea;
}
</style>
