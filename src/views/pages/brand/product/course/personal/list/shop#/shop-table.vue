<template>
<div>
  <st-table
      class="mg-t16"
      rowKey="id"
      :alertSelection="{onReset: start}"
      :columns="columns"
      :dataSource="personalCourseList"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :scroll="{ x: 1300}"
      @change="onChange"
    >
      <div slot="action" slot-scope="action, record">
        <router-link class="mg-r8" :to="{name: 'brand-product-course-personal-info', query: {courseId: record.course_id}}">详情</router-link>
      </div>
      <router-link class="mg-r8" :to="{name: 'brand-product-course-personal-info', query: {courseId: record.course_id}}"
      slot="course_name" slot-scope="course_name, record">
        {{course_name}}
      </router-link>
      <div slot="coaches" slot-scope="coaches, record">
        <modal-link tag="a"
        :to="{name: 'course-support-course-cocahes-brand', props: {course: record}}"
        >{{coaches}}</modal-link>
      </div>
    </st-table>

</div>

</template>

<script>
import { columns } from './shop.config'
export default {
  name: 'ShopSaleListTable',
  data() {
    return {
      columns,
      selectedRowKeys: []
    }
  },
  props: {
    personalCourseList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    start() {
      this.selectedRowKeys = []
    },
    onChange() {

    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style scoped>

</style>
