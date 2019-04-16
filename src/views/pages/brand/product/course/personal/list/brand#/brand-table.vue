<template>
<div>
  <st-table
      class="mg-t16"
      rowKey="course_id"
      :columns="columns"
      :dataSource="personalCourseList"
      :scroll="{ x: 1300}"
      @change="onChange"
    >
      <div slot="shopNumber" slot-scope="shopNumber">
        <a
          v-if="shopNumber !== '全门店'"
          href="javascript:;"
        >{{shopNumber}}</a>
        <span
          v-else
        >{{shopNumber}}</span>
      </div>
      <div slot="coachNumber" slot-scope="coachNumber">
        <a
          href="javascript:;"
        >{{coachNumber}}</a>
      </div>
      <div slot="pricing" slot-scope="text, record">
        <a
          v-if="record.pricing_type !== '品牌统一定价'"
          href="javascript:;"
        >{{text}}</a>
        <span
          v-else
        >{{text}}</span>
      </div>
      <div slot="status" slot-scope="status">
          <span><a-badge :status="status === '有效'?'success':'error'" />{{status}}</span>

      </div>
      <div slot="action" slot-scope="record">
        <router-link class="mg-r8" :to="{name: 'brand-product-course-personal-info', query: {id: record}}">详情{{record}}</router-link>
        <router-link :to="{name: 'brand-product-course-personal-edit', query: {id: record}}">编辑</router-link>
        <st-more-dropdown style="margin-left: 12px;">
          <a-menu-item>置为无效</a-menu-item>
          <a-menu-item>删除</a-menu-item>
        </st-more-dropdown>
      </div>
    </st-table>

</div>

</template>

<script>
import { columns, mockTable } from './brand.config'
export default {
  name: 'ShopSaleListTable',
  data() {
    return {
      columns,
      selectedRowKeys: [],
      data: mockTable
    }
  },
  props: {
    personalCourseList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onChange() {

    }
  }
}
</script>

<style scoped>

</style>
