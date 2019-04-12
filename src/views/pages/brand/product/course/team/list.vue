<template>
  <st-panel
    app
    :tabs="[
      { label: '品牌团体课程库', route: { name: 'brand-product-course-team-list-brand' } },
      { label: '门店团体课程库', route: { name: 'brand-product-course-team-list-shop' } }
    ]">
    <div slot="actions">
      <a-input-search placeholder="私教课名称"></a-input-search>
    </div>
    <router-view></router-view>
  </st-panel>
</template>
