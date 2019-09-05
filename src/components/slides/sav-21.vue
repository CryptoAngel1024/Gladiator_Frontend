<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <slideHeader
        title="Biologics: Is there more opportunity to save?"
        :sav-number="21"
        class="ml-6"
        name="SAV"
      />
      <div class="flex flex-col mt-5 font-Arial">
        <div class="flex flex-wrap px-6">
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/21-1.png"
              alt="Workflow"
            />
            <p class="mt-2">chronOS® Granules</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/21-2.png"
              alt="Workflow"
            />
            <p class="mt-2">chronOS® Performs</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/21-3.png"
              alt="Workflow"
            />
            <p class="mt-2">CONFORM® Flex</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/21-4.png"
              alt="Workflow"
            />
            <p class="mt-2">Norian® Drillable</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/21-5.png"
              alt="Workflow"
            />
            <p class="mt-2">
              ViviGen® & ViviGen Formable® Cellular Bone Matrix
            </p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/21-6.png"
              alt="Workflow"
            />
            <p class="mt-2">FIBERGRAFT® Bioactive Glass</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/21-7.png"
              alt="Workflow"
            />
            <p class="mt-2">DBX® Demineralized Bone Matrix Paste</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/21-7.png"
              alt="Workflow"
            />
            <p class="mt-2">DBX® Demineralized Bone Matrix Putty</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/21-7.png"
              alt="Workflow"
            />
            <p class="mt-2">DBX® Demineralized Bone Matrix Mix</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/21-8.png"
              alt="Workflow"
            />
            <p class="mt-2">RIA 2 System (Reamer Irrigator Aspirator)</p>
          </div>
        </div>

        <table class="border-4 text-left text-sm text-white w-4/5 mx-auto mt-4">
          <thead class="">
            <tr class="bg-blue-700">
              <th class="table-data-border">Biologic</th>
              <th class="text-center table-data-border">Committed Price</th>
              <th class="text-center table-data-border">Competitive Brand</th>
              <th class="text-center table-data-border">
                Cost For Comparable Competitor
              </th>
              <th class="text-center">Total Savings Opportunity</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(powerElement, i) in sav21SlideDraft.biologic"
              :key="i"
              class="table-row-data-border"
            >
              <td class="bg-gray-800 table-data-border">
                {{ powerElement.type }}
              </td>
              <td
                class="font-bold text-black text-center table-data-border"
                :class="i % 2 ? 'bg-blue-50' : 'bg-blue-300'"
              >
                {{ powerElement.price }}
              </td>
              <td
                class="font-bold text-black text-center table-data-border"
                :class="i % 2 ? 'bg-blue-50' : 'bg-blue-300'"
              >
                {{ powerElement.brand }}
              </td>
              <td
                class="font-bold text-black text-center table-data-border"
                :class="i % 2 ? 'bg-blue-50' : 'bg-blue-300'"
              >
                {{ powerElement.competitor }}
              </td>
              <td
                class="font-bold text-black text-center table-data-border"
                :class="i % 2 ? 'bg-blue-50' : 'bg-blue-300'"
              >
                {{ powerElement.opportunity }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs text-left font-thin text-gray-425 pt-2 ml-5 mt-auto">
        * Savings shown is an estimation based on customer provided data. Actual
        savings may vary depending on customer usage and price.
      </p>
      <p class="text-xs text-left font-thin text-gray-425 pt-2 ml-5 mt-auto">
        The third-party trademarks used herein are the trademarks of their
        respective owners. Norian is a registered trademark of DSM Biomedical or
        its associates. ViviGen and ViviGen Formable are registered trademarks
        of LIfeNet Health. FIBERGRAFT is owned by Prosidyan. CONFORM and DBX
        marks are owned by MTF.
      </p>
      <div class="mb-0">
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
    const { slideContent: sav21SlideDraft } = dynamicSlide('SAV21')

    return {
      sav21SlideDraft,
    }
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
tr:nth-child(even) {
  background-color: hotpink !important;
}
</style>
