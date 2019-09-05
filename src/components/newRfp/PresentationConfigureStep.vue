<template>
  <div class="py-7">
    <h1 class="text-header-jnj text-primary pb-5">
      Configure your presentation
    </h1>
    <RadioSlides
      :key-name="keyNameList.keyName_1"
      :slide-codes="slideIdentifier.radioSlide_1"
      question="Go through our prebuilt value stories utilizing 3rd party data to assess if one or more of these could be impactful at your customer. Do you need prebuilt value stories utilizing 3rd party data?"
      description-yes="Saving Slides using 3rd party data selected"
      @change-option="updateSlideSelection"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_2"
      :slide-codes="slideIdentifier.radioSlide_2"
      question="Has the customer shared usage data now or in recent past that can be used by the SourceView tool to prepare a customized analysis?"
      description-yes="Your procedure spend and saving opportunities slide selected"
      description-no="SourceView Slide selected"
      @change-option="updateSlideSelection"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_3"
      :slide-codes="slideIdentifier.radioSlide_3"
      question="Is price a lever?"
      @change-option="updateSlideSelection"
    >
      <template #link>
        <div
          v-if="slideSelection.isPricingLever == true"
          class="font-bold rfp-config-question-box p-2 w-full flex items-center my-2"
        >
          <img
            class="w-8 h-8"
            src="@/assets/images/slide_bell.svg"
            alt="bell"
          />
          <div class="pl-2">
            <p>
              VPR Strategy Refresher -
              <a
                class="flex-wrap"
                href="https://optimizer.jnj.com/Optimizer/sec/collateral?linkId=37883"
              >
                https://optimizer.jnj.com/Optimizer/sec/collateral?linkId=37883</a
              >
            </p>
            <p>
              VPR Impact Tool -
              <a
                href="https://optimizer.jnj.com/Optimizer/sec/collateral?linkId=37944"
              >
                https://optimizer.jnj.com/Optimizer/sec/collateral?linkId=37944
              </a>
            </p>
            <p>
              VPR Procedure and Tech List -
              <a
                href="https://optimizer.jnj.com/Optimizer/sec/collateral?linkId=37882"
              >
                https://optimizer.jnj.com/Optimizer/sec/collateral?linkId=37882</a
              >
            </p>
          </div>
        </div>
      </template>
    </RadioSlides>
    <RadioSlides
      :key-name="keyNameList.keyName_4"
      :slide-codes="slideIdentifier.radioSlide_4"
      question="Would TPS Solutions be appealing to the customer?"
      description-yes="TPS Solution Slides Selected"
      class="break-after-page"
      @change-option="updateSlideSelection"
    />
    <overviewLink
      v-for="(linkItem, i) in linkList.slice(0, 3)"
      :key="i"
      :link="linkItem.link"
      :header-text="linkItem.headerText"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_5"
      :slide-codes="slideIdentifier.radioSlide_5"
      question="Would the customer be receptive eSIMS which would enhance their inventory management and ordering processes?"
      description-yes="Depuy Synthes Inventory Management System (eSIMs) Slide Selected"
      @change-option="updateSlideSelection"
    />

    <RadioSlides
      :key-name="keyNameList.keyName_26"
      :slide-codes="slideIdentifier.radioSlide_26"
      question="Hip Fracture Care - Would this customer be interested in reducing ALOS for their hip fracture patients?"
      description-yes="Hip Fractures slides selected."
      @change-option="updateSlideSelection"
    />

    <RadioSlides
      :key-name="keyNameList.keyName_6"
      :slide-codes="slideIdentifier.radioSlide_6"
      question="Is there an interest in Sterile Containers? Use BaseCase to prepare a budget impact calculation."
      description-yes="Reusable Sterile Container System Slides Selected. Upload image from budget impact calculator."
      @change-option="updateSlideSelection"
    >
      <template #link>
        <div
          v-if="slideSelection.sterileContainers == true"
          class="flex font-bold rfp-config-question-box items-center p-2"
        >
          <img
            class="w-8 h-8"
            src="@/assets/images/slide_bell.svg"
            alt="bell"
          />
          <p class="px-2">
            Contact Michael Erb. Access BaseCase.com login [<a
              href="https://interactive.basecase.com/#/library"
              >https://interactive.basecase.com/#/library</a
            >]
          </p>
        </div>
      </template>
    </RadioSlides>

    <RadioSlides
      :key-name="keyNameList.keyName_7"
      :slide-codes="slideIdentifier.radioSlide_7"
      question="Is there an interest in Universal Small Frag- Use BaseCase to prepare a budget impact calculation."
      description-yes="Reusable Universal Small Frag Slides Selected. Upload image from budget impact calculator."
      @change-option="updateSlideSelection"
    >
      <template #link>
        <div
          v-if="slideSelection.universalSmallFrag == true"
          class="flex font-bold rfp-config-question-box items-center p-2"
        >
          <img
            class="w-8 h-8"
            src="@/assets/images/slide_bell.svg"
            alt="bell"
          />
          <p class="px-2">
            Contact Michael Erb. Access BaseCase.com login [<a
              href="https://interactive.basecase.com/#/library"
              >https://interactive.basecase.com/#/library</a
            >]
          </p>
        </div>
      </template>
    </RadioSlides>
    <RadioSlides
      :key-name="keyNameList.keyName_8"
      :slide-codes="slideIdentifier.radioSlide_8"
      question="Does your customer have interest in Capital Placement Programs?"
      @change-option="updateSlideSelection"
    >
      <template #link>
        <div
          v-if="slideSelection.capitalPlacementProgram == true"
          class="flex font-bold rfp-config-question-box items-center p-2"
        >
          <img
            class="w-8 h-8"
            src="@/assets/images/slide_bell.svg"
            alt="bell"
          />
          <p class="pl-2">Contact Michael Gandolfo, and Deepak Sharma</p>
        </div>
      </template>
    </RadioSlides>
    <MultiSlides
      :key-name="keyNameList.keyName_9"
      :slide-codes="slideIdentifier.radioSlide_9"
      header-text="Select what Type of trauma hospital:"
      class="break-before-page print:mt-5"
      @change-option="updateSlideSelection"
    />
    <h3 class="font-bold text-gray-500 pt-6">
      Do you need the following slides:
    </h3>
    <RadioSlides
      :key-name="keyNameList.keyName_10"
      :slide-codes="slideIdentifier.radioSlide_10"
      question="Savings Summary- Prepare a savings summary to highlight the overall savings for the customer."
      description-yes="Saving Summary Slide Selected."
      @change-option="updateSlideSelection"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_11"
      :slide-codes="slideIdentifier.radioSlide_11"
      question="Surgeon Plan"
      @change-option="updateSlideSelection"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_12"
      :slide-codes="slideIdentifier.radioSlide_12"
      question="Would an Implementation Plan/Training Plan be valuable to show?"
      @change-option="updateSlideSelection"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_13"
      :slide-codes="slideIdentifier.radioSlide_13"
      question="Is the customer interested in understanding more about the partnership between DPS and the AO?"
      description-yes="AO Slides Selected."
      @change-option="updateSlideSelection"
    />
    <!-- <RadioSlides
      :key-name="keyNameList.keyName_14"
      :slide-codes="slideIdentifier.radioSlide_14"
      question="Product Portfolio slides 52 - 54 and 62 onwards (** Sarah to help add in Why DPS product slides)"
      @change-option="updateSlideSelection"
    /> -->
    <RadioSlides
      :key-name="keyNameList.keyName_15"
      :slide-codes="slideIdentifier.radioSlide_15"
      question="Would you like to outline the personel within your DPS trauma team for the customer?"
      description-yes="Industry Leading Field Sales Organization Slide Selected."
      @change-option="updateSlideSelection"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_16"
      :slide-codes="slideIdentifier.radioSlide_16"
      question="Would you like to show an Overview of DPS Trauma US?"
      description-yes="DePuy Synthes Trauma Slide Selected."
      @change-option="updateSlideSelection"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_17"
      :slide-codes="slideIdentifier.radioSlide_17"
      question="Is there an opportunity to show the customer standardization in Biologics?"
      description-yes="Bilogics and Power Slides Selected."
      @change-option="updateSlideSelection"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_18"
      :slide-codes="slideIdentifier.radioSlide_18"
      question="Is there a rebate or NBI in place for this customer?"
      description-yes="Performance Rebates and NBI's Slide Selected Upload an Image of slides from SCG partner."
      class="break-before-page print:mt-5"
      @change-option="updateSlideSelection"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_19"
      :slide-codes="slideIdentifier.radioSlide_19"
      question="Would you like to show the customer our Instrument warranty policy?"
      description-yes="Instrument Warrenty slide selected."
      @change-option="updateSlideSelection"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_20"
      :slide-codes="slideIdentifier.radioSlide_20"
      question="Is the customer interested in the Professional Education we have available?"
      description-yes="Professional Education slides selected."
      @change-option="updateSlideSelection"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_21"
      :slide-codes="slideIdentifier.radioSlide_21"
      question="Is the customer interested in our future leaders learning program?"
      description-yes="JJI Future Leaders Slide selected."
      @change-option="updateSlideSelection"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_22"
      :slide-codes="slideIdentifier.radioSlide_22"
      question="Is the customer interested in seeing the partnerhips we have with other companies?"
      description-yes="Broad Portfolio investment in innovation slide selected."
      @change-option="updateSlideSelection"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_23"
      :slide-codes="slideIdentifier.radioSlide_23"
      question="Is the customer interested in seeing our future product pipeline?"
      description-yes="Innovation timeline slide selected."
      @change-option="updateSlideSelection"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_24"
      :slide-codes="slideIdentifier.radioSlide_24"
      question="Is the customer interested in Pro Pak (add a reminder note here saying: If yes, begin using the ASC Gladiator website to create an ASC Gladiator Presentation)"
      description-yes="DePuy synthes ProPak Constructs and what is DPS ProPak slides selected."
      @change-option="updateSlideSelection"
    />
    <RadioSlides
      :key-name="keyNameList.keyName_25"
      :slide-codes="slideIdentifier.radioSlide_25"
      question="Would it be useful to show the customer the DRG data for DPS?"
      description-yes="DRG slides selected."
      @change-option="updateSlideSelection"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import overviewLink from './rfpConfig/RfpConfigLink.vue'
import RadioSlides from './rfpConfig/RadioSlides.vue'
import MultiSlides from './rfpConfig/MultiSlides.vue'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    overviewLink,
    RadioSlides,
    MultiSlides,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    const keyNameList = {
      keyName_1: 'prebuiltValueStories',
      keyName_2: 'sourceView',
      keyName_3: 'isPricingLever',
      keyName_4: 'tpsSolutions',
      keyName_5: 'receptiveeSIMS',
      keyName_6: 'sterileContainers',
      keyName_7: 'universalSmallFrag',
      keyName_8: 'capitalPlacementProgram',
      keyName_9: 'typeofTraumaHospital',
      keyName_10: 'savingsSummary',
      keyName_11: 'surgeonPlan',
      keyName_12: 'implementationPlan',
      keyName_13: 'aoSlides',
      // keyName_14: 'productPortfolio',
      keyName_15: 'salesTeam',
      keyName_16: 'overviewofDPS',
      keyName_17: 'biologics',
      keyName_18: 'rebatesNBI',
      keyName_19: 'instrumentWarranty',
      keyName_20: 'profedSlide',
      keyName_21: 'futureLeaders',
      keyName_22: 'partnershipSellingProducts',
      keyName_23: 'upcomingInnovation',
      keyName_24: 'propack',
      keyName_25: 'drg',
      keyName_26: 'hipFractureCare',
    }

    const linkList = [
      {
        link: 'https://optimizer.jnj.com/Optimizer/sec/collateral?linkId=38003',
        headerText:
          'Evaluate a wider 1MD partnership or Trauma/Joint Recon, Trauma/CMF business bundles.',
      },
      {
        link: 'https://optimizer.jnj.com/Optimizer/sec/collateral?linkId=38054',
        headerText:
          'Prepare a lower price tier (access) and higher price tier (stretch) based upon the customers current market share and future options.',
      },
      {
        link: 'https://optimizer.jnj.com/Optimizer/sec/collateral?linkId=38083',
        headerText:
          'Use offer evaluation template to determine how well customers interests are met by our offer and competitive offer',
      },
    ]

    const slideIdentifier = {
      radioSlide_1: ['SAV3', 'SAV4', 'SAV5', 'SAV6'],
      radioSlide_2: ['SAV8'],
      radioSlide_3: [],
      radioSlide_4: ['SAV14', 'SAV15'],
      radioSlide_5: ['SAV13'],
      radioSlide_6: ['SAV9', 'SAV10'],
      radioSlide_7: ['SAV11', 'SAV12'],
      radioSlide_8: [],
      radioSlide_9: ['INTR5', 'INTR6', 'INTR7', 'INTR8'],
      radioSlide_10: ['SAV24'],
      radioSlide_11: ['SRG2'],
      radioSlide_12: ['EDU3'],
      radioSlide_13: ['QOC6', 'QOC7'],
      // radioSlide_14: ['APPD1', 'APPD1'],
      radioSlide_15: ['CS1'],
      radioSlide_16: ['SRG1'],
      radioSlide_17: ['SAV21', 'SAV22'],
      radioSlide_18: ['SAV23'],
      radioSlide_19: ['QOC1'],
      radioSlide_20: ['EDU1'],
      radioSlide_21: ['EDU2'],
      radioSlide_22: ['PORT4'],
      radioSlide_23: ['PORT7'],
      radioSlide_24: ['PORT5', 'PORT6'],
      radioSlide_25: ['APDX0', 'APDX1', 'APDX2'],
      introSlides: ['INTRO1', 'INTR_PPH', 'INTR1', 'INTR2', 'INTR3', 'INTR4'],
      radioSlide_26: ['QOC3', 'QOC4'],
    }

    const presentation = computed(() =>
      store.getters['rfps/getPresentationById'](route.params.presentationId),
    )

    const slideSelection = ref(
      JSON.parse(JSON.stringify(presentation.value.slideSelection)),
    )

    const updateSlideSelection = ({
      keyName,
      updatedYesNo,
      slideCodes,
      updatedSelectedSlide,
    }) => {
      slideSelection.value[keyName] =
        typeof updatedYesNo === 'boolean' ? updatedYesNo : updatedSelectedSlide

      const slidesAreEdited = store.getters[
        'rfps/getInputProgressByPresentationId'
      ](route.params.presentationId, 'slides')

      const slideSelectionIsEdited = store.getters[
        'rfps/getInputProgressByPresentationId'
      ](route.params.presentationId, 'slideSelection')

      if (!slidesAreEdited && !slideSelectionIsEdited) {
        slideIdentifier.introSlides.forEach((slideCode) =>
          store.commit('rfps/switchSlideSelection', {
            slideCode,
            presentationId: route.params.presentationId,
            isEnabledValue: true,
          }),
        )
      }

      store.commit(
        'rfps/updateRfp',
        JSON.parse(
          JSON.stringify({
            ...presentation.value,
            slideSelection: slideSelection.value,
          }),
        ),
      )
      const switchSlideSelection = (slideCode, updatedYesNo) => {
        store.commit('rfps/switchSlideSelection', {
          slideCode,
          presentationId: route.params.presentationId,
          isEnabledValue: updatedYesNo,
        })
      }
      slideCodes.forEach((slideCode) =>
        switchSlideSelection(
          slideCode,
          updatedSelectedSlide
            ? updatedSelectedSlide.includes(slideCode)
            : updatedYesNo,
        ),
      )
    }

    return {
      isOverview,
      keyNameList,
      linkList,
      slideIdentifier,
      updateSlideSelection,
      slideSelection,
    }
  },
}
</script>

<style scoped>
input:disabled {
  background-color: white;
}
</style>

<style>
.rfp-config-question-box {
  color: #2979ff;
  background-color: rgba(41, 121, 255, 0.1);
  border: 1px solid #2979ff;
  border-radius: 7px;
}
</style>
