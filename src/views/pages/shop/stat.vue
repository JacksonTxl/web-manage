<template>
  <st-panel
    app
    :tabs="[
          { label: '营收报表', route: { name: 'shop-stat-revenue' }},
          { label: '订单报表', route: { name: 'shop-stat-order' }},
        ]"
  >
    <router-view></router-view>
  </st-panel>
</template>
