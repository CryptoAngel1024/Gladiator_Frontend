<template>
  <section class="h-full">
    <!-- content div header-->
    <div class="flex flex-col h-full">
      <div
        class="flex flex-row intro-header items-center justify-between gap-2 mb-8 px-4 max-h-36"
      >
        <h3
          class="max-h-12 leading-loose px-4 ml-8 font-extrabold text-4xl flex flex-4 items-center justify-start"
        >
          Unique Challenges Managing Orthopedic Trauma
        </h3>
        <slideHeader :sav-number="4" name="INTR" />
      </div>
      <!-- content body -->
      <div
        class="grid grid-cols-3 gap-x-4 mx-8 my-auto px-8 py-2 mb-0 justify-items-center"
      >
        <div class="top-box tb1" />
        <div class="top-box tb2" />
        <div class="top-box tb3" />
        <div class="larger-box flex flex-col gap-3">
          <div class="flex-1 m-3 gap-3 flex max-h-9 flex-row text-xl">
            <div class="frb">Large Level 1-2 Customer</div>
            <div class="frb">Acadamic Center</div>
            <div class="frb">Community Hospital</div>
            <div class="frb">ASC</div>
          </div>
          <div class="flex-1 flex flex-row">
            <div class="help flex-1 flex flex-row justify-center pb-8">
              <p
                class="w-16 h-16 my-auto text-center text-7xl shadow-xl rounded-full font-bold text-white"
              >
                ?
              </p>
            </div>
            <div class="flex-2 w-3/4 text-left">
              <ul class="list-disc leading-8 pb-4 text-lg">
                <li class="pb-3">
                  What challenges do you face in managing Trauma?
                </li>
                <li class="pb-3">
                  How do you manage the unpredictable case volume you face?
                </li>
                <li class="pb-3">
                  How does the number of vendors affect the complexity of
                  managing Trauma?
                </li>
                <li class="pb-3">
                  What approaches do you employ to evaluate Trauma spend?
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <slideFooter />
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
.tb1 {
  background: url('@/assets/images/slides/introduction/intro-4/pic1.png')
    no-repeat center center;
}
.tb2 {
  background: url('@/assets/images/slides/introduction/intro-4/pic2.png')
    no-repeat center center;
}
.tb3 {
  background: url('@/assets/images/slides/introduction/intro-4/pic3.png')
    no-repeat center center;
}
.larger-box {
  border-color: #6f6f6f;
  background-color: #f2f2f2;
  @apply mx-4 col-span-3 shadow-md border-2  w-full rounded-xl;
}

.top-box {
  @apply w-3/4 h-screen/5 rounded-md;
  background-size: cover;
  background-position: top;
  border-color: #6f6f6f;
}
.frb {
  @apply flex-1 h-full text-left leading-9 px-2 text-white;
  background-color: #a2803e;
}
.help p {
  background-color: #1e22aa;
  box-shadow: -8px 10px #888888;
}
</style>
