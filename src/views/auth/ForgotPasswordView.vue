<template>
  <login-page-wrapper>
    <forgot-password />
  </login-page-wrapper>
</template>

<script>
import LoginPageWrapper from '@/components/auth/LoginPageWrapper.vue'
import ForgotPassword from '@/components/auth/ForgotPassword.vue'

export default {
  components: {
    LoginPageWrapper,
    ForgotPassword,
  },
}
</script>
