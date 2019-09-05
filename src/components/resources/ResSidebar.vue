<template>
  <button
    data-test="topBar-resource-button"
    class="items-center text-indigo-700 py-2 px-4 mr-3 border-indigo-700 border-2 rounded-lg h-12 min-w-28 text-center"
    @click=";(showResourcesSideBar = true), showResourcesSideBarGaLog()"
  >
    Resource
  </button>
  <div
    v-if="showResourcesSideBar"
    class="p-4 absolute overflow-y-auto bg-white h-full right-0 top-0 z-10 shadow-2xl max-w-sm"
    data-test="topBar-resources-button"
  >
    <button
      class="flex items-center cursor-pointer"
      @click="showResourcesSideBar = false"
    >
      <SvgIcon class="h-8 w-8" name="myclose" />
      <div class="text-red-700 font-bold ml-2">Resources</div>
    </button>

    <EmptyDataState v-if="resources.length === 0" data-type="Resources" />
    <res-side-row
      v-for="(resource, index) in resources"
      :key="index"
      :resource="resource"
    />
  </div>
</template>

<script>
import ResSideRow from '@/components/resources/ResSideRow.vue'
import EmptyDataState from '@/components/utils/EmptyDataState.vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: { ResSideRow, EmptyDataState },

  setup() {
    const route = useRoute()
    const store = useStore()
    const showResourcesSideBar = ref(false)

    const resources = computed(() =>
      store.getters['resources/resourcesPerUrls']([
        route.params.slideId,
        route.params.step,
        route.name,
      ]),
    )

    const showResourcesSideBarGaLog = () => {
      gaEvent({
        action: 'show-resources-sideBar-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-show-resources-sideBar-btn',
      })
    }
    return { showResourcesSideBar, resources, showResourcesSideBarGaLog }
  },
}
</script>
