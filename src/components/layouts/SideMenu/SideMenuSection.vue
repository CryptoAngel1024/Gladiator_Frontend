<template>
  <section class="flex flex-col">
    <div class="text-left uppercase px-4 pt-7 font-semibold text-gray-425">
      {{ sectionData.name }}
    </div>
    <side-bar-item
      v-for="item in sectionData.sectionItems"
      :key="item.pathName"
      :item="item"
    />
  </section>
</template>
<script>
import SideBarItem from './SideMenuItem.vue'

export default {
  components: {
    SideBarItem,
  },
  props: {
    sectionData: { type: Object, required: true },
  },
}
</script>
