<template>
  <ol class="rounded flex items-center bg-grey-light text-sm text-gray-500">
    <SvgIcon class="w-4 h-4" name="homepage" />
    <li class="px-2">
      <router-link :to="{ name: 'dashboard' }" class="pr-2"> Home </router-link
      >\
    </li>

    <li v-for="link in links" :key="link.name" class="pr-2">
      <router-link :to="link.path" class="pr-2"> {{ link.name }} </router-link>\
    </li>

    <li
      class="font-medium text-emerald-900 text-base"
      data-test="header-bread-crumps-page-name"
    >
      {{ pageName }}
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    pageName: {
      type: String,
      required: true,
    },
    links: {
      type: Array,
      required: true,
    },
  },
}
</script>
