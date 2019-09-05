import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default function useDepartmentTheme() {
  const route = useRoute()

  const departmentTheme = computed(
    () => `theme-${route.params.department?.toLowerCase() || 'default'}`,
  )

  return departmentTheme
}
