<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <slideHeader
        title="Savings Summary"
        :sav-number="24"
        class="ml-6"
        name="SAV"
      />
      <div class="flex mt-5 font-Arial font-bold">
        <table class="text-left text-sm text-white w-1/2 ml-5 mr-12 my-auto">
          <thead class="">
            <tr class="bg-blue-750">
              <th class="table-data-border">Procedure Savings</th>
              <th class="text-center">Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-row-data-border">
              <td class="bg-gray-800 table-data-border">
                Price savings from standardization*
              </td>
              <td class="bg-blue-15 text-right text-black">
                {{
                  commaNumbers(
                    savingSummaryDraft.procedureSavings[
                      'price savings from standardization*'
                    ] || savingSummaryDraft.procedureSavings['standardization'],
                  )
                }}
              </td>
            </tr>
            <tr class="table-row-data-border">
              <td class="bg-gray-800 table-data-border">
                Price savings from new price offer
              </td>
              <td class="bg-blue-10 text-right text-black">
                {{
                  commaNumbers(
                    savingSummaryDraft.procedureSavings[
                      'price savings from new price offer'
                    ] || savingSummaryDraft.procedureSavings['offer'],
                  )
                }}
              </td>
            </tr>
            <tr class="table-row-data-border">
              <td class="bg-gray-800 table-data-border">
                Savings from portofolio options
              </td>
              <td class="bg-blue-15 text-right text-black">
                {{
                  commaNumbers(
                    savingSummaryDraft.procedureSavings[
                      'savings from portofolio options'
                    ] || savingSummaryDraft.procedureSavings['options'],
                  )
                }}
              </td>
            </tr>
            <tr class="h-8" />
            <tr class="border-separate">
              <th class="bg-blue-750 table-data-border">Addtional Savings</th>
              <th class="bg-blue-750 text-center">Savings</th>
            </tr>
            <tr class="table-row-data-border">
              <td class="bg-gray-800 table-data-border">Rigid Containers</td>
              <td class="bg-blue-10 text-right text-black place-content-end">
                {{
                  commaNumbers(
                    savingSummaryDraft.additinalSavings['Rigid Containers'] ||
                      savingSummaryDraft.additinalSavings['rigid'],
                  )
                }}
              </td>
            </tr>
            <tr class="table-row-data-border">
              <td class="bg-gray-800 table-data-border">USF Conversions</td>
              <td class="bg-blue-15 text-right text-black">
                {{
                  commaNumbers(
                    savingSummaryDraft.additinalSavings['USF Conversions'] ||
                      savingSummaryDraft.additinalSavings['usf'],
                  )
                }}
              </td>
            </tr>
            <tr class="table-row-data-border">
              <td class="bg-gray-800 table-data-border">eSIMs</td>
              <td class="bg-blue-10 text-right text-black">
                {{
                  commaNumbers(
                    savingSummaryDraft.additinalSavings['eSIMs'] ||
                      savingSummaryDraft.additinalSavings['esims'],
                  )
                }}
              </td>
            </tr>
            <tr class="table-row-data-border">
              <td class="bg-gray-800 table-data-border">Biologics</td>
              <td class="bg-blue-15 text-right text-black">
                {{
                  commaNumbers(savingSummaryDraft.additinalSavings['Biologics'])
                }}
              </td>
            </tr>
            <tr class="table-row-data-border">
              <td class="bg-gray-800 table-data-border">Power Equimpment</td>
              <td class="bg-blue-10 text-right text-black">
                {{
                  commaNumbers(
                    savingSummaryDraft.additinalSavings['Power Equimpment'] ||
                      savingSummaryDraft.additinalSavings['power'],
                  )
                }}
              </td>
            </tr>
            <tr class="table-row-data-border">
              <td class="bg-gray-800 table-data-border">Rebate or NBI</td>
              <td class="bg-blue-15 text-right text-black">
                {{
                  commaNumbers(
                    savingSummaryDraft.additinalSavings['Rebate or NBI'],
                  )
                }}
              </td>
            </tr>
            <tr class="table-row-data-border">
              <td class="bg-gray-800 table-data-border">Other</td>
              <td class="bg-blue-10 text-right text-black">
                {{ commaNumbers(savingSummaryDraft.additinalSavings['Other']) }}
              </td>
            </tr>
            <tr class="h-8" />
            <td class="bg-red-750 table-data-border">OVERALL SAVINGS</td>
            <td class="bg-blue-15 text-black flex justify-end">
              <div>$</div>
              <div>{{ commaNumbers(getOverAllSavings) }}</div>
              <div>&nbsp;</div>
            </td>
          </tbody>
        </table>

        <img
          class="object-cover w-1/2 mr-12"
          src="@/assets/images/savings_summary_doctors.png"
          alt="Workflow"
        />
      </div>
      <p
        class="text-xs text-left font-thin text-gray-425 pt-2 ml-5 mb-4 mt-auto"
      >
        * Savings shown is an estimation based on customer's Procedures. Actual
        Savings may vary depending on custoemrs's actual usasge price from
        vendors
      </p>
      <div class="mb-0 mt-4">
        <slideFooter />
      </div>
    </div>
  </section>
</template>

<script>
import slideFooter from './slideFooter.vue'
import slideHeader from './slideHeader.vue'
import { commaNumbers } from '@/utils/formatNumber'
import dynamicSlide from './dynamicSlide.js'

export default {
  components: { slideFooter, slideHeader },

  setup() {
    const { slideContent: savingSummaryDraft } = dynamicSlide('SAV24')

    return {
      savingSummaryDraft,
      commaNumbers,
    }
  },

  computed: {
    getOverAllSavings() {
      let total = 0
      for (const key in this.savingSummaryDraft.procedureSavings) {
        total += this.savingSummaryDraft.procedureSavings[key] || 0
      }
      for (const key in this.savingSummaryDraft.additinalSavings) {
        total += this.savingSummaryDraft.additinalSavings[key] || 0
      }
      return total
    },
  },
}
</script>

<style scoped>
td,
th {
  padding: 5px;
}
.table-row-data-border {
  border-top: 2px solid #ffffff;
}
.table-data-border {
  border-right: 2px solid #ffffff;
}
</style>
