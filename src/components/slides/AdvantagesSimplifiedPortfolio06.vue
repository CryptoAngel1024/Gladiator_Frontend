<template>
  <section class="h-full">
    <!-- content div header-->
    <div class="flex flex-col h-full">
      <slideHeader
        title="Advantages of a Simplified Portfolio"
        :sav-number="6"
        class="ml-16"
        name="SAV"
      />
      <!-- content body -->
      <div class="px-8 mb-6 ml-8 mr-8 text-left desc flex-4">
        <p class="text-2xl">
          EXAMPLE: Utilization/ASP comparison of DePuy Synthes and Stryker 3.5
          Cortex Screws, 12 mm as reported by
          <span class="text-black underline"
            >Decision Resource Group (2019)</span
          >
        </p>
      </div>
      <div class="flex flex-col pt-8">
        <div class="flex mb-28 pl-20">
          <div class="flex items-center mr-4">
            <img
              class="w-36 h-8"
              src="@/assets/images/slides/saving/striker.png"
              alt="striker logo"
            />
          </div>
          <div class="flex">
            <div
              class="h-full w-28 flex flex-wrap content-between text-xl font-bold mr-6"
            >
              <div>Usage<sup>1</sup></div>
              <div>List Price<sup>2</sup></div>
            </div>
            <div class="flex flex-col justify-center relative px-3">
              <div class="flex justify-center flex-col absolute -top-6 left-9">
                <div>0.1%</div>
                <div class="w-12 h-1 bg-black mx-auto"></div>
              </div>
              <div class="flex justify-center">
                <img
                  class="w-5 h-14"
                  src="@/assets/images/slides/saving/screw-1.jpg"
                  alt=""
                />
              </div>
              <div class="py-2 text-xs">
                <div class="font-bold text-xl">603012</div>
                Ti Self Tap Cortical <br />
                Screw 3.5x12mm
              </div>
              <div class="flex justify-center">
                <div class="px-4 py-2 bg-black text-white font-bold text-xl">
                  $49
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-center relative px-3">
              <div class="flex justify-center flex-col absolute -top-9 left-8">
                <div>0.1%</div>
                <div class="w-12 h-4 bg-black mx-auto"></div>
              </div>
              <div class="flex justify-center">
                <img
                  class="w-5 h-14"
                  src="@/assets/images/slides/saving/screw-1.jpg"
                  alt=""
                />
              </div>
              <div class="py-2 text-xs">
                <div class="font-bold text-xl">338612</div>
                SS Cortex screw <br />
                3.5x12mm
              </div>
              <div class="flex justify-center">
                <div class="px-4 py-2 bg-black text-white font-bold text-xl">
                  $59
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-center relative px-3">
              <div class="flex justify-center flex-col absolute -top-5 left-11">
                <div>0.11%</div>
                <div class="w-12 h-0.5 bg-red-600 mx-auto"></div>
              </div>
              <div class="flex justify-center">
                <img
                  class="w-5 h-14"
                  src="@/assets/images/slides/saving/screw-1.jpg"
                  alt=""
                />
              </div>
              <div class="py-2 text-xs">
                <div class="font-bold text-xl">104-3512</div>
                Cortex Screw Self Tap <br />
                T10 3.5x12MM
              </div>
              <div class="flex justify-center">
                <div class="px-4 py-2 bg-red-600 text-white font-bold text-xl">
                  $109
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-center relative px-3">
              <div class="flex justify-center flex-col absolute -top-8 left-8">
                <div>5%</div>
                <div class="w-12 h-3 bg-red-600 mx-auto"></div>
              </div>
              <div class="flex justify-center">
                <img
                  class="w-5 h-14"
                  src="@/assets/images/slides/saving/screw-1.jpg"
                  alt=""
                />
              </div>
              <div class="py-2 text-xs">
                <div class="font-bold text-xl">614812</div>
                Bone Screw T10 <br />
                3.5x12MM
              </div>
              <div class="flex justify-center">
                <div class="px-4 py-2 bg-red-600 text-white font-bold text-xl">
                  $159
                </div>
              </div>
            </div>

            <div class="flex flex-col justify-center relative px-3">
              <div class="flex justify-center flex-col absolute -top-10 left-7">
                <div>10%</div>
                <div class="w-12 h-5 bg-red-600 mx-auto"></div>
              </div>
              <div class="flex justify-center">
                <img
                  class="w-5 h-14"
                  src="@/assets/images/slides/saving/screw-1.jpg"
                  alt=""
                />
              </div>
              <div class="py-2 text-xs">
                <div class="font-bold text-xl">40-35012</div>
                Foot screw T10
                <br />
                3.5x12mm
              </div>
              <div class="flex justify-center">
                <div class="px-4 py-2 bg-red-600 text-white font-bold text-xl">
                  $160
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-center relative px-3">
              <div
                class="flex justify-center flex-col absolute -top-21 left-15"
              >
                <div>73%</div>
                <div class="w-12 h-16 bg-red-600 mx-auto"></div>
              </div>
              <div class="flex justify-center">
                <img
                  class="w-5 h-14"
                  src="@/assets/images/slides/saving/screw-1.jpg"
                  alt=""
                />
              </div>
              <div class="py-2 text-xs">
                <div class="font-bold text-xl">657412</div>
                Variax Bone Screw
                <br />
                T10 Full Thread 3.5x12mm
              </div>
              <div class="flex justify-center">
                <div class="px-4 py-2 bg-red-600 text-white font-bold text-xl">
                  $179
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-center relative px-3">
              <div class="flex justify-center flex-col absolute -top-7 left-9">
                <div>2%</div>
                <div class="w-12 h-2 bg-red-600 mx-auto"></div>
              </div>
              <div class="flex justify-center">
                <img
                  class="w-5 h-14"
                  src="@/assets/images/slides/saving/screw-1.jpg"
                  alt=""
                />
              </div>
              <div class="py-2 text-xs">
                <div class="font-bold text-xl">PLSS3512</div>
                Nonlocking screw
                <br />
                3.5x12mm
              </div>
              <div class="flex justify-center">
                <div class="px-4 py-2 bg-red-600 text-white font-bold text-xl">
                  $236
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex ml-4">
          <div class="flex items-center mr-4">
            <img class="w-52 h-14" src="@/assets/logo/logo_rgb.png" alt="" />
          </div>
          <div class="flex">
            <div
              class="h-full w-24 flex flex-wrap content-between text-xl font-bold mr-6"
            >
              <div>Usage</div>
              <div>List Price</div>
            </div>
            <div class="flex flex-col justify-center relative px-3">
              <div class="flex justify-center flex-col absolute -top-24 left-8">
                <div>93%</div>
                <div class="w-12 h-20 bg-blue-900 mx-auto"></div>
              </div>
              <div class="flex justify-center">
                <img
                  class="w-5 h-14"
                  src="@/assets/images/slides/saving/screw-2.png"
                  alt=""
                />
              </div>
              <div class="py-2 text-xs">
                <div class="font-bold text-xl">204.812</div>
                3.5 Cortex Screw <br />
                12MM
              </div>
              <div class="flex justify-center">
                <div class="px-4 py-2 bg-blue-900 text-white font-bold text-xl">
                  $42
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-center relative px-3">
              <div class="flex justify-center flex-col absolute -top-7 left-16">
                <div>7%</div>
                <div class="w-12 h-3 bg-blue-900 mx-auto"></div>
              </div>
              <div class="flex justify-center">
                <img
                  class="w-5 h-14"
                  src="@/assets/images/slides/saving/screw-2.png"
                  alt=""
                />
              </div>
              <div class="py-2 text-xs">
                <div class="font-bold text-xl">02.206.212</div>
                3.5 Low Profile Cortex Screw
                <br />
                12MM
              </div>
              <div class="flex justify-center">
                <div class="px-4 py-2 bg-blue-900 text-white font-bold text-xl">
                  $61
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col justify-end flex-1 px-4 mb-2 -mt-8 -ml-8 pr-8 text-right second-footer"
      >
        <p class="text-xs">
          1. Decision Resources Group– Trauma & Extremities 2019.
        </p>
        <p class="text-xs">2. Orthopedic News Network 2018.</p>
      </div>
      <slideFooter class="-mt-3 ml-8" :show-third-party-trade-mark="true" />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooter.vue'
import slideHeader from '@/components/slides/slideHeader.vue'

export default {
  components: { slideFooter, slideHeader },
}
</script>

<style scoped lang="postcss">
.title {
  color: #212121;
}

.desc {
  color: #63666a;
}
.second-footer p {
  color: #7f7f7f;
}
</style>
