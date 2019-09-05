import { useGtag } from 'vue-gtag-next'
import { computed } from 'vue'
import { router } from '../router/router'

export function gaEvent({
  presentationIdParam = '',
  event_category,
  event_label,
  action = '',
  search_term = null,
}) {
  try {
    const { event } = useGtag()
    const id = router.currentRoute.value.params.presentationId
    const presentationId = computed(() => presentationIdParam || id || '')

    event(action, {
      event_category,
      event_label,
      search_term,
      content_id: presentationId.value,
      content_type: presentationId.value ? 'presentation' : undefined,
    })
  } catch (err) {
    console.warn('GA Tags', err)
  }
}
