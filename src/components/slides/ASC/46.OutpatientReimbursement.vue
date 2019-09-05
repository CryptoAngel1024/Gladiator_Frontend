<template>
  <section class="h-full">
    <div class="flex flex-col h-full pt-8 mx-12 font-Arial">
      <h2 class="text-4xl font-bold text-left text-slidColor-header">
        Outpatient Reimbursement | Total Hip Arthroplasty
      </h2>

      <h2 class="text-2xl text-left mt-2 mb-6" style="color: #63666a">
        <strong>FINAL</strong>
        Average Reimbursement by Site of Care | CPT Code 27130
      </h2>

      <p class="text-left p-1 table-date">DECEMBER 31, 2020</p>
      <OutpatientReimbursementTopTable :table="topTable1" />
      <p class="text-left p-1 table-date">
        JANUARY 1, 2021 <span class="text-red-750 font-extrabold">(FINAL)</span>
      </p>
      <OutpatientReimbursementTopTable :table="topTable2" />
      <div class="flex justify-between">
        <div class="text-left mt-6">
          <p class="middle-title my-2">Private Payers | TKA in the ASC</p>
          <p class="middle-description">
            Conducted in TRUVEN Database –
            <em>includes professional fee in total</em>
          </p>
        </div>
        <img src="@/assets/images/ASC/45-c-1.png" width="190" />
      </div>
      <OutpatientReimbursementBottomTableVue :table="bottomTalbe1" />
      <p class="text-right pr-2 bottom-text" style="color: #63666a">
        <sub class="pt-12" style="color: #c800a1">*</sub>Varies regionally
        across US
      </p>
      <slideFooter class="mb-8" />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-1.vue'
import OutpatientReimbursementTopTable from './OutpatientReimbursementTopTable.vue'
import OutpatientReimbursementBottomTableVue from './OutpatientReimbursementBottomTable.vue'
export default {
  components: {
    slideFooter,
    OutpatientReimbursementTopTable,
    OutpatientReimbursementBottomTableVue,
  },
  data: () => ({
    topTable1: {
      hospital: '12,320',
      outpatient: '11,899',
      standing: 'N/A',
      professional: '1,413',
    },
    topTable2: {
      hospital: '12,320',
      outpatient: '12,315',
      standing: '8,833',
      professional: '1,322',
    },
    bottomTalbe1: [
      {
        year: '2014',
        mean: '34,484',
        median: '24,185',
        procedureCount: '2,089',
      },
      {
        year: '2015',
        mean: '32,459',
        median: '25,282',
        procedureCount: '3,790',
      },
      {
        year: '2016',
        mean: '27,115',
        median: '24,416',
        procedureCount: '7,022',
      },
      {
        year: '2017',
        mean: '27,533',
        median: '24,578',
        procedureCount: '10,248',
      },
      {
        year: '2018',
        mean: '26,708',
        median: '24,670',
        procedureCount: '14,237',
      },
      {
        year: '2019',
        mean: '25,486',
        median: '22,505',
        procedureCount: '23,244',
      },
    ],
  }),
}
</script>

<style>
.table-date {
  font-size: 10.5px;
  font-weight: bold;
}
.middle-title {
  font-size: 20px;
  font-weight: 800;
}
.middle-description {
  font-size: 15px;
}
.bottom-text {
  font-size: 8px;
}
</style>
