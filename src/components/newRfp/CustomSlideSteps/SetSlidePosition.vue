<template>
  <div class="px-9 py-3">
    <slide-group-section
      v-for="category in Object.keys(slidesByCategory)"
      :key="category"
      :category-slides="slidesByCategory[category]"
      :category="category"
    />
  </div>

  <dp-button
    :disabled="saving"
    :text="saving ? 'Saving..' : 'Save'"
    class="ml-auto m-6 py-4 px-14 text-white bg-secondary h-btn-builder min-h-btn-builder rounded-xl"
    data-test="save-custom-slide-button"
    @click="save()"
  />
  <ErrorBanner :message="errorMessage" class="ml-auto mr-0 mt-2" />
</template>

<script>
import DpButton from '@/components/buttons/DpButton.vue'
import SlideGroupSection from './SlideGroupSection.vue'
import { groupSlides } from '@/data/allSlides.js'
import { useStore } from 'vuex'
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ErrorBanner from '@/components/utils/ErrorBanner.vue'

export default {
  components: {
    DpButton,
    SlideGroupSection,
    ErrorBanner,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const saving = ref(false)
    const slideInfoId = computed(() => route.params.customSlideId)
    const presentationId = computed(() => route.params.presentationId)
    const errorMessage = ref('')

    const presentationState = computed(() =>
      presentationId.value
        ? store.getters['rfps/getPresentationById'](presentationId.value)
        : undefined,
    )

    const positionedSlidesList = computed(() =>
      presentationId.value && !presentationState.value
        ? []
        : store.getters['customSlide/positionedSlidesList']({
            slideInfoId: slideInfoId.value,
            presentationSlides: presentationState.value?.slides || undefined,
          }),
    )

    const slidesByCategory = computed(() =>
      groupSlides(positionedSlidesList.value),
    )

    const save = async () => {
      saving.value = true
      try {
        if (presentationId.value) {
          if (slideInfoId.value) {
            const customSlideInfo = {
              slideInfoId: slideInfoId.value,
              presentationId: presentationId.value,
            }
            await store.dispatch(
              'customSlide/insertCustomSlide',
              customSlideInfo,
            )
          } else {
            const createdCustomSlide = await store.dispatch(
              'customSlide/createCustomSlide',
            )

            if (createdCustomSlide) {
              const customSlideInfo = {
                slideInfoId: createdCustomSlide.slideInfoId,
                presentationId: presentationId.value,
              }
              await store.dispatch(
                'customSlide/insertCustomSlide',
                customSlideInfo,
              )
            }
          }
        } else {
          if (slideInfoId.value) {
            await store.dispatch(
              'customSlide/updateCustomSlide',
              store.getters['customSlide/customSlide'](slideInfoId.value),
            )
          } else {
            await store.dispatch('customSlide/createCustomSlide')

            await store.commit('customSlide/resetCustomSlideToCreate')
          }
        }

        await store.dispatch('customSlide/fetchCustomSlidesByOwnerId')

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
        errorMessage.value = `Saving custom slide: ${err.message || err}`
      }
      saving.value = false
    }

    onMounted(() => {
      if (presentationId.value)
        store.dispatch('rfps/getMyRfpbyId', presentationId.value)
    })

    return {
      slidesByCategory,
      save,
      saving,
      errorMessage,
    }
  },
}
</script>
