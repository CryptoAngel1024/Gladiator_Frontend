<template>
  <div
    class="flex flex-col py-5 px-4 bg-white borde-2 rounded-xl w-40 space-y-4"
  >
    <button
      class="flex items-center text-gray-425 space-x-2 cursor-pointer"
      type="button"
      data-test="open-existing-custom-slide"
      @click="openExistingCustomSlideModal()"
    >
      <svg-icon name="folder" class="h-5 w-5" />
      <span class="text-sm"> Saved slide </span>
    </button>
    <button
      class="flex items-center text-gray-425 space-x-2 cursor-pointer"
      type="button"
      data-test="open-new-custom-slide"
      @click="openNewCustomSlideModal()"
    >
      <svg-icon name="edit" class="h-5 w-5" />
      <span class="text-sm"> Create Custom </span>
    </button>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()

    const openNewCustomSlideModal = () => {
      router.push({
        name: 'presentation-create-custom-slide',
        params: {
          selectionType: 'new',
          slideStep: 1,
        },
      })
    }

    const openExistingCustomSlideModal = () => {
      router.push({
        name: 'presentation-create-custom-slide',
        params: {
          slideStep: 1,
          selectionType: 'existing',
        },
      })
    }

    return { openNewCustomSlideModal, openExistingCustomSlideModal }
  },
}
</script>
