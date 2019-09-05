<template>
  <div class="px-2 pt-3 text-left">
    <div class="flex justify-between items-center">
      <h3 class="text-red-700 font-bold text-sm">Card View</h3>
      <button
        class="bg-transparent text-sm flex items-center text-accent-blue py-1 px-1 border-accent-blue border-2 rounded-md"
        @click="toggleModal(), surgeonCardViewGalog()"
      >
        Enter in spreadsheet
        <SvgIcon class="w-4 h-4 ml-2" name="spreadsheet" />
      </button>
    </div>
    <div class="mt-4">
      <p class="input-lable-gray">Total Available Business</p>
      <input
        v-model.number="
          surgeonPlanDraft['Total available trauma business in hospital']
        "
        type="number"
        class="border rounded py-2 px-2 text-sm w-full text-grey-darker"
        placeholder="Enter amount"
      />
    </div>
    <div class="w-full mt-4">
      <div
        v-for="(row, i) in surgeonPlanDraft.rows"
        :key="i"
        class="tab w-full border-t"
      >
        <button
          class="flex justify-between items-center bg-gray-200 leading-normal cursor-pointer px-3 py-2 w-full"
          :for="`tab-multi-${i + 1}`"
          @click=";(row.display = !row.display), surgeonRawTogGalog()"
        >
          <p class="text-slidColor-1 font-bold text-sm">Row {{ i + 1 }}</p>
          <SvgIcon
            v-if="row.display"
            class="arrow-icon w-4 h-4 mr-2"
            name="arrow-up"
          />
          <SvgIcon v-else class="arrow-icon w-4 h-4 mr-2" name="arrow-down" />
        </button>
        <div v-if="row.display" class="bg-white leading-normal">
          <div class="p-5">
            <div>
              <p class="input-lable-gray">Doctors</p>
              <input
                v-model="surgeonPlanDraft.rows[i].Doctors"
                class="border rounded py-2 px-2 text-sm w-full text-grey-darker"
                placeholder="Enter Doctor's Name"
              />
            </div>
            <div class="mt-3">
              <p class="text-base font-medium text-red-700 pb-3">
                Estimated current business with DPS
              </p>
              <p class="input-lable-gray">
                Estimated current business with Depuy Synthes
              </p>
              <input
                v-model="
                  surgeonPlanDraft.rows[i][
                    'Estimated current business with Depuy Synthes'
                  ]
                "
                class="border rounded py-2 px-2 text-sm w-full text-grey-darker"
                placeholder="Enter business with DPS"
              />
            </div>
            <div class="mt-3">
              <p class="input-lable-gray">
                Estimated current $ of business with DPS
              </p>
              <input
                v-model.number="
                  surgeonPlanDraft.rows[i][
                    'Estimated current estimate $ of business with Depuy Synthes'
                  ]
                "
                type="number"
                class="border rounded py-2 px-2 text-sm w-full text-grey-darker"
                placeholder="Enter amount"
              />
            </div>
            <p class="text-base font-medium text-red-700 pb-3">
              Estimated Current Business Outside of DPS
            </p>
            <div class="mt-3">
              <p class="input-lable-gray">
                Estimated current business outside Depuy Synthes
              </p>
              <input
                v-model="
                  surgeonPlanDraft.rows[i][
                    'Estimated current business outside Depuy Synthes'
                  ]
                "
                class="border rounded py-2 px-2 text-sm w-full text-grey-darker"
                placeholder="Enter business outside DPS"
              />
            </div>
            <div class="mt-3">
              <p class="input-lable-gray">
                Estimated current $ of business outside DPS
              </p>
              <input
                v-model.number="
                  surgeonPlanDraft.rows[i][
                    'Estimated current estimate $ of business outside Depuy Synthes'
                  ]
                "
                type="number"
                class="border rounded py-2 px-2 text-sm w-full text-grey-darker"
                placeholder="Enter amount"
              />
            </div>
            <p class="text-base font-medium text-red-700 pb-3">
              Estimated Expected Business with DPS
            </p>
            <div class="mt-3">
              <p class="input-lable-gray">Future expected business with DPS</p>
              <input
                v-model="
                  surgeonPlanDraft.rows[i][
                    'Estimated competitor business to swith to Depuy Synthes'
                  ]
                "
                class="border rounded py-2 px-2 text-sm w-full text-grey-darker"
                placeholder="Enter expected business with DPS"
              />
            </div>
            <div class="mt-3">
              <p class="input-lable-gray">
                Future expected $ business with DPS
              </p>
              <input
                v-model.number="
                  surgeonPlanDraft.rows[i][
                    'Estimated $ of competitor business to switch to Depuy Synthes'
                  ]
                "
                type="number"
                class="border rounded py-2 px-2 text-sm w-full text-grey-darker"
                placeholder="Enter amount"
              />
            </div>
            <p class="text-base font-medium text-red-700 pb-3">Others</p>
            <div class="mt-3">
              <p class="input-lable-gray">Estimate $ conversion</p>
              <input
                v-model.number="
                  surgeonPlanDraft.rows[i]['Estimate $ conversion']
                "
                type="number"
                class="border rounded py-2 px-2 text-sm w-full text-grey-darker"
                placeholder="Enter amount"
              />
            </div>
            <p class="text-base font-medium text-red-700">
              DPS team feedback from Doc
            </p>
            <div class="mt-3">
              <input
                v-model="surgeonPlanDraft.rows[i]['DPS team feedback from Doc']"
                class="border rounded py-2 px-2 text-sm w-full text-grey-darker"
                placeholder="Feedback description.."
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-5">
        <button
          class="bg-transparent text-sm border-dashed font-bold text-gray-500 focus:outline-none py-2 px-3 border-gray-300 border rounded-md"
          @click="addStep"
        >
          + Add new row
        </button>
      </div>
      <div class="overview px-3 mt-4">
        <p class="input-lable-gray">Overview</p>
        <textarea
          v-model="surgeonPlanDraft.overviewContent"
          rows="8"
          class="border rounded py-2 px-2 text-sm w-full text-grey-darker"
          placeholder="Enter your overview here...."
        />
      </div>
    </div>
  </div>
  <base-modal
    v-if="spreadSheetModal"
    title="Spread Sheet"
    :close-dialog="toggleModal"
  >
    <div class="modal flex flex-col space-y-4" style="width: 90vw">
      <div class="modal__header flex px-5 pt-5 justify-between">
        <div class="flex justify-between items-center w-3/12">
          <div>
            <h3 class="font-medium text-emerald-900 text-base">Information</h3>
            <span class="text-sm text-gray-500">Slide 13: Surgeon Plan</span>
          </div>
          <div class="flex">
            <SvgIcon class="w-4 h-4 mr-2" name="arrow-up" />
            <SvgIcon class="w-4 h-4" name="arrow-down" />
          </div>
        </div>
        <div class="grid gap-4 grid-cols-2">
          <label
            class="col-span-1 bg-transparent text-sm flex items-center justify-center text-accent-blue py-1 px-1 border-accent-blue border-2 rounded-md cursor-pointer"
          >
            Import CSV
            <input
              id="importCSV"
              accept=".csv"
              type="file"
              name="csv"
              class="hidden"
              @change="onChange($event)"
            />
          </label>
          <button
            class="bg-transparent text-sm flex items-center text-accent-blue py-1 px-1 border-accent-blue border-2 rounded-md"
            @click="toggleModal(), surgeonCloseSpreedSheetGalog()"
          >
            <SvgIcon class="w-4 h-4 mr-2" name="close" />
            Close Spreadsheet
            <SvgIcon class="w-4 h-4 ml-2" name="spreadsheet" />
          </button>
        </div>
      </div>
      <hr />
      <div class="modal__body px-5 pb-5">
        <h3 class="text-slidColor-1 font-bold mb-3 text-md">Spreadsheet</h3>
        <table
          class="modal__body__amountsTable table-fixed border border-gray-300 w-6/12"
        >
          <tr>
            <td class="w-50 font-semibold text-sm">
              Total available trauma business in hospital
            </td>
            <td style="background: #109cf121">
              <input
                v-model.number="
                  surgeonPlanDraft[
                    'Total available trauma business in hospital'
                  ]
                "
                type="number"
                class="border-0 bg-transparent mb-0 focus:outline-none rounded py-2 px-2 text-sm w-full text-grey-darker"
                placeholder="Enter amount"
              />
            </td>
          </tr>
        </table>
        <div class="bg-red-700 mt-3">
          <h3 class="text-center text-white font-bold font-md py-2">
            ESTIMATED CURRENT STATE
          </h3>
        </div>
        <div class="overflow-auto w-full">
          <table class="modal__body__currentStateTable w-full">
            <tr>
              <th class="text-sm text-center px-3">Doctor</th>
              <th class="text-sm text-center px-3">
                Estimated current business with Depuy Synthes
              </th>
              <th class="text-sm text-center px-3">
                Estimated current estimate $ of business with Depuy Synthes
              </th>
              <th class="text-sm text-center px-3">
                Estimated current business outside Depuy Synthes
              </th>
              <th class="text-sm text-center px-3">
                Estimated current $ of business outside DPS
              </th>
              <th class="text-sm text-center px-3">
                Future expected business with DPS
              </th>
              <th class="text-sm text-center px-3">
                Future expected $ business with DPS
              </th>
              <th class="text-sm text-center px-3">Estimate $ conversion</th>
              <th class="text-sm text-center px-3">
                DPS team feedback from Doc
              </th>
            </tr>
            <tr v-for="(row, i) in surgeonPlanDraft.rows" :key="i">
              <td>
                <input
                  v-model="surgeonPlanDraft.rows[i].Doctors"
                  class="border-0 bg-transparent mb-0 text-center py-3 focus:outline-none rounded px-2 text-sm w-full text-grey-darker"
                />
              </td>
              <td>
                <input
                  v-model="
                    surgeonPlanDraft.rows[i][
                      'Estimated current business with Depuy Synthes'
                    ]
                  "
                  class="border-0 bg-transparent mb-0 text-center py-3 focus:outline-none rounded px-2 text-sm w-full text-grey-darker"
                />
              </td>
              <td>
                <input
                  v-model.number="
                    surgeonPlanDraft.rows[i][
                      'Estimated current estimate $ of business with Depuy Synthes'
                    ]
                  "
                  type="number"
                  class="border-0 bg-transparent mb-0 text-center py-3 focus:outline-none rounded px-2 text-sm w-full text-grey-darker"
                />
              </td>
              <td>
                <input
                  v-model="
                    surgeonPlanDraft.rows[i][
                      'Estimated current business outside Depuy Synthes'
                    ]
                  "
                  class="border-0 bg-transparent mb-0 text-center py-3 focus:outline-none rounded px-2 text-sm w-full text-grey-darker"
                />
              </td>
              <td>
                <input
                  v-model.number="
                    surgeonPlanDraft.rows[i][
                      'Estimated current estimate $ of business outside Depuy Synthes'
                    ]
                  "
                  type="number"
                  class="border-0 bg-transparent mb-0 text-center py-3 focus:outline-none rounded px-2 text-sm w-full text-grey-darker"
                />
              </td>
              <td>
                <input
                  v-model="
                    surgeonPlanDraft.rows[i][
                      'Estimated competitor business to swith to Depuy Synthes'
                    ]
                  "
                  class="border-0 bg-transparent mb-0 text-center py-3 focus:outline-none rounded px-2 text-sm w-full text-grey-darker"
                />
              </td>
              <td>
                <input
                  v-model.number="
                    surgeonPlanDraft.rows[i][
                      'Estimated $ of competitor business to switch to Depuy Synthes'
                    ]
                  "
                  type="number"
                  class="border-0 bg-transparent mb-0 text-center py-3 focus:outline-none rounded px-2 text-sm w-full text-grey-darker"
                />
              </td>
              <td>
                <input
                  v-model.number="
                    surgeonPlanDraft.rows[i]['Estimate $ conversion']
                  "
                  type="number"
                  class="border-0 bg-transparent mb-0 text-center py-3 focus:outline-none rounded px-2 text-sm w-full text-grey-darker"
                />
              </td>
              <td>
                <input
                  v-model="
                    surgeonPlanDraft.rows[i]['DPS team feedback from Doc']
                  "
                  class="border-0 bg-transparent mb-0 text-center py-3 focus:outline-none rounded px-2 text-sm w-full text-grey-darker"
                />
              </td>
            </tr>
            <tr height="20%">
              <td class="addRow">
                <button
                  class="bg-transparent text-sm border-dashed font-bold text-gray-500 focus:outline-none py-2 px-3 border-gray-300 border rounded-md"
                  @click="addStep"
                >
                  + Add new row
                </button>
              </td>
              <td
                class="white text-center bg-slidColor-1 color-gray-100 font-bold p-0"
                style="
                  background-color: #003b5f;
                  color: #fff;
                  vertical-align: middle;
                "
              >
                Total
              </td>
              <td
                class="white text-center bg-slidColor-1 color-gray-100 font-bold pl-4"
                style="
                  background-color: #003b5f;
                  color: #fff;
                  vertical-align: middle;
                "
              >
                <span class="mr-auto">$</span>{{ totalValueCurrent }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from '@/components/utils/container/BaseModal.vue'
import { ref, watch } from 'vue'
import { cloneDeep } from 'lodash'
import Papa from 'papaparse'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: { BaseModal },
  props: {
    slideDynamicData: {
      type: Object,
      required: true,
    },
  },
  emits: { updateSlideDynamicData: Object },

  setup(props, { emit }) {
    const checked = ref(true)
    const spreadSheetModal = ref(false)

    const surgeonPlanDraft = ref(cloneDeep(props.slideDynamicData))

    watch(
      surgeonPlanDraft,
      () => emit('updateSlideDynamicData', surgeonPlanDraft.value),
      {
        deep: true,
      },
    )

    const surgeonCardViewGalog = () => {
      gaEvent({
        action: 'surgeon-card-view-button-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-surgeon-card-view-button',
      })
    }

    const surgeonRawTogGalog = () => {
      gaEvent({
        action: 'surgeon-row-toggle-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-surgeon-row-toggle-button',
      })
    }

    const surgeonCloseSpreedSheetGalog = () => {
      gaEvent({
        action: 'surgeon-close-spreed-sheet-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-surgeon-close-spreed-sheet-button',
      })
    }

    return {
      checked,
      spreadSheetModal,
      surgeonPlanDraft,
      surgeonCardViewGalog,
      surgeonRawTogGalog,
      surgeonCloseSpreedSheetGalog,
    }
  },
  computed: {
    totalValueCurrent() {
      let totalValue = 0
      this.surgeonPlanDraft.rows.forEach((row) => {
        if (
          row['Estimated current estimate $ of business with Depuy Synthes']
        ) {
          totalValue +=
            row['Estimated current estimate $ of business with Depuy Synthes']
        }
      })
      return totalValue
    },
  },

  mounted() {
    this.toggleSingleRow()
  },
  methods: {
    addStep() {
      const temp = {
        Doctors: '',
        'Estimated current business with Depuy Synthes': '',
        'Estimated current estimate $ of business with Depuy Synthes': null,
        'Estimated current business outside Depuy Synthes': null,
      }
      this.surgeonPlanDraft.rows.push(temp)
      this.toggleSingleRow()
    },
    toggleModal() {
      this.spreadSheetModal = !this.spreadSheetModal
    },

    onChange(event) {
      let file = event.target.files[0]
      let generateRows = []
      let index = 0
      Papa.parse(file, {
        complete: (results) => {
          let tableBody = results.data.slice(1, results.data.length - 1)
          tableBody.forEach((element) => {
            index++
            let temp = {
              Doctors: element[0],
              'Estimated current business with Depuy Synthes': element[1],
              'Estimated current estimate $ of business with Depuy Synthes':
                parseInt(element[2]),
              'Estimated current business outside Depuy Synthes': element[3],
              'Estimated current estimate $ of business outside Depuy Synthes':
                parseInt(element[4]),
              'Estimated competitor business to swith to Depuy Synthes':
                element[5],
              'Estimated $ of competitor business to switch to Depuy Synthes':
                parseInt(element[6]),
              'Estimate $ conversion': parseInt(element[7]),
              'DPS team feedback from Doc': element[8],
              display: index === 1,
            }
            generateRows.push(temp)
          })
          this.surgeonPlanDraft.rows = generateRows
        },
      })
    },

    toggleSingleRow() {
      let myRadios = document.getElementsByName('rows')
      let setCheck
      let x = 0
      for (x = 0; x < myRadios.length; x++) {
        myRadios[x].onclick = function () {
          if (setCheck != this) {
            setCheck = this
          } else {
            this.checked = false
            setCheck = null
          }
        }
      }
    },
  },
}
</script>

<style scoped lang="postcss">
/* Icon */
.tab label .arrow-icon {
  float: right;
  right: 0;
  top: 0;
  display: block;
  line-height: 1.5;
  font-size: 1.25rem;
  text-align: center;
  -webkit-transition: all 0.35s;
  -o-transition: all 0.35s;
  transition: all 0.35s;
}

.modal__body__amountsTable td,
.modal__body__amountsTable th {
  border-style: solid !important;
  border: 1px solid #ddd;
  padding: 5px 10px;
}
/* .modal__body__currentStateTable{
  max-height:50vh;
  overflow-y: scroll;
} */
.modal__body__currentStateTable th {
  border-style: solid !important;

  border: 1px solid #eee;
}
.modal__body__currentStateTable td {
  border-style: solid !important;
  background: #109cf10d;
  border: 1px solid #eee;
}
.modal__body__currentStateTable td.addRow {
  margin-top: 5px;
  text-align: center;
  border-style: none !important;
  background: transparent;
}
.input-lable-gray {
  @apply text-sm leading-none text-gray-800 mb-1;
  /* font-book */
}
</style>
