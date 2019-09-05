<template>
  <form
    class="flex flex-col py-10 pl-14 items-start w-96"
    @submit.prevent="saveLink"
  >
    <h1 class="text-4xl font-medium text-gray-900" data-test="custom-name">
      {{ customerName }}
    </h1>
    <div v-if="isUpdate" class="w-full">
      <h6 class="text-sm font-light leading-none text-gray-800 mt-4 mb-2">
        Select Link
      </h6>
      <select
        v-model="activeLinkId"
        data-test="link-selector"
        class="border border-gray-300 rounded-md w-full text-gray-600 py-4 px-3 bg-white hover:border-gray-400 focus:outline-none appearance-none"
        @change="selectLink()"
      >
        <option
          v-for="linkItem in links"
          :key="linkItem.id"
          :data-test="`linkItem-name-${linkItem.id}`"
          :value="linkItem.id"
        >
          {{ linkItem.linkName }}
        </option>
      </select>
      <p class="opacity-50 text-xs font-book tracking-wide text-gray-600 pt-4">
        Last updated on {{ link.updatedOn || '...' }}
      </p>
      <router-link
        :to="activeLinkpath"
        data-test="active-link"
        class="text-gray-400 flex space-x-2 items-center"
        target="_blank"
      >
        <span class="truncate" :title="activeLinkFullUrl">
          {{ activeLinkFullUrl }}
        </span>
        <SvgIcon class="h-4 w-4 mr-2 my-auto" name="link" />
      </router-link>
      <div class="flex flex-col w-full my-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="opacity-50 text-xs tracking-wide text-gray-600">
              Passcode
            </p>
            <p
              class="text-sm font-bold tracking-wide text-gray-800"
              data-test="passCode-value"
            >
              {{ link.passCode }}
            </p>
          </div>
          <button
            type="button"
            data-test="copy-passcode-button"
            class="focus:outline-none focus:ring focus:border-gray-425"
            @click="copyPassCode"
          >
            <SvgIcon class="w-5 h-5" name="slide-copy" />
          </button>
        </div>
        <button
          type="button"
          data-test="copy-email-body-button"
          class="mx-auto my-3 p-2.5 border rounded-lg border-gray-500 opacity-50 text-xs tracking-wide text-gray-600"
          @click="copyEmailBody"
        >
          Copy Email Body
        </button>
      </div>
    </div>
    <div v-else class="w-full">
      <h6 class="text-sm font-light leading-none text-gray-800 mt-4 mb-2">
        Name Link
      </h6>
      <input
        v-model="link.linkName"
        required
        data-test="linkName-input"
        class="border border-gray-300 rounded-md w-full text-gray-600 py-4 px-3 bg-white hover:border-gray-400 focus:outline-none appearance-none"
        :disabled="editIsDisallowed"
      />

      <h5 class="font-medium text-black pt-4">Hyperlink</h5>
      <div class="flex items-center space-x-2">
        <span class="text-gray-425 truncate" :title="linksUrlBase">
          {{ linksUrlBase }}
        </span>
        <input
          v-model="link.hyperLink"
          required
          class="py-3 pl-2 rounded-r border w-28"
          data-test="hype-link-input"
          placeholder="Hyperlink"
          :disabled="editIsDisallowed"
        />
      </div>
      <p class="text-xs leading-none text-indigo-600 mt-8 mb-5">
        Note : The link name is only for your reference it won’t show up on
        client side
      </p>
    </div>

    <dp-button
      type="submit"
      :text="isUpdate ? 'Update link' : 'Create link'"
      data-test="submit-btn"
      class="w-full py-3 font-semibold rounded text-white bg-secondary"
      :class="[
        saveLinkInprogress ? 'opacity-50' : '',
        !isAscLogin
          ? 'bg-gradient-to-r from-primary-grad-from to-primary-grad-to'
          : '',
      ]"
      :disabled="editIsDisallowed"
    />
    <dp-link-button
      v-if="isUpdate && !editIsDisallowed"
      text="Create new link"
      class="py-7 font-medium underline rounded self-center"
      :to="{
        name: 'create-link',
        params: {
          presentationId: link.presentationId || presentationId,
        },
      }"
    />
    <error-banner :message="errMessage" />
  </form>
</template>
<script>
import { ref } from '@vue/reactivity'
import DpButton from '@/components/buttons/DpButton.vue'
import DpLinkButton from '@/components/buttons/DpLinkButton.vue'
import ErrorBanner from '@/components/utils/ErrorBanner.vue'
import { computed, watch } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useRfpEditIsDisabled } from '@/utils/useRfpEditIsDisabled.js'
import { formatDate } from '@/utils/formatDate'
import { copyHtmlString } from '@/utils/strings'
import { isAscDepartment } from '@/utils/departments.js'

export default {
  components: { DpButton, DpLinkButton, ErrorBanner },
  props: {
    slides: { type: Array, required: true },
  },
  setup(props) {
    const saveLinkInprogress = ref(false)
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const errMessage = ref('')

    const isAscLogin = isAscDepartment()

    const presentationId = computed(() => route.params.presentationId)

    const links = computed(() =>
      store.getters['link/getLinksByPresentationId'](presentationId.value),
    )

    const customerName = computed(() =>
      store.getters['rfps/getCustomerNameByPresentationId'](
        presentationId.value,
      ),
    )

    const activeLink = computed(() => {
      const link =
        links.value?.find((link) => link.id == route.params.linkId) || {}
      return {
        ...link,
        updatedOn: link.updatedDate ? formatDate(link.updatedDate) : '',
      }
    })
    const emailBody = computed(() =>
      store.getters['setting/populatedEmailBody'](activeLink.value),
    )

    const activeLinkId = ref(activeLink.value.id)

    const link = ref(JSON.parse(JSON.stringify(activeLink.value)))

    const linksUrlBase = computed(
      () =>
        `${window.location.origin}/${
          route.params.department
        }/present/${customerName.value?.replace(' ', '-')}/`,
    )
    const activeLinkFullUrl = computed(() =>
      activeLink.value.hyperLink
        ? `${linksUrlBase.value}${activeLink.value.hyperLink}`
        : '',
    )
    const activeLinkpath = computed(
      () =>
        `/${route.params.department}/present/${customerName.value?.replace(
          ' ',
          '-',
        )}/${activeLink.value.hyperLink}`,
    )
    const saveLink = async () => {
      saveLinkInprogress.value = true

      const linkSlides = props.slides
        .filter((slide) => slide.isEnabled)
        .map((slide) => {
          return { isStarred: slide.isStarred, slideInfoId: slide.slideInfoId }
        })

      link.value.linkSlides = linkSlides
      link.value.presentationId = presentationId.value
      link.value.linkType = 'FOR_HOSPITALS'
      link.value.passCode = link.value.id
        ? link.value.passCode
        : Math.random().toString(36).slice(-8)
      link.value.linkId = link.value.id

      try {
        errMessage.value = ''
        const publishedLink = await store.dispatch(
          'link/publishLink',
          link.value,
        )

        const isNewLink = Boolean(!link.value.id)
        if (!isNewLink) {
          await store.dispatch('rfps/syncLink', publishedLink.id)
        }
        router.push({
          name: 'update-link',
          params: {
            linkId: publishedLink.id,
            presentationId: presentationId.value,
          },
        })
      } catch (err) {
        errMessage.value = err.message || err
      }
      saveLinkInprogress.value = false
    }
    watch(
      () => activeLink.value,
      (newValue) => {
        link.value = JSON.parse(JSON.stringify(newValue))
        activeLinkId.value = newValue.id
      },
    )

    const selectLink = () => {
      const selectedLink = links.value.find(
        (linkItem) => linkItem.id == activeLinkId.value,
      )
      link.value = JSON.parse(JSON.stringify(selectedLink))
      router.push({
        name: 'update-link',
        params: {
          linkId: selectedLink.id,
          presentationId: presentationId.value,
        },
      })
    }

    const isUpdate = computed(() => route.params.linkId)
    const copyEmailBody = () => {
      copyHtmlString(emailBody.value)
    }
    const copyPassCode = () => {
      navigator.clipboard.writeText(link.value.passCode)
    }
    const editIsDisallowed = useRfpEditIsDisabled(true)
    return {
      link,
      isUpdate,
      saveLinkInprogress,
      errMessage,
      links,
      activeLinkId,
      saveLink,
      selectLink,
      linksUrlBase,
      activeLinkFullUrl,
      activeLinkpath,
      customerName,
      copyEmailBody,
      copyPassCode,
      editIsDisallowed,
      presentationId,
      isAscLogin,
    }
  },
}
</script>
