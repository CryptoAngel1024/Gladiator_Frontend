<template>
  <div class="px-9 py-3">
    <div class="flex space-x-10">
      <custom-slide-side-bar class="w-64" @setloading="setloading" />
      <custom-slide-body class="flex-grow" />
    </div>
    <dp-button
      text="Next"
      :loading="loading"
      :disabled="!customSlide.slideTitle || loading"
      class="ml-auto my-6 mr-1 py-4 px-14 text-white bg-secondary h-btn-builder min-h-btn-builder my-auto rounded-xl"
      data-test="custom-slide-next"
      @click="next()"
    />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import CustomSlideSideBar from './builder/CustomSlideSidebar.vue'
import CustomSlideBody from './builder/CustomSlideBody.vue'
import DpButton from '@/components/buttons/DpButton.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import dynamicSlide from '@/components/slides/dynamicSlide'

export default {
  components: { CustomSlideSideBar, CustomSlideBody, DpButton },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const loading = ref(false)
    const slideId = computed(() => route.params.customSlideId)
    const presentationId = computed(() => route.params.presentationId)

    const { slideDetail } = dynamicSlide()

    const customSlideId = computed(() => route.params.customSlideId)

    const customSlideFullData = computed(() =>
      store.getters['customSlide/customSlide'](route.params.customSlideId),
    )

    const slideDetailPerId = computed(() => ({
      ...customSlideFullData.value?.slide.slideContent,
      slideInfoId: customSlideId.value,
    }))

    const customSlide = computed(
      () => slideDetail.value || slideDetailPerId.value,
    )
    const setloading = (isloading) => {
      loading.value = isloading
    }
    const next = () => {
      loading.value = true
      if (presentationId.value) {
        if (slideId.value) {
          router.push({
            name: 'presentation-update-custom-slide',
            params: {
              presentationId: presentationId.value,
              step: route.params.step,
              page: route.params.subStep,
              customSlideId: slideId.value,
              slideStep: 2,
            },
          })
        } else {
          router.push({
            name: 'presentation-create-custom-slide',
            params: {
              presentationId: presentationId.value,
              step: route.params.step,
              page: route.params.subStep,
              slideStep: 2,
              selectionType: 'new',
            },
          })
        }
      } else {
        if (slideId.value) {
          router.push({
            name: 'update-custom-slide',
            params: {
              customSlideId: slideId.value,
              slideStep: 2,
            },
          })
        } else {
          router.push({
            name: 'create-custom-slide',
            params: {
              slideStep: 2,
            },
          })
        }
      }

      loading.value = false
    }
    return { next, loading, setloading, customSlide }
  },
}
</script>
