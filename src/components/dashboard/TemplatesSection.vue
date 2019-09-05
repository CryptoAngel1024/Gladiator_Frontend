<template>
  <div>
    <h1 class="text-header-jnj py-3" data-test="templates-title">Templates</h1>
    <base-card
      class="flex-col text-left border-none"
      card-style="px-0 bg-white"
    >
      <h1
        v-if="recentTemplates.length !== 0"
        class="bg-gray-50 px-5 py-1 font-medium text-sm text-gray-500"
      >
        Recently Used
      </h1>
      <ApiState
        v-if="recentTemplates.length + favorites.length === 0"
        :loading="loading"
        :error-message="errorMessage"
        data-type="templates"
      />
      <template-item
        v-for="(template, index) in recentTemplates"
        :key="index"
        :data-test="`recent-template-${index}`"
        :template="template"
        :class="{ 'border-b': index < recentTemplates.length - 1 }"
      />
      <h1
        v-if="favorites.length !== 0"
        class="font-medium text-sm text-gray-500 bg-gray-50 px-5 py-1"
      >
        Favorite
      </h1>
      <template-item
        v-for="(temp, index) in favorites"
        :key="index"
        :data-test="`favorite-template-${index}`"
        :template="temp"
        :class="{ 'border-b': index < favorites.length - 1 }"
      />
    </base-card>
  </div>
</template>

<script>
import BaseCard from '@/components/utils/container/BaseCard.vue'
import TemplateItem from '@/components/dashboard/TemplateItem.vue'
import ApiState from '@/components/utils/apiState.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components: {
    BaseCard,
    TemplateItem,
    ApiState,
  },

  setup() {
    const store = useStore()
    const route = useRoute()

    const recentTemplates = computed(() => {
      const allTemplates = store.getters['templates/recentlyUsedTemplates']
      return route.path !== '/dashboard'
        ? allTemplates
        : allTemplates.slice(0, 6)
    })

    const favorites = computed(() => {
      const allTemplates = store.getters['templates/favoriteTemplates']
      return route.path !== '/dashboard'
        ? allTemplates
        : allTemplates.slice(0, 6)
    })

    const errorMessage = ref('')
    const loading = ref(false)

    async function fetchTemplates() {
      try {
        errorMessage.value = ''
        loading.value = true
        await store.dispatch('templates/fetchTemplates', { page: 0, limit: 6 })
      } catch (err) {
        console.error('fetch Templates: ', err)
        errorMessage.value = `Loading Failed: ${
          err.message ||
          err.response?.statusText ||
          err.statusText ||
          err.status ||
          err
        }`
      }
      loading.value = false
    }

    onMounted(fetchTemplates)

    const department = computed(
      () => store.getters['setting/getCurrentDepartment'],
    )
    watch(department, fetchTemplates)

    return {
      recentTemplates,
      favorites,
      loading,
      errorMessage,
    }
  },
}
</script>
