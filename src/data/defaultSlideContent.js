import surgeonPlan from '@/data/slideContent/surgeonPlan.json'

const dateToString = (date) =>
  date.getFullYear() +
  '-' +
  ('0' + (date.getMonth() + 1)).slice(-2) +
  '-' +
  ('0' + date.getDate()).slice(-2)

const today = new Date()
const endDay = new Date()
endDay.setDate(endDay.getDate() + 30)

const startDate = dateToString(today)
const endDate = dateToString(endDay)

const platesAndScrews = 'Plates & Screws'
const handAndWrist = 'Hand & Wrist'
const shoulderAndElbow = 'Shoulder & Elbow'
const femurAndElbow = 'Femur & Elbow'
const footAndAnkle = 'Foot & Ankle'
const nonAnatomic = 'Non anatomic'
const femoralNails = 'Femoral Nails'
const tibialNail = 'Tibial Nails'
const externalFixtures = 'External Fixtures'
const cannulatedScrews = 'Cannulated screws'
const procedureSpendSavings = 'Procedure Spend Savings'
const otherProcedures = 'Other Procedures'

const milestoneDay1 = new Date()
milestoneDay1.setDate(milestoneDay1.getDate() + 7)

const milestoneDate1 = dateToString(milestoneDay1)

export default {
  INTRO1: {
    title: 'DePuy Synthes Companies Trauma Overview for',
    subTitle: `[Your Name]\n[Your Title],\n[Business Unit, Region, Date]`,
  },
  CS1: {
    address: [
      {
        type: 'AVP',
        name: '',
        contact: '',
      },
      { type: 'RM', name: '', contact: '' },
      { type: 'AD', name: '', contact: '' },
    ],
    consultants: [
      {
        name: '',
        contact: '',
      },
    ],
    experience: '',
  },
  SRG2: {
    'Total available trauma business in hospital':
      surgeonPlan['Total available trauma business in hospital'],
    overviewContent: '',
    rows: surgeonPlan.doctors.map((doctor, i) => ({
      ...doctor,
      display: i === 0,
    })),
  },
  SAV24: {
    procedureSavings: {
      standardization: '',
      offer: '',
      options: '',
    },
    additinalSavings: {
      rigid: null,
      usf: null,
      esims: null,
      Biologics: null,
      power: null,
      'Rebate or NBI': null,
      Other: null,
    },
  },
  SAV10: {},
  SAV12: {},
  SAV23: {},
  EDU3: {
    header: 'Training plan',
    timelines: [
      {
        title: 'COMMERCIAL',
        startDate: startDate,
        endDate: endDate,
        label: 'Commercial',
        milestones: [{ title: 'Commercial Milestone', date: milestoneDate1 }],
      },
      {
        title: 'PLANNING',
        startDate: startDate,
        endDate: endDate,
        label: 'Planning ',
        milestones: [{ title: 'Planning Milestone', date: milestoneDate1 }],
      },
      {
        title: 'KIT IMPLEMENTATION',
        startDate: startDate,
        endDate: endDate,
        label: 'Kit Implementation',
        milestones: [
          { title: 'Kit Implementation Milestone', date: milestoneDate1 },
        ],
      },
      {
        title: 'TRAINING',
        startDate: startDate,
        endDate: endDate,
        label: 'Training',
        milestones: [{ title: 'Training Milestone', date: milestoneDate1 }],
      },
      {
        title: 'GO LIVE',
        startDate: startDate,
        endDate: endDate,
        label: 'Go Live',
        milestones: [{ title: 'Go Live Milestone', date: milestoneDate1 }],
      },
    ],
  },
  SAV2: {},
  SAV21: {
    biologic: [
      {
        type: 'Vivigen Formable Medium			',
        price: '',
        brand: 'Cellular/Infuse',
        competitor: '',
        opportunity: '',
      },
      {
        type: 'PliaFx Putty Medium',
        price: '',
        brand: 'DBM',
        competitor: '',
        opportunity: '',
      },
      {
        type: 'Fibergraft Putty Medium',
        price: '',
        brand: 'Synthetic Putty',
        competitor: '',
        opportunity: '',
      },
      {
        type: 'Cancellous Chips',
        price: '',
        brand: 'Chips Company',
        competitor: '',
        opportunity: '',
      },
      {
        type: 'Allograft Wedges F/A',
        price: '',
        brand: 'Wedge Company',
        competitor: '',
        opportunity: '',
      },
      {
        type: 'DBX Putty Medium',
        price: '',
        brand: 'DBM #2',
        competitor: '',
        opportunity: '',
      },
    ],
  },
  SAV22: {
    power: [
      {
        type: 'E Pen',
        price: '',
        brand: '',
        competitor: '',
        opportunity: '',
      },
      {
        type: 'Small Power',
        price: '',
        brand: '',
        competitor: '',
        opportunity: '',
      },
      {
        type: 'Racon Power',
        price: '',
        brand: '',
        competitor: '',
        opportunity: '',
      },
      {
        type: 'Large Power',
        price: '',
        brand: '',
        competitor: '',
        opportunity: '',
      },
      {
        type: 'High Speed Power',
        price: '',
        brand: '',
        competitor: '',
        opportunity: '',
      },
      {
        type: 'Air Power',
        price: '',
        brand: '',
        competitor: '',
        opportunity: '',
      },
    ],
  },

  SAV25: {
    element: [
      {
        type: platesAndScrews,
        subElement: [
          {
            subTitle: handAndWrist,
            current: '',
            offers: '',
          },
          {
            subTitle: shoulderAndElbow,
            current: '',
            offers: '',
          },
          {
            subTitle: femurAndElbow,
            current: '',
            offers: '',
          },
          {
            subTitle: footAndAnkle,
            current: '',
            offers: '',
          },
          {
            subTitle: nonAnatomic,
            current: '',
            offers: '',
          },
        ],
      },
      {
        type: 'IM Nails',
        subElement: [
          {
            subTitle: 'Hip Nails',
            current: '',
            offers: '',
          },
          {
            subTitle: femoralNails,
            current: '',
            offers: '',
          },
          {
            subTitle: tibialNail,
            current: '',
            offers: '',
          },
        ],
      },
      {
        type: 'IM Nails',
        subElement: [
          {
            subTitle: externalFixtures,
            current: '',
            offers: '',
          },
          {
            subTitle: cannulatedScrews,
            current: '',
            offers: '',
          },
        ],
      },
      {
        type: otherProcedures,
        subElement: [
          {
            subTitle: '',
            current: '',
            offers: '',
          },
        ],
      },
      {
        type: procedureSpendSavings,
        subElement: [
          {
            subTitle: '',
            current: '',
            offers: '',
          },
        ],
      },
    ],
  },

  SAV26: {
    element: [
      {
        type: platesAndScrews,
        subElement: [
          {
            subTitle: handAndWrist,
            current: '',
            offers: '',
            spend: '',
            opportunity: '',
          },
          {
            subTitle: shoulderAndElbow,
            current: '',
            offers: '',
            spend: '',
            opportunity: '',
          },
          {
            subTitle: femurAndElbow,
            current: '',
            offers: '',
            spend: '',
            opportunity: '',
          },
          {
            subTitle: footAndAnkle,
            current: '',
            offers: '',
            spend: '',
            opportunity: '',
          },
          {
            subTitle: nonAnatomic,
            current: '',
            offers: '',
            spend: '',
            opportunity: '',
          },
        ],
      },
      {
        type: 'IM Nails',
        subElement: [
          {
            subTitle: 'Hip Nails',
            current: '',
            offers: '',
            spend: '',
            opportunity: '',
          },
          {
            subTitle: femoralNails,
            current: '',
            offers: '',
            spend: '',
            opportunity: '',
          },
          {
            subTitle: tibialNail,
            current: '',
            offers: '',
            spend: '',
            opportunity: '',
          },
        ],
      },
      {
        type: 'IM Nails',
        subElement: [
          {
            subTitle: externalFixtures,
            current: '',
            offers: '',
            spend: '',
            opportunity: '',
          },
          {
            subTitle: cannulatedScrews,
            current: '',
            offers: '',
            spend: '',
            opportunity: '',
          },
        ],
      },
      {
        type: otherProcedures,
        subElement: [
          {
            subTitle: '',
            current: '',
            offers: '',
            spend: '',
            opportunity: '',
          },
        ],
      },
      {
        type: procedureSpendSavings,
        subElement: [
          {
            subTitle: '',
            current: '',
            offers: '',
            spend: '',
            opportunity: '',
          },
        ],
      },
    ],
  },

  SAV27: {
    element: [
      {
        type: platesAndScrews,
        subElement: [
          {
            subTitle: handAndWrist,
            current: '',
            offers: '',
            spend: '',
          },
          {
            subTitle: shoulderAndElbow,
            current: '',
            offers: '',
            spend: '',
          },
          {
            subTitle: femurAndElbow,
            current: '',
            offers: '',
            spend: '',
          },
          {
            subTitle: footAndAnkle,
            current: '',
            offers: '',
            spend: '',
          },
          {
            subTitle: nonAnatomic,
            current: '',
            offers: '',
            spend: '',
          },
        ],
      },
      {
        type: 'IM Nails',
        subElement: [
          {
            subTitle: 'Hip Nails',
            current: '',
            offers: '',
            spend: '',
          },
          {
            subTitle: femoralNails,
            current: '',
            offers: '',
            spend: '',
          },
          {
            subTitle: tibialNail,
            current: '',
            offers: '',
            spend: '',
          },
        ],
      },
      {
        type: 'IM Nails',
        subElement: [
          {
            subTitle: externalFixtures,
            current: '',
            offers: '',
            spend: '',
          },
          {
            subTitle: cannulatedScrews,
            current: '',
            offers: '',
            spend: '',
          },
        ],
      },
      {
        type: otherProcedures,
        subElement: [
          {
            subTitle: '',
            current: '',
            offers: '',
            spend: '',
          },
        ],
      },
      {
        type: procedureSpendSavings,
        subElement: [
          {
            subTitle: '',
            current: '',
            offers: '',
            spend: '',
          },
        ],
      },
    ],
  },

  SAV28: {
    element: [
      {
        type: platesAndScrews,
        subElement: [
          {
            subTitle: handAndWrist,
            current: '',
            offers: '',
            tech: '',
            spend: '',
            opportunity: '',
          },
          {
            subTitle: shoulderAndElbow,
            current: '',
            offers: '',
            tech: '',
            spend: '',
            opportunity: '',
          },
          {
            subTitle: femurAndElbow,
            current: '',
            offers: '',
            tech: '',
            spend: '',
            opportunity: '',
          },
          {
            subTitle: footAndAnkle,
            current: '',
            offers: '',
            tech: '',
            spend: '',
            opportunity: '',
          },
          {
            subTitle: nonAnatomic,
            current: '',
            offers: '',
            tech: '',
            spend: '',
            opportunity: '',
          },
        ],
      },
      {
        type: 'IM Nails',
        subElement: [
          {
            subTitle: 'Hip Nails',
            current: '',
            offers: '',
            tech: '',
            spend: '',
            opportunity: '',
          },
          {
            subTitle: femoralNails,
            current: '',
            offers: '',
            tech: '',
            spend: '',
            opportunity: '',
          },
          {
            subTitle: tibialNail,
            current: '',
            offers: '',
            tech: '',
            spend: '',
            opportunity: '',
          },
        ],
      },
      {
        type: 'IM Nails',
        subElement: [
          {
            subTitle: externalFixtures,
            current: '',
            offers: '',
            tech: '',
            spend: '',
            opportunity: '',
          },
          {
            subTitle: cannulatedScrews,
            current: '',
            offers: '',
            tech: '',
            spend: '',
            opportunity: '',
          },
        ],
      },
      {
        type: otherProcedures,
        subElement: [
          {
            subTitle: '',
            current: '',
            offers: '',
            tech: '',
            spend: '',
            opportunity: '',
          },
        ],
      },
      {
        type: procedureSpendSavings,
        subElement: [
          {
            subTitle: '',
            current: '',
            offers: '',
            tech: '',
            spend: '',
            opportunity: '',
          },
        ],
      },
    ],
  },
  ASC_5: {
    date: startDate,
  },
}
