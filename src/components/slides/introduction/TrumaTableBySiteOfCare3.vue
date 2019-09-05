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
        pageNumber: 7,
        tableTitle: 'Community Hospital (1)',
        row1: {
          title: '# of DPS SKUs Available',
          joints: '16,000',
          spine: '28,511',
          trauma: '17,800',
        },
        row2: {
          title: 'Avg. $ per Case',
          joints: '$6,100',
          spine: '$9,400',
          trauma: '$2,900',
        },
        row3: {
          title: 'Unique items used Annually',
          joints: '210',
          spine: '145',
          trauma: '2,100',
        },
        row4: {
          title: 'Units ordered Annually',
          joints: '1,100 ',
          spine: '1,500',
          trauma: '4,000',
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
