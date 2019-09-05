<template>
  <section class="h-full">
    <div class="flex flex-col h-full pt-8 mr-2">
      <div class="flex justify-between px-12">
        <div class="flex">
          <h2 class="text-4xl font-bold text-slidColor-header ml-2">
            Power Tools for Trauma & Extremities
          </h2>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="flex px-12">
          <h2
            class="text-2xl text-slidColor-header text-left mt-2 mb-6 font ml-2"
            style="color: #63666a"
          >
            Power tool systems that cover multiple small bone applications with
            battery powered or corded power options available
          </h2>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-6">
        <div class="flex">
          <div class="vertical-bottom-top-text px-2 py-4 text-2xl"></div>
          <div class="text-left mr-10 ml-1">
            <p
              class="text-left mt-auto text-2xl font-bold mb-3 ml-9"
              style="color: #63666a"
            >
              Electric Pen Drive System & MIS Burrs
            </p>
            <p class="text-left mt-auto text-lg ml-9">
              One modular pen for drilling, burring, sawing, screw-driving and
              k-wire setting applications:
            </p>
            <ul class="list-disc text-lg ml-14 pr-5 w-full">
              <li class="text-black-500">
                <span class="text-black"
                  >Flexible options include irrigation and hand or foot control
                </span>
              </li>
              <li class="text-black-500">
                <span class="text-black"
                  >System Compatible with minimally invasive surgery (MIS)
                  techniques
                </span>
              </li>
              <li class="text-black-500">
                <span class="text-black">MIS offering: </span>
              </li>
              <ul
                id="secondary-list"
                class="list-disc text-lg pl-7 pr-5 w-full"
              >
                <li class="text-black-500">
                  <span class="text-black"
                    >Dedicated burr attachment with high torque and low speed
                  </span>
                </li>
                <li class="text-black-500">
                  <span class="text-black"
                    >Wedge Burrs and Shannon Burrs designed to shape and cut
                  </span>
                </li>
              </ul>
            </ul>
            <div class="flex justify-center mr-20">
              <img src="@/assets/images/ptte-1.png" class="scale-100" />
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="vertical-bottom-top-text px-2 py-4 text-2xl"></div>
          <div class="text-left mr-20">
            <p
              class="text-left mt-auto text-2xl font-bold mb-4"
              style="color: #63666a"
            >
              Small Battery Drive II System
            </p>
            <p class="text-left mt-auto text-lg">
              SBD II combines ergonomic design and suitable high power for Small
              Bone and Sports Medicine surgeries:
            </p>
            <ul class="list-disc text-lg ml-5 pr-5 w-full mr-10">
              <li class="text-black-500">
                <span class="text-black"
                  >One dedicated handpiece with drill, ream, saw, rotating and
                  k-wire attachments
                </span>
              </li>
              <li class="text-black-500">
                <span class="text-black"
                  >Aseptic batteries with option to sterilize with STERRAD and
                  VPRO systems</span
                >
              </li>
              <li class="text-black-500">
                <span class="text-black"
                  >All-in-one washing and sterilization basket for cleaning and
                  sterilization
                </span>
              </li>
            </ul>
            <div class="flex justify-center mr-16 mt-2">
              <img src="@/assets/images/ptte-2.1.png" class="scale-90" />
              <img src="@/assets/images/ptte-2.2.png" class="scale-90" />
            </div>
          </div>
        </div>
      </div>
      <slideFooter class="mb-2 footer pt-2" />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-1.vue'
export default {
  components: { slideFooter },
}
</script>

<style>
#secondary-list {
  list-style-type: circle;
}
.footer {
  padding-left: 66px;
  padding-right: 100px;
  padding-bottom: 34px;
}
</style>
