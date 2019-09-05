<template>
  <div class="wizard-main-container">
    <h1 v-if="!isOverview" class="wizard-main-header2 text-primary">
      Facility Infrastructure
    </h1>
    <h2 class="pb-2 text-base font-bold py-2">EQUIPMENT - CAPITAL</h2>
    <MultiRadioItems
      v-model="equipmentCapitalInfor.isCArmis"
      title="Is there a C-Arm in the ASC?"
      :additional-info="{ Yes: 'If yes, what size?' }"
    />
    <MultiRadioItems
      v-model="equipmentCapitalInfor.isHana"
      title="Is there a Hana® Orthopedic Surgery Table?"
      :additional-info="{ No: 'If no, will one be needed?' }"
    />
    <MultiRadioItems
      v-model="equipmentCapitalInfor.isASC"
      title="Does the ASC have power equipment?"
      :additional-info="{ No: 'If no, what power is needed?' }"
    />
    <MultiRadioItems
      v-model="equipmentCapitalInfor.areLegHolders"
      title="Are there leg holders / limb positioners?"
      :additional-info="{ Yes: 'If yes, what type?' }"
    />
    <MultiRadioItems
      v-model="equipmentCapitalInfor.haveArthroscopic"
      title="Does the ASC currently have Arthroscopic Towers?"
      :additional-info="{
        Yes: 'If yes, who is the vendor and are they under contract for the towers?',
        No: 'If no, are they interested in acquiring arthroscopic towers?',
      }"
    />
  </div>
</template>

<script>
import useRfpFieldEditor from '@/components/newRfp/useRfpFieldEditor.js'
import MultiRadioItems from '@/components/newRfp/ascSteps/sharedComponents/MultiRadioItems.vue'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: { MultiRadioItems },
  setup() {
    const { fieldValue: equipmentCapitalInfor } = useRfpFieldEditor(
      'facilityInfrastructureEquipmentCapital',
    )
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    return {
      equipmentCapitalInfor,
      isOverview,
    }
  },
}
</script>
