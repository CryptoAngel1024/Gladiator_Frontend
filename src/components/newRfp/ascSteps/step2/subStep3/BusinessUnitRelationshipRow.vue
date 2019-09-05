<template>
  <div
    class="flex flex-row w-full space-x-4 py-3 items-center"
    :class="isOverview ? 'border-b' : ''"
  >
    <h1 class="w-1/5 font-semibold text-lg uppercase">
      {{ businessUnitRelationData.title }}
    </h1>
    <div class="w-1/5">
      <div class="grid grid-cols-2 w-2/3">
        <div class="flex space-x-2">
          <input
            :id="`isBuEngagedWithCustomer${indexData}`"
            v-model="businessUnitRelationData.isBuCurrentlyEngagedWithCustomer"
            :name="`isBuEngagedWithCustomer${indexData}`"
            class="presentation-wizard-radio my-auto"
            type="radio"
            :value="true"
            :disabled="editIsDisallowed"
          />
          <label
            :for="`isBuEngagedWithCustomer${indexData}`"
            class="text-normal text-gray-450 my-auto"
            >Yes
          </label>
        </div>
        <div class="flex space-x-2">
          <input
            :id="`isBuEngagedWithCustomer${indexData}`"
            v-model="businessUnitRelationData.isBuCurrentlyEngagedWithCustomer"
            :name="`isBuEngagedWithCustomer${indexData}`"
            class="presentation-wizard-radio my-auto"
            type="radio"
            :disabled="editIsDisallowed"
            :value="false"
          />
          <label
            :for="`isBuEngagedWithCustomer${indexData}`"
            class="text-normal text-gray-450 my-auto"
            >No
          </label>
        </div>
      </div>
    </div>
    <select
      v-model="businessUnitRelationData.buRelationWithCustomerRating"
      class="presentation-wizard-select w-1/5"
      :disabled="editIsDisallowed"
    >
      <option value="" disabled selected>Select Here</option>
      <option value="veryWeak">Very Weak</option>
      <option value="weak">Weak</option>
      <option value="neutral">Neutral</option>
      <option value="strong">Strong</option>
      <option value="veryStrong">Very Strong</option>
      <option value="notAvailable">N/A</option>
    </select>
    <input
      v-model.lazy="businessUnitRelationData.bulastEngagementWithCustomer"
      class="presentation-wizard-input w-1/5"
      placeholder="Enter Here"
      :disabled="editIsDisallowed"
    />
    <select
      v-model="businessUnitRelationData.lastEngagementOfBuWithCustomer"
      class="presentation-wizard-select w-1/5"
      :disabled="editIsDisallowed"
    >
      <option value="" disabled selected>Select Here</option>
      <option value="contractingConversion">Contracting Conversion</option>
      <option value="newProductIntroduction">New Product Introduction</option>
      <option value="profEd">Prof Ed</option>
      <option value="recurringMeeting">Recurring Meeting</option>
      <option value="rfpRfi">RFP/RFI</option>
      <option value="siteVisit">Site Visit</option>
      <option value="staffTraining">Staff Training</option>
      <option value="notApplicable">Not Applicable</option>
      <option value="oneTimeMeeting">One Time Meeting</option>
      <option value="productEvaluation">Product Evaluation</option>
    </select>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  props: {
    businessUnitRelation: { type: Object, required: true },
    index: { type: Number, required: true },
  },
  setup(props) {
    const editIsDisallowed = useRfpEditIsDisabled()

    const businessUnitRelationData = ref(props.businessUnitRelation)
    const indexData = ref(props.index)
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    return { businessUnitRelationData, editIsDisallowed, indexData, isOverview }
  },
}
</script>
