<template>
  <section
    class="h-full"
    :class="isPdfView ? 'expandable-slide' : 'overflow-y-auto'"
  >
    <div class="flex flex-col border px-2 pb-0 pt-1">
      <p class="text-slidColor-1 text-4xl font-bold text-left">
        {{ trainingPlanDraft.header }}
      </p>

      <div class="ml-16 flex text-xs text-gray-425 justify-between pb-1">
        <div v-for="(cal, index) in calender" :key="index" class="text-center">
          <p v-if="diffDays > 30" class="font-bold mb-1">
            {{ cal.month }}
          </p>
          <p class="font-bold">
            {{ cal.date }}
          </p>
          <p class="capitalize m-1">
            {{ cal.week }}
          </p>
        </div>
      </div>
    </div>
    <div ref="content" class="flex flex-col text-xs divide-y border mb-1">
      <div class="flex">
        <div class="flex items-center border-l-2 border-r-2">
          <div class="w-0 h-16 border-2 border-amber-200" />

          <div
            class="flex items-center justify-center text-gray-1 h-24 w-14 transform rotate-90"
          >
            <p class="text-clip">
              {{ trainingPlanDraft.timelines[0].title }}
            </p>
          </div>
        </div>
        <div class="flex">
          <div
            class="relative group"
            :style="{
              left:
                calcWidth(minDate, trainingPlanDraft.timelines[0].startDate) +
                'px',
            }"
          >
            <div
              class="hidden group-hover:block absolute top-2.5 -left-7 text-amber-700 font-bold bg-amber-200 border-2 border-amber-700 px-2 py-1 w-max rounded-2xl"
            >
              Start : {{ formatDate(trainingPlanDraft.timelines[0].startDate) }}
            </div>
            <div
              class="hidden group-hover:block absolute top-2.5 -right-7 text-amber-700 font-bold bg-amber-200 border-2 border-amber-700 px-2 py-1 w-max rounded-2xl"
            >
              End : {{ formatDate(trainingPlanDraft.timelines[0].endDate) }}
            </div>
            <SvgArrow
              :width="
                calcWidth(
                  trainingPlanDraft.timelines[0].startDate,
                  trainingPlanDraft.timelines[0].endDate,
                )
              "
              :name="trainingPlanDraft.timelines[0].label"
              color="#FFC542"
            />

            <div
              v-for="(milestone, index) in trainingPlanDraft.timelines[0]
                .milestones"
              :key="index"
              class="absolute has-tooltip z-10"
              :style="{
                left:
                  calcLeft(
                    trainingPlanDraft.timelines[0].startDate,
                    milestone.date,
                  ) + 'px',
              }"
            >
              <span
                class="tooltip rounded shadow-lg p-1 bg-black text-white mt-6 text-xs whitespace-nowrap"
                >{{ milestone.title }}</span
              >
              <div
                class="absolute rounded-sm w-4 h-4 bg-amber-500 transform rotate-45"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="flex items-center border-l-2 border-r-2">
          <div class="w-0 h-16 border-2 border-builderPurple-400" />

          <div
            class="flex items-center text-gray-1 h-24 w-14 transform rotate-90 justify-center"
          >
            <p class="text-clip">
              {{ trainingPlanDraft.timelines[1].title }}
            </p>
          </div>
        </div>
        <div class="flex">
          <div
            class="relative group"
            :style="{
              left:
                calcWidth(minDate, trainingPlanDraft.timelines[1].startDate) +
                'px',
            }"
          >
            <div
              class="hidden group-hover:block absolute top-2.5 -left-7 text-builderPurple-700 font-bold bg-builderPurple-200 border-2 border-builderPurple-700 px-2 py-1 w-max rounded-2xl"
            >
              Start : {{ formatDate(trainingPlanDraft.timelines[1].startDate) }}
            </div>
            <div
              class="hidden group-hover:block absolute top-2.5 -right-7 text-builderPurple-700 font-bold bg-builderPurple-200 border-2 border-builderPurple-700 px-2 py-1 w-max rounded-2xl"
            >
              End : {{ formatDate(trainingPlanDraft.timelines[1].endDate) }}
            </div>
            <SvgArrow
              :width="
                calcWidth(
                  trainingPlanDraft.timelines[1].startDate,
                  trainingPlanDraft.timelines[1].endDate,
                )
              "
              :name="trainingPlanDraft.timelines[1].label"
              color="#A461D8"
            />

            <div
              v-for="(milestone, index) in trainingPlanDraft.timelines[1]
                .milestones"
              :key="index"
              class="absolute has-tooltip z-10"
              :style="{
                left:
                  calcLeft(
                    trainingPlanDraft.timelines[1].startDate,
                    milestone.date,
                  ) + 'px',
              }"
            >
              <span
                class="tooltip rounded shadow-lg p-1 bg-black text-white mt-6 text-xs whitespace-nowrap"
                >{{ milestone.title }}</span
              >
              <div
                class="absolute rounded-sm w-4 h-4 bg-builderPurple-800 transform rotate-45"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="flex items-center border-l-2 border-r-2">
          <div class="w-0 h-16 border-2 border-pink-400" />

          <div
            class="flex items-center text-gray-1 h-24 w-14 transform rotate-90 justify-center text-center"
          >
            <p style="margin-top: 5px">
              {{ trainingPlanDraft.timelines[2].title }}
            </p>
          </div>
        </div>
        <div class="flex">
          <div
            class="relative group"
            :style="{
              left:
                calcWidth(minDate, trainingPlanDraft.timelines[2].startDate) +
                'px',
            }"
          >
            <div
              class="hidden group-hover:block absolute top-2.5 -left-7 text-pink-700 font-bold bg-pink-200 border-2 border-pink-700 px-2 py-1 w-max rounded-2xl"
            >
              Start : {{ formatDate(trainingPlanDraft.timelines[2].startDate) }}
            </div>
            <div
              class="hidden group-hover:block absolute top-2.5 -right-7 text-pink-700 font-bold bg-pink-200 border-2 border-pink-700 px-2 py-1 w-max rounded-2xl"
            >
              End : {{ formatDate(trainingPlanDraft.timelines[2].endDate) }}
            </div>
            <SvgArrow
              :width="
                calcWidth(
                  trainingPlanDraft.timelines[2].startDate,
                  trainingPlanDraft.timelines[2].endDate,
                )
              "
              :name="trainingPlanDraft.timelines[2].label"
              color="#FF9AD5"
            />

            <div
              v-for="(milestone, index) in trainingPlanDraft.timelines[2]
                .milestones"
              :key="index"
              class="absolute has-tooltip z-10"
              :style="{
                left:
                  calcLeft(
                    trainingPlanDraft.timelines[2].startDate,
                    milestone.date,
                  ) + 'px',
              }"
            >
              <span
                class="tooltip rounded shadow-lg p-1 bg-black text-white mt-6 text-xs whitespace-nowrap"
                >{{ milestone.title }}</span
              >
              <div
                class="absolute rounded-sm w-4 h-4 bg-pink-500 transform rotate-45"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="flex items-center border-l-2 border-r-2">
          <div class="w-0 h-16 border-2 border-emerald-400" />

          <div
            class="flex items-center text-gray-1 h-24 w-14 transform rotate-90 justify-center"
          >
            <p>{{ trainingPlanDraft.timelines[3].title }}</p>
          </div>
        </div>
        <div class="flex">
          <div
            class="relative group"
            :style="{
              left:
                calcWidth(minDate, trainingPlanDraft.timelines[3].startDate) +
                'px',
            }"
          >
            <div
              class="hidden group-hover:block absolute top-2.5 -left-7 text-emerald-700 font-bold bg-emerald-200 border-2 border-emerald-700 px-2 py-1 w-max rounded-2xl"
            >
              Start : {{ formatDate(trainingPlanDraft.timelines[3].startDate) }}
            </div>
            <div
              class="hidden group-hover:block absolute top-2.5 -right-7 text-emerald-700 font-bold bg-emerald-200 border-2 border-emerald-700 px-2 py-1 w-max rounded-2xl"
            >
              End : {{ formatDate(trainingPlanDraft.timelines[3].endDate) }}
            </div>
            <SvgArrow
              :width="
                calcWidth(
                  trainingPlanDraft.timelines[3].startDate,
                  trainingPlanDraft.timelines[3].endDate,
                )
              "
              :name="trainingPlanDraft.timelines[3].label"
              color="#82C43C"
            />

            <div
              v-for="(milestone, index) in trainingPlanDraft.timelines[3]
                .milestones"
              :key="index"
              class="absolute has-tooltip z-10"
              :style="{
                left:
                  calcLeft(
                    trainingPlanDraft.timelines[3].startDate,
                    milestone.date,
                  ) + 'px',
              }"
            >
              <span
                class="tooltip rounded shadow-lg p-1 bg-black text-white mt-6 text-xs whitespace-nowrap"
                >{{ milestone.title }}</span
              >
              <div
                class="rounded-sm w-4 h-4 bg-emerald-700 transform rotate-45"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="flex items-center border-l-2 border-r-2">
          <div class="w-0 h-16 border-2 border-blue-400" />

          <div
            class="flex items-center text-gray-1 h-24 w-14 transform rotate-90 justify-center"
          >
            <p>{{ trainingPlanDraft.timelines[4].title }}</p>
          </div>
        </div>
        <div class="flex">
          <div
            class="relative group"
            :style="{
              left:
                calcWidth(minDate, trainingPlanDraft.timelines[4].startDate) +
                'px',
            }"
          >
            <div
              class="hidden group-hover:block absolute top-2.5 -left-7 text-blue-700 font-bold bg-blue-200 border-2 border-blue-700 px-2 py-1 w-max rounded-2xl"
            >
              Start : {{ formatDate(trainingPlanDraft.timelines[4].startDate) }}
            </div>
            <div
              class="hidden group-hover:block absolute top-2.5 -right-7 text-blue-700 font-bold bg-blue-200 border-2 border-blue-700 px-2 py-1 w-max rounded-2xl"
            >
              End : {{ formatDate(trainingPlanDraft.timelines[4].endDate) }}
            </div>
            <SvgArrow
              :width="
                calcWidth(
                  trainingPlanDraft.timelines[4].startDate,
                  trainingPlanDraft.timelines[4].endDate,
                )
              "
              :name="trainingPlanDraft.timelines[4].label"
              color="#50B5FF"
            />

            <div
              v-for="(milestone, index) in trainingPlanDraft.timelines[4]
                .milestones"
              :key="index"
              class="absolute has-tooltip z-10"
              :style="{
                left:
                  calcLeft(
                    trainingPlanDraft.timelines[4].startDate,
                    milestone.date,
                  ) + 'px',
              }"
            >
              <span
                class="tooltip rounded shadow-lg p-1 bg-black text-white mt-6 text-xs whitespace-nowrap"
                >{{ milestone.title }}</span
              >
              <div class="rounded-sm w-4 h-4 bg-blue-700 transform rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-auto mb-0 h-auto flex-grow">
      <slide-footer class="mt-auto mb-0 align-bottom" />
    </div>
  </section>
</template>

<script>
import slideFooter from './slideFooter.vue'
import SvgArrow from '@/components/utils/SvgArrow.vue'
import dynamicSlide from './dynamicSlide.js'

export default {
  components: { slideFooter, SvgArrow },
  props: {
    isPdfView: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const { slideContent: trainingPlanDraft } = dynamicSlide('EDU3')

    return {
      trainingPlanDraft,
    }
  },
  data() {
    return {
      calender: [],
      contentWidth: 0,
      minDate: null,
      diffDays: 0,
      invertalCount: 0,
      invertal: 1,
    }
  },

  watch: {
    trainingPlanDraft: {
      handler() {
        this.getContentWidth()
        this.getDateRange()
      },
      deep: true,
      immediate: false,
    },
    $route() {
      this.getContentWidth()
    },
  },
  mounted() {
    this.getContentWidth()
    this.getDateRange()
  },
  methods: {
    getDateRange() {
      const startDates = this.trainingPlanDraft.timelines
        .map((timeline) => timeline.startDate)
        .sort()
      const endDates = this.trainingPlanDraft.timelines
        .map((timeline) => timeline.endDate)
        .sort()
        .reverse()
      const minDate = startDates[0]
      const maxDate = endDates[0]
      this.minDate = minDate
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sa']
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      this.diffDays = this.getDiffDays(minDate, maxDate)
      if (this.diffDays < 20) {
        this.invertalCount = this.diffDays
      } else if (this.diffDays < 30) {
        this.invertal = 2
        this.invertalCount = parseInt(this.diffDays / this.invertal) + 1
      } else {
        this.invertal = parseInt(this.diffDays / 15)
        this.invertalCount = parseInt(this.diffDays / this.invertal) + 1
      }
      let calender = []
      for (let i = 0; i <= this.invertalCount; i++) {
        const d = new Date(minDate)
        d.setDate(d.getDate() + i * this.invertal)
        calender.push({
          month: monthNames[d.getMonth()],
          week: days[d.getDay()],
          date: d.getDate(),
        })
      }
      this.calender = calender
    },
    getContentWidth() {
      let nIntervId
      nIntervId = setInterval(() => {
        if (this.$refs.content)
          this.contentWidth = this.$refs.content.clientWidth - 80
        if (this.contentWidth > 0 && nIntervId) clearInterval(nIntervId)
      }, 500)
    },
    calcWidth(startDate, endDate) {
      return (
        ((this.getDiffDays(startDate, endDate) / this.invertal + 0.5) *
          this.contentWidth) /
        (this.invertalCount + 1)
      )
    },
    calcLeft(startDate, endDate) {
      return (
        ((this.getDiffDays(startDate, endDate) / this.invertal) *
          this.contentWidth) /
        (this.invertalCount + 1)
      )
    },
    getDiffDays(startDate, endDate) {
      const date1 = new Date(startDate)
      const date2 = new Date(endDate)
      const diffTime = Math.abs(date2 - date1)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    },
    formatDate(date) {
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      const splitDate = date.split('-')
      return splitDate[2] + ' ' + monthNames[parseInt(splitDate[1] - 1)]
    },
  },
}
</script>

<style lang="postcss" scoped>
.tooltip {
  @apply invisible absolute;
}
.has-tooltip {
  top: 80px;
}
.has-tooltip:hover .tooltip {
  @apply visible z-50;
}
.has-tooltip:hover .transform.rotate-45 {
  background-color: black;
}
.transform.rotate-90 p {
  margin: 20px 0;
}
.expandable-slide {
  height: auto;
}
</style>
