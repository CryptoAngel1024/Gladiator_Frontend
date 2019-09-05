<template>
  <tr>
    <td class="w-1/4">
      <div class="flex items-center space-x-8 py-4">
        <CustomerLogo
          class="w-28 h-16 rounded-xl border"
          :presentation-id="rfp.presentationId"
          :name="rfp.customerName"
        />
        <h1 class="text-title-jnj">
          {{ rfp.title }}
        </h1>
      </div>
    </td>
    <td class="w-1/3">
      <h1
        class="text-subheader font-normal"
        :datat-test="`myRfp-customer-name-${rfp.customerName}`"
      >
        {{ rfp.customerName }}
      </h1>
    </td>
    <td class="1/6">
      <div class="relative flex">
        <button
          class="text-subheader flex items-center"
          :data-test="`shared-with-button-${rfp.presentationId}`"
          @click=";(showIcon = !showIcon), myRfpIconTogGaLog()"
          @blur="delay(() => (showIcon = false))"
        >
          <SvgIcon
            class="h-5 w-6"
            :name="showIcon ? 'blueaccount' : 'myaccount'"
          />
          <div :class="showIcon ? 'text-blue-800' : ''">
            {{ `${sharedWith.length}`.padStart(2, '0') }}
          </div>
        </button>
        <div class="absolute -left-28 top-14 z-50">
          <Tooltip
            v-if="showIcon"
            :data-test="`shared-with-tooltip-${rfp.presentationId}`"
            class="shadow"
            :avatar="sharedWith"
          />
        </div>
      </div>
    </td>
    <td class="relative">
      <div class="flex space-x-8 items-center justify-end">
        <dp-link-button
          class="px-8 bg-white text-accent-blue border-accent-blue border-2 rounded-lg py-2"
          :to="{
            name: 'update-presentation',
            params: {
              presentationId: rfp.presentationId,
              step: 1,
              subStep: 1,
            },
          }"
          text="Edit"
          data-test="edit-rfp-button"
        />

        <div class="relative flex">
          <button
            data-test="dropdown-button"
            class="p-3 h-10 bg-gray-50 rounded-lg items-center"
            @click="dropdown(), myRfpDropdownGaLog()"
            @blur="delay(() => (showMenu = false))"
          >
            <SvgIcon class="h-5 w-1" name="moreVertical" />
          </button>
        </div>
      </div>
      <div
        v-if="showMenu"
        data-test="dropdown-options"
        class="absolute right-0 top-15 z-50 borde-2 rounded-xl bg-white shadow-xl"
      >
        <div class="flex flex-col py-6 px-5 w-44 space-y-4">
          <router-link
            :to="{
              name: 'slide',
              params: {
                presentationId: rfp.presentationId,
              },
            }"
            target="_blank"
          >
            <button class="flex items-center text-gray-425 space-x-2">
              <svg-icon name="presentation" class="h-5 w-6" />
              <h1>Preview</h1>
            </button>
          </router-link>
          <button
            data-test="share-rfp-button"
            class="flex items-center text-gray-425 space-x-2"
            @click="shareModal(), myRfpShareGaLog()"
          >
            <svg-icon name="share" class="h-5 w-6" />
            <h1>Share</h1>
          </button>
          <button
            data-test="shared-with-button"
            class="flex items-center text-gray-425 space-x-2"
            @click="shareWithModal(), myRfpShareWithModalGaLog()"
          >
            <svg-icon name="shared" class="h-5 w-6" />
            <h1>Shared with</h1>
          </button>
          <button
            data-test="delete-button"
            class="flex items-center text-primary space-x-2"
            @click="deletePresentation"
          >
            <div class="p-1 border-primary border-2 rounded-md">
              <svg-icon name="delete" class="h-5 w-6" />
            </div>
            <h1>Delete</h1>
          </button>
        </div>
      </div>
      <share-with-modal
        v-if="shareFlag"
        :rfp="rfp"
        :store-name="shareWithStore"
        data-test="share-rfp-modal"
        @hide="shareModal"
      />
      <share-modal
        v-if="showSharedWithModal"
        data-test="share-with-modal"
        :presentation-id="rfp.presentationId"
        @hide="shareWithModal"
      />
    </td>
  </tr>
</template>
<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import ShareWithModal from '@/components/share/ShareWithModal.vue'
import ShareModal from '@/components/myRfp/SharedWithModal.vue'
import Tooltip from '@/components/myRfp/TooltipUsers.vue'
import DpLinkButton from '../buttons/DpLinkButton.vue'
import CustomerLogo from '@/components/utils/s3/CustomerLogo.vue'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: {
    ShareWithModal,
    ShareModal,
    Tooltip,
    DpLinkButton,
    CustomerLogo,
  },
  props: {
    rfp: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const showSharedWithModal = ref(false)
    const shareFlag = ref(false)
    const showMenu = ref(false)
    const showIcon = ref(false)
    const store = useStore()

    const shareWithStore = ref('rfps/sharedWithAction')
    const shareWithModal = () => {
      showSharedWithModal.value = !showSharedWithModal.value
      showMenu.value = false
    }
    const shareModal = () => {
      shareFlag.value = !shareFlag.value
      showMenu.value = false
    }
    const dropdown = () => {
      showMenu.value = !showMenu.value
      shareFlag.value = false
      showSharedWithModal.value = false
    }
    const delay = (func) => setTimeout(func, 1000)
    const deletePresentation = async () => {
      try {
        await store.dispatch('rfps/deleteRfp', props.rfp.presentationId)
      } catch (err) {
        console.error('delete Rfp: ', err)
      }
    }

    const sharedWith = computed(
      () =>
        props.rfp.internalUserDetails?.filter(
          (user) => user.role !== 'OWNER' && user.role !== 'NONE',
        ) || [],
    )

    const myRfpShareWithModalGaLog = () => {
      gaEvent({
        action: `my-presentation-shared-with-modal-click`,
        event_category: 'presentation',
        event_label: 'User-clicked-my-presentation-shared-with-modal-button',
      })
    }

    const myRfpShareGaLog = () => {
      gaEvent({
        action: `my-presentation-share-click`,
        event_category: 'presentation',
        event_label: 'User-clicked-my-presentation-share-button',
      })
    }

    const myRfpDropdownGaLog = () => {
      gaEvent({
        action: `my-presentation-dropdown-icon-click`,
        event_category: 'presentation',
        event_label: 'User-clicked-my-presentation-dropdown-icon',
      })
    }

    const myRfpIconTogGaLog = () => {
      gaEvent({
        action: `my-presentation-show-icon-click`,
        event_category: 'presentation',
        event_label: 'User-clicked-my-presentation-show-icon-button',
      })
    }

    return {
      showSharedWithModal,
      shareWithModal,
      shareFlag,
      shareModal,
      delay,
      deletePresentation,
      showMenu,
      dropdown,
      showIcon,
      sharedWith,
      shareWithStore,
      myRfpShareWithModalGaLog,
      myRfpShareGaLog,
      myRfpDropdownGaLog,
      myRfpIconTogGaLog,
    }
  },
}
</script>
<style scoped>
.shadow {
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.1), -3px -3px 20px rgba(0, 0, 0, 0.1);
}
</style>
