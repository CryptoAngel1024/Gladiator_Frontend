<template>
  <div v-if="presentationIsLoaded" class="flex flex-col px-16">
    <component :is="slideOverView" :is-pdf-view="true" />
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
import AscSlideOverView from '@/components/newRfp/ascSteps/SlideOverView.vue'
import TraumaSlideOverView from '@/components/newRfp/SlideOverView.vue'
import ApiState from '@/components/utils/apiState.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { usePdfView } from './pdfViews.js'

export default {
  components: {
    ApiState,
  },
  setup() {
    const store = useStore()
    const department = computed(
      () => store.getters['setting/getCurrentDepartment'],
    )
    const slideOverViews = {
      ASC: AscSlideOverView,
      TRAUMA: TraumaSlideOverView,
    }
    const slideOverView = computed(() => slideOverViews[department.value])
    const { presentationIsLoaded, errorMessage, loading } = usePdfView()

    return { presentationIsLoaded, errorMessage, loading, slideOverView }
  },
}
</script>

<style lang="postcss">
@media print {
  ::placeholder,
  ::-webkit-input-placeholder {
    color: transparent !important;
  }
}
</style>
