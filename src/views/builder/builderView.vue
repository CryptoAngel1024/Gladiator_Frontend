<template>
  <div class="w-full min-w-1040 px-7 pt-5">
    <builder-header />
    <div class="flex space-x-10 mt-2">
      <div v-if="!editIsDisallowed" class="w-1/4 min-w-72">
        <builder-side-bar />
      </div>
      <builder-body class="flex-grow" />
    </div>
  </div>
</template>

<script>
import BuilderHeader from '@/components/builder/wizardHeader.vue'
import BuilderSideBar from '@/components/builder/builderSideBar.vue'
import BuilderBody from '@/components/builder/builderBody.vue'
import { useRfpEditIsDisallowed } from '@/utils/useRfpEditIsDisabled.js'

export default {
  components: {
    BuilderHeader,
    BuilderSideBar,
    BuilderBody,
  },

  setup() {
    const { editIsDisallowed } = useRfpEditIsDisallowed()

    return {
      editIsDisallowed,
    }
  },
}
</script>
