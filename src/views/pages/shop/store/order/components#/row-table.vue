<template>
  <div :class="basic()">
    <st-table
      :loading="loading.getList"
      :page="page"
      :class="basic('table')"
      rowKey="id"
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
          <a @click="clickFn(record)">
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
      default: 2
    }
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    clickFn(val) {
      this.$emit('clicks', val)
    },
    onTableChange(pagination) {
      this.$searchQuery.current_page = pagination.current
      this.$searchQuery.size = pagination.pageSize
      if (this.type === 1) {
        this.RowTableService.getList(this.$searchQuery).subscribe()
      } else {
        this.RowTableService.getOrderList(this.$searchQuery).subscribe()
      }
    }
  }
}
</script>
