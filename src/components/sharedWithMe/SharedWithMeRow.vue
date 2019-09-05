<template>
  <tr>
    <td class="flex items-center space-x-8 py-4">
      <customer-logo
        class="my-auto w-20 h-16 border rounded-xl"
        :presentation-id="rfp.presentationId"
        :name="rfp.customerName"
      />
    </td>
    <td>
      <h1 class="text-title-jnj uppercase">
        {{ rfp.customerName }}
      </h1>
    </td>
    <td>
      <div class="flex space-x-2 items-center">
        <svg-icon
          :name="rfp.role === 'EDITOR' ? 'edit' : 'view'"
          class="h-5 w-5 text-gray-425 self-center my-auto"
        />
        <h1 class="my-auto">{{ roleDisplayValues[rfp.role] }}</h1>
      </div>
    </td>

    <td>
      <h1 v-if="rfp.sharedBy" class="text-normal">
        {{ `${rfp.sharedBy.firstName} ${rfp.sharedBy.lastName}` }}
      </h1>
    </td>
    <td>
      <div class="flex space-x-4 items-center justify-end">
        <dp-link-button
          class="px-4 bg-accent-blue text-white border-accent-blue border-2 rounded-lg py-2"
          :to="{
            name: 'update-presentation',
            params: {
              presentationId: rfp.presentationId,
              step: 1,
              subStep: 1,
            },
          }"
          :text="rfp.role === 'EDITOR' ? 'Edit' : 'View'"
          data-test="edit-presentation-button"
        />
        <dp-link-button
          class="px-4 bg-white text-accent-blue border-accent-blue border-2 rounded-lg py-2"
          :to="{
            name: 'slide',
            params: {
              presentationId: rfp.presentationId,
            },
          }"
          target="_blank"
          text="Preview"
          data-test="preview-presentation-button"
        />
      </div>
    </td>
  </tr>
</template>

<script>
import DpLinkButton from '../buttons/DpLinkButton.vue'
import SvgIcon from '@/components/utils/SvgIcon.vue'
import CustomerLogo from '../utils/s3/CustomerLogo.vue'
const roleDisplayValues = {
  EDITOR: 'Edit',
  VIEW: 'View only',
  CUSTOMER_CHECKLIST_EDITOR: 'Customer Checklist Editor',
}

export default {
  components: {
    DpLinkButton,
    SvgIcon,
    CustomerLogo,
  },
  props: { rfp: { type: Object, required: true } },
  setup() {
    return { roleDisplayValues }
  },
}
</script>
