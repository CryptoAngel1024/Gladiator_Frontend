<template>
  <div class="wizard-main-container">
    <h1 class="wizard-main-header2 text-primary">
      Map Stakeholder at the Customer
    </h1>
    <board-members-list
      :board-members-list="stakeholdersInfo.ascBoardMembers"
    />
    <asc-stakeholders :asc-stakeholders="stakeholdersInfo.ascStakeholders" />
  </div>
</template>

<script>
import BoardMembersList from './BoardMembersList.vue'
import AscStakeholders from './AscStakeholders.vue'
import useRfpFieldEditor from '@/components/newRfp/useRfpFieldEditor.js'
export default {
  components: {
    BoardMembersList,
    AscStakeholders,
  },
  setup() {
    const { editIsDisallowed, fieldValue: stakeholdersInfo } =
      useRfpFieldEditor('stakeholders')

    return {
      editIsDisallowed,
      stakeholdersInfo,
    }
  },
}
</script>

<style scoped lang="postcss">
.title-text {
  @apply py-7 w-full min-w-56 pb-2 font-bold text-primary text-2xl;
}
</style>
