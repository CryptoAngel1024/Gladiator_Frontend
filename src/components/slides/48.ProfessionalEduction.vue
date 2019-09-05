<template>
  <section class="h-full overflow-y-auto">
    <div class="flex flex-col h-full px-6 pt-6">
      <div class="flex justify-between">
        <div class="flex">
          <h2 class="text-4xl font-bold text-slidColor-header">
            Commitment to Professional Education
          </h2>
        </div>
        <slideHeader :sav-number="1" name="EDU" class="pt-0 pl-6 pr-2 py-3" />
      </div>
      <img
        src="@/assets/images/jnj_institute.png"
        class="max-w-max ml-auto mr-10 my-5"
      />
      <div class="grid grid-cols-3 gap-4">
        <div class="flex">
          <div
            class="vertical-bottom-top-text px-2 py-4 text-3xl text-white bg-red-700"
          >
            <p class="float-right">Physician Education</p>
          </div>
          <div class="text-left bg-gray-50">
            <ul class="list-disc text-2xl pl-7 pr-5 w-full">
              <li class="text-blue-500">
                <span class="text-black">National courses</span>
              </li>
              <li class="text-blue-500">
                <span class="text-black"
                  >Customized regionally based in-services, sawbones workshops
                  and courses</span
                >
              </li>
              <li class="text-blue-500">
                <span class="text-black"
                  >Customized programs delivered locally at lab facilities</span
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="flex">
          <div
            class="vertical-bottom-top-text px-2 py-4 text-3xl text-white bg-red-700"
          >
            <p class="float-right">Nurses and Allied Health</p>
          </div>
          <div class="text-left bg-gray-50">
            <ul class="list-disc text-2xl pl-7 pr-5 w-full">
              <li class="text-blue-500">
                <span class="text-black"
                  >Customized regionally based in-services, sawbones workshops
                  and courses</span
                >
              </li>
              <li class="text-blue-500">
                <span class="text-black"
                  >Nursing continuing education offerings</span
                >
              </li>
              <li class="text-blue-500">
                <span class="text-black"
                  >Central Sterile Processing in-services</span
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="flex">
          <div
            class="vertical-bottom-top-text px-2 py-4 text-3xl text-white bg-red-700"
          >
            <p class="float-right">Residents and Fellows</p>
          </div>
          <div class="text-left bg-gray-50">
            <ul class="list-disc text-2xl pl-7 pr-5 w-full">
              <li class="text-blue-500">
                <span class="text-black"
                  >Access to online education resources</span
                >
              </li>
              <li class="text-blue-500">
                <span class="text-black">Wound closure academy workshops</span>
              </li>
              <li class="text-blue-500">
                <span class="text-black"
                  >Regional sawbones and cadaver courses</span
                >
              </li>
              <li class="text-blue-500">
                <span class="text-black"
                  >Resident specific national courses
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p class="text-left mt-auto -mb-20">
        The professional education objective of training is to support the safe
        and effective use of company products in target procedures and
        techniques in accordance with the IFU.
      </p>
      <slideFooter class="mb-0" />
    </div>
  </section>
</template>

<script>
import slideFooter from './slideFooter.vue'
import slideHeader from '@/components/slides/slideHeader.vue'

export default {
  components: { slideFooter, slideHeader },
}
</script>

<style>
.vertical-bottom-top-text {
  writing-mode: vertical-rl;
  transform: rotate(-180deg);
}
</style>
