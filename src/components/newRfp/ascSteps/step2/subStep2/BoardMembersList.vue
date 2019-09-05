<template>
  <h1 class="title-text">Board Members of the ASC</h1>
  <div class="grid grid-flow-row" :class="isOverview ? 'w-3/4 ' : ''">
    <div
      class="grid my-2"
      :class="
        isOverview
          ? 'grid-cols-3 bg-slidColor-1 text-white py-2 rounded-t-lg'
          : 'grid-cols-4 text-lg font-semibold'
      "
    >
      <p class="pl-2">Name</p>

      <p class="pl-2">Speciality</p>

      <p class="pl-2">Voting Board Member</p>
    </div>
    <board-member-row
      v-for="(member, index) in boardMembersList"
      :key="index"
      :board-member="member"
      :index="index"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import BoardMemberRow from './BoardMemberRow.vue'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    BoardMemberRow,
  },
  props: {
    boardMembersList: { type: Object, required: true },
  },
  setup(props) {
    const boardMembersData = ref(props.boardMembersList)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    return { boardMembersData, isOverview }
  },
}
</script>
<style scoped lang="postcss">
.title-text {
  @apply w-full min-w-56 py-2 font-bold text-gray-500 uppercase;
}
input:disabled {
  background-color: white;
}
</style>
