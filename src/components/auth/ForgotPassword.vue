<template>
  <div class="flex flex-col items-center my-auto w-full">
    <h1 class="font-medium text-4xl">Forgot Password</h1>

    <div class="max-w-md w-full">
      <form class="mt-8" @submit.prevent="forgotPassword()">
        <div v-if="!isEmailSent" class="space-y-6">
          <login-input
            id="email"
            v-model="email"
            type="email"
            label="Email Address"
            placeholder="Your Email"
            icon="email"
          />
          <dp-button
            text="Get Link"
            :loading="loading"
            :disabled="disabled"
            class="w-full py-3 uppercase font-semibold text-white bg-secondary"
            :class="[
              disabled ? 'opacity-50' : '',
              !isAscLogin
                ? 'bg-gradient-to-r from-primary-grad-from to-primary-grad-to'
                : '',
            ]"
          />
          <p v-if="errorMessage.length > 0" class="text-red-500">
            {{ errorMessage }}
          </p>
        </div>
        <div v-else class="space-y-4 items-center flex flex-col">
          <img class="w-48 h-48 rounded-full border-2" />
          <h1 class="text-center text-subheader-jnj">
            We have sent a reset password link to your assosiated email account
          </h1>

          <h1 class="text-subheader text-gray-450">Didnt receive link?</h1>
          <dp-button
            text="Resend Link"
            :loading="loading"
            class="w-full py-3 uppercase font-semibold text-white bg-secondary"
            :class="[
              !isAscLogin
                ? 'bg-gradient-to-r from-primary-grad-from to-primary-grad-to'
                : '',
            ]"
          />
        </div>
        <div class="flex items-center justify-center mt-8">
          <router-link to="support" class="font-semibold text-sm text-gray-500">
            Contact Admin
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { isAscDepartment } from '@/utils/departments.js'
import LoginInput from '@/components/inputs/LoginInput.vue'
import DpButton from '../buttons/DpButton.vue'
export default {
  components: { DpButton, LoginInput },

  setup() {
    const store = useStore()
    const email = ref('')
    const loading = ref(false)
    const errorMessage = ref('')
    const isEmailSent = ref(false)

    const isAscLogin = isAscDepartment()

    const disabled = computed(() => {
      return !(email.value.length > 0) || loading.value
    })

    const forgotPassword = async () => {
      try {
        loading.value = true
        errorMessage.value = ''
        await store.dispatch('auth/forgotPassword', { email: email.value })
        loading.value = false
        const authResponse = await store.getters['auth/authResponse']

        if (authResponse.CodeDeliveryDetails) {
          isEmailSent.value = true
        }
      } catch (err) {
        errorMessage.value = err?.message || err
        loading.value = false
      }
    }

    return {
      disabled,
      email,
      loading,
      errorMessage,
      isEmailSent,
      forgotPassword,
      isAscLogin,
    }
  },
}
</script>
