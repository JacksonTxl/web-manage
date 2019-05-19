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
      <st-input-search placeholder="可输入姓名、手机号、卡号" style="width: 290px;"/>
    </div>
    <router-view></router-view>
  </st-panel>
</template>
