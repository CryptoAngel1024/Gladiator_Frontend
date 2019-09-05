<template>
  <p class="bg-white px-5 py-2 hover:bg-gray-75 text-xs font-bold color-detail">
    {{ dateText }}
  </p>
  <button
    v-for="notification in notifications"
    :key="notification.id"
    class="bg-white px-5 py-2 hover:bg-gray-75"
    @click="markAsViewed(notification)"
  >
    <router-link
      :to="notification.url"
      :data-test="`notification-list-button-${notification.title}`"
      class="flex m-0 notification-url space-x-2"
    >
      <Avatar class="w-8 h-8 rounded-full" :email="notification.email" />
      <div class="flex flex-col">
        <h1
          data-test="notification-list-title"
          class="text-sm color-notification"
        >
          {{ notification.title }}
        </h1>
        <h1 data-test="notification-list-detail" class="text-xs color-detail">
          {{ notification.detail }}
        </h1>
      </div>
    </router-link>
  </button>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import Avatar from '@/components/utils/s3/UserAvatar.vue'
import { formatDateWithDateString } from '@/utils/formatDate'

export default {
  components: { Avatar },
  props: {
    dateText: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()

    const notifications = computed(() =>
      store.getters['notification/notifications'].filter(
        ({ time }) => formatDateWithDateString(time) === props.dateText,
      ),
    )

    const markAsViewed = (notification) =>
      store.dispatch('notification/markAsViewed', [notification.id])

    return {
      notifications,
      markAsViewed,
    }
  },
}
</script>

<style scoped>
.color-notification {
  color: #44444f;
}
.color-detail {
  color: #92929d;
}
.notification-url {
  margin: 0px !important;
}
</style>
