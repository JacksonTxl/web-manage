<template>
  <st-panel
    :tabs="[
          { label: '会员卡项', route: { name: 'brand-product-card-member-list-a' } },
          { label: '门店售卖卡项', route: { name: 'brand-product-card-member-list-b' } }
        ]"
  >
    <div slot="actions">
      <a-input-search placeholder="私教课名称"></a-input-search>
    </div>
    <router-view></router-view>
  </st-panel>
</template>
