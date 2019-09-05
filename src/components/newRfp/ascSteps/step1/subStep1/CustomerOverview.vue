<template>
  <div class="w-full py-4" :class="isOverview ? '' : 'flex flex-row'">
    <div class="flex" :class="isOverview ? 'items-center' : 'flex-col pr-2'">
      <h2
        class="text-base font-bold leading-none"
        :class="isOverview ? 'text-gray-500 w-1/6' : 'text-gray-800'"
      >
        Customer UCN
      </h2>
      <input
        v-model.lazy="custOverviewInfo.customerUcn"
        placeholder="Type Something here ..."
        class="presentation-wizard-input"
        :class="
          isOverview
            ? 'text-indigo-750 font-bold'
            : 'border p-4 rounded-md h-14 my-2 min-w-56'
        "
        :disabled="editIsDisallowed"
      />
    </div>
    <div class="flex" :class="isOverview ? 'items-center' : 'flex-col mr-3'">
      <h2
        class="text-base font-bold leading-none text-gray-500"
        :class="isOverview ? 'w-1/6' : ''"
      >
        Customer Address
      </h2>
      <input
        v-model.lazy="custOverviewInfo.customerAddress"
        placeholder="Type Something here ..."
        class="presentation-wizard-input border rounded-md"
        :class="
          isOverview ? 'text-indigo-750 font-bold' : 'p-4 h-14 my-2 min-w-56'
        "
        :disabled="editIsDisallowed"
      />
    </div>
  </div>

  <h1 class="text-header-jnj text-primary my-4">Customer Overview</h1>

  <multi-radio-items
    v-model="custOverviewInfo.classOfTr3000"
    :title="'Is the customer a Class of Trade 3000/3001 in Optimizer?'"
    :options="['Yes', 'No', 'I don`t know']"
  />

  <multi-radio-items
    v-model="custOverviewInfo.onWinGrowServeList"
    :title="'Is the customer on the ASC Win/Grow/Serve Targeting List?'"
    :options="['Yes', 'No', 'I don`t know']"
  />

  <h1 class="text-subheader py-2">
    Where is the customer in their ASC Journey?
  </h1>

  <div class="rounded-md text-gray-450 py-2">
    <select
      v-model="custOverviewInfo.ascJourney"
      class="presentation-wizard-select p-4"
      :disabled="isOverview"
    >
      <option value="" disabled selected>Select Here</option>

      <option
        v-for="(option, i) in ascJourneyOptions"
        :key="i"
        :value="option"
        class="p-4 rounded-md text-gray-450"
      >
        {{ option }}
      </option>
    </select>
  </div>

  <h1 class="text-subheader py-2">What is the ownership structure?</h1>
  <div v-if="isOverview" class="w-3/4 flex items-center text-white">
    <div
      class="text-normal uppercase w-1/3 bg-slidColor-1 py-2 rounded-tl-lg pl-3"
    >
      % Physician Owned
    </div>
    <div class="w-1/3 bg-slidColor-1 py-2 pl-3">% Hospital Owned</div>
    <div class="w-1/3 bg-slidColor-1 py-2 rounded-tr-lg">
      % management Group /IDN Owned Help
    </div>
  </div>
  <div class="flex flex-row w-3/4 py-2" :class="isOverview ? 'border-b' : ''">
    <input
      v-model.lazy="custOverviewInfo.ownershipStructure.physicianOwned"
      type="number"
      placeholder="% Physician Owned"
      class="presentation-wizard-input flex flex-col min-w-28 w-1/3 mr-2"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="custOverviewInfo.ownershipStructure.hospitalOwned"
      type="number"
      placeholder="% Hospital Owned"
      class="presentation-wizard-input flex flex-col min-w-28 w-1/3 mr-2"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="custOverviewInfo.ownershipStructure.mgmtGroupOwned"
      type="number"
      placeholder="% management Group /IDN Owned Help"
      class="presentation-wizard-input flex flex-col min-w-28 w-1/3 mr-2"
      :disabled="editIsDisallowed"
    />
  </div>

  <h1 class="font-normal text-xs font-Arial text-gray-500 py-2">
    Which Hospital ?
  </h1>
  <input
    v-model.lazy="custOverviewInfo.hospital"
    placeholder="Type Something here ..."
    class="presentation-wizard-input flex flex-col min-w-28 w-1/4 mr-4"
    :disabled="editIsDisallowed"
  />

  <h1 class="text-subheader py-2">What is the ASC's speciality?</h1>

  <div class="rounded-md text-gray-450 py-2">
    <select
      v-model="custOverviewInfo.ascSpeciality"
      class="presentation-wizard-select p-4"
      :disabled="isOverview"
    >
      <option value="" disabled selected>Select Here</option>
      <option
        v-for="(option, i) in ['Orthopaedic', 'Multspeciality']"
        :key="i"
        :value="option"
        class="p-4 rounded-md text-gray-450"
      >
        {{ option }}
      </option>
    </select>
  </div>

  <h1 class="text-subheader py-2">What is the ownership structure?</h1>
  <div v-if="isOverview" class="w-full flex items-center text-white">
    <div class="text-normal w-1/4 bg-slidColor-1 py-2 rounded-tl-lg pl-3">
      % Medicare
    </div>
    <div class="w-1/4 bg-slidColor-1 py-2 rounded-tr-lg pl-3">% Private</div>
  </div>
  <div class="flex flex-row w-1/2 py-2" :class="isOverview ? 'border-b' : ''">
    <input
      v-model.lazy="custOverviewInfo.ownershipStructure.medicare"
      type="number"
      placeholder="% Medicare"
      class="presentation-wizard-input flex flex-col min-w-28 w-1/2 mr-2"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="custOverviewInfo.ownershipStructure.private"
      type="number"
      placeholder="% Private"
      class="presentation-wizard-input flex flex-col min-w-28 w-1/2 mr-2"
      :disabled="editIsDisallowed"
    />
  </div>

  <h1 class="text-subheader py-2">
    What DePuy Synthes contracts are in place with this customer?
  </h1>
  <div v-if="isOverview" class="w-full flex items-center text-white">
    <div class="text-normal w-1/5 bg-slidColor-1 py-2 rounded-tl-lg pl-3">
      Joint Reconstruction
    </div>
    <div class="w-1/5 bg-slidColor-1 py-2 pl-3">Spine</div>
    <div class="w-1/5 bg-slidColor-1 py-2">Sports Medicine</div>
    <div class="w-1/5 bg-slidColor-1 py-2">Trauma &amp; Extremities</div>
    <div class="w-1/5 bg-slidColor-1 py-2 rounded-tr-lg">Help</div>
  </div>
  <div class="flex flex-row w-full py-2" :class="isOverview ? 'border-b' : ''">
    <input
      v-model.lazy="custOverviewInfo.contractInPlace.jointReconstuction"
      placeholder="Joint Reconstruction"
      class="presentation-wizard-input flex flex-col min-w-28 w-1/5 mr-2"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="custOverviewInfo.contractInPlace.spine"
      placeholder="Spine"
      class="presentation-wizard-input flex flex-col min-w-28 w-1/5 mr-2"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="custOverviewInfo.contractInPlace.sportsMedicine"
      placeholder="Sports Medicine"
      class="presentation-wizard-input flex flex-col min-w-28 w-1/5 mr-2"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="custOverviewInfo.contractInPlace.traumaAndExtremities"
      placeholder="Trauma &amp; Extremities"
      class="presentation-wizard-input flex flex-col min-w-28 w-1/5 mr-2"
      :disabled="editIsDisallowed"
    />
    <input
      v-model.lazy="custOverviewInfo.contractInPlace.help"
      placeholder="Help"
      class="presentation-wizard-input flex flex-col min-w-28 w-1/5 mr-2"
      :disabled="editIsDisallowed"
    />
  </div>
</template>

<script>
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import MultiRadioItems from '@/components/newRfp/ascSteps/sharedComponents/MultiRadioItems.vue'
import ascJourneyOptions from '@/data/defaultRfpFields/asc/ascJourneyOptions.json'
import defaultAscCustomerOverview from '@/data/defaultRfpFields/asc/customerOverview.json'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { cloneDeep } from 'lodash'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: { MultiRadioItems },
  setup() {
    const store = useStore()
    const route = useRoute()
    const editIsDisallowed = useRfpEditIsDisabled()

    const { currentIsOverviewPage: isOverview } = useAllRfpSteps()
    const presentationId = computed(() => route.params.presentationId)

    const isNewRfp = computed(() => !presentationId.value)

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
            customerUcn: custOverviewInfo.value.customerUcn,
            customerAddress: custOverviewInfo.value.customerUcn,
            classOfTr3000: custOverviewInfo.value.classOfTr3000,
            onWinGrowServeList: custOverviewInfo.value.onWinGrowServeList,
            ascJourney: custOverviewInfo.value.ascJourney,
            ownershipStructure: custOverviewInfo.value.ownershipStructure,
            hospital: custOverviewInfo.value.hospital,
            ascSpeciality: custOverviewInfo.value.ascSpeciality,
            contractInPlace: custOverviewInfo.value.contractInPlace,
          },
        }),
      )
      if (isNewRfp.value) {
        store.commit('rfps/setCurrentRfp', updatedPresentation)
      } else {
        store.commit('rfps/updateRfp', updatedPresentation)
      }
    }

    const selectedItemChanged = ({ fieldName, updatedValue }) => {
      custOverviewInfo.value[fieldName] = updatedValue
    }
    watch(custOverviewInfo, updateCustomerInfo, {
      deep: true,
    })

    return {
      editIsDisallowed,
      ascJourneyOptions,
      custOverviewInfo,
      selectedItemChanged,
      isOverview,
    }
  },
}
</script>
