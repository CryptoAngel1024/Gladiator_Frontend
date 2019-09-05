<template>
  <div class="flex py-3 flex-col items-start w-full min-w-56">
    <p class="font-bold">
      Does this business unit currently have a contract with the customer ?
    </p>
    <YesNoSelection
      :title="'Joint Reconstruction'"
      :selection="businessAreasInfo.jointReconstruction"
      :key-name="'jointReconstruction'"
      @change-option="updateSelection"
    />
    <YesNoSelection
      :title="'Trauma & Extremities'"
      :selection="businessAreasInfo.traumaExtremities"
      :key-name="'traumaExtremities'"
      @change-option="updateSelection"
    />
    <YesNoSelection
      :title="'Mitek Sports Medicine'"
      :selection="businessAreasInfo.mitekSportsMedicine"
      :key-name="'mitekSportsMedicine'"
      @change-option="updateSelection"
    />
    <YesNoSelection
      :title="'Spine'"
      :selection="businessAreasInfo.spine"
      :key-name="'spine'"
      @change-option="updateSelection"
    />
    <YesNoSelection
      :title="'Ethicon'"
      :selection="businessAreasInfo.ethicon"
      :key-name="'ethicon'"
      @change-option="updateSelection"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import YesNoSelection from './YesNoSelection.vue'

export default {
  components: {
    YesNoSelection,
  },
  props: {
    elementInfo: { type: Object, required: true },
  },
  setup(props) {
    const businessAreasInfo = ref(props.elementInfo)
    const updateSelection = ({ keyName, updatedSelectedValue }) => {
      businessAreasInfo.value[keyName] = updatedSelectedValue
    }

    return {
      businessAreasInfo,
      updateSelection,
    }
  },
}
</script>
