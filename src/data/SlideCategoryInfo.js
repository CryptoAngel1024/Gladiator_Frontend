import groupIntroWhite from '@/assets/logo/jnj_introduction-white.png'
import groupSurgeonSatisfactionWhite from '@/assets/logo/jnj_surgeonSatisfaction-white.png'
import groupCustomerServiceWhite from '@/assets/logo/jnj_customerService-white.png'
import groupDeliverActualSavingsWhite from '@/assets/logo/JJ Icon People Dollar Multi RGB png_RGB.svg'
import groupSupportQualityCareWhite from '@/assets/logo/jnj_health_caring-white.png'
import groupTrainingSupportWhite from '@/assets/logo/jnj_professional-white.png'
import groupCommunicationPlanWhite from '@/assets/logo/jnj_communication_plan-white.png'

import groupIntroRed from '@/assets/jnjIcons/handshake.png'
import groupSurgeonSatisfactionRed from '@/assets/jnjIcons/medicalProfessional.png'
import groupCustomerServiceRed from '@/assets/jnjIcons/health_caring.png'
import groupDeliverActualSavingsRed from '@/assets/logo/jnj_dollar.png'
import groupSupportQualityCareRed from '@/assets/logo/jnj_health_caring.png'
import groupTrainingSupportRed from '@/assets/jnjIcons/professional.png'
import groupCommunicationPlanRed from '@/assets/images/slide-captures/JJ Icon Communication Plan Multi.png'

import groupItro from '@/assets/ascIcons/intro_group_icon.png'
import groupClinicalTrauma from '@/assets/ascIcons/clinical_group_trauma_icon.png'
// import groupClinicalJoint from '@/assets/ascIcons/clinical_group_joint_icon.png.png'
// import groupClinicalSport from '@/assets/ascIcons/clinical_group_sport_icon.png'
import groupEconomic from '@/assets/ascIcons/economic_group_icon.png'
import groupOperational from '@/assets/ascIcons/operational_group_icon.png'
import { computed } from 'vue'
import { useStore } from 'vuex'

export const allSlideCategories = {
  TRAUMA: {
    INTRODUCTION: {
      groupTitle: 'Introduction',
      icon: 'health_caring',
      imgSrc: groupIntroWhite,
      imgSrcRed: groupIntroRed,
    },
    CUSTOMER_SERVICE: {
      groupTitle: 'Customer Service',
      icon: 'handshake',
      imgSrc: groupCustomerServiceWhite,
      imgSrcRed: groupCustomerServiceRed,
    },
    SURGEON_SATISFACTION: {
      groupTitle: 'Surgeon Satisfaction',
      icon: 'medicalProfessional',
      imgSrc: groupSurgeonSatisfactionWhite,
      imgSrcRed: groupSurgeonSatisfactionRed,
    },
    DELIVER_ACTUAL_SAVINGS: {
      groupTitle: 'Deliver Actual Savings',
      icon: 'dollar',
      imgSrc: groupDeliverActualSavingsWhite,
      imgSrcRed: groupDeliverActualSavingsRed,
    },
    QUALITY_OF_CARE: {
      groupTitle: 'Quality of Care',
      icon: 'quality',
      imgSrc: groupSupportQualityCareWhite,
      imgSrcRed: groupSupportQualityCareRed,
    },
    TRAINING_SUPPORT: {
      groupTitle: 'Training Support',
      icon: 'professional',
      imgSrc: groupTrainingSupportWhite,
      imgSrcRed: groupTrainingSupportRed,
    },
    COMPREHENSIVE_PORTFOLIO: {
      groupTitle: 'Comprehensive Portfolio',
      icon: 'plan',
      imgSrc: groupCommunicationPlanWhite,
      imgSrcRed: groupCommunicationPlanRed,
    },
    APPENDIX: {
      groupTitle: 'Appendix',
      icon: 'plan',
      imgSrc: groupCommunicationPlanWhite,
      imgSrcRed: groupCommunicationPlanRed,
    },
    CLINICAL_EXCELLENCE: {
      groupTitle: 'Clinical Excellence',
      icon: 'health_caring',
      imgSrc: groupIntroWhite,
      imgSrcRed: groupIntroRed,
    },
    ECONOMIC_VALUES: {
      groupTitle: 'Economic Values',
      icon: 'health_caring',
      imgSrc: groupIntroWhite,
      imgSrcRed: groupIntroRed,
    },
    OPERATIONAL_SUPPORT: {
      groupTitle: 'Operational Support',
      icon: 'health_caring',
      imgSrc: groupIntroWhite,
      imgSrcRed: groupIntroRed,
    },
    YOUR_DEPUY_SYNTHES_TEAM: {
      groupTitle: 'Your DePuy Synthes Team',
      icon: 'health_caring',
      imgSrc: groupIntroWhite,
      imgSrcRed: groupIntroRed,
    },
  },
  ASC: {
    INTRODUCTION: {
      groupTitle: 'Introduction',
      icon: 'intro',
      imgSrc: groupItro,
      imgSrcRed: groupItro,
    },
    CLINICAL_EXCELLENCE: {
      groupTitle: 'Clinical Excellence',
      icon: 'clinical_trauma',
      imgSrc: groupClinicalTrauma,
      imgSrcRed: groupClinicalTrauma,
    },
    // CLINICAL_EXCELLENCE_TRAUMA: {
    //   groupTitle: 'CLINICAL EXCELLENCE - Trauma & Extremities Portfolio',
    //   icon: 'clinical_trauma',
    //   imgSrc: groupClinicalTrauma,
    //   imgSrcRed: groupClinicalTrauma,
    // },
    // CLINICAL_EXCELLENCE_JOINT: {
    //   groupTitle: 'CLINICAL EXCELLENCE - Joint Reconstruction Portfolio',
    //   icon: 'clinical_joint',
    //   imgSrc: groupClinicalJoint,
    //   imgSrcRed: groupClinicalJoint,
    // },
    // CLINICAL_EXCELLENCE_SPORT: {
    //   groupTitle: 'CLINICAL EXCELLENCE - Sports Medicine Portfolio',
    //   icon: 'clinical_sport',
    //   imgSrc: groupClinicalSport,
    //   imgSrcRed: groupClinicalSport,
    // },
    ECONOMIC_VALUES: {
      groupTitle: 'Economic Value',
      icon: 'economic_value',
      imgSrc: groupEconomic,
      imgSrcRed: groupEconomic,
    },
    OPERATIONAL_SUPPORT: {
      groupTitle: 'Operational Support',
      icon: 'operational_support',
      imgSrc: groupOperational,
      imgSrcRed: groupOperational,
    },
    YOUR_DEPUY_SYNTHES_TEAM: {
      groupTitle: 'Your DePuy Synthes Team',
      icon: 'operational_support',
      imgSrc: groupOperational,
      imgSrcRed: groupOperational,
    },
  },
}

export default function useSlideCategoryInfo(category) {
  const store = useStore()
  const department = computed(
    () => store.getters['setting/getCurrentDepartment'],
  )

  const slideCategories = computed(() => allSlideCategories[department.value])
  const slideCategory = computed(() => slideCategories.value[category])

  return { slideCategories, slideCategory }
}
