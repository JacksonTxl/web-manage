<template>
  <page-route-nav title="应用设置" v-model="navs"></page-route-nav>
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
  },
  created() {
    console.log('created', 'app')
    this.$router.push({
      name: this.navs[0].route.name
    })
  }
}
</script>
