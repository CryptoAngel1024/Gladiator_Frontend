<template>
  <div
    class="flex flex-row space-x-4 items-center"
    :class="isOverview ? 'w-4/5 border-b py-3' : 'w-full my-3'"
  >
    <h1
      class="font-semibold text-lg uppercase"
      :class="isOverview ? 'w-2/4' : 'w-2/5'"
    >
      {{ tamSpecialityData.title }}
    </h1>
    <input
      v-model.lazy="tamSpecialityData.tam"
      class="presentation-wizard-input"
      :class="isOverview ? 'w-1/4' : 'w-1/5'"
      placeholder="TAM"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="tamSpecialityData.dpsSales"
      class="presentation-wizard-input"
      :class="isOverview ? 'w-1/4' : 'w-1/5'"
      placeholder="DPS SALES"
      :disabled="editIsDisallowed"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {},
  props: {
    tamSpeciality: { type: Object, required: true },
  },
  setup(props) {
    const editIsDisallowed = useRfpEditIsDisabled()
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    const tamSpecialityData = ref(props.tamSpeciality)
    return { tamSpecialityData, editIsDisallowed, isOverview }
  },
}
</script>
