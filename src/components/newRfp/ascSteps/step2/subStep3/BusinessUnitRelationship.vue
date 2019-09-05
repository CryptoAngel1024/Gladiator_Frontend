<template>
  <h1 class="title-text">Outline the BU cusotmer relationships</h1>
  <div
    class="flex flex-row w-full space-x-4"
    :class="
      isOverview ? 'bg-slidColor-1 text-white py-2 rounded-t-lg px-2' : ''
    "
  >
    <h1 class="basis-1/5 font-normal">Business Unit</h1>
    <h1 class="basis-1/5 font-normal">
      Is the BU currently engaged with customer
    </h1>
    <h1 class="basis-1/5 font-normal">
      What is rating of the BU's relationship with the customer?
    </h1>
    <h1 class="basis-1/5 font-normal">
      When did the BU last engage with the customer?
    </h1>
    <h1 class="basis-1/5 font-normal">
      Describe the last engagement of this BU with the customer
    </h1>
  </div>
  <business-unit-relationship-row
    v-for="(businessUnitRelation, index) in buRelationshipData"
    :key="index"
    :business-unit-relation="businessUnitRelation"
    :index="index"
  />
</template>

<script>
import { ref } from 'vue'
import BusinessUnitRelationshipRow from './BusinessUnitRelationshipRow.vue'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    BusinessUnitRelationshipRow,
  },
  props: {
    buRelationshipInfo: { type: Object, required: true },
  },
  setup(props) {
    const buRelationshipData = ref(props.buRelationshipInfo)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    return { buRelationshipData, isOverview }
  },
}
</script>

<style scoped lang="postcss">
.title-text {
  @apply py-6 font-bold text-gray-500 uppercase;
}
</style>
