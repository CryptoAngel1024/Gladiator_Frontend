<template>
  <section class="px-2 py-3 bg-white font-Arial">
    <div class="flex justify-between">
      <h1
        data-test="custom-slide-body-title"
        class="text-base font-medium text-slidColor-1"
      >
        Slide # : Custom Slide
      </h1>
      <div class="flex flex-row-reverse text-base font-medium">
        <button v-if="customSlideId" @click="deleteCustomSlide">
          <SvgIcon class="w-4 h-4 ml-2" name="slide-delete" />
        </button>
        <button v-if="presentationId">
          <SvgIcon class="w-4 h-4 ml-2" name="slide-eye" />
        </button>
      </div>
    </div>
    <builderSlideContainer class="mt-3 border border-gray-850 overflow-x-auto">
      <custom-slide-preview />
    </builderSlideContainer>
  </section>
</template>

<script>
import builderSlideContainer from '@/components/builder/builderSlideContainer.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import CustomSlidePreview from '@/components/newRfp/CustomSlideSteps/builder/CustomSlidePreview.vue'

export default {
  components: { builderSlideContainer, CustomSlidePreview },

  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const presentationId = computed(() => route.params.presentationId)
    const customSlideId = computed(() => route.params.customSlideId)

    const deleteCustomSlide = async () => {
      try {
        await store.dispatch('customSlide/deleteCustomSlide', {
          customSlideId: customSlideId.value,
          deleteFromState: false,
        })

        router.push(
          presentationId.value
            ? {
                name: 'update-presentation',
                params: {
                  presentationId: presentationId.value,
                  step: route.params.step,
                  subStep: route.params.subStep,
                },
              }
            : {
                name: 'settings-custom-slides',
              },
        )
      } catch (err) {
        console.error('delete Custom Slide: ', err)
      }
    }
    const notFoundImages = ref({
      1: false,
      2: false,
      3: false,
    })

    const customSlide = computed(() => ({
      ...store.getters['customSlide/customSlide'](customSlideId.value)?.slide
        .slideContent,
      slideInfoId: route.params.customSlideId,
    }))

    return {
      presentationId,
      customSlideId,
      notFoundImages,
      customSlide,
      deleteCustomSlide,
    }
  },
}
</script>

<style lang="postcss" scoped>
.equal-width {
  flex-grow: 1;
  flex-basis: 0;
}
</style>
