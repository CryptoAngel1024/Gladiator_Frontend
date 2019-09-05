<template>
  <div class="flex justify-between min-w-1200">
    <div class="h-full w-2/5">
      <img
        class="h-full min-h-screen object-cover min-w-full"
        src="@/assets/images/asc_login_bg.png"
        alt="logo"
      />
    </div>

    <div class="flex flex-col justify-center items-center w-3/5 m-auto">
      <div class="flex opacity-20 z-0">
        <img
          class="h-min w-fit mr-8"
          src="@/assets/images/asc_login_bg_left_leaf.png"
          alt="logo"
        />
        <img
          class="h-min w-fit"
          src="@/assets/images/asc_login_bg_right_leaf.png"
          alt="logo"
        />
      </div>
      <div class="justify-center m-auto items-center absolute z-10">
        <img
          class="max-w-md w-full"
          src="@/assets/logo/asc_logo_rgb.png"
          alt="logo"
        />
        <slot />
      </div>
    </div>
  </div>
</template>
