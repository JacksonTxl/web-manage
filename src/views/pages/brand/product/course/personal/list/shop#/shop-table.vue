<template>
<div>
  <st-table
      class="mg-t16"
      rowKey="course_id"
      :columns="columns"
      :page="page"
      :dataSource="list"
      :scroll="{ x: 1440 }"
      :loading="loading.getList"
      @change="onTableChange">
      <router-link class="mg-r8" :to="{ name: 'brand-product-course-personal-info', query: { id: record.course_id } }"
      slot="course_name" slot-scope="course_name, record">
        {{course_name}}
      </router-link>
      <div slot="sell_price" slot-scope="sell_price, record">
        <a
        v-modal-link="{name: 'course-price-setting', props: {course: record}}"
        v-if="sell_price.is_click > 0"
        >{{sell_price.course_price}}</a>
        <span v-else>{{sell_price.course_price}}</span>
      </div>
      <div slot="coaches" slot-scope="coaches, record">
        <a
        v-modal-link="{name: 'course-support-course-cocahes-brand', props: {course: record}}"
        >{{coaches}}</a>
      </div>
      <div slot="action" slot-scope="action, record">
        <st-table-actions>
          <router-link class="mg-r8" v-if="record.auth['brand_shop:product:personal_course|get']" :to="{name: 'brand-product-course-personal-info', query: { id: record.course_id } }">详情</router-link>
          <a href="javascript:;" @click="onClickTransfrom(record)">转入品牌</a>
        </st-table-actions>
      </div>
    </st-table>

</div>

</template>

<script>
import tableMixin from '@/mixins/table.mixin'
import { columns } from './shop.config'
import { ShopService } from '../shop.service'
import { RouteService } from '@/services/route.service'
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
      service: ShopService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      list: this.service.list$,
      page: this.service.page$,
      loading: this.service.loading$,
      query: this.routeService.query$
    }
  },
  methods: {
    onSelectionChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      this.$emit('check', this.selectedRows)
    },
    onClickTransfrom(course) {
      this.$modalRouter.push({ name: 'course-transfrom-brand-course', props: { course } })
    }
  }
}
</script>

<style scoped>

</style>
