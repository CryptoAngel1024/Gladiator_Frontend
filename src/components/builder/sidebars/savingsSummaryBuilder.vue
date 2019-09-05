<template>
  <div class="px-2 pt-3 text-left">
    <div class="flex justify-between items-center">
      <h3 class="text-red-700 font-bold text-sm">Procedure Savings</h3>
    </div>
    <div class="mt-4">
      <p class="text-sm">Price Savings From Standardization</p>
      <div class="flex items-center border">
        <SvgIcon class="w-4 h-4 ml-2" name="amount" />
        <input
          v-model.number="savingSummaryDraft.procedureSavings.standardization"
          type="number"
          class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker"
          placeholder="Enter amount"
        />
      </div>
    </div>
    <div class="mt-4">
      <p class="text-sm">Price Savings From New Price Offer</p>
      <div class="flex items-center border">
        <SvgIcon class="w-4 h-4 ml-2" name="amount" />
        <input
          v-model.number="savingSummaryDraft.procedureSavings.offer"
          type="number"
          class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker"
          placeholder="Enter amount"
        />
      </div>
    </div>
    <div class="mt-4 mb-6">
      <p class="text-sm">Saving from portfolio value options</p>
      <div class="flex items-center border">
        <SvgIcon class="w-4 h-4 ml-2" name="amount" />
        <input
          v-model.number="savingSummaryDraft.procedureSavings.options"
          type="number"
          class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker"
          placeholder="Enter amount"
        />
      </div>
    </div>
    <hr />
    <div class="flex justify-between items-center mt-6">
      <h3 class="text-red-700 font-bold text-sm">Additional Savings</h3>
    </div>
    <div class="mt-4">
      <p class="text-sm">Rigid Containers</p>
      <div class="flex items-center border">
        <SvgIcon class="w-4 h-4 ml-2" name="amount" />
        <input
          v-model.number="savingSummaryDraft.additinalSavings.rigid"
          type="number"
          class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker"
          placeholder="Enter amount"
        />
      </div>
    </div>
    <div class="mt-4">
      <p class="text-sm">USF Conversion</p>
      <div class="flex items-center border">
        <SvgIcon class="w-4 h-4 ml-2" name="amount" />
        <input
          v-model.number="savingSummaryDraft.additinalSavings.usf"
          type="number"
          class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker"
          placeholder="Enter amount"
        />
      </div>
    </div>
    <div class="mt-4">
      <p class="text-sm">eSIMs</p>
      <div class="flex items-center border">
        <SvgIcon class="w-4 h-4 ml-2" name="amount" />
        <input
          v-model.number="savingSummaryDraft.additinalSavings.esims"
          type="number"
          class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker"
          placeholder="Enter amount"
        />
      </div>
    </div>
    <div class="mt-4">
      <p class="text-sm">Biologics</p>
      <div class="flex items-center border">
        <SvgIcon class="w-4 h-4 ml-2" name="amount" />
        <input
          v-model.number="savingSummaryDraft.additinalSavings.Biologics"
          type="number"
          class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker"
          placeholder="Enter amount"
        />
      </div>
    </div>
    <div class="mt-4">
      <p class="text-sm">Power Equipment</p>
      <div class="flex items-center border">
        <SvgIcon class="w-4 h-4 ml-2" name="amount" />
        <input
          v-model.number="savingSummaryDraft.additinalSavings.power"
          type="number"
          class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker"
          placeholder="Enter amount"
        />
      </div>
    </div>
    <div class="mt-4">
      <p class="text-sm">Rebate or NBI</p>
      <div class="flex items-center border">
        <SvgIcon class="w-4 h-4 ml-2" name="amount" />
        <input
          v-model.number="savingSummaryDraft.additinalSavings['Rebate or NBI']"
          type="number"
          class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker"
          placeholder="Enter amount"
        />
      </div>
    </div>
    <div class="mt-4">
      <p class="text-sm">Other</p>
      <div class="flex items-center border">
        <SvgIcon class="w-4 h-4 ml-2" name="amount" />
        <input
          v-model.number="savingSummaryDraft.additinalSavings.Other"
          type="number"
          class="rounded mb-0 py-2 px-2 focus:outline-none text-sm w-full text-grey-darker"
          placeholder="Enter amount"
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
    const savingSummaryDraft = ref(cloneDeep(props.slideDynamicData))

    watch(
      savingSummaryDraft,
      () => emit('updateSlideDynamicData', savingSummaryDraft.value),
      {
        deep: true,
      },
    )

    return {
      savingSummaryDraft,
    }
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
</style>
