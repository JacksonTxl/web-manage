<template>
  <st-panel app>
    <ul>
      <li :class="b()"></li>
      <li :class="b('title')">b('title')</li>
      <li :class="b('title',{active:true})">b('title',{active:true})</li>
      <li :class='bSider()'>bSider()</li>
      <li :class='bHeader()'>bHeader()</li>
      <a-button @click="isActive = true">active</a-button>
    </ul>
  </st-panel>
</template>

<script>
import { mapBem } from '@/utils/bem'

export default {
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    ...mapBem({
      b: 'default-brand',
      bSider: 'default-brand-sider',
      bHeader: 'default-brand-header'
    })
  }
}
</script>
