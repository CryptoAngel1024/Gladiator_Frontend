<template>
  <table class="w-full">
    <thead class="text-left text-xs font-medium tracking-wider w-full">
      <tr :class="isOverview ? 'bg-blue-555 text-white' : ''">
        <th :class="isOverview ? 'rounded-tl-xl  pl-2' : ''" scope="col">
          <h1
            v-if="isAsc"
            class="w-full min-w-56 py-2 uppercase"
            :class="
              isOverview ? 'font-normal text-white' : 'font-bold text-gray-500'
            "
          >
            Internal Team
          </h1>
          {{ isAsc ? '' : 'Role' }}
        </th>
        <th scope="col">{{ isAsc && !isOverview ? '' : 'Name' }}</th>
        <th scope="col">
          {{ isAsc && !isOverview ? '' : 'Email' }}
        </th>
        <th scope="col">Share Presentation?</th>
        <th scope="col">Access Role</th>
        <th scope="col" class="rounded-tr-xl"></th>
      </tr>
    </thead>
    <tbody>
      <internal-team-row
        v-for="(member, index) in teamData"
        :key="index"
        :member="member"
        :index="index"
        @update-member="updateTeamData"
        @remove-row="rowDel"
      />
    </tbody>
  </table>
  <dp-button
    v-if="!isOverview"
    type="button"
    :text="!isAsc ? '+ Add more' : '+ Add More Team Member'"
    class="py-4 border border-dashed rounded-md font-medium text-gray-800 mt-6"
    :class="isAsc ? 'w-full' : 'w-1/2'"
    :disabled="editIsDisallowed"
    @click="teamData.push({})"
  />
</template>
<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import DpButton from '../buttons/DpButton.vue'
import InternalTeamRow from './InternalTeamRow.vue'
import { computed, ref } from 'vue'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import { isValidEmail } from '@/utils/validationFunctions.js'
import useAllRfpSteps from '@/data/allRfpSteps.js'

const DEFAULT_ROLES = {
  TRAUMA: [
    'REGIONAL MANAGER',
    'TEAM LEAD (AVP, DSA)',
    'CONTRACT DIRECTOR',
    'DEAL DESK',
    'COMMERCIAL EXECUTION',
    'CAPABILITIES',
    'HEMA',
    'SUPPLY CHAIN',
  ],
  ASC: [
    'REGIONAL MANAGER',
    'ASC Sr. FLELD MANAGER',
    'TEAM LEAD(AVP)',
    'CONTRACT DIRECTOR',
    'DEAL DESK',
    'ENABLING TECH',
    'POWER  TOOLS',
    'SUPPLY CHAIN CUSTOMER SOLUTIONS',
    'COMMERCIAL EXECUTION',
    'OTHERS SOLUTIONS (ie. eSIMS, HEMA)',
  ],
}
function getInternalUserDetails(presentation, department) {
  let teamData =
    presentation.value?.internalUserDetails?.map((user) => ({
      ...user,
      name: user.firstName ? `${user.firstName} ${user.lastName}` : '',
    })) || []
  // add default role if there is no user of that role
  DEFAULT_ROLES[department.value].forEach((defaultUserType) => {
    let user = teamData.find((userItem) => userItem.userType == defaultUserType)
    if (!user)
      teamData.push({
        userType: defaultUserType,
        role: 'NONE',
        shareRfp: null,
      })
  })

  return teamData
}
function getAllTeamData(internalUserDetails) {
  return internalUserDetails.value
    .filter(
      ({ role }) => role !== 'OWNER' && role !== 'CUSTOMER_CHECKLIST_EDITOR',
    )
    .map((user) => ({ ...user }))
}

export default {
  components: { DpButton, InternalTeamRow },

  setup() {
    const store = useStore()
    const route = useRoute()

    const department = computed(
      () => store.getters['setting/getCurrentDepartment'],
    )
    const isAsc = computed(() => department.value === 'ASC')

    const presentation = computed(() =>
      store.getters['rfps/getPresentationById'](route.params.presentationId),
    )
    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    const editIsDisallowed = useRfpEditIsDisabled()

    const internalUserDetails = computed(() => {
      return getInternalUserDetails(presentation, department)
    })

    const allTeamData = ref(getAllTeamData(internalUserDetails))

    const populatedTeamData = computed(() => {
      return allTeamData.value
        .map((user) => ({
          ...user,
          email: user.email || null,
          role: user.role || 'NONE',
        }))
        .filter(
          ({ email, firstName, lastName }) => email || firstName || lastName,
        )
    })
    const teamData = isOverview.value ? populatedTeamData : allTeamData

    const updateTeamData = (updatedUser, index) => {
      const oldUser = { ...teamData.value[index] }

      if (oldUser.internalUserId && oldUser.email !== updatedUser.email) {
        // this is a different user in the db
        updatedUser.internalUserId = null
      }

      teamData.value.splice(index, 1, updatedUser)

      let allEmailsAreValid = true
      populatedTeamData.value.forEach(({ email, shareRfp }) => {
        if (!isValidEmail(email) || (!email && shareRfp)) {
          allEmailsAreValid = false
        }
      })
      if (!allEmailsAreValid) return

      const checkListEditorUsers =
        presentation.value?.internalUserDetails
          ?.filter(({ role }) => role === 'CUSTOMER_CHECKLIST_EDITOR')
          .map((user) => ({ ...user })) || []

      store.commit(
        'rfps/updateRfp',
        JSON.parse(
          JSON.stringify({
            ...presentation.value,
            internalUserDetails: [
              ...populatedTeamData.value,
              ...checkListEditorUsers,
            ],
          }),
        ),
      )
    }

    const rowDel = (value) => {
      teamData.value.splice(value, 1)
    }

    return {
      teamData,
      updateTeamData,
      rowDel,
      isOverview,
      editIsDisallowed,
      isAsc,
    }
  },
}
</script>

<style scoped lang="postcss">
th {
  @apply py-3 text-base font-normal font-Arial;
}
</style>
