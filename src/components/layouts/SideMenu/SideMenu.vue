<template>
  <!-- Sidebar -->
  <nav :class="showCollapsedSideMenu ? 'w-18 mt-16' : 'w-64'">
    <app-icon v-if="!showCollapsedSideMenu" />
    <menu-section :section-data="menuItems.mainSection" />
    <menu-section :section-data="menuItems.helpSection" />
    <nav-footer v-if="showAscFooter" />
  </nav>
</template>
<script>
import NavFooter from './SideMenuFooter.vue'
import MenuSection from './SideMenuSection.vue'
import appIcon from '../appIcon.vue'
import menuItems from '@/data/menu.json'
import useShowHambergerMenu from './showHambergerMenu.js'

export default {
  components: {
    MenuSection,
    NavFooter,
    appIcon,
  },
  setup() {
    const { showCollapsedSideMenu, showAscFooter } = useShowHambergerMenu()

    return {
      showCollapsedSideMenu,
      menuItems,
      showAscFooter,
    }
  },
}
</script>
