<template>
  <page-wrapper title="">
    <builder-header />
    <base-card
      class="min-h-screen border-none rounded-3xl py-7 divide-x justify-between w-full"
    >
      <div class="flex flex-col mt-8 w-full">
        <router-link
          class="flex space-x-4 items-center mr-auto"
          data-test="link-arrow"
          :to="{
            name: 'builder',
            params: {
              presentationId,
              slideId: lastBuilderPage,
            },
          }"
        >
          <SvgIcon name="left_arrow_2" class="text-primary w-6 h-6" />
          <h1 class="text-primary text-2xl font-medium">Presentation</h1>
        </router-link>
        <div
          v-if="rfpLinks?.length > 0"
          class="flex border-y space-x-4 items-center w-full pr-2 mt-8"
          data-test="created-links-bar"
        >
          <div class="flex overflow-x-auto flex-grow">
            <router-link
              v-for="link in rfpLinks"
              :key="link.linkId"
              :data-test="`link-item-${link.id}`"
              :to="{
                name: 'update-link',
                params: {
                  linkId: link.id,
                  presentationId: link.presentationId,
                },
              }"
              class="py-3 px-3 whitespace-nowrap"
              :class="
                activeLink?.id === link.id
                  ? 'bg-accent-blue text-white'
                  : 'bg-white text-gray-875'
              "
            >
              {{ link.linkName }}
            </router-link>
          </div>
          <dp-button
            text="+"
            data-test="create-New-Link-Button"
            class="bg-primary h-10 flex items-center text-2xl rounded-lg text-white"
            :disabled="editIsDisallowed"
            @click="createNewLink"
          />
        </div>
        <div class="flex w-full border-b">
          <router-link
            class="starred-tab-switcher"
            :to="{
              name: linkId ? 'update-link' : 'create-link',
              params: linkId
                ? {
                    presentationId,
                    linkId,
                  }
                : { presentationId },
            }"
          >
            All
          </router-link>
          <router-link
            class="starred-tab-switcher"
            :to="{
              name: linkId ? 'update-link-starred' : 'create-link-starred',
              params: linkId
                ? {
                    presentationId,
                    linkId,
                  }
                : { presentationId },
            }"
          >
            Starred
          </router-link>
        </div>
        <slide-items-group
          v-for="category in categories"
          :key="category"
          :category-slides="slidesByCategory[category]"
          :category="category"
        />
      </div>
      <link-form :slides="slides" data-test="link-form" />
    </base-card>
  </page-wrapper>
</template>

<script>
import BaseCard from '@/components/utils/container/BaseCard.vue'
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import LinkForm from '@/components/newRfp/LinkForm.vue'
import SlideItemsGroup from '@/components/newRfp/SlideItemsGroup.vue'
import builderHeader from '@/components/builder/wizardHeader.vue'
import DpButton from '@/components/buttons/DpButton.vue'
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useRfpEditIsDisallowed } from '@/utils/useRfpEditIsDisabled.js'
import { groupSlides, getCategories } from '@/data/allSlides.js'

export default {
  components: {
    PageWrapper,
    BaseCard,
    builderHeader,
    LinkForm,
    DpButton,
    SlideItemsGroup,
  },

  setup() {
    const store = useStore()
    const route = useRoute()

    const presentationId = computed(() => route.params.presentationId)
    const linkId = computed(() => route.params.linkId)

    const presentation = computed(() =>
      store.getters['rfps/getPresentationById'](presentationId.value),
    )
    const rfpLinks = computed(() =>
      store.getters['link/getLinksByPresentationId'](presentationId.value),
    )

    onMounted(() => {
      store.dispatch('rfps/getMyRfpbyId', presentationId.value)
      store.dispatch('link/fetchRfpLinks', presentationId.value)
    })

    watch(presentationId, () => {
      store.dispatch('rfps/getMyRfpbyId', presentationId.value)
      store.dispatch('link/fetchRfpLinks', presentationId.value)
    })

    const activeLink = computed(() =>
      rfpLinks.value?.find((link) => link.id == route.params.linkId),
    )

    const slides = computed(() =>
      JSON.parse(
        JSON.stringify(
          activeLink.value?.slides || presentation.value?.slides || [],
        ),
      ),
    )

    const slidesByCategory = computed(() => groupSlides(slides.value))
    const categories = computed(() => getCategories(slides.value))

    const router = useRouter()
    const createNewLink = () => {
      router.push({
        name: 'create-link',
        params: {
          presentationId: presentationId.value,
        },
      })
    }
    const { editIsDisallowed } = useRfpEditIsDisallowed()

    const lastBuilderPage = computed(() =>
      store.getters['rfps/getLastBuilderPage'](presentationId.value),
    )
    return {
      rfpLinks,
      activeLink,
      slides,
      createNewLink,
      editIsDisallowed,
      presentationId,
      categories,
      slidesByCategory,
      lastBuilderPage,
      linkId,
    }
  },
}
</script>

<style scoped lang="postcss">
.starred-tab-switcher {
  @apply py-3 w-1/6 font-Arial text-center text-gray-800;
}
.starred-tab-switcher.router-link-active {
  @apply text-black border-b-2 border-primary;
}
</style>
