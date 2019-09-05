<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-white px-4"
  >
    <img class="h-28 my-16" src="@/assets/logo/logo_vrbh.png" alt="logo" />
    <h1 class="font-medium text-4xl">Venice Regional Bayfront Health</h1>
    <h1 class="w-96 text-center text-gray-425">
      Welcome to the depuy puposal link, you need to confirm your identity to
      access the link
    </h1>

    <div class="max-w-md w-full">
      <form class="flex flex-col mt-8 space-y-4">
        <label class="text-gray-500">Passcode</label>
        <input
          id="password"
          v-model="password"
          type="text"
          placeholder="Enter Passcode"
          class="border-2 py-5 px-6 border-gray-400 rounded-lg"
        />

        <router-link
          :to="{
            name: 'slide',
            params: {
              presentationId: 'presentation1',
            },
          }"
          class="flex justify-center py-3"
        >
          <dp-button
            text="Enter"
            :class="[
              disabled ? 'opacity-50' : '',
              !isAscLogin
                ? 'bg-gradient-to-r from-primary-grad-from to-primary-grad-to'
                : '',
            ]"
            class="w-1/2 py-4 capitalize font-semibold text-white"
            @click="clientLoginViewEnterGaLog()"
          />
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import DpButton from '@/components/buttons/DpButton.vue'
import { gaEvent } from '@/utils/GA_Event.js'
import { isAscDepartment } from '@/utils/departments.js'

export default {
  components: {
    DpButton,
  },
  setup() {
    const password = ref('')

    const isAscLogin = isAscDepartment()
    const disabled = computed(() => {
      return !(password.value.length > 0)
    })

    const clientLoginViewEnterGaLog = () => {
      gaEvent({
        action: 'client-login-view-enter-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-client-login-view-enter-btn',
      })
    }
    return { disabled, password, isAscLogin, clientLoginViewEnterGaLog }
  },
}
</script>
