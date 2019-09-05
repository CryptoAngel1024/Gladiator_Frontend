import { getSlideScreenCapture } from '@/utils/slideScreenCaptures'
import { computed } from 'vue'
const PARTNERSHIP_PROPOSAL_HUB = 'Partnership Proposal Hub'

const allSlidesRaw = {
  TRAUMA: [
    {
      slideTitle: 'Title Slide',
      subTitle: 'Introduction',
      slideCategory: 'INTRODUCTION',
      slideNumber: 1,
      slideType: 'DYNAMIC',
      slideCode: 'INTRO1',
    },
    {
      slideTitle: PARTNERSHIP_PROPOSAL_HUB, // page 5
      slideCategory: 'INTRODUCTION',
      slideNumber: 2,
      slideCode: 'INTR_PPH',
    },
    {
      slideTitle: 'About Johnson & Johnson', // 6
      slideCategory: 'INTRODUCTION',
      slideNumber: 3,
      slideCode: 'INTR1',
    },
    {
      slideTitle: 'About DPS', // 7
      overviewTitle: 'About DePuy Synthes',
      slideCategory: 'INTRODUCTION',
      slideNumber: 4,
      slideCode: 'INTR2',
    },
    {
      slideTitle: 'Trauma table by site of care',
      overviewTitle: 'About DePuy Synthes 2',
      slideCategory: 'INTRODUCTION',
      slideNumber: 5,
      slideCode: 'INTR3',
    },
    {
      slideTitle: 'Trauma Challenges',
      slideCategory: 'INTRODUCTION',
      slideNumber: 6,
      slideCode: 'INTR4',
    },
    {
      slideTitle: 'Trauma site of care Large Level 1-2',
      slideCategory: 'INTRODUCTION',
      slideNumber: 7,
      slideCode: 'INTR5',
    },
    {
      slideTitle: 'Trauma site of care AMC',
      slideCategory: 'INTRODUCTION',
      slideNumber: 8,
      slideCode: 'INTR6',
    },
    {
      slideTitle: 'Trauma Site of care General Hospital',
      slideCategory: 'INTRODUCTION',
      slideNumber: 9,
      slideCode: 'INTR7',
    },
    {
      slideTitle: 'Trauma Site of care ASC',
      slideCategory: 'INTRODUCTION',
      slideNumber: 10,
      slideCode: 'INTR8',
    },
    {
      slideTitle: PARTNERSHIP_PROPOSAL_HUB,
      slideCategory: 'CUSTOMER_SERVICE',
      slideNumber: 11,
      slideCode: 'CS_PPH',
    },
    {
      slideTitle: 'Sales Consultant Service',
      slideNumber: 12,
      slideCategory: 'CUSTOMER_SERVICE',
      slideCode: 'CS1',
    },
    {
      slideTitle: PARTNERSHIP_PROPOSAL_HUB,
      slideCategory: 'SURGEON_SATISFACTION',
      slideNumber: 13,
      slideCode: 'SRG_PPH',
    },
    {
      slideTitle: 'Net Promoter Score',
      slideNumber: 14,
      slideCategory: 'SURGEON_SATISFACTION',
      slideCode: 'SRG1',
    },
    {
      slideTitle: 'Surgeon Plan',
      slideNumber: 15,
      slideCategory: 'SURGEON_SATISFACTION',
      slideType: 'DYNAMIC',
      slideCode: 'SRG2',
    },
    {
      slideTitle: PARTNERSHIP_PROPOSAL_HUB,
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideNumber: 16,
      slideCode: 'SAV_PPH',
    },
    {
      slideTitle: 'Stories from third party data', // sav3
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideNumber: 17,
      slideCode: 'SAV3',
    },
    {
      slideTitle: 'Orthopedic Trauma Spend Analysis', // sav4
      slideNumber: 18,
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideCode: 'SAV4',
    },
    {
      slideTitle: 'Savings Through Procedural Efficiency', // sav 5
      slideNumber: 19,
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideCode: 'SAV5',
    },
    {
      slideTitle: 'Advantages of a Simplified Portfolio', // sav 6
      slideNumber: 20,
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideCode: 'SAV6',
    },
    {
      slideTitle: 'Trauma Analysis Tool Demo', // sav8
      slideNumber: 21,
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideCode: 'SAV8',
    },
    {
      slideTitle: 'Trauma Analysis Tool Output', // sav2
      slideNumber: 22,
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideCode: 'SAV2',
    },
    {
      slideTitle: 'CSSR Table 1',
      slideNumber: 23,
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideCode: 'SAV25',
      slideType: 'DYNAMIC',
    },
    {
      slideTitle: 'CSSR Table 2',
      slideNumber: 24,
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideCode: 'SAV26',
      slideType: 'DYNAMIC',
    },
    {
      slideTitle: 'CSSR Table 3',
      slideNumber: 25,
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideCode: 'SAV27',
      slideType: 'DYNAMIC',
    },
    {
      slideTitle: 'CSSR Table 4',
      slideNumber: 26,
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideCode: 'SAV28',
      slideType: 'DYNAMIC',
    },
    {
      slideTitle: 'TPS Solutions', // sav 14
      overviewTitle: 'Proposed Solutions',
      slideNumber: 27,
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideCode: 'SAV14',
    },
    {
      slideTitle: 'A suite of solutions', // sav 15
      slideNumber: 28,
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideCode: 'SAV15',
    },
    {
      slideTitle: 'Sterile Containers', // sav 9
      // overviewTitle: 'Reusable Sterilization Container System',
      slideNumber: 29,
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideCode: 'SAV9',
    },
    {
      slideTitle: 'Sterile Containers 2', // sav 10
      slideNumber: 30,
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideType: 'DYNAMIC',
      slideCode: 'SAV10',
    },
    {
      slideTitle: 'Universal Small Frag', // sav 11
      overviewTitle: 'Universal Small Fragment System',
      slideNumber: 31,
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideCode: 'SAV11',
    },
    {
      slideTitle: 'Universal Small Frag 2', // sav 12
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideNumber: 32,
      slideCode: 'SAV12',
    },
    {
      slideTitle: 'eSIMS', // sav 13
      overviewTitle: 'DePuy Synthes Inventory Management System (eSIMS)',
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideNumber: 33,
      slideCode: 'SAV13',
    },
    {
      slideTitle: 'Saving with Biologics, Power', // sav 21
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideNumber: 34,
      slideCode: 'SAV21',
    },
    {
      slideTitle: 'Saving with Biologics, Power 2', // sav 22
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideNumber: 35,
      slideCode: 'SAV22',
    },
    {
      slideTitle: 'Rebates/ Overlay/ NBI', // sav 23
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideNumber: 36,
      slideCode: 'SAV23',
    },
    {
      slideTitle: 'Savings Summary', // sav 24
      slideCategory: 'DELIVER_ACTUAL_SAVINGS',
      slideNumber: 37,
      slideType: 'DYNAMIC',
      slideCode: 'SAV24',
    },
    {
      slideTitle: PARTNERSHIP_PROPOSAL_HUB,
      slideCategory: 'QUALITY_OF_CARE',
      slideNumber: 38,
      slideCode: 'QOC_PPH',
    },
    {
      slideTitle: 'Instrument Warranty',
      slideNumber: 39,
      slideCategory: 'QUALITY_OF_CARE',
      slideCode: 'QOC1',
    },
    {
      slideTitle: 'AOTC',
      overviewTitle: 'What is the AO',
      slideNumber: 40,
      slideCategory: 'QUALITY_OF_CARE',
      slideCode: 'QOC6',
    },
    {
      slideTitle: 'Research, Innovation and Education',
      slideNumber: 41,
      slideCategory: 'QUALITY_OF_CARE',
      slideCode: 'QOC7',
    },
    {
      slideTitle: 'Hip Fracture Care',
      slideNumber: 42,
      slideCategory: 'QUALITY_OF_CARE',
      slideCode: 'QOC3',
    },
    {
      slideTitle: 'Hip Fracture Care Program',
      slideNumber: 43,
      slideCategory: 'QUALITY_OF_CARE',
      slideCode: 'QOC4',
    },
    {
      slideTitle: PARTNERSHIP_PROPOSAL_HUB,
      slideCategory: 'TRAINING_SUPPORT',
      slideNumber: 44,
      slideCode: 'EDU_PPH',
    },
    {
      slideTitle: 'Prof Education Overview',
      slideNumber: 45,
      slideCategory: 'TRAINING_SUPPORT',
      slideCode: 'EDU1',
    },
    {
      slideTitle: 'Future Leaders',
      slideCategory: 'TRAINING_SUPPORT',
      slideNumber: 46,
      slideCode: 'EDU2',
    },
    {
      slideTitle: 'Customized Training Plan',
      slideNumber: 47,
      slideCategory: 'TRAINING_SUPPORT',
      slideType: 'DYNAMIC',
      slideCode: 'EDU3',
    },
    {
      slideTitle: PARTNERSHIP_PROPOSAL_HUB,
      slideCategory: 'COMPREHENSIVE_PORTFOLIO',
      slideNumber: 48,
      slideCode: 'PORT_PPH',
    },
    {
      slideTitle: 'Trauma Portfolio Procedure Overview',
      slideNumber: 49,
      slideCategory: 'COMPREHENSIVE_PORTFOLIO',
      slideCode: 'PORT1',
    },
    {
      slideTitle: 'Product Portfolio - Ready for Anything',
      slideNumber: 50,
      slideCategory: 'COMPREHENSIVE_PORTFOLIO',
      slideCode: 'APPD1',
    },
    {
      slideTitle: 'Product Portfolio - Complete Solution',
      slideNumber: 51,
      slideCategory: 'COMPREHENSIVE_PORTFOLIO',
      slideCode: 'APPD2',
    },
    {
      slideTitle: 'Investment In Innovation',
      slideNumber: 52,
      slideCategory: 'COMPREHENSIVE_PORTFOLIO',
      slideCode: 'PORT4',
    },
    {
      slideTitle: 'NPI Launch',
      // overviewTitle: 'Innovation Timeline',
      slideNumber: 53,
      slideCategory: 'COMPREHENSIVE_PORTFOLIO',
      slideCode: 'PORT7',
    },
    {
      slideTitle: 'DePuy Synthes Pro-Pak® Constructs',
      slideNumber: 54,
      slideCategory: 'COMPREHENSIVE_PORTFOLIO',
      slideCode: 'PORT5',
    },
    {
      slideTitle: 'What is DePuy Synthes Pro-Pak®?',
      slideNumber: 55,
      slideCategory: 'COMPREHENSIVE_PORTFOLIO',
      slideCode: 'PORT6',
    },
    {
      slideTitle: 'Appendix - DRG database',
      slideNumber: 56,
      slideCategory: 'APPENDIX',
      slideCode: 'APDX0',
    },
    {
      slideTitle: 'Decisions Resource Group',
      slideNumber: 57,
      slideCategory: 'APPENDIX',
      slideCode: 'APDX1',
    },
    {
      slideTitle: "DRG's Price Track",
      slideNumber: 58,
      slideCategory: 'APPENDIX',
      slideCode: 'APDX2',
    },
  ],
  ASC: [
    {
      slideTitle: 'Guidance Slide',
      slideCategory: 'INTRODUCTION',
      slideNumber: 1,
      slideCode: 'ASC_1',
    },
    {
      slideTitle: 'Title Slide',
      slideCategory: 'INTRODUCTION',
      slideNumber: 2,
      slideCode: 'ASC_2',
    },
    {
      slideTitle: 'Executive Summary',
      slideCategory: 'INTRODUCTION',
      slideNumber: 3,
      slideCode: 'ASC_3',
    },
    {
      slideTitle: 'ASC Capabilities Video',
      slideCategory: 'INTRODUCTION',
      slideNumber: 4,
      slideCode: 'ASC_4',
    },
    {
      slideTitle: 'Account Intro Slide',
      slideCategory: 'INTRODUCTION',
      slideNumber: 5,
      slideType: 'DYNAMIC',
      slideCode: 'ASC_5',
    },
    {
      slideTitle: 'ASC Unique Needs',
      slideCategory: 'INTRODUCTION',
      slideNumber: 6,
      slideCode: 'ASC_6',
    },
    {
      slideTitle: 'ASC Objectives',
      slideCategory: 'INTRODUCTION',
      slideNumber: 7,
      slideCode: 'ASC_7',
    },
    {
      slideTitle: 'ASC T&E Summary',
      slideCategory: 'INTRODUCTION',
      slideNumber: 8,
      slideCode: 'ASC_8',
    },
    {
      slideTitle: 'ASC Joint Recon Summary',
      slideCategory: 'INTRODUCTION',
      slideNumber: 9,
      slideCode: 'ASC_9',
    },
    {
      slideTitle: 'ASC Sports Med Summary',
      slideCategory: 'INTRODUCTION',
      slideNumber: 10,
      slideCode: 'ASC_10',
    },
    {
      slideTitle: 'ASC Spine Summary',
      slideCategory: 'INTRODUCTION',
      slideNumber: 11,
      slideCode: 'ASC_11',
    },
    {
      slideTitle: 'Clinical Excellence Title Slide',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 12,
      slideCode: 'ASC_12',
    },
    {
      slideTitle: 'Clinical Excellence Summary',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 13,
      slideCode: 'ASC_13',
    },
    {
      slideTitle: 'JR Solution Knee',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 14,
      slideCode: 'ASC_14',
    },
    {
      slideTitle: 'JR Solution Hip',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 15,
      slideCode: 'ASC_15',
    },
    {
      slideTitle: 'JR Solution Shoulder',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 16,
      slideCode: 'ASC_16',
    },
    {
      slideTitle: 'T&E Solutions - General',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 17,
      slideCode: 'ASC_17',
    },
    {
      slideTitle: 'T&E Solutions - Foot Ankle',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 18,
      slideCode: 'ASC_18',
    },
    {
      slideTitle: 'T&E Solutions - Upper Extremities',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 19,
      slideCode: 'ASC_19',
    },
    {
      slideTitle: 'Sports Med Solutions - General',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 20,
      slideCode: 'ASC_20',
    },
    {
      slideTitle: 'Sports Med Solutions - Shoulder',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 21,
      slideCode: 'ASC_21',
    },
    {
      slideTitle: 'Sports Med Solutions - Knee',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 22,
      slideCode: 'ASC_22',
    },
    {
      slideTitle: 'Sports Med Solutions - Capital',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 23,
      slideCode: 'ASC_23',
    },
    {
      slideTitle: 'Spine Solutions Implants',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 24,
      slideCode: 'ASC_24',
    },
    {
      slideTitle: 'Spine Solutions Technologies',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 25,
      slideCode: 'ASC_25',
    },
    {
      slideTitle: 'VELYS™ Robot',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 26,
      slideCode: 'ASC_26',
    },
    {
      slideTitle: 'VELYS™ Digital Ecosystem',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 27,
      slideCode: 'ASC_27',
    },
    {
      slideTitle: 'VELYS™ Insights',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 28,
      slideCode: 'ASC_28',
    },
    {
      slideTitle: 'ANTERIOR ADVANTAGE™',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 29,
      slideCode: 'ASC_29',
    },
    {
      slideTitle: 'Power Tools: Joint Recon',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 30,
      slideCode: 'ASC_30',
    },
    {
      slideTitle: 'Power Tools: T&E',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 31,
      slideCode: 'ASC_31',
    },
    {
      slideTitle: 'Power Tools Payment Options',
      slideCategory: 'CLINICAL_EXCELLENCE',
      slideNumber: 32,
      slideCode: 'ASC_32',
    },
    {
      slideTitle: 'Economic Value Title',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 33,
      slideCode: 'ASC_33',
    },
    {
      slideTitle: 'Economic Value Summary',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 34,
      slideCode: 'ASC_34',
    },
    {
      slideTitle: 'ASC Construct Pricing | Trauma & Extremities',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 35,
      slideCode: 'ASC_35',
    },
    {
      slideTitle: 'ASC Construct Pricing | Joint Reconstruction',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 36,
      slideCode: 'ASC_36',
    },
    {
      slideTitle: 'ASC Construct Pricing | Sports Med',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 37,
      slideCode: 'ASC_37',
    },
    {
      slideTitle: 'ASC Construct Pricing | Spine',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 38,
      slideCode: 'ASC_38',
    },
    {
      slideTitle: 'DePuy Synthes Pro-Pak® Illustration',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 39,
      slideCode: 'ASC_39',
    },
    {
      slideTitle: 'Spend Analysis Tool',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 40,
      slideCode: 'ASC_40',
    },
    {
      slideTitle: 'Simplification Program',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 41,
      slideCode: 'ASC_41',
    },
    {
      slideTitle: 'Capital Acquisitions',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 42,
      slideCode: 'ASC_42',
    },
    {
      slideTitle: 'Capital & Rebate Programs',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 43,
      slideCode: 'ASC_43',
    },
    {
      slideTitle: 'TPS',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 44,
      slideCode: 'ASC_44',
    },
    {
      slideTitle: 'Reimbursement Example: Knee',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 45,
      slideCode: 'ASC_45',
    },
    {
      slideTitle: 'Reimbursement Example: Hip',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 46,
      slideCode: 'ASC_46',
    },
    {
      slideTitle: 'Reimbursement Example: Shoulder',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 47,
      slideCode: 'ASC_47',
    },
    {
      slideTitle: 'Reimbursement Support',
      slideCategory: 'ECONOMIC_VALUES',
      slideNumber: 48,
      slideCode: 'ASC_48',
    },
    {
      slideTitle: 'Operational Support Title',
      slideCategory: 'OPERATIONAL_SUPPORT',
      slideNumber: 49,
      slideCode: 'ASC_49',
    },
    {
      slideTitle: 'Operational Support Summary',
      slideCategory: 'OPERATIONAL_SUPPORT',
      slideNumber: 50,
      slideCode: 'ASC_50',
    },
    {
      slideTitle: 'Steris Collaboration',
      slideCategory: 'OPERATIONAL_SUPPORT',
      slideNumber: 51,
      slideCode: 'ASC_51',
    },
    {
      slideTitle: 'MEDJ App',
      slideCategory: 'OPERATIONAL_SUPPORT',
      slideNumber: 52,
      slideCode: 'ASC_52',
    },
    {
      slideTitle: 'Building an ASC',
      slideCategory: 'OPERATIONAL_SUPPORT',
      slideNumber: 53,
      slideCode: 'ASC_53',
    },
    {
      slideTitle: 'ACM',
      slideCategory: 'OPERATIONAL_SUPPORT',
      slideNumber: 54,
      slideCode: 'ASC_54',
    },
    {
      slideTitle: 'Sterilization Container System',
      slideCategory: 'OPERATIONAL_SUPPORT',
      slideNumber: 55,
      slideCode: 'ASC_55',
    },
    {
      slideTitle: 'Universal Small Fragment',
      slideCategory: 'OPERATIONAL_SUPPORT',
      slideNumber: 56,
      slideCode: 'ASC_56',
    },
    {
      slideTitle: 'Prof Ed: T&E',
      slideCategory: 'OPERATIONAL_SUPPORT',
      slideNumber: 57,
      slideCode: 'ASC_57',
    },
    {
      slideTitle: 'Prof Ed: Joint Recon',
      slideCategory: 'OPERATIONAL_SUPPORT',
      slideNumber: 58,
      slideCode: 'ASC_58',
    },
    {
      slideTitle: 'Prof Ed: Spine',
      slideCategory: 'OPERATIONAL_SUPPORT',
      slideNumber: 59,
      slideCode: 'ASC_59',
    },
    {
      slideTitle: 'Clinical Consistency',
      slideCategory: 'OPERATIONAL_SUPPORT',
      slideNumber: 60,
      slideCode: 'ASC_60',
    },
    {
      slideTitle: 'Your DPS Team Title',
      slideCategory: 'YOUR_DEPUY_SYNTHES_TEAM',
      slideNumber: 61,
      slideCode: 'ASC_61',
    },
    {
      slideTitle: 'Team Summary',
      slideCategory: 'YOUR_DEPUY_SYNTHES_TEAM',
      slideNumber: 62,
      slideType: 'DYNAMIC',
      slideCode: 'ASC_62',
    },
    {
      slideTitle: 'How Can We Help?',
      slideCategory: 'YOUR_DEPUY_SYNTHES_TEAM',
      slideNumber: 63,
      slideCode: 'ASC_63',
    },
    {
      slideTitle: 'Thank you',
      slideCategory: 'YOUR_DEPUY_SYNTHES_TEAM',
      slideNumber: 64,
      slideCode: 'ASC_64',
    },
  ],
}

const processedSlide = (slide) => ({
  prePopulatedSlide: slide.slideCode,
  ...slide.slide,
  ...slide,
  isEnabled: false,
  draftContent: slide.slideType === 'DYNAMIC' ? {} : null,
  slide: {
    prePopulatedSlide: slide.slideCode,
    ...slide.slide,
  },
  fullImgSrc: getSlideScreenCapture(slide.slideCode),
})

export const allSlides = [...allSlidesRaw.ASC, ...allSlidesRaw.TRAUMA].map(
  processedSlide,
)

export function useAllDepartmentSlides(department) {
  const allDepartmentSlides = computed(() =>
    allSlidesRaw[department.value || department].map(processedSlide),
  )

  return { allDepartmentSlides }
}

export function slideDetails({
  slideType,
  slideContent,
  prePopulatedSlide,
  slideCode,
}) {
  if (slideType === 'CUSTOM') {
    const slideContentProcessed =
      typeof slideContent === 'string'
        ? JSON.parse(slideContent || '{}')
        : slideContent

    return {
      ...slideContentProcessed,
      fullImgSrc: getSlideScreenCapture('CUST'),
    }
  } else {
    return allSlides.find(
      (slide) => slide.slideCode === (slideCode || prePopulatedSlide),
    )
  }
}

export function groupSlides(slides, groupBy = 'slideCategory') {
  const sortedSlides = [...slides].sort((slideA, slideB) =>
    sortLides(slideA, slideB),
  )

  const groupedSlides = {}

  sortedSlides.forEach((slide) => {
    const groupName = slide[groupBy]
    groupedSlides[groupName] = [...(groupedSlides[groupName] || []), slide]
  })
  return groupedSlides
}

export function sortLides(slideA, slideB) {
  return (
    (!isNaN(slideA.slideNumber)
      ? slideA.slideNumber
      : slideA.pageNumber - 0.5) -
    (!isNaN(slideB.slideNumber) ? slideB.slideNumber : slideB.pageNumber - 0.5)
  )
}

export function getCategories(slides) {
  const sortedSlides = slides
    .filter(
      (slide) =>
        !(slide.slide?.customSlideType || slide.slideType === 'CUSTOM'),
    )
    .sort((slideA, slideB) => sortLides(slideA, slideB))

  const categories = []

  sortedSlides.forEach((slide) => {
    const categoryName = slide.slideCategory
    if (!categories.includes(categoryName)) categories.push(categoryName)
  })
  return categories
}
