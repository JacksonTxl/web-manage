<template>
<div>
  <st-table
      class="mg-t16"
      rowKey="record.course_id"
      :columns="columns"
      :dataSource="personalCourseList"
      :scroll="{ x: 1300}"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      @change="onChange"
    >
      <div slot="action" slot-scope="action, record">
        <router-link class="mg-r8" v-if="record.auth['brand_shop:product:personal_course|get']" :to="{name: 'brand-product-course-personal-info', query: {courseId: record.course_id}}">详情</router-link>
      </div>
      <router-link class="mg-r8" :to="{name: 'brand-product-course-personal-info', query: {courseId: record.course_id}}"
      slot="course_name" slot-scope="course_name, record">
        {{course_name}}
      </router-link>
      <div slot="sell_price" slot-scope="sell_price, record">
        <modal-link
        tag="a"
        :to="{name: 'course-price-setting', props: {course: record}}"
        v-if="sell_price.is_click"
        >{{sell_price.course_price}}</modal-link>
        <span v-else>{{sell_price.course_price}}</span>
      </div>
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
      this.$emit('change', selectedRowKeys)
    }
  }
}
</script>

<style scoped>

</style>
