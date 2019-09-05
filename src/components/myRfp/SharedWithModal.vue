<template>
  <base-modal id="sharewith" title="Share with" :close-dialog="close">
    <div class="flex flex-col space-y-2 p-6 width">
      <h1 class="text-xl font-bold">Shared With</h1>
      <p class="text-gray-400 text-sm">
        This presentation is shared with the following users:
      </p>
      <h1 class="uppercase text-secondary text-xs font-semibold pb-2">
        MEMBERS ONLINE
      </h1>

      <ShareModalItems
        v-for="member in sharedWithUsers"
        :key="member.email"
        :member="member"
        :presentation-id="presentationId"
        :data-test="`share-user-${member.email}`"
        @send-message="sendMessage"
      />

      <p v-if="sharedWithUsers?.length === 0">Not shared with members</p>
      <div class="flex justify-between pt-2">
        <button
          class="text-gray-400 flex items-center pr-4"
          @click="$emit('hide'), shareModalCancelGaLog()"
        >
          <svg-icon name="left_arrow" class="h-4 w-6" />
          <div class="text-lg ml-1">cancel</div>
        </button>
        <dp-button
          data-test="share-action-button"
          text="Update"
          class="py-2 px-12 text-white bg-secondary"
          @click="close(), shareModalUpdatelGaLog()"
        />
      </div>
      <p class="w-full text-emerald-400 text-right mt-1">
        {{ successMessage }}
      </p>
      <ErrorBanner :message="errorMessage" class="ml-auto mr-0 mt-1" />
    </div>
  </base-modal>
</template>
<script>
import BaseModal from '@/components/utils/container/BaseModal.vue'
import DpButton from '@/components/buttons/DpButton.vue'
import ShareModalItems from '@/components/myRfp/ShareModalItems.vue'
import ErrorBanner from '@/components/utils/ErrorBanner.vue'
import { ref, computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: { BaseModal, DpButton, ShareModalItems, ErrorBanner },
  props: {
    presentationId: {
      type: String,
      required: true,
    },
  },
  emits: ['hide'],
  setup(props, { emit }) {
    const store = useStore()
    const successMessage = ref('')
    const errorMessage = ref('')
    const sendMessage = (msg) => {
      successMessage.value = ''
      errorMessage.value = ''
      if (msg == 'Successfully Shared' || msg == 'Successfully Unshared')
        successMessage.value = msg
      else errorMessage.value = msg
    }

    const presentationState = computed(() =>
      store.getters['rfps/getPresentationById'](props.presentationId),
    )

    const sharedWithUsers = computed(() =>
      presentationState.value.internalUserDetails?.filter(
        (user) => user.role !== 'OWNER',
      ),
    )
    const close = () => {
      emit('hide')
    }

    const shareModalCancelGaLog = () => {
      gaEvent({
        action: 'shared-with-cancel-button-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-shared-with-cancel-button',
      })
    }
    const shareModalUpdatelGaLog = () => {
      gaEvent({
        action: 'shared-with-update-button-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-shared-with-update-button',
      })
    }

    return {
      close,
      successMessage,
      errorMessage,
      sendMessage,
      sharedWithUsers,
      shareModalCancelGaLog,
      shareModalUpdatelGaLog,
    }
  },
}
</script>
<style scoped>
.width {
  width: 480px;
}
</style>
