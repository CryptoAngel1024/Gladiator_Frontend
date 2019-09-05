import { ref, computed, watch } from 'vue'
import { isEqual, cloneDeep } from 'lodash'

export default function versionedApiUpdate({
  currentComputedValue,
  initialLocalValue,
  updateLocalValue,
  updateRemoteValue,
  currentValueIndex,
  localRemoteValuesIsEqual = isEqual,
}) {
  const apiError = ref('')
  const isUpdating = ref({})
  const currentLocalValues = {
    [currentValueIndex.value]: initialLocalValue?.(),
  }
  const currentRemoteValues = {}
  const lastSubmitedLocalValue = {}

  watch(currentValueIndex, () => {
    currentLocalValues[currentValueIndex.value] =
      currentLocalValues[currentValueIndex.value] ?? initialLocalValue?.()
  })

  async function updateRemoteValueThrottled() {
    const currentIndex = currentValueIndex.value
    if (isUpdating.value[currentIndex]) return

    isUpdating.value[currentIndex] = true
    try {
      while (
        !localRemoteValuesIsEqual(
          currentLocalValues[currentIndex],
          currentRemoteValues[currentIndex],
        )
      ) {
        const currentLocalValue = cloneDeep(currentLocalValues[currentIndex])

        if (!currentLocalValue) return

        ensureLocalRemoteValuesIsEqual(currentLocalValue, currentIndex)

        const remoteValue = await updateRemoteValue(currentLocalValue)

        currentRemoteValues[currentIndex] = getCurrentRemoteValue(
          remoteValue,
          currentLocalValue,
        )

        apiError.value = ''

        lastSubmitedLocalValue[currentIndex] = cloneDeep(currentLocalValue)
      }
    } catch (errorMessage) {
      console.error(errorMessage)
      const isVersionErrSlide =
        (errorMessage?.message || errorMessage)?.search?.(
          'draft data is outdated',
        ) >= 0
      const isVersionErrRfp =
        (errorMessage?.message || errorMessage)?.search?.('invalid sate') >= 0

      apiError.value = isVersionErrSlide
        ? 'The slide has been modified remotely. Please reload page.'
        : isVersionErrRfp
        ? 'The presentation has been modified remotely. Please reload page.'
        : errorMessage?.message || errorMessage
    } finally {
      isUpdating.value[currentIndex] = false
    }
  }

  function getCurrentRemoteValue(remoteValue, currentLocalValue) {
    return remoteValue === undefined
      ? currentLocalValue
      : typeof remoteValue === 'string'
      ? JSON.parse(remoteValue)
      : remoteValue
  }

  function ensureLocalRemoteValuesIsEqual(currentLocalValue, currentIndex) {
    if (
      localRemoteValuesIsEqual(
        currentLocalValue,
        lastSubmitedLocalValue[currentIndex],
      )
    ) {
      throw 'Update failed: error updating remote value'
    }
  }

  async function updateValue(newValue) {
    if (
      !currentComputedValue &&
      localRemoteValuesIsEqual(
        newValue,
        currentLocalValues[currentValueIndex.value],
      )
    )
      return

    if (
      currentComputedValue &&
      localRemoteValuesIsEqual(newValue, currentComputedValue.value)
    )
      return

    currentLocalValues[currentValueIndex.value] = newValue

    updateLocalValue(newValue)
    await updateRemoteValueThrottled()
  }

  const isUpdatingComputed = computed(() =>
    Boolean(isUpdating.value[currentValueIndex.value]),
  )

  return {
    apiError,
    updateValue,
    isUpdating: isUpdatingComputed,
  }
}
