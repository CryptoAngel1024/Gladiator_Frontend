<template>
  <div class="pt-6 px-10">
    <ApiState
      v-if="customSlides.length === 0"
      :loading="loading"
      :error-message="errorMessage"
    />
    <table v-else class="w-full">
      <thead
        class="bg-gray-75 text-left text-xs font-bold tracking-wider w-full rounded-lg"
      >
        <tr>
          <th></th>
          <th>Slide Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody class="divide-y">
        <custom-slides-row
          v-for="slide in customSlides"
          :key="slide.slideInfoId"
          :slide="slide"
          :data-test="`slide-row-${slide.slideInfoId}`"
        />
      </tbody>
    </table>
  </div>
</template>
<script>
import CustomSlidesRow from './CustomSlidesRow.vue'
import { computed, ref, onMounted } from 'vue'
import ApiState from '@/components/utils/apiState.vue'
import { useStore } from 'vuex'

export default {
  components: { CustomSlidesRow, ApiState },
  setup() {
    const store = useStore()
    const errorMessage = ref('')
    const loading = ref(false)
    const customSlides = computed(
      () => store.getters['customSlide/allCustomSlides'],
    )

    onMounted(async () => {
      loading.value = true
      try {
        await store.dispatch('customSlide/fetchCustomSlidesByOwnerId')
      } catch (err) {
        console.error(err)
        errorMessage.value = err
      }
      loading.value = false
    })

    return {
      errorMessage,
      customSlides,
      loading,
    }
  },
}
</script>

<style scoped lang="postcss">
th {
  @apply py-3 text-base font-normal font-Arial;
}
th:last-child,
td:last-child {
  width: 200px;
}
</style>
