<template>
  <div class="flex flex-row w-full bg-white text-center text-xs rounded-t-xl">
    <router-link
      v-for="(item, index) in tabItems"
      :key="index"
      :to="{ name: `${item.link}` }"
      class="py-2 mx-8 text-base text-gray-375 border-t-4 font-bold border-transparent tab-item"
    >
      {{ item.title }}
    </router-link>
  </div>
</template>

<script setup>
const tabItems = [
  {
    title: 'Users',
    link: 'overview-users',
  },
  {
    title: 'New Users',
    link: 'overview-newusers',
  },
  {
    title: 'Average engagement time',
    link: 'overview-engagement',
  },
]
</script>

<style scoped lang="postcss">
.router-link-active.tab-item {
  @apply border-blue-750;
}
</style>
