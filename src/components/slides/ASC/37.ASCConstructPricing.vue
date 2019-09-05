<template>
  <section class="running h-full">
    <div class="flex flex-col pt-6 font-Arial mx-14">
      <h2 class="text-left text-4xl font-bold mt-2">
        ASC Construct Pricing | Mitek Sports Medicine
      </h2>
      <h2 class="text-2xl text-left mt-4 mb-5 font" style="color: #63666a">
        DePuy Synthes Pro-Pak<sup>®</sup> Preselected Procedure Constructs
      </h2>
      <div class="grid grid-cols-2 mb-20">
        <div class="text-left mt-20 -mr-20">
          <h2 class="text-2xl text-left mb-7 leading-tight -mr-20">
            <b> One market relevant total construct price </b> vs. line item
            pricing <br />
            that may vary depending on what is used in the procedure
          </h2>
          <h2
            class="text-2xl text-left mt-4 mb-8 font -mt-3"
            style="color: #63666a"
          >
            <b>
              Provide your ASC with <br />
              Consistency, Predictability, and Value</b
            >
          </h2>
          <h2 class="text-xl text-left mb-2 font -mt-3">
            <b>
              Procedure-based constructs designed to meet your <br />
              procedural needs. Constructs include:</b
            >
          </h2>
          <ul class="list-disc text-lg ml-4 leading-tight">
            <li>
              Arthroscopic shoulder procedures (rotator cuff, instability)
            </li>
            <li>Arthroscopic knee procedures (ACL, PCL, meniscus)</li>
            <li>Surgical disposables</li>
            <li>Capital disposables</li>
          </ul>
        </div>
        <div
          class="image flex flex-col mr-8 mt-36 ml-12 grid grid-cols-2 -mb-20"
        >
          <div>
            <img
              class="w-200 mt-14 ml-14"
              src="@/assets/images/ASC/37-1-1-1.png"
              alt="Shoulder Repairs"
            />
            <h2
              class="font-bold text-xl text-left mt-11 ml-14"
              style="color: #63666a"
            >
              Shoulder Repairs
            </h2>
          </div>
          <div class="ml-12">
            <a
              href="https://www.jnjmedicaldevices.com/en-US/procedure/anterior-cruciate-ligament-reconstruction-acl-soft-tissue"
              target="_blank"
            >
              <img
                class="w-200 mt-12"
                src="@/assets/images/ASC/37-1-1-2.png"
                alt="ACL Reconstruction"
              />
            </a>
            <h2
              class="font-bold text-xl text-left mt-5 -ml-5"
              style="color: #63666a"
            >
              ACL Reconstruction
            </h2>
          </div>
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
.image {
  background: url('@/assets/images/ASC/37-gray-background.png') no-repeat;
  background-size: 100%;
  width: 550px;
}

.running {
  background: url('@/assets/images/ASC/35-banner.png') no-repeat;
  background-size: 400px;
  background-position: right top;
}
</style>
