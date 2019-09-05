<template>
  <section class="h-full">
    <div class="flex flex-col h-full p-5 pl-10">
      <p class="text-4xl font-bold text-slidColor-header text-left">
        DePuy Synthes Mitek Sports Medicine
      </p>
      <div class="flex justify-center items-center flex-grow">
        <div class="h-full w-5/12">
          <p class="text-left text-2xl mt-10">
            Mitek Sports Medicine delivers comprehensive procedural solutions
            through our complete portfolio of implants, surgical disposables,
            allografts (from Parametrics Medical) and capital equipment serving
            arthroscopic and endoscopic general surgery procedures.
          </p>
          <p class="text-left text-2xl w-9/12 mt-10">
            For conditions where surgery may not be indicated, we also offer
            Early Intervention solutions.
          </p>
          <div class="grid grid-cols-2 items-end mt-5">
            <img class="ml-auto" src="@/assets/images/slide10_image1.jpg" />
            <p class="text-left text-bottom pl-3">
              Our virtual exhibit contains more detailed information on focus
              products in sports medicine.
            </p>
          </div>
        </div>
        <div class="h-full w-7/12 relative -mt-3">
          <div class="h-full">
            <img
              class="h-full"
              src="@/assets/images/slides/slide10/bg_radial.svg"
            />
            <img
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              width="180"
              height="60"
              src="@/assets/logo/logo_rgb.png"
            />

            <img
              width="100px"
              class="absolute top-[130px] left-[230px] transform -translate-x-1/2 -translate-y-1/2"
              src="@/assets/images/slides/slide10/images/image1.png"
            />
            <img
              width="60px"
              class="absolute top-[185px] left-[210px] transform -translate-x-1/2 -translate-y-1/2"
              src="@/assets/images/slides/slide10/images/image2.png"
            />
            <img
              width="110px"
              class="absolute top-[225px] left-[150px] transform -translate-x-1/2 -translate-y-1/2"
              src="@/assets/images/slides/slide10/images/image3.png"
            />

            <img
              width="160"
              class="absolute top-[315px] left-[150px] transform -translate-x-1/2 -translate-y-1/2"
              src="@/assets/images/slides/slide10/images/image4.png"
            />

            <img
              width="55px"
              class="absolute top-[375px] left-[200px] transform -translate-x-1/2 -translate-y-1/2"
              src="@/assets/images/slides/slide10/images/image5.png"
            />
            <img
              width="60px"
              class="absolute top-[425px] left-[250px] transform -translate-x-1/2 -translate-y-1/2"
              src="@/assets/images/slides/slide10/images/image6.png"
            />
            <img
              width="80px"
              class="absolute top-[460px] left-[310px] transform -translate-x-1/2 -translate-y-1/2"
              src="@/assets/images/slides/slide10/images/image7.png"
            />
            <img
              width="60px"
              src="@/assets/images/slides/slide10/images/image8.png"
              class="absolute top-[460px] left-[390px] transform -translate-x-1/2 -translate-y-1/2"
            />
            <img
              width="58px"
              src="@/assets/images/slides/slide10/images/image9.png"
              class="absolute top-[430px] left-[445px] transform -translate-x-1/2 -translate-y-1/2"
            />

            <img
              width="78px"
              src="@/assets/images/slides/slide10/images/parametrics_medical.png"
              class="absolute top-[487px] left-[477px] transform -translate-x-1/2 -translate-y-1/2"
            />

            <img
              width="78px"
              src="@/assets/images/slides/slide10/images/image10.png"
              class="absolute top-[390px] left-[530px] transform -translate-x-1/2 -translate-y-1/2"
            />

            <img
              width="78"
              src="@/assets/images/slides/slide10/images/parametrics_medical.png"
              class="absolute top-[425px] left-[534px] transform -translate-x-1/2 -translate-y-1/2"
            />

            <img
              width="18px"
              src="@/assets/images/slides/slide10/images/image11_1.png"
              class="absolute top-[327px] left-[570px] transform -translate-x-1/2 -translate-y-1/2"
            />

            <img
              width="13px"
              src="@/assets/images/slides/slide10/images/image11_2.png"
              class="absolute top-[330px] left-[590px] transform -translate-x-1/2 -translate-y-1/2"
            />

            <img
              width="120px"
              src="@/assets/images/slides/slide10/images/image12.png"
              class="absolute top-[230px] left-[535px] transform -translate-x-1/2 -translate-y-1/2"
            />

            <img
              width="90px"
              src="@/assets/images/slides/slide10/images/image13.png"
              class="absolute top-[150px] left-[542px] transform -translate-x-1/2 -translate-y-1/2"
            />

            <img
              width="100px"
              src="@/assets/images/slides/slide10/images/image14.png"
              class="absolute top-[120px] left-[455px] transform -translate-x-1/2 -translate-y-1/2"
            />
            <img
              width="90px"
              src="@/assets/images/slides/slide10/images/image15.png"
              class="absolute top-[110px] left-[385px] transform -translate-x-1/2 -translate-y-1/2"
            />
            <img
              width="68px"
              src="@/assets/images/slides/slide10/images/image16.png"
              class="absolute top-[90px] left-[308px] transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <p
            class="absolute bottom-0 right-0 -mr-5 w-48 text-left text-[0.55em] text-gray-500 font-Arial"
          >
            Available in the US only. DERMIS ON DEMANDTM is promoted by DePuy
            Synthes, distributed by Parametrics Medical, and processed by
            CellRight Technologies. Monovisc® is a registered trademark and
            manufactured by Anika Therapeutics,inc. The third-party trademarks
            used herein are the trademarks of their respective owners.
          </p>
        </div>
      </div>
      <slideFooter class="mt-auto" :show-third-party-trade-mark="false" />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-1.vue'

export default {
  components: { slideFooter },
}
</script>

<style lang="postcss" scoped>
td,
th {
  padding: 8px;
}
.table-row-data-border {
  border-top: 2px solid #ffffff;
}
</style>
