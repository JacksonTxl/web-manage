<template>
  <div class="st-setting-app-nav">
    <div :class="b('title')">
      <st-t2>通用设置</st-t2>
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
  name: 'AppNav',
  bem: {
    b: 'st-setting-app-nav'
  },
  data() {
    return {
      navs: [{
        label: '课程定价及预约设置',
        route: {
          name: 'brand-setting-app-course-personal'
        }
      }, {
        label: '支付设置',
        route: {
          name: 'brand-setting-app-pay-type'
        }
      }, {
        label: '教练等级设置',
        route: {
          name: 'brand-setting-app-coach-level'
        }
      }, {
        label: '用户等级设置',
        route: {
          name: 'brand-setting-app-user-level'
        }
      }]
    }
  }
}
</script>
