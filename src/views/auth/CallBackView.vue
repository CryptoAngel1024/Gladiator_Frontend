<template>
  <login-page-wrapper>
    <error-banner
      v-if="loginError"
      data-test="error-banner"
      class="flex my-1 mx-6"
      :message="loginError"
    />
    <h5 v-else className="card-title">Logging In ...</h5>
  </login-page-wrapper>
</template>

<script>
import { useRouter } from 'vue-router'
import LoginPageWrapper from '@/components/auth/LoginPageWrapper.vue'
import ErrorBanner from '@/components/utils/ErrorBanner.vue'
import {
  authorizationHandler,
  authorizationNotifier,
  recieveCallback,
} from '@/api/pingIdAuth.js'
import { onMounted, ref } from 'vue'

export default {
  components: {
    LoginPageWrapper,
    ErrorBanner,
  },
  setup() {
    const router = useRouter()

    const loginError = ref('')

    authorizationHandler.setAuthorizationNotifier(authorizationNotifier)

    authorizationNotifier.setAuthorizationListener(
      async (request, response, error) => {
        //console.error(error)

        if (error) loginError.value = error.message || error
        if (response) {
          const { err } = await recieveCallback(request, response, router)

          if (err) loginError.value = `Cannot Log In: ${err.message || err}`
        }
      },
    )

    async function completeAuthorizationRequestIfPossible() {
      try {
        await authorizationHandler.completeAuthorizationRequestIfPossible()
      } catch (err) {
        console.error(err)
        if (err) loginError.value = `Cannot Log In: ${err.message || err}`
      }
    }

    onMounted(completeAuthorizationRequestIfPossible)

    return { loginError }
  },
}
</script>
