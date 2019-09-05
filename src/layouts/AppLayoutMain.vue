<template>
  <div class="relative min-h-screen flex">
    <button
      v-if="showHambergerMenu"
      class="absolute z-20 w-6 left-8 top-6"
      @click="showSideNav = !showSideNav"
    >
      <img
        src="@/assets/logo/ShowHiddenButton.svg"
        alt="show side navigation"
      />
    </button>
    <side-bar v-if="showSideNav || !showHambergerMenu" />

    <main class="flex-1">
      <top-navigation :show-side-nav="showSideNav" />
      <div class="flex bg-gray-75 flex-row">
        <SideNav v-if="showUpdatedSideBar" />
        <div
          class="flex flex-col w-full min-h-screen"
          :class="
            showHambergerMenu ? (showSideNav ? 'pl-0' : 'padding-74px') : ''
          "
        >
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import TopNavigation from '@/components/layouts/TopBar.vue'
import SideBar from '@/components/layouts/SideMenu/SideMenu.vue'
import SideNav from '@/components/layouts/RfpWizardSideMenu.vue'
import useShowHambergerMenu from '@/components/layouts/SideMenu/showHambergerMenu.js'
import { computed, ref } from 'vue'

export default {
  components: {
    TopNavigation,
    SideBar,
    SideNav,
  },
  setup() {
    const showSideNav = ref(true)

    const { showHambergerMenu, showCollapsedSideMenu } = useShowHambergerMenu()

    const showUpdatedSideBar = computed(
      () =>
        (showCollapsedSideMenu.value && !showHambergerMenu.value) ||
        !showSideNav.value,
    )

    return {
      showSideNav,
      showUpdatedSideBar,
      showHambergerMenu,
    }
  },
}
</script>

<style scoped>
.padding-74px {
  padding-left: 74.7px;
}
</style>

<style lang="postcss">
.main-page-table-header {
  @apply bg-gray-75
          text-left text-xs
          font-bold
          uppercase
          w-full
          rounded-lg;
}
.main-page-table-header tr th {
  @apply py-2;
}
.main-page-table-header tr th:first-child {
  @apply rounded-l-lg;
}
.main-page-table-header tr th:last-child {
  @apply rounded-r-lg;
}
</style>
