<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <slideHeader
        title="Your procedure spend and saving opportunities"
        :sav-number="27"
        class="ml-6"
        name="SAV"
      />
      <div class="flex flex-col mt-5 font-Arial">
        <table
          class="border-t-2 border-b-2 border-black text-center w-2/3 mx-auto mt-2"
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
              class="text-dark-red text-center bg-gray-61 text-xl font-bold border-r-2 border-black"
              colspan="3"
            >
              DePuy Synthes
            </td>
          </tr>
          <tr>
            <td
              class="bg-gray-800 border-r-2 border-t-2 border-black text-white"
            >
              Current
            </td>
            <td class="bg-dark-red border-t-2 border-black text-white">
              Offer Existing Mix
            </td>
            <td
              class="bg-dark-red border-t-2 border-r-2 border-black text-white"
            >
              Offer Value Tech**
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
              {{ sav27SlideDraft.element[0].subElement[0].current }}
            </td>
            <td>{{ sav27SlideDraft.element[0].subElement[0].offers }}</td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[0].subElement[0].spend }}
            </td>
          </tr>
          <tr>
            <td class="bg-lighted-blue text-left border-r-2 border-black">
              Shoulder & Elbow
            </td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[0].subElement[1].current }}
            </td>
            <td>{{ sav27SlideDraft.element[0].subElement[1].offers }}</td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[0].subElement[1].spend }}
            </td>
          </tr>
          <tr>
            <td class="bg-lighted-blue text-left border-r-2 border-black">
              Femur & Tibia
            </td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[0].subElement[2].current }}
            </td>
            <td>{{ sav27SlideDraft.element[0].subElement[2].offers }}</td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[0].subElement[2].spend }}
            </td>
          </tr>
          <tr>
            <td class="bg-lighted-blue text-left border-r-2 border-black">
              Foot & Ankle
            </td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[0].subElement[3].current }}
            </td>
            <td>{{ sav27SlideDraft.element[0].subElement[3].offers }}</td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[0].subElement[3].spend }}
            </td>
          </tr>
          <tr>
            <td class="bg-lighted-blue text-left border-r-2 border-black">
              Non anatomic
            </td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[0].subElement[4].current }}
            </td>
            <td>{{ sav27SlideDraft.element[0].subElement[4].offers }}</td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[0].subElement[4].spend }}
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
              {{ sav27SlideDraft.element[1].subElement[0].current }}
            </td>
            <td>{{ sav27SlideDraft.element[1].subElement[0].offers }}</td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[1].subElement[0].spend }}
            </td>
          </tr>
          <tr>
            <td class="bg-purple text-left border-r-2 border-black">
              Femoral Nails
            </td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[1].subElement[1].current }}
            </td>
            <td>{{ sav27SlideDraft.element[1].subElement[1].offers }}</td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[1].subElement[1].spend }}
            </td>
          </tr>
          <tr>
            <td class="bg-purple text-left border-r-2 border-black">
              Tibial Nails
            </td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[1].subElement[2].current }}
            </td>
            <td>{{ sav27SlideDraft.element[1].subElement[2].offers }}</td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[1].subElement[2].spend }}
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
              {{ sav27SlideDraft.element[2].subElement[0].current }}
            </td>
            <td>{{ sav27SlideDraft.element[2].subElement[0].offers }}</td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[2].subElement[0].spend }}
            </td>
          </tr>
          <tr>
            <td class="bg-pink-80 text-left border-r-2 border-black">
              Cannulated Screws
            </td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[2].subElement[1].current }}
            </td>
            <td>{{ sav27SlideDraft.element[2].subElement[1].offers }}</td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[2].subElement[1].spend }}
            </td>
          </tr>
          <tr class="">
            <td class="bg-gray-61 border-l-2 border-black"></td>
            <td class="border-r-2 text-left border-black bg-gray-61">
              Otherbg-gray-61 Procedures*
            </td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[3].subElement[0].current }}
            </td>
            <td>{{ sav27SlideDraft.element[3].subElement[0].offers }}</td>
            <td class="border-r-2 border-black">
              {{ sav27SlideDraft.element[3].subElement[0].spend }}
            </td>
          </tr>
          <tr class="">
            <td
              class="border-r-2 border-l-2 border-black bg-dark-red text-white"
              colspan="2"
            >
              Procedure spend Savings
            </td>
            <td class="border-r-2 border-black bg-gray-800">
              {{ sav27SlideDraft.element[4].subElement[0].current }}
            </td>
            <td class="bg-dark-red">
              {{ sav27SlideDraft.element[4].subElement[0].offers }}
            </td>
            <td class="bg-dark-red border-r-2 border-black">
              {{ sav27SlideDraft.element[4].subElement[0].spend }}
            </td>
          </tr>
        </table>
        <em class="w-2/3 mx-auto text-xs mt-1">
          *Includes Biomaterials, Nitinol, Cable, Pediatrics, Shoulder Nails.
          <br />
          <br />
          **Savings shown is an estimation based on customer's total spend and
          utilize competitive vendors 3rd party average selling prices. Actual
          savings vary depending on customer's actual usage
        </em>
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
    const { slideContent: sav27SlideDraft } = dynamicSlide('SAV27')

    return {
      sav27SlideDraft,
    }
  },
}
</script>

<style scoped>
table td,
th {
  padding: 4px;
  border-collapse: collapse;
}
</style>
