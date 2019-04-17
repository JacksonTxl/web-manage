<template>
<div>
  <st-table
      class="mg-t16"
      rowKey="course_id"
      :columns="columns"
      :dataSource="personalCourseList"
      :scroll="{ x: 1300}"
      @change="onChange">
      <div slot="shop_setting" slot-scope="shop_setting">
        <a
          v-if="shop_setting.code !== 1"
          href="javascript:;"
        >{{shop_setting.text}}</a>
        <span
          v-else
        >{{shop_setting.text}}</span>
      </div>
      <div slot="coachNumber" slot-scope="coachNumber">
        <a
          href="javascript:;"
        >{{coachNumber}}</a>
      </div>
      <div slot="price_setting" slot-scope="price_setting">
        {{price_setting.text}}
      </div>
      <div slot="course_pricing" slot-scope="course_pricing">
        <a
          href="javascript:;"
        >{{course_pricing}}</a>
      </div>
      <div slot="is_available" slot-scope="is_available">
          <span><a-badge :status="is_available.code === 1?'success':'error'" />{{is_available.text}}</span>
      </div>
      <div slot="action" slot-scope="text, record">
        <router-link class="mg-r8" :to="{name: 'brand-product-course-personal-info', query: {id: record}}">详情</router-link>
        <router-link :to="{name: 'brand-product-course-personal-edit', query: {id: record}}">编辑</router-link>
        <st-more-dropdown style="margin-left: 12px;">
          <a-menu-item v-if="record.is_available.code === 1">置为无效</a-menu-item>
          <a-menu-item v-else>恢复有效</a-menu-item>
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
