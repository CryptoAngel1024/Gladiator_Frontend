<template>
  <component :is="layout" :class="departmentTheme">
    <slot />
  </component>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import useDepartmentTheme from '@/utils/departmentTheme.js'

export default {
  name: 'AppLayout',
  setup() {
    const route = useRoute()
    const store = useStore()
    const departmentTheme = useDepartmentTheme()
    const layout = ref()

    watch(
      () => route.meta,
      (newMeta) => {
        layout.value = newMeta?.layout || 'layout-main'
      },
    )

    const department = computed(() => route.params.department?.toUpperCase())
    const saveDepartment = () =>
      store.commit('setting/setCurrentDepartment', department.value)

    onMounted(saveDepartment)
    watch(department, saveDepartment)

    return { layout, departmentTheme }
  },
}
</script>
