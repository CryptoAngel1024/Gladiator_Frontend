<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <div class="text-pink-850 -mb-4 text-2xl mt-8 text-center">
        DRG's PriceTrack
      </div>
      <div class="border-t border-pink-850 w-90"></div>
      <div class="w-4 h-4 bg-pink-850 rounded-full -mt-2 ml-12"></div>
      <div class="w-4 h-4 bg-pink-850 rounded-full -mt-4 ml-32"></div>
      <div class="w-4 h-4 bg-pink-850 rounded-full -mt-4 ml-72"></div>
      <div class="text-4xl font-bold text-pink-850 mt-8 text-left px-10">
        Trauma Hospital Facility Counts by US Census Region and Bed Size in 2018
      </div>
      <div class="flex flex-col mt-5 font-Arial">
        <table class="border-4 text-left text-sm text-white w-4/5 mx-auto mt-2">
          <thead class="text-xl">
            <tr class="color-title">
              <th class="text-center table-data-border">Bed Size</th>
              <th class="text-center table-data-border">Midwest</th>
              <th class="text-center table-data-border">Northeast</th>
              <th class="text-center table-data-border">South</th>
              <th class="text-center">West</th>
            </tr>
          </thead>
          <tbody class="">
            <tr class="h-1"></tr>
            <tr
              v-for="(data, i) in totalData"
              :key="i"
              class="table-row-data-border text-xl"
            >
              <td
                class="font-bold text-black text-center table-data-border"
                :class="i % 2 ? 'color-odd' : 'color-even'"
              >
                {{ data.bedsize }}
              </td>
              <td
                class="font-bold text-black text-center table-data-border"
                :class="i % 2 ? 'color-odd' : 'color-even'"
              >
                {{ data.midwest }}
              </td>
              <td
                class="font-bold text-black text-center table-data-border"
                :class="i % 2 ? 'color-odd' : 'color-even'"
              >
                {{ data.northeast }}
              </td>
              <td
                class="font-bold text-black text-center table-data-border"
                :class="i % 2 ? 'color-odd' : 'color-even'"
              >
                {{ data.south }}
              </td>
              <td
                class="font-bold text-black text-center table-data-border"
                :class="i % 2 ? 'color-odd' : 'color-even'"
              >
                {{ data.west }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mb-0 mt-auto">
        <slideFooter :show-third-party-trade-mark="true" :link-logo="true" />
      </div>
    </div>
  </section>
</template>

<script>
import { reactive } from 'vue'
import slideFooter from './slideFooter.vue'
export default {
  components: { slideFooter },

  setup() {
    const totalData = reactive([
      {
        bedsize: '0 - 0',
        midwest: 55,
        northeast: 41,
        south: 41,
        west: 35,
      },
      {
        bedsize: '1 - 50',
        midwest: 43,
        northeast: 11,
        south: 23,
        west: 35,
      },
      {
        bedsize: '51 - 100',
        midwest: 64,
        northeast: 24,
        south: 73,
        west: 49,
      },
      {
        bedsize: '101-200',
        midwest: 72,
        northeast: 53,
        south: 81,
        west: 79,
      },
      {
        bedsize: '201 - 400',
        midwest: 77,
        northeast: 67,
        south: 127,
        west: 95,
      },
      {
        bedsize: '401-600',
        midwest: 25,
        northeast: 24,
        south: 43,
        west: 31,
      },
      {
        bedsize: '601-1000',
        midwest: 14,
        northeast: 26,
        south: 43,
        west: 10,
      },
      {
        bedsize: '1001-2000',
        midwest: 3,
        northeast: 3,
        south: 11,
        west: 1,
      },
      {
        bedsize: '2001+',
        midwest: 0,
        northeast: 1,
        south: 2,
        west: 1,
      },
    ])

    return {
      totalData,
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
.color-even {
  background-color: #cfdaeb;
}
.color-odd {
  background-color: #e8edf5;
}
.color-title {
  background-color: #418ac9;
}
</style>
