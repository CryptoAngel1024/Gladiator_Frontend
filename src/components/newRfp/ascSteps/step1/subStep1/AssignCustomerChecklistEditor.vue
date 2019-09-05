<template>
  <div class="wizard-main-container">
    <div class="flex" :class="isOverview ? 'flex-row' : 'flex-col'">
      <h1
        class="font-bold text-gray-500"
        :class="isOverview ? 'mr-4' : 'pb-2 pr-8'"
      >
        Assign check list editor
      </h1>
      <check-list-editor-table />
    </div>

    <h2
      class="text-base font-bold leading-none text-gray-800 pt-6"
      data-test="customer-name-lable"
    >
      Customer Name
    </h2>

    <input
      v-model.lazy="presentationInfo.customerName"
      pattern="[^-/:?#[\]@!$&'()*+,;=\\]+"
      class="presentation-wizard-input customer-name-input w-full border min-w-56 text-primary placeholder-red-400"
      :class="
        isOverview
          ? 'text-3xl font-bold font-JnJ mb-2'
          : 'h-14 my-2 px-3 w-1/4 text-xl font-bold'
      "
      placeholder="Enter Customer Name Here"
      data-test="customer-name-input"
      :disabled="editIsDisallowed"
      required
    />
    <span
      v-if="customerNameIsInvalid"
      class="text-sm w-full text-red-600 -mb-6 pt-1"
      data-test="customer-info-step-name-invalid"
    >
      {{
        presentationInfo.customerName
          ? `(No "- / \ : ? # [ ] @ ! $ & ' ( ) * + , ; =" allowed)`
          : `Please Enter Customer Name`
      }}
    </span>
    <div class="flex pt-6 w-full">
      <h1
        class="pb-2 text-base font-bold mt-2 leading-none text-gray-500 min-h-30"
        data-test="customer-logo"
      >
        Customer Logo
        <customer-logo
          ref="customerLogoUploader"
          class="w-40 mt-2 h-28"
          img-class="w-40"
        />
      </h1>
    </div>
    <customer-overview />

    <h1 class="text-header-jnj text-primary my-4">
      Ownership &amp; Board Structure
    </h1>

    <ownership-and-board-structure />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'
import { cloneDeep } from 'lodash'
import CheckListEditorTable from './CheckListEditorTable.vue'
import CustomerOverview from './CustomerOverview.vue'
import OwnershipAndBoardStructure from './OwnershipAndBoardStructure.vue'
import CustomerLogo from '@/components/newRfp/UploadCustomerLogo.vue'

export default {
  components: {
    OwnershipAndBoardStructure,
    CustomerOverview,
    CheckListEditorTable,
    CustomerLogo,
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

    const presentationInfo = ref(cloneDeep(presentationState.value))

    watch(
      presentationId,
      () => (presentationInfo.value = cloneDeep(presentationState.value)),
    )

    const customerNameIsInvalid = ref(false)

    function checkCustomerNameValidity() {
      customerNameIsInvalid.value =
        /[-/:?#[\]@!$&'()*+,;=\\]+/.test(presentationInfo.value.customerName) ||
        (!isNewRfp.value && presentationInfo.value.customerName.length === 0)
    }

    const updatePresentationInfo = () => {
      if (isOverview.value) return

      checkCustomerNameValidity()

      const updatedPresentation = JSON.parse(
        JSON.stringify({
          ...presentationState.value,
          customerName: presentationInfo.value?.customerName,
        }),
      )
      if (isNewRfp.value) {
        store.commit('rfps/setCurrentRfp', updatedPresentation)
      } else {
        if (!presentationInfo.value.customerName) return
        store.commit('rfps/updateRfp', updatedPresentation)
      }
    }

    watch(presentationInfo, updatePresentationInfo, {
      deep: true,
    })

    const editIsDisallowed = useRfpEditIsDisabled(true)
    const customerLogoUploader = ref(null)
    const uploadImage = (presentationIdParam) =>
      customerLogoUploader.value?.uploadImage(presentationIdParam)

    return {
      presentationInfo,
      editIsDisallowed,
      isOverview,
      customerLogoUploader,
      customerNameIsInvalid,
      uploadImage,
    }
  },
}
</script>
<style scoped lang="postcss">
.customer-name-input {
  @apply font-bold;
}
</style>
