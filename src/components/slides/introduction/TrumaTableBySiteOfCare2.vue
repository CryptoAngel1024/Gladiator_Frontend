<template>
  <section class="h-full">
    <TrumaTable :card="card" />
  </section>
</template>
<script>
import TrumaTable from '@/components/slides/introduction/TrumaTable.vue'

export default {
  components: { TrumaTable },
  data() {
    return {
      card: {
        pageNumber: 6,
        tableTitle: 'Academic Center (1)',
        row1: {
          title: '# of DPS SKUs Available',
          joints: '16,000',
          spine: '28,511',
          trauma: '17,800',
        },
        row2: {
          title: 'Avg. $ per Case',
          joints: '$4,500',
          spine: '$6,100',
          trauma: '$19,000',
        },
        row3: {
          title: 'Unique items used Annually',
          joints: '800',
          spine: '225',
          trauma: '1,850',
        },
        row4: {
          title: 'Units ordered Annually',
          joints: '3,800 ',
          spine: '2,800',
          trauma: '18,000',
        },
        row5: {
          title: 'Case Notification Time',
          joints: '3-14 Days',
          spine: '20-24 Days',
          trauma: '2-24 Hrs',
        },
        row6: {
          title: 'Consigned/Owned Model',
          joints: 'Primarily Consigned',
          spine: 'Primarily Consigned',
          trauma: 'Mix',
        },
      },
    }
  },
}
</script>
