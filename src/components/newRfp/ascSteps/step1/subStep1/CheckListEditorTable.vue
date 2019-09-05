<template>
  <div class="flex flex-grow flex-col items-start">
    <table class="w-full gray-61">
      <tbody>
        <checklist-editor-row
          v-for="(editor, index) in allChecklistEditorsData"
          :key="index"
          :editor="editor"
          :index="index"
          @update-editor="updateTeamData"
        />
      </tbody>
    </table>
  </div>
  <dp-button
    v-if="!isOverview"
    type="button"
    text="+ Add More Checklist Editors"
    class="py-4 border border-dashed font-bold text-gray-500 mt-6 mb-2 w-full"
    :disabled="editIsDisallowed"
    @click="allChecklistEditorsData.push({})"
  />
</template>
<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import DpButton from '@/components/buttons/DpButton.vue'
import ChecklistEditorRow from './ChecklistEditorRow.vue'
import { computed, ref, watch } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import { isValidEmail } from '@/utils/validationFunctions.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'
import { cloneDeep } from 'lodash'

function getUpdatedPresentation(
  presentation,
  allChecklistEditorsData,
  updatedUser,
  index,
) {
  const oldUser = { ...allChecklistEditorsData[index] }

  if (updatedUser) {
    if (oldUser.internalUserId && oldUser.email !== updatedUser.email) {
      // this is a different user in the db
      updatedUser.internalUserId = null
    }

    allChecklistEditorsData.splice(index, 1, updatedUser)

    let allEmailsAreValid = true
    allChecklistEditorsData.forEach(({ email }) => {
      if (!isValidEmail(email)) {
        allEmailsAreValid = false
      }
    })
    if (!allEmailsAreValid) return
  } else {
    allChecklistEditorsData.splice(index, 1)
  }

  const nonCheckListEditorUsers =
    presentation?.internalUserDetails
      ?.filter(
        ({ role }) => role !== 'OWNER' && role !== 'CUSTOMER_CHECKLIST_EDITOR',
      )
      .map((user) => ({ ...user })) || []

  const updatedPresentation = JSON.parse(
    JSON.stringify({
      ...presentation,
      internalUserDetails: [
        ...nonCheckListEditorUsers,
        ...allChecklistEditorsData,
      ],
    }),
  )
  return updatedPresentation
}
export default {
  components: { DpButton, ChecklistEditorRow },

  setup() {
    const store = useStore()
    const route = useRoute()

    const presentationId = computed(() => route.params.presentationId)

    const isNewRfp = computed(() => !presentationId.value)

    const presentation = computed(() =>
      store.getters['rfps/getPresentationById'](presentationId.value),
    )
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    const editIsDisallowed = useRfpEditIsDisabled(true)

    const checklistEditorsComputed = computed(
      () =>
        presentation.value.internalUserDetails?.filter(
          ({ role }) => role === 'CUSTOMER_CHECKLIST_EDITOR',
        ) || [],
    )

    const allChecklistEditorsData = ref(
      checklistEditorsComputed.value.length > 0
        ? checklistEditorsComputed.value
        : [{}],
    )

    watch(
      checklistEditorsComputed,
      () =>
        (allChecklistEditorsData.value =
          checklistEditorsComputed.value.length > 0
            ? cloneDeep(checklistEditorsComputed.value)
            : [{}]),
    )

    const updateTeamData = (updatedUser, index) => {
      const updatedPresentation = getUpdatedPresentation(
        presentation,
        allChecklistEditorsData,
        updatedUser,
        index,
      )

      if (isNewRfp.value) {
        store.commit('rfps/setCurrentRfp', updatedPresentation)
      } else {
        store.commit('rfps/updateRfp', updatedPresentation)
      }
    }

    return {
      allChecklistEditorsData,
      updateTeamData,
      isOverview,
      editIsDisallowed,
    }
  },
}
</script>

<style scoped lang="postcss">
input {
  @apply text-base font-bold leading-relaxed py-4 px-3 rounded-lg bg-gray-50;
}

th {
  @apply py-3 text-base font-normal font-Arial;
}
</style>
