import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default function useSlideSectionLink(categoryName) {
  const route = useRoute()
  const store = useStore()

  const presentationId = computed(() => route.params.presentationId)
  const hyperLink = computed(() => route.params.hyperLink)

  const enabledSlideNumberPerCategory = computed(
    () =>
      1 +
      store.getters['rfps/enabledSlideNumberPerCategory']({
        presentationId: presentationId.value,
        slideCategory: categoryName.value || categoryName,
        hyperLink: hyperLink.value,
        clientName: route.params.clientName?.replace('-', ' '),
      }),
  )

  const linkToEnabledSlidePerCategory = computed(() =>
    enabledSlideNumberPerCategory.value
      ? {
          name: hyperLink.value ? 'present' : 'slide',
          hash: `#/${
            (categoryName.value || categoryName) == 'INTRODUCTION'
              ? enabledSlideNumberPerCategory.value + 1
              : enabledSlideNumberPerCategory.value
          }`,
          params: {
            presentationId: presentationId.value,
            hyperLink: hyperLink.value,
            clientName: route.params.clientName?.replace('-', ' '),
          },
        }
      : route.hash,
  )

  return { linkToEnabledSlidePerCategory }
}
