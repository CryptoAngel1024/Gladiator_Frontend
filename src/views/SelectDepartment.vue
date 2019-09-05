<template>
  <h1 class="text-3xl font-bold text-red-800 text-center py-16">
    Please select department
  </h1>

  <div class="flex flex-col justify-center py-16 space-y-8 text-2xl">
    <div class="flex space-x-8 mx-auto">
      <router-link
        class="w-44 flex flex-col items-center h-44 justify-center bg-gray-500 rounded-2xl"
        :to="{
          name: 'dashboard',
          params: {
            department: 'trauma',
          },
        }"
      >
        <img src="@/assets/departmentIcons/asc.png" class="w-14 h-14" />
        <div class="mt-4">Trauma</div>
      </router-link>
      <router-link
        class="w-44 flex flex-col items-center h-44 justify-center bg-gray-500 rounded-2xl"
        :to="{
          name: 'dashboard',
          params: {
            department: 'asc',
          },
        }"
      >
        <img src="@/assets/departmentIcons/trauma.svg" class="w-14 h-14" />
        <div class="mt-4">ASC</div>
      </router-link>
    </div>
    <div class="flex space-x-8 mx-auto">
      <div
        class="w-44 flex flex-col items-center h-44 justify-center bg-gray-500 rounded-2xl"
      >
        <img src="@/assets/departmentIcons/asc.png" class="w-14 h-14" />
        <div class="mt-4">MiTek</div>
      </div>
      <div
        class="w-44 flex flex-col items-center h-44 justify-center bg-gray-500 rounded-2xl"
      >
        <img src="@/assets/departmentIcons/trauma.svg" class="w-14 h-14" />
        <div class="mt-4">Spine</div>
      </div>
    </div>
  </div>
</template>
