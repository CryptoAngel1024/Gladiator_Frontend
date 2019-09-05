<template>
  <div class="flex pt-6 pl-10 pr-32">
    <div class="flex-1 pr-6">
      <ApiState
        v-if="!editorBody"
        :loading="loading"
        :error-message="loadingError"
      />
      <editor
        v-if="editorBody"
        v-model="editorBody"
        api-key="no-api-key"
        :init="{
          height: 550,
          menubar: false,
          plugins: [],
          toolbar: '',
          content_style: '.forecolor { color: #1E22AA !important;}',
        }"
        class="border"
        data-test="email-body-editor"
      />
      <div v-if="editorBody" class="flex mt-5">
        <dp-button
          class="w-36 px-1 text-white bg-accent-blue py-2 border-accent-blue border-2 rounded-lg"
          text="Link tag"
          data-test="link-button"
          @click="linkTag(), linkTagGaLog()"
        />
        <dp-button
          class="w-36 ml-3 px-1 text-white bg-accent-blue py-2 border-accent-blue border-2 rounded-lg"
          text="Passcode tag"
          data-test="passcode-button"
          @click="passcodeTag(), passcodeTagGaLog()"
        />
      </div>
    </div>
    <section class="flex-1 pl-8">
      <header
        class="text-3xl font-bold text-secondary"
        data-test="instruction-header"
      >
        Instruction
      </header>
      <p class="text-base font-medium" data-test="instruction-body">
        <br />
        Use the area on the left to customize your Gladiator email template.
        This template is automatically updated with your customer's unique link
        tag and passcode tag when copied from a Published Link and pasted into
        an email.
        <br />
        <br />
        When adding a link tag or passcode tag, place your cursor where you
        would like to add it and click on the relevant tag button.
        <br />
        <br />
        {link}, also known as the link tag, represents each custom presentation
        hyperlink created for the customer. {passcode}, also known as the
        passcode tag, is the security code that is tied to each custom
        presentation hyperlink.
      </p>
    </section>
  </div>
  <div class="flex mt-15 justify-end pr-9 pb-1">
    <dp-button
      text="Cancel"
      class="w-36 bordered-dp-button px-3 mr-2 border rounded-xl font-bold text-center bg-gray-500 text-white"
      data-test="cancel-button"
      @click="cancelAtEmailBodyGaLog()"
    />
    <dp-button
      text="Save"
      class="w-36 ml-3 py-5 px-14 text-white bg-secondary h-btn-builder min-h-btn-builder my-auto rounded-xl"
      data-test="save-button"
      @click="save"
    />
  </div>
  <div class="flex justify-end">
    <p v-if="successMessage" class="w-full text-emerald-400 text-right mr-9">
      {{ successMessage }}
    </p>
    <ErrorBanner :message="errorMessage" class="ml-auto mr-0 mt-2" />
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import Editor from '@tinymce/tinymce-vue'
import ErrorBanner from '@/components/utils/ErrorBanner.vue'
import ApiState from '@/components/utils/apiState.vue'
import DpButton from '../buttons/DpButton.vue'
import { useStore } from 'vuex'
import { computed, onMounted, watch } from '@vue/runtime-core'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: { DpButton, editor: Editor, ErrorBanner, ApiState },
  setup() {
    const store = useStore()
    const successMessage = ref('')
    const errorMessage = ref('')
    const loadingError = ref('')
    const loading = ref(true)
    const emailBody = computed(() => store.getters['setting/emailBody'])

    const editorBody = ref(emailBody.value)

    watch(emailBody, () => {
      editorBody.value = emailBody.value
    })

    watch(editorBody, () =>
      store.commit('setting/setEmailBody', editorBody.value),
    )

    onMounted(async () => {
      loading.value = true
      try {
        await store.dispatch('setting/fetchUser', false)
      } catch (err) {
        console.error(err)
        loadingError.value = `Fail to fetch User: ${
          err.message ||
          err.response?.statusText ||
          err.statusText ||
          err.status ||
          err
        }`
      }
      loading.value = false
    })

    const linkTagGaLog = () => {
      gaEvent({
        action: 'account-setting-email-body-link-tag-button-click',
        event_category: 'setting',
        event_label: 'User-clicked-account-setting-email-body-link-tag-button',
      })
    }
    const passcodeTagGaLog = () => {
      gaEvent({
        action: 'account-setting-email-body-passcode-tag-button-click',
        event_category: 'setting',
        event_label:
          'User-clicked-account-setting-email-body-passcode-tag-button',
      })
    }
    const cancelAtEmailBodyGaLog = () => {
      gaEvent({
        action: 'account-setting-email-body-cancle-button-click',
        event_category: 'setting',
        event_label: 'User-clicked-account-setting-email-body-cancle-button',
      })
    }

    return {
      successMessage,
      errorMessage,
      editorBody,
      loading,
      loadingError,
      linkTagGaLog,
      passcodeTagGaLog,
      cancelAtEmailBodyGaLog,
    }
  },
  methods: {
    linkTag() {
      this.insertLink(
        '<span class="forecolor">{link}</span><span>&nbsp;</span>',
      )
    },
    passcodeTag() {
      this.insertLink(
        '<span class="forecolor">{passcode}</span><span>&nbsp;</span>',
      )
    },
    insertLink(link) {
      // eslint-disable-next-line no-undef
      tinymce.activeEditor.execCommand('mceInsertContent', false, link)
    },
    async save() {
      this.loading = true
      try {
        this.successMessage = ''
        this.errorMessage = ''
        await this.$store.dispatch('setting/updateUser', {
          emailBody: this.editorBody,
        })
        this.successMessage = 'Successfully updated'
        this.loading = false
      } catch (err) {
        console.error('Update Failed: ', err)
        this.errorMessage = `Update Failed: ${
          err.message || err.response?.statusText || err
        }`
        this.loading = false
      }
    },
  },
}
</script>

<style>
.tox-notifications-container {
  display: none !important;
}
.tox-statusbar {
  display: none !important;
}
.tox-tinymce {
  border: 1px solid #e2e2ea !important;
  border-radius: 10px !important;
}
</style>
