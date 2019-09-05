<template>
  <div v-if="presentationIsLoaded" class="pdf-slide-container">
    <allPresentations :allow-animations="false" :is-pdf-view="true" />
  </div>
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
import allPresentations from '@/components/slides/allPresentations.vue'
import ApiState from '@/components/utils/apiState.vue'
import { usePdfView } from './pdfViews.js'

export default {
  components: {
    allPresentations,
    ApiState,
  },
  setup() {
    const { presentationIsLoaded, errorMessage, loading } = usePdfView()

    return { presentationIsLoaded, errorMessage, loading }
  },
}
</script>

<style lang="postcss">
.pdf-slide-container > * {
  width: 1280px;
  height: 720px;
  min-height: 720px;
  /* aspect-ratio: 1280/720; */
  page-break-after: always;
}
@page {
  size: 1280px 720px;
}
</style>
