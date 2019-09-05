<template>
  <div class="flex flex-col w-full">
    <h1 class="pb-4 text-base font-bold leading-none text-gray-500">
      What is the ownership structure of the ASC ?
    </h1>
    <div class="w-3/4">
      <div v-if="isOverview" class="flex items-center text-white">
        <div
          class="text-normal uppercase w-1/3 bg-slidColor-1 py-2 rounded-tl-lg pl-3"
        >
          type
        </div>
        <div class="w-1/3 bg-slidColor-1 py-2 pl-6">%</div>
        <div class="w-1/3 bg-slidColor-1 py-2 rounded-tr-lg">name</div>
      </div>
      <div
        v-for="(owership, index) in custOverviewInfo.ownerShipAndBoard
          .ownership"
        :key="index"
        class="flex space-x-4 space-y-4 items-center"
        :class="isOverview ? 'border-b border-gray-200' : ''"
      >
        <h1 class="text-normal uppercase w-1/3">
          {{ owership.title }}
        </h1>

        <input
          v-model.lazy="owership.amount"
          class="presentation-wizard-input w-1/3"
          type="number"
          placeholder="%"
          :disabled="editIsDisallowed"
        />
        <input
          v-model.lazy="owership.names"
          class="presentation-wizard-input w-1/3"
          placeholder="Names(s)"
          :disabled="editIsDisallowed"
        />
      </div>
    </div>

    <h1
      v-if="!isOverview"
      class="py-4 text-base font-bold leading-none text-gray-500"
    >
      What is the structure of the board of the ASC ?
    </h1>
    <div
      v-for="(board, index) in custOverviewInfo.ownerShipAndBoard.board"
      :key="index"
      class="flex space-x-4 space-y-4 items-center"
    >
      <h1 class="text-normal uppercase w-1/4">
        {{ board.title }}
      </h1>
      <input
        v-model.lazy="board.structure"
        class="presentation-wizard-input w-1/4"
        placeholder="Type Here"
        :disabled="editIsDisallowed"
      />
    </div>
    <h1 class="py-4 text-base font-bold leading-none text-gray-500">
      What specialities are represented ? How many surgeons for each
    </h1>
    <div v-if="isOverview" class="flex items-center text-white">
      <div
        class="text-normal uppercase w-1/4 bg-slidColor-1 py-2 rounded-tl-lg pl-3"
      >
        TYPE
      </div>
      <div class="w-1/4 bg-slidColor-1 py-2 pl-6">NUMBER</div>
      <div class="w-1/4 bg-slidColor-1 py-2 pl-6">NAMES(S)</div>
      <div class="w-1/4 bg-slidColor-1 py-2 rounded-tr-lg">
        VOTING NUMBERS(S)
      </div>
    </div>
    <div
      v-for="(speciality, index) in custOverviewInfo.ownerShipAndBoard
        .specialities"
      :key="index"
      class="flex space-x-4 space-y-4 items-center"
      :class="isOverview ? 'border-b' : ''"
    >
      <h1 v-if="speciality.title" class="text-normal uppercase w-1/4">
        {{ speciality.title }}
      </h1>
      <input
        v-else
        v-model.lazy="speciality.title"
        class="presentation-wizard-input w-1/4"
        placeholder="Title"
        :disabled="editIsDisallowed"
      />
      <input
        v-model.lazy="speciality.number"
        type="number"
        class="presentation-wizard-input w-1/4"
        placeholder="Number"
        :disabled="editIsDisallowed"
      />

      <input
        v-model.lazy="speciality.names"
        class="presentation-wizard-input w-1/4"
        placeholder="Name(s)"
        :disabled="editIsDisallowed"
      />

      <input
        v-model.lazy="speciality.votingMembers"
        class="presentation-wizard-input w-1/4"
        placeholder="Voting Members"
        :disabled="editIsDisallowed"
      />
    </div>
    <dp-button
      v-if="!isOverview"
      type="button"
      text="+ Add More Surgeons"
      class="py-4 border border-dashed w-full font-bold text-gray-500 mt-6"
      :disabled="editIsDisallowed"
      @click="addMoreSurgeons"
    />
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from '@vue/runtime-core'
import { cloneDeep } from 'lodash'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import defaultAscCustomerOverview from '@/data/defaultRfpFields/asc/customerOverview.json'
import DpButton from '@/components/buttons/DpButton.vue'
import useAllRfpSteps from '@/data/allRfpSteps'

export default {
  components: {
    DpButton,
  },
  props: {},
  setup() {
    const store = useStore()
    const route = useRoute()
    const editIsDisallowed = useRfpEditIsDisabled()

    const isNewRfp = computed(() => !presentationId.value)
    const presentationId = computed(() => route.params.presentationId)

    const presentationState = computed(() =>
      store.getters['rfps/getPresentationById'](presentationId.value),
    )

    const custOverviewInfoComputed = computed(() => ({
      ...defaultAscCustomerOverview,
      ...presentationState.value.customerOverview,
    }))

    const custOverviewInfo = ref(cloneDeep(custOverviewInfoComputed.value))

    watch(
      presentationId,
      () =>
        (custOverviewInfo.value = cloneDeep(custOverviewInfoComputed.value)),
    )

    const updateCustomerInfo = () => {
      const updatedPresentation = JSON.parse(
        JSON.stringify({
          ...presentationState.value,
          customerOverview: {
            ...presentationState.value.customerOverview,
            ownerShipAndBoard: custOverviewInfo.value.ownerShipAndBoard,
          },
        }),
      )
      if (isNewRfp.value) {
        store.commit('rfps/setCurrentRfp', updatedPresentation)
      } else {
        store.commit('rfps/updateRfp', updatedPresentation)
      }
    }

    const addMoreSurgeons = () => {
      custOverviewInfo.value.ownerShipAndBoard.specialities = [
        ...custOverviewInfo.value.ownerShipAndBoard.specialities,
        {},
      ]
    }
    watch(custOverviewInfo, updateCustomerInfo, {
      deep: true,
    })

    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()

    return {
      editIsDisallowed,
      custOverviewInfo,
      addMoreSurgeons,
      isOverview,
    }
  },
}
</script>
