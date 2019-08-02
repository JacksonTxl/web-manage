<template>
  <st-panel
    :tabs="[
      {
        label: '临时储物柜',
        route: { name: 'shop-setting-cabinet-temporary' }
      },
      { label: '长期储物柜', route: { name: 'shop-setting-cabinet-long-term' } }
    ]"
  >
    <router-view></router-view>
  </st-panel>
</template>
