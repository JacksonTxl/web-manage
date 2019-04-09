<template>
  <st-panel app>
    <st-card-hour-picker></st-card-hour-picker>
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
  },
  methods: {
    onClickOne() {
      console.log('hello')
    }
  }
}
</script>
