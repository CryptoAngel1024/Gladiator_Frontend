<template>
  <section class="h-full">
    <div class="flex flex-col h-full pt-6 font-Arial mx-14 text-left">
      <div class="flex">
        <div>
          <h2 class="text-4xl font-bold text-slidColor-header mt-2">
            Power Tools for Joint Reconstruction
          </h2>
          <h2
            class="text-2xl text-slidColor-header mt-4 font"
            style="color: #63666a"
          >
            The BPL II is a powerful and reliable system designed for efficiency
            in hip and knee <br />
            reconstruction
          </h2>
        </div>
        <div class="ml-auto">
          <img
            src="@/assets/images/ASC/downward_arrow.png"
            class="max-w-max"
            alt="Downward Arrow"
          />
          <img
            src="@/assets/images/ASC/learn_more.png"
            class="max-w-max w-36 justify-left"
            alt="Learn More"
          />
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div class="flex flex-col">
          <a
            href="https://www.jnjmedicaldevices.com/en-EMEA/product/acrion-saw-blades"
            target="_blank"
          >
            <img
              src="@/assets/images/ASC/downward_arrow.png"
              class="w-8"
              alt="Downward Arrow"
            />
          </a>
          <div class="text-2xl">
            <a
              href="https://www.jnjmedicaldevices.com/en-EMEA/product/acrion-saw-blades"
              target="_blank"
            >
              <p class="-mb-2 mt-1" style="color: #63666a">
                <b>ACRION</b><sup>™</sup>
              </p>
              <p class="text-sm" style="color: #63666a">Saw Blades</p>
            </a>
            <p class="font-bold text-xl mt-2">
              Available with DePuy Synthes/Zimmer<sup>®</sup>,
              Stryker<sup>®</sup>, <br />
              ConMed Linvatec<sup>®</sup> Hall<sup>®</sup>, and Aesculap<sup
                >®</sup
              >
              saw
              <br />
              couplings.
            </p>
            <ul class="list-disc text-lg mt-8 ml-6 leading-tight">
              <li>ACRION Saw Blades</li>
              <li>ACRION Reciprocating Saw Blades</li>
            </ul>

            <div class="flex flex-col mt-4 ml-20">
              <img
                src="@/assets/images/ASC/downward_arrow.png"
                class="w-11"
                alt="Downward Arrow"
              />
              <a
                href="https://www.jnjmedicaldevices.com/en-EMEA/product/acrion-saw-blades"
                target="_blank"
              >
                <img
                  src="@/assets/images/ASC/30-2-1.png"
                  class="w-48 ml-3"
                  alt="Saw Blade"
                />
              </a>
            </div>
          </div>
        </div>

        <div class="px-6 mt-3 text-2xl">
          <p class="font-bold" style="color: #63666a">Large Bone Power Tools</p>
          <p class="mt-4 text-lg leading-tight">
            The Battery Power Line II System (BPL II) was developed <br />
            for joint reconstruction.
          </p>

          <div class="grid grid-cols-2">
            <ul class="list-disc -space-y-1 leading-tight text-lg ml-5">
              <p class="text-normal mt-1 mb-1 -ml-5 text-lg">
                Three dedicated handpieces:
              </p>
              <li>Reamer/Drill</li>
              <li>Reciprocating Saw</li>
              <li>Oscillating Saw</li>
            </ul>

            <div class="flex justify-left -mt-4 ml-24 -mb-1">
              <img
                src="@/assets/images/ASC/30-1-1.png"
                class="w-44 mb-auto"
                alt="Power Tool One"
              />
            </div>
          </div>

          <p class="-mt-14 text-lg leading-tight">
            All-in-one washing and sterilization basket for <br />
            streamlined reprocessing.
          </p>
          <div class="flex flex-col mx-auto w-56">
            <img
              src="@/assets/images/ASC/downward_arrow.png"
              class="w-11 mt-1"
              alt="Downward Arrow"
            />
            <a
              href="https://www.jnjmedicaldevices.com/sites/default/files/user_uploaded_assets/pdf_assets/2018-12/BPL%20II%20_%20Joint%20Plus%20Blades%20System%20Brochure_US.pdf"
              target="_blank"
            >
              <img src="@/assets/images/ASC/30-2-2.png" alt="Power Tool Two" />
            </a>
          </div>
        </div>
      </div>
      <slideFooter class="mb-8" />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-1.vue'
export default {
  components: { slideFooter },
}
</script>
