<template>
  <st-panel
    app
    :tabs="[
      { label: '品牌私教课程库', route: { name: 'brand-product-course-personal-course-shop-sale-list-brand' } },
      { label: '门店私教课程库', route: { name: 'brand-product-course-personal-course-shop-sale-list-shop' } }
    ]">
    <div slot="actions">
      <a-input-search placeholder="私教课名称"></a-input-search>
    </div>
    <router-view></router-view>
  </st-panel>
</template>
