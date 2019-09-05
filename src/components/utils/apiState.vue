<template>
  <LoadingState v-if="loading" />
  <ErrorBanner v-else-if="errorMessage" :message="errorMessage" />
  <EmptyDataState v-else :data-type="dataType" />
</template>

<script>
import ErrorBanner from '@/components/utils/ErrorBanner.vue'
import LoadingState from '@/components/utils/LoadingState.vue'
import EmptyDataState from '@/components/utils/EmptyDataState.vue'

export default {
  components: { ErrorBanner, LoadingState, EmptyDataState },
  props: {
    loading: { type: Boolean, default: false },
    errorMessage: { type: String, default: '' },
    dataType: { type: String, default: '' },
  },
}
</script>
