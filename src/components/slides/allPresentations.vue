<template>
  <component
    :is="slide"
    v-for="(slide, index) in slideComponents"
    :key="index"
    :data-test="`slide-component-${index}`"
    data-background-color="white"
    :is-animated="allowAnimations"
    :is-pdf-view="isPdfView"
    class="top-pos"
  />
  <div v-if="allSlidesAreDisabled" class="flex w-full h-full">
    <p class="m-auto text-3xxl">No Slides Are Enabled In This Presentation</p>
  </div>
</template>

<script>
import EmptyPlaceholder from '@/components/slides/ASC/0.EmptyPlaceholder.vue' //2
import DePuySynthesSlide2 from '@/components/slides/ASC/2.DePuySynthes.vue' //2
import ExecutiveSummarySlide from '@/components/slides/ASC/3.ExecutiveSummary.vue' //3
import EmbeddedVideo from '@/components/slides/ASC/4.EmbeddedVideo.vue' //3
import OrthopaedicASCsSlide from '@/components/slides/ASC/6.OrthopaedicASCs.vue' //6
import DePuySyntheseTraumaAndExtremitiesSlide from '@/components/slides/ASC/8.DePuySyntheseTraumaAndExtremities.vue' //2
import AmbulatorySurgeryCenter from '@/components/slides/ASC/5.AmbulatorySurgeryCenter.vue'
import JointReconSummary from '@/components/slides/ASC/9.JointReconSummary.vue' //9
import MitekSportsMedicineSlide from '@/components/slides/ASC/10.MitekSportsMedicine.vue'
import ClinicalExcellenceSlide from '@/components/slides/ASC/12.ClinicalExcellence.vue' //12
import ClinicalExcellenceSlide2 from '@/components/slides/ASC/13.ClinicalExcellence.vue' //13
import ComprehensiveTraumaAndExtremitiesSolutionsSlide from '@/components/slides/ASC/17.ComprehensiveTraumaAndExtremitiesSolutions.vue' //17
import ComprehensiveSportsMedicineSolutionsSlide from '@/components/slides/ASC/18.ComprehensiveSportsMedicineSolutions.vue' //18
import ComprehensiveTraumaAndExtremitiesSolutionsSlide2 from '@/components/slides/ASC/19.ComprehensiveTraumaAndExtremitiesSolutions.vue' //19
import ComprehensiveTraumaAndExtremitiesSolutionsSlide3 from '@/components/slides/ASC/20.ComprehensiveTraumaAndExtremitiesSolutions.vue' //20
import ComprehensiveSurgicalSportsMedicineSolutionsSlide21 from '@/components/slides/ASC/21.ComprehensiveSurgicalSportsMedicineSolutions.vue' //21
import ComprehensiveSurgicalSportsMedicineSolutionsSlide22 from '@/components/slides/ASC/22.ComprehensiveSurgicalSportsMedicineSolutions.vue' //22
import ComprehensiveSurgicalSportsMedicineSolutionsSlide23 from '@/components/slides/ASC/23.ComprehensiveSurgicalSportsMedicineSolutions.vue' //23
import AnteriorAdvantage from '@/components/slides/ASC/29.AnteriorAdvantage.vue' //29 m
import PowerToolsforJointReconstructionSlide30 from '@/components/slides/ASC/30.PowerToolsforJointReconstruction.vue' //30
import PowerToolsForTraumaAndExtremitiesSlide from '@/components/slides/ASC/31.PowerToolsForTraumaAndExtremities.vue' //31
import PowerToolsPaymentOptionsSlide32 from '@/components/slides/ASC/32.PowerToolsPaymentOptions.vue' //31
import EconomicValueSlide from '@/components/slides/ASC/33.EconomicValue.vue' //33
import EconomicValueSlide34 from '@/components/slides/ASC/34.EconomicValue.vue' //34
import ASCConstructPricingSlide35 from '@/components/slides/ASC/35.ASCConstructPricing.vue' //35
import ASCConstructPricingSlide36 from '@/components/slides/ASC/36.ASCConstructPricing.vue' //36
import ASCConstructPricingSlide37 from '@/components/slides/ASC/37.ASCConstructPricing.vue' //37
import DePuySynthesProPakIllustrationSlide39 from '@/components/slides/ASC/39.DePuySynthesProPakIllustration.vue' //39
import TheSimplificationProgramSlide41 from '@/components/slides/ASC/41.TheSimplificationProgram.vue' //41
import CapitalAcquisitionSlide42 from '@/components/slides/ASC/42.CapitalAcquisition.vue' //42
import CapitalRebateProgramsSlide43 from '@/components/slides/ASC/43.CapitalRebatePrograms.vue' //43
import TraumaPlatinumSolutionsSlide44 from '@/components/slides/ASC/44.TraumaPlatinumSolutions.vue' //44
import OutpatientReimbursementKnee from '@/components/slides/ASC/45.OutpatientReimbursement.vue' //45
import OutpatientReimbursementHip from '@/components/slides/ASC/46.OutpatientReimbursement.vue' //46
import OutpatientReimbursementShoulder from '@/components/slides/ASC/47.OutpatientReimbursement.vue' //47
import OperationalSupportSlide from '@/components/slides/ASC/49.OperationalSupport.vue' //49
import ImplantsandInstrumentationSlide56 from '@/components/slides/ASC/56.ImplantsandInstrumentation.vue' //56
import TraumaExtremitiesProfessionalEducationSlide57 from '@/components/slides/ASC/57.TraumaExtremitiesProfessionalEducation.vue' //57
import JointReconstructionProfessionalEducationSlide58 from '@/components/slides/ASC/58.JointReconstructionProfessionalEducation.vue' //58
import MedJApp from '@/components/slides/ASC/52.MedJApp.vue' //52
import BuildingAnAscProgram from '@/components/slides/ASC/53.BuildingAnAscProgram.vue' //53
import AdvanceCaseManagement from '@/components/slides/ASC/54.AdvanceCaseManagement.vue' //54
import ReusableSterilizationContainerSystem from '@/components/slides/ASC/55.ReusableSterilizationContainerSystem.vue' //55
import ClinicalConsistency from '@/components/slides/ASC/60.ClinicalConsistency.vue' //60
import YourDePuySynthesTeamSlide from '@/components/slides/ASC/61.YourDePuySynthesTeam.vue' //61
import HowCanWeHelpSlide63 from '@/components/slides/ASC/63.HowCanWeHelp.vue' //63
import DePuySynthesSlide64 from '@/components/slides/ASC/64.DePuySynthes.vue' //64
// end of new ASC slides
import IntroductionSlide from '@/components/slides/1.IntroductionSlide.vue'
import AboutDepuySynthes from '@/components/slides/introduction/AboutDePuySynthes.vue'
import AboutDepuySynthesSecond from '@/components/slides/introduction/AboutDepuySynthesSecond.vue'
import TraumaChallanges from '@/components/slides/introduction/TraumaChallenges.vue'
import AboutJandJSlide from '@/components/slides/introduction/AboutJAndJ.vue'
import TrumaTableBySiteOfCare1 from '@/components/slides/introduction/TrumaTableBySiteOfCare1.vue'
import TrumaTableBySiteOfCare2 from '@/components/slides/introduction/TrumaTableBySiteOfCare2.vue'
import TrumaTableBySiteOfCare3 from '@/components/slides/introduction/TrumaTableBySiteOfCare3.vue'
import TrumaTableBySiteOfCare4 from '@/components/slides/introduction/TrumaTableBySiteOfCare4.vue'
import SurgeonPlanSlide from '@/components/slides/2.SurgeonPlan.vue'
import PartnershipSlide from '@/components/slides/3.PartnershipHub.vue'
import TrainingPlanWithCalnder from '@/components/slides/4.TrainingPlanWithCalender.vue'
import SavingSummary from '@/components/slides/5.SavingSummary.vue'
import Esims from '@/components/slides/savings/EsimsSlide.vue'
import TraumaAnalysisToolDemo from '@/components/slides/savings/TraumaAnalysisToolDemo.vue'
import UniversalSmallFrag11 from '@/components/slides/savings/UniversalSmallFrag11.vue'
import SynthesTraumaSlide from '@/components/slides/17.SynthesTrauma.vue'
import ProceduralEfficiencySlide from '@/components/slides/22.ProceduralEfficiency.vue'
import InstrumentWarrantySlide from '@/components/slides/42.InstrumentWarranty.vue'
import WhatIsTheAOSlide from '@/components/slides/43.WhatIsTheAO.vue'
import ResearchInnovationEducationSlide from '@/components/slides/44.ResearchInnovationEducation.vue'
import HipFractureCareSlide from '@/components/slides/45.HipFractureCare.vue'
import HipFractureCareProgramSlide from '@/components/slides/46.HipFractureCareProgram.vue'
import ReadyForAnythingSlide from '@/components/slides/53.ReadyForAnything.vue'
import CompleteSolutionsSlide from '@/components/slides/54.CompleteSolutions.vue'
import BroadPortfolioSlide from '@/components/slides/55.BroadPortfolio.vue'
import InnovationTimelineSlide from '@/components/slides/56.InnovationTimeline.vue'
import DataObsAndPotSav03 from '@/components/slides/DataObsAndPotSav03.vue'
import OrthopedicTraumaSpend04 from '@/components/slides/OrthopedicTraumaSpend04.vue'
import AdvantagesSimplifiedPortfolio06 from '@/components/slides/AdvantagesSimplifiedPortfolio06.vue'
import sav15 from '@/components/slides/sav-15.vue'
import ReusableSterilizationContainer09 from '@/components/slides/ReusableSterilizationContainer09.vue'
import ProposedSolutions14 from '@/components/slides/ProposedSolutions14.vue'
import ProPakSlide from '@/components/slides/57.Pro-PakConstructs.vue'
import DecisionGroupSlide from '@/components/slides/60.DecisionGroup.vue'
import PriceTrackSlide from '@/components/slides/61.PriceTrack.vue'
import SynthesProPakSlide from '@/components/slides/58.SynthesProPak.vue'
import AppendixDrgDatabase from '@/components/slides/59.AppendixDrgDatabase.vue'
import RobustTraumaPortfolioSlide from '@/components/slides/52.RobustTraumaPortfolio.vue'
import FutureLeadersSlide from '@/components/slides/49.FutureLeaders.vue'
import ProfessionalEductionSlide from '@/components/slides/48.ProfessionalEduction.vue'
import IndustryFieldSlide from '@/components/slides/0.IndustryField.vue'
import Sav10Slide from '@/components/slides/sav-10.vue'
import Sav12Slide from '@/components/slides/sav-12.vue'
import Sav21Slide from '@/components/slides/sav-21.vue'
import Sav22Slide from '@/components/slides/sav-22.vue'
import Sav23Slide from '@/components/slides/sav-23.vue'
import Sav25Slide from '@/components/slides/sav-25.vue'
import Sav26Slide from '@/components/slides/sav-26.vue'
import Sav27Slide from '@/components/slides/sav-27.vue'
import Sav28Slide from '@/components/slides/sav-28.vue'
import Sav2Slide from '@/components/slides/sav2/1.sav-2.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CustomSlidePreview from '@/components/newRfp/CustomSlideSteps/builder/CustomSlidePreview.vue'

const allSlides = {
  CUST: CustomSlidePreview, //
  TRAUMA: {
    INTRO1: IntroductionSlide, //
    INTR_PPH: PartnershipSlide, //
    INTR1: AboutJandJSlide, //
    INTR2: AboutDepuySynthes, //
    INTR3: AboutDepuySynthesSecond, //
    INTR4: TraumaChallanges, //
    INTR5: TrumaTableBySiteOfCare1, //
    INTR6: TrumaTableBySiteOfCare2, //
    INTR7: TrumaTableBySiteOfCare3, //
    INTR8: TrumaTableBySiteOfCare4, //
    CS_PPH: PartnershipSlide,
    CS1: IndustryFieldSlide, //
    SRG_PPH: PartnershipSlide,
    SRG1: SynthesTraumaSlide, //
    SRG2: SurgeonPlanSlide, //  18
    SAV_PPH: PartnershipSlide,
    SAV3: DataObsAndPotSav03, //  20
    SAV4: OrthopedicTraumaSpend04, //  21
    SAV5: ProceduralEfficiencySlide, //  22
    SAV6: AdvantagesSimplifiedPortfolio06, //  23
    SAV8: TraumaAnalysisToolDemo, //  24
    SAV2: Sav2Slide, //  25
    SAV25: Sav25Slide,
    SAV26: Sav26Slide,
    SAV27: Sav27Slide,
    SAV28: Sav28Slide,
    SAV14: ProposedSolutions14, //  30
    SAV15: sav15, //  31
    SAV9: ReusableSterilizationContainer09, //  32
    SAV10: Sav10Slide, //  33
    SAV11: UniversalSmallFrag11,
    SAV12: Sav12Slide,
    SAV13: Esims,
    SAV21: Sav21Slide,
    SAV22: Sav22Slide,
    SAV23: Sav23Slide,
    SAV24: SavingSummary,
    QOC_PPH: PartnershipSlide,
    QOC1: InstrumentWarrantySlide,
    QOC6: WhatIsTheAOSlide,
    QOC7: ResearchInnovationEducationSlide,
    QOC3: HipFractureCareSlide,
    QOC4: HipFractureCareProgramSlide,
    EDU_PPH: PartnershipSlide,
    EDU1: ProfessionalEductionSlide,
    EDU2: FutureLeadersSlide,
    EDU3: TrainingPlanWithCalnder,
    PORT_PPH: PartnershipSlide,
    PORT1: RobustTraumaPortfolioSlide,
    APPD1: ReadyForAnythingSlide,
    APPD2: CompleteSolutionsSlide,
    PORT4: BroadPortfolioSlide,
    PORT7: InnovationTimelineSlide,
    PORT5: ProPakSlide,
    PORT6: SynthesProPakSlide,
    APDX0: AppendixDrgDatabase,
    APDX1: DecisionGroupSlide,
    APDX2: PriceTrackSlide,
  },
  ASC: {
    ASC_1: EmptyPlaceholder, // empty placeholder component.
    ASC_2: DePuySynthesSlide2, // slide 2
    ASC_3: ExecutiveSummarySlide, // slide 3
    ASC_4: EmbeddedVideo, // slide 4
    ASC_5: AmbulatorySurgeryCenter, // slide 5
    ASC_6: OrthopaedicASCsSlide, // slide 6
    ASC_7: EmptyPlaceholder, // empty placeholder component.
    ASC_8: DePuySyntheseTraumaAndExtremitiesSlide, // slide 8
    ASC_9: JointReconSummary, // empty placeholder component.
    ASC_10: MitekSportsMedicineSlide, // slide 10
    ASC_11: EmptyPlaceholder, // empty placeholder component.
    ASC_12: ClinicalExcellenceSlide, // slide 12
    ASC_13: ClinicalExcellenceSlide2, // slide 13
    ASC_14: EmptyPlaceholder, // empty placeholder component.
    ASC_15: EmptyPlaceholder, // empty placeholder component.
    ASC_16: EmptyPlaceholder, // empty placeholder component.
    ASC_17: ComprehensiveTraumaAndExtremitiesSolutionsSlide, // slide 17
    ASC_18: ComprehensiveSportsMedicineSolutionsSlide, // slide 18
    ASC_19: ComprehensiveTraumaAndExtremitiesSolutionsSlide2, // slide 19
    ASC_20: ComprehensiveTraumaAndExtremitiesSolutionsSlide3, // slide 20
    ASC_21: ComprehensiveSurgicalSportsMedicineSolutionsSlide21, // slide 21
    ASC_22: ComprehensiveSurgicalSportsMedicineSolutionsSlide22, // slide 22
    ASC_23: ComprehensiveSurgicalSportsMedicineSolutionsSlide23, // slide 23
    ASC_24: EmptyPlaceholder, // empty placeholder component.
    ASC_25: EmptyPlaceholder, // empty placeholder component.
    ASC_26: EmptyPlaceholder, // empty placeholder component.
    ASC_27: EmptyPlaceholder, // empty placeholder component.
    ASC_28: EmptyPlaceholder, // empty placeholder component.
    ASC_29: AnteriorAdvantage, //slide 29
    ASC_30: PowerToolsforJointReconstructionSlide30, // slide 30
    ASC_31: PowerToolsForTraumaAndExtremitiesSlide, // slide 31
    ASC_32: PowerToolsPaymentOptionsSlide32, // slide 32
    ASC_33: EconomicValueSlide, // slide 33
    ASC_34: EconomicValueSlide34, // slide 34
    ASC_35: ASCConstructPricingSlide35, // slide 35
    ASC_36: ASCConstructPricingSlide36, // slide 36
    ASC_37: ASCConstructPricingSlide37, // slide 37
    ASC_38: EmptyPlaceholder, // empty placeholder component.
    ASC_39: DePuySynthesProPakIllustrationSlide39, // slide 39
    ASC_40: TraumaAnalysisToolDemo, // slide 40
    ASC_41: TheSimplificationProgramSlide41, // slide 41
    ASC_42: CapitalAcquisitionSlide42, // slide 42
    ASC_43: CapitalRebateProgramsSlide43, // slide 43
    ASC_44: TraumaPlatinumSolutionsSlide44, // slide 44
    ASC_45: OutpatientReimbursementKnee, //slide 45
    ASC_46: OutpatientReimbursementHip, //slide 46
    ASC_47: OutpatientReimbursementShoulder, //slide 47
    ASC_48: EmptyPlaceholder, // empty placeholder component.
    ASC_49: OperationalSupportSlide, // slide 49
    ASC_50: EmptyPlaceholder, // empty placeholder component.
    ASC_51: EmptyPlaceholder, // empty placeholder component.
    ASC_52: MedJApp, // slide 52
    ASC_53: BuildingAnAscProgram, // slide 53
    ASC_54: AdvanceCaseManagement, // slide 54
    ASC_55: ReusableSterilizationContainerSystem, // slide 55
    ASC_56: ImplantsandInstrumentationSlide56, // slide 56
    ASC_57: TraumaExtremitiesProfessionalEducationSlide57, // slide 57
    ASC_58: JointReconstructionProfessionalEducationSlide58, // slide 58
    ASC_59: EmptyPlaceholder, // empty placeholder component.
    ASC_60: ClinicalConsistency, // slide 60
    ASC_61: YourDePuySynthesTeamSlide, // slide 61
    ASC_62: EmptyPlaceholder, // empty placeholder component.
    ASC_63: HowCanWeHelpSlide63, //slide63
    ASC_64: DePuySynthesSlide64, // slide 64
  },
}

export default {
  props: {
    allowAnimations: {
      type: Boolean,
      default: true,
    },
    isPdfView: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const enabledSlides = computed(() =>
      store.getters['rfps/getDisplayedSlidesByPresentationId']({
        presentationId: route.params.presentationId,
        hyperLink: route.params.hyperLink?.replace('-', ' '),
        clientName: route.params.clientName?.replace('-', ' '),
      }),
    )

    const presentation = computed(() =>
      store.getters['rfps/getPresentationById'](route.params.presentationId),
    )
    const urlDepartment = computed(
      () => store.getters['setting/getCurrentDepartment'],
    )
    const department = computed(
      () => presentation.value?.department || urlDepartment.value,
    )
    const departmentSlides = computed(() => allSlides[department.value])
    const placeholderSlide = EmptyPlaceholder

    const slideComponents = computed(() =>
      enabledSlides.value.map((slide) =>
        (slide.slide || slide)?.slideType === 'CUSTOM'
          ? allSlides.CUST
          : departmentSlides.value[(slide.slide || slide)?.prePopulatedSlide] ||
            placeholderSlide,
      ),
    )

    const allSlidesAreDisabled = computed(
      () => enabledSlides.value.length === 0,
    )

    return { slideComponents, allSlidesAreDisabled }
  },
}
</script>
<style scoped>
.top-pos {
  top: 0px !important;
}
</style>
