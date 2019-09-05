<template>
  <div class="flex flex-col items-start p-7 w-full">
    <div class="flex items-center w-full justify-between py-6 border-b">
      <h1
        class="text-primary text-2xl text-center mr-2"
        data-test="template-title"
      >
        Select your presentation slides
      </h1>
      <dp-button
        text="Save"
        :disabled="loading && Object.keys(slidesByCategory).length === 0"
        data-test="edit-template-button"
        class="px-5 py-4 rounded-xl text-white bg-secondary h-btn-builder min-h-btn-builder my-auto"
        @click="toggleEditTemplateModal(), editTemplateGaLog()"
      />
    </div>

    <ApiState
      v-if="Object.keys(slidesByCategory).length === 0"
      :loading="loading"
      :error-message="errorMessage"
    />
    <slide-group
      v-for="category in Object.keys(slidesByCategory)"
      :key="category"
      :category-slides="slidesByCategory[category]"
      :category="category"
    />
    <p v-if="successMessage" class="w-full text-emerald-400 text-right mt-2">
      {{ successMessage }}
    </p>
  </div>
  <EditTemplate v-if="saveTemplateModal" @hide="toggleEditTemplateModal" />
</template>
<script>
import DpButton from '@/components/buttons/DpButton.vue'
import EditTemplate from '@/components/newRfp/EditTemplate.vue'
import SlideGroup from '@/components/newRfp/SlideGroup.vue'
import ApiState from '@/components/utils/apiState.vue'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from '@vue/runtime-core'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: {
    DpButton,
    SlideGroup,
    EditTemplate,
    ApiState,
  },
  props: {
    id: { type: [String, Number], required: true },
  },

  setup(props) {
    const store = useStore()
    const successMessage = ref('')
    const errorMessage = ref('')
    const saveTemplateModal = ref(false)
    const loading = ref(false)
    const toggleEditTemplateModal = () => {
      saveTemplateModal.value = !saveTemplateModal.value
    }
    onMounted(async () => {
      try {
        loading.value = true

        await store.dispatch('templates/getTemplate', props.id)
        loading.value = false
      } catch (err) {
        console.error(err)
        loading.value = false
        errorMessage.value = `Loading Failed: ${
          err.message ||
          err.response?.statusText ||
          err.statusText ||
          err.status ||
          err
        }`
      }
    })
    const slidesByCategory = computed(() =>
      store.getters['templates/getEditTemplates'](props.id),
    )

    const editTemplateGaLog = () => {
      gaEvent({
        action: 'edit-template-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-edit-template-btn',
      })
    }
    return {
      slidesByCategory,
      saveTemplateModal,
      toggleEditTemplateModal,
      loading,
      successMessage,
      errorMessage,
      editTemplateGaLog,
    }
  },
}
</script>
