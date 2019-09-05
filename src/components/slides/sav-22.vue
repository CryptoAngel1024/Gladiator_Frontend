<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <slideHeader
        title="Power: Is there more opportunity to save?"
        :sav-number="22"
        class="ml-6"
        name="SAV"
      />
      <div class="flex flex-col mt-5 font-Arial">
        <div class="flex flex-wrap px-6 mb-8">
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/22-1.png"
              alt="Workflow"
            />
            <p class="mt-2">Air Pen Drive</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/22-2.png"
              alt="Workflow"
            />
            <p class="mt-2">ANSPACH HELIX™ Dissection Tools</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/22-3.png"
              alt="Workflow"
            />
            <p class="mt-2">ANSPACH® EG1® High Speed Electric</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/22-4.png"
              alt="Workflow"
            />
            <p class="mt-2">Electric Pen Drive</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/22-5.png"
              alt="Workflow"
            />
            <p class="mt-2">Small Battery Drive II</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/22-6.png"
              alt="Workflow"
            />
            <p class="mt-2">Trauma Recon System</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/22-7.png"
              alt="Workflow"
            />
            <p class="mt-2">ANSPACH® EMAX® 2 Plus System</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/22-8.png"
              alt="Workflow"
            />
            <p class="mt-2">ANSPACH® XMAX® High Speed Pneumatic System</p>
          </div>
          <div class="w-44 mx-2">
            <img
              class="h-16"
              src="@/assets/images/slides/saving/22-9.png"
              alt="Workflow"
            />
            <p class="mt-2">Battery Power Line II</p>
          </div>
        </div>
        <table class="border-4 text-left text-sm text-white w-2/3 mx-auto mt-2">
          <thead class="">
            <tr class="bg-blue-700">
              <th class="table-data-border">Power</th>
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
              v-for="(powerElement, i) in sav22SlideDraft.power"
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

      <div class="mb-0 mt-4">
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
    const { slideContent: sav22SlideDraft } = dynamicSlide('SAV22')

    return {
      sav22SlideDraft,
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
