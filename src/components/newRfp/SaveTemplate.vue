<template>
  <base-modal id="templateForm" title="Save template">
    <form
      class="flex flex-col space-y-4 p-6 w-80"
      data-test="save-template-form"
      @submit.prevent="saveTemplate"
    >
      <h1 class="text-xl" data-test="save-modal-title">Save Template</h1>
      <p class="text-gray-400" data-test="save-modal-description">
        Please provide a name and description for your template:
      </p>
      <h1
        class="uppercase text-secondary text-xs font-semibold"
        data-test="save-template-name"
      >
        Template Name
      </h1>
      <input
        v-model="templateName"
        class="border rounded-lg py-3 px-3"
        placeholder="Template Name"
        data-test="template-name"
        required
      />
      <h1
        class="uppercase text-secondary text-xs font-semibold"
        data-test="save-template-description"
      >
        Template Description
      </h1>
      <textarea
        v-model="templateDescription"
        class="border rounded-lg py-3 px-3"
        placeholder="Template Description"
        data-test="template-description"
      />
      <div class="flex justify-between pt-2">
        <dp-button
          type="button"
          text="Cancel"
          class="bg-white text-gray-425"
          @click="$emit('hide')"
        />
        <dp-button
          type="submit"
          :disabled="isSaving"
          :text="isSaving ? 'Saving' : 'Save'"
          class="py-2 px-12 text-white bg-secondary"
          data-test="submit-button"
        />
      </div>
      <div class="flex justify-end">
        <p v-if="successMessage" class="text-emerald-400 text-right mt-2">
          {{ successMessage }}
        </p>
        <ErrorBanner :message="errorMessage" class="ml-auto mr-0 mt-2" />
      </div>
    </form>
  </base-modal>
</template>
<script>
import BaseModal from '@/components/utils/container/BaseModal.vue'
import DpButton from '@/components/buttons/DpButton.vue'
import ErrorBanner from '@/components/utils/ErrorBanner.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from '@vue/reactivity'

export default {
  components: { BaseModal, DpButton, ErrorBanner },
  emits: ['hide'],

  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const templateName = ref('')
    const templateDescription = ref('')
    const successMessage = ref('')
    const errorMessage = ref('')
    const presentationSlides = computed(() =>
      store.getters['rfps/getNonCustomSlidesByPresentationId'](
        route.params.presentationId,
      ),
    )

    const isSaving = ref(false)
    const saveTemplate = async () => {
      isSaving.value = true
      const slides = store.getters['templates/getNewTemplateSlides']
      try {
        errorMessage.value = ''
        successMessage.value = ''
        const payload = {
          templateName: templateName.value,
          templateDescription: templateDescription.value,
          slides: route.params.presentationId
            ? presentationSlides.value
            : slides,
        }
        await store.dispatch('templates/createTemplate', payload)

        if (!route.params.presentationId)
          router.push({
            name: 'templates',
          })
        successMessage.value = 'Successfully loaded'
        emit('hide')
      } catch (err) {
        console.error('create Template: ', err)
        errorMessage.value = `Saving Failed: ${
          err.message ||
          err.response?.statusText ||
          err.statusText ||
          err.status ||
          err
        }`
      }
      isSaving.value = false
    }

    return {
      templateName,
      templateDescription,
      saveTemplate,
      successMessage,
      errorMessage,
      isSaving,
    }
  },
}
</script>
