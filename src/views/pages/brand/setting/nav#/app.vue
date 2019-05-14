<template>
  <div class="st-setting-nav">
    <div :class="b('title')">
      <st-t2>应用设置</st-t2>
    </div>
    <st-route-tabs
      v-if="navs"
      :options="navs"
      tabPosition="right"
    >
    </st-route-tabs>
  </div>
</template>
<script>
export default {
  name: 'generalNav',
  bem: {
    b: 'st-setting-nav'
  },
  data() {
    return {
      navs: [{
        label: '课程',
        route: {
          name: 'brand-setting-app-course-category'
        }
      }, {
        label: '员工',
        route: {
          name: 'brand-setting-app-staff-skillful'
        }
      }]
    }
  }
}
</script>
