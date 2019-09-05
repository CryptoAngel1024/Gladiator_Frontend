<template>
  <div class="flex flex-col w-full">
    <div class="flex justify-between items-center pb-4">
      <h1 class="text-header-jnj text-primary">My templates</h1>
      <div class="flex">
        <div
          class="flex border items-center px-4 rounded-lg space-x-2"
          data-test="templates-header"
        >
          <svg-icon class="w-5 h-5" name="search" />
          <input
            v-model="searchTerm"
            placeholder="Search Templates"
            class="py-3 my-auto focus:outline-none"
          />
        </div>
        <DpLinkButton
          text="Create Template"
          :to="{ name: 'templates-new' }"
          class="ml-2 text-white bg-secondary h-btn-builder"
        />
      </div>
    </div>
    <table
      v-if="myDisplayTemplates.length"
      class="w-full"
      data-test="my-templates"
    >
      <thead class="main-page-table-header">
        <tr>
          <th class="pr-3"></th>
          <th class="pl-4">Template Name</th>

          <th>Number of slides</th>

          <th></th>
        </tr>
      </thead>
      <tbody class="divide-y" data-test="my-template-table-body">
        <TemplatesMyRow
          v-for="templateData in myDisplayTemplates"
          :key="templateData.templateId"
          :template-data="templateData"
          data-test="my-template-row"
        />
      </tbody>
    </table>
    <ApiState
      v-else
      :loading="loading"
      :error-message="errorMessage"
      data-type="templates"
    />
    <h1 class="text-header-jnj text-primary mt-4">Templates</h1>
    <table v-if="displayTemplates.length" class="w-full" data-test="templates">
      <thead class="main-page-table-header">
        <tr>
          <th class="pr-3"></th>
          <th class="pl-4">Template Name</th>

          <th>Number of slides</th>

          <th></th>
        </tr>
      </thead>
      <tbody class="divide-y">
        <TemplatesRow
          v-for="template in displayTemplates"
          :key="template.templateId"
          :template-data="template"
        />
      </tbody>
    </table>
    <ApiState
      v-else
      :loading="loading"
      :error-message="errorMessage"
      data-type="templates"
    />
  </div>
</template>

<script>
import DpLinkButton from '@/components/buttons/DpLinkButton.vue'
import TemplatesMyRow from '@/components/templates/templatesItems/TemplatesMyRow.vue'
import TemplatesRow from '@/components/templates/templatesItems/TemplatesRow.vue'
import ApiState from '@/components/utils/apiState.vue'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import { searchTemplates } from '@/utils/search'

export default {
  components: {
    TemplatesMyRow,
    TemplatesRow,
    DpLinkButton,
    ApiState,
  },
  setup() {
    const store = useStore()
    const searchTerm = ref('')
    const errorMessage = ref('')
    const loading = ref(false)

    const myDisplayTemplates = computed(() =>
      store.getters['templates/myTemplates'].filter(
        searchTemplates(searchTerm.value),
      ),
    )
    const displayTemplates = computed(
      () => store.getters['templates/templates'],
    )

    onMounted(async () => {
      try {
        errorMessage.value = ''
        loading.value = true
        await store.dispatch('templates/fetchTemplates')
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

    return {
      myDisplayTemplates,
      displayTemplates,
      searchTerm,
      loading,
      errorMessage,
    }
  },
}
</script>
<style scoped>
th:nth-child(1) {
  width: 10%;
}
th:nth-child(2) {
  width: 35%;
}
th:nth-child(3) {
  width: 15%;
}
th:nth-child(4) {
  width: 40%;
}
</style>
