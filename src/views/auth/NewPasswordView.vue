<template>
  <login-page-wrapper>
    <complete-new-password />
  </login-page-wrapper>
</template>

<script>
import CompleteNewPassword from '@/components/auth/CompleteNewPassword.vue'
import LoginPageWrapper from '@/components/auth/LoginPageWrapper.vue'

export default {
  components: {
    CompleteNewPassword,
    LoginPageWrapper,
  },
}
</script>
