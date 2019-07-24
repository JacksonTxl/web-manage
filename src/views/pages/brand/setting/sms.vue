<template>
  <st-panel
    app
    :tabs="[
          { label: '短信列表', route: { name: 'brand-setting-sms-list' }},
          { label: '通知模版', route: { name: 'brand-setting-sms-notice' }},
          { label: '短信充值', route: { name: 'brand-setting-sms-pay' }},
        ]"
  >
    <router-view></router-view>
  </st-panel>
</template>
