<template>
  <div v-if="presentationIsLoaded" class="flex flex-col mx-inch">
    <SlideSelectionStep />
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
import SlideSelectionStep from '@/components/newRfp/SlideSelectionStep.vue'
import ApiState from '@/components/utils/apiState.vue'
import { usePdfView } from './pdfViews.js'

export default {
  components: {
    ApiState,
    SlideSelectionStep,
  },
  setup() {
    const { presentationIsLoaded, errorMessage, loading } = usePdfView()

    return { presentationIsLoaded, errorMessage, loading }
  },
}
</script>
<style scoped>
@page {
  size: 8.3in 11.7in;
}
</style>
