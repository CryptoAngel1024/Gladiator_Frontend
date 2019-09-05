<template>
  <div class="sticky top-5">
    <div class="relative px-3 py-3 overflow-y-auto bg-white builder__sidebar">
      <div class="flex items-center justify-between pb-2 text-left border-b">
        <h3
          data-test="custom-slide-sidebar-head1"
          class="text-base font-medium text-emerald-900"
        >
          Information
        </h3>
        <span
          data-test="custom-slide-sidebar-head2"
          class="text-sm text-gray-500"
          >Custom Slide</span
        >
      </div>
      <div v-if="customSlide" class="px-2 pt-3 text-left">
        <h3 class="text-red-700 font-bold text-sm">Insert</h3>
        <div class="mt-4">
          <div class="flex justify-between">
            <p
              data-test="custom-slide-sidebar-title-input-lable"
              class="text-sm"
            >
              Title
            </p>
            <button
              data-test="custom-slide-title-button"
              @click="
                ;(customSlide.showTitle = !customSlide.showTitle),
                  customSlidTitlTogGaLog()
              "
            >
              <svg-icon
                class="w-4 h-4"
                :name="customSlide.showTitle ? 'slide-eye' : 'slide-eyeoff'"
              />
            </button>
          </div>

          <input
            v-if="customSlide.showTitle"
            v-model="customSlide.slideTitle"
            class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker border"
            placeholder="Type here"
            data-test="custom-slide-title-input"
          />
        </div>
        <div class="mt-4">
          <div class="flex justify-between">
            <p
              data-test="custom-slide-sidebar-subTitle-input-lable"
              class="text-sm"
            >
              Subtitle
            </p>

            <button
              data-test="custom-slide-subTitle-button"
              @click="
                ;(customSlide.showSubtitle = !customSlide.showSubtitle),
                  customSlidSubTitlTogGaLog()
              "
            >
              <svg-icon
                class="w-4 h-4"
                :name="customSlide.showSubtitle ? 'slide-eye' : 'slide-eyeoff'"
              />
            </button>
          </div>
          <textarea
            v-if="customSlide.showSubtitle"
            v-model="customSlide.subTitle"
            class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker border"
            placeholder="Type here"
            data-test="custom-slide-subTitle-textArea"
          />
        </div>
        <div class="flex justify-between items-center mt-4">
          <h3
            data-test="custom-slide-sidebar-image-input-lable"
            class="text-sm"
          >
            Images
          </h3>
          <button @click="showHideImages(), customSlidImgTogGaLog()">
            <svg-icon
              class="w-4 h-4"
              :name="customSlide.showImages ? 'slide-eye' : 'slide-eyeoff'"
            />
          </button>
        </div>
        <div v-if="customSlide.showImages" class="mr-5 mt-6">
          <div class="text-sm leading-none text-gray-800 font-book mb-3">
            Add up to 3 images
          </div>
          <s3ImageUpload
            v-for="imageIndex in Math.min(customSlide.numberOfImages + 1, 3)"
            :key="imageIndex"
            class="w-30 min-h-20 my-2"
            img-class="w-30"
            :is-uploadable="Boolean(slideInfoId)"
            s3-directory="presentations/customeSlides"
            :s3-file-name="`${slideInfoId}/image${imageIndex}.png`"
            :allow-img-delete="true"
            @image-fetched="increaseNumberOfImages(imageIndex)"
            @image-deleted="decreaseNumberOfImages(imageIndex)"
            @image-selected="createSlideAndUploadImage"
          />
        </div>
      </div>
      <error-banner
        v-if="versionError"
        class="flex my-1"
        :message="versionError"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import s3ImageUpload from '@/components/utils/s3/s3ImageUpload.vue'
import { computed, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { gaEvent } from '@/utils/GA_Event.js'
import versionedApiUpdate from '@/utils/versionedApiUpdate.js'
import ErrorBanner from '@/components/utils/ErrorBanner.vue'
import { isEqual } from 'lodash'

export default {
  components: {
    s3ImageUpload,
    ErrorBanner,
  },
  emits: ['setloading'],
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const presentationId = computed(() => route.params.presentationId)

    const customSlideId = computed(() => route.params.customSlideId)

    const customSlideFullData = computed(() =>
      store.getters['customSlide/customSlide'](customSlideId.value),
    )

    const slideContent = computed(() => ({
      ...customSlideFullData.value?.slide.slideContent,
      slideInfoId: customSlideId.value,
    }))

    const customSlide = ref(
      slideContent.value
        ? JSON.parse(JSON.stringify(slideContent.value))
        : null,
    )

    watch(customSlideFullData, (_, oldCustomSlideFullData) => {
      if (!oldCustomSlideFullData)
        customSlide.value = slideContent.value
          ? JSON.parse(JSON.stringify(slideContent.value))
          : null
    })

    watch(
      customSlide,
      (updatedContent) => {
        updateSlideDynamicData(updatedContent)
      },
      { deep: true },
    )

    const createdSlideInfoId = ref('')
    const slideInfoId = computed(
      () => customSlide.value.slideInfoId || createdSlideInfoId.value,
    )

    function updateCustomSlideLocal(updatedSlideContent) {
      store.commit('customSlide/setCustomSlide', {
        ...customSlideFullData.value,
        slide: {
          ...customSlideFullData.value.slide,
          slideContent: updatedSlideContent,
        },
      })
    }

    async function updateCustomSlideRemote(updatedSlideContent) {
      if (customSlideId.value) {
        const updatedSlide = await store.dispatch(
          'customSlide/updateCustomSlide',
          {
            ...customSlideFullData.value,
            slide: {
              ...customSlideFullData.value.slide,
              slideContent: updatedSlideContent,
            },
          },
        )

        return JSON.parse(updatedSlide.slide.slideContent)
      }
    }

    function slideContentIsEqual(slide1, slide2) {
      return isEqual(
        {
          ...slide1,
          version: 0,
          initialSlideInfoId: '',
        },
        {
          ...slide2,
          version: 0,
          initialSlideInfoId: '',
        },
      )
    }

    const {
      apiError: versionError,
      updateValue: updateSlideDynamicData,
      isUpdating: isSavingChanges,
    } = versionedApiUpdate({
      currentComputedValue: slideContent,
      updateLocalValue: updateCustomSlideLocal,
      updateRemoteValue: updateCustomSlideRemote,
      currentValueIndex: slideInfoId,
      localRemoteValuesIsEqual: slideContentIsEqual,
    })

    watch(isSavingChanges, () => {
      emit('setloading', isSavingChanges.value)
    })

    router.beforeEach(() => {
      if (isSavingChanges.value) {
        return false
      }
    })

    async function createSlideAndUploadImage(uploadImage) {
      emit('setloading', true)
      const createdSlide = await store.dispatch('customSlide/createCustomSlide')
      createdSlideInfoId.value = createdSlide.slideInfoId

      await uploadImage()

      store.commit('customSlide/resetCustomSlideToCreate')

      let slideContent = createdSlide.slide.slideContent
      if (typeof slideContent === 'string')
        slideContent = JSON.parse(slideContent)

      createdSlide.slide.slideContent = {
        ...slideContent,
        numberOfImages: 1,
      }

      store.commit('customSlide/setCustomSlide', createdSlide)

      router.push(
        presentationId.value
          ? {
              name: 'presentation-update-custom-slide',
              params: {
                presentationId: presentationId.value,
                step: route.params.step,
                customSlideId: createdSlideInfoId.value,
                slideStep: 1,
              },
            }
          : {
              name: 'update-custom-slide',
              params: {
                customSlideId: createdSlideInfoId.value,
                slideStep: 1,
              },
            },
      )
    }

    const customSlidTitlTogGaLog = () => {
      gaEvent({
        action: 'create-custom-slide-title-toggle-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-create-custom-slide-title-toggle',
      })
    }
    const customSlidSubTitlTogGaLog = () => {
      gaEvent({
        action: 'create-custom-sub-slide-title-toggle-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-create-custom-sub-slide-title-toggle',
      })
    }
    const customSlidImgTogGaLog = () => {
      gaEvent({
        action: 'create-custom-image-title-toggle-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-create-custom-image-title-toggle',
      })
    }
    return {
      customSlide,
      createSlideAndUploadImage,
      slideInfoId,
      versionError,
      customSlidTitlTogGaLog,
      customSlidSubTitlTogGaLog,
      customSlidImgTogGaLog,
    }
  },

  methods: {
    showHideImages() {
      this.customSlide.showImages = !this.customSlide.showImages

      if (!this.customSlide.showImages) this.customSlide.numberOfImages = 0
    },
    increaseNumberOfImages(imageIndex) {
      if (
        this.customSlide.numberOfImages < 3 &&
        this.customSlide.numberOfImages < imageIndex
      ) {
        this.customSlide.numberOfImages++
      }
    },
    decreaseNumberOfImages(imageIndex) {
      if (
        this.customSlide.numberOfImages > 0 &&
        this.customSlide.numberOfImages >= imageIndex
      ) {
        this.customSlide.numberOfImages--
      }
    },
  },
}
</script>

<style scoped>
.builder__sidebar::-webkit-scrollbar {
  width: 5px;
  border-radius: 2px;
}
</style>
