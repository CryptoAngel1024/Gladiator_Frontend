<template>
  <div class="flex">
    <button
      data-test="topBar-notification-button"
      class="my-auto"
      @click="
        ;(showNotifDropdown = !showNotifDropdown), notificationIconGaLog()
      "
      @blur="delay(() => (showNotifDropdown = false))"
    >
      <svg-icon name="notification" class="w-6 h-6" />
      <div
        v-if="notificationLength"
        class="absolute w-3 h-3 notification-bg-color top-1 left-4"
        style="border-radius: 50%"
      />
    </button>
    <div
      v-if="showNotifDropdown"
      class="absolute top-11 z-50 shadow w-80"
      style="left: -125px"
    >
      <div
        class="flex flex-col pt-2 notification-top borde-2 rounded-xl space-y-0"
      >
        <div class="flex cursor-pointer py-2 px-4 border-b">
          <svg-icon name="notification" class="w-5 h-6 mr-3" />
          <div
            v-if="notificationLength"
            class="absolute w-3 h-3 notification-bg-color top-3 left-7"
            style="border-radius: 50%"
          />
          <p
            class="text-sm color-notification font-bold"
            data-test="topBar-notification-text"
          >
            Notifications
          </p>
          <button
            data-test="notification-clera-all"
            class="text-xs ml-auto mr-2 color-notification"
            @click="clearAll()"
          >
            {{ 'Clear all' }}
          </button>
        </div>
        <div class="pb-4 bg-white container max-h-96 overflow-auto">
          <notificationsSection
            v-for="notificationDate in notificationDates"
            :key="notificationDate"
            :date-text="notificationDate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, onMounted, watch, computed } from 'vue'
import notificationsSection from '@/components/layouts/header/notifications/notificationsSection.vue'
import { gaEvent } from '@/utils/GA_Event.js'
import { uniq } from 'lodash'
import { formatDateWithDateString } from '@/utils/formatDate'

export default {
  components: { notificationsSection },

  setup() {
    const store = useStore()
    const showNotifDropdown = ref(false)

    const notificationDates = computed(() =>
      uniq(
        store.getters['notification/notifications'].map(({ time }) =>
          formatDateWithDateString(time),
        ),
      ),
    )

    const notificationLength = computed(
      () => store.getters['notification/notificationLength'],
    )

    const fetchNotifications = () =>
      store.dispatch('notification/fetchNotifications')

    onMounted(fetchNotifications)

    watch(showNotifDropdown, fetchNotifications)

    const clearAll = () => store.dispatch('notification/clearAll')

    const notificationIconGaLog = () => {
      gaEvent({
        action: 'notification-icon-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-inner-notofication-icon',
      })
    }
    const delay = (func) => setTimeout(func, 1000)

    return {
      showNotifDropdown,
      notificationDates,
      notificationLength,
      clearAll,
      notificationIconGaLog,
      delay,
    }
  },
}
</script>

<style scoped>
.notification-bg-color {
  background-color: #fc5a5a;
}
.notification-top {
  background-color: #fafafb;
}
.color-notification {
  color: #44444f;
}
</style>
