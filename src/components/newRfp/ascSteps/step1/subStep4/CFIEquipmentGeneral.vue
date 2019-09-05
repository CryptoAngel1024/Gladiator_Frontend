<template>
  <div class="wizard-main-container">
    <h1 v-if="!isOverview" class="wizard-main-header2 text-primary">
      Facility infrastructure
    </h1>
    <h2 class="pb-2 text-base font-bold py-2">
      EQUIPMENT - GENERAL INSTRUMENTATION
    </h2>
    <multi-radio-items
      v-model="facilityInfo.generalInstrunmentation.samllBoneInstrument"
      title="Are there small bone instruments available?"
      :additional-info="{
        No: 'If no, what is needed (i.e. retractors, hooks, osteotomes)?',
      }"
    />
    <multi-radio-items
      v-model="facilityInfo.generalInstrunmentation.generalOrthoTrays"
      title="Does the ASC have general ortho trays?"
      :additional-info="{
        No: 'If no, what is needed (i.e. forceps, Hohmanns, picks)',
      }"
    />
    <multi-radio-items
      v-model="facilityInfo.generalInstrunmentation.plateBenders"
      title="Does the ASC have plate benders available?"
      :additional-info="{
        No: 'If no, what type of benders will be needed?',
      }"
    />
    <h2 class="text-base font-bold leading-none py-4">
      EQUIPMENT - TECHNOLOGY ENABLED
    </h2>
    <multi-radio-items
      v-model="facilityInfo.technologyEnabled.hourRoom"
      title="Is the ASC considering bringing in robotics?"
      :additional-info="{
        No: 'If no, will a robot be acquired?',
      }"
    />

    <multi-radio-items
      v-model="facilityInfo.technologyEnabled.hourRoomReason"
      title="Is a navigation system available?"
    />
    <h2 class="text-base font-bold leading-none py-4">
      EQUIPMENT - DISPOSABLES
    </h2>
    <multi-radio-items-horizon
      v-model="facilityInfo.disposables.misBurrs"
      title="MIS Burrs"
    />
    <multi-radio-items-horizon
      v-model="facilityInfo.disposables.sawBlades"
      title="Saw Blades"
    />
    <multi-radio-items-horizon
      v-model="facilityInfo.disposables.woundClosure"
      title="Wound Closure"
    />
    <multi-radio-items-horizon
      v-model="facilityInfo.disposables.disposableInstrument"
      title="Disposable Instruments (i.e. DRSK, CCIs)"
    />
    <multi-radio-items-horizon
      v-model="facilityInfo.disposables.Bilologics"
      title="Biologics"
    />
    <multi-radio-items-horizon
      v-model="facilityInfo.disposables.surgicalSportsImplants"
      title="Surgical Sports Implants (i.e. anchors, tape, suture)"
    />
    <multi-radio-items-horizon
      v-model="facilityInfo.disposables.nonSterileDisposableStock"
      title="Non-sterile Disposable Stock (i.e. drills bits, k-wires)"
    />
    <div
      v-for="index in 3"
      :key="index"
      class="py-1 flex items-center"
      :class="isOverview ? 'w-full' : 'w-101 justify-between'"
    >
      <div class="flex items-center" :class="isOverview ? 'w-1/2' : 'w-96'">
        <div class="text-subheader py-2 mr-4">others</div>
        <input
          v-model="facilityInfo.disposables.others[index].name"
          placeholder="Please Specify"
          class="presentation-wizard-input"
          :disabled="editIsDisallowed"
        />
      </div>
      <multi-radio-items
        v-model="facilityInfo.disposables.others[index].value"
        class="max-w-max"
      />
    </div>
  </div>
</template>

<script>
import MultiRadioItems from '@/components/newRfp/ascSteps/sharedComponents/MultiRadioItems.vue'
import MultiRadioItemsHorizon from '../../../rfpConfig/MultiRadioItemsHorizon.vue'
import useRfpFieldEditor from '@/components/newRfp/useRfpFieldEditor.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    MultiRadioItems,
    MultiRadioItemsHorizon,
  },
  setup() {
    const { editIsDisallowed, fieldValue: facilityInfo } = useRfpFieldEditor(
      'facilityInfrastructureEquipmentGeneral',
    )
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    return {
      editIsDisallowed,
      facilityInfo,
      isOverview,
    }
  },
}
</script>
