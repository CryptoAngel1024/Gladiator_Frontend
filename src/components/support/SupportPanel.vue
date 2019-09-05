<template>
  <div class="flex flex-col">
    <h1 class="text-header-jnj text-primary">Support</h1>
    <h3 class="mt-4 text-base font-bold text-gray-500">Reason To Contact</h3>
    <div class="flex mt-2 space-x-12">
      <div class="flex space-x-2 justify-center items-center">
        <input
          id="yes"
          v-model="supportDetail.reason"
          value="yes"
          type="radio"
          class="presentation-wizard-radio checked:bg-primary"
        />
        <label for="Yes" class="text-nromal text-gray-450">Bug</label>
      </div>
      <div class="flex space-x-2 justify-center items-center">
        <input
          id="no"
          v-model="supportDetail.reason"
          value="no"
          type="radio"
          class="presentation-wizard-radio checked:bg-primary"
        />
        <label for="No" class="text-normal text-gray-450">Feedback</label>
      </div>
    </div>
    <h3 class="mt-6 text-base font-bold text-gray-500">Subject</h3>
    <input
      v-model="supportDetail.subject"
      placeholder="Type Something here ..."
      class="w-1/3 border p-4 rounded-md h-14 my-2"
    />
    <h3 class="mt-6 text-base font-bold text-gray-500">Message body</h3>
    <textarea
      v-model="supportDetail.body"
      placeholder="Type Something here ..."
      class="w-2/3 border p-4 rounded-md h-32 my-1"
    />
    <h3 class="mt-6 text-base font-bold text-gray-500">Attached Pic</h3>
    <div class="flex w-48 mt-2 h-28 items">
      <label
        class="flex flex-col items-center w-40 tracking-wide border-2 border-dashed rounded-lg cursor-pointer"
        :class="supportDetail.picture ? '' : 'px-14 py-6'"
      >
        <input
          id="supportDetail_picture"
          ref="imgInput"
          class="hidden"
          type="file"
          accept="image/*"
          data-model="supportDetail.picture"
          name="supportDetail_picture"
          @input="pickFile($event.target.files)"
        />
        <p
          v-show="!supportDetail.picture"
          class="text-5xl tracking-wide text-gray-500"
        >
          +
        </p>
        <img
          v-show="supportDetail.picture"
          :src="`${supportDetail.picture}`"
          class="object-contain w-full h-24 rounded-lg"
        />
      </label>
    </div>
    <p v-if="status == 'SUCCESS'" class="text-emerald-500">Succeeded</p>
    <p v-if="status == 'FAIL'" class="text-red-500">An error occurred</p>
    <div class="flex mt-12 justify-start pb-16">
      <dp-button
        text="Submit"
        class="w-36 py-5 px-14 text-white bg-secondary h-btn-builder min-h-btn-builder my-auto rounded-xl"
        @click="submit"
      />
    </div>
  </div>
</template>
<script>
import DpButton from '../buttons/DpButton.vue'
import { mapMutations } from 'vuex'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'

export default {
  components: { DpButton },
  data() {
    return {
      store: useStore(),
      status: computed(() => this.store.getters['support/getStatus']),
      supportDetail: {
        reason: '',
        subject: '',
        body: '',
        picture: '',
      },
    }
  },
  watch: {
    supportDetail: {
      handler(val) {
        this.setSupportDetail(val)
      },
      deep: true,
      immediate: false,
    },
  },
  methods: {
    ...mapMutations({ setSupportDetail: 'support/setDetail' }),

    pickFile(files) {
      if (files && files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.supportDetail.picture = e.target.result
        }
        reader.readAsDataURL(files[0])
      }
    },

    submit() {
      this.store.dispatch('support/contactSupport', this.supportDetail)
    },
  },
}
</script>
