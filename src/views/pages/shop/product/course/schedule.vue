<template>
<st-panel class="page-schedule-st-panel" app :tabs="tabs">
  <section>
    <modal-link :to="{name: 'schedule-add-course-schedule'}"><st-button>新增课程排期</st-button></modal-link>
    <modal-link :to="{name: 'schedule-add-course-schedule-batch'}"><st-button>批量新增课程排期</st-button></modal-link>
    <modal-link :to="{name: 'schedule-copy-schedule'}"><st-button>复制排期</st-button></modal-link>
    <modal-link :to="{name: 'schedule-add-order'}"><st-button>添加预约</st-button></modal-link>
    <modal-link :to="{name: 'schedule-edit-schedule-personal'}"><st-button>编辑排期(私教)</st-button></modal-link>
    <modal-link :to="{name: 'schedule-edit-schedule'}"><st-button>修改排期</st-button></modal-link>
    <modal-link :to="{name: 'schedule-order-info'}"><st-button>预约详情</st-button></modal-link>
    <modal-link :to="{name: 'schedule-order-info-personal'}"><st-button>预约详情(私教)</st-button></modal-link>
  </section>
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
