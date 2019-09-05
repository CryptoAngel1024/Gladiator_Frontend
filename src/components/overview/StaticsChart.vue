<template>
  <section class="w-full bg-white mb-4 rounded-b-xl">
    <div v-if="report1" class="flex px-11 text-3xl font-bold text-blue-750">
      <div class="pr-27">0</div>
      <div class="pr-36">0</div>
      <div>0m 00s</div>
    </div>
    <div v-if="report1" class="relative pb-12">
      <div class="px-8">
        <div v-for="(yValue, index) in yScale" :key="index" class="flex py-2">
          <div class="mr-2 text-gray-100 w-8 text-right">{{ yValue }}</div>
          <div class="w-full border-b border-gray-100 mb-3"></div>
        </div>
      </div>
      <div class="absolute bottom-4 pr-10 pl-20 w-full">
        <div class="grid grid-cols-12">
          <div
            v-for="(xValue, index) in xScale"
            :key="index"
            class="flex flex-col justify-end items-center"
          >
            <div class="w-8 bg-blue-750" :class="`h-${xValue.height}`"></div>
            <div class="text-gray-100 mt-7">{{ xValue.month }}</div>
          </div>
        </div>
      </div>
    </div>
    <LoadingState v-else-if="isLoading" />
    <ErrorBanner v-else-if="error" :message="error" />
  </section>
</template>

<script>
import { reactive, computed } from 'vue'
import LoadingState from '@/components/utils/LoadingState.vue'
import ErrorBanner from '@/components/utils/ErrorBanner.vue'
import { useStore } from 'vuex'

export default {
  components: { LoadingState, ErrorBanner },
  setup() {
    const store = useStore()
    const yScale = reactive(['25px', '20px', '15px', '10px', '2px', '0'])
    const xScale = reactive([
      { month: 'Jan', height: '2' },
      { month: 'Feb', height: '4' },
      { month: 'Mar', height: '6' },
      { month: 'Apr', height: '8' },
      { month: 'May', height: '12' },
      { month: 'Jun', height: '16' },
      { month: 'Jul', height: '8' },
      { month: 'Aug', height: '8' },
      { month: 'Sep', height: '24' },
      { month: 'Oct', height: '28' },
      { month: 'Nov', height: '4' },
      { month: 'Dec', height: '12' },
    ])

    const report1 = computed(() => store.getters['ga/report1'])
    const isLoading = computed(() => store.getters['ga/getIsLoading'])
    const error = computed(() => store.getters['ga/getError'])

    return { yScale, xScale, isLoading, error, report1 }
  },
}
</script>
