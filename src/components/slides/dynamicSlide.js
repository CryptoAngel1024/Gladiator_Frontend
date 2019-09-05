import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { slideDetails } from '@/data/allSlides.js'

export default function dynamicSlide(slideCodeParam) {
  const store = useStore()
  const route = useRoute()

  const link = computed(() =>
    store.getters['rfps/getLinkByHyperLink'](
      route.params.clientName?.replace('-', ' '),
      route.params.hyperLink,
    ),
  )

  const presentationId = computed(
    () => route.params.presentationId || link.value.presentationId,
  )
  const slideCode = computed(() => slideCodeParam || route.params.slideId)

  const slideContent = computed(() =>
    store.getters['rfps/getslideContentBySlideId']({
      presentationId: presentationId.value,
      prePopulatedSlide: slideCode.value,
      hyperLink: route.params.hyperLink?.replace('-', ' '),
      clientName: route.params.clientName?.replace('-', ' '),
    }),
  )

  const displayededSlides = computed(() =>
    store.getters['rfps/getDisplayedSlidesByPresentationId']({
      presentationId: presentationId.value,
      hyperLink: route.params.hyperLink?.replace('-', ' '),
      clientName: route.params.clientName?.replace('-', ' '),
    }),
  )

  const currentSlideNumber = computed(() =>
    route.hash === '#/' ? 1 : route.hash.slice(2)?.split('/')[0],
  )

  const displayedSlide = computed(() => ({
    ...displayededSlides.value[currentSlideNumber.value - 1],
    ...(displayededSlides.value[currentSlideNumber.value - 1].slide || {}),
  }))

  const slideDetail = computed(() =>
    currentSlideNumber.value && displayededSlides.value
      ? {
          ...slideDetails(displayedSlide.value),
          ...displayedSlide.value,
        }
      : undefined,
  )

  return { slideContent, presentationId, slideCode, slideDetail }
}
