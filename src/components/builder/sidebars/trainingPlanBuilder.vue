<template>
  <div class="px-2 pt-3 text-left">
    <div class="mt-4">
      <p class="text-sm">Header</p>
      <input
        v-model="trainingPlanDraft.header"
        class="border rounded font-bold py-2 px-2 text-sm w-full text-grey-darker"
        placeholder="Header"
      />
    </div>
    <div class="w-full mt-4">
      <div
        v-for="(timeline, i) in trainingPlanDraft.timelines"
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
          class="flex justify-between items-center leading-normal cursor-pointer px-3 py-2 bg-opacity-50"
          :class="{
            'bg-amber-200': i == 0,
            'bg-builderPurple-500': i == 1,
            'bg-pink-350': i == 2,
            'bg-emerald-450': i == 3,
            'bg-blue-400': i == 4,
          }"
          :for="`tab-multi-${i + 1}`"
        >
          <div class="flex items-center">
            <span
              class="rounded-full w-3 h-3 mr-1"
              :class="{
                'bg-amber-400': i == 0,
                'bg-builderPurple-700': i == 1,
                'bg-pink-500': i == 2,
                'bg-emerald-600': i == 3,
                'bg-blue-600': i == 4,
              }"
            />
            <p class="text-red-650 font-bold text-base tracking-wide">
              Timeline {{ i + 1 }}
            </p>
          </div>
          <SvgIcon class="arrow-icon w-4 h-4 mr-2" name="arrow-up" />
        </label>
        <div class="tab-content overflow-hidden bg-white leading-normal">
          <div class="p-5">
            <div class="">
              <p class="text-sm">Title</p>
              <input
                v-model="trainingPlanDraft.timelines[i].title"
                class="border rounded py-2 font-bold px-2 text-sm w-full text-grey-darker"
              />
            </div>
            <div class="flex justify-between items-center mt-3">
              <div class="w-6/12 mr-1">
                <p class="text-xs">Start date</p>
                <div class="flex items-center border relative rounded">
                  <input
                    v-model="trainingPlanDraft.timelines[i].startDate"
                    :name="`startDate-${i}`"
                    class="rounded font-bold focus:outline-none mb-0 py-2 px-2 text-sm w-full text-grey-darker"
                    type="date"
                    :max="trainingPlanDraft.timelines[i].endDate"
                  />
                  <label
                    :for="`startDate-${i}`"
                    class="absolute right-0 top-2 arrow-icon w-5 h-5 mr-2 pointer-events-none"
                  >
                    <SvgIcon class="arrow-icon w-5 h-5" name="picker" />
                  </label>
                </div>
              </div>
              <div class="w-6/12">
                <p class="text-xs">End date</p>
                <div class="flex items-center border relative rounded">
                  <input
                    v-model="trainingPlanDraft.timelines[i].endDate"
                    :name="`endDate-${i}`"
                    class="rounded font-bold focus:outline-none mb-0 py-2 px-2 text-sm w-full text-grey-darker"
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    :min="trainingPlanDraft.timelines[i].startDate"
                  />
                  <label
                    :for="`endDate-${i}`"
                    class="absolute right-0 top-2 arrow-icon w-5 h-5 mr-2 pointer-events-none"
                  >
                    <SvgIcon class="arrow-icon w-5 h-5" name="picker" />
                  </label>
                </div>
              </div>
            </div>
            <div class="mt-3">
              <p class="text-xs">Label</p>
              <input
                v-model="trainingPlanDraft.timelines[i].label"
                class="border rounded font-bold py-2 px-2 text-sm w-full text-grey-darker"
                placeholder="Enter amount"
              />
            </div>
            <div
              v-for="(milestone, j) in trainingPlanDraft.timelines[i]
                .milestones"
              :key="j"
              class="flex justify-between items-center mt-3"
            >
              <div class="w-6/12 h-full">
                <p class="text-xs">Milestone {{ j + 1 }}</p>
                <div class="flex items-center border relative">
                  <input
                    v-model="trainingPlanDraft.timelines[i].milestones[j].title"
                    class="rounded font-bold focus:outline-none mb-0 py-2 px-2 text-sm w-full text-grey-darker"
                  />
                </div>
              </div>
              <div class="w-6/12">
                <div
                  class="flex items-center border relative py-0 mt-4 max-h-full rounded"
                >
                  <input
                    v-model="trainingPlanDraft.timelines[i].milestones[j].date"
                    :name="`timelines[${i}].milestones[${j}]`"
                    class="rounded font-bold focus:outline-none mb-0 py-2 px-2 text-sm w-full text-grey-darker"
                    type="date"
                    :min="trainingPlanDraft.timelines[i].startDate"
                    :max="trainingPlanDraft.timelines[i].endDate"
                  />
                  <label
                    :for="`timelines[${i}].milestones[${j}]`"
                    class="absolute right-0 top-2 arrow-icon w-5 h-5 mr-2 pointer-events-none"
                  >
                    <SvgIcon class="arrow-icon w-5 h-5" name="picker" />
                  </label>
                </div>
              </div>
            </div>
            <button
              class="mt-3 text-xs text-pink-600 font-bold"
              @click="addMilestone(i)"
            >
              + Add milestone
            </button>
          </div>
        </div>
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
    const trainingPlanDraft = ref(cloneDeep(props.slideDynamicData))

    watch(
      trainingPlanDraft,
      () => emit('updateSlideDynamicData', trainingPlanDraft.value),
      {
        deep: true,
      },
    )

    return {
      trainingPlanDraft,
    }
  },

  methods: {
    addMilestone(index) {
      this.trainingPlanDraft.timelines[index].milestones.push({
        title: '',
        date: '',
      })
    },
    toggleModal() {
      this.spreadSheetModal = !this.spreadSheetModal
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
::-webkit-calendar-picker-indicator {
  color: rgba(0, 0, 0, 0);
  -webkit-appearance: none;
  opacity: 0;
  position: absolute;
  right: 0px;
  z-index: 9;
}
</style>
