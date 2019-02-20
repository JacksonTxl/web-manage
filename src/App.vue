<template>
  <a-locale-provider :locale="zhCN">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script lang='ts'>
// @ts-ignore
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'app',
  data() {
    return {
      zhCN
    }
  }
}
</script>
