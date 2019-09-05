<template>
  <div class="wizard-main-container">
    <h1 class="wizard-main-header2 text-primary">
      Scan Existing Contract Landscape
    </h1>
    <div class="w-full my-3">
      <label class="label text-lg font-semibold text-gray-400 uppercase">
        Gpo Affiliation
      </label>
      <input
        v-model.lazy="contractInfo.gpoAffiliation"
        type="text"
        placeholder="Type here"
        class="presentation-wizard-input bg-white border border-gray-200 text-gray-600 w-2/5 block"
        :disabled="editIsDisallowed"
      />
    </div>

    <contract-landscape-table
      :contract-landscape-info="contractInfo.contractLandscape"
      class="mb-4 pb-4"
    />
    <rebate-status-table
      :rebate-status-info="contractInfo.rebateStatus"
      class="mb-4 pb-4"
    />

    <div class="grid grid-flow-row w-full my-2">
      <div class="col-span-2" :class="isOverview ? 'flex items-center' : ''">
        <label class="label" :class="isOverview ? 'w-1/2' : ''">
          <span class="label-text text-lg font-semibold text-gray-400"
            >Create case in SFDC</span
          >
          <br />
          <span class="text-sm font-medium text-gray-400"
            >Enter your SFDC case number. Put (Gladiator) in name of the case
            for tracking purposes.</span
          >
        </label>
        <input
          v-model.lazy="contractInfo.sfdcCaseNumber"
          type="text"
          placeholder="Type something here"
          class="presentation-wizard-input bg-white border border-gray-200 text-gray-600 w-2/5 block my-2"
          :disabled="editIsDisallowed"
        />
      </div>
    </div>
    <div class="flex items-center w-full">
      <div class="text-gray-400 w-1/2">
        <h1 class="text-lg font-semibold">
          Request impact report and deal score for customer at current price
        </h1>
        <span class="text-md font-normal"
          >Refer to slide 2 of the Deal Analytics Guide</span
        >
      </div>
      <input
        v-model.lazy="contractInfo.requestImpactReportAndDealScore"
        type="checkbox"
        class="input-checkbox my-auto"
        :disabled="editIsDisallowed"
      />
    </div>
    <div class="flex items-center w-full pt-3">
      <h1 class="col-span-2 text-lg font-semibold text-gray-400 w-1/2">
        Add sales objective in optimizer if required
      </h1>

      <input
        v-model.lazy="contractInfo.addSalesObjectiveInOptimizerIfRequired"
        type="checkbox"
        class="input-checkbox my-auto"
        :disabled="editIsDisallowed"
      />
    </div>
  </div>
</template>

<script>
import ContractLandscapeTable from './ContractLandscapeTable.vue'
import RebateStatusTable from './RebateStatusTable.vue'
import useRfpFieldEditor from '@/components/newRfp/useRfpFieldEditor.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    ContractLandscapeTable,
    RebateStatusTable,
  },
  setup() {
    const { editIsDisallowed, fieldValue: contractInfo } =
      useRfpFieldEditor('contract')
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    return {
      editIsDisallowed,
      contractInfo,
      isOverview,
    }
  },
}
</script>

<style scoped lang="postcss">
.title-text {
  @apply py-2 font-bold text-lg  text-primary;
}
.input-checkbox {
  @apply w-5 h-5 border-gray-450  text-base font-normal leading-relaxed py-3 px-3 rounded-lg bg-gray-50;
}
</style>
