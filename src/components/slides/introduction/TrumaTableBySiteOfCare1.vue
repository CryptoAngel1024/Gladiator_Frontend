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
        pageNumber: 5,
        tableTitle: 'Large Level 1-2 Customer (1)',
        row1: {
          title: '# of DPS SKUs Available',
          joints: '16,000',
          spine: '28,511',
          trauma: '17,800',
        },
        row2: {
          title: 'Avg. $ per Case',
          joints: '$5,100',
          spine: '$8,200',
          trauma: '$2,600',
        },
        row3: {
          title: 'Unique items used Annually',
          joints: '800',
          spine: '180',
          trauma: '2,100',
        },
        row4: {
          title: 'Units ordered Annually',
          joints: '3,400 ',
          spine: '2,200',
          trauma: '15,000',
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
