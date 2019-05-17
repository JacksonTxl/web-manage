<template>
  <st-panel
    :tabs="[
      { label: '私教设置', route: { name: 'brand-setting-general-course-personal' } },
      { label: '团课设置', route: { name: 'brand-setting-general-course-team' } }
    ]"
  >
    <router-view></router-view>
  </st-panel>
</template>
