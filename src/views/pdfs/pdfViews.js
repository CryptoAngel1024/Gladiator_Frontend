import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export function usePdfView() {
  const route = useRoute()
  const store = useStore()
  const errorMessage = ref('')
  const loading = ref(false)

  const isPdfExportPage = computed(() => Boolean(route.query.token))

  async function fetchRfpOrLink() {
    errorMessage.value = ''
    loading.value = true

    const { err } = route.params.hyperLink
      ? await store.dispatch(
          isPdfExportPage.value
            ? 'rfps/getLinkByHyperLinkAndToken'
            : 'rfps/getLinkByHyperLink',
          {
            hyperLink: route.params.hyperLink,
            clientName: route.params.clientName,
            token: route.query.token,
            REQUEST_ID: route.query.REQUEST_ID,
          },
        )
      : await store.dispatch(
          isPdfExportPage.value ? 'rfps/getMyRfpByToken' : 'rfps/getMyRfpbyId',
          isPdfExportPage.value
            ? {
                presentationId: route.params.presentationId,
                token: route.query.token,
                REQUEST_ID: route.query.REQUEST_ID,
              }
            : route.params.presentationId,
        )

    errorMessage.value = err
      ? `Loading Failed: ${
          err.message ||
          err.response?.statusText ||
          err.statusText ||
          err.status ||
          err
        }`
      : ''

    loading.value = false
  }

  function printPdf() {
    if (!isPdfExportPage.value)
      setTimeout(function () {
        window.print()
      }, 5000)
  }

  onMounted(async () => {
    await fetchRfpOrLink()
    printPdf()
  })

  const presentationIsLoaded = computed(() =>
    route.params.hyperLink
      ? Boolean(
          store.getters['rfps/getLinkByHyperLink'](
            route.params.clientName?.replace('-', ' '),
            route.params.hyperLink,
          ),
        )
      : Boolean(
          store.getters['rfps/getPresentationById'](
            route.params.presentationId,
          ),
        ),
  )
  return { presentationIsLoaded, errorMessage, loading }
}
