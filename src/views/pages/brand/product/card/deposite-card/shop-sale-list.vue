<template>
  <section class="sg-app-content mg-t16">
      <st-panel
        :tabs="[
          { label: '品牌私教课程库', route: { name: 'brand-product-card-deposite-card-shop-sale-list-brand' } },
          { label: '门店私教课程库', route: { name: 'brand-product-card-deposite-card-shop-sale-list-shop' } }
        ]"
      >
        <div slot="actions">
          <a-input-search placeholder="私教课名称"></a-input-search>
        </div>
        <router-view></router-view>
      </st-panel>
    </section>
</template>
