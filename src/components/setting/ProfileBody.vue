<template>
  <div class="font-bold pt-6 pl-10 flex flex-col">
    <div>Profile picture</div>
    <s3ImageUpdate
      :s3-directory="`protected/${$store.getters['auth/userID']}/`"
      s3-file-name="profile.png"
      @click="profilePicGaLog()"
    />
    <div class="flex flex-col w-96">
      <ApiState
        v-if="!successfullyFetched"
        :loading="loading"
        :error-message="loadingError"
      />
      <div
        v-if="successfullyFetched"
        class="flex justify-between items-center my-2"
      >
        <label for="updatedFirstName">First Name</label>
        <input
          v-model="updatedFirstName"
          :disabled="!successfullyFetched"
          type="text"
          name="updatedFirstName"
          class="border rounded-md w-56 p-1"
        />
      </div>
      <div
        v-if="successfullyFetched"
        class="flex justify-between items-center my-2"
      >
        <label for="updatedLastName">Last Name</label>
        <input
          v-model="updatedLastName"
          :disabled="!successfullyFetched"
          type="text"
          name="updatedLastName"
          class="border rounded-md w-56 p-1"
        />
      </div>
      <div
        v-if="successfullyFetched"
        class="flex justify-between items-center my-2"
      >
        <label for="email">Default Department</label>
        <select v-model="updatedDepartment" class="w-56 rounded-md border p-1">
          <option disabled value="">Please select department</option>
          <option value="ASC">ASC</option>
          <option value="TRAUMA">trauma</option>
        </select>
      </div>
      <div v-if="emailValue" class="flex justify-between items-center my-2">
        <label for="email">Email</label>
        <input
          v-model="emailValue"
          type="email"
          name="email"
          class="border rounded-md w-56 p-1"
          disabled
        />
      </div>
      <div class="flex justify-between items-center my-2">
        <label for="password">Password</label>
        <router-link
          to="/settings/deprecated-change-password"
          class="w-56 p-2 text-xs border rounded-xl border-blue-700 font-bold text-center text-blue-700"
        >
          Reset password
        </router-link>
      </div>
    </div>
    <div class="mt-14 justify-end pb-9 pr-9 flex flex-col">
      <div class="flex w-full justify-end">
        <dp-button
          text="Cancel"
          class="w-36 bordered-dp-button px-3 mr-2 border rounded-xl font-bold text-center bg-gray-500 text-white"
        />
        <dp-button
          :text="loading ? 'Saving' : 'Save'"
          :disabled="
            (firstName == updatedFirstName &&
              lastName == updatedLastName &&
              department == updatedDepartment) ||
            loading
          "
          class="w-36 ml-3 py-5 px-14 text-white bg-secondary h-btn-builder min-h-btn-builder my-auto rounded-xl"
          @click="save"
        />
      </div>
      <p v-if="successMessage" class="w-full text-emerald-400 text-right mt-2">
        {{ successMessage }}
      </p>
      <ErrorBanner :message="errorMessage" class="ml-auto mr-0 mt-2" />
    </div>
  </div>
</template>

<script>
import ErrorBanner from '@/components/utils/ErrorBanner.vue'
import DpButton from '@/components/buttons/DpButton.vue'
import s3ImageUpdate from '@/components/utils/s3/s3ImageUpdate.vue'
import ApiState from '@/components/utils/apiState.vue'
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: {
    DpButton,
    s3ImageUpdate,
    ErrorBanner,
    ApiState,
  },
  setup() {
    const successMessage = ref('')
    const errorMessage = ref('')
    const loadingError = ref('')
    const loading = ref(false)
    const successfullyFetched = ref(false)
    const store = useStore()
    const router = useRouter()

    onMounted(async () => {
      loading.value = true
      try {
        await store.dispatch('setting/fetchUser', false)
        successfullyFetched.value = true
      } catch (err) {
        console.error(err)
        loadingError.value = `Failed to fetch user details: ${
          err.message ||
          err.response?.statusText ||
          err.statusText ||
          err.status ||
          err
        }`
      }
      loading.value = false
    })
    const firstName = computed(() => store.getters['setting/getFirstName'])
    const lastName = computed(() => store.getters['setting/getLastName'])
    const department = computed(
      () => store.getters['setting/getCurrentDepartment'],
    )
    const email = computed(() => store.getters['auth/userDetail'].email)
    const updatedFirstName = ref(firstName.value)
    const updatedLastName = ref(lastName.value)
    const emailValue = ref(email.value)
    const updatedDepartment = ref(department.value)
    const currentDepartment = ref(department.value)
    watch(firstName, () => (updatedFirstName.value = firstName.value))
    watch(lastName, () => (updatedLastName.value = lastName.value))
    watch(department, () => (updatedDepartment.value = department.value))
    watch(email, () => (emailValue.value = email.value))

    const profilePicGaLog = () => {
      gaEvent({
        action: 'profile-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-profile-picture',
      })
    }

    async function save() {
      loading.value = true
      successMessage.value = ''
      errorMessage.value = ''
      try {
        await store.dispatch('setting/updateUser', {
          firstName: updatedFirstName.value,
          lastName: updatedLastName.value,
          department: updatedDepartment.value,
        })
        successMessage.value = 'Successfully updated'
        loading.value = false
        if (updatedDepartment.value != currentDepartment.value) {
          router.push({
            name: 'dashboard',
            params: { department: updatedDepartment.value.toLowerCase() },
          })
        }
      } catch (err) {
        console.error('Update Failed: ', err)
        loading.value = false
        errorMessage.value = `Update Failed: ${
          err.message || err.response?.statusText || err
        }`
      }
    }
    watch(updatedDepartment, () => save())

    return {
      firstName,
      lastName,
      department,
      successMessage,
      errorMessage,
      loading,
      loadingError,
      successfullyFetched,
      updatedFirstName,
      updatedLastName,
      updatedDepartment,
      emailValue,
      profilePicGaLog,
      router,
      currentDepartment,
      save,
    }
  },
}
</script>
