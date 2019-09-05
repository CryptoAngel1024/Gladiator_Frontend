<template>
  <div class="wizard-main-container">
    <h1 v-if="!isOverview" data-test="customer-name-lable">
      Customer Name<sup>*</sup>
    </h1>
    <div class="w-full">
      <customer-logo v-if="isOverview" class="pr-16" />
      <input
        v-model.lazy="customerInfo.customerName"
        pattern="[^-/:?#[\]@!$&'()*+,;=\\]+"
        class="presentation-wizard-input rounded min-w-56 py-3 text-primary outline-none font-bold placeholder-red-400"
        :class="isOverview ? 'text-3xl' : 'border-b'"
        placeholder="Enter Customer Name Here"
        data-test="customer-name-input"
        :disabled="editIsDisallowed"
        required
      />
    </div>
    <span
      v-if="customerNameIsInvalid"
      class="text-sm w-full text-red-600 -mb-6 pt-1"
      data-test="customer-info-step-name-invalid"
    >
      {{
        customerInfo.customerName
          ? `(No "- / \ : ? # [ ] @ ! $ & ' ( ) * + , ; =" allowed)`
          : `Please Enter Customer Name`
      }}
    </span>

    <div class="flex pt-10 w-full">
      <div v-if="!isOverview" class="flex flex-col items-start pr-14">
        <h1
          class="pb-6 text-base font-bold leading-none text-gray-500"
          data-test="customer-logo"
        >
          Customer Logo
        </h1>
        <customer-logo
          ref="customerLogoUploader"
          class="w-40"
          img-class="w-40"
        />
      </div>
      <div class="flex-col items-start flex flex-grow">
        <h1
          class="pb-6 text-base font-bold leading-none text-gray-500"
          data-test="contacts"
        >
          Contacts
        </h1>
        <table class="border-b border-gray-200 sm:rounded-lg min-w-72 w-full">
          <thead
            class="text-left text-xs font-medium uppercase tracking-wider"
            :class="
              isOverview ? 'text-white bg-blue-555' : 'bg-gray-75 text-gray-600'
            "
            data-test="newRfp-drafts"
          >
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Email</th>
            <th scope="col">Options</th>
          </thead>
          <tbody class="bg-white">
            <tr
              v-for="contact in customerInfo.contacts"
              :key="contact.email"
              :data-test="`contacts-table-row-${contact.email}`"
            >
              <td class="">
                <div class="flex items-center">
                  <div
                    class="flex-shrink-0 h-10 w-10 bg-gray-400 rounded-full"
                  />
                  <input
                    v-model.lazy="contact.name"
                    class="presentation-wizard-input min-w-28 w-full ml-4"
                    placeholder="Enter Name Here..."
                    data-test="contacts-table-name-input"
                    :disabled="editIsDisallowed"
                  />
                </div>
              </td>

              <td class="">
                <input
                  v-model.lazy="contact.role"
                  class="presentation-wizard-input min-w-28 w-full"
                  placeholder="Enter Role"
                  data-test="contacts-table-role-input"
                  :disabled="editIsDisallowed"
                />
              </td>

              <td class="">
                <input
                  v-model.lazy="contact.email"
                  class="presentation-wizard-input min-w-28 w-full"
                  type="email"
                  placeholder="Email here ..."
                  data-test="contacts-table-email-input"
                  :disabled="editIsDisallowed"
                />
              </td>

              <td>
                <div class="flex justify-center">
                  <a :href="'mailto:' + contact.email">
                    <svg-icon
                      v-if="contact.email"
                      name="message"
                      class="h-4 w-5"
                    />
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <dp-button
          v-if="!isOverview"
          type="button"
          text="+ Add more"
          class="py-4 border border-dashed w-1/2 rounded-md font-medium text-gray-800 mt-6 mb-2"
          :disabled="editIsDisallowed"
          data-test="add-more"
          @click="customerInfo.contacts.push({}), customerInfoAddMoreGaLog()"
        />
      </div>
    </div>
    <h1 class="text-subheader pt-9" data-test="customer-insight">
      Customer Insights:
    </h1>
    <h1
      v-if="!isOverview"
      class="text-sm font-light font-JnJ py-1"
      data-test="customer-info-step-insights-help"
    >
      Please list your information that would be helpful about this customer
    </h1>

    <textarea
      v-model.lazy="customerInfo.customerProblem"
      placeholder="Type Something here ..."
      class="presentation-wizard-textarea w-full border p-4 rounded-md h-32 my-1 outline-none"
      data-test="customer-problem-input"
      :disabled="editIsDisallowed"
    />
  </div>
</template>

<script>
import CustomerLogo from '@/components/newRfp/UploadCustomerLogo.vue'
import DpButton from '../buttons/DpButton.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from '@vue/runtime-core'
import SvgIcon from '@/components/utils/SvgIcon.vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'
import { cloneDeep } from 'lodash'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: {
    CustomerLogo,
    SvgIcon,
    DpButton,
  },

  setup() {
    const store = useStore()
    const route = useRoute()
    const presentationId = computed(() => route.params.presentationId)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    const isNewRfp = computed(() => !presentationId.value)

    const presentationState = computed(() =>
      store.getters['rfps/getPresentationById'](presentationId.value),
    )

    const existingContacts = presentationState.value.contact.filter(
      (contact) => contact.email,
    )

    const customerInfoComputed = computed(() => ({
      customerName: presentationState.value.customerName,
      contacts: isOverview.value
        ? existingContacts
        : presentationState.value.contact,
      customerProblem: presentationState.value.customerProblem,
    }))

    const customerInfo = ref(cloneDeep(customerInfoComputed.value))

    watch(
      presentationId,
      () => (customerInfo.value = cloneDeep(customerInfoComputed.value)),
    )

    const customerNameIsInvalid = ref(false)

    function checkCustomerNameValidity() {
      customerNameIsInvalid.value =
        /[-/:?#[\]@!$&'()*+,;=\\]+/.test(customerInfo.value.customerName) ||
        (!isNewRfp.value && customerInfo.value.customerName.length === 0)
    }

    const updateCustomerInfo = () => {
      if (isOverview.value) return

      checkCustomerNameValidity()

      const updatedPresentation = JSON.parse(
        JSON.stringify({
          ...presentationState.value,
          customerName: customerInfo.value.customerName,
          contact: customerInfo.value.contacts.filter(
            ({ email, name, role }) => email || name || role,
          ),
          customerProblem: customerInfo.value.customerProblem,
        }),
      )
      if (isNewRfp.value) {
        store.commit('rfps/setCurrentRfp', updatedPresentation)
      } else {
        if (!customerInfo.value.customerName) return
        store.commit('rfps/updateRfp', updatedPresentation)
      }
    }

    watch(customerInfo, updateCustomerInfo, {
      deep: true,
    })

    const customerLogoUploader = ref(null)
    const uploadImage = (presentationIdParam) =>
      customerLogoUploader.value?.uploadImage(presentationIdParam)

    const editIsDisallowed = useRfpEditIsDisabled()

    const customerInfoAddMoreGaLog = () => {
      gaEvent({
        action: 'add-more-contacts-in-customer-information',
        event_category: 'presentation',
        event_label: 'User-added-more-contacts-in-customer-information',
      })
    }
    return {
      customerInfo,
      customerLogoUploader,
      uploadImage,
      editIsDisallowed,
      isOverview,
      customerInfoAddMoreGaLog,
      customerNameIsInvalid,
      checkCustomerNameValidity,
    }
  },
}
</script>

<style scoped lang="postcss">
input {
  @apply font-bold leading-relaxed  focus:outline-none;
}
th {
  @apply px-6 py-3;
}
td {
  @apply px-6 py-4 whitespace-nowrap;
}
input:disabled {
  background-color: white;
}
textarea:disabled {
  background-color: white;
}
</style>
