<template>
  <div
    class="flex fixed bottom-0 left-auto pt-2 px-5 bg-white"
    :class="!showCollapsedSideMenu ? 'pb-1' : 'pb-2'"
  >
    <img
      v-if="!showCollapsedSideMenu"
      class="w-44"
      src="@/assets/logo/asc_logo_expanded.png"
      alt="logo"
    />
    <img
      v-else
      class="w-8 mt-auto"
      src="@/assets/logo/asc_logo.svg"
      alt="logo"
    />
  </div>
</template>

<script>
import useShowHambergerMenu from './showHambergerMenu.js'

export default {
  setup() {
    const { showCollapsedSideMenu } = useShowHambergerMenu()

    return {
      showCollapsedSideMenu,
    }
  },
}
</script>
