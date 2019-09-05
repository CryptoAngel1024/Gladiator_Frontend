<template>
  <login-page-wrapper>
    <reset-password />
  </login-page-wrapper>
</template>

<script>
import LoginPageWrapper from '@/components/auth/LoginPageWrapper.vue'
import ResetPassword from '@/components/auth/ResetPassword.vue'

export default {
  components: {
    LoginPageWrapper,
    ResetPassword,
  },
}
</script>
