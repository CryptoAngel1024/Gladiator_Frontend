<template>
  <section class="running h-full">
    <div class="flex flex-col mx-14 font-Arial pt-6">
      <h2 class="text-4xl font-bold mt-2 text-left">
        ASC Construct Pricing | Trauma & Extremities
      </h2>
      <h2 class="text-2xl text-left mt-4 mb-6 font" style="color: #63666a">
        DePuy Synthes Pro-Pak<sup>®</sup> Preselected Procedure Constructs
      </h2>
      <div class="grid grid-cols-2">
        <div class="text-left -mr-14">
          <h2 class="text-2xl text-left font leading-tight">
            <b> One market relevant total construct price </b> vs. line item
            pricing that may vary depending on what is used in the procedure
          </h2>
          <h2 class="text-2xl text-left mt-3" style="color: #63666a">
            <b>
              Provide your ASC with <br />
              Consistency, Predictability, and Value
            </b>
          </h2>
          <h2 class="text-xl text-left mt-2 mb-4">
            <b>
              50 preselected procedure-based constructs <br />
              specifically designed for your ASC needs:</b
            >
          </h2>
          <div class="grid grid-cols-2 ml-4 mb-4">
            <ul class="list-disc w-full text-base text-black leading-tight">
              <li>Hand & Wrist</li>
              <li>Foot & Ankle</li>
              <li>Hammertoe</li>
              <li>Shoulder & Elbow</li>
              <li>Clavicle</li>
              <li>Cannulated Screws</li>
              <li>
                Continuous Compression <br />
                Implants (CCIs)
              </li>
            </ul>
            <div>
              <a
                href="https://dpslighthousecommunity.jnj.com/s/resource/a2i3g000000YXKEAA4/depuy-synthes-propak-trauma-product-catalog"
                target="_blank"
              >
                <img
                  class="w-48 text-left -ml-20"
                  src="@/assets/images/ASC/35-catalog.png"
                  alt="Catalog"
                />
              </a>
              <a
                href="https://dpslighthousecommunity.jnj.com/s/resource/a2i3g000000YXPsAAO/depuy-synthes-propak-brochure-trauma"
                target="_blank"
              >
                <img
                  class="w-48 mb-4 text-left -mt-16 ml-20"
                  src="@/assets/images/ASC/35-brochure.png"
                  alt="Brochure"
                />
              </a>
            </div>
          </div>
        </div>
        <div
          class="diagonal flex flex-col justify-center align-center mt-16 -ml-6"
        >
          <div>
            <img
              class="w-13 h-21 ml-16 -mb-7 -mt-5"
              src="@/assets/images/ASC/35-diag-1.png"
              alt="Diagonal 1"
            />
          </div>
          <div class="flex flex justify-center">
            <img
              class="w-24 h-24 mr-20 -ml-20"
              src="@/assets/images/ASC/35-diag-2.png"
              alt="Diagonal 2"
            />
          </div>
          <div class="flex justify-center ml-4">
            <img
              class="w-28 h-16 ml-24"
              src="@/assets/images/ASC/35-diag-3.png"
              alt="Diagonal 3"
            />
          </div>
          <div class="flex justify-end">
            <img
              class="w-30 h-12 mr-8 mt-5"
              src="@/assets/images/ASC/35-diag-4.png"
              alt="Diagonal 4"
            />
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
.running {
  background: url('@/assets/images/ASC/35-banner.png') no-repeat;
  background-size: 400px;
  background-position: right top;
}

.diagonal {
  background: url('@/assets/images/ASC/35-diag.png') no-repeat;
  background-size: 100%;
  width: 560px;
}
</style>
