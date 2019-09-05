<template>
  <component :is="LoginPageWrapper">
    <login-form />
  </component>
</template>

<script>
import defaultLoginPageWrapper from '@/components/auth/LoginPageWrapper.vue'
import AscLoginPageWrapper from '@/components/auth/AscLoginPageWrapper.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const LoginPageWrappers = {
  asc: AscLoginPageWrapper,
  trauma: defaultLoginPageWrapper,
}

export default {
  components: {
    LoginForm,
  },
  setup() {
    const route = useRoute()

    const department = computed(() => route.params.department)

    const LoginPageWrapper = computed(
      () =>
        LoginPageWrappers[department.value?.toLowerCase()] ||
        defaultLoginPageWrapper,
    )

    return { LoginPageWrapper }
  },
}
</script>
