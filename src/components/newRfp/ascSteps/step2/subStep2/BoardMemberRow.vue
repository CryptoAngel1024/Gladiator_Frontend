<template>
  <div
    class="grid py-2"
    :class="isOverview ? 'grid-cols-3 border-b' : 'grid-cols-4'"
  >
    <input
      v-model.lazy="boardMemberData.name"
      :data-test="`memberName${indexData}`"
      class="presentation-wizard-input w-5/6"
      placeholder="Enter Name Here"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="boardMemberData.speciality"
      :data-test="`memberSpeciality${indexData}`"
      class="presentation-wizard-input w-5/6"
      placeholder="Enter Speciality Here"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="boardMemberData.votingBoardMember"
      :data-test="`voatingBoardMember${indexData}`"
      class="presentation-wizard-input w-5/6"
      placeholder="Enter Voting Board Member Here"
      :disabled="editIsDisallowed"
    />
  </div>
</template>
<script>
import { ref } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  props: {
    boardMember: { type: Object, required: true },
    index: { type: Number, required: true },
  },
  setup(props) {
    const editIsDisallowed = useRfpEditIsDisabled()
    const boardMemberData = ref(props.boardMember)
    const indexData = ref(props.index)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    return { boardMemberData, editIsDisallowed, indexData, isOverview }
  },
}
</script>
