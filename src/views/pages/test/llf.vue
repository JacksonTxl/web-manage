<template>
  <st-panel app>
     <st-more-dropdown>
       <a-menu-item @click='onClickOne'>
         转让
       </a-menu-item>
       <a-menu-item>
         出售
       </a-menu-item>
       <a-menu-item>
         你好
       </a-menu-item>
     </st-more-dropdown>
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
