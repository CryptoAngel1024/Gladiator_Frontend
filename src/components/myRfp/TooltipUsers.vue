<template>
  <div
    class="flex flex-col py-6 px-5 bg-white border-1 rounded-xl w-80 relative"
  >
    <div class="absolute right-1/2 -top-10 -mr-2 arrow"></div>
    <div v-for="(member, i) in avatar" :key="i" class="flex my-4 items-center">
      <avatar
        :email="member.email"
        :name="`${member.firstName} ${member.lastName}`"
        class="w-8 h-8"
      />
      <div class="ml-4">
        <div class="font-bold">
          {{ `${member.firstName} ${member.lastName}` }}
        </div>
        <div class="text-gray-500">{{ member.role?.toLowerCase() }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from '@/components/utils/s3/UserAvatar.vue'

export default {
  components: {
    Avatar,
  },
  props: {
    avatar: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style scoped>
.arrow {
  border-color: transparent transparent #fff transparent;
  border-style: solid;
  border-width: 20px;
}
</style>
