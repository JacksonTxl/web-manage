<template>
  <st-panel
    :tabs="tabs"
  >
    <router-view></router-view>
  </st-panel>
</template>
<script>
export default {
  data() {
    return {
      tabs: [
        { label: '课程类型', route: { name: 'brand-setting-app-course-category' } },
        { label: '训练目的', route: { name: 'brand-setting-app-course-training-aim' } }
      ]
    }
  },
  created() {
    console.log('created', 'course')
    this.$router.push({
      name: this.tabs[0].route.ame
    })
  }
}
</script>
