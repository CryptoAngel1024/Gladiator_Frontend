<template>
  <div class="flex py-7 flex-col items-start">
    <h1
      v-if="!isOverview"
      class="text-header-jnj text-primary pb-5"
      data-test="scan-existing-contract"
    >
      Scan Existing Contract Landscape
    </h1>
    <h1 class="text-subheader" data-test="contract-sub-header">
      Scan and Record The Contract Landscape
    </h1>
    <contract-table
      :contract="contractData"
      @update-contractdata="updateContractdata"
    />

    <h1 class="text-subheader pt-9">
      Is price available as a lever at this time with this customer
      <span
        v-if="isOverview"
        class="ml-12"
        :class="contractData.priceAvailable ? 'text-blue-600' : 'text-red-600'"
        >{{ contractData.priceAvailable ? 'Yes' : 'No' }}</span
      >
    </h1>
    <div class="py-4">
      <div v-if="!isOverview" class="flex space-x-10">
        <div class="flex items-center space-x-2">
          <input
            id="yesPriceAvailable"
            v-model.lazy="contractData.priceAvailable"
            name="priceAvailable"
            class="presentation-wizard-radio"
            type="radio"
            :value="true"
            :disabled="editIsDisallowed"
            data-test="contract-priceAvailable"
          />

          <label for="yesPriceAvailable" class="text-normal text-gray-450"
            >Yes
          </label>
        </div>
        <div class="flex items-center space-x-2">
          <input
            id="priceNotAvailable"
            v-model.lazy="contractData.priceAvailable"
            name="priceAvailable"
            class="presentation-wizard-radio"
            type="radio"
            :value="false"
            :disabled="editIsDisallowed"
          />

          <label for="priceNotAvailable" class="text-normal text-gray-450"
            >No
          </label>
        </div>
      </div>
    </div>
    <h1 class="text-subheader pt-4">Create case in SFDC</h1>
    <h1
      v-if="!isOverview"
      class="text-sm font-light font-JnJ py-1"
      data-test="sfdc-case-number"
    >
      Enter your SFDC case number. Put (Gladiator) in name of the case for
      tracking purposes.
    </h1>

    <input
      v-model.lazy="contractData.sfdcCaseNumber"
      placeholder="Type Something here ..."
      class="presentation-wizard-input w-full border p-4 rounded-md h-14 my-1 max-w-xs"
      :disabled="editIsDisallowed"
    />
    <div class="flex space-x-6 items-start pt-4">
      <div class="flex flex-col">
        <h1 class="text-subheader">
          Build roster of the customer in SDFC (List of hospitals under this
          contract)
        </h1>
        <h1 v-if="!isOverview" class="text-sm font-light font-JnJ py-1">
          Refer to slide 2 of the Deal Analytics Guide
        </h1>
      </div>
      <input
        id="buildRoster"
        v-model.lazy="contractData.buildRoster"
        type="checkbox"
        class="w-5 h-5 border-2 border-gray-450"
        :disabled="editIsDisallowed"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import ContractTable from './ContractTable.vue'
import { useRoute } from 'vue-router'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'
import { watch, ref, computed } from 'vue'

export default {
  components: {
    ContractTable,
  },

  setup() {
    const store = useStore()
    const route = useRoute()

    const presentation = computed(() =>
      store.getters['rfps/getPresentationById'](route.params.presentationId),
    )

    const contractData = ref(
      JSON.parse(
        JSON.stringify(
          presentation.value.contract || {
            gpoAffilation: '',
            numberAndName: '',
            endDate: '',
            notes: '',
            priceAvailable: null,
          },
        ),
      ),
    )

    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    const editIsDisallowed = useRfpEditIsDisabled()

    const updateContractdata = (contractDetail) => {
      contractData.value.gpoAffilation = contractDetail.gpoAffilation
      contractData.value.numberAndName = contractDetail.numberAndName
      contractData.value.endDate = contractDetail.endDate
      contractData.value.notes = contractDetail.notes
    }

    watch(
      contractData,
      (contractData) => {
        store.commit(
          'rfps/updateRfp',
          JSON.parse(
            JSON.stringify({
              ...presentation.value,
              contract: contractData,
            }),
          ),
        )
      },
      { deep: true },
    )

    return {
      contractData,
      isOverview,
      editIsDisallowed,
      updateContractdata,
    }
  },
}
</script>
<style scoped>
input:disabled {
  background-color: white;
}
</style>
