<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="flex px-8 pb-5">
        <h1
          class="text-header-jnj text-primary"
          data-test="tab-panel-account-settings"
        >
          Account Settings
        </h1>
      </div>
      <div
        v-if="false"
        class="flex border items-center px-4 mr-8 rounded-lg space-x-2"
      >
        <svg-icon class="w-5 h-5" name="search" />
        <input
          v-model="searchTerm"
          placeholder="Search Files"
          class="py-3 my-auto focus:outline-none"
        />
      </div>
    </div>
    <tab-bar :items="tabItems" />
    <div class="flex items-center justify-between pt-6 px-10">
      <h1 class="text-xl font-medium" data-test="tab-panel-active-item">
        {{ activeItem }}
      </h1>
      <dp-button
        v-if="showButton"
        text="Create New"
        class="py-4 px-9 text-white bg-secondary h-btn-builder min-h-btn-builder my-auto rounded-xl"
        data-test="tab-panel-create-new-custom-slide"
        @click="openNewCustomSlideModal()"
      />
    </div>
  </div>
</template>
<script>
import TabBar from './TabBar.vue'
import DpButton from '@/components/buttons/DpButton.vue'
import { useRouter } from 'vue-router'

const tabItems = [
  {
    title: 'Profile',
    link: 'settings-profile',
  },
  {
    title: 'Email Body',
    link: 'settings-email-body',
  },
  {
    title: 'Custom Slides',
    link: 'settings-custom-slides',
  },
]

export default {
  components: { TabBar, DpButton },
  props: {
    activeItem: { type: String, required: true },
    showButton: { type: Boolean, default: false },
  },
  setup() {
    const router = useRouter()
    const openNewCustomSlideModal = () => {
      router.push({
        name: 'create-custom-slide',
        params: {
          slideStep: 1,
        },
      })
    }

    return { openNewCustomSlideModal, tabItems }
  },
}
</script>
