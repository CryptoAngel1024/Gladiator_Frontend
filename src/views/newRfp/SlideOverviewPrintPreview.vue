<template>
  <page-wrapper title="">
    <base-card class="rounded-2xl h-full" card-style="bg-white pt-7">
      <SlideOverView v-if="presentation" />
    </base-card>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/utils/container/PageWrapper.vue'

import SlideOverView from '@/components/newRfp/SlideOverView.vue'
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import BaseCard from '@/components/utils/container/BaseCard.vue'

export default {
  components: {
    PageWrapper,
    SlideOverView,
    BaseCard,
  },

  setup() {
    const route = useRoute()
    const store = useStore()

    const loading = ref(false)
    const error = ref('')

    onMounted(async () => {
      if (route.params.presentationId) {
        loading.value = true
        const { err } = await store.dispatch(
          'rfps/getMyRfpbyId',
          route.params.presentationId,
        )
        if (err) error.value = err.message || err
        loading.value = false
      }
    })

    const presentation = computed(() =>
      store.getters['rfps/getPresentationById'](route.params.presentationId),
    )

    const customerInfoComponent = ref(null)
    const uploadCustomerLogo = (presentationIdParam) =>
      customerInfoComponent.value?.uploadImage(presentationIdParam)

    return {
      presentation,
      loading,
      error,
      customerInfoComponent,
      uploadCustomerLogo,
    }
  },
}
</script>
