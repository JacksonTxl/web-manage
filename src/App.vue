<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <router-view></router-view>
      <modal-router-view></modal-router-view>
    </div>
  </a-locale-provider>
</template>

<script lang='ts'>
import Vue from 'vue'
// @ts-ignore
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default Vue.extend({
  name: 'app',
  data() {
    return {
      zh_CN
    }
  }
})
</script>
