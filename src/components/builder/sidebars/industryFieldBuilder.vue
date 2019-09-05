<template>
  <div class="">
    <div class="w-full mt-4">
      <div
        v-for="(infor, i) in industryField.address"
        :key="i"
        class="tab w-full overflow-hidden border-t"
      >
        <input
          :id="`tab-multi-${i + 1}`"
          class="absolute opacity-0"
          type="checkbox"
          checked
          name="rows"
        />
        <label
          class="flex justify-between items-center leading-normal cursor-pointer px-3 py-2 bg-opacity-50 bg-gray-200"
          :for="`tab-multi-${i + 1}`"
        >
          <div class="flex items-center">
            <p class="text-gray-650 font-bold text-base tracking-wide">
              {{ industryField.address[i].type }}
            </p>
          </div>
          <SvgIcon class="arrow-icon w-4 h-4 mr-2" name="arrow-up" />
        </label>
        <div class="tab-content overflow-hidden bg-white leading-normal">
          <div class="p-5">
            <div class="">
              <p class="text-sm">Name</p>
              <input
                v-model="infor.name"
                class="border rounded py-2 font-bold px-2 text-sm w-full text-grey-darker"
              />
            </div>
            <div class="mt-3">
              <p class="text-xs">Contact</p>
              <input
                v-model="infor.contact"
                class="border rounded font-bold py-2 px-2 text-sm w-full text-grey-darker"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="py-2 border-b builder__sidebar__header" />
    <div>
      <div class="px-2 text-red-650 text-sm py-4">Local Sales Consultants</div>
      <div
        v-for="(consultant, j) in industryField.consultants"
        :key="j"
        class="flex px-5"
      >
        <div class="w-1/2 mr-1">
          <p class="text-sm">Name</p>
          <input
            v-model="consultant.name"
            class="border rounded py-2 font-bold px-2 text-sm w-full text-grey-darker"
          />
        </div>
        <div class="w-1/2 ml-1">
          <p class="text-sm">Contact</p>
          <input
            v-model="consultant.contract"
            class="border rounded py-2 font-bold px-2 text-sm w-full text-grey-darker"
          />
        </div>
      </div>
      <div class="flex justify-center mt-5 bg-gray-200 py-1">
        <button
          class="bg-white text-sm border-dashed font-bold text-gray-500 focus:outline-none py-2 px-3 border-gray-300 border rounded-md"
          @click="addRow"
        >
          + Add new row
        </button>
      </div>
    </div>
    <div class="py-2 border-b builder__sidebar__header" />
    <div class="">
      <div class="px-2 text-red-650 text-sm py-4">
        Total Years Of Experience
      </div>
      <div class="px-5">
        <input
          v-model="industryField.experience"
          class="border rounded py-2 font-bold px-2 text-sm w-full text-grey-darker"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { cloneDeep } from 'lodash'

export default {
  props: {
    slideDynamicData: {
      type: Object,
      required: true,
    },
  },
  emits: { updateSlideDynamicData: Object },

  setup(props, { emit }) {
    const industryField = ref(cloneDeep(props.slideDynamicData))

    watch(
      industryField,
      () => emit('updateSlideDynamicData', industryField.value),
      {
        deep: true,
      },
    )

    return {
      industryField,
    }
  },
  methods: {
    addRow() {
      this.industryField.consultants.push({ name: '', contact: '' })
    },
  },
}
</script>

<style scoped>
/* Tab content - closed */
.tab-content {
  max-height: 0;
  -webkit-transition: max-height 0.35s;
  -o-transition: max-height 0.35s;
  transition: max-height 0.35s;
}
/* :checked - resize to full height */
.tab input:checked ~ .tab-content {
  max-height: 100vh;
}

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

.tab input[type='radio']:checked + label .arrow-icon {
  transform: rotate(180deg);
}
</style>
