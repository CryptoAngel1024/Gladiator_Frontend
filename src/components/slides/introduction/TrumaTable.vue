<template>
  <!-- content div header-->
  <div class="flex flex-col h-full pt-4">
    <div
      class="flex flex-row intro-header items-center justify-between gap-2 mb-8 px-4 max-h-36"
    >
      <h3
        class="max-h-12 leading-loose px-4 ml-8 font-extrabold text-4xl flex flex-4 items-center justify-start"
      >
        Why Providing Trauma Care is Different
      </h3>
      <slideHeader :sav-number="card.pageNumber" name="INTR" />
    </div>
    <!-- content body -->
    <table
      class="table-fixed border-collapse border-4 border-white mx-20 h-2/3 mt-4 font-bold"
    >
      <thead>
        <tr class="h-14 text-base font-bold">
          <th class="gray-bg">
            {{ card.tableTitle }}
          </th>
          <th />
          <th />
          <th />
        </tr>
        <tr class="second-header">
          <th />
          <th class="img-th">
            <div class="flex flex-row justify-center max-h-full">
              <div class="w-10 text-center flex-2">
                <img
                  src="@/assets/images/slides/introduction/trauma/joints.png"
                  class="h-12 ml-6"
                  alt=""
                />
              </div>
              <p class="flex-1 text-center leading-10">Joints</p>
              <div class="w-10 text-center flex-2">
                <img
                  src="@/assets/images/slides/introduction/trauma/joints2.png"
                  class="h-12 mr-6"
                  alt=""
                />
              </div>
            </div>
          </th>

          <th>
            <div class="flex flex-row justify-center">
              <p class="flex-1 leading-10">Spine</p>
              <div class="w-10 text-center flex-2">
                <img
                  src="@/assets/images/slides/introduction/trauma/spine.png"
                  class="h-12 mr-6"
                  alt=""
                />
              </div>
            </div>
          </th>

          <th>
            <div class="flex flex-row justify-start">
              <div class="flex-1 w-12 text-center">
                <img
                  src="@/assets/images/slides/introduction/trauma/truck.png"
                  class="h-12 ml-6"
                  alt=""
                />
              </div>
              <p class="flex-1 text-left leading-10">Trauma</p>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="gray-bg">
            {{ card.row1.title }}
          </td>
          <td class="dark-row">
            {{ card.row1.joints }}
          </td>
          <td class="dark-row">
            {{ card.row1.spine }}
          </td>
          <td class="dark-row">
            {{ card.row1.trauma }}
          </td>
        </tr>
        <tr>
          <td class="gray-bg">
            {{ card.row2.title }}
          </td>
          <td class="light-row">
            {{ card.row2.joints }}
          </td>
          <td class="light-row">
            {{ card.row2.spine }}
          </td>
          <td class="light-row">
            {{ card.row2.trauma }}
          </td>
        </tr>
        <tr>
          <td class="gray-bg">
            {{ card.row3.title }}
          </td>
          <td class="dark-row">
            {{ card.row3.joints }}
          </td>
          <td class="dark-row">
            {{ card.row3.spine }}
          </td>
          <td class="dark-row">
            {{ card.row3.trauma }}
          </td>
        </tr>
        <tr>
          <td class="gray-bg">
            {{ card.row4.title }}
          </td>
          <td class="light-row">
            {{ card.row4.joints }}
          </td>
          <td class="light-row">
            {{ card.row4.spine }}
          </td>
          <td class="light-row">
            {{ card.row4.trauma }}
          </td>
        </tr>
        <tr>
          <td class="gray-bg">
            {{ card.row5.title }}
          </td>
          <td class="dark-row">
            {{ card.row5.joints }}
          </td>
          <td class="dark-row">
            {{ card.row5.spine }}
          </td>
          <td class="dark-row">
            {{ card.row5.trauma }}
          </td>
        </tr>
        <tr>
          <td class="gray-bg">
            {{ card.row6.title }}
          </td>
          <td class="light-row">
            {{ card.row6.joints }}
          </td>
          <td class="light-row">
            {{ card.row6.spine }}
          </td>
          <td class="light-row">
            {{ card.row6.trauma }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-6 mx-20">
      <p
        class="text-xxs text-left h-full flex-grow text-slidColor-header my-auto"
      >
        (1) Data in this table intended as a representative model to highlight
        differences between average procedures in Joints, Spine and Trauma. Data
        sourced from internal DePuy Synthes customer management database
        (Optimizer)
      </p>
    </div>

    <slideFooter />
  </div>
</template>

<script>
import slideFooter from '@/components/slides/slideFooter.vue'
import slideHeader from '@/components/slides/slideHeader.vue'

export default {
  components: { slideFooter, slideHeader },
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped lang="postcss">
th,
td {
  @apply border border-white h-9 w-1/4;
}

.second-header {
  background-color: #1e22aa;
  color: white;
}

.gray-bg {
  background-color: #63666a;
  color: white;
}

.dark-row {
  background-color: #cfd5ea;
}
.light-row {
  background-color: #e9ebf5;
}

.img-th {
  height: 64px;
}
</style>
