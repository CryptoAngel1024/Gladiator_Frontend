<template>
  <tr v-if="customSlide">
    <td class="w-32">
      <s3ImageWithPlaceholder
        s3-directory="presentations/customeSlides"
        :s3-file-name="`${customSlide.slideInfoId}/image1.png`"
        class="w-28 h-16 rounded-xl border"
        img-class="object-contain"
        :data-test="`custom-slides-s3-image-${customSlide.slideInfoId}`"
      />
    </td>
    <td class="py-4">
      <h1 class="text-header" data-test="custome-slide-title">
        {{ customSlide.slideTitle }}
      </h1>
      <div class="flex flex-wrap">
        <div class="flex text-gray-450 items-center pr-20">
          <span class="text-sm font-Arial font-medium">Actively in use</span>
          <svg-icon name="presentation" class="h-5 w-5 ml-3 mr-2" />
          <h1 class="text-header">08</h1>
        </div>
        <div class="flex text-gray-450 items-center">
          <span class="text-sm font-Arial font-medium">Created on</span>
          <svg-icon name="date-picker" class="h-4 w-4 ml-3 mr-2" />
          <h1 class="text-header">{{ formatDate(slide.createdDate) }}</h1>
        </div>
      </div>
    </td>
    <td>
      <div class="flex space-x-8 items-center justify-start">
        <dp-outline-button
          class="px-8 bg-white text-accent-blue border-accent-blue border-2 rounded-lg py-2"
          text="Preview"
          :data-test="`custom-slides-preview-${customSlide.slideInfoId}`"
          @click="selectCustomSlide()"
        />

        <div class="relative flex">
          <button
            class="p-3 h-10 bg-gray-50 rounded-lg items-center"
            :data-test="`custom-slide-menu-btn-${customSlide.slideInfoId}`"
            @click="showMenu = !showMenu"
            @blur="delay(() => (showMenu = false))"
          >
            <SvgIcon class="h-5 w-1" name="moreVertical" />
          </button>
          <custom-slides-menu
            v-if="showMenu"
            class="absolute right-0 top-11 z-50 shadow-xl"
            :custom-slide="customSlide"
            :data-test="`custom-slide-menu-${customSlide.slideInfoId}`"
            @edit-custom-slide="selectCustomSlide()"
            @delete-custom-slide="deleteCustomSlide()"
          />
        </div>
      </div>
    </td>
  </tr>
</template>
<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/formatDate'
import CustomSlidesMenu from './CustomSlidesMenu.vue'
import DpOutlineButton from '@/components/buttons/DpOutlineButton.vue'
import s3ImageWithPlaceholder from '@/components/utils/s3/s3ImageWithPlaceholder.vue'

export default {
  components: { CustomSlidesMenu, DpOutlineButton, s3ImageWithPlaceholder },
  props: {
    slide: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const store = useStore()
    const router = useRouter()

    const showMenu = ref(false)
    const delay = (func) => setTimeout(func, 1000)

    const customSlide = computed(() => {
      try {
        return {
          slideId: props.slide.slide.slideId,
          slideTitle: props.slide.slide.slideContent.slideTitle,
          showTitle: props.slide.slide.slideContent.showTitle,
          showSubtitle: props.slide.slide.slideContent.showSubtitle,
          showImages: props.slide.slide.slideContent.showImages,
          slideCategory: props.slide.slideCategory,
          subTitle: props.slide.slide.slideContent.subTitle,
          customSlideType: props.slide.slide.customSlideType,
          pageNumber: props.slide.pageNumber,
          version: props.slide.slide.version,
          slideInfoId: props.slide.slideInfoId,
        }
      } catch (err) {
        console.error(err)
        return undefined
      }
    })

    const deleteCustomSlide = async () => {
      try {
        await store.dispatch('customSlide/deleteCustomSlide', {
          customSlideId: customSlide.value.slideInfoId,
        })
      } catch (err) {
        console.error(err)
      }
    }

    const selectCustomSlide = () => {
      store.commit('customSlide/setCustomSlide', customSlide.value)
      router.push({
        name: 'update-custom-slide',
        params: {
          customSlideId: customSlide.value.slideInfoId,
          slideStep: 1,
        },
      })
    }

    return {
      showMenu,
      delay,
      selectCustomSlide,
      deleteCustomSlide,
      customSlide,
      formatDate,
    }
  },
}
</script>
