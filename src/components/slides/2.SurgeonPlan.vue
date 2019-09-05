<template>
  <section
    class="h-full"
    :class="isPdfView ? 'expandable-slide' : 'overflow-y-auto'"
  >
    <div class="flex flex-col h-full relative">
      <div class="font-medium text-xs text-slidColor-2 p-3">
        <div class="w-full">
          <div class="flex w-full mt-2">
            <p
              class="text-4xl font-bold capitalize ml-0 mr-auto text-slidColor-1 text-left"
            >
              Breakdown of your current trauma business
            </p>
            <div class="flex border border-gray-300 rounded-xl text-sm">
              <label class="my-auto pl-1 min-w-max" for="sort-select"
                >Sort by:</label
              >
              <select
                id="sort-select"
                v-model="SortBy"
                class="text-gray-600 h-10 w-max -mr-7 pr-9 pl-1 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                @change="sortBySelectGaLog()"
              >
                <option :value="undefined" />
                <option>Name</option>
                <option>Marketshare</option>
              </select>
              <div
                class="flex p-1 border border-l-0 border-gray-300 rounded-xl rounded-l-none"
              >
                <SvgIcon class="w-2 h-2 m-auto" name="dropDownArrow" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex w-full">
          <p class="w-1/2 text-left">
            Total current available trauma business in hospital
          </p>
          <p class="w-1/2 pl-6 text-left">
            Future Depuy Synthes trauma business
          </p>
        </div>
      </div>
      <table class="grid grid-cols font-thin text-xs text-slidColor-3 p-4 pt-0">
        <thead>
          <tr class="grid grid-cols-6 gap-10">
            <th>Business in hospital</th>
            <th>For Depuy Synthes</th>
            <th>Market Share</th>
            <th>Future Business</th>
            <th>Market share</th>
            <th />
          </tr>
          <tr class="grid grid-cols-6 gap-10 font-bold text-2xl">
            <th class="text-slideTableHeaderColor pr-2">
              ${{
                commaNumbers(
                  surgeonPlanDraft[
                    'Total available trauma business in hospital'
                  ],
                )
              }}
            </th>
            <th class="text-accent-blue">
              ${{ commaNumbers(total.CurrentEstimate) }}
            </th>
            <th class="text-accent-blue">{{ total.MarketShare }}%</th>
            <th class="text-emerald-variant1">
              ${{ commaNumbers(total.FutureEstimate) }}
            </th>
            <th class="text-emerald-variant1">
              {{ total.OutsideMarketShare }}%
            </th>
            <th />
          </tr>
        </thead>
        <tbody class="font-bold text-base">
          <SurgeonPlanRow
            v-for="(doctor, index) in doctors"
            :key="index"
            :doctor="doctor"
          />
        </tbody>
      </table>
      <SurgeonPlanModal
        v-if="showModal"
        class="absolute z-20 mx-auto overview-modal"
        :overview-content="surgeonPlanDraft.overviewContent"
        @close="showModal = false"
      >
        <template #body />
      </SurgeonPlanModal>

      <button
        v-if="!showModal"
        class="absolute bottom-12 right-8 rounded-full h-24 w-24 flex items-center justify-center bg-secondary"
        @click=";(showModal = true), surgeonOverviewGaLog()"
      >
        <p id="show-modal" class="font-bold text-base text-white">Overview</p>
      </button>
      <button
        v-else
        class="absolute bottom-12 right-8 rounded-full h-24 w-24 flex items-center justify-center bg-white text-secondary shadow-2xl"
        @click=";(showModal = false), surgeonOverviewGaLog()"
      >
        <p id="show-modal" class="font-bold text-6xl">X</p>
      </button>
      <slide-footer class="align-bottom" />
    </div>
  </section>
</template>

<script>
import SurgeonPlanRow from './SurgeonPlanRow.vue'
import SurgeonPlanModal from './surgeonPlanModal.vue'
import slideFooter from './slideFooter.vue'
import { gaEvent } from '@/utils/GA_Event.js'
import { ref } from 'vue'
import { commaNumbers } from '@/utils/formatNumber.js'
import dynamicSlide from './dynamicSlide.js'

const EstimatedCurrentPercentofBusinesswithDepuyLabel =
  'Estimated current estimate $ of business with Depuy Synthes'
const EstimatedCurrentPercentofBusinessOutsideDepuyLabel =
  'Estimated current estimate $ of business outside Depuy Synthes'

export default {
  components: { SurgeonPlanRow, SurgeonPlanModal, slideFooter },
  props: {
    isPdfView: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const SortBy = ref(null)
    const showModal = ref(false)

    const { slideContent: surgeonPlanDraft } = dynamicSlide('SRG2')

    const surgeonOverviewGaLog = () => {
      gaEvent({
        action: 'surgeon-overview',
        event_category: 'dashboard',
        event_label: 'User-clicked-surgeon-overview-button',
      })
    }
    const sortBySelectGaLog = () => {
      gaEvent({
        action: 'surgeon-sort-selector-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-surgeon-sort-selector',
      })
    }

    return {
      SortBy,
      showModal,
      commaNumbers,
      surgeonPlanDraft,
      surgeonOverviewGaLog,
      sortBySelectGaLog,
    }
  },

  computed: {
    doctors() {
      const docs = this.surgeonPlanDraft.rows.map((doctor) => ({
        ...doctor,
        'Estimated current estimate % of business with Depuy Synthes':
          (doctor[EstimatedCurrentPercentofBusinesswithDepuyLabel] /
            (doctor[EstimatedCurrentPercentofBusinesswithDepuyLabel] +
              doctor[EstimatedCurrentPercentofBusinessOutsideDepuyLabel])) *
            100 || 0,
        'Estimated current estimate % of business outside Depuy Synthes':
          (doctor[EstimatedCurrentPercentofBusinessOutsideDepuyLabel] /
            (doctor[EstimatedCurrentPercentofBusinessOutsideDepuyLabel] +
              doctor[EstimatedCurrentPercentofBusinesswithDepuyLabel])) *
            100 || 0,
      }))

      const sortParam =
        this.SortBy === 'Name'
          ? 'Doctors'
          : 'Estimated current estimate % of business with Depuy Synthes'

      return this.SortBy
        ? docs.sort((doctor1, doctor2) => {
            if (doctor1[sortParam] > doctor2[sortParam]) {
              return 1
            }
            if (doctor1[sortParam] < doctor2[sortParam]) {
              return -1
            }
            return 0
          })
        : docs
    },
    total() {
      const doctors = this.doctors
      if (doctors.length === 0) {
        return {
          CurrentEstimate: 0,
          MarketShare: 0,
          FutureEstimate: 0,
          OutsideMarketShare: 0,
        }
      } else {
        const total = {
          CurrentEstimate: doctors.reduce(
            (totalCurrentEstimate, doctor) =>
              totalCurrentEstimate +
              doctor[EstimatedCurrentPercentofBusinesswithDepuyLabel],
            0,
          ),
          FutureEstimate: doctors.reduce(
            (FutureEstimate, doctor) =>
              FutureEstimate +
              doctor[
                'Estimated $ of competitor business to switch to Depuy Synthes'
              ] +
              doctor[EstimatedCurrentPercentofBusinesswithDepuyLabel],
            0,
          ),
        }

        const totalTraumaBusiness =
          this.surgeonPlanDraft['Total available trauma business in hospital']

        total.MarketShare = totalTraumaBusiness
          ? ((total.CurrentEstimate / totalTraumaBusiness) * 100).toFixed(2)
          : '--'

        total.OutsideMarketShare = totalTraumaBusiness
          ? ((total.FutureEstimate / totalTraumaBusiness) * 100).toFixed(2)
          : '--'

        return total
      }
    },
  },
}
</script>

<style scoped lang="postcss">
td,
th {
  @apply my-auto;
  border-style: hidden !important;
}

.expandable-slide {
  height: auto;
}
.overview-modal {
  width: 86%;
  margin: 1% 4% 0% 5%;
  height: 78%;
}
</style>
