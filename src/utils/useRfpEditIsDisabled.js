import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export function useRfpEditIsDisallowed(
  presentationId,
  presentationState,
  rootGetters,
) {
  const storeGetters = rootGetters || useStore().getters
  const route = !rootGetters && useRoute()

  const presentation = computed(
    () =>
      presentationState ||
      storeGetters['rfps/getPresentationById'](
        presentationId || route.params.presentationId,
      ),
  )

  const userId = computed(() => storeGetters['auth/userID'])

  const userInternalId = computed(() => storeGetters['setting/userId'])

  const role = computed(
    () =>
      presentation.value?.internalUserDetails?.find(
        (user) =>
          user.userId === userId.value || user.userId === userInternalId.value,
      )?.role,
  )
  const isChecklistEditor = computed(
    () => role.value === 'CUSTOMER_CHECKLIST_EDITOR',
  )

  const presentationOwner = computed(() => presentation.value?.owner)

  const wizardStep = computed(() =>
    route ? route.params.step || 1 : undefined,
  )

  const editIsDisallowed = computed(
    () =>
      Boolean(role.value) &&
      !(
        role.value == 'EDITOR' ||
        role.value == 'OWNER' ||
        presentationOwner.value == userInternalId.value ||
        (isChecklistEditor.value && wizardStep.value == 1)
      ),
  )

  return { editIsDisallowed, isChecklistEditor }
}

export function useRfpEditIsDisabled(disallowChecklistEditors = false) {
  const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
  const { editIsDisallowed, isChecklistEditor } = useRfpEditIsDisallowed()

  const editIsDisabled = computed(
    () =>
      isOverview.value ||
      editIsDisallowed.value ||
      (disallowChecklistEditors && isChecklistEditor.value),
  )

  return editIsDisabled
}
