<template>
  <div class="flex flex-col items-center my-auto w-full">
    <h1 class="font-medium text-4xl">New Password</h1>

    <div class="max-w-md w-full">
      <form class="mt-8 space-y-6" @submit.prevent="completeNewPassword()">
        <login-input
          id="newPassword"
          v-model="newPassword"
          type="password"
          label="Password"
          placeholder="Enter Password"
          icon="password"
        />
        <p v-if="errorMessage.length > 0" class="text-red-500">
          {{ errorMessage }}
        </p>
        <dp-button
          text="Change Password"
          :loading="changePasswordLoading"
          :disabled="changePasswordDisabled"
          class="w-full py-3 uppercase font-semibold text-white bg-secondary disabled:opacity-50"
          :class="[
            !isAscLogin
              ? 'bg-gradient-to-r from-primary-grad-from to-primary-grad-to'
              : '',
          ]"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed } from '@vue/runtime-core'
import { isAscDepartment } from '@/utils/departments.js'
import DpButton from '../buttons/DpButton.vue'
import LoginInput from '../inputs/LoginInput.vue'
export default {
  components: { DpButton, LoginInput },
  setup() {
    const store = useStore()
    const router = useRouter()

    const newPassword = ref('')
    const changePasswordLoading = ref(false)
    const errorMessage = ref('')

    const isAscLogin = isAscDepartment()

    const changePasswordDisabled = computed(() => {
      return !(newPassword.value.length > 0) || changePasswordLoading.value
    })

    const completeNewPassword = async () => {
      try {
        changePasswordLoading.value = true
        errorMessage.value = ''
        await store.dispatch('auth/completeNewPassword', {
          newPassword: newPassword.value,
        })
        changePasswordLoading.value = false

        router.push({
          name: 'login',
        })
      } catch (err) {
        console.error(err)
        errorMessage.value = err?.message || err
        changePasswordLoading.value = false
      }
    }

    return {
      changePasswordDisabled,
      errorMessage,
      newPassword,
      changePasswordLoading,
      completeNewPassword,
      isAscLogin,
    }
  },
}
</script>
