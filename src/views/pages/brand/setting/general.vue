<template>
  <div>
    <page-route-nav title="通用设置" v-model="navs"></page-route-nav>
    <router-view></router-view>
  </div>
</template>
<script>
import PageRouteNav from '@/views/components/page-route-nav#/nav'
export default {
  bem: {
    b: 'page-setting'
  },
  components: {
    PageRouteNav
  },
  data() {
    return {
      navs: [{
        label: '品牌设置',
        route: {
          name: 'brand-setting-general-brand'
        }
      }, {
        label: '课程定价及预约设置',
        route: {
          name: 'brand-setting-general-course-personal'
        }
      }, {
        label: '支付设置',
        route: {
          name: 'brand-setting-general-pay-type'
        }
      }, {
        label: '教练等级设置',
        route: {
          name: 'brand-setting-general-coach-level'
        }
      }, {
        label: '用户等级设置',
        route: {
          name: 'brand-setting-general-user-level'
        }
      }]
    }
  }
}
</script>
