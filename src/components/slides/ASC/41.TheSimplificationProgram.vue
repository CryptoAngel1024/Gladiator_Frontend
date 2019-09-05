<template>
  <section class="learnmore h-full">
    <div class="flex h-full flex-col pt-6 font-Arial mx-14">
      <h2 class="text-4xl font-bold text-left mt-2">
        The Simplification Program
      </h2>
      <h2 class="text-2xl text-left mt-4 mb-6 font" style="color: #63666a">
        Solutions aimed to optimize your ASC's workflow
      </h2>
      <div class="grid grid-cols-2">
        <div>
          <p class="text-3xl text-left font-bold" style="color: #63666a">
            The Problem
          </p>
          <ul class="list-disc text-left text-xl ml-5 mt-2 leading-7">
            <li>
              Multiple instrument sets increase
              <b>
                reprocessing <br />
                costs
              </b>
              and <b> OR turnaround time </b>
            </li>
            <li>
              <b> Inventory Management complexities </b> impact <br />
              availability of instrument sets
            </li>
            <li>
              <b> Negative </b> impact to <b> efficiency </b> and
              <b> costs </b>
            </li>
          </ul>
          <img
            src="@/assets/images/ASC/downward_arrow.png"
            class="w-12 ml-6 mt-4"
            alt="Down Arrow"
          />
          <a
            href="https://interactive.basecase.com/#/summary/40735"
            target="_blank"
          >
            <img
              src="@/assets/images/ASC/41-2-1-1.png"
              class="w-72 ml-4 mt-2"
              alt="Tablet"
            />
          </a>
        </div>
        <div>
          <p class="text-3xl text-left font-bold" style="color: #63666a">
            Our Solution
          </p>
          <p class="text-xl text-left font-bold" style="">
            The Simplification Program
          </p>
          <div class="grid grid-cols-2">
            <div class="text-xl">
              <div class="flex flex-row mt-2">
                <img
                  src="@/assets/images/ASC/41-cog.png"
                  class="w-7 mb-2"
                  alt="Cog"
                />
                <p class="ml-3">Operational Efficiency</p>
              </div>
              <div class="flex flex-row">
                <img
                  src="@/assets/images/ASC/41-checklist.png"
                  class="w-7 mb-2"
                  alt="Checklist"
                />
                <p class="mt-2 ml-3">Procedural Solutions</p>
              </div>
              <div class="flex flex-row">
                <img
                  src="@/assets/images/ASC/41-dollar.png"
                  class="w-7"
                  alt="Dollar"
                />
                <p class="mt-1 ml-3">Understanding Costs</p>
              </div>
            </div>
            <div>
              <img
                src="@/assets/images/ASC/downward_arrow.png"
                class="w-12 ml-4 -mt-20 -mb-2"
                alt="Down Arrow"
              />
              <a
                href="https://dpslighthousecommunity.jnj.com/s/resource/a2i3g000000YXf1AAG/simplifcation-brochure"
                target="_blank"
              >
                <img
                  src="@/assets/images/ASC/41-1-2-1.0.png"
                  class="w-36 ml-5 mt-4 -mb-2"
                  alt="Brochure"
                />
              </a>
              <p
                class="text-left ml-14 font-bold text-lg"
                style="color: #63666a"
              >
                Brochure
              </p>
            </div>
          </div>
          <p class="text-xl text-left font-bold mt-4 leading-tight">
            Use the Budget Impact Model to estimate the <br />
            potential cost savings your ASC could realize by using <br />
            DePuy Synthes' suite of integrated solutions, including:
          </p>
          <ul class="list-disc text-left text-2xl ml-6 mt-2">
            <li>Universal Small Fragment System</li>
            <li>Reusable Sterilization Container System</li>
            <li>Inventory Management Solutions</li>
            <li>Inventory Right-Sizing Programs</li>
          </ul>
        </div>
      </div>
      <slideFooter />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-1-updated.vue'
export default {
  components: { slideFooter },
}
</script>

<style scoped>
.learnmore {
  background: url('@/assets/images/ASC/Learn_More_Arrow.png') no-repeat;
  background-size: 150px;
  background-position: right 5% top 1%;
}
</style>
