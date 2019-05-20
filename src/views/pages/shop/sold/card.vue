<template>
  <st-panel
    app
    initial
    :tabs="[
      { label: '会员卡', route: { name: 'shop-sold-card-member' } },
      { label: '储值卡', route: { name: 'shop-sold-card-deposite' } }
    ]"
  >
    <div slot="actions">
      <st-input-search placeholder="请输入卡名、会员姓名或手机号查找" style="width: 290px;"/>
    </div>
    <router-view></router-view>
  </st-panel>
</template>
