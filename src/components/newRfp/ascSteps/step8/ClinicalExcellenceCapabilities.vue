<template>
  <div class="wizard-main-container">
    <h1 class="wizard-main-header1">ASC Gladiator Flow</h1>
    <p class="wizard-main-header2 text-red-700">
      Clinical Excellence Capabilities
    </p>
    <p class="font-bold text-gray-500">
      Which business you would like to cover at a high-level with the customer?
    </p>
    <slide-check-box
      v-for="{
        fieldName,
        slideName,
        lableText,
      } in clinicalExcellenceInfoDisplayList"
      :key="fieldName"
      v-model="clinicalExcellenceInfo[fieldName]"
      :lable-text="lableText"
      :slide-name="slideName"
      @update:model-value="
        (newValue) => {
          updateSlideSelection({
            keyName: slideIdentifier[fieldName].name,
            updatedYesNo: newValue,
            slideCodes: slideIdentifier[fieldName].slideCodes,
          })
        }
      "
    />

    <p class="font-bold text-gray-500 pt-3">
      Which specialties and anatomical areas are will you present to your
      customer?
    </p>
    <slide-check-box
      v-for="{ fieldName, slideName, lableText } in kneesDisplayList"
      :key="fieldName"
      v-model="clinicalExcellenceInfo[fieldName]"
      :lable-text="lableText"
      :slide-name="slideName"
      @update:model-value="
        (newValue) => {
          updateSlideSelection({
            keyName: slideIdentifier[fieldName].name,
            updatedYesNo: newValue,
            slideCodes: slideIdentifier[fieldName].slideCodes,
          })
        }
      "
    />

    <multi-radio-input
      v-model="clinicalExcellenceInfo.cusIntrPowerToolsPortfolio"
      :title="'Is the customer interested in learning about the Power Tools portfolio?'"
      :options="['Yes', 'No']"
      detail-info-text="VELYS Robot, VELYS Digital Ecosystem, VELYS Insights"
      class="pt-3"
      @update:model-value="
        (newValue) => {
          updateSlideSelection({
            keyName: slideIdentifier.cusIntrPowerToolsPortfolio.name,
            updatedYesNo: newValue,
            slideCodes: slideIdentifier.cusIntrPowerToolsPortfolio.slideCodes,
          })
        }
      "
    />

    <multi-radio-input
      v-model="clinicalExcellenceInfo.cusIntrExploringEnablingTechnologies"
      :title="'Is the customer interested in exploring enabling technologies?'"
      :options="['Yes', 'No']"
      detail-info-text="Sports Med Solutions- Capital"
      class="pt-3"
      @update:model-value="
        (newValue) => {
          updateSlideSelection({
            keyName: slideIdentifier.cusIntrExploringEnablingTechnologies.name,
            updatedYesNo: newValue,
            slideCodes:
              slideIdentifier.cusIntrExploringEnablingTechnologies.slideCodes,
          })
        }
      "
    />
  </div>
</template>

<script>
import MultiRadioInput from '../sharedComponents/MultiRadioInput.vue'
import SlideCheckBox from './SlideCheckBox.vue'
import useRfpFieldEditor from '@/components/newRfp/useRfpFieldEditor.js'
import { allSlidesIdentifier } from '@/data/allSlidesIdentifier.js'

const clinicalExcellenceInfoDisplayList = [
  {
    fieldName: 'jointReconstruction',
    lableText: 'Joint Reconstruction',
    slideName: 'ASC T&E Summary',
  },
  { fieldName: 'spine', lableText: 'Spine', slideName: 'TBD' },
  {
    fieldName: 'surgicalSports',
    lableText: 'Surgical Sports',
    slideName: 'ASC Joint Recon Summary',
  },
  {
    fieldName: 'traumaExtremities',
    lableText: 'Trauma & Extremities',
    slideName: 'ASC Objectives',
  },
]
const kneesDisplayList = [
  {
    fieldName: 'jointReconstructionKnees',
    lableText: 'Joint Reconstruction: Knees',
    slideName: 'Clinical Excellence Title Slide, Spend Analysis Tool',
  },
  {
    fieldName: 'jointReconstructionHips',
    lableText: 'Joint Reconstruction: Hips',
    slideName:
      'Clinical Excellence Summary,  Spine Solutions Technologies, Simplification Program',
  },
  {
    fieldName: 'jointReconstructionShoulders',
    lableText: 'Joint Reconstruction: Shoulders',
    slideName: 'JR Solution Knee, Capital Acquisitions',
  },
  {
    fieldName: 'spineBiologics',
    lableText: 'Spine: Biologics',
    slideName: 'TBD',
  },
  {
    fieldName: 'spineCervical',
    lableText: 'Spine: Cervical',
    slideName: 'TBD',
  },
  {
    fieldName: 'spineThoracic',
    lableText: 'Spine: Thoracic',
    slideName: 'TBD',
  },
  {
    fieldName: 'sportsMedicineUpperExtremity',
    lableText: 'Sports Medicine: Upper Extremity (Rotator Cuff)',
    slideName: 'Sports Med Solutions- General',
  },
  {
    fieldName: 'sportsMedicineLowerExtremity',
    lableText: 'Sports Medicine: Lower Extremity (ACL)',
    slideName: 'Sports Med Solutions- Shoulder',
  },
  {
    fieldName: 'sportsMedicineCapital',
    lableText: 'Sports Medicine: Capital',
    slideName: 'Sports Med Solutions- Knee',
  },
  {
    fieldName: 'traumaExtremitiesFootAnkle',
    lableText: 'Trauma & Extremities: Foot & Ankle',
    slideName: 'JR Solution Hip, T&E Solutions- Foot Ankle',
  },
  {
    fieldName: 'traumaExtremitiesUpperExtremities',
    lableText: 'Trauma & Extremities: Upper Extremities',
    slideName: 'JR Solution Hip, T&E Solutions- Upper Extremities',
  },
]

export default {
  components: { MultiRadioInput, SlideCheckBox },
  setup() {
    const { fieldValue: clinicalExcellenceInfo, updateSlideSelection } =
      useRfpFieldEditor('clinicalExcellence')
    const slideIdentifier = allSlidesIdentifier['clinicalExcellence']
    return {
      clinicalExcellenceInfo,
      clinicalExcellenceInfoDisplayList,
      kneesDisplayList,
      slideIdentifier,
      updateSlideSelection,
    }
  },
}
</script>
