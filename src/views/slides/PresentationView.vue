<template>
  <DpPresentation
    v-if="presentationIsLoaded"
    :prev-route="prevRoute"
    data-test="dp-presentation"
  >
    <template #mainView>
      <allPresentations />
    </template>
  </DpPresentation>
  <div v-else class="flex w-full h-full">
    <ApiState
      :loading="loading"
      :error-message="errorMessage"
      data-type="presentation"
      class="m-auto"
    />
  </div>
</template>

<script>
import DpPresentation from '@/components/slides/DpPresentation.vue'
import allPresentations from '@/components/slides/allPresentations.vue'
import { ref, computed, onMounted } from 'vue'
import ApiState from '@/components/utils/apiState.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components: {
    DpPresentation,
    allPresentations,
    ApiState,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from.name
    })
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const errorMessage = ref('')
    const loading = ref(false)

    onMounted(async () => {
      errorMessage.value = ''
      loading.value = true

      const { err } = route.params.hyperLink
        ? await store.dispatch('rfps/getLinkByHyperLink', {
            hyperLink: route.params.hyperLink?.replace('-', ' '),
            clientName: route.params.clientName?.replace('-', ' '),
          })
        : await store.dispatch('rfps/getMyRfpbyId', route.params.presentationId)

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
    })

    const presentationIsLoaded = computed(() =>
      route.params.hyperLink
        ? Boolean(
            store.getters['rfps/getLinkByHyperLink'](
              route.params.clientName?.replace('-', ' '),
              route.params.hyperLink?.replace('-', ' '),
            ),
          )
        : Boolean(
            store.getters['rfps/getPresentationById'](
              route.params.presentationId,
            ),
          ),
    )

    return { presentationIsLoaded, errorMessage, loading }
  },
}
</script>

<style>
@import 'reveal.js/dist/reveal.css';

.reveal .progress {
  background-color: unset;
}
@media (max-width: 768px) {
  .reveal {
    overflow: auto !important;
  }
  .reveal .slides {
    overflow: hidden !important;
  }
}
</style>
