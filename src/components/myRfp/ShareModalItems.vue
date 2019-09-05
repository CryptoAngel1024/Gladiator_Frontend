<template>
  <div class="flex flex-row justify-between mt-3 mb-5 pb-2">
    <div class="flex flex-row items-center">
      <avatar
        :email="member.email"
        :data-test="`avatar-${member.email}`"
        :name="`${member.firstName} ${member.lastName}`"
        class="w-8 h-8"
      />
      <div class="ml-4">
        <div class="text-sm font-semibold text-gray-900">
          {{ member.firstName + ' ' + member.lastName }}
        </div>
        <div class="text-xs text-gray-400">
          {{
            options.find((option) => option.value === member.role)?.title ||
            member.role
          }}
        </div>
      </div>
    </div>
    <select
      v-model="selectedRole"
      class="text-sm font-semibold text-gray-900"
      data-test="role-dropdown"
      @change="onchange()"
    >
      <option
        v-for="(option, i) in options"
        :key="i"
        :value="option.value"
        :class="option.class"
      >
        {{ option.title }}
      </option>
    </select>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import Avatar from '@/components/utils/s3/UserAvatar.vue'
import { useStore } from 'vuex'
export default {
  components: { Avatar },
  props: {
    member: {
      type: Object,
      required: true,
    },
    presentationId: {
      type: String,
      required: true,
    },
  },
  emits: ['hide', 'sendMessage'],
  setup(props, { emit }) {
    const store = useStore()
    const showMenu = ref(false)
    const selectedRole = ref(props.member.role)
    const presentationId = computed(() => props.presentationId)
    const presentationState = computed(() =>
      store.getters['rfps/getPresentationById'](presentationId.value),
    )
    const options = computed(() =>
      props.member.email
        ? [
            { title: 'Editor', value: 'EDITOR', class: '' },
            { title: 'View only', value: 'VIEWER', class: 'text-gray-400' },
            { title: 'Not Shared', value: 'NONE', class: 'text-red-400' },
          ]
        : [{ title: 'Not Shared', value: 'NONE', class: 'text-red-400' }],
    )

    const click = () => {
      showMenu.value = !showMenu.value
    }
    const onchange = async () => {
      try {
        let userDetail = {
          ...props.member,
          role: selectedRole.value,
          shareRfp: selectedRole.value !== 'NONE',
        }

        const internalUsers = [...presentationState.value.internalUserDetails]

        const userIndex = internalUsers?.findIndex(
          ({ internalUserId }) => internalUserId === userDetail.internalUserId,
        )

        internalUsers.splice(userIndex, 1, userDetail)

        store.commit(
          'rfps/updateRfp',
          JSON.parse(
            JSON.stringify({
              ...presentationState.value,
              internalUserDetails: internalUsers,
            }),
          ),
        )

        await store.dispatch('rfps/saveRfpChanges', {
          presentationId: presentationId.value,
          updateType: 'internalUserDetails',
        })

        emit(
          'sendMessage',
          'Successfully ' +
            (selectedRole.value !== 'NONE' ? 'Shared' : 'Unshared'),
        )
      } catch (err) {
        emit(
          'sendMessage',
          `Sharing Failed: ${err.message || err.response?.statusText || err}`,
        )
      }
    }

    return { click, showMenu, selectedRole, options, onchange }
  },
}
</script>
