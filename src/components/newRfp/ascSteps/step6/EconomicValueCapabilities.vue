<template>
  <div class="wizard-main-container">
    <p class="wizard-main-header1">ASC Gladiator Flow</p>

    <p class="wizard-main-header2 text-red-700">Economic Value Capabilities</p>
    <div class="flex flex-grow flex-col">
      <multi-radio-input
        v-model="economicValueCapabilitiesInfo.flexibleSimplifiedBilling"
        :title="'Is the customer interested in a flexible and simplified procedural billing option such as DePuy Synthes Pro-Pak?'"
        :options="['Yes', 'No']"
        @update:model-value="
          (newValue) => {
            updateSlideSelection({
              keyName: slideIdentifier.flexibleSimplifiedBilling.name,
              updatedYesNo: newValue,
              slideCodes: slideIdentifier.flexibleSimplifiedBilling.slideCodes,
            })
          }
        "
      />
      <div
        v-show="
          economicValueCapabilitiesInfo.flexibleSimplifiedBilling === 'Yes'
        "
      >
        <div class="popup">
          <div class="inner">
            <div
              class="flex flex-col space-y-2 justify-start border rounded border-gray-300 p-4 pb-4 pr-8"
            >
              <slide-check-list
                v-for="economicValueCapability in economicValueCapabilitiesDisplay"
                :key="economicValueCapability.fieldName"
                v-model="
                  economicValueCapabilitiesInfo[
                    economicValueCapability.fieldName
                  ]
                "
                :lable-text="economicValueCapability.lableText"
                :slide="economicValueCapability.slide"
                @update:model-value="
                  (newValue) => {
                    updateSlideSelection({
                      keyName:
                        slideIdentifier[economicValueCapability.fieldName].name,
                      updatedYesNo: newValue,
                      slideCodes:
                        slideIdentifier[economicValueCapability.fieldName]
                          .slideCodes,
                    })
                  }
                "
              />
            </div>
          </div>
        </div>
      </div>

      <div
        v-for="radioInput in radioInputs"
        :key="radioInput.fieldName"
        class="w-full mt-4"
      >
        <multi-radio-input
          v-model="economicValueCapabilitiesInfo[radioInput.fieldName]"
          :title="radioInput.title"
          :options="['Yes', 'No']"
          :detail-info-text="radioInput.detailInfoText"
          @update:model-value="
            (newValue) => {
              updateSlideSelection({
                keyName: slideIdentifier[radioInput.fieldName].name,
                updatedYesNo: newValue,
                slideCodes: slideIdentifier[radioInput.fieldName].slideCodes,
              })
            }
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import MultiRadioInput from '../sharedComponents/MultiRadioInput.vue'
import useRfpFieldEditor from '@/components/newRfp/useRfpFieldEditor.js'
import { allSlidesIdentifier } from '@/data/allSlidesIdentifier.js'
import SlideCheckList from '../sharedComponents/SlideCheckList.vue'

const economicValueCapabilitiesDisplay = [
  {
    fieldName: 'jointRecon',
    lableText: 'Joint Recon',
    slide: 'Power Tools Payment Options',
  },
  {
    fieldName: 'spine',
    lableText: 'Spine',
    slide: 'TBD',
  },
  {
    fieldName: 'sports',
    lableText: 'Sports Medicine',
    slide: 'Economic Value Title',
  },
  {
    fieldName: 'traumaEx',
    lableText: 'Trauma & Extremities',
    slide: 'Power Tools: T&E,Economic Value Summary',
  },
]

const radioInputs = [
  {
    fieldName: 'orthopaedicUsageData',
    title: 'Has the customer shared orthopaedic usage data?',
    detailInfoText:
      "Work with your Commercial Execution partner tp summarize the customer's data and share potential cost savings",
  },
  {
    fieldName: 'learningAboutSourceView',
    title: 'If no, are they be open to learning about SourceView?',
    detailInfoText: 'Need to Find',
  },
  {
    fieldName: 'targetForTPS',
    title: 'Is the customer a target for Trauma Platinum Solutions (TPS)?',
    detailInfoText: 'DePuy Synthes Pro-Pak Illustration',
  },
  {
    fieldName: 'costSavingsOptimizngEfficieny',
    title:
      'Is the customer looking for cost savings and optimizng efficieny for Trauma & Extremities cases?',
    detailInfoText:
      'ASC Construct Pricing | Joint Recon,Operational Support Summary',
  },
  {
    fieldName: 'reimbursementService',
    title:
      'Is your customer interested in learning about Reimbursement service?',
    detailInfoText: 'Capital and Rebate Options',
  },
]

export default {
  components: { MultiRadioInput, SlideCheckList },
  setup() {
    const {
      editIsDisallowed,
      fieldValue: economicValueCapabilitiesInfo,
      updateSlideSelection,
    } = useRfpFieldEditor('economicValueCapabilities')

    const slideIdentifier = allSlidesIdentifier['economicValueCapabilities']

    return {
      editIsDisallowed,
      economicValueCapabilitiesInfo,
      economicValueCapabilitiesDisplay,
      radioInputs,
      slideIdentifier,
      updateSlideSelection,
    }
  },
}
</script>

<style scoped lang="postcss">
.popup {
  width: 600px;
  position: relative;
}

.popup:before {
  content: '';
  width: 20px;
  height: 20px;
  transform: rotate(225deg);
  background: #fff;
  position: absolute;
  box-shadow: 1px 1px 1px rgba(138, 127, 127, 0.5);
  border: 1px gray;
  top: 22px;
  left: calc(3.5% - 10px);
}

.inner {
  padding: 30px 0;
  background: #fff;
  border-radius: 5px;
}
</style>
