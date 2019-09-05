<template>
  <section class="flex flex-col">
    <h1 class="text-header-jnj py-3">Bulk Export</h1>
    <div class="w-full bg-white rounded-xl p-4 my-4">
      <div class="text-sm">
        Lorem ipsum dolor sit amet, consectetur adi elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
      </div>
      <div class="text-gray-1 font-bold pt-4 pb-2">Duration</div>
      <select class="presentation-wizard-select p-3 w-full outline-gray-100">
        <option value="" selected>Select Here</option>
        <option class="p-4 rounded-md text-gray-450">
          incididunt ut labore et
        </option>
        <option class="p-4 rounded-md text-gray-450">
          incididunt ut labore et
        </option>
        <option class="p-4 rounded-md text-gray-450">
          incididunt ut labore et
        </option>
      </select>
      <div class="flex justify-between items-center mt-6 mb-6">
        <div class="w-6/12 mr-1">
          <div class="flex items-center border relative rounded">
            <input
              :name="startDate"
              class="rounded font-bold focus:outline-none mb-0 py-2 px-2 text-sm w-full text-grey-darker"
              type="date"
            />
            <label
              :for="startDate"
              class="absolute right-0 top-2 arrow-icon w-5 h-5 mr-2 pointer-events-none"
            >
              <SvgIcon class="arrow-icon w-5 h-5" name="picker" />
            </label>
          </div>
        </div>
        <div class="w-6/12">
          <div class="flex items-center border relative rounded">
            <input
              :name="endDate"
              class="rounded font-bold focus:outline-none mb-0 py-2 px-2 text-sm w-full text-grey-darker"
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
            />
            <label
              :for="endDate"
              class="absolute right-0 top-2 arrow-icon w-5 h-5 mr-2 pointer-events-none"
            >
              <SvgIcon class="arrow-icon w-5 h-5" name="picker" />
            </label>
          </div>
        </div>
      </div>
      <div
        class="w-full flex items-center border border-dark-yellow rounded-xl p-3 text-dark-yellow bg-lighted-yellow"
      >
        <SvgIcon class="w-5 h-5 mr-2" name="warning" />
        <div class="text-sm">Note: You can expert the range as ..</div>
      </div>
      <dp-button
        type="submit"
        text="Export"
        class="w-full text-white bg-accent-blue h-btn-builder min-h-btn-builder my-auto rounded-xl mt-6"
      />
    </div>
  </section>
</template>
<script>
import DpButton from '@/components/buttons/DpButton.vue'
export default {
  components: { DpButton },
  setup() {},
}
</script>
<style scoped lang="postcss">
::-webkit-calendar-picker-indicator {
  color: rgba(0, 0, 0, 0);
  -webkit-appearance: none;
  opacity: 0;
  position: absolute;
  right: 0px;
  z-index: 9;
}
.presentation-wizard-select {
  @apply text-base font-normal leading-relaxed py-3 outline-1 outline px-3 rounded-lg border-gray-50;
}
</style>
