<template>
  <div class="wizard-main-container">
    <h1 class="wizard-main-header1">ASC Gladiator Flow</h1>

    <p class="wizard-main-header2 text-red-700">
      Operational Support Capabilities
    </p>

    <p class="font-bold text-gray-500 pb-4">
      What is the customer's Electronic Medical Record (EMR) or Electronic
      History Record (EHR) system?
    </p>

    <input
      v-model.lazy="operationalSupport.customerEMR"
      placeholder="Type Here"
      class="presentation-wizard-input min-w-56 w-1/2"
      :disabled="editIsDisallowed"
    />

    <multi-radio-input
      v-model="operationalSupport.goodTarget"
      title="Is the customer a good target for VELYS Insights?"
      :options="['Yes', 'No', 'I don`t know']"
      show-detail-info-if="I don`t know"
      detail-info-text="Work with your ASC Field Manager to understand if this customer would be a good target for VELYS Insights"
      class="mt-6 mb-2"
      @update:model-value="
        (newValue) => {
          updateSlideSelection({
            keyName: slideIdentifier.goodTarget.name,
            updatedYesNo: newValue,
            slideCodes: slideIdentifier.goodTarget.slideCodes,
          })
        }
      "
    />

    <multi-radio-input
      v-model="operationalSupport.acm1"
      :title="'Is the customer exploring reducing costs and operational complexity with supply chain solutions like Advance Case Management (ACM)?'"
      :options="['Yes', 'No']"
      detail-info-text="Reimbursement Support"
      class="mt-6 mb-2"
      @update:model-value="
        (newValue) => {
          updateSlideSelection({
            keyName: slideIdentifier.acm1.name,
            updatedYesNo: newValue,
            slideCodes: slideIdentifier.acm1.slideCodes,
          })
        }
      "
    />

    <multi-radio-input
      v-model="operationalSupport.acm2"
      :title="'Is the customer exploring reducing costs and operational complexity with supply chain solutions like Advance Case Management (ACM)?'"
      :options="['Yes', 'No']"
      class="mt-4 mb-2"
      @update:model-value="
        (newValue) => {
          updateSlideSelection({
            keyName: slideIdentifier.acm2.name,
            updatedYesNo: newValue,
            slideCodes: slideIdentifier.acm2.slideCodes,
          })
        }
      "
    />
    <div
      v-show="operationalSupport.acm2 === 'Yes'"
      class="w-full max-w-lg mt-0"
    >
      <div class="popup2">
        <div class="inner1">
          <div
            class="flex flex-col space-y-2 justify-start border rounded border-gray-300 p-4 pb-4 pr-8"
          >
            <slide-check-list
              v-for="acmDisplay in acmDisplayList"
              :key="acmDisplay.fieldName"
              v-model="operationalSupport.acm[acmDisplay.fieldName]"
              :lable-text="acmDisplay.lableText"
              :slide="acmDisplay.slideName"
              @update:model-value="
                (newValue) => {
                  updateSlideSelection({
                    keyName: slideIdentifier[acmDisplay.fieldName].name,
                    updatedYesNo: newValue,
                    slideCodes:
                      slideIdentifier[acmDisplay.fieldName].slideCodes,
                  })
                }
              "
            />
          </div>
        </div>
      </div>
    </div>

    <multi-radio-input
      v-model="operationalSupport.understandingJnJ"
      :title="`Is the customer interested in understanding Johnson & Johnson's Healthy Workforce Offering?`"
      :options="['Yes', 'No']"
      detail-info-text="ACM"
      class="mt-4 mb-2"
      @update:model-value="
        (newValue) => {
          updateSlideSelection({
            keyName: slideIdentifier.understandingJnJ.name,
            updatedYesNo: newValue,
            slideCodes: slideIdentifier.understandingJnJ.slideCodes,
          })
        }
      "
    />
    <multi-radio-input
      v-model="operationalSupport.patientPrograms"
      :title="`Is the customer interested in patient programs?`"
      :options="['Yes', 'No']"
      detail-info-text="Building an ASC"
      class="mt-4 mb-2"
      @update:model-value="
        (newValue) => {
          updateSlideSelection({
            keyName: slideIdentifier.patientPrograms.name,
            updatedYesNo: newValue,
            slideCodes: slideIdentifier.patientPrograms.slideCodes,
          })
        }
      "
    />
    <multi-radio-input
      v-model="operationalSupport.onDemandEducation"
      :title="`Is your customer interested in on-demand education?`"
      :options="['Yes', 'No']"
      detail-info-text="Reimbursement Example: Hip"
      class="mt-4 mb-2"
      @update:model-value="
        (newValue) => {
          updateSlideSelection({
            keyName: slideIdentifier.onDemandEducation.name,
            updatedYesNo: newValue,
            slideCodes: slideIdentifier.onDemandEducation.slideCodes,
          })
        }
      "
    />
  </div>
</template>

<script>
import MultiRadioInput from '../sharedComponents/MultiRadioInput.vue'
import useRfpFieldEditor from '@/components/newRfp/useRfpFieldEditor.js'
import { allSlidesIdentifier } from '@/data/allSlidesIdentifier.js'
import SlideCheckList from '../sharedComponents/SlideCheckList.vue'
const acmDisplayList = [
  { fieldName: 'joint', lableText: 'Joint', slideName: 'MEDJ App' },
  { fieldName: 'trauma', lableText: 'Trauma', slideName: 'Slide TBD' },
  {
    fieldName: 'orthopaedics',
    lableText: 'Orthopaedics',
    slideName: 'Slide TBD',
  },
]

export default {
  components: { MultiRadioInput, SlideCheckList },
  setup() {
    const {
      editIsDisallowed,
      fieldValue: operationalSupport,
      updateSlideSelection,
    } = useRfpFieldEditor('operationalSupportCapabilities')

    const slideIdentifier =
      allSlidesIdentifier['operationalSupportCapabilities']
    return {
      editIsDisallowed,
      operationalSupport,
      acmDisplayList,
      slideIdentifier,
      updateSlideSelection,
    }
  },
}
</script>

<style scoped lang="postcss">
.popup2 {
  position: relative;
}

.popup2:before {
  content: '';
  width: 15px;
  height: 15px;
  transform: rotate(225deg);
  background: #fff;
  position: absolute;
  box-shadow: 1px 1px 1px rgba(138, 127, 127, 0.5);
  border: 1px gray;
  top: -6px;
  left: 7px;
}
</style>
