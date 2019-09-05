<template>
  <base-modal id="templateForm" title="Save template">
    <form
      class="flex flex-col space-y-4 p-6 w-80"
      data-test="edit-template-form"
      @submit.prevent="saveTemplate"
    >
      <h1 class="text-xl" data-test="edit-modal-title">Save Template</h1>
      <p class="text-gray-400" data-test="edit-modal-description">
        Please provide a name and description for your template:
      </p>
      <h1
        class="uppercase text-secondary text-xs font-semibold"
        data-test="edit-template-name"
      >
        Template Name
      </h1>
      <input
        v-model="templateName"
        required
        class="border rounded-lg py-3 px-3"
        data-test="template-name"
        placeholder="Template Name"
      />
      <h1
        class="uppercase text-secondary text-xs font-semibold"
        data-test="edit-template-description"
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
          data-test="submit-button"
          class="py-2 px-12 text-white bg-secondary"
        />
      </div>
      <div class="flex justify-end">
        <p
          v-if="successMessage"
          class="w-full text-emerald-400 text-right mt-2"
        >
          {{ successMessage }}
        </p>
        <ErrorBanner :message="errorMessage" class="ml-auto mr-0 mt-2 w-full" />
      </div>
    </form>
  </base-modal>
</template>
<script>
import BaseModal from '@/components/utils/container/BaseModal.vue'
import DpButton from '@/components/buttons/DpButton.vue'
import ErrorBanner from '@/components/utils/ErrorBanner.vue'
import { useStore } from 'vuex'
import { ref, computed } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

export default {
  components: { BaseModal, DpButton, ErrorBanner },
  emits: ['hide'],

  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()

    const templateState = computed(() =>
      store.getters['templates/getEditTemplatesById'](route.params.templateID),
    )
    const templateName = ref(templateState.value.templateName)
    const templateDescription = ref(templateState.value.templateDescription)

    watch(templateState, () => {
      templateName.value = templateState.value.templateName
      templateDescription.value = templateState.value.templateDescription
    })
    const successMessage = ref('')
    const errorMessage = ref('')
    const isSaving = ref(false)

    const saveTemplate = async () => {
      isSaving.value = true
      try {
        errorMessage.value = ''
        successMessage.value = ''
        const slideInfos = templateState.value.slides.map((slide) => ({
          isEnabled: slide.isEnabled,
          pageNumber: slide.pageNumber,
          slideCategory: slide.slideCategory,
          slideInfoId: slide.slideInfoId,
        }))
        const updatedTemplate = {
          bookmarked: templateState.value.bookmarked,
          slideInfos: slideInfos,
          templateDescription: templateState.value.templateDescription,
          templateId: templateState.value.templateId,
          templateName: templateState.value.templateName,
        }
        await store.dispatch('templates/updateTemplate', updatedTemplate)
        successMessage.value = 'Successfully updated'
        emit('hide')
      } catch (err) {
        console.error('update Template: ', err)
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
  watch: {
    templateName: {
      handler(val) {
        this.$store.commit('templates/setTemplateName', val)
      },
      deep: true,
      immediate: false,
    },
    templateDescription: {
      handler(val) {
        this.$store.commit('templates/setTemplateDescription', val)
      },
      deep: true,
      immediate: false,
    },
  },
}
</script>
