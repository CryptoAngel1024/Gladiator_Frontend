<template>
  <section class="h-full">
    <div class="flex flex-col h-full pt-8 mr-2 text-left">
      <slideHeader
        title="MedJApp"
        sub-title="On-demand digital content for HCPs operating in a lower acuity setting"
      />
      <div class="grid grid-cols-4 -mt-6">
        <div class="flex col-span-1">
          <div class="vertical-bottom-top-text px-2 py-4 text-2xl"></div>
          <div class="ml-1">
            <p
              class="mt-auto text-2xl font-bold mb-3 ml-9"
              style="color: #63666a"
            >
              Access ASC Content
            </p>
            <ul
              class="flex flex-col gap-1 list-disc text-xl ml-14 pr-5 w-full text-accent-purple font-bold"
            >
              <li>ASC Speaker Series</li>
              <li>ASC Capabilities Workbook</li>
              <li>ASC Expert Podcast</li>
              <li>Brochures and Resources</li>
            </ul>
          </div>
        </div>
        <div class="grid grid-cols-2 col-span-3 h-">
          <div class="grid grid-cols-3 grid-rows-3 justify-center">
            <img
              src="@/assets/images/ASC/52-c2-1.png"
              class="col-span-1 scale-95 row-start-3 mb-3"
              alt="QR Code"
            />
            <a
              href="https://www.jnjmedicaldevices.com/en-US/service/asc-speaker-series"
              class="col-span-2 row-span-3"
              target="blank"
            >
              <img
                src="@/assets/images/ASC/52-c2-2.png"
                class="scale-95"
                alt="App Screenshot"
              />
            </a>
          </div>
          <div class="flex flex-col gap-2 mr-20">
            <p class="text-2xl font-bold mb-2 text-accent-purple">
              Download Directions:
            </p>
            <p class="mt-0 text-xl">
              <strong>Step 1:</strong> Download MedJ app or scan QR code below
            </p>
            <p class="text-xl">
              <strong>Step 2:</strong>
              Open app and select “Registration”
            </p>
            <div>
              <strong class="mt-auto text-xl">Step 3:</strong>
              <ul class="list-disc text-xl ml-5 pr-5 w-full mr-10 text-black">
                <li>Enter your email</li>
                <li>Create Password</li>
                <li>Enter “Myasc101”</li>
                <li>Select “Save”</li>
                <li>Enable notifications</li>
              </ul>
            </div>
            <div>
              <strong class="text-xl">Step 4:</strong>
              <ul class="list-disc text-xl ml-5 pr-5 w-full mr-10 text-black">
                <li>Refresh screen (pull down)</li>
                <li>Select “ASC Capabilities”</li>
              </ul>
            </div>
            <p class="text-xl">
              <strong>Step 5:</strong>
              Access Content
            </p>
          </div>
        </div>
      </div>
      <slideFooter class="mb-2 footer" />
    </div>
  </section>
</template>

<script>
import slideHeader from '@/components/slides/slideHeaderASC.vue'
import slideFooter from '@/components/slides/slideFooterASC-1.vue'
export default {
  components: { slideHeader, slideFooter },
}
</script>
