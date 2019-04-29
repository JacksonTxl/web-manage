<template>
<st-panel app :tabs="tabs">
  <div slot="actions">
    <a-input-search placeholder="私教课名称" @search="onSearchCourseName"></a-input-search>
  </div>
  <router-view></router-view>
</st-panel>
</template>

<script>
export default {
  name: 'CourseSchedule',
  data() {
    return {
      tabs: [
        { label: '团操课', route: { name: 'shop-product-course-schedule-team' } },
        { label: '私交1v1', route: { name: 'shop-product-course-schedule-personal' } },
        { label: '私教小团课', route: { name: 'shop-product-course-schedule-personal-team' } }
      ]
    }
  },
  methods: {
    onSearchCourseName() {
      console.log('dasd')
    }
  }
}
</script>
