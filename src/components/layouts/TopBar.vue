<template>
  <app-icon
    v-if="showCollapsedSideMenu"
    class="absolute top-0"
    :class="showHambergerMenu ? 'left-20' : 'left-0'"
    data-test="topBar-api-icon"
  />
  <div :class="showCollapsedSideMenu ? 'pl-56' : 'ml-12'">
    <div
      class="border-b px-4 flex justify-between items-center h-16 border-l-0"
      :style="
        showHambergerMenu
          ? showSideNav
            ? 'margin-left: 0'
            : 'margin-left: 75px'
          : ''
      "
    >
      <!-- top bar left -->
      <div class="flex items-left flex-grow pr-2">
        <SvgIcon class="w-5 h-5 my-auto" name="search" />
        <input
          v-model.lazy="searchTerm"
          class="text-sm placeholder:text-gray-400 py-1 px-2 my-auto min-w-72 h-full flex-grow outline-gray-200"
          placeholder="Search ..."
          data-test="topBar-search-input-field"
        />
      </div>
      <div v-if="showPersentBtnOnTopBar" class="flex">
        <ResSidebar />
        <button
          class="border-red-700 items-center text-red-700 py-2 px-4 mr-3 border-2 rounded-lg h-12 min-w-28 text-center"
          :disabled="downloadingPdf"
          data-test="topBar-export-button"
          @click="generatePdf"
        >
          {{ downloadingPdf ? 'Exporting' : 'Export' }}
        </button>
        <dp-link-button
          v-if="previewUrl"
          target="_blank"
          :to="previewUrl"
          class="bg-accent-purple flex items-center text-white py-2 px-4 mr-3 border-accent-purple border-2 rounded-lg h-12 min-w-28"
          data-test="topBar-present-button"
        >
          <SvgIcon class="w-5 h-5 mr-2" name="preview" />
          Present
        </dp-link-button>
      </div>
      <!-- to bar right  -->
      <div v-else class="flex space-x-3 items-center pr-4 relative">
        <notification class="mr-2 my-auto" />
        <Avatar
          class="w-8 h-8 rounded-full"
          :email="$store.getters['auth/email']"
          :name="fullName"
        />

        <button
          data-test="logout-dropdown-button"
          class="flex"
          @click=";(showMenu = !showMenu), topNavNameRolTogGaLog()"
        >
          <div class="flex flex-col mr-2 text-left my-auto">
            <h1
              class="text-sm font-semibold leading-none text-gray-900 min-w-28"
            >
              {{ fullName }}
            </h1>
            <h1 class="text-xs leading-3 text-gray-400"></h1>
          </div>
          <svg-icon name="dropdownTriangle" class="w-3 h-5 pt-1 my-auto" />
        </button>
        <div class="absolute right-0 top-11 z-50 w-full">
          <nav-menu v-if="showMenu" class="shadow-xl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DpLinkButton from '@/components/buttons/DpLinkButton.vue'
import NavMenu from './LogOutDropDown.vue'
import Notification from './NotificationsList.vue'
import ResSidebar from '@/components/resources/ResSidebar.vue'
import appIcon from './appIcon.vue'
import SvgIcon from '@/components/utils/SvgIcon.vue'
import Avatar from '@/components/utils/s3/UserAvatar.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { gaEvent } from '@/utils/GA_Event.js'
import useShowHambergerMenu from './SideMenu/showHambergerMenu.js'

export default {
  components: {
    appIcon,
    DpLinkButton,
    SvgIcon,
    NavMenu,
    ResSidebar,
    Notification,
    Avatar,
  },
  props: {
    showSideNav: { type: Boolean, required: true },
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const showMenu = ref(false)

    onMounted(async () => {
      try {
        await store.dispatch('setting/fetchUser', false)
      } catch (err) {
        console.error('fetch User: ', err)
      }
    })

    const fullName = computed(
      () =>
        `${store.getters['setting/getFirstName'] || ''} ${
          store.getters['setting/getLastName'] || ''
        }`,
    )

    const { showCollapsedSideMenu, showHambergerMenu, showPersentBtnOnTopBar } =
      useShowHambergerMenu()

    const presentationId = computed(() => route.params.presentationId)
    const link = computed(() =>
      store.getters['link/getLinkByLinkId'](route.params.linkId),
    )
    const slideNumber = computed(() =>
      store.getters['rfps/enabledSlideNumber']({
        presentationId: presentationId.value,
        hyperLink: link.value?.hyperLink,
        clientName: link.value?.clientName,
        slideId: route.params.slideId,
      }),
    )

    const previewUrl = computed(() =>
      link.value || presentationId.value
        ? {
            name: link.value ? 'present' : 'slide',
            hash: `#/${slideNumber.value || 1}`,
            params: {
              hyperLink: link.value?.hyperLink.replace(' ', '-'),
              clientName: link.value?.clientName.replace(' ', '-'),
              presentationId: presentationId.value,
            },
          }
        : null,
    )

    const downloadingPdf = ref(false)

    async function generatePdf() {
      downloadingPdf.value = true
      await store.dispatch('link/generatePdf', {
        hyperLink: link.value?.hyperLink,
        clientName: link.value?.clientName,
        presentationId: presentationId.value,
      })
      downloadingPdf.value = false
    }

    const searchQuery = computed(() => route.query.search)
    const searchTerm = ref(searchQuery.value || '')
    watch(searchTerm, () =>
      router.push({ name: 'published', query: { search: searchTerm.value } }),
    )
    watch(searchQuery, () => {
      if (searchQuery.value !== searchTerm.value)
        searchTerm.value = searchQuery.value
    })

    const topNavNameRolTogGaLog = () => {
      gaEvent({
        action: `showMenu-dropdown-button-at-topNav-click`,
        event_category: 'dashboard',
        event_label: 'User-clicked-showMenu-dropdown-button-at-topNav',
      })
    }
    return {
      showMenu,
      showCollapsedSideMenu,
      showHambergerMenu,
      fullName,
      searchTerm,
      topNavNameRolTogGaLog,
      previewUrl,
      showPersentBtnOnTopBar,
      generatePdf,
      downloadingPdf,
    }
  },
}
</script>
