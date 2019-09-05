<template>
  <table class="w-full top-table">
    <thead>
      <tr>
        <th class="w-3/12"></th>
        <th class="w-2/12">HOSPITAL</th>
        <th class="w-1/5">HOSPITAL OUTPATIENT</th>
        <th class="w-1/5">FREESTANDING ASC</th>
        <th class="w-1/5">SURGEON PROFESSIONAL FEE</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-gray-60">
        <td>CMS</td>
        <td>${{ table.hospital }}</td>
        <td>${{ table.outpatient }}</td>
        <td>${{ table.standing }}</td>
        <td>${{ table.professional }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    table: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>
table.top-table {
  font-size: 11.5px;
}
table.top-table thead tr th {
  font-weight: 800;
  color: #c8102e;
  border: 2px solid #dfe0e2;
  padding-top: 10px;
  padding-bottom: 10px;
}
table.top-table thead tr th:first-child {
  border-left: none;
}
table.top-table thead tr th:last-child {
  border-right: none;
}
table.top-table tbody tr td {
  border: 2px solid #dfe0e2;
  padding-top: 7px;
  padding-bottom: 7px;
}
table.top-table tbody tr td:first-child {
  text-align: left;
  padding-left: 5px;
  font-weight: 800;
  color: #c8102e;
  border-left: none;
}
table.top-table tbody tr td:last-child {
  border-right: none;
}
</style>
