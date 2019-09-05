<template>
  <form class="flex flex-col pl-10 w-96" @submit.prevent="submit()">
    <login-input
      id="Old Password"
      v-model="password.oldPassword"
      type="password"
      label="Old Password"
      placeholder="Old Password"
      icon="password"
      class="my-4"
    />
    <login-input
      id="New Password"
      v-model="password.new"
      type="password"
      label="New Password"
      placeholder="New Password"
      icon="password"
      :class="flag.new ? 'mt-4 mb-2' : 'mt-4 mb-4'"
    />
    <div v-if="flag.new" class="text-red-500 text-xs mb-2">
      <div class="text-xs font-bold">Error</div>
      <ul class="list-disc pl-4 text-xs">
        <li>Password must be longer than 7 characters.</li>
      </ul>
    </div>
    <login-input
      id="Confirm New Password"
      v-model="password.confirm"
      type="password"
      label="Confirm New Password"
      placeholder="Confirm New Password"
      icon="password"
      :class="flag.confirm ? 'mt-4 mb-2' : 'mt-4 mb-4'"
    />
    <div v-if="flag.confirm" class="text-red-500">
      <div class="text-xs">Passwords do not match.</div>
    </div>
    <dp-button
      text="Change password"
      class="py-4 px-12 w-60 text-white bg-secondary h-btn-builder min-h-btn-builder my-8 rounded-xl"
    />
    <p v-if="successMessage" class="w-full text-emerald-400">
      {{ successMessage }}
    </p>
    <p v-if="errorMessage" class="w-full text-red-400">
      {{ errorMessage }}
    </p>
  </form>
</template>
<script>
import LoginInput from '@/components/inputs/LoginInput.vue'
import DpButton from '../buttons/DpButton.vue'
export default {
  components: { DpButton, LoginInput },

  data() {
    return {
      flag: {
        new: false,
        confirm: false,
      },
      password: {
        oldPassword: '',
        new: '',
        confirm: '',
      },
      successMessage: '',
      errorMessage: '',
    }
  },
  methods: {
    async submit() {
      this.successMessage = ''
      this.errorMessage = ''
      if (this.password.new.length <= 7) {
        this.flag.new = true
      } else {
        this.flag.new = false
      }
      if (this.password.confirm != this.password.new) {
        this.flag.confirm = true
      } else {
        this.flag.confirm = false
      }
      if (!this.flag.confirm) {
        try {
          await this.$store.dispatch('auth/changePassword', {
            oldPassword: this.password.oldPassword,
            newPassword: this.password.new,
          })
          this.successMessage = 'Successfully changed'
        } catch (err) {
          this.errorMessage = `Changing failed: ${
            err.message || err.response?.statusText || err
          }`
        }
      }
    },
  },
}
</script>
