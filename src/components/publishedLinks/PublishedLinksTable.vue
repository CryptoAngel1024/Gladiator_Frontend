<template>
  <table class="w-full">
    <thead
      class="bg-gray-75 text-left uppercase w-full rounded-lg main-page-table-header"
    >
      <tr>
        <th></th>
        <th class="px-1">Link Name</th>
        <th class="px-1">Client Name</th>
        <th class="px-1">Views</th>
        <th class="px-1">Created On</th>
        <th />
        <th />
      </tr>
    </thead>
    <tbody class="divide-y">
      <published-link-row
        v-for="link in publishedLinks"
        :key="link.id"
        :link="link"
        :data-test="`published-link-row-${link.id}`"
      />
    </tbody>
  </table>
</template>
<script>
import PublishedLinkRow from './PublishedLinkRow.vue'
export default {
  components: { PublishedLinkRow },
  props: {
    publishedLinks: { type: Array, required: true },
  },

  // setup(props) {
  //   const links = [].concat(...props.publishedLinks.map(({ links }) => links))
  //   return { links }
  // },
}
</script>
