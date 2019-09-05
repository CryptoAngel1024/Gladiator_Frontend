<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <div class="flex justify-between p-3">
        <p class="text-4xl font-bold text-slidColor-header pl-3">
          Savings Through Procedural Efficiency
        </p>
        <slideHeader class="pt-0" :sav-number="5" name="SAV" />
      </div>
      <div class="flex flex-col px-6 flex-grow">
        <h3 class="text-left text-xl">
          Example of potential savings in Cephalomedullary Long Nail procedure
          as reported by
          <span class="underline">Decision Resource Group (2019)</span>
        </h3>
        <div class="grid grid-cols-3 my-auto">
          <div class="my-auto">
            <table
              class="border-4 border-gray-500 text-left text-white mx-auto"
            >
              <thead>
                <tr class="bg-blue-700">
                  <th colspan="2">Cephalomedullary Long Nail Procedure</th>
                </tr>
              </thead>
              <thead class="bg-gray-800">
                <tr>
                  <th class="">Item Description</th>
                  <th class="text-right">Stryker Usage</th>
                </tr>
              </thead>
              <tbody class="text-black font-bold">
                <tr class="table-row-data-border">
                  <td class="">Nail</td>
                  <td class="font-bold text-right">49%</td>
                </tr>
                <tr class="table-row-data-border">
                  <td class="">Lag Screw</td>
                  <td class="font-bold text-right">12%</td>
                </tr>
                <tr class="table-row-data-border">
                  <td class="">Reaming Rod</td>
                  <td class="font-bold text-right">4%</td>
                </tr>
                <tr class="table-row-data-border">
                  <td class="">5.0 Locking Screw</td>
                  <td class="font-bold text-right">15%</td>
                </tr>
                <tr class="table-row-data-border">
                  <td class="">4.2 Drill Bit</td>
                  <td class="font-bold text-right">7%</td>
                </tr>
                <tr class="table-row-data-border">
                  <td class="">3.2 Guide Wire</td>
                  <td class="font-bold text-right">2%</td>
                </tr>
                <tr
                  class="border-t-4 border-r-4 border-l-4 border-solid border-red-500 bg-red-200"
                >
                  <td class="">Reamer Shaft</td>
                  <td class="font-bold text-right">8%</td>
                </tr>
                <tr
                  class="border-b-4 border-r-4 border-l-4 border-solid border-red-500 bg-red-200"
                >
                  <td class="">Closed tube clip</td>
                  <td class="font-bold text-right">3%</td>
                </tr>
                <tr class="table-row-data-border bg-gray-500">
                  <td class=""># Average Spend</td>
                  <td class="font-bold text-right">$153,600</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-span-2 relative">
            <img class="w-11/12 ml-auto" src="@/assets/images/wheel.png" />
            <div class="absolute top-56 left-28 text-center">
              <span class="text-xl text-white"
                >Additional items<br />only required by<br />Stryker</span
              >
            </div>
            <div class="absolute top-4 left-20">
              <img class="h-40" src="@/assets/images/stamp.png" />
            </div>
          </div>
        </div>
      </div>
      <slideFooter class="mt-auto" :show-third-party-trade-mark="true" />
    </div>
  </section>
</template>

<script>
import slideFooter from './slideFooter.vue'
import slideHeader from '@/components/slides/slideHeader.vue'

export default {
  components: { slideFooter, slideHeader },
}
</script>

<style lang="postcss" scoped>
td,
th {
  padding: 8px;
}
.table-row-data-border {
  border-top: 2px solid #ffffff;
}
</style>
