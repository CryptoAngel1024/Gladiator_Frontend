import { computed } from 'vue'
import { useStore } from 'vuex'

export function useCurrentDepartment(currentDepartment) {
  const isCurrentDepartment = ({ department }) =>
    currentDepartment === department

  return { isCurrentDepartment }
}

export function getCurrentDepartment(rootGetters) {
  const department = rootGetters['setting/getCurrentDepartment']
  return department
}

export function isAscDepartment(department) {
  const store = useStore()
  const currentDepartment = computed(
    () => store.getters['setting/getCurrentDepartment'],
  )

  const isAsc = computed(
    () => (department?.toUpperCase() || currentDepartment.value) === 'ASC',
  )

  return isAsc
}
