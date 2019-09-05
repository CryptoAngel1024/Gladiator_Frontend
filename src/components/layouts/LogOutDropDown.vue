<template>
  <div class="flex flex-col mt-1 bg-white border-2 rounded-xl relative">
    <button
      class="w-full flex px-5 border-b py-3 hover:bg-gray-75 hover:rounded-t-xl items-center justify-between"
      @click="showDepartmentSelection = !showDepartmentSelection"
    >
      <div class="flex items-center">
        <img
          v-if="isAsc"
          src="@/assets/departmentIcons/asc.png"
          class="rounded-lg border p-1"
          width="40"
        />
        <img v-else src="@/assets/departmentIcons/trauma.svg" width="40" />
        <div class="text-left pl-1">
          <p class="text-gray-425">Organization</p>
          <p class="font-semibold">{{ isAsc ? 'Asc' : 'Trauma' }}</p>
        </div>
      </div>
      <img src="@/assets/svgIcons/blue-department-arrow.svg" />
    </button>
    <router-link
      class="px-5 text-center border-b py-5 hover:bg-gray-75 font-semibold"
      to="/settings/profile"
      data-test="topbar-profile"
    >
      Profile
    </router-link>
    <button
      class="px-5 text-center border-t border-b py-5 hover:bg-gray-75 hover:rounded-b-xl font-semibold"
      data-test="topbar-logout"
      @click="logout"
    >
      Log out
    </button>
    <div
      v-if="showDepartmentSelection"
      class="absolute flex flex-col -left-52 bg-white rounded-xl border-2 shadow-xl"
    >
      <button
        class="hover:bg-gray-75 hover:rounded-t-xl font-bold w-48 text-xl py-4 flex px-4 items-center"
        @click="goToSelectionRoute('TRAUMA')"
      >
        <img src="@/assets/departmentIcons/trauma.svg" width="40" />
        <div class="ml-2">Trauma</div>
      </button>
      <button
        class="hover:bg-gray-75 hover:rounded-b-xl font-bold w-48 text-xl py-4 flex px-4 items-center"
        @click="goToSelectionRoute('ASC')"
      >
        <img
          src="@/assets/departmentIcons/asc.png"
          class="rounded-lg border px-1 py-1.5"
          width="40"
          height="40"
        />
        <div class="ml-2">ASC</div>
      </button>
    </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { isAscDepartment } from '@/utils/departments.js'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const isAsc = isAscDepartment()
    const firstName = computed(() => store.getters['setting/getFirstName'])
    const lastName = computed(() => store.getters['setting/getLastName'])
    const showDepartmentSelection = ref(false)

    const logout = async () => {
      await store.dispatch('auth/signout')
      router.replace({
        name: 'login',
        query: { returnUrl: router.currentRoute.value.path },
      })
      window.location.reload() // to clear all vuex state
    }

    const goToSelectionRoute = (selectedDepartment) => {
      router.push({
        name: 'dashboard',
        params: { department: selectedDepartment.toLowerCase() },
      })
      store.dispatch('setting/updateUser', {
        firstName: firstName.value,
        lastName: lastName.value,
        department: selectedDepartment,
      })
      showDepartmentSelection.value = false
    }

    return {
      logout,
      showDepartmentSelection,
      goToSelectionRoute,
      isAsc,
    }
  },
}
</script>
