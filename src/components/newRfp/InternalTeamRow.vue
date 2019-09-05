<template>
  <tr :class="isOverview ? 'border-b' : ''">
    <td>
      <div
        v-if="disableUserTypeInput && data.userType"
        class="min-w-28 w-full bg-white text-base font-bold"
        :data-test="`team-role-${data.userType}`"
      >
        {{ data.userType }}
      </div>
      <input
        v-else
        v-model.lazy="data.userType"
        class="presentation-wizard-input min-w-28 w-full print:w-52"
        placeholder="Enter role here"
        :disabled="editIsDisallowed"
        :data-test="`team-role-${data.userType}`"
      />
    </td>
    <td>
      <input
        v-model.lazy="data.name"
        class="presentation-wizard-input min-w-28 w-full"
        placeholder="Enter name here"
        :disabled="editIsDisallowed"
        :data-test="`team-row-name-${data.userType}`"
      />
    </td>
    <td>
      <input
        v-model.lazy="data.email"
        class="presentation-wizard-input min-w-28 w-full"
        :class="{
          'border border-red-300':
            (!data.email && data.shareRfp) || (data.email && invalidEmail),
        }"
        type="email"
        placeholder="Enter email here"
        :disabled="editIsDisallowed"
        :data-test="`team-row-email-${data.userType}`"
      />
    </td>
    <td>
      <div class="space-x-3 pr-4 pl-2">
        <div v-if="isOverview">{{ data.shareRfp ? 'Yes' : 'No' }}</div>
        <div v-else class="flex">
          <div class="flex items-center space-x-1 pr-1">
            <input
              :id="`shareRfpYes${index}`"
              v-model="data.shareRfp"
              :name="`shareRfp${index}`"
              class="presentation-wizard-radio my-auto"
              type="radio"
              :value="true"
              :disabled="editIsDisallowed"
              :data-test="`team-row-shareRfp-yes-${data.userType}`"
            />
            <label
              :for="`shareRfpYes${index}`"
              class="text-normal text-gray-450 my-auto"
              >Yes
            </label>
          </div>
          <div class="flex items-center space-x-1">
            <input
              :id="`shareRfpNo${index}`"
              v-model="data.shareRfp"
              :name="`shareRfp${index}`"
              class="presentation-wizard-radio my-auto"
              type="radio"
              :value="false"
              :disabled="editIsDisallowed"
              :data-test="`team-row-shareRfp-no-${data.userType}`"
            />
            <label
              :for="`shareRfpNo${index}`"
              class="text-normal text-gray-450 my-auto"
              >No
            </label>
          </div>
        </div>
      </div>
    </td>
    <td>
      <div class="space-x-3">
        <div v-if="isOverview">
          <div v-if="data.shareRfp">
            {{ data.role == 'VIEWER' ? 'View' : 'Edit' }}
          </div>
        </div>
        <!-- use d-none to avoid page shift horizontally -->
        <div v-else class="flex" :class="!data.shareRfp ? 'opacity-0' : ''">
          <div class="flex items-center space-x-1 pr-1">
            <input
              :id="`viewAccessRole${index}`"
              v-model="data.role"
              :name="`accessRole${index}`"
              class="presentation-wizard-radio my-auto checked:bg-red-700"
              type="radio"
              value="VIEWER"
              :disabled="editIsDisallowed"
              :data-test="`team-row-access-view-${data.userType}`"
            />
            <label
              :for="`viewAccessRole${index}`"
              class="text-normal text-gray-450 my-auto"
              >View
            </label>
          </div>
          <div class="flex items-center space-x-1">
            <input
              :id="`editAccessRole${index}`"
              v-model="data.role"
              :name="`accessRole${index}`"
              class="presentation-wizard-radio my-auto"
              type="radio"
              value="EDITOR"
              :disabled="editIsDisallowed"
              :data-test="`team-row-access-edit-${data.userType}`"
            />
            <label
              :for="`editAccessRole${index}`"
              class="text-normal text-gray-450 my-auto"
              >Edit
            </label>
          </div>
        </div>
      </div>
    </td>
    <td>
      <div
        v-if="!Boolean(data.userType)"
        class="border rounded-full border-red-450 w-7 h-7 ml-2 flex justify-center items-center"
        @click="removeRow"
      >
        <div class="border-t-4 border-red-450 w-3 h-1"></div>
      </div>
      <div v-else class="w-9"></div>
    </td>
  </tr>
</template>
<script>
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'
import { isValidEmail } from '@/utils/validationFunctions.js'

export default {
  props: {
    member: { type: Object, required: true },
    index: { type: Number, required: true },
  },
  emits: ['updateMember', 'removeRow'],

  setup(props, { emit }) {
    const store = useStore()
    const disableUserTypeInput = computed(
      () => store.getters['setting/getCurrentDepartment'] === 'ASC',
    )
    const data = ref({
      ...props.member,
      name: [props.member.firstName, props.member.lastName]
        .filter(Boolean)
        .join(' '),
    })

    const removeRow = () => {
      emit('removeRow', props.index)
    }

    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    const editIsDisallowed = useRfpEditIsDisabled()

    const invalidEmail = computed(() => {
      return !isValidEmail(data.value.email)
    })

    watch(
      () => data,
      (newData) => {
        const updatedMember = { ...newData.value }
        if (!updatedMember.shareRfp) updatedMember.role = 'NONE'

        const names = updatedMember.name?.split(' ')

        updatedMember.firstName = names.slice(0, -1).join(' ')
        updatedMember.lastName = names.slice(-1).join(' ')

        if (!updatedMember.email) {
          updatedMember.email = ''
          // updatedMember.shareRfp = false
        }

        updatedMember.role =
          updatedMember.shareRfp && updatedMember.role == 'NONE'
            ? 'VIEWER'
            : updatedMember.role
        emit('updateMember', updatedMember, props.index)
      },
      { deep: true },
    )

    return {
      data,
      isOverview,
      editIsDisallowed,
      invalidEmail,
      disableUserTypeInput,
      removeRow,
    }
  },
}
</script>

<style scoped lang="postcss">
th {
  @apply py-3 text-base font-normal font-Arial;
}
</style>
