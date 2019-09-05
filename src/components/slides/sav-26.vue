<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <slideHeader
        title="Your procedure spend and saving opportunities"
        :sav-number="26"
        class="ml-6"
        name="SAV"
      />
      <div class="flex flex-col mt-5 font-Arial">
        <table
          class="border-t-2 border-b-2 border-black text-center w-11/12 mx-auto mt-2"
        >
          <tr>
            <th
              class="bg-dark-red border-r-2 border-l-2 border-black text-white"
              rowspan="2"
              colspan="2"
            >
              Procedure Category
            </th>
            <td
              class="text-dark-red border-r-2 border-black text-center text-xl font-bold bg-gray-61"
              colspan="2"
            >
              DePuy Synthes
            </td>
            <td
              class="text-white bg-blue-850 text-center text-xl font-bold border-r-2 border-black"
              colspan="2"
            >
              Other Vendors
            </td>
          </tr>
          <tr>
            <td
              class="bg-gray-800 border-r-2 border-t-2 border-black text-white"
            >
              Current
            </td>
            <td
              class="bg-dark-red border-t-2 border-r-2 border-black text-white"
            >
              Offer
            </td>
            <td class="bg-blue-850 text-white">Current Spend**</td>
            <td class="bg-blue-850 text-white border-r-2 border-black">
              Saving Opportunity***
            </td>
          </tr>
          <tr class="border-t-2 border-black">
            <td
              class="bg-lighted-blue font-bold border-l-2 border-black"
              rowspan="5"
            >
              Plates & Screws
            </td>
            <td class="bg-lighted-blue text-left border-r-2 border-black">
              Hand & Wrist
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[0].current }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[0].offers }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[0].spend }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[0].opportunity }}
            </td>
          </tr>
          <tr>
            <td class="bg-lighted-blue text-left border-r-2 border-black">
              Shoulder & Elbow
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[1].current }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[1].offers }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[1].spend }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[1].opportunity }}
            </td>
          </tr>
          <tr>
            <td class="bg-lighted-blue text-left border-r-2 border-black">
              Femur & Tibia
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[2].current }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[2].offers }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[2].spend }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[2].opportunity }}
            </td>
          </tr>
          <tr>
            <td class="bg-lighted-blue text-left border-r-2 border-black">
              Foot & Ankle
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[3].current }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[3].offers }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[3].spend }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[3].opportunity }}
            </td>
          </tr>
          <tr>
            <td class="bg-lighted-blue text-left border-r-2 border-black">
              Non anatomic
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[4].current }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[4].offers }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[4].spend }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[0].subElement[4].opportunity }}
            </td>
          </tr>

          <tr class="border-t-2 border-gray-350">
            <td class="bg-purple font-bold border-l-2 border-black" rowspan="3">
              IM Nails
            </td>
            <td class="bg-purple text-left border-r-2 border-black">
              Hip Nails
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[1].subElement[0].current }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[1].subElement[0].offers }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[1].subElement[0].spend }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[1].subElement[0].opportunity }}
            </td>
          </tr>
          <tr>
            <td class="bg-purple text-left border-r-2 border-black">
              Femoral Nails
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[1].subElement[1].current }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[1].subElement[1].offers }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[1].subElement[1].spend }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[1].subElement[1].opportunity }}
            </td>
          </tr>
          <tr>
            <td class="bg-purple text-left border-r-2 border-black">
              Tibial Nails
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[1].subElement[2].current }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[1].subElement[2].offers }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[1].subElement[2].spend }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[1].subElement[2].opportunity }}
            </td>
          </tr>
          <tr class="border-t-2 border-gray-350">
            <td
              class="bg-pink-80 font-bold border-l-2 border-black"
              rowspan="2"
            >
              ExFix/CS
            </td>
            <td class="bg-pink-80 text-left border-r-2 border-black">
              External Fixation
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[2].subElement[0].current }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[2].subElement[0].offers }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[2].subElement[0].spend }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[2].subElement[0].opportunity }}
            </td>
          </tr>
          <tr>
            <td class="bg-pink-80 text-left border-r-2 border-black">
              Cannulated Screws
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[2].subElement[1].current }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[2].subElement[1].offers }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[2].subElement[1].spend }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[2].subElement[1].opportunity }}
            </td>
          </tr>
          <tr class="">
            <td class="bg-gray-61 border-l-2 border-black"></td>
            <td class="border-r-2 text-left border-black bg-gray-61">
              Other Procedures*
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[3].subElement[0].current }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[3].subElement[0].offers }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[3].subElement[0].spend }}
            </td>
            <td class="border-r-2 border-black">
              {{ sav26SlideDraft.element[3].subElement[0].opportunity }}
            </td>
          </tr>
          <tr class="">
            <td
              class="border-l-2 border-black bg-dark-red text-white"
              colspan="2"
            >
              Procedure spend Savings
            </td>
            <td class="border-r-2 border-black bg-gray-800">
              {{ sav26SlideDraft.element[4].subElement[0].current }}
            </td>
            <td class="bg-dark-red border-r-2 border-black">
              {{ sav26SlideDraft.element[4].subElement[0].offers }}
            </td>
            <td class="border-r-2 border-black bg-blue-850">
              {{ sav26SlideDraft.element[4].subElement[0].spend }}
            </td>
            <td class="bg-blue-850 border-r-2 border-black">
              {{ sav26SlideDraft.element[4].subElement[0].opportunity }}
            </td>
          </tr>
          <tr>
            <td
              colspan="6"
              class="border-l-2 border-r-2 border-black text-left text-xs"
            >
              <div class="mt-1">
                *Includes Biomaterials, Nitinol, Cable, Pediatrics, Shoulder
                Nails.
              </div>
              <div class="my-2">
                **Customer spend with other vendors is an estimation based on
                average procedure mix and selling based on 3rd party data.
                Actual spend may vary depending on customers actual procedure
                mix and price from vendors
              </div>
              <div>
                **Savings shown is an estimation based on customer's total spend
                and utilize competitive vendors 3rd party average selling
                prices. Actual savings vary depending on customer's actual usage
                and price from vendors
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="mb-0 mt-auto">
        <slideFooter />
      </div>
    </div>
  </section>
</template>

<script>
import slideFooter from './slideFooter.vue'
import slideHeader from './slideHeader.vue'
import dynamicSlide from './dynamicSlide.js'

export default {
  components: { slideFooter, slideHeader },
  setup() {
    const { slideContent: sav26SlideDraft } = dynamicSlide('SAV26')

    return {
      sav26SlideDraft,
    }
  },
}
</script>

<style scoped>
table td,
th {
  padding: 3px;

  border-collapse: collapse;
}
</style>
