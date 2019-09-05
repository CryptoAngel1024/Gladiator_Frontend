<template>
  <div class="flex justify-between items-center">
    <div class="">
      <h1
        data-test="page-title"
        class="text-left text-2xl font-medium text-emerald-900"
      >
        {{ customerName }} Presentation Deck
      </h1>
      <headerBreadCrumps
        data-test="header-bread-crumps-page-name-newRfp"
        :page-name="presentationId ? pageTitle : 'New Presentation'"
        :links="
          presentationId
            ? [
                {
                  name: 'Update Presentation',
                  path: {
                    name: 'update-presentation',
                    params: {
                      presentationId,
                      step: 1,
                      subStep: 1,
                    },
                  },
                },
              ]
            : []
        "
      />
    </div>
    <div class="flex">
      <dp-link-button
        v-if="isBuilder"
        :to="{
          name: 'create-link',
          params: {
            presentationId: presentationId,
          },
        }"
        class="bg-transparent flex items-center text-accent-blue py-2 px-4 mr-3 border-accent-blue border-2 rounded-lg h-btn-builder min-h-btn-builder my-auto"
        data-test="generate-link"
      >
        <SvgIcon class="w-4 h-4 mr-2" name="link" />
        Generate Link
      </dp-link-button>

      <dp-link-button
        v-if="isBuilder || isCreatLink"
        :to="{ name: 'dashboard' }"
        class="bg-red-600 flex items-center text-white py-2 px-4 border-red-600 border-2 rounded-lg h-btn-builder min-h-btn-builder my-auto"
        data-test="exit-edit-mode"
      >
        <SvgIcon class="w-3 h-3 mr-2" name="times" />
        Exit edit mode
      </dp-link-button>
    </div>
  </div>
</template>

<script>
import DpLinkButton from '@/components/buttons/DpLinkButton.vue'
import headerBreadCrumps from '@/components/utils/headerBreadCrumps.vue'
import { useRoute } from 'vue-router'
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import useAllRfpSteps from '@/data/allRfpSteps.js'

export default {
  components: {
    DpLinkButton,
    headerBreadCrumps,
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const isBuilder = computed(() => route.name === 'builder')

    const isCreatLink = computed(
      () => route.name === 'create-link' || route.name === 'update-link',
    )
    const presentationId = computed(() => route.params.presentationId)
    const customerName = computed(() =>
      store.getters['rfps/getCustomerNameByPresentationId'](
        presentationId.value,
      ),
    )

    const { rfpStepPageName } = useAllRfpSteps()

    const pageTitle = computed(() =>
      isCreatLink.value
        ? 'Links'
        : isBuilder.value
        ? 'Edit Slides'
        : rfpStepPageName.value,
    )
    return { isBuilder, isCreatLink, presentationId, pageTitle, customerName }
  },
}
</script>
