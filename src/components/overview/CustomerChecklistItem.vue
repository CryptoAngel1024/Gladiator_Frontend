<template>
  <tr>
    <td class="w-1/4 py-4">
      <CustomerLogo
        class="w-28 h-16 rounded-xl border"
        :presentation-id="rfp.presentationId"
        :name="rfp.customerName"
      />
    </td>
    <td class="w-1/3">
      <h1
        class="text-title-jnj font-bold"
        :datat-test="`myRfp-customer-name-${rfp.customerName}`"
      >
        {{ rfp.customerName }}
      </h1>
    </td>
    <td
      class="text-subheader font-normal"
      :datat-test="`myRfp-customer-name-${rfp.customerName}`"
    >
      {{ formatDateWithMonthString(rfp.createdDate) }}
    </td>

    <td class="relative">
      <div class="flex items-center justify-end">
        <button
          class="p-3 h-10 bg-gray-50 rounded-lg"
          @click="dropdown()"
          @blur="delay(() => (showMenu = false))"
        >
          <div class="flex flex-row">
            <LoadingIcon
              v-if="exportingCsv || exportingPdf"
              class="h-5 w-5 mr-2"
            />
            <SvgIcon class="h-5 w-1" name="moreVertical" />
          </div>
        </button>
      </div>
      <div
        v-if="showMenu"
        class="absolute right-0 top-15 z-50 borde-2 rounded-xl bg-white shadow-xl flex flex-col py-6 px-5 w-48 space-y-4"
      >
        <div class="flex flex-row">
          <button
            class="flex items-center text-gray-425 space-x-2"
            :disabled="exportingCsv"
            @click="exportCsv"
          >
            <svg-icon name="excel" class="h-7 w-6" />
            <h1>Export CSV</h1>
          </button>
          <LoadingIcon
            v-if="exportingCsv"
            class="flex items-center h-5 w-5 ml-2"
          />
        </div>
        <div class="flex flex-row">
          <button
            class="flex items-center text-gray-425 space-x-2"
            :disabled="exportingPdf"
            @click="generatePdf"
          >
            <svg-icon name="pdf" class="h-7 w-6" />
            <h1>Export PDF</h1>
          </button>
          <LoadingIcon
            v-if="exportingPdf"
            class="flex items-center h-5 w-5 ml-2"
          />
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import csvDownload from 'json-to-csv-export'
import LoadingIcon from '@/components/utils/LoadingIcon.vue'
import CustomerLogo from '@/components/utils/s3/CustomerLogo.vue'
import { formatDateWithMonthString } from '@/utils/formatDate.js'

export default {
  components: {
    CustomerLogo,
    LoadingIcon,
  },
  props: {
    rfp: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const showMenu = ref(false)
    const exportingPdf = ref(false)
    const exportingCsv = ref(false)
    const store = useStore()

    const presentationState = computed(() => props.rfp)

    const presentationId = computed(() => props.rfp?.presentationId)

    const dropdown = () => {
      showMenu.value = !showMenu.value
    }

    const exportCsv = () => {
      exportingCsv.value = true
      csvDownload([
        {
          customerName: presentationState.value.customerName,
          createdDate: formatDateWithMonthString(
            presentationState.value.createdDate,
          ),
        },
      ])

      exportingCsv.value = false
    }

    async function generatePdf() {
      exportingPdf.value = true
      await store.dispatch('link/generatePdf', {
        clientName: presentationState.value.clientName,
        presentationId: presentationId.value,
        pdfTypeParam: 'CUSTOMER_CHECKLIST',
      })
      exportingPdf.value = false
    }
    const delay = (func) => setTimeout(func, 1000)

    return {
      delay,
      showMenu,
      exportingPdf,
      exportingCsv,
      exportCsv,
      generatePdf,
      dropdown,
      formatDateWithMonthString,
    }
  },
}
</script>
