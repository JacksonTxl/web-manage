<template>
<div>
  <st-table
      class="mg-t16"
      rowKey="course_id"
      :columns="columns"
      :alertSelection="{onReset: onSelectionReset}"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectionChange}"
      :page="page"
      :dataSource="list"
      :scroll="{ x: 1440 }"
      :loading="loading.getList"
      @change="onTableChange"
    >
      <div slot="action" slot-scope="action, record">
        <router-link class="mg-r8" v-if="record.auth['brand_shop:product:personal_course|get']" :to="{name: 'brand-product-course-personal-info', query: { id: record.course_id } }">详情</router-link>
      </div>
      <router-link class="mg-r8" :to="{ name: 'brand-product-course-personal-info', query: { id: record.course_id } }"
      slot="course_name" slot-scope="course_name, record">
        {{course_name}}
      </router-link>
      <div slot="sell_price" slot-scope="sell_price, record">
        <modal-link
        tag="a"
        :to="{name: 'course-price-setting', props: {course: record}}"
        v-if="sell_price.is_click > 0"
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
import tableMixin from '@/mixins/table.mixin'
import { columns } from './shop.config'
import { ShopService } from '../shop.service'
export default {
  name: 'ShopSaleListTable',
  mixins: [tableMixin],
  data() {
    return {
      columns
    }
  },
  serviceInject() {
    return {
      service: ShopService
    }
  },
  rxState() {
    return {
      list: this.service.list$,
      page: this.service.page$,
      loading: this.service.loading$
    }
  },
  methods: {
    onSelectionChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      this.$emit('check', this.selectedRowKeys)
    }
  }
}
</script>

<style scoped>

</style>
