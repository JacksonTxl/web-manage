<template>
  <st-panel
    :tabs="[
      { label: '课程类型', route: { name: 'brand-setting-app-course-category' } },
      { label: '训练目的', route: { name: 'brand-setting-app-course-training-aim' } }
    ]"
  >
    <router-view></router-view>
  </st-panel>
</template>
