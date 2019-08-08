<template>
  <section class="sg-section">
    <h3>page route nav</h3>
    <st-page-route-nav title="应用设置" v-model="navs"></st-page-route-nav>
  </section>
</template>
<script>
export default {
  bem: {
    b: 'page-setting'
  },
  data() {
    return {
      navs: [
        {
          label: '课程',
          route: {
            name: 'brand-setting-app-course-category'
          }
        },
        {
          label: '员工',
          route: {
            name: 'brand-setting-app-staff-skillful'
          }
        }
      ]
    }
  }
}
</script>
