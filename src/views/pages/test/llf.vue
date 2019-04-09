<template>
  <st-panel app>
    <ul>
      <li :class="b()">{{b('title')}}</li>
      <li :class="b()">{{b('logo',{active:true})}}</li>
      <li
        :class="b('title',{active:isActive})"
      >b('title',{active:{{isActive}}}) {{b('title',{active:isActive})}}</li>
      <li :class="bSider()">bSider() }</li>
      <a-button @click="isActive = !isActive">active</a-button>
    </ul>
  </st-panel>
</template>

<script>
export default {
  bem: {
    b: 'default-brand',
    bSider: 'default-brand-sider',
    bHeader: 'default-brand-header'
  },
  data() {
    return {
      isActive: false
    }
  }
}
</script>
