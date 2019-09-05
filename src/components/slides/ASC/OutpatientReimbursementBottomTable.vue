<template>
  <table class="w-full bottom-table">
    <thead>
      <tr>
        <th class="w-4/12">YEAR</th>
        <th class="w-2/12">MEAN</th>
        <th class="w-3/12">MEDIAN</th>
        <th class="w-3/12">PROCEDURE COUNT</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="list in table"
        :key="list"
        :class="table.length == 1 ? 'border-bottom' : ''"
      >
        <td>{{ list.year }}</td>
        <td>${{ list.mean }}</td>
        <td>${{ list.median }}</td>
        <td>{{ list.procedureCount }}</td>
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
table.bottom-table {
  font-size: 11.5px;
}
table.bottom-table thead tr th {
  font-weight: 800;
  color: #c8102e;
  border: 2px solid #dfe0e2;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: none;
}
table.bottom-table thead tr th:first-child {
  text-align: left;
  border-left: none;
  padding-left: 5px;
}
table.bottom-table tbody tr td {
  border: 2px solid #dfe0e2;
  padding-top: 7px;
  padding-bottom: 7px;
}
table.bottom-table tbody tr td:first-child {
  text-align: left;
  padding-left: 5px;
  border-left: none;
}
table.bottom-table tbody tr:nth-child(2n-1) {
  background-color: #f2f2f2;
}
table.bottom-table tbody tr:last-child td {
  border-bottom: none;
}
.border-bottom {
  border-bottom: 2px solid #dfe0e2;
}
</style>
