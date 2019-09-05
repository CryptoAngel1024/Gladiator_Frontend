<template>
  <base-modal id="templateForm" title="Share with" :close-dialog="close">
    <div class="flex flex-col space-y-2 p-6 width">
      <h1 class="text-xl font-bold">Share with</h1>
      <p class="text-gray-400 text-sm">
        Please provide the following details for the user you would like to
        share this presentation with:
      </p>
      <form data-test="share-rfp-form" @submit.prevent="sharedWithAction()">
        <div>
          <h1 class="uppercase text-secondary text-xs font-semibold">
            EMPLOYEE NAME
          </h1>
          <input
            v-model="name"
            type="text"
            class="border rounded-lg py-3 px-3 w-full text-sm mt-2"
            placeholder="Enter full name"
            required
            data-test="employee-name-input"
          />
        </div>
        <div>
          <h1 class="uppercase text-secondary text-xs font-semibold">
            EMAIL ADDRESS
          </h1>
          <input
            v-model="email"
            type="email"
            class="border rounded-lg py-3 px-3 w-full text-sm mt-2"
            placeholder="Enter email address"
            required
            data-test="employee-email-input"
          />
        </div>
        <div>
          <h1 class="uppercase text-secondary text-xs font-semibold">ROLE</h1>
          <input
            v-model="role"
            type="text"
            class="border rounded-lg py-3 px-3 w-full text-sm mt-2"
            placeholder="Enter role"
            required
            data-test="employee-role-input"
          />
        </div>
        <div>
          <h1 class="uppercase text-secondary text-xs font-semibold">
            ACCESS ROLE
          </h1>
          <div class="flex mt-4 space-x-4">
            <input
              id="yes"
              v-model="accessrole"
              value="VIEWER"
              type="radio"
              name="radio"
              class="presentation-wizard-radio checked:bg-primary"
              required
              data-test="employee-access-role-input"
            />
            <label for="yes" class="text-nromal text-gray-450">View Only</label>
            <input
              id="no"
              v-model="accessrole"
              value="EDITOR"
              type="radio"
              name="radio"
              class="presentation-wizard-radio checked:bg-primary"
              required
              data-test="employee-access-role-input"
            />
            <label for="no" class="text-normal text-gray-450">Edit</label>
          </div>
        </div>
        <div class="flex justify-between pt-2">
          <button
            type="button"
            class="text-gray-400 flex items-center pr-4"
            @click="close(), cancleShareGaLog()"
          >
            <svg-icon name="left_arrow" class="h-4 w-6" />
            <div class="text-lg ml-1">cancel</div>
          </button>
          <button
            :disabled="loading"
            type="submit"
            data-test="share-rfp-action-button"
            class="px-12 text-white bg-secondary py-3 rounded-xl flex items-center justify-center space-x-4 disabled:opacity-50"
          >
            {{ loading ? 'Sharing' : 'Share' }}
          </button>
        </div>
      </form>
      <div class="min-h-4">
        <p class="w-full text-emerald-400 text-right mt-1">
          {{ successMessage }}
        </p>
        <ErrorBanner :message="errorMessage" class="ml-auto mr-0 mt-1" />
      </div>
    </div>
  </base-modal>
</template>
<script>
import ErrorBanner from '@/components/utils/ErrorBanner.vue'
import BaseModal from '@/components/utils/container/BaseModal.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: { BaseModal, ErrorBanner },
  props: {
    rfp: {
      type: Object,
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
  },
  emits: ['hide'],
  setup(props, { emit }) {
    const store = useStore()
    const name = ref('')
    const email = ref('')
    const role = ref('')
    const accessrole = ref('')
    const loading = ref(false)
    const successMessage = ref('')

    const templateId = ref(props.rfp.templateId)
    const presentationId = ref(props.rfp.presentationId)
    const presentationState =
      presentationId.value &&
      computed(() =>
        store.getters['rfps/getPresentationById'](presentationId.value),
      )
    const errorMessage = ref('')

    const close = () => {
      emit('hide')
    }

    const sharedWithAction = async () => {
      loading.value = true
      try {
        const emailsIsAlreadyUsed =
          presentationState.value.internalUserDetails?.filter(
            (user) => user.email === email.value,
          ).length > 0

        if (emailsIsAlreadyUsed) {
          throw 'Sharing Failed: email already used in this presentation'
        }
        errorMessage.value = ''
        successMessage.value = ''

        const userDetail = {
          email: email.value,
          firstName: name.value?.split(' ').slice(0, -1).join(' '),
          lastName: name.value?.split(' ').slice(-1).join(' '),
          role: accessrole.value,
          userType: role.value,
          shareRfp: true,
        }

        if (presentationId.value) {
          await store.dispatch('rfps/shareWithUser', {
            presentationId: presentationId.value,
            userDetail,
          })
        } else {
          const payload = {
            internalTeamDetailList: [userDetail],
            templateId: templateId.value,
            presentationId: presentationId.value,
          }
          await store.dispatch(props.storeName, payload)
        }

        name.value = ''
        email.value = ''
        role.value = ''
        accessrole.value = ''

        successMessage.value = 'Successfully Shared'
      } catch (err) {
        errorMessage.value = `Sharing Failed: ${
          err.message || err.response?.statusText || err
        }`
      }

      loading.value = false
    }

    const cancleShareGaLog = () => {
      gaEvent({
        action: 'presentation-share-cancle-button-click',
        event_category: 'presentation',
        event_label: 'User-clicked-presentation-share-cancle-button',
        presentationIdParam: presentationId.value,
      })
    }

    return {
      name,
      email,
      role,
      accessrole,
      sharedWithAction,
      successMessage,
      errorMessage,
      cancleShareGaLog,
      close,
      loading,
    }
  },
}
</script>
<style scoped>
.width {
  width: 480px;
}
</style>
