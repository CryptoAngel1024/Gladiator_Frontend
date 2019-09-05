<template>
  <div class="wizard-main-container">
    <h1 class="wizard-main-header2 text-primary">Facility infrastructure</h1>
    <h2 class="pb-2 text-base font-bold py-2">OPERATING / SURGICAL</h2>
    <div class="w-full">
      <div :class="isOverview ? 'flex items-center w-full' : ''">
        <h2 class="font-bold text-gray-500" :class="isOverview ? 'w-1/2' : ''">
          How many operating rooms (ORs) are at the ASC?
        </h2>
        <input
          v-model="facilityInfo.surgical.operatingRoom"
          placeholder="Type Something here ..."
          class="presentation-wizard-input w-full my-2 max-w-xs"
          :class="isOverview ? 'description mb-2 text-indigo-750' : ''"
          :disabled="editIsDisallowed"
        />
      </div>

      <multi-radio-items
        v-model="facilityInfo.surgical.fullRoom"
        :title="'Does the ASC have a 23- hour room ?'"
      />
      <multi-radio-items
        v-model="facilityInfo.surgical.capacity"
        :title="'Does the ASC have surgical capacity / bandwidth available for a total joint program?'"
      />

      <h2 class="font-bold py-4">STERILE PROESSING DEPARTMENT(SPD)</h2>
      <multi-radio-items
        v-model="facilityInfo.processDepartment.fullRoom"
        title="Is sterile processing in-house or off-site?"
        :options="['In-house', 'Off-site']"
        :additional-info="{
          'In-house': 'If in-house, how late does the SPD run?',
        }"
      />

      <multi-radio-items
        v-model="facilityInfo.processDepartment.sterileStorage"
        :title="'Is there on-site sterile storage available?'"
        :additional-info="{
          Yes: 'If yes, how much shelf space?',
        }"
      />

      <multi-radio-items
        v-model="facilityInfo.processDepartment.tools"
        :title="'Does the ASC use containers or Sterile Wrap?'"
        :options="['Containers', 'Sterile Wrap']"
        :additional-info="{
          Containers:
            'If using containers, how often do they experience an event (i.e. filter popping up)?',
          'Sterile Wrap':
            'If using sterile wrap, how often do they experience holes in the wrap?',
        }"
      />
      <div :class="isOverview ? 'flex items-center w-full' : ''">
        <h2 class="text-xs text-gray-800" :class="isOverview ? 'w-1/2' : ''">
          What are the ASC’s per tray sterilization costs?
        </h2>
        <input
          v-model="facilityInfo.processDepartment.sterilizationCosts"
          placeholder="Type Something here ..."
          class="presentation-wizard-input w-full p-4 rounded-md my-2 max-w-xs"
          :class="
            isOverview ? 'description mb-2 text-indigo-750 ' : 'my-2 px-3 w-1/4'
          "
          :disabled="editIsDisallowed"
        />
      </div>

      <multi-radio-items
        v-model="facilityInfo.processDepartment.drillbits"
        :title="'Is the ASC reprocessing drills bits?'"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import { cloneDeep } from 'lodash'
import MultiRadioItems from '@/components/newRfp/ascSteps/sharedComponents/MultiRadioItems.vue'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    MultiRadioItems,
  },

  setup() {
    const store = useStore()
    const route = useRoute()
    const editIsDisallowed = useRfpEditIsDisabled()

    const presentationId = computed(() => route.params.presentationId)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    const presentationState = computed(() =>
      store.getters['rfps/getPresentationById'](presentationId.value),
    )
    const informationComputed = computed(
      () => presentationState.value.facilityInfrastructure,
    )
    const facilityInfo = ref(cloneDeep(informationComputed.value))
    watch(
      presentationId,
      () => (facilityInfo.value = cloneDeep(informationComputed.value)),
    )
    const updateFacilityInfo = () => {
      const updatedPresentation = JSON.parse(
        JSON.stringify({
          ...presentationState.value,
          facilityInfrastructure: facilityInfo.value,
        }),
      )
      store.commit('rfps/updateRfp', updatedPresentation)
    }

    watch(facilityInfo, updateFacilityInfo, {
      deep: true,
    })

    return {
      editIsDisallowed,
      facilityInfo,
      isOverview,
    }
  },
}
</script>
<style scoped lang="postcss">
.description {
  font-weight: bold !important;
  margin-left: 3px;
}
</style>
