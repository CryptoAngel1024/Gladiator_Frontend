<template>
  <tr v-if="isOverview" class="text-indigo-750">
    <input
      v-model.lazy="data.name"
      class="min-w-28 w-full"
      placeholder="Enter name here"
      :disabled="editIsDisallowed"
      :data-test="`team-row-name-${data.userType}`"
    />
    <input
      v-model.lazy="data.email"
      class="min-w-28 w-full mb-2"
      :class="{
        'border border-red-300':
          (!data.email && data.shareRfp) ||
          ((data.name || data.email) && invalidEmail),
      }"
      type="email"
      placeholder="Enter email here"
      :disabled="editIsDisallowed"
      :data-test="`team-row-email-${data.userType}`"
    />
  </tr>
  <tr v-if="!isOverview">
    <td>
      <input
        v-model.lazy="data.name"
        class="min-w-28 w-full"
        placeholder="Enter name here"
        :disabled="editIsDisallowed"
        :data-test="`team-row-name-${data.userType}`"
      />
    </td>
    <td>
      <input
        v-model.lazy="data.email"
        class="min-w-28 w-full :"
        :class="{
          'border border-red-300':
            (!data.email && data.shareRfp) ||
            ((data.name || data.email) && invalidEmail),
        }"
        type="email"
        placeholder="Enter email here"
        :disabled="editIsDisallowed"
        :data-test="`team-row-email-${data.userType}`"
      />
    </td>
    <td>
      <button
        v-if="index > 0"
        type="button"
        :disabled="editIsDisallowed"
        @click="remove"
      >
        <svg-icon class="w-8 h-8 ml-2 text-red" name="remove" />
      </button>
    </td>
  </tr>
</template>
<script>
import { ref, watch, computed } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'
import SvgIcon from '@/components/utils/SvgIcon.vue'
import { isValidEmail } from '@/utils/validationFunctions.js'

export default {
  components: { SvgIcon },
  props: {
    editor: { type: Object, required: true },
    index: { type: Number, required: true },
  },
  emits: ['updateEditor'],

  setup(props, { emit }) {
    const data = ref({
      ...props.editor,
      name: [props.editor.firstName, props.editor.lastName]
        .filter(Boolean)
        .join(' '),
    })

    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    const editIsDisallowed = useRfpEditIsDisabled(true)

    const invalidEmail = computed(() => {
      return !isValidEmail(data.value.email)
    })

    watch(
      () => data,
      (newData) => {
        const updatedMember = { ...newData.value }
        updatedMember.shareRfp = true
        updatedMember.userType = 'CUSTOMER_CHECKLIST_EDITOR'
        updatedMember.role = 'CUSTOMER_CHECKLIST_EDITOR'

        if (updatedMember.name) {
          const names = updatedMember.name?.split(' ')

          updatedMember.firstName = names.slice(0, -1).join(' ')
          updatedMember.lastName =
            names.length > 0 ? names.slice(-1).join(' ') : ''
        }
        if (!updatedMember.email) {
          updatedMember.email = ''
          updatedMember.shareRfp = false
        }

        emit('updateEditor', updatedMember, props.index)
      },
      { deep: true },
    )

    const remove = () => {
      emit('updateEditor', null, props.index)
    }

    return {
      data,
      isOverview,
      editIsDisallowed,
      invalidEmail,
      remove,
    }
  },
}
</script>

<style scoped lang="postcss">
input {
  @apply text-base font-bold leading-relaxed rounded-lg bg-gray-50;
}
input:enabled {
  @apply py-4 px-3;
}
input:disabled {
  background-color: white;
}

th {
  @apply py-3 text-base font-normal font-Arial;
}
</style>
