<template>
  <tr
    v-if="!expand"
    class="min-h-49 grid grid-cols-6 px-4 gap-10 my-6 border-0 rounded-md bg-slidColor-5 bg-opacity-5 cursor-pointer"
    @click="expand = true"
  >
    <td class="text-slideTableHeaderColor">
      {{ doctor.Doctors }}
    </td>
    <td class="text-accent-blue">
      ${{
        commaNumbers(
          doctor['Estimated current estimate $ of business with Depuy Synthes'],
        )
      }}
    </td>
    <td class="text-accent-blue">
      {{
        Math.round(
          doctor['Estimated current estimate % of business with Depuy Synthes'],
        )
      }}%
    </td>
    <td class="text-emerald-variant1">
      ${{
        commaNumbers(
          doctor[
            'Estimated $ of competitor business to switch to Depuy Synthes'
          ],
        )
      }}
    </td>
    <td class="text-red-variant1">
      ${{
        commaNumbers(
          doctor[
            'Estimated current estimate $ of business outside Depuy Synthes'
          ],
        )
      }}
    </td>
    <td>
      {{
        Math.round(
          doctor[
            'Estimated current estimate % of business outside Depuy Synthes'
          ],
        )
      }}%
    </td>
  </tr>
  <button
    v-else
    colspan="6"
    class="text-left mx-1 my-6 p-4 shadow border rounded-2xl border-blue-500 w-full"
    @click="expand = false"
  >
    <p class="text-slideTableHeaderColor w-full text-lg font-bold my-3">
      {{ doctor.Doctors }}
    </p>
    <div class="flex w-full">
      <div class="w-1/2">
        <span class="text-sm font-medium text-gray-500">
          With Depuy Synthes current business
        </span>
        <br />
        <span class="text-xs">
          {{ doctor['Estimated current business with Depuy Synthes'] }}
        </span>
        <div class="flex w-full text-base font-bold text-accent-blue">
          <div class="w-1/2">
            $
            {{
              commaNumbers(
                doctor[
                  'Estimated current estimate $ of business with Depuy Synthes'
                ],
              )
            }}
          </div>
          <div class="w-1/2">
            {{
              Math.round(
                doctor[
                  'Estimated current estimate % of business with Depuy Synthes'
                ],
              )
            }}%
          </div>
        </div>
        <span class="text-sm font-medium text-gray-500 pt-4">
          Outside Depuy Synthes
        </span>
        <br />
        <span class="text-xs">
          {{ doctor['Estimated current business outside Depuy Synthes'] }}
        </span>
        <div class="flex w-full text-base font-bold text-red-variant1">
          <div class="w-1/2">
            $
            {{
              commaNumbers(
                doctor[
                  'Estimated current estimate $ of business outside Depuy Synthes'
                ],
              )
            }}
          </div>
          <div class="w-1/2">
            {{
              Math.round(
                doctor[
                  'Estimated current estimate % of business outside Depuy Synthes'
                ],
              )
            }}%
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <span class="text-sm font-medium text-gray-500"> Future estimate </span>
        <br />
        <span class="text-xs">
          {{
            doctor['Estimated competitor business to swith to Depuy Synthes']
          }} </span
        ><br />
        <span class="text-base font-bold text-emerald-variant1">
          ${{
            commaNumbers(
              doctor[
                'Estimated $ of competitor business to switch to Depuy Synthes'
              ],
            )
          }}
        </span>
        <br />
        <span class="text-sm font-medium text-gray-500 pt-4">
          Estimate $ conversion
        </span>
        <br />
        <span class="text-base font-bold text-slideTableHeaderColor">
          $
          {{ commaNumbers(doctor['Estimate $ conversion']) }}
        </span>
      </div>
    </div>
    <div class="border-t border-gray-500 border-opacity-20 mt-4 pt-1">
      <span class="text-sm text-gray-500"> DPS team feedback from Doc </span
      ><br />
      <span class="text-xs">
        {{ doctor['DPS team feedback from Doc'] || '--' }} </span
      ><br />
    </div>
  </button>
</template>

<script>
import { ref } from '@vue/reactivity'
import { commaNumbers } from '@/utils/formatNumber'
export default {
  props: {
    doctor: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const expand = ref(false)

    return {
      expand,
      commaNumbers,
    }
  },
}
</script>

<style lang="postcss" scoped>
td,
th {
  @apply my-auto;
  border-style: hidden !important;
}
.min-h-49 {
  min-height: 49px;
}
</style>
