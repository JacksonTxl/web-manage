<template>
  <st-panel
    app
    :tabs="[
          { label: '短信列表', route: { name: 'brand-setting-msg-sms' }},
          { label: '通知模版', route: { name: 'brand-setting-msg-notice' }},
          { label: '短信充值', route: { name: 'brand-setting-msg-index' }},
        ]"
  >
    <router-view></router-view>
  </st-panel>
</template>
