<template>
  <div class="flex flex-col">
    <link-detail-item
      v-for="link in links"
      :key="link.id"
      :data-test="`link-detail-item-${link.id}`"
      :link="link"
    />
  </div>
</template>
<script>
import LinkDetailItem from './LinkDetailItem.vue'
export default {
  components: {
    LinkDetailItem,
  },
  props: { links: { type: Array, required: true } },
}
</script>
