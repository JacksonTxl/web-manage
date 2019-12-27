<template>
  <div :class="basic()">
    <st-table
      :page="page"
      :class="basic('table')"
      rowKey="id"
      :loading="
        type === 1
          ? loading.getList
          : type === 2
          ? loading.getLogisticsList
          : loading.getDeliverList
      "
      :columns="columns"
      @change="onTableChange"
      :dataSource="tableData"
    >
      <ul
        slot="product"
        slot-scope="customRender, record"
        :class="basic('sku')"
      >
        <li v-for="(item, index) in record.product" :key="index">
          <span>{{ item.product_name }}</span>
          <span>x{{ item.product_count }}</span>
          <span>￥{{ item.unit_price }}</span>
        </li>
      </ul>
      <div slot="action" slot-scope="customRender, record">
        <st-table-actions>
          <a
            @click="clickFn(record)"
            v-if="record.auth['shop:cloud_store:order|write_off'] && type === 1"
          >
            {{ actionText }}
          </a>
          <a
            @click="clickFn(record)"
            v-if="
              record.auth['shop:cloud_store:order|deliver_goods'] && type === 2
            "
          >
            {{ actionText }}
          </a>
        </st-table-actions>
      </div>
    </st-table>
  </div>
</template>
<script>
import tableMixin from '@/mixins/table.mixin'
import { RowTableService } from './row-table.service'
export default {
  name: 'rowtable',
  mixins: [tableMixin],
  serviceInject() {
    return { RowTableService: RowTableService }
  },
  rxState() {
    return {
      tableData: this.RowTableService.list$,
      page: this.RowTableService.page$,
      loading: this.RowTableService.loading$
    }
  },
  bem: {
    basic: 'page-order-row-table'
  },
  data() {
    return {
      list: []
    }
  },
  props: {
    listData: {
      type: Array
    },
    columns: {
      type: Array
    },
    actionText: {
      type: String
    },
    type: {
      type: Number,
      default: 1
    }
  },
  methods: {
    clickFn(val) {
      this.$emit('clicks', val)
    },
    onTableChange(pagination) {
      this.$searchQuery.current_page = pagination.current
      this.$searchQuery.size = pagination.pageSize
      switch (this.type) {
        case 1:
          this.RowTableService.getList(this.$searchQuery).subscribe()
          break
        case 2:
          this.RowTableService.getLogisticsList(this.$searchQuery).subscribe()
          break
        case 3:
          this.RowTableService.getDeliverList(this.$searchQuery).subscribe()
          break
      }
    }
  }
}
</script>
