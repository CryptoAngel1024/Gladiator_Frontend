<template>
  <div
    v-if="isOverview"
    class="flex flex-row space-x-4 my-3 w-4/5 bg-slidColor-1 text-white py-2 rounded-t-lg items-center"
  >
    <div class="basis-2/4 pl-2">SPECIALITY</div>
    <div class="basis-1/4 pl-3">TAM</div>
    <div class="basis-1/4 pl-3">DPS SALES</div>
  </div>
  <h1 v-else class="title-text">Speciality</h1>

  <tam-row
    v-for="(tamSpeciality, index) in tamData"
    :key="index"
    :tam-speciality="tamSpeciality"
    :index="index"
  />
</template>

<script>
import { ref } from 'vue'
import TamRow from './TamRow.vue'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    TamRow,
  },
  props: {
    tamInfo: { type: Object, required: true },
  },
  setup(props) {
    const tamData = ref(props.tamInfo)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    return { tamData, isOverview }
  },
}
</script>

<style scoped lang="postcss">
.title-text {
  @apply py-3 font-bold  text-gray-500 uppercase;
}
</style>
