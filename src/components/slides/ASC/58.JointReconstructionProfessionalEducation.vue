<template>
  <section class="h-full">
    <div class="flex flex-col h-full pt-6 font-Arial mx-14 text-left">
      <h2 class="text-4xl font-bold">
        Joint Reconstruction Professional Education
      </h2>
      <h2 class="text-2xl mt-2 mb-9" style="color: #63666a">
        A wide range of ASC-focused education opportunities
      </h2>
      <div class="grid grid-cols-4">
        <div class="ml-2">
          <img
            src="@/assets/images/ASC/58-1-1-1.png"
            class="w-10/12 -ml-2"
            alt="1-1"
          />
          <p
            class="text-xl font-bold leading-tight mt-8"
            style="color: #c800a1"
          >
            LIVE DIGITAL<br />
            ENGAGEMENTS
          </p>
          <ul class="text-sm leading-tight">
            <li>
              <b>Designed for the entire ASC team:</b>
            </li>
            <li>Orthopaedic Surgeons</li>
            <li>Anesthesiologists</li>
            <li>Administrators</li>
            <li>
              <b>Full calendar of webcast events throughout 2022</b>
            </li>
            <li>
              <b
                >Virtual Preceptorship<br />
                Opportunities</b
              >
            </li>
            <li>
              <b>Faculty Peer-to-Peer Discussions</b>
            </li>
          </ul>
        </div>
        <div class="-mt-3 ml-4">
          <img
            src="@/assets/images/ASC/58-1-2-1.png"
            class="w-11/12"
            alt="1-2"
          />
          <a
            href="https://jnjinstitute.com/en-us/online-profed-resources/joint-arthroplasty"
            target="_blank"
          >
            <p
              class="text-xl font-bold leading-tight mt-5"
              style="color: #c800a1"
            >
              IN-PERSON ASC<br />
              PRECEPTORSHIPS
            </p>
            <p class="text-sm font-bold">6 Locations Available:</p>
            <ul class="text-sm leading-tight">
              <li>Atlanta, GA</li>
              <li>Buffalo, NY</li>
              <li>Columbus, OH</li>
              <li>Fort Lauderdale, FL</li>
              <li>Grants Pass, OR</li>
              <li>San Francisco, CA</li>
            </ul>
            <p class="text-sm font-bold mt-1">Topics Covered:</p>
            <ul class="text-sm list-disc ml-4 leading-tight -mr-4">
              <li>Physician & Administration Alignment</li>
              <li>Patient Experience Best Practices</li>
              <li>Multi-modal Pain Management</li>
              <li>Live Surgery</li>
              <li>Payer Considerations & Relationships</li>
              <li>ASC Facility Tour</li>
            </ul>
          </a>
        </div>
        <div class="ml-10">
          <img src="@/assets/images/ASC/58-1-3-1.png" alt="1-3" />
          <p class="text-xl font-bold mt-5 ml-2" style="color: #c800a1">
            THE ASC EXPERTS <br />
            PODCAST
          </p>
          <p class="text-sm leading-tight ml-2 -mr-2">
            An interactive series of discussions<br />
            with surgeons, payers, ASC <br />
            Administrators and “persons of <br />
            intrigue” all focused on the <br />
            Ambulatory Surgical Care setting
          </p>
        </div>
        <div class="ml-10">
          <img
            src="@/assets/images/ASC/58-1-4-1.png"
            class="w-4/12 -mt-7 ml-20"
            alt="1-4"
          />
          <p
            class="text-xl font-bold text-left ml-6 mt-7"
            style="color: #c800a1"
          >
            MedJ app
          </p>
          <ul class="text-sm list-disc ml-10 leading-tight">
            <li>ASC Speaker Series</li>
            <li>ASC Capabilities Workbook</li>
            <li>ASC Expert Podcast</li>
            <li>Brochures and Resources</li>
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

<style scoped></style>
