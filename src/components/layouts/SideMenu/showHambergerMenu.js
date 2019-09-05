import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { isAscDepartment } from '@/utils/departments.js'

export default function useShowHambergerMenu() {
  const route = useRoute()

  const linksWithHambergerMenu = [
    'builder',
    'create-link',
    'update-link',
    'create-link-starred',
    'update-link-starred',
  ]
  const linksWithCollapsedSideMenu = [
    ...linksWithHambergerMenu,
    'new-presentation',
    'new-presentation-template',
    'update-presentation',
  ]

  const showCollapsedSideMenu = computed(() =>
    linksWithCollapsedSideMenu.includes(route.name),
  )

  const showHambergerMenu = computed(() =>
    linksWithHambergerMenu.includes(route.name),
  )

  const showAscFooter = isAscDepartment()

  const showPersentBtnOnTopBar = computed(
    () =>
      route.name === 'builder' ||
      route.name === 'create-link' ||
      route.name === 'update-link',
  )

  return {
    showCollapsedSideMenu,
    showAscFooter,
    showHambergerMenu,
    showPersentBtnOnTopBar,
  }
}
